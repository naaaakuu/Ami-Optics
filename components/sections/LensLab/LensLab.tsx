"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useReducedMotion } from "framer-motion";
import { LensLabIntro } from "@/components/sections/LensLab/LensLabIntro";
import { LensLabOutro } from "@/components/sections/LensLab/LensLabOutro";
import { BlueCutExhibit } from "@/components/sections/LensLab/exhibits/BlueCutExhibit";
import { ProgressiveExhibit } from "@/components/sections/LensLab/exhibits/ProgressiveExhibit";
import { PhotochromicExhibit } from "@/components/sections/LensLab/exhibits/PhotochromicExhibit";
import { HighIndexExhibit } from "@/components/sections/LensLab/exhibits/HighIndexExhibit";
import { AntiGlareExhibit } from "@/components/sections/LensLab/exhibits/AntiGlareExhibit";
import { PolarisedExhibit } from "@/components/sections/LensLab/exhibits/PolarisedExhibit";
import { Container } from "@/components/ui/Container";
import type { LensLabId } from "@/content/lensLab";
import { cn } from "@/lib/utils";

/**
 * LensLab — Homepage Section 5, "Discover Your Lens".
 *
 * An intro, a HORIZONTAL exhibit carousel (one full-width slide per lens type),
 * and a closing CTA.
 *
 * Scroll model: the vertical page scroll brings the visitor INTO the lab (intro,
 * 100svh) and OUT of it (outro, 100svh) as normal — nothing is pinned or
 * scroll-jacked (Constitution Law 8; the homepage scroll is never trapped).
 * Between the six exhibits the visitor moves HORIZONTALLY instead:
 *   • Touch      — swipe left / right (vertical drags still scroll the page).
 *   • Desktop    — left / right arrow buttons in the side gutters.
 *   • Keyboard   — ← / → when the carousel region is focused.
 *   • Trackpad   — horizontal (deltaX) swipe.
 * Vertical mouse-wheel is intentionally NOT captured: the visitor keeps scrolling
 * the page and simply leaves the 85svh section — that is how they "exit" back to
 * normal vertical scroll after the last exhibit.
 *
 * A bottom bar carries the position indicator (dots + "N of 6 — {Name} Lenses")
 * and the "Skip to next section" link.
 */

type BuiltExhibit = {
  id: LensLabId;
  name: string;
  Component: () => React.ReactElement;
};

const BUILT: BuiltExhibit[] = [
  { id: "blue-cut", name: "Blue-Cut", Component: BlueCutExhibit },
  { id: "progressive", name: "Progressive", Component: ProgressiveExhibit },
  { id: "photochromic", name: "Photochromic", Component: PhotochromicExhibit },
  { id: "high-index", name: "High-Index", Component: HighIndexExhibit },
  { id: "anti-glare", name: "Anti-Glare", Component: AntiGlareExhibit },
  { id: "polarised", name: "Polarised", Component: PolarisedExhibit },
];

/** Where a swipe/drag begun on one of these should scroll/operate the control,
 *  never move the carousel. */
const INTERACTIVE = 'input, button, a, select, textarea, [role="slider"], [role="switch"]';

const SWIPE_THRESHOLD = 56; // px of horizontal travel needed to change slide
const WHEEL_COOLDOWN = 520; // ms between trackpad-driven slide changes

