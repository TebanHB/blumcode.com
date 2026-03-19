"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe, Menu, MoonStar, SunMedium, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Locale } from "@/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const NAV_ITEMS = [
  { key: "services", sectionId: "servicios" },
  { key: "solutions", sectionId: "soluciones" },
  { key: "process", sectionId: "proceso" },
  { key: "contact", sectionId: "contacto" },
] as const;

export default function Header({
  lang,
  nav,
}: {
  lang: Locale;
  nav: {
    services: string;
    solutions: string;
    trust: string;
    contact: string;
  };
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const otherLang = lang === "es" ? "en" : "es";
  const { isLight, toggleTheme } = useTheme();
  const nextThemeLabel = lang === "es" ? (isLight ? "Oscuro" : "Claro") : isLight ? "Dark" : "Light";
  const nextThemeAria =
    lang === "es"
      ? isLight
        ? "Cambiar a tema oscuro"
        : "Cambiar a tema claro"
      : isLight
        ? "Switch to dark theme"
        : "Switch to light theme";

  const getNavLabel = useCallback(
    (key: string) => {
      const map: Record<string, string> = {
        services: nav.services,
        solutions: nav.solutions,
        process: nav.trust,
        contact: nav.contact,
      };
      return map[key] ?? key;
    },
    [nav]
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to track active section
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((i) => i.sectionId);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Navbar container — always transparent initially, dark glassmorphism pill on scroll */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        className="px-4 pt-4 md:px-6 md:pt-5"
      >
        <div
          className={`mx-auto flex items-center justify-between rounded-full px-5 transition-all duration-500 ease-in-out lg:px-7 ${
            scrolled
              ? isLight
                ? "max-w-5xl h-14 border border-slate-200/80 bg-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.12)] backdrop-blur-xl"
                : "max-w-5xl h-14 bg-slate-950/75 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl border border-white/10"
              : isLight
                ? "max-w-7xl h-16 border border-transparent bg-white/15 backdrop-blur-sm"
                : "max-w-7xl h-16 bg-transparent"
          }`}
        >
          {/* Logo */}
          <div className="shrink-0">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center cursor-pointer"
              aria-label="Scroll to top"
            >
              <Image
                src={isLight ? "/logo.svg" : "/logo-blanco.svg"}
                alt="BlumCode Logo"
                width={130}
                height={36}
                priority
                className={`w-auto object-contain transition-all duration-500 ${
                  scrolled ? "h-6 sm:h-7" : "h-7 sm:h-9"
                }`}
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.sectionId;
              const isContact = item.key === "contact";
              return (
                <a
                  key={item.sectionId}
                  href={`#${item.sectionId}`}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 ${
                    isContact
                      ? "ui-btn ui-btn-primary ui-btn-chip ml-2 px-5 py-2.5 text-white"
                      : isActive
                        ? isLight
                          ? "bg-blue-500/10 text-slate-950 font-semibold"
                          : "text-white font-semibold bg-white/10"
                        : isLight
                          ? "text-slate-600 hover:text-slate-950 hover:bg-slate-900/5"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {getNavLabel(item.key)}
                  {isActive && !isContact && (
                    <motion.span
                      layoutId="navDot"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-blum-blue"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}

            <div className={`ml-3 pl-3 ${isLight ? "border-l border-slate-200/80" : "border-l border-white/15"}`}>
              <button
                onClick={toggleTheme}
                className="ui-btn ui-btn-soft ui-btn-chip mr-2 px-3.5 py-2"
                aria-label={nextThemeAria}
              >
                {isLight ? <MoonStar className="h-3.5 w-3.5" /> : <SunMedium className="h-3.5 w-3.5" />}
                {nextThemeLabel}
              </button>
              <Link
                href={`/${otherLang}`}
                className="ui-btn ui-btn-soft ui-btn-chip gap-2 px-3 py-2 text-[0.68rem]"
              >
                <Globe className="h-3.5 w-3.5" />
                {otherLang}
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleTheme}
              className="ui-btn ui-btn-icon mr-1"
              aria-label={nextThemeAria}
            >
              {isLight ? <MoonStar className="h-5 w-5" /> : <SunMedium className="h-5 w-5" />}
            </button>
            <Link
              href={`/${otherLang}`}
              className="ui-btn ui-btn-icon mr-2"
            >
              <Globe className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="ui-btn ui-btn-icon focus:outline-hidden"
            >
              <span className="sr-only">Open main menu</span>
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`mx-auto mt-2 max-w-5xl overflow-hidden rounded-2xl backdrop-blur-xl shadow-2xl md:hidden ${
                isLight
                  ? "border border-slate-200/80 bg-white/90"
                  : "border border-white/10 bg-slate-950/90"
              }`}
            >
              <div className="space-y-1 px-4 pb-4 pt-3">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.sectionId;
                  return (
                    <a
                      key={item.sectionId}
                      href={`#${item.sectionId}`}
                      onClick={() => setOpen(false)}
                      className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                        isActive
                          ? isLight
                            ? "bg-blue-500/10 text-slate-950"
                            : "bg-white/10 text-white"
                          : isLight
                            ? "text-slate-600 hover:bg-slate-900/5 hover:text-slate-950"
                            : "text-white/60 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {getNavLabel(item.key)}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
