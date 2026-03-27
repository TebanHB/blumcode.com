import { useEffect, useState } from "react";

const REDUCED_EFFECTS_MEDIA_QUERY =
  "(max-width: 767px), (pointer: coarse), (prefers-reduced-motion: reduce)";

export function useReducedEffects() {
  const [reducedEffects, setReducedEffects] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(REDUCED_EFFECTS_MEDIA_QUERY);
    const update = () => setReducedEffects(mediaQuery.matches);

    update();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", update);
      return () => mediaQuery.removeEventListener("change", update);
    }

    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  return reducedEffects;
}
