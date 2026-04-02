"use client";

import Image from "next/image";
import { useState } from "react";
import {
  BriefcaseBusiness,
  Code2,
  Handshake,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/cn";
import { useReducedEffects } from "@/lib/useReducedEffects";
import GlowCard from "./GlowCard";
import SectionReveal from "./SectionReveal";
import { useTheme } from "./ThemeProvider";

const icons = [BriefcaseBusiness, Code2, Handshake, TrendingUp];

type AboutMember = {
  name: string;
  role: string;
  description: string;
  tag: string;
  focus: string;
};

type MemberMedia = {
  src: string;
  objectPosition: string;
  glowClassName: string;
  tintClassName: string;
};

type MemberCardBaseProps = {
  member: AboutMember;
  isLight: boolean;
  reduceEffects: boolean;
  isSpanish: boolean;
};

type MemberBackFaceProps = MemberCardBaseProps & {
  icon: LucideIcon;
};

const memberMedia: Record<string, MemberMedia> = {
  "Esteban Hurtado": {
    src: "/Esteban.jpeg",
    objectPosition: "48% 30%",
    glowClassName: "from-cyan-400/40 via-blue-500/18 to-transparent",
    tintClassName: "from-cyan-300/12 via-transparent to-blue-700/20",
  },
  "Jefferson Antelo": {
    src: "/Jeffer.png",
    objectPosition: "center 20%",
    glowClassName: "from-blue-500/38 via-indigo-500/18 to-transparent",
    tintClassName: "from-blue-300/12 via-transparent to-indigo-700/18",
  },
  "Pablo Coppa": {
    src: "/Coppa.jpeg",
    objectPosition: "46% 22%",
    glowClassName: "from-amber-300/42 via-orange-400/20 to-transparent",
    tintClassName: "from-amber-200/12 via-transparent to-orange-600/18",
  },
};

function MemberPortrait({
  name,
  compact = false,
  isLight,
  reduceEffects,
  isSpanish,
}: {
  name: string;
  compact?: boolean;
  isLight: boolean;
  reduceEffects: boolean;
  isSpanish: boolean;
}) {
  const media = memberMedia[name];
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      className={cn(
        "relative isolate shrink-0",
        compact ? "h-14 w-14 sm:h-16 sm:w-16" : "h-32 w-32 sm:h-36 sm:w-36"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-[-8%] rounded-[2.3rem] bg-linear-to-br blur-2xl transition duration-700",
          media?.glowClassName ?? "from-blum-blue/30 via-cyan-300/12 to-transparent",
          !reduceEffects && "group-hover:scale-110 group-hover:opacity-100"
        )}
      />

      <div
        className={cn(
          "relative h-full w-full overflow-hidden border backdrop-blur-sm",
          compact ? "rounded-[1.4rem]" : "rounded-[1.9rem]",
          isLight
            ? "border-white/80 bg-white/85 shadow-[0_18px_34px_-18px_rgba(14,116,144,0.28)]"
            : "border-white/15 bg-slate-950/45 shadow-[0_20px_40px_-22px_rgba(2,6,23,0.72)]"
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-linear-to-br",
            media?.tintClassName ?? "from-white/10 via-transparent to-blum-blue/20"
          )}
        />

        {media ? (
          <Image
            src={media.src}
            alt={isSpanish ? `Foto de ${name}` : `Photo of ${name}`}
            fill
            sizes={compact ? "72px" : "(min-width: 640px) 144px, 128px"}
            className={cn(
              "object-cover",
              !reduceEffects && "transition duration-700 group-hover:scale-110"
            )}
            style={{ objectPosition: media.objectPosition }}
          />
        ) : (
          <div
            className={cn(
              "flex h-full w-full items-center justify-center font-semibold tracking-[0.16em]",
              compact ? "text-lg" : "text-2xl",
              isLight ? "bg-slate-100 text-slate-600" : "bg-slate-900 text-slate-200"
            )}
          >
            {initials}
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_48%)] opacity-70 mix-blend-screen" />

        {!reduceEffects ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 w-2/3 -translate-x-[135%] rotate-12 bg-white/35 opacity-0 blur-2xl transition duration-700 will-change-transform group-hover:translate-x-[270%] group-hover:opacity-100" />
        ) : null}
      </div>
    </div>
  );
}

