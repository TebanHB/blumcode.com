"use client";

import {
  BarChart,
  Cloud,
  Code2,
  Layers,
  Smartphone,
  Sparkles,
  Workflow,
  Wrench,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import GlowCard from "./GlowCard";
import SectionReveal from "./SectionReveal";
import { useTheme } from "./ThemeProvider";

const icons = [Code2, Wrench, Layers, Smartphone, Workflow, Wrench, BarChart, Cloud];
const CAROUSEL_SPEED_PX_PER_SECOND = 58;
const DRAG_THRESHOLD_PX = 6;

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
  const isSpanish = t.badge === "Servicios";
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const firstGroupRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(0);
  const visibleIndexRef = useRef(0);
  const dragStateRef = useRef({
    active: false,
    moved: false,
    pointerId: -1,
    startX: 0,
    startOffset: 0,
  });
  const pressedCardIndexRef = useRef<number | null>(null);
  const suppressClickRef = useRef(false);
  const canAutoScroll = !prefersReducedMotion && t.items.length > 1;

  const normalizeOffset = useCallback((value: number) => {
    const loopWidth = loopWidthRef.current;

    if (loopWidth <= 0) {
      return 0;
    }

    return ((value % loopWidth) + loopWidth) % loopWidth;
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const applyOffset = useCallback(() => {
    if (!trackRef.current) {
      return;
    }

    trackRef.current.style.transform = canAutoScroll
      ? `translate3d(${-offsetRef.current}px, 0, 0)`
      : "translate3d(0, 0, 0)";
  }, [canAutoScroll]);

  const updateVisibleIndex = useCallback(() => {
    const viewport = viewportRef.current;
    const loopWidth = loopWidthRef.current;

    if (!viewport || loopWidth <= 0 || cardRefs.current.length === 0) {
      return;
    }

    const viewportCenter = normalizeOffset(offsetRef.current + viewport.clientWidth / 2);
    let nextIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) {
        return;
      }

      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const directDistance = Math.abs(cardCenter - viewportCenter);
      const circularDistance = Math.min(directDistance, loopWidth - directDistance);

      if (circularDistance < bestDistance) {
        bestDistance = circularDistance;
        nextIndex = index;
      }
    });

    if (visibleIndexRef.current === nextIndex) {
      return;
    }

    visibleIndexRef.current = nextIndex;
    setVisibleIndex(nextIndex);
  }, [normalizeOffset]);

  const centerCard = useCallback((index: number) => {
    const viewport = viewportRef.current;
    const card = cardRefs.current[index];

    if (!viewport || !card) {
      return;
    }

    const rawLeft = card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2;

    if (!canAutoScroll) {
      const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      viewport.scrollTo({
        left: Math.max(0, Math.min(rawLeft, maxScrollLeft)),
        behavior: "smooth",
      });
      return;
    }

    const loopWidth = loopWidthRef.current;

    if (loopWidth <= 0) {
      return;
    }

    offsetRef.current = normalizeOffset(rawLeft);
    applyOffset();
    visibleIndexRef.current = index;
    setVisibleIndex(index);
  }, [applyOffset, canAutoScroll, normalizeOffset]);

  const selectCard = useCallback((index: number) => {
    const boundedIndex = Math.max(0, Math.min(index, t.items.length - 1));

    if (selectedIndex === boundedIndex) {
      setSelectedIndex(null);
      return;
    }

    setSelectedIndex(boundedIndex);
    window.requestAnimationFrame(() => centerCard(boundedIndex));
  }, [centerCard, selectedIndex, t.items.length]);

  useEffect(() => {
    const measure = () => {
      loopWidthRef.current = firstGroupRef.current?.offsetWidth ?? 0;

      if (loopWidthRef.current > 0) {
        offsetRef.current = normalizeOffset(offsetRef.current);
      } else {
        offsetRef.current = 0;
      }

      applyOffset();
      updateVisibleIndex();
    };

    measure();

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            measure();
          });

    if (resizeObserver) {
      if (viewportRef.current) {
        resizeObserver.observe(viewportRef.current);
      }

      if (firstGroupRef.current) {
        resizeObserver.observe(firstGroupRef.current);
      }
    }

    window.addEventListener("resize", measure);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [applyOffset, canAutoScroll, normalizeOffset, t.items.length, updateVisibleIndex]);

  useEffect(() => {
    if (!canAutoScroll) {
      offsetRef.current = 0;
      applyOffset();
      return;
    }

    const step = (timestamp: number) => {
      const loopWidth = loopWidthRef.current;

      if (selectedIndex === null && !isDragging && loopWidth > 0) {
        const previousTimestamp = lastFrameTimeRef.current ?? timestamp;
        const delta = timestamp - previousTimestamp;

        lastFrameTimeRef.current = timestamp;
        offsetRef.current += (delta * CAROUSEL_SPEED_PX_PER_SECOND) / 1000;

        if (offsetRef.current >= loopWidth) {
          offsetRef.current -= loopWidth;
        }

        applyOffset();
        updateVisibleIndex();
      } else {
        lastFrameTimeRef.current = timestamp;
      }

      animationFrameRef.current = window.requestAnimationFrame(step);
    };

    animationFrameRef.current = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = null;
      lastFrameTimeRef.current = null;
    };
  }, [applyOffset, canAutoScroll, isDragging, selectedIndex, updateVisibleIndex]);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;

      if (!target || sectionRef.current?.contains(target)) {
        return;
      }

      setSelectedIndex(null);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [selectedIndex]);

  useEffect(() => {
    const handleFocusRequest = (event: Event) => {
      const customEvent = event as CustomEvent<{ index?: number }>;
      const requestedIndex = customEvent.detail?.index;

      if (typeof requestedIndex !== "number") {
        return;
      }

      selectCard(requestedIndex);
    };

    window.addEventListener("hero-service-focus", handleFocusRequest);

    return () => window.removeEventListener("hero-service-focus", handleFocusRequest);
  }, [selectCard]);

  const finishDrag = useCallback((pointerId?: number) => {
    const viewport = viewportRef.current;
    const dragState = dragStateRef.current;

    if (!dragState.active) {
      pressedCardIndexRef.current = null;
      return;
    }

    if (viewport && typeof pointerId === "number" && viewport.hasPointerCapture(pointerId)) {
      viewport.releasePointerCapture(pointerId);
    }

    if (dragState.moved) {
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }

    dragState.active = false;
    dragState.moved = false;
    dragState.pointerId = -1;
    pressedCardIndexRef.current = null;
    setIsDragging(false);
    lastFrameTimeRef.current = null;
  }, []);

  const updateGlowPosition = useCallback(
    (clientX: number, clientY: number) => {
      const viewport = viewportRef.current;
      const glow = glowRef.current;

      if (!viewport || !glow) {
        return;
      }

      const bounds = viewport.getBoundingClientRect();
      const x = clientX - bounds.left;
      const y = clientY - bounds.top;

      glow.style.opacity = "1";
      glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0) scale(1)`;
    },
    []
  );

  const hideGlow = useCallback(() => {
    if (!glowRef.current) {
      return;
    }

    glowRef.current.style.opacity = "0";
    glowRef.current.style.transform = "translate3d(-50%, -50%, 0) scale(0.92)";
  }, []);

  const repeatedGroups = canAutoScroll ? [0, 1] : [0];
  const displayedIndex = selectedIndex ?? visibleIndex;
  const displayedItem = t.items[displayedIndex];
  return (
    <section
      id="servicios"
      ref={sectionRef}
      onPointerDownCapture={(event) => {
        if (selectedIndex === null) {
          return;
        }

        const target = event.target as HTMLElement | null;

        if (target?.closest("[data-service-card='true']")) {
          return;
        }

        setSelectedIndex(null);
      }}
      className={`nav-anchor-section content-auto-section relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28 ${
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
      <div
        className={`absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent ${
          isLight ? "via-blue-500/10" : "via-blue-300/15"
        } to-transparent`}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionReveal anchor>
          <div className="max-w-3xl">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm ${
                isLight
                  ? "border border-blue-200 bg-white/80 text-blue-700"
                  : "border border-blue-400/20 bg-blue-500/10 text-blue-200"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              {t.badge}
            </span>

            <h2
              className={`mt-4 text-3xl font-semibold tracking-[-0.04em] sm:mt-5 sm:text-5xl lg:text-[3.6rem] ${
                isLight ? "text-slate-950" : "text-white"
              }`}
            >
              {t.title}
            </h2>

            <p
              className={`mt-3 max-w-2xl text-sm leading-6 sm:mt-4 sm:text-lg sm:leading-7 lg:text-xl ${
                isLight ? "text-slate-600" : "text-slate-300"
              }`}
            >
              {t.description}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center sm:justify-between">
              <div
                className={`flex min-w-0 items-center gap-3 rounded-full px-3.5 py-2.5 sm:px-4 ${
                  isLight
                    ? "border border-slate-200 bg-white/82 text-slate-800 shadow-[0_14px_28px_rgba(148,163,184,0.14)]"
                    : "border border-white/10 bg-white/6 text-white shadow-[0_14px_28px_rgba(2,6,23,0.22)]"
                }`}
              >
                <span
                  className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[0.7rem] font-extrabold tracking-[0.24em] ${
                    isLight ? "bg-blue-50 text-blue-700" : "bg-blue-400/14 text-blue-100"
                  }`}
                >
                  {String(displayedIndex + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <div className={`truncate text-sm font-semibold sm:text-base ${isLight ? "text-slate-950" : "text-white"}`}>
                    {displayedItem?.title}
                  </div>
                  <div className={`text-xs ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                    {selectedIndex === null
                      ? isSpanish
                        ? "Autoplay activo"
                        : "Autoplay active"
                      : isSpanish
                        ? "Tarjeta fijada"
                        : "Card pinned"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="relative mt-10 sm:mt-12">
            <div
              ref={viewportRef}
              onPointerEnter={(event) => {
                if (event.pointerType === "touch") {
                  return;
                }

                updateGlowPosition(event.clientX, event.clientY);
              }}
              onPointerDown={(event) => {
                if (!canAutoScroll || event.button !== 0) {
                  return;
                }

                const target = event.target as HTMLElement | null;
                const cardElement = target?.closest("[data-service-card='true']") as
                  | HTMLElement
                  | null;

                dragStateRef.current.active = true;
                dragStateRef.current.moved = false;
                dragStateRef.current.pointerId = event.pointerId;
                dragStateRef.current.startX = event.clientX;
                dragStateRef.current.startOffset = offsetRef.current;
                pressedCardIndexRef.current =
                  cardElement?.dataset.serviceCardIndex !== undefined
                    ? Number(cardElement.dataset.serviceCardIndex)
                    : null;
                setIsDragging(true);
                lastFrameTimeRef.current = null;
                event.currentTarget.setPointerCapture(event.pointerId);
                updateGlowPosition(event.clientX, event.clientY);
              }}
              onPointerMove={(event) => {
                if (event.pointerType !== "touch") {
                  updateGlowPosition(event.clientX, event.clientY);
                }

                const dragState = dragStateRef.current;

                if (!canAutoScroll || !dragState.active || dragState.pointerId !== event.pointerId) {
                  return;
                }

                const deltaX = event.clientX - dragState.startX;

                if (!dragState.moved && Math.abs(deltaX) >= DRAG_THRESHOLD_PX) {
                  dragState.moved = true;
                }

                if (!dragState.moved) {
                  return;
                }

                offsetRef.current = normalizeOffset(dragState.startOffset - deltaX);
                applyOffset();
              }}
              onPointerUp={(event) => {
                const shouldToggleCard =
                  dragStateRef.current.active &&
                  !dragStateRef.current.moved &&
                  pressedCardIndexRef.current !== null;
                const cardIndex = pressedCardIndexRef.current;

                finishDrag(event.pointerId);

                if (shouldToggleCard && cardIndex !== null) {
                  selectCard(cardIndex);
                }
              }}
              onPointerCancel={(event) => finishDrag(event.pointerId)}
              onPointerLeave={(event) => {
                hideGlow();

                if (!dragStateRef.current.active || !canAutoScroll) {
                  return;
                }

                finishDrag(event.pointerId);
              }}
              onClickCapture={(event) => {
                if (!suppressClickRef.current) {
                  return;
                }

                event.preventDefault();
                event.stopPropagation();
              }}
              className={`relative px-1 py-3 select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:px-2 sm:py-4 ${
                canAutoScroll ? "overflow-hidden cursor-grab active:cursor-grabbing" : "overflow-x-auto"
              }`}
            >
              {canAutoScroll && (
                <>
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-y-3 left-0 z-20 hidden w-12 sm:block sm:inset-y-4 ${
                      isLight
                        ? "bg-linear-to-r from-slate-50 via-slate-50/92 to-transparent"
                        : "bg-linear-to-r from-slate-950 via-slate-950/92 to-transparent"
                    }`}
                  />
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-y-3 right-0 z-20 hidden w-12 sm:block sm:inset-y-4 ${
                      isLight
                        ? "bg-linear-to-l from-slate-50 via-slate-50/92 to-transparent"
                        : "bg-linear-to-l from-slate-950 via-slate-950/92 to-transparent"
                    }`}
                  />
                </>
              )}

              <div
                ref={glowRef}
                aria-hidden="true"
                className={`pointer-events-none absolute left-0 top-0 z-0 h-40 w-40 rounded-full blur-[72px] transition-opacity duration-150 will-change-transform sm:h-52 sm:w-52 ${
                  isLight ? "bg-blue-400/20" : "bg-blue-400/28"
                }`}
                style={{
                  opacity: 0,
                  transform: "translate3d(-50%, -50%, 0) scale(0.92)",
                }}
              />

              <div ref={trackRef} className="relative z-10 flex w-max gap-0 will-change-transform">
                {repeatedGroups.map((group) => (
                  <div
                    key={group}
                    ref={group === 0 ? firstGroupRef : undefined}
                    className="flex gap-4 pr-4 sm:gap-5 sm:pr-5 lg:gap-6 lg:pr-6"
                  >
                    {t.items.map((service, index) => {
                      const Icon = icons[index % icons.length];
                      const isSelected = selectedIndex === index;

                      return (
                        <GlowCard
                          key={`${group}-${service.title}`}
                          ref={(element) => {
                            if (group === 0) {
                              cardRefs.current[index] = element;
                            }
                          }}
                          isLight={isLight}
                          borderRadius={24}
                          backgroundColor={
                            isSelected
                              ? isLight
                                ? "rgba(255,255,255,0.98)"
                                : "rgba(15,23,42,0.94)"
                              : isLight
                                ? "rgba(255,255,255,0.92)"
                                : "rgba(255,255,255,0.06)"
                          }
                          boxShadow={
                            isSelected
                              ? isLight
                                ? "0 22px 40px rgba(59,130,246,0.18)"
                                : "0 20px 42px rgba(59,130,246,0.18)"
                              : isLight
                                ? "0 18px 34px rgba(148,163,184,0.14)"
                                : "0 14px 36px rgba(2,6,23,0.22)"
                          }
                          glowIntensity={isSelected ? 1.15 : 1}
                          fillOpacity={
                            isSelected
                              ? isLight
                                ? 0.28
                                : 0.36
                              : undefined
                          }
                          className="w-[280px] shrink-0 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 sm:w-[320px] lg:w-[340px]"
                        >
                          <button
                            type="button"
                            data-service-card="true"
                            data-service-card-index={index}
                            className="relative flex h-full w-full flex-col rounded-[inherit] p-5 text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blum-blue/50 sm:p-6"
                            aria-pressed={isSelected}
                          >
                            <div
                              className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ${
                                isSelected ? "opacity-100" : ""
                              } ${
                                isLight
                                  ? "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_55%)]"
                                  : "bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.18),transparent_50%)]"
                              }`}
                            />

                            <div
                              className={`relative flex h-11 w-11 items-center justify-center rounded-2xl transition-colors sm:h-12 sm:w-12 ${
                                isSelected
                                  ? "bg-blue-500 text-white"
                                  : isLight
                                    ? "bg-slate-100 text-blue-600"
                                    : "bg-white/10 text-blue-200"
                              }`}
                            >
                              <Icon className="h-6 w-6" />
                            </div>

                            <div className="relative mt-5 flex items-start justify-between gap-3">
                              <h3
                                className={`text-lg font-semibold leading-snug sm:text-xl ${
                                  isLight ? "text-slate-950" : "text-white"
                                }`}
                              >
                                {service.title}
                              </h3>
                              <span
                                className={`shrink-0 rounded-full px-2.5 py-1 text-[0.72rem] font-extrabold leading-none tracking-[0.24em] shadow-sm ring-1 sm:px-3 sm:py-1.5 sm:text-xs ${
                                  isLight
                                    ? isSelected
                                      ? "bg-blue-50 text-blue-700 ring-blue-200 shadow-[0_8px_18px_rgba(59,130,246,0.16)]"
                                      : "bg-slate-100 text-slate-600 ring-slate-200"
                                    : isSelected
                                      ? "bg-blue-400/14 text-blue-100 ring-blue-300/25 shadow-[0_8px_20px_rgba(59,130,246,0.18)]"
                                      : "bg-white/8 text-slate-200 ring-white/12"
                                }`}
                              >
                                0{index + 1}
                              </span>
                            </div>

                            <p
                              className={`relative mt-3 text-[13px] leading-5 sm:text-[15px] sm:leading-6 ${
                                isLight
                                  ? isSelected
                                    ? "text-slate-700"
                                    : "text-slate-600"
                                  : isSelected
                                    ? "text-slate-100"
                                    : "text-slate-300"
                              }`}
                            >
                              {service.description}
                            </p>
                          </button>
                        </GlowCard>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 sm:mt-6">
              <div className="flex flex-wrap items-center gap-2">
                {t.items.map((item, index) => {
                  const isCurrent = index === displayedIndex;

                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => selectCard(index)}
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                        isCurrent
                          ? isLight
                            ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                            : "bg-blue-400/14 text-blue-100 ring-1 ring-blue-300/20"
                          : isLight
                            ? "bg-white/80 text-slate-600 ring-1 ring-slate-200 hover:text-slate-950"
                            : "bg-white/6 text-slate-300 ring-1 ring-white/10 hover:text-white"
                      }`}
                      aria-label={`Ir a ${item.title}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isCurrent
                            ? isLight
                              ? "bg-blue-500"
                              : "bg-blue-300"
                            : isLight
                              ? "bg-slate-300"
                              : "bg-slate-600"
                        }`}
                      />
                      <span className="max-w-[10rem] truncate">{item.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
