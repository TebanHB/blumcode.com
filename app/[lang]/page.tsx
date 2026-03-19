import dynamic from "next/dynamic";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SectionDivider from "@/components/SectionDivider";
import { Locale } from "@/i18n";

const Services = dynamic(() => import("@/components/Services"));
const Solutions = dynamic(() => import("@/components/Solutions"));
const Process = dynamic(() => import("@/components/Process"));
const Footer = dynamic(() => import("@/components/Footer"));

type Dictionary = {
  nav: {
    services: string;
    solutions: string;
    trust: string;
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
      contact: "Contacto",
    },
    hero: {
      badge: "Soluciones tecnológicas personalizadas",
      title1: "Desarrollo de Software",
      title2: "a Medida",
      title3: "para tu Empresa",
      description:
        "En BlumCode transformamos tus ideas en soluciones tecnológicas innovadoras. Desarrollamos software personalizado, optimizamos sistemas existentes y brindamos soporte continuo para impulsar tu negocio.",
      primary: "Solicitar Cotización",
      secondary: "Ver Nuestros Servicios",
      cards: {
        webTitle: "Web",
        webDescription: "Aplicaciones modernas y profesionales",
        mobileTitle: "Mobile",
        mobileDescription: "Experiencias limpias y responsivas",
        supportTitle: "Soporte",
        supportDescription: "Continuidad, mejoras y evolución",
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
        "Ofrecemos soluciones tecnológicas completas para impulsar tu negocio al siguiente nivel.",
      items: [
        {
          title: "Desarrollo a Medida",
          description:
            "Creamos software personalizado que se adapta perfectamente a las necesidades específicas de tu empresa y procesos de negocio.",
        },
        {
          title: "Mantenimiento",
          description:
            "Brindamos soporte continuo y mantenimiento preventivo para garantizar el óptimo funcionamiento de tus sistemas.",
        },
        {
          title: "Optimización UX/UI",
          description:
            "Mejoramos la experiencia de usuario y diseño de interfaces logrando productos digitales intuitivos y atractivos.",
        },
        {
          title: "Desarrollo Mobile",
          description:
            "Desarrollamos aplicaciones móviles modernas, responsivas y nativas para iOS y Android.",
        },
        {
          title: "Integración de Sistemas",
          description:
            "Conectamos y sincronizamos diferentes plataformas, APIs y sistemas para unificar tu tecnología.",
        },
        {
          title: "Consultoría IT",
          description:
            "Asesoramiento técnico especializado para transformar digitalmente tu negocio de manera inteligente.",
        },
        {
          title: "Data Analytics",
          description:
            "Implementamos paneles y recolección de métricas para ayudar a tomar decisiones basadas en datos reales.",
        },
        {
          title: "Cloud Services",
          description:
            "Migración, administración y despliegue de infraestructura en la nube (AWS, Google Cloud).",
        }
      ],
    },
    solutions: {
      badge: "Soluciones",
      title: "¿Por qué elegir BlumCode?",
      description:
        "Somos tu socio tecnológico ideal para llevar tu empresa al siguiente nivel.",
      items: [
        {
          title: "Experiencia Comprobada",
          description:
            "Desarrollamos soluciones tecnológicas enfocadas en resultados reales para distintos negocios.",
        },
        {
          title: "Tecnología Moderna",
          description:
            "Utilizamos herramientas actuales y buenas prácticas para crear soluciones escalables y eficientes.",
        },
        {
          title: "Soporte Continuo",
          description:
            "Te acompañamos desde el desarrollo hasta el mantenimiento y evolución de tus sistemas.",
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
        "Más que desarrollar software, buscamos darte seguridad, claridad y una solución realmente útil para tu negocio.",
      cards: [
        {
          title: "Desarrollo confiable y profesional",
          description:
            "Construimos soluciones estables, escalables y pensadas para durar.",
        },
        {
          title: "Comunicación clara",
          description:
            "Siempre sabrás qué se está desarrollando, en qué etapa va y qué sigue.",
        },
        {
          title: "Alcance y entregables definidos",
          description:
            "Desde el inicio dejamos claro qué incluye el proyecto y qué recibirás.",
        },
        {
          title: "Enfoque en resultados",
          description:
            "Buscamos que el software mejore procesos, productividad y crecimiento.",
        },
        {
          title: "Soporte y continuidad",
          description:
            "Podemos seguir acompañando tu sistema con mantenimiento y mejoras.",
        },
        {
          title: "Calidad y experiencia",
          description:
            "Trabajamos con foco en rendimiento, experiencia de usuario y orden técnico.",
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
            "Buscamos que tu software te ayude a vender mejor y trabajar más rápido.",
        },
      ],
    },
    footer: {
      description:
        "Soluciones tecnológicas modernas y personalizadas para empresas que quieren crecer.",
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
        }
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

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safeLang: Locale = lang === "en" ? "en" : "es";
  const t = dictionary[safeLang];

  return (
    <>
      <Header lang={safeLang} nav={t.nav} />
      <main>
        <Hero t={t.hero} />
        <SectionDivider variant="hero-to-services" />
        <Services t={t.services} />
        <SectionDivider variant="services-to-solutions" />
        <Solutions t={t.solutions} />
        <SectionDivider variant="solutions-to-process" />
        <Process t={t.process} />
        <SectionDivider variant="process-to-footer" />
      </main>
      <Footer t={t.footer} />
    </>
  );
}
