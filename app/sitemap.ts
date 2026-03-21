import type { MetadataRoute } from "next";

import { locales } from "@/i18n";
import { getAlternateLanguageUrls, getLocaleUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const alternates = getAlternateLanguageUrls();

  return locales.map((lang) => ({
    url: getLocaleUrl(lang),
    lastModified,
    changeFrequency: "monthly",
    priority: lang === "es" ? 1 : 0.9,
    alternates: {
      languages: alternates,
    },
  }));
}
