"use client";

import { CircleHelp, MapPin, Search } from "lucide-react";

import SectionReveal from "./SectionReveal";
import { useTheme } from "./ThemeProvider";

type Question = {
  question: string;
  answer: string;
};

export default function SEOSection({
  t,
}: {
  t: {
    badge: string;
    title: string;
    description: string;
    paragraphs: string[];
    chips: string[];
    questions: Question[];
  };
}) {
  const { isLight } = useTheme();

  return (
    <section
      id="preguntas-frecuentes"
      className={`content-auto-section section-divider relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28 ${
        isLight
          ? "bg-[linear-gradient(180deg,#eef4ff_0%,#f8fafc_44%,#ffffff_100%)] text-slate-950"
          : "bg-[linear-gradient(180deg,#081225_0%,#0f172a_46%,#020617_100%)] text-white"
      }`}
    >
      <div
        className={`absolute inset-0 ${
          isLight
            ? "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.1),transparent_28%)]"
            : "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.12),transparent_30%)]"
        }`}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:gap-10">
          <SectionReveal className="max-w-3xl">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm ${
                isLight
                  ? "border border-blue-200 bg-white/85 text-blue-700"
                  : "border border-blue-400/25 bg-blue-500/10 text-blue-200"
              }`}
            >
              <Search className="h-4 w-4" />
              {t.badge}
            </span>

            <h2
              className={`mt-4 text-3xl font-semibold tracking-[-0.04em] sm:mt-5 sm:text-5xl lg:text-[3.3rem] ${
                isLight ? "text-slate-950" : "text-white"
              }`}
            >
              {t.title}
            </h2>

            <p
              className={`mt-4 max-w-2xl text-sm leading-6 sm:text-lg sm:leading-7 lg:text-xl ${
                isLight ? "text-slate-600" : "text-slate-300"
              }`}
            >
              {t.description}
            </p>

            <div className="mt-6 grid gap-4">
              {t.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className={`text-sm leading-7 sm:text-base sm:leading-8 ${
                    isLight ? "text-slate-600" : "text-slate-300"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {t.chips.map((chip) => (
                <span
                  key={chip}
                  className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold sm:text-sm ${
                    isLight
                      ? "border border-slate-200 bg-white/85 text-slate-700"
                      : "border border-white/10 bg-white/[0.06] text-slate-200"
                  }`}
                >
                  <MapPin className="h-3.5 w-3.5 text-blum-blue" />
                  {chip}
                </span>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <div
              className={`space-y-4 rounded-[30px] border p-5 shadow-[0_22px_44px_-24px_rgba(15,23,42,0.3)] backdrop-blur-xl sm:p-7 ${
                isLight
                  ? "m-1 border-slate-200 bg-white/88"
                  : "border-white/10 bg-white/[0.06]"
              }`}
            >
              {t.questions.map((item) => (
                <details
                  key={item.question}
                  className={`group rounded-[22px] border px-4 py-4 sm:px-5 ${
                    isLight
                      ? "border-slate-200 bg-slate-50/90"
                      : "border-white/10 bg-black/10"
                  }`}
                >
                  <summary
                    className={`flex cursor-pointer list-none items-start justify-between gap-3 text-left text-sm font-semibold leading-6 sm:text-base ${
                      isLight ? "text-slate-950" : "text-white"
                    }`}
                  >
                    <span className="flex items-start gap-3">
                      <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-blum-blue" />
                      <span>{item.question}</span>
                    </span>
                    <span
                      className={`mt-0.5 shrink-0 text-lg leading-none ${
                        isLight ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      +
                    </span>
                  </summary>

                  <p
                    className={`pt-3 text-sm leading-7 sm:text-[15px] ${
                      isLight ? "text-slate-600" : "text-slate-300"
                    }`}
                  >
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
