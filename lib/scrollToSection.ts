"use client";

const MOBILE_BREAKPOINT_QUERY = "(max-width: 767px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const LOW_VIEWPORT_QUERY = "(max-height: 760px)";

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
    window.innerHeight <= 760 ? 72 : window.innerHeight <= 900 ? 56 : 48;

  return headerBottom + visualGap;
}

export function scrollToSection(sectionId: string) {
  const target = document.getElementById(sectionId);

  if (!target) {
    return false;
  }

  const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
  const isMobile = window.matchMedia(MOBILE_BREAKPOINT_QUERY).matches;
  const isLowViewport = window.matchMedia(LOW_VIEWPORT_QUERY).matches;
  const focusTarget = getAnchorTarget(target);
  const focusRect = focusTarget.getBoundingClientRect();
  const focusTop = focusRect.top + window.scrollY;
  let nextTop = focusTop - getScrollOffset();

  if (!isMobile && isLowViewport && focusTarget !== target) {
    const headerBottom = getHeaderBottom();
    const availableHeight = Math.max(0, window.innerHeight - headerBottom - 32);
    const focusHeight = Math.min(focusRect.height, availableHeight);
    const desiredTop = headerBottom + Math.max(24, (availableHeight - focusHeight) / 2);

    nextTop = focusTop - desiredTop;
  }

  window.scrollTo({
    top: clampScrollTop(nextTop),
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });

  const nextHash = `#${sectionId}`;

  if (window.location.hash !== nextHash) {
    window.history.replaceState(null, "", nextHash);
  }

  return true;
}
