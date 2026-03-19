"use client";

import { useTheme } from "./ThemeProvider";

type Variant =
  | "hero-to-services"
  | "services-to-solutions"
  | "solutions-to-process"
  | "process-to-footer";

type DividerConfig = {
  top: string;
  middle: string;
  bottom: string;
  accent: string;
  glow: string;
  heightClass: string;
};

const DARK_DIVIDER_CONFIG: Record<Variant, DividerConfig> = {
  "hero-to-services": {
    top: "#0f172a",
    middle: "#0b1220",
    bottom: "#020617",
    accent: "rgba(59,130,246,0.12)",
    glow: "rgba(59,130,246,0.12)",
    heightClass: "h-8 sm:h-12 lg:h-14",
  },
  "services-to-solutions": {
    top: "#020617",
    middle: "#091120",
    bottom: "#0f172a",
    accent: "rgba(37,99,235,0.11)",
    glow: "rgba(59,130,246,0.1)",
    heightClass: "h-8 sm:h-12 lg:h-14",
  },
  "solutions-to-process": {
    top: "#0f172a",
    middle: "#162235",
    bottom: "#0f172a",
    accent: "rgba(148,163,184,0.12)",
    glow: "rgba(148,163,184,0.08)",
    heightClass: "h-10 sm:h-14 lg:h-16",
  },
  "process-to-footer": {
    top: "#020617",
    middle: "#0f172a",
    bottom: "#020617",
    accent: "rgba(59,130,246,0.10)",
    glow: "rgba(59,130,246,0.08)",
    heightClass: "h-10 sm:h-14 lg:h-16",
  },
};

const LIGHT_DIVIDER_CONFIG: Record<Variant, DividerConfig> = {
  "hero-to-services": {
    top: "#f8fafc",
    middle: "#f1f5f9",
    bottom: "#f8fafc",
    accent: "rgba(59,130,246,0.08)",
    glow: "rgba(59,130,246,0.1)",
    heightClass: "h-6 sm:h-10 lg:h-12",
  },
  "services-to-solutions": {
    top: "#f8fafc",
    middle: "#eff6ff",
    bottom: "#f1f5f9",
    accent: "rgba(59,130,246,0.08)",
    glow: "rgba(14,165,233,0.08)",
    heightClass: "h-6 sm:h-10 lg:h-12",
  },
  "solutions-to-process": {
    top: "#f1f5f9",
    middle: "#e0f2fe",
    bottom: "#dbeafe",
    accent: "rgba(59,130,246,0.08)",
    glow: "rgba(59,130,246,0.08)",
    heightClass: "h-8 sm:h-12 lg:h-14",
  },
  "process-to-footer": {
    top: "#ffffff",
    middle: "#e2e8f0",
    bottom: "#f8fafc",
    accent: "rgba(148,163,184,0.16)",
    glow: "rgba(255,255,255,0.22)",
    heightClass: "h-9 sm:h-14 lg:h-16",
  },
};

const WAVE_PATH =
  "M0,56 C180,28 360,74 540,56 C720,38 900,74 1080,54 C1260,34 1360,50 1440,40 L1440,96 L0,96 Z";

const SECOND_WAVE_PATH =
  "M0,42 C170,68 330,24 520,42 C720,62 900,24 1090,34 C1260,42 1365,70 1440,62 L1440,96 L0,96 Z";

function SoftDivider({ config }: { config: DividerConfig }) {
  return (
    <div
      className={`relative z-10 -my-px overflow-hidden select-none pointer-events-none ${config.heightClass}`}
      aria-hidden="true"
      style={{
        lineHeight: 0,
        backgroundImage: `linear-gradient(to bottom, ${config.top} 0%, ${config.middle} 54%, ${config.bottom} 100%)`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(85% 75% at 50% 0%, ${config.glow}, transparent 65%)`,
        }}
      />

      <svg
        className="absolute inset-x-0 bottom-0 h-full w-full"
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={SECOND_WAVE_PATH} fill="rgba(255,255,255,0.03)" />
        <path d={WAVE_PATH} fill={config.accent} />
      </svg>
    </div>
  );
}

export default function SectionDivider({ variant }: { variant: Variant }) {
  const { isLight } = useTheme();
  const config = isLight
    ? LIGHT_DIVIDER_CONFIG[variant]
    : DARK_DIVIDER_CONFIG[variant];

  return <SoftDivider config={config} />;
}