function MemberHeroMedia({
  member,
  isLight,
  reduceEffects,
  isSpanish,
}: MemberCardBaseProps) {
  const media = memberMedia[member.name];
  const initials = member.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="relative h-full">
      <div
        className={cn(
          "pointer-events-none absolute inset-x-8 bottom-6 h-24 rounded-full blur-[58px]",
          media?.glowClassName ?? "from-blum-blue/30 via-cyan-300/12 to-transparent",
          "bg-linear-to-r opacity-90"
        )}
      />

      <div
        className={cn(
          "relative h-full min-h-[29.5rem] overflow-hidden rounded-[1.95rem]",
          isLight
            ? "bg-white/88 shadow-[0_24px_50px_-28px_rgba(14,116,144,0.24)]"
            : "bg-white/[0.03] shadow-[0_24px_54px_-28px_rgba(2,6,23,0.7)]"
        )}
      >
          <div
            className={cn(
              "pointer-events-none absolute inset-0 bg-linear-to-br",
              media?.tintClassName ?? "from-white/10 via-transparent to-blum-blue/20"
            )}
          />

          {media ? (
            <Image
              src={media.src}
              alt={isSpanish ? `Foto de ${member.name}` : `Photo of ${member.name}`}
              fill
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 360px, 100vw"
              className={cn(
                "object-cover",
                !reduceEffects && "transition duration-700 group-hover:scale-[1.06]"
              )}
              style={{ objectPosition: media.objectPosition }}
            />
          ) : (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center font-semibold tracking-[0.18em]",
                isLight ? "bg-slate-100 text-slate-600" : "bg-slate-900 text-slate-200"
              )}
            >
              {initials}
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,rgba(15,23,42,0)_0%,rgba(15,23,42,0.16)_26%,rgba(15,23,42,0.58)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.38),transparent_42%)] mix-blend-screen" />

          <div className="pointer-events-none absolute inset-x-5 bottom-5">
            <p className="mx-auto max-w-[15.5rem] bg-linear-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-center text-lg font-semibold leading-6 text-balance text-transparent drop-shadow-[0_8px_18px_rgba(15,23,42,0.46)] sm:max-w-[17rem] sm:text-[1.4rem] sm:leading-7">
              {member.role}
            </p>
          </div>

          {!reduceEffects ? (
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-[150%] rotate-12 bg-white/25 opacity-0 blur-2xl transition duration-700 group-hover:translate-x-[320%] group-hover:opacity-100" />
          ) : null}
      </div>
    </div>
  );
}

function MemberFrontFace({
  member,
  isLight,
  reduceEffects,
  isSpanish,
}: MemberCardBaseProps) {
  return (
    <div className="relative flex h-full min-h-[31.5rem] flex-col p-2">
      <div className="relative flex h-full flex-col">
        <MemberHeroMedia
          member={member}
          isLight={isLight}
          reduceEffects={reduceEffects}
          isSpanish={isSpanish}
        />
      </div>
    </div>
  );
}

