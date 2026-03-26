"use client";

import {
  Children,
  cloneElement,
  type CSSProperties,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  children: ReactNode;
};

const buttonBaseClassName =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap align-middle";

export function Button({
  asChild = false,
  className,
  children,
  ...props
}: ButtonProps) {
  if (!asChild) {
    return (
      <button className={cn(buttonBaseClassName, className)} {...props}>
        {children}
      </button>
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
    ...props,
    className: cn(buttonBaseClassName, className, element.props.className),
    style: {
      ...(element.props.style ?? {}),
      ...(props.style ?? {}),
    },
  });
}
