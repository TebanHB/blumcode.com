"use client";

import { forwardRef, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/cn";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  isLight?: boolean;
  borderRadius?: number;
  backgroundColor?: string;
  glowColor?: string;
  glowRadius?: number;
  glowIntensity?: number;
  edgeSensitivity?: number;
  coneSpread?: number;
  animated?: boolean;
  fillOpacity?: number;
  colors?: string[];
  boxShadow?: string;
  style?: CSSProperties;
  showBorder?: boolean;
  showFill?: boolean;
  showOuterGlow?: boolean;
};

const LIGHT_CARD = {
  backgroundColor: "rgba(255,255,255,0.92)",
  borderClassName: "border border-slate-200/90",
  boxShadow: "0 18px 34px rgba(148,163,184,0.18)",
};

const DARK_CARD = {
  backgroundColor: "rgba(15,23,42,0.62)",
  borderClassName: "border border-white/10",
  boxShadow: "0 18px 40px rgba(2,6,23,0.28)",
};

const GlowCard = forwardRef<HTMLDivElement, GlowCardProps>(function GlowCard(
  {
    children,
    className,
    contentClassName,
    isLight = false,
    borderRadius = 28,
    backgroundColor,
    boxShadow,
    style,
    showBorder = true,
  },
  ref
) {
  const palette = isLight ? LIGHT_CARD : DARK_CARD;

  return (
    <div
      ref={ref}
      className={cn(
        "group relative h-full overflow-hidden rounded-[inherit]",
        showBorder && palette.borderClassName,
        className
      )}
      style={{
        ...style,
        borderRadius: `${borderRadius}px`,
        background: backgroundColor ?? palette.backgroundColor,
        boxShadow: boxShadow ?? palette.boxShadow,
      }}
    >
      <div className={cn("h-full overflow-hidden rounded-[inherit]", contentClassName)}>
        {children}
      </div>
    </div>
  );
});

export default GlowCard;
