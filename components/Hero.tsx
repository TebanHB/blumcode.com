"use client";

import dynamic from "next/dynamic";
import { ArrowRight, BadgeCheck, Code2, Smartphone, Wrench } from "lucide-react";
import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";

import { scrollToSection } from "@/lib/scrollToSection";
import { useReducedEffects } from "@/lib/useReducedEffects";
import GlowCard from "./GlowCard";
import RotatingText from "./RotatingText";
import ShineButtonLink from "./ShineButtonLink";
import { useTheme } from "./ThemeProvider";

const HeroBackground = dynamic(() => import("./HeroBackground"), {
  ssr: false,
  loading: () => null,
});

export default function Hero({
  t,
}: {
  t: {
    badge: string;
    title1: string;
    title2: string;
    title3: string;
    rotatingWords: string[];
    description: string;
    primary: string;
    secondary: string;
    cards: {
      webTitle: string;
      webDescription: string;
      mobileTitle: string;
      mobileDescription: string;
      supportTitle: string;
      supportDescription: string;
    };
    floatingCard: {
      title: string;
      description: string;
    };
  };
}) {
  const { isLight } = useTheme();
  const reduceEffects = useReducedEffects();
  const [hasMounted, setHasMounted] = useState(false);
  const rotatingTexts = reduceEffects ? [t.rotatingWords[0] ?? ""] : t.rotatingWords;
  const rotatingWordWidth = `${Math.max(1, ...rotatingTexts.map((word) => word.length))}ch`;
  const heroTitleLabel = [t.title1, t.title2, t.title3, t.rotatingWords[0] ?? ""]
    .filter(Boolean)
    .join(" ");
  const focusAreas = [
    {
      title: t.cards.webTitle,
      description: t.cards.webDescription,
      serviceIndex: 0,
      Icon: Code2,
      accentLight: "bg-[linear-gradient(135deg,rgba(59,130,246,0.20),rgba(34,211,238,0.12),transparent_72%)]",
      accentDark: "bg-[linear-gradient(135deg,rgba(59,130,246,0.24),rgba(34,211,238,0.12),transparent_72%)]",
    },
    {
      title: t.cards.mobileTitle,
      description: t.cards.mobileDescription,
      serviceIndex: 3,
      Icon: Smartphone,
      accentLight: "bg-[linear-gradient(135deg,rgba(14,165,233,0.18),rgba(99,102,241,0.10),transparent_72%)]",
      accentDark: "bg-[linear-gradient(135deg,rgba(14,165,233,0.22),rgba(99,102,241,0.12),transparent_72%)]",
    },
    {
      title: t.cards.supportTitle,
      description: t.cards.supportDescription,
      serviceIndex: 1,
      Icon: Wrench,
      accentLight: "bg-[linear-gradient(135deg,rgba(250,204,21,0.20),rgba(59,130,246,0.10),transparent_72%)]",
      accentDark: "bg-[linear-gradient(135deg,rgba(250,204,21,0.18),rgba(59,130,246,0.10),transparent_72%)]",
    },
  ];

  const handleFocusService = (index: number) => {
    window.dispatchEvent(new CustomEvent("hero-service-focus", { detail: { index } }));
    scrollToSection("servicios");
  };

  const handleCtaNavigation =
    (sectionId: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      scrollToSection(sectionId);
    };

  const enter = (delayMs: number): CSSProperties => ({
    animationDelay: `${delayMs}ms`,
  });

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setHasMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className={`relative isolate overflow-hidden ${isLight ? "bg-slate-50" : "bg-slate-900"}`}>
      <div className="absolute inset-0 z-0">
        {hasMounted && !reduceEffects ? (
          <HeroBackground isLight={isLight} seed="hero-shared-scene" />
        ) : null}
        <div
          className={`absolute inset-0 ${
            isLight
              ? "bg-[linear-gradient(120deg,rgba(248,250,252,0.80),rgba(241,245,249,0.68),rgba(226,232,240,0.56))]"
              : "bg-[linear-gradient(120deg,rgba(2,6,23,0.90),rgba(15,23,42,0.72),rgba(15,23,42,0.84))]"
          }`}
        />
        <div
          className={`absolute inset-0 ${
            isLight
              ? "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.12),transparent_24%)]"
              : "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.22),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.16),transparent_25%)]"
          }`}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl items-start px-4 pb-14 pt-[96px] sm:px-6 sm:pb-20 sm:pt-[132px] lg:min-h-[100svh] lg:items-center lg:px-8 lg:pb-28 lg:pt-[160px]">
        <div className="grid w-full gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.68fr)] lg:items-center lg:gap-16">
          <div className="max-w-4xl font-hero-sans">
            <div className="animate-enter-up" style={enter(0)}>
              <div
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-[0_0_30px_rgba(59,130,246,0.14)] backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm ${
                  isLight
                    ? "border border-blue-200/70 bg-white/80 text-slate-800"
                    : "border border-white/15 bg-white/10 text-slate-100"
                }`}
              >
                <BadgeCheck className="h-4 w-4 text-blum-blue" />
                {t.badge}
              </div>
            </div>

            <h1
              className={`animate-enter-up mt-5 max-w-5xl text-[clamp(2.35rem,10vw,2.85rem)] font-light leading-[0.94] tracking-[-0.04em] sm:mt-6 sm:text-6xl lg:text-[5.3rem] ${
                isLight ? "text-slate-950" : "text-white"
              }`}
              style={enter(50)}
              aria-label={heroTitleLabel}
            >
              <span aria-hidden="true" className="contents">
                <span className="font-medium tracking-[-0.05em]">{t.title1} </span>
                <span
                  className={`font-hero-serif bg-[length:220%_auto] bg-clip-text text-[1.08em] font-semibold italic tracking-[-0.035em] text-transparent ${
                    isLight
                      ? "bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-500 drop-shadow-[0_10px_24px_rgba(59,130,246,0.22)]"
                      : "bg-gradient-to-r from-white via-blue-200 to-blum-blue"
                  }`}
                  style={{ animation: "shimmer 4s ease-in-out infinite" }}
                >
                  {t.title2}
                </span>
                <span className="mt-1 inline-flex max-w-full flex-wrap items-baseline gap-x-[0.16em] gap-y-[0.04em] font-medium tracking-[-0.05em] sm:mt-0 sm:flex-nowrap">
                  <span>{t.title3}</span>
                  <RotatingText
                    key={t.rotatingWords.join("|")}
                    texts={rotatingTexts}
                    rotationInterval={2300}
                    staggerDuration={0}
                    splitBy="words"
                    auto={!reduceEffects}
                    screenReaderText={false}
                    mainClassName={`${isLight ? "text-slate-950" : "text-white"} pb-[0.14em] -mb-[0.14em]`}
                    splitLevelClassName="overflow-hidden pb-[0.14em] -mb-[0.14em]"
                    elementLevelClassName="will-change-transform"
                    style={reduceEffects ? undefined : { minWidth: rotatingWordWidth }}
                  />
                </span>
              </span>
            </h1>

            <p
              className={`animate-enter-up mt-6 max-w-2xl text-base leading-7 sm:mt-8 sm:text-xl sm:leading-8 lg:text-2xl ${
                isLight ? "text-slate-700" : "text-slate-200"
              }`}
              style={enter(180)}
            >
              {t.description}
            </p>

            <div
              className="animate-enter-up mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
              style={enter(320)}
            >
              <ShineButtonLink
                href="#contacto"
                onClick={handleCtaNavigation("contacto")}
                duration={1350}
                loop
                loopDelay={1900}
                deg={18}
                enableOnHover
                enableOnTap
                className="ui-btn ui-btn-primary ui-btn-cta ui-btn-lg group w-full px-6 py-3.5 text-white sm:w-auto sm:px-8 sm:py-4"
              >
                {t.primary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ShineButtonLink>

              <a
                href="#servicios"
                onClick={handleCtaNavigation("servicios")}
                className="ui-btn ui-btn-secondary ui-btn-lg w-full px-6 py-3.5 sm:w-auto sm:px-8 sm:py-4"
              >
                {t.secondary}
              </a>
            </div>
          </div>

          <GlowCard
            isLight={isLight}
            borderRadius={32}
            backgroundColor={isLight ? "rgba(255,255,255,0.46)" : "rgba(15,23,42,0.3)"}
            boxShadow={isLight ? "0 24px 60px rgba(148,163,184,0.14)" : "0 20px 60px rgba(2,6,23,0.28)"}
            className="animate-enter-right relative mx-auto w-full max-w-xl lg:max-w-none"
            style={enter(280)}
          >
            <div className="relative h-full p-4 sm:p-6">
              <div
                className={`absolute inset-0 ${
                  isLight
                    ? "bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_32%),linear-gradient(145deg,rgba(255,255,255,0.14),transparent_62%)]"
                    : "bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_32%),linear-gradient(145deg,rgba(255,255,255,0.03),transparent_62%)]"
                }`}
              />
              <div
                className={`absolute inset-0 opacity-70 ${
                  isLight
                    ? "bg-[linear-gradient(rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.10)_1px,transparent_1px)] bg-[size:26px_26px]"
                    : "bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:26px_26px]"
                }`}
              />

              <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className={`h-2.5 w-2.5 rounded-full ${
                        isLight
                          ? dot === 0
                            ? "bg-rose-300"
                            : dot === 1
                              ? "bg-amber-300"
                              : "bg-emerald-300"
                          : dot === 0
                            ? "bg-rose-400/90"
                            : dot === 1
                              ? "bg-amber-400/90"
                              : "bg-emerald-400/90"
                      }`}
                    />
                  ))}
                  <p className={`ml-1 text-[11px] font-semibold uppercase tracking-[0.26em] ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                    BlumCode
                  </p>
                </div>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl sm:h-11 sm:w-11 ${
                    isLight ? "border border-blue-100 bg-blue-50 text-blue-700" : "border border-white/10 bg-white/5 text-blue-200"
                  }`}
                >
                  <BadgeCheck className="h-5 w-5" />
                </div>
              </div>

              <div
                className={`relative mt-4 overflow-hidden rounded-[24px] p-4 sm:mt-5 sm:rounded-[26px] sm:p-5 ${
                  isLight
                    ? "border border-slate-200/70 bg-[linear-gradient(160deg,rgba(255,255,255,0.52),rgba(239,246,255,0.26))] shadow-[0_18px_35px_rgba(148,163,184,0.1)] backdrop-blur-lg"
                    : "border border-white/10 bg-[linear-gradient(160deg,rgba(15,23,42,0.42),rgba(30,41,59,0.28))] backdrop-blur-lg"
                }`}
              >
                <div
                  className={`absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl ${
                    isLight ? "bg-blue-200/60" : "bg-blue-500/25"
                  }`}
                />
                <div className="relative">
                  <p className={`text-xs font-semibold uppercase tracking-[0.26em] ${isLight ? "text-blue-700/85" : "text-blue-200/85"}`}>
                    {t.floatingCard.title}
                  </p>
                  <h2 className={`mt-3 max-w-sm text-xl font-semibold leading-tight sm:text-[2rem] ${isLight ? "text-slate-950" : "text-white"}`}>
                    {t.floatingCard.description}
                  </h2>

                  <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                    {focusAreas.map((item, index) => (
                      <span
                        key={item.title}
                        className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] sm:px-3 sm:text-xs sm:tracking-[0.18em] ${
                          isLight
                            ? "border border-slate-200/70 bg-white/38 text-slate-700 backdrop-blur-md"
                            : "border border-white/10 bg-white/4 text-slate-200 backdrop-blur-md"
                        }`}
                      >
                        <span className={`${isLight ? "text-blue-700" : "text-blue-200"}`}>0{index + 1}</span>
                        {item.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

              <div className="relative mt-4 grid gap-2.5 sm:gap-3">
                {focusAreas.map(({ title, description, serviceIndex, Icon, accentLight, accentDark }, index) => (
                  <GlowCard
                    key={title}
                    isLight={isLight}
                    borderRadius={24}
                    backgroundColor={isLight ? "rgba(255,255,255,0.74)" : "rgba(15,23,42,0.44)"}
                    boxShadow={isLight ? "0 14px 28px rgba(148,163,184,0.16)" : "0 14px 28px rgba(2,6,23,0.24)"}
                    className="animate-enter-up transition-transform duration-200 hover:-translate-y-0.5"
                    style={enter(340 + index * 80)}
                  >
                    <div className={`absolute inset-0 ${isLight ? accentLight : accentDark}`} />
                    <div
                      className={`relative flex h-full items-start gap-3 px-3.5 py-3.5 sm:gap-4 sm:px-4 sm:py-4 ${
                        isLight
                          ? "bg-white/36 backdrop-blur-lg"
                          : "bg-[linear-gradient(180deg,rgba(15,23,42,0.4),rgba(15,23,42,0.24))] backdrop-blur-lg"
                      }`}
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] text-blum-blue sm:h-12 sm:w-12 sm:rounded-[18px] ${
                          isLight ? "bg-blue-50 ring-1 ring-blue-100" : "bg-white/10"
                        }`}
                      >
                        <Icon className="h-[1.125rem] w-[1.125rem] sm:h-5 sm:w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                              0{index + 1}
                            </p>
                            <h3 className={`mt-1 text-[15px] font-semibold leading-snug sm:text-lg ${isLight ? "text-slate-950" : "text-white"}`}>{title}</h3>
                          </div>

                          <button
                            type="button"
                            aria-label={`Ir a ${title}`}
                            onClick={() => handleFocusService(serviceIndex)}
                            className="ui-btn ui-btn-icon h-[2.125rem] w-[2.125rem] shrink-0 transition-transform group-hover:translate-x-1 sm:h-9 sm:w-9"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>

                        <p className={`mt-2 text-[13px] leading-5 sm:text-sm sm:leading-6 ${isLight ? "text-slate-600" : "text-slate-300"}`}>{description}</p>
                      </div>
                    </div>
                  </GlowCard>
                ))}
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
