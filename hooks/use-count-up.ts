"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Options = {
  /** start counting only when this becomes true (e.g. in view) */
  active: boolean;
  duration?: number;
};

/**
 * Animates a number from 0 to `target` once `active` is true, using an
 * ease-out curve. Returns the current numeric value (the consumer formats).
 * Honours reduced-motion by snapping straight to the final value.
 */
export function useCountUp(
  target: number,
  { active, duration = 1600 }: Options,
): number {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, prefersReducedMotion]);

  return value;
}
