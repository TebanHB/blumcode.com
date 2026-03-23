"use client";

const MOBILE_BREAKPOINT_QUERY = "(max-width: 767px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function getHeaderBottom() {
  const headerBar = document.querySelector<HTMLElement>("[data-site-header-bar]");

  return headerBar?.getBoundingClientRect().bottom ?? 0;
}

function clampScrollTop(nextTop: number) {
  const maxScrollTop = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );

  return Math.min(Math.max(0, nextTop), maxScrollTop);
}

function getAnchorTarget(section: HTMLElement) {
  return (
    section.querySelector<HTMLElement>("[data-nav-anchor='true']") ??
    section.querySelector<HTMLElement>("h1, h2") ??
    section
  );
}

function getScrollOffset() {
  const headerBottom = getHeaderBottom();
  const isMobile = window.matchMedia(MOBILE_BREAKPOINT_QUERY).matches;

  if (isMobile) {
    return headerBottom + 12;
  }

  const visualGap =
    window.innerHeight <= 760 ? 20 : window.innerHeight <= 900 ? 28 : 36;

  return headerBottom + visualGap;
}

export function scrollToSection(sectionId: string) {
  const target = document.getElementById(sectionId);

  if (!target) {
    return false;
  }

  const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
  const focusTarget = getAnchorTarget(target);
  const focusRect = focusTarget.getBoundingClientRect();
  const focusTop = focusRect.top + window.scrollY;
  const nextTop = focusTop - getScrollOffset();

  window.scrollTo({
    top: clampScrollTop(nextTop),
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });

  return true;
}
