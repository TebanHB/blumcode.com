"use client";

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { createPortal } from "react-dom";

type Side = "top" | "bottom" | "left" | "right";
type Align = "start" | "center" | "end";
type FollowCursor = boolean | "x" | "y";

type HoverCardContextValue = {
  followCursor: FollowCursor | undefined;
  open: boolean;
  triggerRect: DOMRect | null;
  pointer: { x: number; y: number } | null;
  setTriggerElement: (element: HTMLElement | null) => void;
  openCard: (element: HTMLElement, pointer?: { x: number; y: number }) => void;
  updatePointer: (element: HTMLElement, pointer: { x: number; y: number }) => void;
  scheduleClose: () => void;
  cancelClose: () => void;
};

const HoverCardContext = createContext<HoverCardContextValue | null>(null);

function useHoverCardContext() {
  const context = useContext(HoverCardContext);

  if (!context) {
    throw new Error("HoverCard components must be used inside HoverCard.");
  }

  return context;
}

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (value: T) => {
    refs.forEach((ref) => {
      if (!ref) {
        return;
      }

      if (typeof ref === "function") {
        ref(value);
        return;
      }

      try {
        (ref as { current: T | null }).current = value;
      } catch {
        // Ignore readonly refs from third-party children.
      }
    });
  };
}

function composeEventHandlers<E>(
  theirs: ((event: E) => void) | undefined,
  ours: (event: E) => void
) {
  return (event: E) => {
    theirs?.(event);
    ours(event);
  };
}

export function HoverCard({
  children,
  followCursor,
}: {
  children: ReactNode;
  followCursor?: FollowCursor;
}) {
  const closeTimeoutRef = useRef<number | null>(null);
  const [open, setOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimeoutRef.current = window.setTimeout(() => {
      setOpen(false);
    }, 90);
  }, [cancelClose]);

  const setTriggerElement = useCallback(() => {
    // Keep the ref synchronized without triggering render loops.
  }, []);

  const openCard = useCallback(
    (element: HTMLElement, nextPointer?: { x: number; y: number }) => {
      cancelClose();
      setTriggerRect(element.getBoundingClientRect());
      setPointer(nextPointer ?? null);
      setOpen(true);
    },
    [cancelClose]
  );

  const updatePointer = useCallback(
    (element: HTMLElement, nextPointer: { x: number; y: number }) => {
      setTriggerRect(element.getBoundingClientRect());
      setPointer(nextPointer);
    },
    []
  );

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const value = useMemo(
    () => ({
      followCursor,
      open,
      triggerRect,
      pointer,
      setTriggerElement,
      openCard,
      updatePointer,
      scheduleClose,
      cancelClose,
    }),
    [
      followCursor,
      open,
      triggerRect,
      pointer,
      setTriggerElement,
      openCard,
      updatePointer,
      scheduleClose,
      cancelClose,
    ]
  );

  return <HoverCardContext.Provider value={value}>{children}</HoverCardContext.Provider>;
}

export function HoverCardTrigger({
  children,
  asChild,
}: {
  children: ReactNode;
  asChild?: boolean;
}) {
  const context = useHoverCardContext();
  const child = Children.only(children);

  if (!asChild) {
    return <span>{children}</span>;
  }

  if (!isValidElement(child)) {
    return null;
  }

  const element = child as ReactElement<{
    ref?: Ref<HTMLElement>;
    onPointerEnter?: (event: React.PointerEvent<HTMLElement>) => void;
    onPointerMove?: (event: React.PointerEvent<HTMLElement>) => void;
    onPointerLeave?: (event: React.PointerEvent<HTMLElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  }>;

  return cloneElement(element, {
    ref: mergeRefs(element.props.ref, context.setTriggerElement),
    onPointerEnter: composeEventHandlers(element.props.onPointerEnter, (event) => {
      context.openCard(event.currentTarget, {
        x: event.clientX,
        y: event.clientY,
      });
    }),
    onPointerMove: composeEventHandlers(element.props.onPointerMove, (event) => {
      context.updatePointer(event.currentTarget, {
        x: event.clientX,
        y: event.clientY,
      });
    }),
    onPointerLeave: composeEventHandlers(element.props.onPointerLeave, () => {
      context.scheduleClose();
    }),
    onFocus: composeEventHandlers(element.props.onFocus, (event) => {
      context.openCard(event.currentTarget);
    }),
    onBlur: composeEventHandlers(element.props.onBlur, () => {
      context.scheduleClose();
    }),
  });
}

export function HoverCardContent({
  children,
  side = "top",
  sideOffset = 16,
  align = "center",
  alignOffset = 0,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  side?: Side;
  sideOffset?: number;
  align?: Align;
  alignOffset?: number;
}) {
  const context = useHoverCardContext();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 320, height: 180 });

  useEffect(() => {
    if (!context.open || !contentRef.current) {
      return;
    }

    const measure = () => {
      if (!contentRef.current) {
        return;
      }

      const rect = contentRef.current.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    };

    measure();

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            measure();
          });

    resizeObserver?.observe(contentRef.current);

    return () => resizeObserver?.disconnect();
  }, [context.open]);

  if (typeof document === "undefined" || !context.open || !context.triggerRect) {
    return null;
  }

  const portalRoot = document.getElementById("hover-card-root");

  if (!portalRoot) {
    return null;
  }

  const viewportPadding = 12;
  const baseXByAlign =
    align === "start"
      ? context.triggerRect.left
      : align === "end"
        ? context.triggerRect.right - size.width
        : context.triggerRect.left + context.triggerRect.width / 2 - size.width / 2;
  const baseYByAlign =
    align === "start"
      ? context.triggerRect.top
      : align === "end"
        ? context.triggerRect.bottom - size.height
        : context.triggerRect.top + context.triggerRect.height / 2 - size.height / 2;

  let left =
    side === "left"
      ? context.triggerRect.left - size.width - sideOffset
      : side === "right"
        ? context.triggerRect.right + sideOffset
        : baseXByAlign;
  let top =
    side === "top"
      ? context.triggerRect.top - size.height - sideOffset
      : side === "bottom"
        ? context.triggerRect.bottom + sideOffset
        : baseYByAlign;

  if (side === "top" || side === "bottom") {
    left += alignOffset;
  } else {
    top += alignOffset;
  }

  if (context.pointer) {
    const followBoth = context.followCursor === true;
    const followX = followBoth || context.followCursor === "x";
    const followY = followBoth || context.followCursor === "y";

    if (followX) {
      left = context.pointer.x - size.width / 2;
    }

    if (followY) {
      top = context.pointer.y + 24;
    }
  }

  left = Math.min(
    Math.max(viewportPadding, left),
    window.innerWidth - size.width - viewportPadding
  );
  top = Math.min(
    Math.max(viewportPadding, top),
    window.innerHeight - size.height - viewportPadding
  );

  return createPortal(
    <div
      ref={contentRef}
      onPointerEnter={context.cancelClose}
      onPointerLeave={context.scheduleClose}
      className={`z-[120] rounded-[24px] border border-white/10 bg-slate-950/92 p-5 text-white shadow-[0_24px_80px_rgba(2,6,23,0.38)] backdrop-blur-xl ${className}`.trim()}
      style={{
        position: "fixed",
        left,
        top,
      }}
      {...props}
    >
      {children}
    </div>,
    portalRoot
  );
}
