export type ThemeSelection = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "blumcode-theme";

export function getSafeThemeSelection(
  value: string | undefined,
  fallback: ThemeSelection = "dark"
): ThemeSelection {
  return value === "light" || value === "dark" || value === "system"
    ? value
    : fallback;
}

export function getResolvedTheme(
  theme: ThemeSelection,
  prefersDark: boolean
): ResolvedTheme {
  if (theme === "system") {
    return prefersDark ? "dark" : "light";
  }

  return theme;
}

export function getServerResolvedTheme(theme: ThemeSelection): ResolvedTheme {
  return theme === "light" ? "light" : "dark";
}
