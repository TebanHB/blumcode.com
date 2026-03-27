"use client";

import {
  Children,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import gsap from "gsap";

import { cn } from "@/lib/cn";

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  autoplay?: boolean;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  className?: string;
  children: ReactNode;
}

export interface CardSwapHandle {
  next: () => void;
  previous: () => void;
  focusCard: (index: number) => void;
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { customClass, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      {...rest}
      className={cn(
        "absolute left-1/2 top-1/2 rounded-[30px] border [backface-visibility:hidden] [transform-style:preserve-3d] [will-change:transform]",
        customClass,
        className
      )}
    />
  );
});

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (index: number, distX: number, distY: number, total: number): Slot => ({
  x: index * distX,
  y: -index * distY,
  z: -index * distX * 1.5,
  zIndex: total - index,
});

const placeNow = (element: HTMLElement, slot: Slot, skew: number) => {
  gsap.set(element, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });
};

const CardSwap = forwardRef<CardSwapHandle, CardSwapProps>(function CardSwap(
  {
    width = 420,
    height = 250,
    cardDistance = 28,
    verticalDistance = 22,
    delay = 5000,
    autoplay = true,
    pauseOnHover = false,
    onCardClick,
    skewAmount = 4,
    easing = "elastic",
    className,
    children,
  },
  ref
) {
  const childArray = useMemo(
    () => Children.toArray(children) as ReactElement<CardProps>[],
    [children]
  );
  const config = useMemo(
    () =>
      easing === "elastic"
        ? {
            ease: "elastic.out(0.6,0.9)",
            durDrop: 2,
            durMove: 2,
            durReturn: 2,
            promoteOverlap: 0.9,
            returnDelay: 0.05,
          }
        : {
            ease: "power1.inOut",
            durDrop: 0.8,
            durMove: 0.8,
            durReturn: 0.8,
            promoteOverlap: 0.45,
            returnDelay: 0.2,
          },
    [easing]
  );

  const orderRef = useRef<number[]>(Array.from({ length: childArray.length }, (_, index) => index));
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | null>(null);
  const focusCardRef = useRef<((index: number) => void) | null>(null);
  const nextCardRef = useRef<(() => void) | null>(null);
  const previousCardRef = useRef<(() => void) | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      next: () => {
        nextCardRef.current?.();
      },
      previous: () => {
        previousCardRef.current?.();
      },
      focusCard: (index: number) => {
        focusCardRef.current?.(index);
      },
    }),
    []
  );

  useEffect(() => {
    const elements = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>("[data-card-swap-card='true']") ?? []
    );

    if (elements.length === 0) {
      return;
    }

    orderRef.current = Array.from({ length: elements.length }, (_, index) => index);

    elements.forEach((element, index) => {
      placeNow(element, makeSlot(index, cardDistance, verticalDistance, elements.length), skewAmount);
    });

    const stopInterval = () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const settleActiveAnimation = () => {
      if (!timelineRef.current) {
        return;
      }

      timelineRef.current.progress(1);
      timelineRef.current.kill();
      timelineRef.current = null;
    };

    const normalizeZIndexes = (nextOrder: number[]) => {
      nextOrder.forEach((cardIndex, slotIndex) => {
        const element = elements[cardIndex];

        if (!element) {
          return;
        }

        gsap.set(element, {
          zIndex: makeSlot(slotIndex, cardDistance, verticalDistance, elements.length).zIndex,
        });
      });
    };

    const startInterval = () => {
      stopInterval();
      intervalRef.current = window.setInterval(swap, delay);
    };

    const focusCard = (targetIndex: number) => {
      const currentIndex = orderRef.current.indexOf(targetIndex);

      if (currentIndex === -1 || currentIndex === 0) {
        return;
      }

      const nextOrder = [
        ...orderRef.current.slice(currentIndex),
        ...orderRef.current.slice(0, currentIndex),
      ];
      const focusedElement = elements[targetIndex];

      if (!focusedElement) {
        return;
      }

      stopInterval();
      settleActiveAnimation();
      orderRef.current = nextOrder;

      const timeline = gsap.timeline();
      timelineRef.current = timeline;

      nextOrder.forEach((cardIndex, slotIndex) => {
        const element = elements[cardIndex];

        if (!element) {
          return;
        }

        gsap.set(element, {
          zIndex: slotIndex === 0 ? elements.length + 2 : elements.length - slotIndex,
        });
      });

      nextOrder.forEach((cardIndex, slotIndex) => {
        const element = elements[cardIndex];

        if (!element) {
          return;
        }

        const slot = makeSlot(slotIndex, cardDistance, verticalDistance, elements.length);
        timeline.to(
          element,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: slotIndex === 0 ? 0.95 : 0.9,
            ease: config.ease,
          },
          slotIndex === 0 ? 0 : slotIndex * 0.05
        );
      });

        timeline.call(() => {
        normalizeZIndexes(nextOrder);

        if (autoplay && !pauseOnHover) {
          startInterval();
        }
      });
    };

    const swap = () => {
      if (orderRef.current.length < 2) {
        return;
      }

      const [front, ...rest] = orderRef.current;
      const frontElement = elements[front];

      if (!frontElement) {
        return;
      }

      const nextOrder = [...rest, front];
      orderRef.current = nextOrder;
      timelineRef.current?.kill();

      const timeline = gsap.timeline();
      timelineRef.current = timeline;

      timeline.to(frontElement, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      timeline.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((cardIndex, slotIndex) => {
        const element = elements[cardIndex];

        if (!element) {
          return;
        }

        const slot = makeSlot(slotIndex, cardDistance, verticalDistance, elements.length);
        timeline.set(element, { zIndex: slot.zIndex }, "promote");
        timeline.to(
          element,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${slotIndex * 0.15}`
        );
      });

      const backSlot = makeSlot(
        elements.length - 1,
        cardDistance,
        verticalDistance,
        elements.length
      );
      timeline.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      timeline.call(
        () => {
          gsap.set(frontElement, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return"
      );
      timeline.to(
        frontElement,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return"
      );
      timeline.call(() => {
        normalizeZIndexes(nextOrder);
      });
    };

    const goToNext = () => {
      stopInterval();
      settleActiveAnimation();
      swap();

      if (autoplay && !pauseOnHover) {
        startInterval();
      }
    };

    focusCardRef.current = focusCard;
    nextCardRef.current = goToNext;
    previousCardRef.current = () => {
      const previousIndex = orderRef.current[orderRef.current.length - 1];

      if (previousIndex === undefined) {
        return;
      }

      focusCard(previousIndex);
    };
    if (autoplay) {
      swap();
      startInterval();
    } else {
      normalizeZIndexes(orderRef.current);
    }

    const node = containerRef.current;

    if (autoplay && pauseOnHover && node) {
      const pause = () => {
        stopInterval();
      };
      const resume = () => {
        startInterval();
      };

      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);

      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        timelineRef.current?.kill();
        focusCardRef.current = null;
        nextCardRef.current = null;
        previousCardRef.current = null;
        stopInterval();
      };
    }

    return () => {
      timelineRef.current?.kill();
      focusCardRef.current = null;
      nextCardRef.current = null;
      previousCardRef.current = null;
      stopInterval();
    };
  }, [autoplay, cardDistance, childArray.length, config, delay, pauseOnHover, skewAmount, verticalDistance]);

  const renderedChildren = childArray.map((child, index) => {
    if (!isValidElement<CardProps>(child)) {
      return child;
    }

    const {
      customClass,
      className: childClassName,
      style: childStyle,
      onClick: childOnClick,
      children: childContent,
      ...restProps
    } = child.props;

    return (
      <div
        key={index}
        {...restProps}
        data-card-swap-card="true"
        style={{
          width,
          height,
          ...(childStyle ?? {}),
        }}
        onClick={(event) => {
          focusCardRef.current?.(index);
          childOnClick?.(event);
          onCardClick?.(index);
        }}
        className={cn(
          "absolute left-1/2 top-1/2 rounded-[30px] border [backface-visibility:hidden] [transform-style:preserve-3d] [will-change:transform]",
          customClass,
          childClassName
        )}
      >
        {childContent}
      </div>
    );
  });

  return (
    <div
      ref={containerRef}
      className={cn("relative mx-auto overflow-visible perspective-[1100px]", className)}
      style={{ width, height }}
    >
      {renderedChildren}
    </div>
  );
});

CardSwap.displayName = "CardSwap";

export default CardSwap;
