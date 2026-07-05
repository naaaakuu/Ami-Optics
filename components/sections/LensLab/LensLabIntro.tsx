"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * LensLabIntro — the full-viewport opening to "Discover Your Lens".
 * Pure typography on the warm canvas (no image, no video) — confidence through
 * restraint (Constitution Law 15). A gentle scroll cue invites the journey and
 * fades away the moment the visitor starts scrolling.
 */

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const stack: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.06, staggerChildren: 0.14 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

export function LensLabIntro() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  // Hide the scroll cue once the visitor has started moving — it has done its
  // job and should never linger or compete for attention (Law 8).
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 24) setScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="lenses"
      aria-labelledby="lenslab-intro-title"
      className="relative isolate flex min-h-[100svh] items-center bg-[linear-gradient(180deg,var(--color-paper-bright),var(--color-paper)_62%,var(--color-paper-dim))] py-24 text-ink"
    >
      <Container className="relative">
        <motion.div
          variants={stack}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <motion.p
            variants={item}
            className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.34em] text-champagne"
          >
            Discover Your Lens
          </motion.p>

          <motion.h2
            variants={item}
            id="lenslab-intro-title"
            className="mt-7 font-display text-[length:clamp(2.5rem,1.2rem_+_4vw,4.5rem)] font-medium leading-[1.04] tracking-[-0.025em] text-balance text-ink"
          >
            The right lens changes everything.
          </motion.h2>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-[520px] text-base leading-relaxed text-muted text-pretty sm:text-lg"
          >
            Every lens we recommend exists for a reason. Scroll to understand
            yours.
          </motion.p>
        </motion.div>
      </Container>

      {/* Discoverability cue — signals this is an interactive, multi-part,
          horizontally-swipeable section (not a passive block to scroll past).
          Fades away once the visitor starts scrolling in. Reduced motion keeps
          the arrow static. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500"
        style={{ opacity: scrolled ? 0 : 1 }}
      >
        <div className="flex flex-col items-center gap-3.5 text-muted-light">
          {/* six-dot preview of the six exhibits ahead */}
          <span className="flex items-center gap-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "block h-1.5 rounded-full",
                  i === 0 ? "w-4 bg-champagne" : "w-1.5 bg-ink/20",
                )}
              />
            ))}
          </span>

          {/* interactive gesture hint */}
          <span className="inline-flex items-center gap-2 font-mono text-[0.62rem] font-medium uppercase tracking-[0.24em] text-champagne">
            Swipe to explore
            <svg
              className={cn("h-4 w-4", reduce ? "" : "animate-nudge-x")}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>

          {/* scroll-to-begin */}
          <span className="flex flex-col items-center gap-1">
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em]">
              Scroll to begin
            </span>
            <svg
              className={cn("h-4 w-4", reduce ? "" : "animate-float")}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
