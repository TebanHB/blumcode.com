import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import SectionReveal from "./SectionReveal";

export default function Solutions({
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
      id="soluciones"
      className="section-divider relative overflow-hidden bg-[linear-gradient(135deg,#0f172a_0%,#17306b_45%,#2563eb_100%)] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_24%)]" />
      <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-white/6 blur-2xl" />
      <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-blum-yellow/8 blur-2xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <SectionReveal>
          <div>
            <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-white sm:text-sm">
              {t.badge}
            </span>

            <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t.title}
            </h2>

            <p className="mb-8 text-base text-white/85 sm:text-lg lg:text-xl">
              {t.description}
            </p>

            <div className="space-y-5">
              {t.items.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/12 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.14)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/14"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0 rounded-xl bg-blum-yellow p-2 text-black shadow-lg">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-white sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="leading-7 text-white/80">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="relative">
            <div className="absolute -inset-3 rounded-[36px] bg-white/8 blur-xl" />
            <Image
              src="https://cdn.ailandingpage.ai/ai-landingpage/user-generate/1046af44-b971-4d82-929b-afe21f1ece96/1046af44-b971-4d82-929b-afe21f1ece96/benefits/benefits-main-b30932b7881e43adac5e1add3ae0c413.png"
              alt="BlumCode working team"
              width={1200}
              height={900}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              className="relative w-full rounded-[24px] border border-white/10 object-cover shadow-[0_14px_36px_rgba(0,0,0,0.20)] sm:rounded-[30px]"
            />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}