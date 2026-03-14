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
    <section id="proceso" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionReveal className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-blum-yellow/30 px-4 py-2 text-sm font-semibold text-black">
            {t.badge}
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">
            {t.title}
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-gray-600">
            {t.description}
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {t.cards.map((item, index) => {
            const Icon = icons[index];
            return (
              <SectionReveal key={item.title} delay={index * 0.08}>
                <article className="h-full rounded-3xl border border-black/5 bg-gradient-to-b from-white to-gray-50 p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-6 inline-flex rounded-2xl bg-blum-blue/10 p-4 text-blum-blue">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-950">
                    {item.title}
                  </h3>
                  <p className="leading-7 text-gray-600">{item.description}</p>
                </article>
              </SectionReveal>
            );
          })}
        </div>

        <SectionReveal className="mt-14">
          <div className="rounded-3xl bg-gradient-to-r from-blum-blue to-blue-700 px-8 py-10 text-white shadow-2xl">
            <div className="grid gap-8 md:grid-cols-3">
              {t.bottom.map((item) => (
                <div key={item.title}>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
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