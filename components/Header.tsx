"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="BlumCode Logo"
            width={180}
            height={60}
            priority
            className="h-10 w-auto object-contain sm:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#servicios" className="text-sm font-medium text-gray-700 transition hover:text-blum-blue">
            Servicios
          </a>
          <a href="#soluciones" className="text-sm font-medium text-gray-700 transition hover:text-blum-blue">
            Soluciones
          </a>
          <a href="#proceso" className="text-sm font-medium text-gray-700 transition hover:text-blum-blue">
            Proceso
          </a>
          <a href="#testimonios" className="text-sm font-medium text-gray-700 transition hover:text-blum-blue">
            Testimonios
          </a>
          <a href="#contacto" className="text-sm font-medium text-gray-700 transition hover:text-blum-blue">
            Contacto
          </a>
        </nav>

        <div className="hidden md:block">
          <a
            href="#contacto"
            className="rounded-xl bg-blum-blue px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-600"
          >
            Comenzar Proyecto
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-gray-800 md:hidden"
          aria-label="Abrir menú"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-black/5 bg-white md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5">
              <a href="#servicios" onClick={() => setOpen(false)} className="text-gray-700">
                Servicios
              </a>
              <a href="#soluciones" onClick={() => setOpen(false)} className="text-gray-700">
                Soluciones
              </a>
              <a href="#proceso" onClick={() => setOpen(false)} className="text-gray-700">
                Proceso
              </a>
              <a href="#testimonios" onClick={() => setOpen(false)} className="text-gray-700">
                Testimonios
              </a>
              <a href="#contacto" onClick={() => setOpen(false)} className="text-gray-700">
                Contacto
              </a>

              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-blum-blue px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Comenzar Proyecto
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}