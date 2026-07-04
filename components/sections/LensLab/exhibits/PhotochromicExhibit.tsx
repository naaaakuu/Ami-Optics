"use client";

import { useEffect, useRef, useState } from "react";
import { ExhibitShell } from "@/components/sections/LensLab/ExhibitShell";
import { Slider } from "@/components/sections/LensLab/controls/Slider";
import { HomeIcon, SunIcon } from "@/components/brand/Icons";
import { getExhibit } from "@/content/lensLab";

/**
 * Exhibit 03 — Photochromic.
 *
 * A sun slider moves the scene from indoor to outdoor; as the light grows, the
 * lens automatically darkens (a warm tint deepens) and the surroundings brighten
 * — clear inside, shaded in sun, one pair. If the visitor doesn't touch it, the
 * slider gently demonstrates itself on a slow loop, then pauses the moment they
 * take over.
 *
 * DOM + CSS (no canvas). The loop only runs while the exhibit is on screen and
 * never under reduced motion; the slider is fully keyboard accessible.
 */

const exhibit = getExhibit("photochromic");

export function PhotochromicExhibit() {
  const [sun, setSun] = useState(0.12); // 0 = indoors/clear … 1 = full sun/tinted
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const reduceRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceRef.current) {
      setAuto(false);
      setSun(0.55); // show a representative mid state, no motion
    }
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.2,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Self-demonstration loop (indoor → outdoor → indoor), paused off-screen,
  // on interaction, or under reduced motion.
  useEffect(() => {
    if (!auto || !inView || reduceRef.current) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      const s = (Math.sin((t * Math.PI * 2) / 8 - Math.PI / 2) + 1) / 2; // 8s loop
      setSun(s);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [auto, inView]);

  const outdoors = sun > 0.5;
  const tint = sun * 0.72;

  return (
    <ExhibitShell exhibit={exhibit}>
      <figure className="flex flex-col gap-3 sm:gap-4 lg:h-full lg:justify-center">
        <div
          ref={containerRef}
          className="relative h-[44svh] min-h-[240px] w-full overflow-hidden rounded-[1.75rem] ring-1 ring-line shadow-[0_30px_80px_-52px_rgba(34,29,20,0.55)] lg:h-auto lg:min-h-0 lg:max-h-[600px] lg:flex-1"
        >
          {/* indoor scene */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-paper-bright),var(--color-paper-dim))]"
          >
            {/* window */}
            <div className="absolute left-[12%] top-[16%] h-[34%] w-[26%] rounded-md bg-paper/70 ring-1 ring-line-strong">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line-strong" />
              <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line-strong" />
            </div>
          </div>

          {/* outdoor scene — brightens in as the sun rises */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,#cfe0f2,#fdf6ea_72%)] transition-none"
            style={{ opacity: sun }}
          >
            <div className="absolute right-[14%] top-[12%] h-16 w-16 rounded-full bg-[radial-gradient(circle,var(--color-champagne-soft),var(--color-champagne)_70%)] shadow-[0_0_60px_18px_rgba(227,207,159,0.6)]" />
          </div>

          {/* the lens */}
          <div className="absolute left-1/2 top-1/2 h-[58%] w-[58%] max-w-[320px] -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 rounded-full bg-paper-bright/20 ring-2 ring-royal/70 backdrop-blur-[1px]" />
            {/* darkening tint */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: `rgba(94,74,52,${tint})` }}
            />
            {/* glass highlight */}
            <div className="absolute left-[18%] top-[14%] h-[34%] w-[22%] -rotate-12 rounded-full bg-paper-bright/30" />
          </div>

          {/* state label */}
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-paper-bright/80 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink ring-1 ring-line backdrop-blur-sm">
            <span className={`h-1.5 w-1.5 rounded-full ${outdoors ? "bg-champagne" : "bg-royal"}`} />
            {outdoors ? "Outdoors — Tinted" : "Indoors — Clear"}
          </div>
        </div>

        <Slider
          label="Sunlight level"
          ariaValueText={`${Math.round(sun * 100)} percent sunlight`}
          value={Math.round(sun * 100)}
          min={0}
          max={100}
          onChange={(v) => {
            setAuto(false);
            setSun(v / 100);
          }}
          leftLabel={
            <>
              <HomeIcon className="h-3.5 w-3.5" /> Indoors
            </>
          }
          rightLabel={
            <>
              Sun <SunIcon className="h-3.5 w-3.5" />
            </>
          }
        />
      </figure>
    </ExhibitShell>
  );
}
