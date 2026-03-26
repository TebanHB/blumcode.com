"use client";

import { type ReactNode } from "react";

import {
  type ResolvedTheme,
  type ThemeSelection as ThemeSelectionValue,
} from "@/lib/theme";

export type ThemeSelection = ThemeSelectionValue;
export type Resolved = ResolvedTheme;
export type Direction = "up" | "down" | "left" | "right";

export function ThemeToggler({
  theme,
  resolvedTheme,
  setTheme,
  direction,
  children,
}: {
  theme: ThemeSelectionValue;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemeSelectionValue) => void;
  direction: Direction;
  children: (params: {
    effective: ThemeSelectionValue;
    resolvedTheme: ResolvedTheme;
    toggleTheme: (theme: ThemeSelectionValue) => void;
    direction: Direction;
  }) => ReactNode;
}) {
  const effective = theme === "system" ? "system" : resolvedTheme;

  return children({
    effective,
    resolvedTheme,
    toggleTheme: setTheme,
    direction,
  });
}
