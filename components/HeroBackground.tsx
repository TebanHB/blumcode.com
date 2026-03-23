"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PARTICLE_COUNT = 40;
const SQUARE_COUNT = 14;
const ENABLE_3D_MEDIA_QUERY =
  "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

type HeroBackgroundProps = {
  isLight: boolean;
};

function populateParticles(layer: HTMLDivElement, count: number) {
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement("span");
    particle.className = "hero-3d-particle";
    particle.style.setProperty("--size", `${(Math.random() * 4 + 2).toFixed(2)}px`);
    particle.style.setProperty("--x", `${((Math.random() - 0.5) * 1200).toFixed(1)}px`);
    particle.style.setProperty("--y", `${((Math.random() - 0.5) * 700).toFixed(1)}px`);
    particle.style.setProperty("--z", `${(Math.random() * 700 - 500).toFixed(1)}px`);
    particle.style.setProperty("--dx", `${((Math.random() - 0.5) * 120).toFixed(1)}px`);
    particle.style.setProperty("--dx2", `${((Math.random() - 0.5) * 180).toFixed(1)}px`);
    particle.style.setProperty("--opacity", (Math.random() * 0.55 + 0.12).toFixed(2));
    particle.style.setProperty("--duration", `${(Math.random() * 8 + 9).toFixed(2)}s`);
    particle.style.setProperty("--delay", `${(-Math.random() * 14).toFixed(2)}s`);
    fragment.appendChild(particle);
  }

  layer.replaceChildren(fragment);
}

function populateSquares(layer: HTMLDivElement, count: number) {
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < count; index += 1) {
    const square = document.createElement("span");
    const size = Math.random() * 10 + 4;

    square.className = "hero-3d-square";
    square.style.setProperty("--size", `${size.toFixed(2)}px`);
    square.style.setProperty("--x", `${((Math.random() - 0.5) * 1000).toFixed(1)}px`);
    square.style.setProperty("--y", `${((Math.random() - 0.5) * 560).toFixed(1)}px`);
    square.style.setProperty("--z", `${(Math.random() * 600 - 450).toFixed(1)}px`);
    square.style.setProperty("--dx", `${((Math.random() - 0.5) * 140).toFixed(1)}px`);
    square.style.setProperty("--rot", `${(Math.random() * 360).toFixed(1)}deg`);
    square.style.setProperty("--opacity", (Math.random() * 0.35 + 0.08).toFixed(2));
    square.style.setProperty("--duration", `${(Math.random() * 7 + 8).toFixed(2)}s`);
    square.style.setProperty("--delay", `${(-Math.random() * 12).toFixed(2)}s`);
    fragment.appendChild(square);
  }

  layer.replaceChildren(fragment);
}

