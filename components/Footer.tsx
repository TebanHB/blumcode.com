"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/animate-ui/components/radix/hover-card";

import SectionReveal from "./SectionReveal";
import { useTheme } from "./ThemeProvider";

const socialCards = {
  whatsapp: {
    href: "https://wa.me/59173628134",
    image: "/contact-whatsapp.svg",
    titleEs: "WhatsApp BlumCode",
    titleEn: "BlumCode WhatsApp",
    subtitle: "+591 73628134",
    descriptionEs:
      "Habla con nosotros por WhatsApp para cotizaciones, seguimiento de proyectos y consultas rapidas.",
    descriptionEn:
      "Talk to us on WhatsApp for quotes, project follow-up, and quick questions.",
    metaPrimaryEs: "Respuesta",
    metaPrimaryEn: "Replies",
    metaPrimaryValue: "< 1h",
    metaSecondaryEs: "Canal",
    metaSecondaryEn: "Channel",
    metaSecondaryValue: "Directo",
  },
  tiktok: {
    href: "https://www.tiktok.com/@blumcode_",
    image: "/contact-tiktok.svg",
    titleEs: "TikTok BlumCode",
    titleEn: "BlumCode TikTok",
    subtitle: "@blumcode_",
    descriptionEs:
      "Mira contenido corto sobre desarrollo, producto digital y el trabajo detras de BlumCode.",
    descriptionEn:
      "Watch short-form content about development, digital product, and the work behind BlumCode.",
    metaPrimaryEs: "Cuenta",
    metaPrimaryEn: "Account",
    metaPrimaryValue: "Activa",
    metaSecondaryEs: "Contenido",
    metaSecondaryEn: "Content",
    metaSecondaryValue: "Tech",
  },
} as const;

