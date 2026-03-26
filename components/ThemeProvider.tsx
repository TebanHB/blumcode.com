"use client";

import {
  useCallback,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";

import {
  getResolvedTheme,
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type ThemeSelection,
} from "@/lib/theme";

type ThemeContextValue = {
  theme: ThemeSelection;
  resolvedTheme: ResolvedTheme;
  isLight: boolean;
  setTheme: (theme: ThemeSelection) => void;
  toggleTheme: (theme?: ThemeSelection) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ViewTransition = {
  finished: Promise<void>;
};

type ThemeTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => ViewTransition;
};

function applyThemeToDocument(
  theme: ThemeSelection,
  resolvedTheme: ResolvedTheme
) {
  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.dataset.themeSelection = theme;
  document.documentElement.style.colorScheme = resolvedTheme;
  document.cookie = `${THEME_STORAGE_KEY}=${theme}; path=/; max-age=31536000; samesite=lax`;

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage failures and keep the in-memory theme in sync.
  }
}

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme: ThemeSelection;
}) {
  const [theme, setTheme] = useState<ThemeSelection>(initialTheme);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    if (typeof window === "undefined") {
      return initialTheme === "light" ? "light" : "dark";
    }

    return getResolvedTheme(
      initialTheme,
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });
  const themeRef = useRef(theme);
  const resolvedThemeRef = useRef(resolvedTheme);
  const transitionRunningRef = useRef(false);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    resolvedThemeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    applyThemeToDocument(theme, resolvedTheme);
  }, [theme, resolvedTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const syncSystemTheme = (matches: boolean) => {
      if (themeRef.current !== "system") {
        return;
      }

      const nextResolvedTheme = getResolvedTheme("system", matches);

      if (nextResolvedTheme === resolvedThemeRef.current) {
        return;
      }

      resolvedThemeRef.current = nextResolvedTheme;
      setResolvedTheme(nextResolvedTheme);
      applyThemeToDocument("system", nextResolvedTheme);
    };

    syncSystemTheme(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      syncSystemTheme(event.matches);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);

    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const setThemeWithTransition = useCallback((nextTheme: ThemeSelection) => {
    if (nextTheme === themeRef.current) {
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextResolvedTheme = getResolvedTheme(nextTheme, prefersDark);
    const documentWithTransition = document as ThemeTransitionDocument;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (
      reduceMotion ||
      typeof documentWithTransition.startViewTransition !== "function" ||
      transitionRunningRef.current ||
      nextResolvedTheme === resolvedThemeRef.current
    ) {
      themeRef.current = nextTheme;
      resolvedThemeRef.current = nextResolvedTheme;
      setTheme(nextTheme);
      setResolvedTheme(nextResolvedTheme);
      applyThemeToDocument(nextTheme, nextResolvedTheme);
      return;
    }

    const root = document.documentElement;
    transitionRunningRef.current = true;
    themeRef.current = nextTheme;
    resolvedThemeRef.current = nextResolvedTheme;
    root.dataset.themeTransition = "running";
    root.dataset.themeTransitionTo = nextResolvedTheme;

    const transition = documentWithTransition.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
        setResolvedTheme(nextResolvedTheme);
        applyThemeToDocument(nextTheme, nextResolvedTheme);
      });
    });

    transition.finished.finally(() => {
      transitionRunningRef.current = false;
      delete root.dataset.themeTransition;
      delete root.dataset.themeTransitionTo;
    });
  }, []);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      isLight: resolvedTheme === "light",
      setTheme: setThemeWithTransition,
      toggleTheme: (nextTheme?: ThemeSelection) =>
        setThemeWithTransition(
          nextTheme ?? (themeRef.current === "light" ? "dark" : "light")
        ),
    }),
    [resolvedTheme, setThemeWithTransition, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