function MemberBackFace({
  member,
  icon: Icon,
  isLight,
  reduceEffects,
  isSpanish,
}: MemberBackFaceProps) {
  return (
    <div className="relative flex h-full min-h-[31.5rem] flex-col p-4 sm:p-[1.125rem]">
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          isLight
            ? "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.1),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.36),rgba(248,250,252,0.78))]"
            : "bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.12),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(15,23,42,0.18))]"
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-x-6 top-0 h-px",
          isLight
            ? "bg-linear-to-r from-transparent via-blum-blue/26 to-transparent"
            : "bg-linear-to-r from-transparent via-blue-300/22 to-transparent"
        )}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start gap-3">
          <MemberPortrait
            name={member.name}
            compact
            isLight={isLight}
            reduceEffects={reduceEffects}
            isSpanish={isSpanish}
          />

          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "text-[0.68rem] font-semibold uppercase tracking-[0.22em]",
                isLight ? "text-slate-400" : "text-slate-500"
              )}
            >
              {isSpanish ? "Perfil extendido" : "Extended profile"}
            </p>
            <h3
              className={cn(
                "mt-1.5 pr-2 text-[1.7rem] leading-[1.02] font-semibold tracking-[-0.05em] text-balance sm:text-[1.85rem]",
                isLight ? "text-slate-950" : "text-white"
              )}
            >
              {member.name}
            </h3>
            <p
              className={cn(
                "mt-2 text-sm font-semibold leading-5.5 sm:text-[14px]",
                isLight ? "text-blue-700" : "text-blue-200"
              )}
            >
              {member.role}
            </p>
          </div>

          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-[1.1rem] border",
              isLight
                ? "border-slate-200 bg-slate-50 text-blue-600"
                : "border-white/10 bg-white/5 text-blue-200"
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
        </div>

        <div
          className={cn(
            "mt-4 rounded-[1.35rem] border px-3.5 py-3.5",
            isLight ? "border-slate-200 bg-white/88" : "border-white/10 bg-black/10"
          )}
        >
          <p
            className={cn(
              "text-[0.68rem] font-semibold uppercase tracking-[0.2em]",
              isLight ? "text-slate-400" : "text-slate-500"
            )}
          >
            {isSpanish ? "Qué hace" : "What they do"}
          </p>
          <p
            className={cn(
              "mt-2 text-sm leading-5.5 sm:text-[13.5px] sm:leading-6",
              isLight ? "text-slate-600" : "text-slate-300"
            )}
          >
            {member.description}
          </p>
        </div>

        <div
          className={cn(
            "mt-3.5 rounded-[1.35rem] border px-3.5 py-3.5",
            isLight ? "border-slate-200 bg-slate-50/90" : "border-white/10 bg-white/[0.04]"
          )}
        >
          <p
            className={cn(
              "text-[0.68rem] font-semibold uppercase tracking-[0.2em]",
              isLight ? "text-slate-400" : "text-slate-500"
            )}
          >
            {isSpanish ? "Dónde aporta más valor" : "Where they add the most value"}
          </p>
          <p
            className={cn(
              "mt-2 text-sm leading-5.5 sm:text-[13.5px] sm:leading-6",
              isLight ? "text-slate-700" : "text-slate-200"
            )}
          >
            {member.focus}
          </p>
        </div>
      </div>
    </div>
  );
}

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
    members: AboutMember[];
  };
}) {
  const { isLight } = useTheme();
  const reduceEffects = useReducedEffects();
  const [flippedMembers, setFlippedMembers] = useState<Record<string, boolean>>({});
  const isSpanish = t.badge === "Nosotros";

  const toggleMember = (name: string) => {
    setFlippedMembers((current) => ({
      ...current,
      [name]: !current[name],
    }));
  };

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

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {t.members.map((member, index) => {
            const Icon = icons[index % icons.length];
            const isFlipped = Boolean(flippedMembers[member.name]);

            return (
              <SectionReveal key={member.name} delay={0.06 * (index + 1)}>
                <GlowCard
                  isLight={isLight}
                  borderRadius={32}
                  backgroundColor={isLight ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.06)"}
                  boxShadow="0 20px 42px -24px rgba(15,23,42,0.32)"
                  className="min-h-[31.5rem] transition-all duration-500 md:hover:-translate-y-2"
                >
                  <button
                    type="button"
                    onClick={() => toggleMember(member.name)}
                    aria-pressed={isFlipped}
                    aria-label={
                      isSpanish
                        ? `${isFlipped ? "Volver al frente" : "Ver detalles"} de ${member.name}`
                        : `${isFlipped ? "Flip to front" : "View details"} for ${member.name}`
                    }
                    className={cn(
                      "relative block h-full w-full rounded-[inherit] text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blum-blue/50",
                      !reduceEffects && "[perspective:1600px]"
                    )}
                  >
                    {reduceEffects ? (
                      isFlipped ? (
                        <MemberBackFace
                          member={member}
                          icon={Icon}
                          isLight={isLight}
                          reduceEffects={reduceEffects}
                          isSpanish={isSpanish}
                        />
                      ) : (
                        <MemberFrontFace
                          member={member}
                          isLight={isLight}
                          reduceEffects={reduceEffects}
                          isSpanish={isSpanish}
                        />
                      )
                    ) : (
                      <div
                        className={cn(
                          "relative h-full min-h-[31.5rem] transition-transform duration-700 [transform-style:preserve-3d]",
                          isFlipped && "[transform:rotateY(180deg)]"
                        )}
                      >
                        <div className="absolute inset-0 h-full [backface-visibility:hidden]">
                          <MemberFrontFace
                            member={member}
                            isLight={isLight}
                            reduceEffects={reduceEffects}
                            isSpanish={isSpanish}
                          />
                        </div>

                        <div className="absolute inset-0 h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                          <MemberBackFace
                            member={member}
                            icon={Icon}
                            isLight={isLight}
                            reduceEffects={reduceEffects}
                            isSpanish={isSpanish}
                          />
                        </div>
                      </div>
                    )}
                  </button>
                </GlowCard>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
