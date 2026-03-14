import {
  Code2,
  Wrench,
  Gauge,
  Smartphone,
  Workflow,
  Sparkles,
} from "lucide-react";
import SectionReveal from "./SectionReveal";

const icons = [Code2, Wrench, Gauge, Smartphone, Workflow];

export default function Services({
  t,
}: {
  t: {
    badge: string;
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
    }[];
  };
}) {
  return (
    <section
      id="servicios"
      className="section-divider relative overflow-hidden bg-[linear-gradient(to_bottom,#f7fbff,#edf4ff)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(90,137,255,0.10),transparent_22%)]" />
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blum-blue/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-blum-yellow/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <SectionReveal className="mb-12 text-center sm:mb-16">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blum-blue/10 bg-white/75 px-4 py-2 text-xs font-semibold text-blum-blue shadow-sm backdrop-blur sm:text-sm">
            <Sparkles className="h-4 w-4" />
            {t.badge}
          </span>

          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            {t.title}
          </h2>

          <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
            {t.description}
          </p>
        </SectionReveal>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {t.items.map((service, index) => {
            const Icon = icons[index];
            const featured = index === 0;

            return (
              <SectionReveal key={service.title} delay={index * 0.08}>
                <article
                  className={`group relative h-full overflow-hidden rounded-[26px] border p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-2 sm:rounded-[30px] sm:p-8 ${
                    featured
                      ? "border-blum-blue/15 bg-[linear-gradient(135deg,rgba(90,137,255,0.14),rgba(255,255,255,0.92)_45%,rgba(255,210,0,0.10))] shadow-[0_18px_50px_rgba(90,137,255,0.12)]"
                      : "border-white/70 bg-white/80 shadow-[0_14px_40px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_65px_rgba(15,23,42,0.12)]"
                  }`}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(90,137,255,0.06),transparent_38%,rgba(255,210,0,0.06))]" />
                  <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(90,137,255,0.40),transparent)]" />
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blum-blue/10 blur-2xl transition duration-500 group-hover:bg-blum-blue/15" />
                  <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-blum-yellow/10 blur-2xl transition duration-500 group-hover:bg-blum-yellow/15" />

                  <div className="relative">
                    {featured && (
                      <div className="mb-5 inline-flex rounded-full border border-blum-blue/10 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-blum-blue shadow-sm sm:text-xs">
                        Principal
                      </div>
                    )}

                    <div className="mb-7 flex items-start justify-between gap-4">
                      <div className="relative inline-flex">
                        <div className="absolute inset-0 rounded-2xl bg-blum-blue/20 blur-md transition duration-500 group-hover:bg-blum-blue/30" />
                        <div className="relative rounded-2xl border border-blum-blue/10 bg-[linear-gradient(135deg,rgba(90,137,255,0.18),rgba(90,137,255,0.05))] p-4 text-blum-blue shadow-sm transition duration-500 group-hover:scale-110 group-hover:-rotate-2">
                          <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                        </div>
                      </div>
                    </div>

                    <h3 className="mb-3 text-lg font-semibold text-gray-950 transition duration-300 group-hover:text-blum-blue sm:text-xl">
                      {service.title}
                    </h3>

                    <p className="leading-7 text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </article>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}