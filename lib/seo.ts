import type { Metadata } from "next";

import { defaultLocale, type Locale } from "@/i18n";

export const SITE_NAME = "BlumCode";
export const SITE_URL = "https://blumcode.com";
export const COMPANY_PHONE = "+59173628134";
export const COMPANY_WHATSAPP_URL = "https://wa.me/59173628134";
export const COMPANY_CITY = "Santa Cruz de la Sierra";
export const COMPANY_COUNTRY = "Bolivia";
export const ORGANIZATION_LOGO_PATH = "/blumcode-icon-fixed.png";
export const ORGANIZATION_LOGO_WIDTH = 520;
export const ORGANIZATION_LOGO_HEIGHT = 520;

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
    title: "Desarrollo de Software a Medida en Santa Cruz, Bolivia | BlumCode",
    description:
      "BlumCode desarrolla software a medida en Santa Cruz, Bolivia: aplicaciones web, sistemas internos, apps moviles, integraciones, UX/UI y soporte continuo para empresas.",
    keywords: [
      "desarrollo de software a medida",
      "desarrollo de software en santa cruz",
      "empresa de software en bolivia",
      "desarrollo web",
      "desarrollo web en bolivia",
      "desarrollo mobile",
      "integracion de sistemas",
      "ux ui",
      "consultoria IT",
      "data analytics",
      "cloud services",
      "mantenimiento de software",
      "sistemas para empresas",
      "BlumCode",
    ],
    ogLocale: "es_BO",
    socialTitle: "Desarrollo de software a medida",
    socialSubtitle: "Soluciones web, mobile y soporte continuo para empresas.",
    socialPills: ["Web", "Mobile", "Cloud"],
    contactLabel: "ventas",
  },
  en: {
    title: "Custom Software Development in Santa Cruz, Bolivia | BlumCode",
    description:
      "BlumCode provides custom software development in Santa Cruz, Bolivia: web apps, internal systems, mobile apps, integrations, UX/UI, analytics, and ongoing support for growing businesses.",
    keywords: [
      "custom software development",
      "software company bolivia",
      "software development santa cruz bolivia",
      "web development",
      "web development bolivia",
      "mobile app development",
      "systems integration",
      "UX UI",
      "IT consulting",
      "data analytics",
      "cloud services",
      "software maintenance",
      "business software solutions",
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

export function getOrganizationLogoUrl() {
  return `${SITE_URL}${ORGANIZATION_LOGO_PATH}`;
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
        alternateName: SITE_NAME,
        url: SITE_URL,
        image: getOrganizationLogoUrl(),
        logo: {
          "@type": "ImageObject",
          url: getOrganizationLogoUrl(),
          contentUrl: getOrganizationLogoUrl(),
          width: ORGANIZATION_LOGO_WIDTH,
          height: ORGANIZATION_LOGO_HEIGHT,
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
        alternateName: SITE_NAME,
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
