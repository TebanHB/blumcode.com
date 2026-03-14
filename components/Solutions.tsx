import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import SectionReveal from "./SectionReveal";

const items = [
  {
    title: "Experiencia Comprobada",
    description:
      "Más de 5 años desarrollando soluciones tecnológicas exitosas para empresas de diversos sectores.",
  },
  {
    title: "Tecnología Moderna",
    description:
      "Utilizamos las últimas tecnologías y mejores prácticas para garantizar soluciones escalables y eficientes.",
  },
  {
    title: "Soporte Continuo",
    description:
      "Brindamos acompañamiento permanente desde el desarrollo hasta el mantenimiento de tus sistemas.",
  },
  {
    title: "Resultados Medibles",
    description:
      "Nos enfocamos en generar un impacto real y medible en la eficiencia y crecimiento de tu negocio.",
  },
];

export default function Solutions() {
  return (
    <section
      id="soluciones"
      className="relative overflow-hidden bg-gradient-to-br from-blum-blue to-blue-700 px-4 py-20 text-white sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_28%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <SectionReveal>
          <div>
            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
              Soluciones
            </span>

            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
              ¿Por qué elegir BlumCode?
            </h2>

            <p className="mb-8 text-lg text-blue-100 sm:text-xl">
              Somos tu socio tecnológico ideal para llevar tu empresa al siguiente nivel.
            </p>

            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 rounded-xl bg-blum-yellow p-2 text-black shadow-lg">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                    <p className="leading-7 text-blue-100">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <Image
            src="https://cdn.ailandingpage.ai/ai-landingpage/user-generate/1046af44-b971-4d82-929b-afe21f1ece96/1046af44-b971-4d82-929b-afe21f1ece96/benefits/benefits-main-b30932b7881e43adac5e1add3ae0c413.png"
            alt="Equipo BlumCode trabajando en soluciones exitosas"
            width={1200}
            height={900}
            className="w-full rounded-[28px] border border-white/10 object-cover shadow-2xl"
          />
        </SectionReveal>
      </div>
    </section>
  );
}