export default function Footer({
  t,
  year,
}: {
  t: {
    description: string;
    contact: string;
    city: string;
    rights: string;
    email: string;
  };
  year: number;
}) {
  const { isLight } = useTheme();
  const isSpanish = t.contact === "Contacto";

  return (
    <footer
      id="contacto"
      className={`nav-anchor-section content-auto-section relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28 ${
        isLight
          ? "bg-[linear-gradient(to_bottom,#f8fafc,#e2e8f0)] text-slate-950"
          : "bg-[linear-gradient(to_bottom,#020617,#000000)] text-white"
      }`}
    >
      <div
        className={`absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full blur-[120px] ${
          isLight ? "bg-blum-blue/[0.08]" : "bg-blum-blue/10"
        }`}
      />
      <div
        className={`absolute right-[-10%] bottom-[-10%] h-[400px] w-[400px] rounded-full blur-[100px] ${
          isLight ? "bg-purple-500/[0.08]" : "bg-purple-500/[0.08]"
        }`}
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionReveal anchor className="mb-12 text-center sm:mb-16">
          <h2
            className={`mb-4 text-3xl font-extrabold tracking-tight sm:mb-6 sm:text-5xl lg:text-6xl ${
              isLight ? "text-slate-950" : "text-white"
            }`}
          >
            {t.contact === "Contacto"
              ? "\u00BFListo para transformar tu negocio?"
              : "Ready to transform your business?"}
          </h2>
          <p
            className={`mx-auto mb-8 max-w-2xl text-sm leading-6 sm:mb-10 sm:text-xl sm:leading-relaxed ${
              isLight ? "text-slate-600" : "text-slate-300"
            }`}
          >
            {t.description}
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="https://wa.me/59173628134"
              target="_blank"
              rel="noopener noreferrer"
              className="ui-btn ui-btn-primary ui-btn-lg ui-btn-readable group w-full max-w-sm px-6 py-3.5 text-base font-semibold text-white sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              {t.contact === "Contacto" ? "Escribir por WhatsApp" : "Message on WhatsApp"}
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href={`mailto:${t.email}`}
              className="ui-btn ui-btn-secondary ui-btn-lg ui-btn-readable w-full max-w-sm break-all px-6 py-3.5 text-base font-semibold sm:w-auto sm:break-normal sm:px-8 sm:py-4 sm:text-lg"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t.email}
            </a>
          </div>
        </SectionReveal>

        <div
          className={`rounded-[24px] p-6 backdrop-blur-sm sm:rounded-[34px] sm:p-10 ${
            isLight
              ? "m-1 border border-slate-200 bg-white/85 shadow-[0_18px_34px_rgba(148,163,184,0.18)]"
              : "border border-white/10 bg-white/5 shadow-[0_12px_28px_rgba(0,0,0,0.2)]"
          }`}
        >
          <div className="grid gap-8 sm:gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] md:items-start md:gap-12 lg:gap-16">
            <div className="flex h-full flex-col justify-center text-center md:text-left">
              <div className="mx-auto flex h-12 w-[140px] items-center justify-center overflow-hidden md:mx-0 sm:h-14 sm:w-[160px]">
                <Image
                  src={isLight ? "/logo.svg" : "/logo-blanco.svg"}
                  alt="BlumCode Logo"
                  width={220}
                  height={60}
                  className="h-10 w-auto max-w-none object-contain object-left sm:h-12"
                />
              </div>

              <p
                className={`mt-4 max-w-md text-sm leading-6 md:max-w-none sm:mt-5 sm:text-lg sm:leading-7 ${
                  isLight ? "text-slate-600" : "text-gray-300"
                }`}
              >
                {t.description}
              </p>

              {/* <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:justify-start">
                {[
                  "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                  "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
                  "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                  "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
                ].map((path, index) => (
                  <a key={index} href="#" className="ui-btn ui-btn-icon h-11 w-11">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={path} />
                    </svg>
                  </a>
                ))}
              </div> */}
            </div>

            <div
              className={`flex flex-col items-center rounded-[22px] border px-5 py-6 text-center sm:px-6 sm:py-7 md:items-end md:text-right ${
                isLight
                  ? "border-slate-200 bg-slate-50/85"
                  : "border-white/10 bg-black/10"
              }`}
            >
              <h4 className="mb-4 text-lg font-bold sm:mb-5 sm:text-xl">{t.contact}</h4>
              <div className="flex w-full flex-col gap-4">
                <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
                  {(["whatsapp", "tiktok"] as const).map((key) => {
                    const social = socialCards[key];

                    return (
                      <HoverCard key={key} followCursor="x">
                        <HoverCardTrigger asChild>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label={social.subtitle}
                            className={`group relative inline-flex size-14 items-center justify-center overflow-hidden rounded-full border transition-transform duration-200 hover:-translate-y-0.5 ${
                              isLight
                                ? "border-slate-200 bg-white shadow-[0_14px_28px_rgba(148,163,184,0.16)]"
                                : "border-white/10 bg-white/6 shadow-[0_14px_28px_rgba(0,0,0,0.24)]"
                            }`}
                          >
                            <Image
                              src={social.image}
                              alt={social.subtitle}
                              width={56}
                              height={56}
                              className="size-full object-cover"
                            />
                          </a>
                        </HoverCardTrigger>

                        <HoverCardContent
                          side="top"
                          sideOffset={20}
                          align="end"
                          className={`w-[20rem] ${
                            isLight
                              ? "border-slate-200 bg-white text-slate-950 shadow-[0_24px_70px_rgba(148,163,184,0.22)]"
                              : "border-white/10 bg-slate-950/94 text-white shadow-[0_24px_70px_rgba(2,6,23,0.42)]"
                          }`}
                        >
                          <div className="flex flex-col gap-4">
                            <Image
                              className={`size-16 rounded-full border object-cover ${
                                isLight ? "border-slate-200" : "border-white/10"
                              }`}
                              src={social.image}
                              alt={social.subtitle}
                              width={64}
                              height={64}
                            />

                            <div className="flex flex-col gap-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <div className="font-bold">
                                    {isSpanish ? social.titleEs : social.titleEn}
                                  </div>
                                  <ExternalLink className={`h-4 w-4 ${isLight ? "text-slate-400" : "text-slate-500"}`} />
                                </div>
                                <div className={`text-sm ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                                  {social.subtitle}
                                </div>
                              </div>

                              <div className={`text-sm leading-6 ${isLight ? "text-slate-600" : "text-slate-300"}`}>
                                {isSpanish ? social.descriptionEs : social.descriptionEn}
                              </div>

                              <div className="flex gap-4">
                                <div className="flex items-center gap-1 text-sm">
                                  <div className="font-bold">{social.metaPrimaryValue}</div>
                                  <div className={isLight ? "text-slate-500" : "text-slate-400"}>
                                    {isSpanish ? social.metaPrimaryEs : social.metaPrimaryEn}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                  <div className="font-bold">{social.metaSecondaryValue}</div>
                                  <div className={isLight ? "text-slate-500" : "text-slate-400"}>
                                    {isSpanish ? social.metaSecondaryEs : social.metaSecondaryEn}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    );
                  })}
                </div>

                <a
                  href={`mailto:${t.email}`}
                  className={`flex flex-wrap items-center justify-center gap-3 break-all text-sm transition-colors sm:text-base md:justify-end ${
                    isLight ? "text-slate-600 hover:text-slate-950" : "text-gray-300 hover:text-white"
                  }`}
                >
                  <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{t.email}</span>
                </a>
                <p
                  className={`mt-1 flex flex-wrap items-center justify-center gap-3 text-sm sm:text-base md:justify-end ${
                    isLight ? "text-slate-600" : "text-gray-300"
                  }`}
                >
                  <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{t.city}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`mt-10 border-t pt-6 text-center text-sm sm:mt-12 ${
            isLight ? "border-slate-200 text-slate-500" : "border-white/10 text-gray-400"
          }`}
        >
          {"\u00A9"} {year} BlumCode. {t.rights}
        </div>
      </div>
    </footer>
  );
}
