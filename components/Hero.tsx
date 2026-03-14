import Image from "next/image";
import SectionReveal from "./SectionReveal";

export default function Hero({
  t,
}: {
  t: {
    badge: string;
    title1: string;
    title2: string;
    title3: string;
    description: string;
    primary: string;
    secondary: string;
  };
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="absolute left-[-80px] top-16 h-56 w-56 rounded-full bg-blum-blue/10 blur-3xl" />
      <div className="absolute bottom-0 right-[-80px] h-64 w-64 rounded-full bg-blum-yellow/20 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <SectionReveal>
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex rounded-full border border-blum-blue/15 bg-white px-4 py-2 text-sm font-medium text-blum-blue shadow-sm">
              {t.badge}
            </div>

            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
              {t.title1} <span className="text-blum-blue">{t.title2}</span> {t.title3}
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-gray-600 lg:mx-0 lg:text-xl">
              {t.description}
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <a href="#contacto" className="rounded-2xl bg-blum-blue px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-600">
                {t.primary}
              </a>
              <a href="#servicios" className="rounded-2xl border-2 border-blum-blue px-8 py-4 text-lg font-semibold text-blum-blue transition hover:bg-blum-blue hover:text-white">
                {t.secondary}
              </a>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="relative">
            <div className="animate-float-soft">
              <Image
                src="https://cdn.ailandingpage.ai/ai-landingpage/user-generate/1046af44-b971-4d82-929b-afe21f1ece96/1046af44-b971-4d82-929b-afe21f1ece96/hero/hero-main-291336271c124133b163823b16698d6b.png"
                alt="BlumCode team"
                width={1200}
                height={900}
                priority
                className="w-full rounded-[28px] border border-white/60 object-cover shadow-2xl"
              />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}