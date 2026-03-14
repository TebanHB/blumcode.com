import { Code2, Wrench, Gauge, Smartphone, Workflow } from "lucide-react";
import SectionReveal from "./SectionReveal";

const services = [
  {
    icon: Code2,
    title: "Desarrollo a Medida",
    description:
      "Creamos software personalizado que se adapta perfectamente a las necesidades específicas de tu empresa y procesos de negocio.",
  },
  {
    icon: Wrench,
    title: "Mantenimiento",
    description:
      "Brindamos soporte continuo y mantenimiento preventivo para garantizar el óptimo funcionamiento de tus sistemas.",
  },
  {
    icon: Gauge,
    title: "Optimización",
    description:
      "Mejoramos el rendimiento de tus aplicaciones existentes, optimizando velocidad, seguridad y funcionalidad.",
  },
  {
    icon: Smartphone,
    title: "Desarrollo Mobile y Web",
    description:
      "Desarrollamos aplicaciones web y móviles modernas, responsivas y optimizadas para todos los dispositivos.",
  },
  {
    icon: Workflow,
    title: "Integración de Sistemas",
    description:
      "Conectamos y sincronizamos diferentes sistemas y aplicaciones para crear un ecosistema tecnológico unificado.",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionReveal className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-blum-blue/10 px-4 py-2 text-sm font-semibold text-blum-blue">
            Servicios
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Nuestros Servicios
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 sm:text-xl">
            Ofrecemos soluciones tecnológicas completas para impulsar tu negocio al siguiente nivel.
          </p>
        </SectionReveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <SectionReveal key={service.title} delay={index * 0.08}>
                <article className="group h-full rounded-3xl border border-black/5 bg-gradient-to-b from-white to-gray-50 p-8 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
                  <div className="mb-6 inline-flex rounded-2xl bg-blum-blue/10 p-4 text-blum-blue transition group-hover:scale-110">
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-gray-950">
                    {service.title}
                  </h3>

                  <p className="leading-7 text-gray-600">{service.description}</p>
                </article>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}