"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto grid h-18 max-w-7xl grid-cols-[auto_1fr_auto] items-center px-4 sm:px-6 lg:px-8">
        <div className="justify-self-start">
          <Link href={`/${lang}`} className="flex items-center">
            <Image
              src="/logo.svg"
              alt="BlumCode Logo"
              width={180}
              height={60}
              priority
              className="h-10 w-auto object-contain sm:h-11"
            />
          </Link>
        </div>

        <nav className="hidden items-center justify-center gap-8 md:flex">
          <a
            href="#servicios"
            className="text-sm font-medium text-gray-700 transition hover:text-blum-blue"
          >
            {nav.services}
          </a>
          <a
            href="#soluciones"
            className="text-sm font-medium text-gray-700 transition hover:text-blum-blue"
          >
            {nav.solutions}
          </a>
          <a
            href="#proceso"
            className="text-sm font-medium text-gray-700 transition hover:text-blum-blue"
          >
            {nav.trust}
          </a>
          <a
            href="#contacto"
            className="text-sm font-medium text-gray-700 transition hover:text-blum-blue"
          >
            {nav.contact}
          </a>
        </nav>

        <div className="hidden items-center gap-3 justify-self-end md:flex">
          <Link
            href={`/${otherLang}`}
            className="rounded-lg border border-black/10 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:border-blum-blue hover:text-blum-blue"
          >
            {otherLang.toUpperCase()}
          </Link>
        </div>

        <div className="justify-self-end md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-gray-800"
            aria-label="Abrir menú"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-black/5 bg-white md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-center">
              <a
                href="#servicios"
                onClick={() => setOpen(false)}
                className="text-gray-700"
              >
                {nav.services}
              </a>
              <a
                href="#soluciones"
                onClick={() => setOpen(false)}
                className="text-gray-700"
              >
                {nav.solutions}
              </a>
              <a
                href="#proceso"
                onClick={() => setOpen(false)}
                className="text-gray-700"
              >
                {nav.trust}
              </a>
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="text-gray-700"
              >
                {nav.contact}
              </a>
              <Link
                href={`/${otherLang}`}
                onClick={() => setOpen(false)}
                className="mx-auto rounded-lg border border-black/10 px-3 py-2 text-sm font-medium text-gray-700"
              >
                {otherLang.toUpperCase()}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}