import type { Metadata } from "next";
import dynamic from "next/dynamic";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SectionDivider from "@/components/SectionDivider";
import { Locale } from "@/i18n";
import {
  buildPageMetadata,
  buildStructuredData,
  getSafeLocale,
} from "@/lib/seo";

const Services = dynamic(() => import("@/components/Services"));
const Solutions = dynamic(() => import("@/components/Solutions"));
const Process = dynamic(() => import("@/components/Process"));
const About = dynamic(() => import("@/components/About"));
const Footer = dynamic(() => import("@/components/Footer"));

type Dictionary = {
  nav: {
    services: string;
    solutions: string;
    trust: string;
    team: string;
    contact: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    title3: string;
    description: string;
    primary: string;
    secondary: string;
    cards: {
      webTitle: string;
      webDescription: string;
      mobileTitle: string;
      mobileDescription: string;
      supportTitle: string;
      supportDescription: string;
    };
    floatingCard: {
      title: string;
      description: string;
    };
  };
  services: {
    badge: string;
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  solutions: {
    badge: string;
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  process: {
    badge: string;
    title: string;
    description: string;
    cards: {
      title: string;
      description: string;
    }[];
    bottom: {
      title: string;
      description: string;
    }[];
  };
  about: {
    badge: string;
    title: string;
    description: string;
    summaryTitle: string;
    summaryDescription: string;
    pillars: string[];
    members: {
      name: string;
      role: string;
      description: string;
      tag: string;
      focus: string;
    }[];
  };
  footer: {
    description: string;
    contact: string;
    city: string;
    rights: string;
    email: string;
  };
};

const dictionary: Record<Locale, Dictionary> = {
  es: {
    nav: {
      services: "Servicios",
      solutions: "Soluciones",
      trust: "Confianza",
      team: "Nosotros",
      contact: "Contacto",
    },
    hero: {
      badge: "Soluciones tecnol\u00f3gicas personalizadas",
      title1: "Desarrollo de Software",
      title2: "a Medida",
      title3: "para tu Empresa",
      description:
        "En BlumCode transformamos tus ideas en soluciones tecnol\u00f3gicas innovadoras. Desarrollamos software personalizado, optimizamos sistemas existentes y brindamos soporte continuo para impulsar tu negocio.",
      primary: "Solicitar Cotizaci\u00f3n",
      secondary: "Ver Nuestros Servicios",
      cards: {
        webTitle: "Web",
        webDescription: "Aplicaciones modernas y profesionales",
        mobileTitle: "Mobile",
        mobileDescription: "Experiencias limpias y responsivas",
        supportTitle: "Soporte",
        supportDescription: "Continuidad, mejoras y evoluci\u00f3n",
      },
      floatingCard: {
        title: "Software a medida",
        description: "Elegante, escalable y profesional",
      },
    },
    services: {
      badge: "Servicios",
      title: "Nuestros Servicios",
      description:
        "Ofrecemos soluciones tecnol\u00f3gicas completas para impulsar tu negocio al siguiente nivel.",
      items: [
        {
          title: "Desarrollo a Medida",
          description:
            "Creamos software personalizado que se adapta perfectamente a las necesidades espec\u00edficas de tu empresa y procesos de negocio.",
        },
        {
          title: "Mantenimiento",
          description:
            "Brindamos soporte continuo y mantenimiento preventivo para garantizar el \u00f3ptimo funcionamiento de tus sistemas.",
        },
        {
          title: "Optimizaci\u00f3n UX/UI",
          description:
            "Mejoramos la experiencia de usuario y dise\u00f1o de interfaces logrando productos digitales intuitivos y atractivos.",
        },
        {
          title: "Desarrollo Mobile",
          description:
            "Desarrollamos aplicaciones m\u00f3viles modernas, responsivas y nativas para iOS y Android.",
        },
        {
          title: "Integraci\u00f3n de Sistemas",
          description:
            "Conectamos y sincronizamos diferentes plataformas, APIs y sistemas para unificar tu tecnolog\u00eda.",
        },
        {
          title: "Consultor\u00eda IT",
          description:
            "Asesoramiento t\u00e9cnico especializado para transformar digitalmente tu negocio de manera inteligente.",
        },
        {
          title: "Data Analytics",
          description:
            "Implementamos paneles y recolecci\u00f3n de m\u00e9tricas para ayudar a tomar decisiones basadas en datos reales.",
        },
        {
          title: "Cloud Services",
          description:
            "Migraci\u00f3n, administraci\u00f3n y despliegue de infraestructura en la nube (AWS, Google Cloud).",
        },
      ],
    },
    solutions: {
      badge: "Soluciones",
      title: "\u00bfPor qu\u00e9 elegir BlumCode?",
      description:
        "Somos tu socio tecnol\u00f3gico ideal para llevar tu empresa al siguiente nivel.",
      items: [
        {
          title: "Experiencia Comprobada",
          description:
            "Desarrollamos soluciones tecnol\u00f3gicas enfocadas en resultados reales para distintos negocios.",
        },
        {
          title: "Tecnolog\u00eda Moderna",
          description:
            "Utilizamos herramientas actuales y buenas pr\u00e1cticas para crear soluciones escalables y eficientes.",
        },
        {
          title: "Soporte Continuo",
          description:
            "Te acompa\u00f1amos desde el desarrollo hasta el mantenimiento y evoluci\u00f3n de tus sistemas.",
        },
        {
          title: "Resultados Medibles",
          description:
            "Buscamos impacto real en productividad, eficiencia y crecimiento.",
        },
      ],
    },
    process: {
      badge: "Confianza",
      title: "Lo que puedes esperar al trabajar con BlumCode",
      description:
        "M\u00e1s que desarrollar software, buscamos darte seguridad, claridad y una soluci\u00f3n realmente \u00fatil para tu negocio.",
      cards: [
        {
          title: "Desarrollo confiable y profesional",
          description:
            "Construimos soluciones estables, escalables y pensadas para durar.",
        },
        {
          title: "Comunicaci\u00f3n clara",
          description:
            "Siempre sabr\u00e1s qu\u00e9 se est\u00e1 desarrollando, en qu\u00e9 etapa va y qu\u00e9 sigue.",
        },
        {
          title: "Alcance y entregables definidos",
          description:
            "Desde el inicio dejamos claro qu\u00e9 incluye el proyecto y qu\u00e9 recibir\u00e1s.",
        },
        {
          title: "Enfoque en resultados",
          description:
            "Buscamos que el software mejore procesos, productividad y crecimiento.",
        },
        {
          title: "Soporte y continuidad",
          description:
            "Podemos seguir acompa\u00f1ando tu sistema con mantenimiento y mejoras.",
        },
        {
          title: "Calidad y experiencia",
          description:
            "Trabajamos con foco en rendimiento, experiencia de usuario y orden t\u00e9cnico.",
        },
      ],
      bottom: [
        {
          title: "Soluciones a medida",
          description:
            "Cada proyecto se adapta a tus necesidades reales, presupuesto y objetivos.",
        },
        {
          title: "Claridad y transparencia",
          description:
            "Te explicamos el proceso de forma simple y con expectativas claras.",
        },
        {
          title: "Impacto real en tu negocio",
          description:
            "Buscamos que tu software te ayude a vender mejor y trabajar m\u00e1s r\u00e1pido.",
        },
      ],
    },
    about: {
      badge: "Nosotros",
      title: "Equipo detr\u00e1s de BlumCode",
      description:
        "Un equipo compacto y complementario que une estrategia, desarrollo y crecimiento comercial para convertir ideas en soluciones digitales claras, eficientes y bien ejecutadas.",
      summaryTitle: "Tres frentes, un solo objetivo",
      summaryDescription:
        "Acompa\u00f1amos cada proyecto desde la visi\u00f3n de negocio hasta la entrega final, con decisiones t\u00e9cnicas s\u00f3lidas, comunicaci\u00f3n cercana y foco real en resultados.",
      pillars: [
        "Direcci\u00f3n estrat\u00e9gica",
        "Desarrollo full stack",
        "\u00c1rea comercial",
      ],
      members: [
        {
          name: "Esteban Hurtado",
          role: "CEO, fundador y desarrollador web Full Stack.",
          description:
            "Encabeza la direcci\u00f3n estrat\u00e9gica de la empresa y lidera el desarrollo de soluciones digitales innovadoras y eficientes.",
          tag: "Liderazgo",
          focus: "Visi\u00f3n estrat\u00e9gica, producto y ejecuci\u00f3n t\u00e9cnica.",
        },
        {
          name: "Jefferson Antelo",
          role: "Semi-Senior Full Stack Developer.",
          description:
            "Especialista en el desarrollo integral de plataformas web, con enfoque en calidad, escalabilidad y rendimiento.",
          tag: "Desarrollo",
          focus: "Arquitectura s\u00f3lida, calidad de c\u00f3digo y rendimiento.",
        },
        {
          name: "Favio Cuentas y Pablo Coppa",
          role: "\u00c1rea comercial y ventas.",
          description:
            "Responsables de fortalecer la relaci\u00f3n con los clientes, identificar nuevas oportunidades y potenciar el crecimiento comercial de la empresa.",
          tag: "Comercial",
          focus: "Relaci\u00f3n cercana con clientes y crecimiento comercial.",
        },
      ],
    },
    footer: {
      description:
        "Soluciones tecnol\u00f3gicas modernas y personalizadas para empresas que quieren crecer.",
      contact: "Contacto",
      city: "Santa Cruz, Bolivia",
      rights: "Todos los derechos reservados.",
      email: "ventas@blumcode.com",
    },
  },
  en: {
    nav: {
      services: "Services",
      solutions: "Solutions",
      trust: "Trust",
      team: "Team",
      contact: "Contact",
    },
    hero: {
      badge: "Custom technology solutions",
      title1: "Custom Software",
      title2: "Development",
      title3: "for Your Business",
      description:
        "At BlumCode, we transform your ideas into innovative technology solutions. We build custom software, optimize existing systems, and provide ongoing support to boost your business.",
      primary: "Request a Quote",
      secondary: "View Our Services",
      cards: {
        webTitle: "Web",
        webDescription: "Modern and professional applications",
        mobileTitle: "Mobile",
        mobileDescription: "Clean and responsive experiences",
        supportTitle: "Support",
        supportDescription: "Continuity, improvements and evolution",
      },
      floatingCard: {
        title: "Custom software",
        description: "Elegant, scalable and professional",
      },
    },
    services: {
      badge: "Services",
      title: "Our Services",
      description:
        "We provide complete technology solutions to take your business to the next level.",
      items: [
        {
          title: "Custom Development",
          description:
            "We create tailored software that fits your company's needs and business processes.",
        },
        {
          title: "Maintenance",
          description:
            "We provide ongoing support and preventive maintenance to ensure optimal system performance.",
        },
        {
          title: "UX/UI Optimization",
          description:
            "We improve user experience and interface design creating intuitive and attractive digital products.",
        },
        {
          title: "Mobile Development",
          description:
            "We build modern, responsive native mobile applications for iOS and Android.",
        },
        {
          title: "Systems Integration",
          description:
            "We connect different platforms, APIs, and systems into one unified ecosystem.",
        },
        {
          title: "IT Consulting",
          description:
            "Specialized technical advice to intelligently transform your business digitally.",
        },
        {
          title: "Data Analytics",
          description:
            "We build dashboards and metrics collection to help you make data-driven decisions.",
        },
        {
          title: "Cloud Services",
          description:
            "Migration, management, and deployment of cloud infrastructure (AWS, Google Cloud).",
        },
      ],
    },
    solutions: {
      badge: "Solutions",
      title: "Why Choose BlumCode?",
      description:
        "We are your ideal technology partner to take your business further.",
      items: [
        {
          title: "Proven Experience",
          description:
            "We build technology solutions focused on real business results.",
        },
        {
          title: "Modern Technology",
          description:
            "We use modern tools and best practices to create scalable and efficient solutions.",
        },
        {
          title: "Continuous Support",
          description:
            "We support you from development to maintenance and long-term evolution.",
        },
        {
          title: "Measurable Results",
          description:
            "We focus on real impact in productivity, efficiency, and growth.",
        },
      ],
    },
    process: {
      badge: "Trust",
      title: "What you can expect when working with BlumCode",
      description:
        "More than building software, we aim to give you clarity, confidence, and a solution that truly helps your business.",
      cards: [
        {
          title: "Reliable and professional development",
          description: "We build stable, scalable solutions designed to last.",
        },
        {
          title: "Clear communication",
          description:
            "You will always know what is being built, where the project stands, and what comes next.",
        },
        {
          title: "Defined scope and deliverables",
          description:
            "From the beginning, we make clear what is included and what you will receive.",
        },
        {
          title: "Results-driven approach",
          description:
            "We aim for software that improves processes, productivity, and growth.",
        },
        {
          title: "Support and continuity",
          description:
            "We can continue supporting your system with maintenance and improvements.",
        },
        {
          title: "Quality and user experience",
          description:
            "We work with a strong focus on performance, UX, and technical organization.",
        },
      ],
      bottom: [
        {
          title: "Tailored solutions",
          description:
            "Every project is adapted to your real needs, budget, and goals.",
        },
        {
          title: "Clarity and transparency",
          description:
            "We explain the process simply and set clear expectations.",
        },
        {
          title: "Real business impact",
          description:
            "We want your software to help you sell better and work faster.",
        },
      ],
    },
    about: {
      badge: "About us",
      title: "The team behind BlumCode",
      description:
        "A compact and complementary team that combines strategy, development, and commercial growth to turn ideas into clear, efficient, and well-executed digital solutions.",
      summaryTitle: "Three strengths, one direction",
      summaryDescription:
        "We support each project from business vision to final delivery, with strong technical decisions, close communication, and a sharp focus on outcomes.",
      pillars: [
        "Strategic direction",
        "Full stack development",
        "Commercial growth",
      ],
      members: [
        {
          name: "Esteban Hurtado",
          role: "CEO, founder, and Full Stack web developer.",
          description:
            "He leads the strategic direction of the company and drives the development of innovative and efficient digital solutions.",
          tag: "Leadership",
          focus: "Strategic vision, product direction, and technical execution.",
        },
        {
          name: "Jefferson Antelo",
          role: "Semi-Senior Full Stack Developer.",
          description:
            "Specialist in end-to-end web platform development, with a strong focus on quality, scalability, and performance.",
          tag: "Development",
          focus: "Strong architecture, code quality, and performance.",
        },
        {
          name: "Favio Cuentas and Pablo Coppa",
          role: "Commercial and sales area.",
          description:
            "They strengthen client relationships, identify new opportunities, and help drive the company's commercial growth.",
          tag: "Commercial",
          focus: "Client relationships, opportunity discovery, and growth.",
        },
      ],
    },
    footer: {
      description:
        "Modern and custom technology solutions for businesses that want to grow.",
      contact: "Contact",
      city: "Santa Cruz, Bolivia",
      rights: "All rights reserved.",
      email: "sales@blumcode.com",
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  return buildPageMetadata(getSafeLocale(lang));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safeLang = getSafeLocale(lang);
  const t = dictionary[safeLang];
  const structuredData = buildStructuredData(
    safeLang,
    t.services.items,
    `${t.hero.title1} ${t.hero.title2} ${t.hero.title3} | BlumCode`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Header lang={safeLang} nav={t.nav} />
      <main>
        <Hero t={t.hero} />
        <SectionDivider variant="hero-to-services" />
        <Services t={t.services} />
        <SectionDivider variant="services-to-solutions" />
        <Solutions t={t.solutions} />
        <SectionDivider variant="solutions-to-process" />
        <Process t={t.process} />
        <SectionDivider variant="process-to-team" />
        <About t={t.about} />
        <SectionDivider variant="team-to-footer" />
      </main>
      <Footer t={t.footer} />
    </>
  );
}
