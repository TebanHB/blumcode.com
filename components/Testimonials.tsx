import { Star } from "lucide-react";
import SectionReveal from "./SectionReveal";

const testimonials = [
  {
    name: "María González",
    role: "CEO, TechStart Solutions",
    text: "BlumCode transformó completamente nuestro sistema de gestión. El equipo fue profesional, cumplió todos los plazos y el resultado superó nuestras expectativas.",
  },
  {
    name: "Carlos Mendoza",
    role: "Director, Innovación Digital",
    text: "La aplicación móvil que desarrollaron para nosotros ha aumentado nuestra productividad. Su enfoque en la optimización y la experiencia del usuario es excepcional.",
  },
  {
    name: "Ana Rodríguez",
    role: "Fundadora, EcoCommerce",
    text: "El mantenimiento y optimización de nuestro e-commerce ha sido impecable. BlumCode no solo resolvió nuestros problemas técnicos, sino que mejoró significativamente el rendimiento.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionReveal className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-blum-blue/10 px-4 py-2 text-sm font-semibold text-blum-blue">
            Testimonios
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <SectionReveal key={item.name} delay={index * 0.08}>
              <article className="h-full rounded-3xl border border-black/5 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
                <div className="mb-5 flex gap-1 text-blum-yellow">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>

                <p className="mb-6 leading-7 text-gray-700">
                  “{item.text}”
                </p>

                <div className="border-t border-gray-100 pt-5">
                  <h4 className="font-semibold text-gray-950">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}