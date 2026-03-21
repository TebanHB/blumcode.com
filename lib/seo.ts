import type { Metadata } from "next";

import { defaultLocale, type Locale } from "@/i18n";

export const SITE_NAME = "BlumCode";
export const SITE_URL = "https://blumcode.com";
export const COMPANY_PHONE = "+59173628134";
export const COMPANY_WHATSAPP_URL = "https://wa.me/59173628134";
export const COMPANY_CITY = "Santa Cruz de la Sierra";
export const COMPANY_COUNTRY = "Bolivia";

type LocaleSeoContent = {
  title: string;
  description: string;
  keywords: string[];
  ogLocale: string;
  socialTitle: string;
  socialSubtitle: string;
  socialPills: string[];
  contactLabel: string;
};

const SEO_CONTENT: Record<Locale, LocaleSeoContent> = {
  es: {
    title: "Desarrollo de Software a Medida para Empresas | BlumCode",
    description:
      "BlumCode crea software a medida, aplicaciones web y mobile, integraciones, UX/UI, analitica y soporte continuo para empresas que quieren crecer.",
    keywords: [
      "desarrollo de software a medida",
      "desarrollo web",
      "desarrollo mobile",
      "integracion de sistemas",
      "ux ui",
      "consultoria IT",
      "data analytics",
      "cloud services",
      "mantenimiento de software",
      "BlumCode",
    ],
    ogLocale: "es_BO",
    socialTitle: "Desarrollo de software a medida",
    socialSubtitle: "Soluciones web, mobile y soporte continuo para empresas.",
    socialPills: ["Web", "Mobile", "Cloud"],
    contactLabel: "ventas",
  },
  en: {
    title: "Custom Software Development for Businesses | BlumCode",
    description:
      "BlumCode builds custom software, web and mobile apps, integrations, UX/UI, analytics, and long-term support for growing businesses.",
    keywords: [
      "custom software development",
      "web development",
      "mobile app development",
      "systems integration",
      "UX UI",
      "IT consulting",
      "data analytics",
      "cloud services",
      "software maintenance",
      "BlumCode",
    ],
    ogLocale: "en_US",
    socialTitle: "Custom software development",
    socialSubtitle: "Web, mobile, cloud and ongoing support for growing businesses.",
    socialPills: ["Web", "Mobile", "Support"],
    contactLabel: "sales",
  },
};

type ServiceItem = {
  title: string;
  description: string;
};

export function getSafeLocale(lang: string): Locale {
  return lang === "en" ? "en" : "es";
}

export function getLocaleUrl(lang: Locale) {
  return `${SITE_URL}/${lang}`;
}

export function getAlternateLanguageUrls() {
  return {
    es: getLocaleUrl("es"),
    en: getLocaleUrl("en"),
    "x-default": getLocaleUrl(defaultLocale),
  };
}

export function getLocaleSeoContent(lang: Locale) {
  return SEO_CONTENT[lang];
}

export function getLocaleEmail(lang: Locale) {
  return lang === "en" ? "sales@blumcode.com" : "ventas@blumcode.com";
}

export function getOpenGraphImageUrl(lang: Locale) {
  return `${getLocaleUrl(lang)}/opengraph-image`;
}

export function buildPageMetadata(lang: Locale): Metadata {
  const seo = getLocaleSeoContent(lang);
  const url = getLocaleUrl(lang);
  const imageUrl = getOpenGraphImageUrl(lang);

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: url,
      languages: getAlternateLanguageUrls(),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title: seo.title,
      description: seo.description,
      locale: seo.ogLocale,
      alternateLocale: lang === "es" ? ["en_US"] : ["es_BO"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} ${seo.socialTitle}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [imageUrl],
    },
    category: "technology",
    other: {
      "geo.placename": `${COMPANY_CITY}, ${COMPANY_COUNTRY}`,
    },
  };
}

export function buildStructuredData(
  lang: Locale,
  services: ServiceItem[],
  pageName: string
) {
  const localeUrl = getLocaleUrl(lang);
  const email = getLocaleEmail(lang);
  const seo = getLocaleSeoContent(lang);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/blumcode-icon-fixed.svg`,
        },
        email,
        telephone: COMPANY_PHONE,
        address: {
          "@type": "PostalAddress",
          addressLocality: COMPANY_CITY,
          addressCountry: "BO",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: seo.contactLabel,
            email,
            telephone: COMPANY_PHONE,
            url: COMPANY_WHATSAPP_URL,
            availableLanguage: ["es", "en"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: ["es", "en"],
        publisher: {
          "@id": `${SITE_URL}#organization`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${localeUrl}#webpage`,
        url: localeUrl,
        name: pageName,
        description: seo.description,
        inLanguage: lang,
        isPartOf: {
          "@id": `${SITE_URL}#website`,
        },
        about: {
          "@id": `${SITE_URL}#organization`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: getOpenGraphImageUrl(lang),
        },
      },
      {
        "@type": "OfferCatalog",
        "@id": `${localeUrl}#services`,
        name:
          lang === "es"
            ? "Servicios de desarrollo de software"
            : "Software development services",
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            provider: {
              "@id": `${SITE_URL}#organization`,
            },
            areaServed: {
              "@type": "Country",
              name: COMPANY_COUNTRY,
            },
          },
        })),
      },
    ],
  };
}
