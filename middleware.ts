import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/i18n";

const DEFAULT_LOCALE = "en"; // Fallback a inglés

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Obtener el idioma del navegador
  const locale =
    getLocaleFromAcceptLanguage(request.headers.get("accept-language")) ||
    DEFAULT_LOCALE;

  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  );
}

function getLocaleFromAcceptLanguage(acceptLanguage: string | null): string | null {
  if (!acceptLanguage) return null;

  const languages = acceptLanguage
    .split(",")
    .map((lang) => lang.split(";")[0].trim().toLowerCase());

  for (const lang of languages) {
    // Intenta coincidencia exacta (ej: "es" o "en")
    if (locales.includes(lang as any)) {
      return lang;
    }
    // Intenta coincidencia parcial (ej: "es-MX" → "es")
    const langPrefix = lang.split("-")[0];
    if (locales.includes(langPrefix as any)) {
      return langPrefix;
    }
  }

  return null;
}

export const config = {
  matcher: [
    // Excluye archivos estáticos y API
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|.*\\.svg).*)",
  ],
};
