"use client";

import { Moon, Sun } from "lucide-react";

import {
  ThemeToggler,
  type Direction,
} from "@/components/animate-ui/primitives/effects/theme-toggler";
import { Locale } from "@/i18n";
import { cn } from "@/lib/cn";
import { type ResolvedTheme } from "@/lib/theme";

import { useTheme } from "./ThemeProvider";

function getNextTheme(theme: ResolvedTheme): ResolvedTheme {
  if (theme === "dark") {
    return "light";
  }

  return "dark";
}

function getThemeLabel(lang: Locale, theme: ResolvedTheme) {
  if (lang === "es") {
    if (theme === "dark") {
      return "oscuro";
    }

    if (theme === "light") {
      return "claro";
    }
  }

  if (theme === "dark") {
    return "dark";
  }

  if (theme === "light") {
    return "light";
  }
}

export default function ThemeToggleButton({
  lang,
  className,
  direction = "down",
}: {
  lang: Locale;
  className?: string;
  direction?: Direction;
}) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <ThemeToggler
      theme={theme}
      resolvedTheme={resolvedTheme}
      setTheme={setTheme}
      direction={direction}
    >
      {({ resolvedTheme, toggleTheme }) => {
        const nextTheme = getNextTheme(resolvedTheme);
        const currentThemeLabel = getThemeLabel(lang, resolvedTheme);
        const nextThemeLabel = getThemeLabel(lang, nextTheme);
        const ariaLabel =
          lang === "es"
            ? `Tema ${currentThemeLabel}. Cambiar a ${nextThemeLabel}.`
            : `${currentThemeLabel} theme. Switch to ${nextThemeLabel}.`;

        return (
          <button
            type="button"
            onClick={() => toggleTheme(nextTheme)}
            aria-label={ariaLabel}
            title={ariaLabel}
            data-theme-effective={resolvedTheme}
            data-theme-direction={direction}
            className={cn("theme-toggle-btn", className)}
          >
            <span className="theme-toggle-icon-stage" aria-hidden="true">
              <Sun className="theme-toggle-icon theme-toggle-icon-sun" />
              <Moon className="theme-toggle-icon theme-toggle-icon-moon" />
            </span>
          </button>
        );
      }}
    </ThemeToggler>
  );
}
