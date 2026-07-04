"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** fraction of the element visible before it counts as in view */
  threshold?: number;
  /** margin around the root, e.g. "-12% 0px" to trigger slightly early */
  rootMargin?: string;
  /** only fire once (default true) — reveals should not replay */
  once?: boolean;
};

/**
 * Lightweight IntersectionObserver hook. Returns a ref to attach and a
 * boolean for whether the element has entered the viewport.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
  once = true,
}: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
