"use client";

import {
  ShieldCheck,
  MessageSquareText,
  FileText,
  Rocket,
  Wrench,
  BadgeCheck,
} from "lucide-react";
import { motion } from "framer-motion";
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
      className={`section-divider relative overflow-hidden px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32 ${
        isLight
          ? "bg-[linear-gradient(to_bottom,#dbeafe_0%,#eff6ff_18%,#f8fafc_48%,#ffffff_100%)]"
          : "bg-[linear-gradient(to_bottom,#0f172a_0%,#0f172a_16%,#172554_38%,#1e293b_68%,#020617_100%)]"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 50, 0], rotate: [0, 90, 0] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className={`absolute top-10 right-10 h-96 w-96 rounded-full blur-[100px] ${isLight ? "bg-blum-blue/10" : "bg-blum-blue/20"}`} 
        />
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0], rotate: [0, -90, 0] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className={`absolute bottom-1/4 left-10 h-80 w-80 rounded-full blur-[80px] ${isLight ? "bg-purple-500/[0.08]" : "bg-blum-purple/10"}`} 
        />
      </div>

      <div className="relative mx-auto max-w-7xl z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center sm:mb-20"
        >
          <span className={`mb-6 inline-block rounded-full px-5 py-2 text-sm font-semibold backdrop-blur-md ${
            isLight
              ? "border border-blue-200 bg-white/80 text-blue-700 shadow-[0_0_15px_rgba(59,130,246,0.08)]"
              : "border border-white/20 bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          }`}>
            {t.badge}
          </span>

          <h2 className={`mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl ${isLight ? "text-slate-950" : "text-white drop-shadow-md"}`}>
            {t.title}
          </h2>

          <p className={`mx-auto max-w-3xl text-lg font-medium leading-8 sm:text-xl lg:text-2xl ${isLight ? "text-slate-600" : "text-slate-200 drop-shadow-sm"}`}>
            {t.description}
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
             hidden: { opacity: 0 },
             show: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {t.cards.map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <motion.article 
                key={item.title}
                variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`group relative h-full overflow-hidden rounded-[30px] p-8 backdrop-blur-xl transition-colors duration-500 ${
                  isLight
                    ? "m-1 border border-slate-200 bg-white/90 text-slate-950 shadow-[0_22px_40px_-22px_rgba(15,23,42,0.22)] hover:border-blum-blue/35 hover:shadow-[0_24px_50px_-20px_rgba(59,130,246,0.18)]"
                    : "border border-white/10 bg-white/5 text-white shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:border-blum-blue/50 hover:bg-white/10"
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blum-blue/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className={`absolute inset-0 pointer-events-none ${isLight ? "bg-[linear-gradient(180deg,rgba(59,130,246,0.06),transparent_42%)]" : "bg-[linear-gradient(180deg,rgba(59,130,246,0.1),transparent_45%)]"}`} />
                
                <div className="relative z-10">
                  <motion.div 
                    whileHover={{ rotate: 15, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 ${
                      isLight
                        ? "border border-slate-200 bg-slate-50 shadow-[0_8px_16px_rgba(59,130,246,0.08)] group-hover:bg-blue-50 group-hover:shadow-[0_8px_25px_rgba(59,130,246,0.18)]"
                        : "border border-white/10 bg-white/10 shadow-[0_8px_16px_rgba(59,130,246,0.12)] group-hover:bg-blue-500/20 group-hover:shadow-[0_8px_25px_rgba(59,130,246,0.28)]"
                    }`}
                  >
                    <Icon className={`h-8 w-8 transition-colors duration-300 ${isLight ? "text-blue-600 group-hover:text-blum-blue" : "text-blue-200 group-hover:text-white"}`} />
                  </motion.div>

                  <h3 className={`mb-4 text-2xl font-bold transition-colors duration-300 sm:text-3xl ${isLight ? "text-slate-950 group-hover:text-blum-blue" : "text-white group-hover:text-blue-100"}`}>
                    {item.title}
                  </h3>

                  <p className={`text-base leading-relaxed transition-colors sm:text-lg ${isLight ? "text-slate-600 group-hover:text-slate-700" : "text-slate-300 group-hover:text-slate-100"}`}>
                    {item.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