export default function HeroBackground({ isLight }: HeroBackgroundProps) {
  const [is3DEnabled, setIs3DEnabled] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const squaresRef = useRef<HTMLDivElement>(null);
  const logoPlateRef = useRef<HTMLDivElement>(null);
  const logoCoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(ENABLE_3D_MEDIA_QUERY);
    const updateMode = () => setIs3DEnabled(mediaQuery.matches);

    updateMode();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateMode);
    } else {
      mediaQuery.addListener(updateMode);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", updateMode);
      } else {
        mediaQuery.removeListener(updateMode);
      }
    };
  }, []);

  useEffect(() => {
    if (!is3DEnabled) {
      return;
    }

    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const world = worldRef.current;
    const particles = particlesRef.current;
    const squares = squaresRef.current;
    const logoPlate = logoPlateRef.current;
    const logoCore = logoCoreRef.current;

    if (!scene || !camera || !world || !particles || !squares || !logoPlate || !logoCore) {
      return;
    }

    const sceneElement = scene;
    const cameraElement = camera;
    const worldElement = world;
    const particlesElement = particles;
    const squaresElement = squares;
    const logoPlateElement = logoPlate;
    const logoCoreElement = logoCore;

    if (particlesElement && squaresElement) {
      populateParticles(particlesElement, PARTICLE_COUNT);
      populateSquares(squaresElement, SQUARE_COUNT);
    }

    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let frameId = 0;
    let sceneIsVisible = true;

    const resetTransforms = () => {
      cameraElement.style.transform = "rotateX(0deg) rotateY(0deg)";
      worldElement.style.transform = "translate3d(-50%, -50%, 0)";
      logoPlateElement.style.transform = "translate3d(0, 0, 12px)";
      logoCoreElement.style.transform = "translate3d(-50%, -50%, 90px)";
    };

    const stopAnimation = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    const startAnimation = () => {
      if (!frameId && sceneIsVisible && !document.hidden) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const updatePointerTarget = (clientX: number, clientY: number) => {
      const rect = sceneElement.getBoundingClientRect();

      if (!rect.width || !rect.height) {
        return;
      }

      const x = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      const y = Math.min(Math.max((clientY - rect.top) / rect.height, 0), 1);

      targetX = (x - 0.5) * 18;
      targetY = (y - 0.5) * 14;
    };

    const handlePointerMove = (event: PointerEvent) => {
      updatePointerTarget(event.clientX, event.clientY);
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    function animate() {
      frameId = 0;

      pointerX += (targetX - pointerX) * 0.05;
      pointerY += (targetY - pointerY) * 0.05;

      const time = performance.now() * 0.00035;
      const autoY = Math.sin(time * 1.4) * 6;
      const autoX = Math.cos(time * 1.1) * 3.2;
      const depth = Math.sin(time * 1.8) * 24;

      cameraElement.style.transform = `rotateX(${-pointerY * 0.45}deg) rotateY(${pointerX * 0.45}deg)`;
      worldElement.style.transform = `translate3d(-50%, -50%, 0) rotateX(${autoX + pointerY * 0.35}deg) rotateY(${autoY + pointerX * 0.5}deg)`;
      logoPlateElement.style.transform = `rotateX(${autoX * 0.8 + pointerY * 0.7}deg) rotateY(${autoY * 1.1 + pointerX * 0.9}deg) rotateZ(${Math.sin(time) * 1.2}deg) translateZ(${22 + depth}px)`;
      logoCoreElement.style.transform = `translate3d(-50%, -50%, ${90 + depth * 0.5}px)`;

      frameId = window.requestAnimationFrame(animate);
    }

    const sceneObserver = new IntersectionObserver(
      ([entry]) => {
        sceneIsVisible = entry.isIntersecting;

        if (sceneIsVisible) {
          startAnimation();
          return;
        }

        stopAnimation();
      },
      { threshold: 0.08 }
    );

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
        return;
      }

      startAnimation();
    };

    resetTransforms();
    sceneObserver.observe(sceneElement);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    sceneElement.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    sceneElement.addEventListener("pointerleave", handlePointerLeave);
    startAnimation();

    return () => {
      stopAnimation();
      sceneObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      sceneElement.removeEventListener("pointermove", handlePointerMove);
      sceneElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [is3DEnabled]);

  if (!is3DEnabled) {
    return null;
  }

  return (
    <div
      ref={sceneRef}
      aria-hidden="true"
      className={`hero-3d-scene ${isLight ? "is-light" : "is-dark"}`}
    >
      <div ref={cameraRef} className="hero-3d-camera">
        <div ref={worldRef} className="hero-3d-world">
          <div className="hero-3d-deep-glow" />
          <div className="hero-3d-grid-floor" />

          <div className="hero-3d-ring-plane" />
          <div className="hero-3d-ring-plane hero-3d-ring-plane-r2" />
          <div className="hero-3d-ring-plane hero-3d-ring-plane-r3" />

          <div className="hero-3d-light-sweep hero-3d-light-sweep-s1" />
          <div className="hero-3d-light-sweep hero-3d-light-sweep-s2" />
          <div className="hero-3d-light-sweep hero-3d-light-sweep-s3" />

          <div ref={particlesRef} className="hero-3d-particle-layer" />
          <div ref={squaresRef} className="hero-3d-particle-layer" />

          <div ref={logoCoreRef} className="hero-3d-logo-core">
            <div className="hero-3d-logo-shadow" />
            <div ref={logoPlateRef} className="hero-3d-logo-plate">
              <Image
                src={isLight ? "/logo.svg" : "/logo-blanco.svg"}
                alt=""
                width={1268}
                height={429}
                unoptimized
                className="hero-3d-logo-image"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-3d-vignette" />
    </div>
  );
}
