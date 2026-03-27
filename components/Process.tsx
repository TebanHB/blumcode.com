"use client";

import { useRef } from "react";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  FileText,
  MessageSquareText,
  MousePointerClick,
  Rocket,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import { useReducedEffects } from "@/lib/useReducedEffects";
import CardSwap, { Card, type CardSwapHandle } from "./CardSwap";
import SectionReveal from "./SectionReveal";
import { useTheme } from "./ThemeProvider";

const icons = [
  ShieldCheck,
  MessageSquareText,
  FileText,
  Rocket,
  Wrench,
  BadgeCheck,
];

export default function Process({
  t,
}: {
  t: {
    badge: string;
    title: string;
    description: string;
    cards: {
      title: string;
      description: string;
    }[];
    bottom: {
      title: string;
      description: string;
    }[];
  };
}) {
  const { isLight } = useTheme();
  const reduceEffects = useReducedEffects();
  const cardSwapRef = useRef<CardSwapHandle | null>(null);

  return (
    <section
      id="proceso"
      className={`nav-anchor-section content-auto-section section-divider relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28 ${
        isLight
          ? "bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_28%,#ffffff_100%)]"
          : "bg-[linear-gradient(180deg,#090013_0%,#080011_38%,#020617_100%)]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className={`absolute right-[-6%] top-10 h-64 w-64 rounded-full blur-[110px] sm:h-96 sm:w-96 ${
            isLight ? "bg-blue-300/18" : "bg-violet-500/16"
          }`}
        />
        <div
          className={`absolute bottom-[-8%] left-[-4%] h-56 w-56 rounded-full blur-[110px] sm:h-80 sm:w-80 ${
            isLight ? "bg-cyan-300/18" : "bg-blue-500/18"
          }`}
        />
        <div
          className={`absolute inset-0 ${
            isLight
              ? "bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_34%)]"
              : "bg-[radial-gradient(circle_at_top_right,rgba(167,139,250,0.12),transparent_30%)]"
          }`}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[78rem]">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-center lg:gap-12 xl:gap-20">
          <SectionReveal anchor className="mx-auto flex max-w-2xl flex-col items-center text-center lg:mx-0 lg:max-w-[34rem] lg:items-start lg:justify-self-center lg:text-left">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md sm:px-5 sm:py-2 sm:text-sm ${
                isLight
                  ? "border border-blue-200 bg-white/80 text-blue-700 shadow-[0_0_15px_rgba(59,130,246,0.08)]"
                  : "border border-white/15 bg-white/8 text-white shadow-[0_0_20px_rgba(255,255,255,0.08)]"
              }`}
            >
              {t.badge}
            </span>

            <h2
              className={`mt-5 text-3xl font-extrabold leading-[0.95] tracking-[-0.04em] sm:mt-6 sm:text-5xl lg:text-[4.2rem] ${
                isLight ? "text-slate-950" : "text-white"
              }`}
            >
              {t.title}
            </h2>

            <p
              className={`mt-5 max-w-xl text-sm leading-6 sm:text-lg sm:leading-8 lg:text-xl ${
                isLight ? "text-slate-600" : "text-slate-300"
              }`}
            >
              {t.description}
            </p>

            <div className="mt-8 grid w-full gap-3 sm:grid-cols-3">
              {t.bottom.map((item) => (
                <div
                  key={item.title}
                  className={`rounded-[22px] px-4 py-4 backdrop-blur-md ${
                    isLight
                      ? "border border-slate-200 bg-white/82 shadow-[0_18px_34px_rgba(148,163,184,0.14)]"
                      : "border border-white/10 bg-white/6 shadow-[0_18px_34px_rgba(2,6,23,0.26)]"
                  }`}
                >
                  <div
                    className={`text-sm font-semibold leading-5 ${
                      isLight ? "text-slate-950" : "text-white"
                    }`}
                  >
                    {item.title}
                  </div>
                  <p
                    className={`mt-2 text-xs leading-6 ${
                      isLight ? "text-slate-600" : "text-slate-400"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.12}>
            <div className="mx-auto w-full max-w-[46rem]">
              <div className="relative h-[38rem] overflow-visible sm:h-[44rem] lg:h-[46rem]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex w-full items-center justify-center gap-3 sm:gap-5">
                    <div className="flex flex-col gap-3 sm:gap-4">
                    <button
                      type="button"
                      aria-label={t.badge === "Confianza" ? "Tarjeta anterior" : "Previous card"}
                      onClick={() => cardSwapRef.current?.previous()}
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-md transition hover:-translate-y-0.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500/40 sm:h-13 sm:w-13 ${
                        isLight
                          ? "border-slate-200 bg-white/88 text-slate-700 shadow-[0_14px_26px_rgba(148,163,184,0.18)] hover:bg-white"
                          : "border-white/12 bg-white/8 text-white/84 shadow-[0_14px_26px_rgba(2,6,23,0.24)] hover:bg-white/12"
                      }`}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      aria-label={t.badge === "Confianza" ? "Tarjeta siguiente" : "Next card"}
                      onClick={() => cardSwapRef.current?.next()}
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-md transition hover:-translate-y-0.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500/40 sm:h-13 sm:w-13 ${
                        isLight
                          ? "border-slate-200 bg-white/88 text-slate-700 shadow-[0_14px_26px_rgba(148,163,184,0.18)] hover:bg-white"
                          : "border-white/12 bg-white/8 text-white/84 shadow-[0_14px_26px_rgba(2,6,23,0.24)] hover:bg-white/12"
                      }`}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    </div>

                    <CardSwap
                      ref={cardSwapRef}
                      autoplay={!reduceEffects}
                      width="min(100%, 38rem)"
                      height={450}
                      cardDistance={88}
                      verticalDistance={80}
                      delay={4800}
                      pauseOnHover={false}
                      skewAmount={reduceEffects ? 0.8 : 2.5}
                      easing={reduceEffects ? "linear" : "elastic"}
                      className="w-full max-w-[38rem]"
                    >
                      {t.cards.map((item, index) => {
                        const Icon = icons[index % icons.length];

                        return (
                          <Card
                            key={item.title}
                            customClass="process-swap-card cursor-pointer"
                          >
                            <button
                              type="button"
                              aria-label={`${t.badge === "Confianza" ? "Traer al frente" : "Bring forward"}: ${item.title}`}
                              className="process-swap-tab absolute left-7 top-0 z-20 -translate-y-[calc(100%-1px)] rounded-t-[18px] border border-b-0 px-5 py-3 text-left text-[1rem] font-semibold leading-none shadow-[0_14px_30px_rgba(0,0,0,0.18)] transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-inset sm:left-8 sm:px-6 sm:text-[1.1rem]"
                            >
                              <span className="flex max-w-[30rem] items-center gap-3 truncate">
                                <span className="process-swap-number inline-flex h-7 min-w-7 items-center justify-center rounded-full border px-2 text-[0.76rem] font-extrabold tracking-[0.2em] sm:h-8 sm:min-w-8 sm:text-[0.82rem]">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="truncate">{item.title}</span>
                              </span>
                            </button>

                            <article className="relative h-full overflow-hidden rounded-[inherit] p-6 sm:p-7">
                              <div className="process-swap-surface absolute inset-0" />
                              <div className="process-swap-topline absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent" />

                              <div className="relative z-10 flex h-full items-center">
                                <div className="process-swap-icon-shell absolute left-7 top-7 flex h-11 w-11 items-center justify-center rounded-2xl border sm:left-8 sm:top-8 sm:h-12 sm:w-12">
                                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>

                                <div className="mx-auto flex w-full max-w-[21rem] flex-col items-center justify-center text-center">
                                  <h3 className="process-swap-title text-[1.65rem] font-semibold leading-tight sm:text-[2rem]">
                                    {item.title}
                                  </h3>
                                  <p className="process-swap-description mt-4 max-w-[20rem] text-[0.98rem] leading-7 sm:text-base sm:leading-8">
                                    {item.description}
                                  </p>

                                  <div className="process-swap-chip mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium">
                                    <MousePointerClick className="process-swap-chip-icon h-4 w-4" />
                                    <span>{t.badge === "Confianza" ? "Click para traer al frente" : "Click to bring forward"}</span>
                                  </div>
                                </div>
                              </div>
                            </article>
                          </Card>
                        );
                      })}
                    </CardSwap>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
