"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns 0→1 for how far a section has travelled up through the viewport.
 * Used to "draw" the journey thread as the reader scrolls. rAF-throttled and
 * passive; safe to leave mounted.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const compute = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const span = rect.height * 0.9;
      const value = (vh * 0.82 - rect.top) / span;
      setProgress(Math.min(Math.max(value, 0), 1));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { ref, progress };
}
