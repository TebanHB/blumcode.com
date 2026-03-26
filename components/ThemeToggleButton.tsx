"use client";

import { Monitor, Moon, Sun } from "lucide-react";

import {
  ThemeToggler,
  type Direction,
  type ThemeSelection,
} from "@/components/animate-ui/primitives/effects/theme-toggler";
import { Locale } from "@/i18n";
import { cn } from "@/lib/cn";

import { useTheme } from "./ThemeProvider";

function getNextTheme(theme: ThemeSelection): ThemeSelection {
  if (theme === "dark") {
    return "light";
  }

  if (theme === "light") {
    return "system";
  }

  return "dark";
}

function getThemeLabel(lang: Locale, theme: ThemeSelection) {
  if (lang === "es") {
    if (theme === "dark") {
      return "oscuro";
    }

    if (theme === "light") {
      return "claro";
    }

    return "sistema";
  }

  if (theme === "dark") {
    return "dark";
  }

  if (theme === "light") {
    return "light";
  }

  return "system";
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
      {({ effective, toggleTheme }) => {
        const nextTheme = getNextTheme(effective);
        const currentThemeLabel = getThemeLabel(lang, effective);
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
            data-theme-effective={effective}
            data-theme-direction={direction}
            className={cn("theme-toggle-btn", className)}
          >
            <span className="theme-toggle-icon-stage" aria-hidden="true">
              <Sun className="theme-toggle-icon theme-toggle-icon-sun" />
              <Moon className="theme-toggle-icon theme-toggle-icon-moon" />
              <Monitor className="theme-toggle-icon theme-toggle-icon-monitor" />
            </span>
          </button>
        );
      }}
    </ThemeToggler>
  );
}
