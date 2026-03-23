"use client";

import { BarChart, Cloud, Code2, Layers, Smartphone, Sparkles, Workflow, Wrench } from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";

import SectionReveal from "./SectionReveal";
import { useTheme } from "./ThemeProvider";

const icons = [Code2, Wrench, Layers, Smartphone, Workflow, Wrench, BarChart, Cloud];

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
  const { isLight } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [manualSelection, setManualSelection] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isGridHovered, setIsGridHovered] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const gridBoundsRef = useRef<DOMRect | null>(null);
  const displayedActiveIndex = hoveredIndex ?? activeIndex;
  const glowStyle = useMemo(
    () =>
      ({
        transform: `translate(${pointer.x}px, ${pointer.y}px) translate(-50%, -50%) scale(${isGridHovered ? 1 : 0.75})`,
        opacity: isGridHovered ? 1 : 0,
      }) satisfies CSSProperties,
    [isGridHovered, pointer.x, pointer.y]
  );

  useEffect(() => {
    if (manualSelection || isGridHovered || hoveredIndex !== null || t.items.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % t.items.length);
    }, 2000);

    return () => window.clearInterval(intervalId);
  }, [hoveredIndex, isGridHovered, manualSelection, t.items.length]);

  useEffect(() => {
    const handleFocusRequest = (event: Event) => {
      const customEvent = event as CustomEvent<{ index?: number }>;
      const requestedIndex = customEvent.detail?.index;

      if (typeof requestedIndex !== "number") {
        return;
      }

      const boundedIndex = Math.max(0, Math.min(requestedIndex, t.items.length - 1));
      setActiveIndex(boundedIndex);
      setManualSelection(true);
    };

    window.addEventListener("hero-service-focus", handleFocusRequest);

    return () => window.removeEventListener("hero-service-focus", handleFocusRequest);
  }, [t.items.length]);

  const updateGridBounds = (element: HTMLDivElement) => {
    gridBoundsRef.current = element.getBoundingClientRect();
  };

  const updatePointerPosition = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = gridBoundsRef.current;

    if (!bounds) {
      return;
    }

    setPointer({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });
  };

  return (
    <section
      id="servicios"
      className={`nav-anchor-section content-auto-section section-divider relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28 ${
        isLight ? "bg-slate-50" : "bg-slate-950"
      }`}
    >
      <div
        className={`absolute inset-0 ${
          isLight
            ? "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.75),rgba(241,245,249,0.95))]"
            : "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.18),rgba(2,6,23,0.72))]"
        }`}
      />
      <div className={`absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent ${isLight ? "via-blue-500/10" : "via-blue-300/15"} to-transparent`} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionReveal anchor>
          <div className="max-w-3xl">
            <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm ${
              isLight
                ? "border border-blue-200 bg-white/80 text-blue-700"
                : "border border-blue-400/20 bg-blue-500/10 text-blue-200"
            }`}>
              <Sparkles className="h-4 w-4" />
              {t.badge}
            </span>

            <h2 className={`mt-4 text-3xl font-semibold tracking-[-0.04em] sm:mt-5 sm:text-5xl lg:text-[3.6rem] ${
              isLight ? "text-slate-950" : "text-white"
            }`}>
              {t.title}
            </h2>

            <p className={`mt-3 max-w-2xl text-sm leading-6 sm:mt-4 sm:text-lg sm:leading-7 lg:text-xl ${
              isLight ? "text-slate-600" : "text-slate-300"
            }`}>
              {t.description}
            </p>
          </div>
        </SectionReveal>

        <div
          onPointerEnter={(event) => {
            setIsGridHovered(true);
            updateGridBounds(event.currentTarget);
            updatePointerPosition(event);
          }}
          onPointerMove={updatePointerPosition}
          onPointerLeave={() => {
            setHoveredIndex(null);
            setIsGridHovered(false);
          }}
          onPointerDown={(event) => updateGridBounds(event.currentTarget)}
          className="relative mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:gap-6 xl:grid-cols-4"
        >
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute left-0 top-0 z-0 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[68px] sm:h-44 sm:w-44 ${
              isLight ? "bg-blue-400/20" : "bg-blue-400/25"
            }`}
            style={glowStyle}
          />

          {t.items.map((service, index) => {
            const Icon = icons[index % icons.length];
            const isActive = index === displayedActiveIndex;

            const handleSelect = () => {
              setActiveIndex(index);
              setManualSelection(true);
            };

            return (
              <SectionReveal key={service.title} delay={0.05 * (index + 1)}>
                <button
                  type="button"
                  onClick={handleSelect}
                  onPointerEnter={() => setHoveredIndex(index)}
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={() => setHoveredIndex(null)}
                  className={`group relative h-full min-h-46 rounded-[22px] border p-5 text-left shadow-[0_14px_36px_rgba(2,6,23,0.22)] backdrop-blur-sm transition-[transform,border-color,background-color,box-shadow] duration-500 hover:-translate-y-1.5 sm:min-h-55 sm:rounded-3xl sm:p-6 ${
                    isActive
                      ? isLight
                        ? "m-1 border-blue-300 bg-white shadow-[0_22px_40px_rgba(59,130,246,0.18)] ring-1 ring-blue-100"
                        : "border-blue-400/40 bg-[linear-gradient(180deg,rgba(59,130,246,0.18),rgba(15,23,42,0.92))] shadow-[0_20px_42px_rgba(59,130,246,0.18)]"
                      : isLight
                        ? "m-1 border-slate-200 bg-white/90 shadow-[0_18px_34px_rgba(148,163,184,0.14)]"
                        : "border-white/10 bg-white/5"
                  } focus:outline-hidden focus:ring-2 focus:ring-blum-blue/50`}
                  aria-pressed={isActive}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 ${
                      isActive
                        ? "opacity-100"
                        : ""
                    } ${
                      isLight
                        ? "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_55%)]"
                        : "bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.18),transparent_50%)]"
                    }`}
                  />

                  <div
                    className={`relative flex h-11 w-11 items-center justify-center rounded-2xl transition-colors sm:h-12 sm:w-12 ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : isLight
                          ? "bg-slate-100 text-blue-600"
                          : "bg-white/10 text-blue-200"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="relative mt-5 flex items-start justify-between gap-3">
                    <h3 className={`text-lg font-semibold leading-snug sm:text-xl ${
                      isLight
                        ? "text-slate-950"
                        : "text-white"
                    }`}>
                      {service.title}
                    </h3>
                    <span className={`shrink-0 text-xs font-semibold uppercase tracking-[0.22em] ${
                      isLight
                        ? isActive
                          ? "text-blue-600"
                          : "text-slate-400"
                        : isActive
                          ? "text-blue-200"
                          : "text-white/35"
                    }`}>
                      0{index + 1}
                    </span>
                  </div>

                  <p className={`relative mt-3 text-[13px] leading-5 sm:text-[15px] sm:leading-6 ${
                    isLight
                      ? isActive
                        ? "text-slate-700"
                        : "text-slate-600"
                      : isActive
                        ? "text-slate-100"
                        : "text-slate-300"
                  }`}>
                    {service.description}
                  </p>
                </button>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