export function LensLab() {
  const reduce = useReducedMotion();
  const total = BUILT.length;

  const [index, setIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const goTo = useCallback(
    (next: number) => setIndex((prev) => Math.max(0, Math.min(total - 1, next < 0 ? prev : next))),
    [total],
  );
  const step = useCallback(
    (delta: number) => setIndex((prev) => Math.max(0, Math.min(total - 1, prev + delta))),
    [total],
  );

  // Keep off-screen slides out of the tab order + a11y tree so keyboard focus
  // and screen readers never land on an exhibit the visitor can't see.
  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (el) (el as unknown as { inert: boolean }).inert = i !== index;
    });
  }, [index]);

  // ── Keyboard ← / → (when the region is focused) ──────────────────────────
  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  // ── Touch / pointer swipe (axis-aware; vertical drags scroll normally) ────
  const startX = useRef<number | null>(null);
  const startY = useRef(0);
  const horizontal = useRef(false);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if ((e.target as HTMLElement).closest(INTERACTIVE)) return; // let controls work
    startX.current = e.clientX;
    startY.current = e.clientY;
    horizontal.current = false;
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;
    if (!horizontal.current) {
      if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) horizontal.current = true;
      else if (Math.abs(dy) > 10) startX.current = null; // vertical → hand back to scroll
    }
  };
  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    if (horizontal.current && Math.abs(dx) > SWIPE_THRESHOLD) step(dx < 0 ? 1 : -1);
    startX.current = null;
    horizontal.current = false;
  };

  // ── Horizontal trackpad swipe (deltaX) — non-passive so we can stop the ───
  //    browser's back/forward gesture. Vertical wheel is left untouched.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let locked = false;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // vertical → page scrolls
      e.preventDefault();
      if (locked) return;
      locked = true;
      window.setTimeout(() => (locked = false), WHEEL_COOLDOWN);
      step(e.deltaX > 0 ? 1 : -1);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [step]);

  const active = BUILT[index];
  const atStart = index === 0;
  const atEnd = index === total - 1;

  return (
    <div className="relative">
      <LensLabIntro />

      <section
        aria-roledescription="carousel"
        aria-label="Discover your lens — interactive exhibits"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative isolate flex h-[85svh] flex-col overflow-hidden bg-paper outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-royal/40"
      >
        {/* ── Sliding track ─────────────────────────────────────────────── */}
        <div
          ref={viewportRef}
          className="relative min-h-0 flex-1 overflow-hidden"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            className={cn(
              "flex h-full w-full",
              reduce ? "" : "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            )}
            style={{
              transform: `translate3d(-${index * 100}%, 0, 0)`,
              touchAction: "pan-y",
              willChange: "transform",
            }}
          >
            {BUILT.map(({ id, name, Component }, i) => (
              <div
                key={id}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${total}: ${name} lenses`}
                aria-hidden={i !== index}
                className="h-full w-full shrink-0 overflow-y-auto overscroll-contain"
              >
                <Component />
              </div>
            ))}
          </div>

          {/* ── Prev / Next arrows (pointer devices; swipe covers touch) ──── */}
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={atStart}
            aria-label="Previous lens"
            className={cn(
              "group absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-paper-bright/80 p-2.5 text-ink shadow-[0_10px_30px_-16px_rgba(34,29,20,0.6)] backdrop-blur-sm transition sm:flex lg:left-6",
              "hover:border-royal/40 hover:text-royal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
              atStart ? "pointer-events-none opacity-0" : "opacity-100",
            )}
          >
            <Chevron className="h-5 w-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={atEnd}
            aria-label="Next lens"
            className={cn(
              "group absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-paper-bright/80 p-2.5 text-ink shadow-[0_10px_30px_-16px_rgba(34,29,20,0.6)] backdrop-blur-sm transition sm:flex lg:right-6",
              "hover:border-royal/40 hover:text-royal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
              atEnd ? "pointer-events-none opacity-0" : "opacity-100",
            )}
          >
            <Chevron className="h-5 w-5" />
          </button>
        </div>

        {/* ── Bottom bar: position indicator + skip link ─────────────────── */}
        <div className="relative z-10 border-t border-line/70 bg-paper/85 backdrop-blur-sm">
          <Container className="flex items-center justify-between gap-4 py-3.5 sm:py-4">
            {/* position dots + counter */}
            <div className="flex items-center gap-3">
              <ul className="flex items-center gap-2">
                {BUILT.map((b, i) => (
                  <li key={b.id}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Go to ${b.name} lens`}
                      className="group flex h-5 w-5 items-center justify-center"
                    >
                      <span
                        className={cn(
                          "block rounded-full transition-all duration-300 ease-out",
                          i === index
                            ? "h-2.5 w-6 bg-champagne"
                            : "h-2 w-2 border border-ink/40 group-hover:border-ink",
                        )}
                      />
                    </button>
                  </li>
                ))}
              </ul>
              <p
                aria-live="polite"
                className="hidden font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted sm:block"
              >
                <span className="text-ink">{index + 1}</span>
                <span className="text-muted-light"> of {total}</span>
                <span className="mx-2 text-champagne/60" aria-hidden>
                  —
                </span>
                <span className="text-ink">{active.name} Lenses</span>
              </p>
            </div>

            {/* skip to next section */}
            <a
              href="#frames"
              className="link-quiet inline-flex items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-royal"
            >
              Skip to next section
              <span aria-hidden>↓</span>
            </a>
          </Container>
        </div>
      </section>

      <LensLabOutro />
    </div>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
