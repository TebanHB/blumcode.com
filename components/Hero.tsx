import Image from "next/image";
import SectionReveal from "./SectionReveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="absolute left-[-80px] top-16 h-56 w-56 rounded-full bg-blum-blue/10 blur-3xl" />
      <div className="absolute bottom-0 right-[-80px] h-64 w-64 rounded-full bg-blum-yellow/20 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <SectionReveal>
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex rounded-full border border-blum-blue/15 bg-white px-4 py-2 text-sm font-medium text-blum-blue shadow-sm">
              Soluciones tecnológicas personalizadas
            </div>

            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
              Desarrollo de Software{" "}
              <span className="text-blum-blue">a Medida</span>{" "}
              para tu Empresa
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-gray-600 lg:mx-0 lg:text-xl">
              En BlumCode transformamos tus ideas en soluciones tecnológicas innovadoras.
              Desarrollamos software personalizado, optimizamos sistemas existentes y
              brindamos soporte continuo para impulsar tu negocio.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="#contacto"
                className="rounded-2xl bg-blum-blue px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-600"
              >
                Solicitar Cotización
              </a>
              <a
                href="#servicios"
                className="rounded-2xl border-2 border-blum-blue px-8 py-4 text-lg font-semibold text-blum-blue transition hover:bg-blum-blue hover:text-white"
              >
                Ver Nuestros Servicios
              </a>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="relative">
            <div className="animate-float-soft">
              <Image
                src="https://cdn.ailandingpage.ai/ai-landingpage/user-generate/1046af44-b971-4d82-929b-afe21f1ece96/1046af44-b971-4d82-929b-afe21f1ece96/hero/hero-main-291336271c124133b163823b16698d6b.png"
                alt="Equipo de desarrollo de BlumCode trabajando"
                width={1200}
                height={900}
                priority
                className="w-full rounded-[28px] border border-white/60 object-cover shadow-2xl"
              />
            </div>

            <div className="absolute -bottom-5 -left-5 rounded-2xl bg-white/90 px-4 py-3 shadow-xl backdrop-blur">
              <p className="text-sm font-semibold text-gray-900">Software a tu medida</p>
              <p className="text-sm text-gray-500">Moderno, escalable y responsive</p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}