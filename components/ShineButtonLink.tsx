"use client";

import { type AnchorHTMLAttributes, type ReactNode } from "react";

import { Shine } from "@/components/animate-ui/primitives/effects/shine";
import { Button } from "@/components/ui/button";

type ShineDemoProps = {
  delay?: number;
  duration?: number;
  loop?: boolean;
  loopDelay?: number;
  deg?: number;
  enable?: boolean;
  enableOnHover?: boolean;
  enableOnTap?: boolean;
};

type ShineButtonLinkProps = ShineDemoProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    children: ReactNode;
    className?: string;
  };

export default function ShineButtonLink({
  children,
  className,
  delay,
  duration,
  loop,
  loopDelay,
  deg,
  enable,
  enableOnHover,
  enableOnTap,
  ...anchorProps
}: ShineButtonLinkProps) {
  return (
    <Shine
      delay={delay}
      duration={duration}
      loop={loop}
      loopDelay={loopDelay}
      deg={deg}
      enable={enable}
      enableOnHover={enableOnHover}
      enableOnTap={enableOnTap}
      asChild
    >
      <Button asChild className={className}>
        <a {...anchorProps}>{children}</a>
      </Button>
    </Shine>
  );
}
