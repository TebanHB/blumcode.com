import SectionReveal from "./SectionReveal";

const steps = [
  {
    number: "1",
    title: "Consulta Inicial",
    description:
      "Analizamos tus necesidades y objetivos para definir la mejor solución tecnológica.",
  },
  {
    number: "2",
    title: "Desarrollo",
    description:
      "Creamos tu software utilizando las mejores prácticas y tecnologías más actuales.",
  },
  {
    number: "3",
    title: "Pruebas y Testing",
    description:
      "Realizamos pruebas exhaustivas para garantizar la calidad y funcionamiento óptimo.",
  },
  {
    number: "4",
    title: "Entrega y Despliegue",
    description:
      "Implementamos tu solución y te acompañamos en el proceso de puesta en marcha.",
  },
];

export default function Process() {
  return (
    <section id="proceso" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionReveal className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-blum-yellow/30 px-4 py-2 text-sm font-semibold text-black">
            Proceso
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">
            Nuestro Proceso de Trabajo
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            En BlumCode seguimos un proceso estructurado y transparente para garantizar el éxito de tu proyecto de software.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <SectionReveal key={step.number} delay={index * 0.08}>
              <div className="group text-center">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blum-blue text-2xl font-bold text-white shadow-lg shadow-blue-200 transition duration-300 group-hover:scale-110">
                  {step.number}
                </div>

                <div className="rounded-3xl border border-black/5 bg-gradient-to-b from-white to-gray-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <h3 className="mb-3 text-xl font-semibold text-gray-950">
                    {step.title}
                  </h3>
                  <p className="leading-7 text-gray-600">{step.description}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal className="mt-12 text-center">
          <div className="inline-flex items-center rounded-full bg-blum-yellow px-6 py-3 shadow-md">
            <span className="font-semibold text-black">
              ✓ Proceso transparente y comunicación constante
            </span>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}