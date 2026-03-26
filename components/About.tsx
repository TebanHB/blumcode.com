"use client";

import {
  BriefcaseBusiness,
  Code2,
  Handshake,
  Sparkles,
} from "lucide-react";

import GlowCard from "./GlowCard";
import SectionReveal from "./SectionReveal";
import { useTheme } from "./ThemeProvider";

const icons = [BriefcaseBusiness, Code2, Handshake];

export default function About({
  t,
}: {
  t: {
    badge: string;
    title: string;
    description: string;
    summaryTitle: string;
    summaryDescription: string;
    pillars: string[];
    members: {
      name: string;
      role: string;
      description: string;
      tag: string;
      focus: string;
    }[];
  };
}) {
  const { isLight } = useTheme();

  return (
    <section
      id="nosotros"
      className={`nav-anchor-section content-auto-section section-divider relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28 ${
        isLight
          ? "bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_34%,#eef4ff_100%)] text-slate-950"
          : "bg-[linear-gradient(180deg,#020617_0%,#081225_34%,#0f172a_100%)] text-white"
      }`}
    >
      <div
        className={`absolute inset-0 ${
          isLight
            ? "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_28%)]"
            : "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.14),transparent_30%)]"
        }`}
      />
      <div
        className={`absolute left-[-8%] top-12 h-56 w-56 rounded-full blur-[88px] sm:h-72 sm:w-72 ${
          isLight ? "bg-blum-blue/12" : "bg-blum-blue/18"
        }`}
      />
      <div
        className={`absolute bottom-[-8%] right-[-6%] h-64 w-64 rounded-full blur-[96px] sm:h-80 sm:w-80 ${
          isLight ? "bg-cyan-300/18" : "bg-cyan-400/16"
        }`}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-end lg:gap-10">
          <SectionReveal anchor className="max-w-3xl">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm ${
                isLight
                  ? "border border-blue-200 bg-white/85 text-blue-700"
                  : "border border-blue-400/25 bg-blue-500/10 text-blue-200"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              {t.badge}
            </span>

            <h2
              className={`mt-4 text-3xl font-semibold tracking-[-0.04em] sm:mt-5 sm:text-5xl lg:text-[3.4rem] ${
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
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <GlowCard
              isLight={isLight}
              borderRadius={30}
              backgroundColor={isLight ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.06)"}
              boxShadow="0 22px 44px -24px rgba(15,23,42,0.3)"
            >
              <aside className="relative h-full p-6 sm:p-8">
                <div
                  className={`absolute inset-x-0 top-0 h-px ${
                    isLight
                      ? "bg-linear-to-r from-transparent via-blum-blue/35 to-transparent"
                      : "bg-linear-to-r from-transparent via-blue-300/30 to-transparent"
                  }`}
                />

                <p
                  className={`text-sm font-semibold uppercase tracking-[0.24em] ${
                    isLight ? "text-blue-700" : "text-blue-200"
                  }`}
                >
                  {t.summaryTitle}
                </p>

                <p
                  className={`mt-4 text-sm leading-6 sm:text-base sm:leading-7 ${
                    isLight ? "text-slate-600" : "text-slate-300"
                  }`}
                >
                  {t.summaryDescription}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {t.pillars.map((pillar) => (
                    <span
                      key={pillar}
                      className={`rounded-full px-3.5 py-2 text-xs font-semibold sm:text-sm ${
                        isLight
                          ? "border border-slate-200 bg-slate-50 text-slate-700"
                          : "border border-white/10 bg-white/5 text-slate-200"
                      }`}
                    >
                      {pillar}
                    </span>
                  ))}
                </div>
              </aside>
            </GlowCard>
          </SectionReveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {t.members.map((member, index) => {
            const Icon = icons[index % icons.length];

            return (
              <SectionReveal key={member.name} delay={0.06 * (index + 1)}>
                <GlowCard
                  isLight={isLight}
                  borderRadius={32}
                  backgroundColor={isLight ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.06)"}
                  boxShadow="0 20px 42px -24px rgba(15,23,42,0.32)"
                  className="transition-all duration-500 hover:-translate-y-2"
                >
                  <article className="relative h-full p-6 sm:p-8">
                    <div
                      className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                        isLight
                          ? "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_48%)]"
                          : "bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.16),transparent_46%)]"
                      }`}
                    />

                    <div className="relative flex items-start justify-end">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                          isLight
                            ? "bg-slate-100 text-blue-600"
                            : "bg-white/10 text-blue-200"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="relative mt-6">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${
                          isLight
                            ? "bg-slate-100 text-slate-700"
                            : "bg-white/10 text-slate-200"
                        }`}
                      >
                        {member.tag}
                      </span>

                      <h3
                        className={`mt-4 text-2xl font-semibold tracking-[-0.03em] sm:text-[2rem] ${
                          isLight ? "text-slate-950" : "text-white"
                        }`}
                      >
                        {member.name}
                      </h3>

                      <p
                        className={`mt-3 text-sm font-semibold leading-6 sm:text-base ${
                          isLight ? "text-blue-700" : "text-blue-200"
                        }`}
                      >
                        {member.role}
                      </p>

                      <p
                        className={`mt-4 text-sm leading-6 sm:text-[15px] sm:leading-7 ${
                          isLight ? "text-slate-600" : "text-slate-300"
                        }`}
                      >
                        {member.description}
                      </p>
                    </div>

                    <div
                      className={`relative mt-8 rounded-[22px] border px-4 py-3 text-sm font-medium ${
                        isLight
                          ? "border-slate-200 bg-slate-50 text-slate-700"
                          : "border-white/10 bg-black/10 text-slate-200"
                      }`}
                    >
                      {member.focus}
                    </div>
                  </article>
                </GlowCard>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
