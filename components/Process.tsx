"use client";

import {
  ShieldCheck,
  MessageSquareText,
  FileText,
  Rocket,
  Wrench,
  BadgeCheck,
} from "lucide-react";
import { m } from "framer-motion";
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
  };
}) {
  const { isLight } = useTheme();

  return (
    <section
      id="proceso"
      className={`content-auto-section section-divider relative overflow-hidden px-4 py-16 sm:px-6 sm:py-28 lg:px-8 lg:py-32 ${
        isLight
          ? "bg-[linear-gradient(to_bottom,#dbeafe_0%,#eff6ff_18%,#f8fafc_48%,#ffffff_100%)]"
          : "bg-[linear-gradient(to_bottom,#0f172a_0%,#0f172a_16%,#172554_38%,#1e293b_68%,#020617_100%)]"
      }`}
    >
      {/* Soft background glow without perpetual animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className={`absolute right-4 top-8 h-56 w-56 rounded-full blur-[88px] sm:right-10 sm:top-10 sm:h-96 sm:w-96 sm:blur-[100px] ${
            isLight ? "bg-blum-blue/10" : "bg-blum-blue/20"
          }`}
        />
        <div
          className={`absolute bottom-1/4 left-4 h-48 w-48 rounded-full blur-[72px] sm:left-10 sm:h-80 sm:w-80 sm:blur-[80px] ${
            isLight ? "bg-purple-500/[0.08]" : "bg-blum-purple/10"
          }`}
        />
      </div>

      <div className="relative mx-auto max-w-7xl z-10">
        <m.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:mb-20"
        >
          <span className={`mb-5 inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md sm:mb-6 sm:px-5 sm:py-2 sm:text-sm ${
            isLight
              ? "border border-blue-200 bg-white/80 text-blue-700 shadow-[0_0_15px_rgba(59,130,246,0.08)]"
              : "border border-white/20 bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          }`}>
            {t.badge}
          </span>

          <h2 className={`mb-4 text-3xl font-extrabold tracking-tight sm:mb-6 sm:text-5xl lg:text-6xl ${isLight ? "text-slate-950" : "text-white drop-shadow-md"}`}>
            {t.title}
          </h2>

          <p className={`mx-auto max-w-3xl text-sm font-medium leading-6 sm:text-xl sm:leading-8 lg:text-2xl ${isLight ? "text-slate-600" : "text-slate-200 drop-shadow-sm"}`}>
            {t.description}
          </p>
        </m.div>

        <m.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
             hidden: { opacity: 0 },
             show: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {t.cards.map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <m.article 
                key={item.title}
                variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`group relative h-full overflow-hidden rounded-[24px] p-5 backdrop-blur-xl transition-colors duration-500 sm:rounded-[30px] sm:p-8 ${
                  isLight
                    ? "m-1 border border-slate-200 bg-white/90 text-slate-950 shadow-[0_22px_40px_-22px_rgba(15,23,42,0.22)] hover:border-blum-blue/35 hover:shadow-[0_24px_50px_-20px_rgba(59,130,246,0.18)]"
                    : "border border-white/10 bg-white/5 text-white shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:border-blum-blue/50 hover:bg-white/10"
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blum-blue/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className={`absolute inset-0 pointer-events-none ${isLight ? "bg-[linear-gradient(180deg,rgba(59,130,246,0.06),transparent_42%)]" : "bg-[linear-gradient(180deg,rgba(59,130,246,0.1),transparent_45%)]"}`} />
                
                <div className="relative z-10">
                  <m.div 
                    whileHover={{ rotate: 15, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 sm:mb-8 sm:h-16 sm:w-16 ${
                      isLight
                        ? "border border-slate-200 bg-slate-50 shadow-[0_8px_16px_rgba(59,130,246,0.08)] group-hover:bg-blue-50 group-hover:shadow-[0_8px_25px_rgba(59,130,246,0.18)]"
                        : "border border-white/10 bg-white/10 shadow-[0_8px_16px_rgba(59,130,246,0.12)] group-hover:bg-blue-500/20 group-hover:shadow-[0_8px_25px_rgba(59,130,246,0.28)]"
                    }`}
                  >
                    <Icon className={`h-7 w-7 transition-colors duration-300 sm:h-8 sm:w-8 ${isLight ? "text-blue-600 group-hover:text-blum-blue" : "text-blue-200 group-hover:text-white"}`} />
                  </m.div>

                  <h3 className={`mb-3 text-xl font-bold transition-colors duration-300 sm:mb-4 sm:text-3xl ${isLight ? "text-slate-950 group-hover:text-blum-blue" : "text-white group-hover:text-blue-100"}`}>
                    {item.title}
                  </h3>

                  <p className={`text-sm leading-6 transition-colors sm:text-lg sm:leading-relaxed ${isLight ? "text-slate-600 group-hover:text-slate-700" : "text-slate-300 group-hover:text-slate-100"}`}>
                    {item.description}
                  </p>
                </div>
              </m.article>
            );
          })}
        </m.div>

      </div>
    </section>
  );
}
