"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

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
      className={`section-divider relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28 ${
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
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`mb-5 inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-md sm:mb-6 sm:px-5 sm:py-2 sm:text-sm ${
              isLight
                ? "border border-blue-200 bg-white/80 text-blue-700"
                : "border border-white/20 bg-white/10 text-white"
            }`}
          >
            {t.badge}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`mb-4 text-3xl font-extrabold leading-tight tracking-tight sm:mb-6 sm:text-5xl lg:text-6xl ${
              isLight ? "text-slate-950" : "text-white"
            }`}
          >
            {t.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-sm leading-6 sm:text-xl sm:leading-8 ${isLight ? "text-slate-600" : "text-slate-300"}`}
          >
            {t.description}
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="mx-auto grid max-w-5xl gap-4 sm:gap-5 md:grid-cols-2"
        >
          {t.items.map((item) => (
            <motion.article
              key={item.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.35, ease: "easeOut" },
                },
              }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className={`group relative min-h-[188px] overflow-hidden rounded-[24px] p-5 backdrop-blur-md transition-colors duration-300 sm:min-h-[220px] sm:rounded-[28px] sm:p-7 ${
                isLight
                  ? "m-1 border border-slate-200 bg-white/90 shadow-[0_18px_34px_rgba(148,163,184,0.15)] hover:border-blum-blue/30 hover:bg-white"
                  : "border border-white/10 bg-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:border-blum-blue/40 hover:bg-white/10"
              }`}
            >
              <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none ${isLight ? "bg-linear-to-r from-blue-50/0 via-blue-50 to-transparent" : "bg-linear-to-r from-blum-blue/0 via-blum-blue/10 to-transparent"}`} />

              <div className="relative flex items-start gap-4 sm:gap-5">
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
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
