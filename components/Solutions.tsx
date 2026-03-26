"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import GlowCard from "./GlowCard";
import SectionReveal from "./SectionReveal";
import { useTheme } from "./ThemeProvider";

const solutionImages = [
  "/solution-proven-experience.svg",
  "/solution-modern-technology.svg",
  "/solution-continuous-support.svg",
  "/solution-measurable-results.svg",
];

export default function Solutions({
  t,
}: {
  t: {
    badge: string;
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
    }[];
  };
}) {
  const { isLight } = useTheme();

  return (
    <section
      id="soluciones"
      className={`nav-anchor-section content-auto-section section-divider relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28 ${
        isLight ? "bg-slate-100 text-slate-950" : "bg-slate-900 text-white"
      }`}
    >
      <div className={`absolute inset-0 ${isLight ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(239,246,255,0.9),rgba(241,245,249,0.94))]" : "bg-linear-to-br from-slate-900 via-[#17306b] to-blum-blue opacity-50 mix-blend-overlay"}`} />
      <div className={`absolute inset-0 ${isLight ? "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_40%)]" : "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_40%)]"}`} />
      <div
        className={`absolute right-[-10%] top-[-5%] h-56 w-56 rounded-full blur-[90px] animate-pulse-glow sm:h-80 sm:w-80 sm:blur-[100px] ${isLight ? "bg-blum-blue/10" : "bg-blum-blue/20"}`}
        style={{ animationDuration: "8s" }}
      />
      <div
        className={`absolute bottom-[-10%] left-[-5%] h-52 w-52 rounded-full blur-[90px] animate-pulse-glow sm:h-72 sm:w-72 sm:blur-[100px] ${isLight ? "bg-blum-purple/10" : "bg-blum-purple/20"}`}
        style={{ animationDuration: "12s" }}
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionReveal anchor className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <span
            className={`mb-5 inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-md sm:mb-6 sm:px-5 sm:py-2 sm:text-sm ${
              isLight
                ? "border border-blue-200 bg-white/80 text-blue-700"
                : "border border-white/20 bg-white/10 text-white"
            }`}
          >
            {t.badge}
          </span>

          <h2
            className={`mb-4 text-3xl font-extrabold leading-tight tracking-tight sm:mb-6 sm:text-5xl lg:text-6xl ${
              isLight ? "text-slate-950" : "text-white"
            }`}
          >
            {t.title}
          </h2>

          <p
            className={`text-sm leading-6 sm:text-xl sm:leading-8 ${isLight ? "text-slate-600" : "text-slate-300"}`}
          >
            {t.description}
          </p>
        </SectionReveal>

        <div className="mx-auto grid max-w-5xl gap-4 sm:gap-5 md:grid-cols-2">
          {t.items.map((item, index) => (
            <SectionReveal key={item.title} delay={0.06 * (index + 1)}>
              <GlowCard
                isLight={isLight}
                borderRadius={28}
                backgroundColor={isLight ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.06)"}
                boxShadow={isLight ? "0 18px 34px rgba(148,163,184,0.15)" : "0 8px 30px rgba(0,0,0,0.2)"}
                className="transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5"
              >
                <article className="relative h-full p-5 sm:p-7">
                  <div className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                    isLight
                      ? "bg-linear-to-r from-blue-50/0 via-blue-50 to-transparent"
                      : "bg-linear-to-r from-blum-blue/0 via-blum-blue/10 to-transparent"
                  }`} />

                  <div
                    className={`relative overflow-hidden rounded-[20px] border sm:rounded-[24px] ${
                      isLight
                        ? "border-slate-200/80 bg-slate-50/90"
                        : "border-white/10 bg-slate-950/30"
                    }`}
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 z-10 bg-linear-to-br ${
                        isLight
                          ? "from-white/12 via-transparent to-blue-100/12"
                          : "from-white/8 via-transparent to-blue-400/8"
                      }`}
                    />
                    <Image
                      src={solutionImages[index % solutionImages.length]}
                      alt={item.title}
                      width={800}
                      height={520}
                      className="relative z-0 h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                      draggable={false}
                    />
                  </div>

                  <div className="relative mt-5 flex items-start gap-4 sm:mt-6 sm:gap-5">
                    <div className="mt-1 shrink-0 rounded-2xl bg-linear-to-br from-yellow-300 to-amber-500 p-2.5 text-slate-950 shadow-lg shadow-amber-500/30 sm:p-3">
                      <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>

                    <div>
                      <h3 className={`text-xl font-bold tracking-wide sm:text-[1.75rem] ${isLight ? "text-slate-950" : "text-white"}`}>
                        {item.title}
                      </h3>
                      <p className={`mt-2.5 text-sm leading-6 sm:mt-3 sm:text-lg sm:leading-7 ${isLight ? "text-slate-600" : "text-slate-300"}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              </GlowCard>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
