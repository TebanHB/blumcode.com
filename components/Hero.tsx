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
}) {
  return (
    <section className="section-divider relative overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_52%,#ffffff_100%)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(90,137,255,0.08),transparent_22%)]" />
      <div className="absolute right-[-70px] top-8 h-60 w-60 rounded-full bg-blum-yellow/8 blur-2xl" />
      <div className="absolute left-[-60px] top-20 h-56 w-56 rounded-full bg-blum-blue/8 blur-2xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <SectionReveal>
          <div className="text-center lg:text-left">
            <div className="mb-5 inline-flex rounded-full border border-blum-blue/12 bg-white/80 px-4 py-2 text-xs font-semibold text-blum-blue shadow-sm sm:text-sm">
              {t.badge}
            </div>

            <h1 className="text-balance mb-6 text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl lg:text-[4.35rem] lg:leading-[0.98]">
              {t.title1}
              <br />
              <span className="text-gray-950">
                {t.title2 === "a Medida" ? "Software " : ""}
              </span>
              <span className="text-blum-blue">
                {t.title2 === "a Medida" ? "a Medida" : t.title2}
              </span>
              <br />
              {t.title3}
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8 lg:mx-0 lg:text-xl">
              {t.description}
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="#contacto"
                className="rounded-2xl bg-blum-blue px-6 py-4 text-base font-semibold text-white shadow-[0_12px_28px_rgba(90,137,255,0.24)] transition duration-300 hover:-translate-y-1 hover:bg-blue-600 sm:px-8 sm:text-lg"
              >
                {t.primary}
              </a>
              <a
                href="#servicios"
                className="rounded-2xl border border-blum-blue/15 bg-white/90 px-6 py-4 text-base font-semibold text-blum-blue shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blum-blue hover:bg-white sm:px-8 sm:text-lg"
              >
                {t.secondary}
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/70 bg-white/80 px-4 py-4 shadow-sm">
                <p className="text-xl font-bold text-gray-950 sm:text-2xl">
                  {t.cards.webTitle}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {t.cards.webDescription}
                </p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/80 px-4 py-4 shadow-sm">
                <p className="text-xl font-bold text-gray-950 sm:text-2xl">
                  {t.cards.mobileTitle}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {t.cards.mobileDescription}
                </p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/80 px-4 py-4 shadow-sm">
                <p className="text-xl font-bold text-gray-950 sm:text-2xl">
                  {t.cards.supportTitle}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {t.cards.supportDescription}
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-r from-blum-blue/10 via-transparent to-blum-yellow/10 blur-xl" />

            <div className="relative overflow-hidden rounded-[28px] border border-white/80 bg-white/40 shadow-[0_14px_36px_rgba(15,23,42,0.12)] sm:rounded-[34px]">
              <div className="relative p-2.5 sm:p-3">
                <Image
                  src="https://cdn.ailandingpage.ai/ai-landingpage/user-generate/1046af44-b971-4d82-929b-afe21f1ece96/1046af44-b971-4d82-929b-afe21f1ece96/hero/hero-main-291336271c124133b163823b16698d6b.png"
                  alt="BlumCode team"
                  width={1200}
                  height={900}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="w-full rounded-[22px] object-cover shadow-[0_10px_28px_rgba(15,23,42,0.10)] sm:rounded-[28px]"
                />
              </div>
            </div>

            <div className="absolute -bottom-5 left-4 rounded-2xl border border-white/70 bg-white/92 px-4 py-3 shadow-lg sm:-bottom-6 sm:left-6">
              <p className="text-sm font-semibold text-gray-950">
                {t.floatingCard.title}
              </p>
              <p className="text-sm text-gray-500">
                {t.floatingCard.description}
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}