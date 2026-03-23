"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  anchor?: boolean;
};

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  anchor = false,
}: Props) {
  const [disableReveal, setDisableReveal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 767px), (prefers-reduced-motion: reduce)"
    );
    const update = () => setDisableReveal(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (disableReveal) {
      return;
    }

    const element = containerRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [disableReveal]);

  if (disableReveal) {
    return (
      <div className={className} data-nav-anchor={anchor ? "true" : undefined}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      data-nav-anchor={anchor ? "true" : undefined}
      className={`${className} reveal-up ${isVisible ? "reveal-visible" : ""}`.trim()}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
