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
    <section id="testimonios" className="relative overflow-hidden bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.06),transparent_50%)]" />
      <div className="absolute right-[-10%] top-[30%] h-64 w-64 rounded-full bg-blum-yellow/10 blur-[80px] animate-pulse-glow" style={{ animationDuration: '10s' }} />

      <div className="relative mx-auto max-w-7xl">
        <SectionReveal className="mb-16 text-center">
          <span className="mb-6 inline-flex rounded-full bg-blum-blue/10 px-5 py-2 text-sm font-semibold text-blum-blue ring-1 ring-blum-blue/20">
            Testimonios
          </span>
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-600">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación. Construimos relaciones basadas en confianza y resultados excepcionales.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <SectionReveal key={item.name} delay={index * 0.1}>
              <article className="group relative h-full rounded-[32px] border border-slate-200/60 bg-white p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:border-blum-blue/30 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)]">
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blum-blue/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                <div className="mb-6 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-blum-yellow text-blum-yellow drop-shadow-sm transition-transform duration-300 group-hover:scale-110" style={{ transitionDelay: `${i * 50}ms` }} />
                  ))}
                </div>

                <p className="mb-8 text-lg italic leading-relaxed text-slate-700 relative z-10">
                  <span className="absolute -left-3 -top-3 text-5xl text-slate-200/50 -z-10">&quot;</span>
                  {item.text}
                </p>

                <div className="mt-auto border-t border-slate-100 pt-6">
                  <h4 className="font-bold text-slate-900 text-lg transition-colors duration-300 group-hover:text-blum-blue">{item.name}</h4>
                  <p className="text-sm font-medium text-slate-500">{item.role}</p>
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}