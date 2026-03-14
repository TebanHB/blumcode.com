"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Locale } from "@/i18n";

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
  const otherLang = lang === "es" ? "en" : "es";

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-[0_14px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(90,137,255,0.12),transparent_22%)]" />
          <div className="absolute -right-10 top-0 h-24 w-24 rounded-full bg-blum-yellow/10 blur-2xl" />
          <div className="absolute left-10 top-0 h-24 w-24 rounded-full bg-blum-blue/10 blur-2xl" />

          <div className="relative flex h-18 items-center justify-between px-4 sm:h-20 sm:px-6">
            <div className="min-w-0">
              <Link href={`/${lang}`} className="group flex items-center">
                <div className="flex h-11 w-[118px] items-center overflow-hidden rounded-xl bg-white/80 px-2 shadow-sm ring-1 ring-black/5 transition duration-300 group-hover:shadow-md sm:h-12 sm:w-[132px]">
                  <Image
                    src="/logo.svg"
                    alt="BlumCode Logo"
                    width={220}
                    height={60}
                    priority
                    className="h-7 w-auto max-w-none object-contain object-left sm:h-8"
                  />
                </div>
              </Link>
            </div>

            <div className="hidden flex-1 justify-center md:flex">
              <nav className="flex max-w-full items-center gap-1 rounded-full border border-black/5 bg-white/80 p-1.5 shadow-sm backdrop-blur lg:gap-2">
                <a
                  href="#servicios"
                  className="rounded-full px-3 py-2 text-sm font-medium text-gray-700 transition duration-300 hover:bg-blum-blue hover:text-white lg:px-4"
                >
                  {nav.services}
                </a>
                <a
                  href="#soluciones"
                  className="rounded-full px-3 py-2 text-sm font-medium text-gray-700 transition duration-300 hover:bg-blum-blue hover:text-white lg:px-4"
                >
                  {nav.solutions}
                </a>
                <a
                  href="#proceso"
                  className="rounded-full px-3 py-2 text-sm font-medium text-gray-700 transition duration-300 hover:bg-blum-blue hover:text-white lg:px-4"
                >
                  {nav.trust}
                </a>
                <a
                  href="#contacto"
                  className="rounded-full px-3 py-2 text-sm font-medium text-gray-700 transition duration-300 hover:bg-blum-blue hover:text-white lg:px-4"
                >
                  {nav.contact}
                </a>
              </nav>
            </div>

            <div className="hidden items-center md:flex">
              <Link
                href={`/${otherLang}`}
                className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/85 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur transition duration-300 hover:border-blum-blue hover:text-blum-blue hover:shadow-md lg:px-4"
              >
                <Globe className="h-4 w-4 transition duration-300 group-hover:rotate-12" />
                {otherLang.toUpperCase()}
              </Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setOpen(!open)}
                className="rounded-xl border border-black/5 bg-white/85 p-2.5 text-gray-800 shadow-sm backdrop-blur transition duration-300 hover:shadow-md"
                aria-label="Abrir menú"
              >
                {open ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.28 }}
                className="overflow-hidden border-t border-black/5 bg-white/95 backdrop-blur md:hidden"
              >
                <div className="space-y-3 px-4 py-4">
                  <a
                    href="#servicios"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-gray-700 shadow-sm transition hover:bg-blum-blue hover:text-white"
                  >
                    {nav.services}
                  </a>
                  <a
                    href="#soluciones"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-gray-700 shadow-sm transition hover:bg-blum-blue hover:text-white"
                  >
                    {nav.solutions}
                  </a>
                  <a
                    href="#proceso"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-gray-700 shadow-sm transition hover:bg-blum-blue hover:text-white"
                  >
                    {nav.trust}
                  </a>
                  <a
                    href="#contacto"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-gray-700 shadow-sm transition hover:bg-blum-blue hover:text-white"
                  >
                    {nav.contact}
                  </a>

                  <Link
                    href={`/${otherLang}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm"
                  >
                    <Globe className="h-4 w-4" />
                    {otherLang.toUpperCase()}
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}