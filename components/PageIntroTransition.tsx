"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";

import { useTheme } from "./ThemeProvider";

const HeroBackground = dynamic(() => import("./HeroBackground"), {
  ssr: false,
  loading: () => null,
});

const INTRO_HOLD_MS = 900;
const INTRO_HANDOFF_MS = 420;

type IntroPhase = "hold" | "handoff" | "done";

export default function PageIntroTransition({
  children,
}: {
  children: ReactNode;
}) {
  const { isLight } = useTheme();
  const [phase, setPhase] = useState<IntroPhase>(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return "done";
    }

    return "hold";
  });
  const previousBodyOverflowRef = useRef<string | null>(null);
  const shouldAnimateRef = useRef(phase !== "done");

  useEffect(() => {
    if (!shouldAnimateRef.current) {
      return;
    }

    previousBodyOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handoffTimeout = window.setTimeout(() => {
      setPhase("handoff");
    }, INTRO_HOLD_MS);

    const doneTimeout = window.setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = previousBodyOverflowRef.current ?? "";
      previousBodyOverflowRef.current = null;
    }, INTRO_HOLD_MS + INTRO_HANDOFF_MS);

    return () => {
      window.clearTimeout(handoffTimeout);
      window.clearTimeout(doneTimeout);

      if (previousBodyOverflowRef.current !== null) {
        document.body.style.overflow = previousBodyOverflowRef.current;
        previousBodyOverflowRef.current = null;
      }
    };
  }, []);

  const shellClassName =
    phase === "hold"
      ? "page-intro-shell is-intro-hidden"
      : phase === "handoff"
        ? "page-intro-shell is-intro-visible is-intro-underlay"
        : "page-intro-shell is-intro-visible";

  if (phase === "done") {
    return <>{children}</>;
  }

  return (
    <>
      <noscript>
        <style>{`.page-intro-overlay{display:none!important}.page-intro-shell{opacity:1!important;visibility:visible!important;transform:none!important;filter:none!important}`}</style>
      </noscript>

      <div className={shellClassName}>{children}</div>

      <div
        aria-hidden="true"
        className={`page-intro-overlay ${isLight ? "is-light" : "is-dark"} ${
          phase === "handoff" ? "is-handoff" : ""
        }`}
      >
        <div className="page-intro-hero-scene">
          <HeroBackground
            isLight={isLight}
            hideLogo
            seed="hero-shared-scene"
          />
          <div
            className={`page-intro-backdrop ${
              isLight ? "page-intro-backdrop-light" : "page-intro-backdrop-dark"
            }`}
          />
          <div
            className={`page-intro-backdrop-accent ${
              isLight
                ? "page-intro-backdrop-accent-light"
                : "page-intro-backdrop-accent-dark"
            }`}
          />
        </div>
        <div className="page-intro-logo-shell">
          <div className="page-intro-logo-frame">
            <Image
              src={isLight ? "/logo.svg" : "/logo-blanco.svg"}
              alt=""
              width={1268}
              height={429}
              priority
              unoptimized
              className="page-intro-logo-image"
            />
          </div>
        </div>
      </div>
    </>
  );
}
