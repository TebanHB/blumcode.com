import {
  ShieldCheck,
  MessageSquareText,
  FileText,
  Rocket,
  Wrench,
  BadgeCheck,
} from "lucide-react";
import SectionReveal from "./SectionReveal";

const icons = [
  ShieldCheck,
  MessageSquareText,
  FileText,
  Rocket,
  Wrench,
  BadgeCheck,
];

export default function Process({
  t,
}: {
  t: {
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
}) {
  return (
    <section
      id="proceso"
      className="section-divider relative overflow-hidden bg-[linear-gradient(to_bottom,#ffffff,#f4f8ff)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(90,137,255,0.08),transparent_22%)]" />
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-blum-blue/8 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-blum-yellow/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <SectionReveal className="mb-12 text-center sm:mb-16">
          <span className="mb-4 inline-block rounded-full border border-blum-yellow/20 bg-blum-yellow/25 px-4 py-2 text-xs font-semibold text-black shadow-sm sm:text-sm">
            {t.badge}
          </span>

          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">
            {t.title}
          </h2>

          <p className="mx-auto max-w-3xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            {t.description}
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {t.cards.map((item, index) => {
            const Icon = icons[index];

            return (
              <SectionReveal key={item.title} delay={index * 0.08}>
                <article className="group relative h-full overflow-hidden rounded-[26px] border border-black/5 bg-white/85 p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)] backdrop-blur transition duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(15,23,42,0.11)] sm:rounded-[30px] sm:p-8">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(90,137,255,0.05),transparent_42%,rgba(255,210,0,0.05))]" />
                  <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(90,137,255,0.35),transparent)]" />

                  <div className="relative">
                    <div className="mb-6 inline-flex rounded-2xl border border-blum-blue/10 bg-[linear-gradient(135deg,rgba(90,137,255,0.16),rgba(90,137,255,0.05))] p-4 text-blum-blue shadow-sm transition duration-500 group-hover:scale-110">
                      <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                    </div>

                    <h3 className="mb-3 text-lg font-semibold text-gray-950 transition duration-300 group-hover:text-blum-blue sm:text-xl">
                      {item.title}
                    </h3>

                    <p className="leading-7 text-gray-600">{item.description}</p>
                  </div>
                </article>
              </SectionReveal>
            );
          })}
        </div>

        <SectionReveal className="mt-12 sm:mt-14">
          <div className="overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#0f172a_0%,#183b86_45%,#2563eb_100%)] px-6 py-8 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] sm:rounded-[34px] sm:px-8 sm:py-10">
            <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
              {t.bottom.map((item, index) => (
                <div
                  key={item.title}
                  className={`rounded-2xl border p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 sm:p-6 ${
                    index === 1
                      ? "border-white/18 bg-white/12 shadow-[0_12px_34px_rgba(0,0,0,0.16)]"
                      : "border-white/10 bg-white/6"
                  }`}
                >
                  <h3 className="text-xl font-bold sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 leading-7 text-blue-100">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}