import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Solutions from "@/components/Solutions";
import Process from "@/components/Process";
import Footer from "@/components/Footer";
import { Locale } from "@/i18n";

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
          title: "Optimización",
          description:
            "Mejoramos el rendimiento de tus aplicaciones existentes, optimizando velocidad, seguridad y funcionalidad.",
        },
        {
          title: "Desarrollo Mobile y Web",
          description:
            "Desarrollamos aplicaciones web y móviles modernas, responsivas y optimizadas para todos los dispositivos.",
        },
        {
          title: "Integración de Sistemas",
          description:
            "Conectamos y sincronizamos diferentes sistemas y aplicaciones para crear un ecosistema tecnológico unificado.",
        },
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
          title: "Optimization",
          description:
            "We improve performance, security, and functionality of your existing applications.",
        },
        {
          title: "Mobile and Web Development",
          description:
            "We build modern, responsive web and mobile applications for all devices.",
        },
        {
          title: "Systems Integration",
          description:
            "We connect different systems and applications into one unified ecosystem.",
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
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const t = dictionary[lang] ?? dictionary.es;

  return (
    <>
      <Header lang={lang} nav={t.nav} />
      <main>
        <Hero t={t.hero} />
        <Services t={t.services} />
        <Solutions t={t.solutions} />
        <Process t={t.process} />
      </main>
      <Footer t={t.footer} />
    </>
  );
}