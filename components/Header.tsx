"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe, MoonStar } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Locale } from "@/i18n";
import { AnimatePresence, m } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const NAV_ITEMS = [
  { key: "services", sectionId: "servicios" },
  { key: "solutions", sectionId: "soluciones" },
  { key: "process", sectionId: "proceso" },
  { key: "team", sectionId: "nosotros" },
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
    team: string;
    contact: string;
  };
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const otherLang = lang === "es" ? "en" : "es";
  const { isLight, toggleTheme } = useTheme();
  const themeButtonLabel = lang === "es" ? "Cambiar tema" : "Toggle theme";

  const getNavLabel = useCallback(
    (key: string) => {
      const map: Record<string, string> = {
        services: nav.services,
        solutions: nav.solutions,
        process: nav.trust,
        team: nav.team,
        contact: nav.contact,
      };
      return map[key] ?? key;
    },
    [nav]
  );

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 80;
      setScrolled((current) => (current === nextScrolled ? current : nextScrolled));
    };

    handleScroll();
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
      <m.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        className="px-3 pt-3 sm:px-4 sm:pt-4 md:px-6 md:pt-5"
      >
        <div
          className={`mx-auto flex items-center justify-between rounded-full px-3.5 transition-all duration-500 ease-in-out sm:px-5 lg:px-7 ${
            scrolled
              ? isLight
                ? "h-[3.35rem] max-w-5xl border border-slate-200/80 bg-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:h-14"
                : "h-[3.35rem] max-w-5xl border border-white/10 bg-slate-950/75 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:h-14"
              : isLight
                ? "h-[3.5rem] max-w-7xl border border-transparent bg-white/15 backdrop-blur-sm sm:h-16"
                : "h-[3.5rem] max-w-7xl bg-transparent sm:h-16"
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
                  scrolled ? "h-[1.375rem] sm:h-7" : "h-6 sm:h-9"
                }`}
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.sectionId;
              const isContact = item.key === "contact";
              return (
                <a
                  key={item.sectionId}
                  href={`#${item.sectionId}`}
                  className={`relative rounded-full px-3.5 py-2 text-sm font-medium tracking-wide transition-all duration-300 ${
                    isContact
                      ? "ui-btn ui-btn-primary ui-btn-chip ml-1.5 px-4 py-2.5 text-white"
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
                    <m.span
                      layoutId="navDot"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-blum-blue"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}

            <div className={`ml-3 flex items-center gap-2.5 pl-3 ${isLight ? "border-l border-slate-200/80" : "border-l border-white/15"}`}>
              <button
                onClick={toggleTheme}
                className="ui-btn ui-btn-icon h-10 w-10"
                aria-label={themeButtonLabel}
              >
                <MoonStar className="h-4 w-4" />
              </button>
              <Link
                href={`/${otherLang}`}
                scroll={false}
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
              className="ui-btn ui-btn-icon mr-1 h-9 w-9 sm:h-10 sm:w-10"
              aria-label={themeButtonLabel}
            >
              <MoonStar className="h-[1.125rem] w-[1.125rem] sm:h-5 sm:w-5" />
            </button>
            <Link
              href={`/${otherLang}`}
              scroll={false}
              className="ui-btn ui-btn-icon mr-1.5 h-9 w-9 sm:mr-2 sm:h-10 sm:w-10"
            >
              <Globe className="h-[1.125rem] w-[1.125rem] sm:h-5 sm:w-5" />
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className={`relative inline-grid h-9 w-9 shrink-0 place-items-center rounded-full p-0 leading-none transition-all focus:outline-hidden sm:h-10 sm:w-10 ${
                isLight
                  ? "border border-slate-200/80 bg-white/92 text-slate-800 shadow-[0_10px_22px_rgba(148,163,184,0.16)]"
                  : "border border-white/10 bg-white/5 text-white/80 shadow-[0_10px_22px_rgba(2,6,23,0.24)]"
              }`}
              aria-expanded={open}
              aria-label={open ? "Close main menu" : "Open main menu"}
            >
              <span className="sr-only">{open ? "Close main menu" : "Open main menu"}</span>
              {open ? (
                <svg
                  viewBox="0 0 20 20"
                  className="block h-[1.05rem] w-[1.05rem] -translate-x-[0.5px] text-current sm:h-[1.15rem] sm:w-[1.15rem]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 20 20"
                  className="block h-[1.05rem] w-[1.05rem] -translate-x-[0.5px] text-current sm:h-[1.15rem] sm:w-[1.15rem]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M4.5 5.5H15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4.5 10H15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4.5 14.5H15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {open && (
            <m.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`mx-auto mt-2 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl backdrop-blur-xl shadow-2xl md:hidden sm:max-w-5xl ${
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
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </header>
  );
}
