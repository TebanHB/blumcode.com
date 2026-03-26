"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";

type ShineProps = {
  children: ReactNode;
  asChild?: boolean;
  delay?: number;
  duration?: number;
  loop?: boolean;
  loopDelay?: number;
  deg?: number;
  enable?: boolean;
  enableOnHover?: boolean;
  enableOnTap?: boolean;
  className?: string;
};

type ShineStyle = CSSProperties & {
  "--shine-delay"?: string;
  "--shine-duration"?: string;
  "--shine-angle"?: string;
  "--shine-cycle-duration"?: string;
};

export function Shine({
  children,
  asChild = false,
  delay = 0,
  duration = 1400,
  loop = false,
  loopDelay = 2200,
  deg = 18,
  enable = true,
  enableOnHover = false,
  enableOnTap = false,
  className,
}: ShineProps) {
  const style: ShineStyle = {
    "--shine-delay": `${delay}ms`,
    "--shine-duration": `${duration}ms`,
    "--shine-cycle-duration": `${duration + loopDelay}ms`,
    "--shine-angle": `${deg}deg`,
  };

  const sharedClassName = cn("shine-effect", className);
  const dataProps = {
    "data-shine-active": enable ? "true" : "false",
    "data-shine-loop": loop ? "true" : "false",
    "data-shine-hover": enableOnHover ? "true" : "false",
    "data-shine-tap": enableOnTap ? "true" : "false",
  } as const;

  if (!asChild) {
    return (
      <span className={sharedClassName} style={style} {...dataProps}>
        {children}
      </span>
    );
  }

  const child = Children.only(children);

  if (!isValidElement(child)) {
    return null;
  }

  const element = child as ReactElement<{
    className?: string;
    style?: CSSProperties;
  }>;

  return cloneElement(element, {
    className: cn(sharedClassName, element.props.className),
    style: {
      ...style,
      ...element.props.style,
    },
    ...dataProps,
  });
}
