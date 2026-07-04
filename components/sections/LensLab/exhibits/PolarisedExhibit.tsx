"use client";

import { useEffect, useRef, useState } from "react";
import { ExhibitShell } from "@/components/sections/LensLab/ExhibitShell";
import { Toggle } from "@/components/sections/LensLab/controls/Toggle";
import { getExhibit } from "@/content/lensLab";
import { readVar, withAlpha } from "@/components/sections/LensLab/exhibits/canvasUtils";

/**
 * Exhibit 06 — Polarised.
 *
 * A bright view over water. With polarisation OFF, harsh horizontal glare smears
 * across the surface and the colours wash out; switch it ON (default) and the
 * glare is cut, the water deepens and contrast returns — like slipping on
 * sunglasses at the beach.
 *
 * Naturally bright scene (honours the warm/light colour law). Canvas 2D with
 * rAF for the glare shimmer, paused off-screen; reduced motion shows a static
 * frame the toggle redraws.
 */

const exhibit = getExhibit("polarised");

const BANDS = [0.58, 0.66, 0.73, 0.81, 0.9]; // glare streak positions (fraction of H)

export function PolarisedExhibit() {
  const [on, setOn] = useState(true);
  const onRef = useRef(on);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const redrawStaticRef = useRef<(() => void) | null>(null);
  const reduceRef = useRef(false);

  useEffect(() => {
    onRef.current = on;
    if (reduceRef.current) redrawStaticRef.current?.();
  }, [on]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reduceRef.current = reduce;

    const COLORS = {
      water: readVar("--color-azure", "#6f86e0"),
      gold: readVar("--color-champagne", "#c6a15b"),
      goldSoft: readVar("--color-champagne-soft", "#e3cf9f"),
      light: readVar("--color-paper-bright", "#fcf9f3"),
    };

    let W = 0;
    let H = 0;
    let dpr = 1;
    let filter = onRef.current ? 1 : 0; // 1 = polarised ON (glare cut)
    let t = 0;
    let raf = 0;
    let running = false;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = () => {
      const target = onRef.current ? 1 : 0;
      filter += (target - filter) * (reduce ? 1 : 0.1);
      const glare = 1 - filter;
      const hY = H * 0.46;
      const sunX = W * 0.62;

      ctx.clearRect(0, 0, W, H);

      // sky — warm, light; deepens a touch when polarised
      const sky = ctx.createLinearGradient(0, 0, 0, hY);
      sky.addColorStop(0, withAlpha(COLORS.water, 0.32 + 0.16 * filter));
      sky.addColorStop(1, withAlpha(COLORS.water, 0.06));
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, hY);

      // sun
      const sunR = Math.min(W, H) * 0.05;
      const sg = ctx.createRadialGradient(sunX, hY * 0.58, 1, sunX, hY * 0.58, sunR * 3);
      sg.addColorStop(0, withAlpha(COLORS.goldSoft, 0.9));
      sg.addColorStop(1, withAlpha(COLORS.goldSoft, 0));
      ctx.fillStyle = sg;
      ctx.beginPath();
      ctx.arc(sunX, hY * 0.58, sunR * 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = withAlpha(COLORS.gold, 0.9);
      ctx.beginPath();
      ctx.arc(sunX, hY * 0.58, sunR, 0, Math.PI * 2);
      ctx.fill();

      // water — vivid when polarised, deeper toward the bottom
      const water = ctx.createLinearGradient(0, hY, 0, H);
      water.addColorStop(0, withAlpha(COLORS.water, 0.5 + 0.2 * filter));
      water.addColorStop(1, withAlpha(COLORS.water, 0.7 + 0.25 * filter));
      ctx.fillStyle = water;
      ctx.fillRect(0, hY, W, H - hY);

      // sun reflection column on the water
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, hY, W, H - hY);
      ctx.clip();
      const refl = ctx.createLinearGradient(sunX, hY, sunX, H);
      refl.addColorStop(0, withAlpha(COLORS.goldSoft, 0.55));
      refl.addColorStop(1, withAlpha(COLORS.goldSoft, 0));
      ctx.fillStyle = refl;
      ctx.fillRect(sunX - W * 0.06, hY, W * 0.12, H - hY);

      // horizontal glare streaks — harsh when not polarised
      if (glare > 0.001) {
        for (let i = 0; i < BANDS.length; i++) {
          const y = H * BANDS[i];
          const sh = 0.75 + 0.25 * Math.sin(t * 2.2 + i);
          const h = (H * 0.012) * (1 + i * 0.25);
          ctx.fillStyle = withAlpha(COLORS.light, glare * 0.7 * sh);
          ctx.fillRect(0, y, W, h);
        }
      }
      ctx.restore();

      // washed-out veil over everything when not polarised
      if (glare > 0.001) {
        ctx.fillStyle = withAlpha(COLORS.light, glare * 0.26);
        ctx.fillRect(0, 0, W, H);
      }
    };

    const loop = () => {
      t += 1 / 60;
      render();
      if (running) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const drawStatic = () => {
      filter = onRef.current ? 1 : 0;
      t = 0;
      render();
    };
    redrawStaticRef.current = drawStatic;

    resize();

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) drawStatic();
      else render();
    });
    ro.observe(container);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (reduce) drawStatic();
          else start();
        } else {
          stop();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(container);

    if (reduce) drawStatic();
    else render();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      redrawStaticRef.current = null;
    };
  }, []);

  return (
    <ExhibitShell exhibit={exhibit}>
      <figure className="flex flex-col gap-3 sm:gap-4 lg:h-full lg:justify-center">
        <div
          ref={containerRef}
          className="relative h-[44svh] min-h-[240px] w-full overflow-hidden rounded-[1.75rem] bg-paper-bright/40 ring-1 ring-line shadow-[0_30px_80px_-52px_rgba(34,29,20,0.55)] lg:h-auto lg:min-h-0 lg:max-h-[600px] lg:flex-1"
        >
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={
              on
                ? "Demonstration: with polarised lenses, glare on the water is cut and the colours are vivid."
                : "Demonstration: without polarised lenses, harsh glare washes across the water and colours look flat."
            }
            className="absolute inset-0 h-full w-full"
          />
        </div>

        <figcaption className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
          <span className="max-w-[18rem] text-[0.85rem] leading-snug text-muted text-pretty">
            {on
              ? "Glare cut — deeper colour, calmer eyes."
              : "Harsh glare flattens the whole view."}
          </span>
          <Toggle on={on} onChange={setOn} label="Polarised" />
        </figcaption>
      </figure>
    </ExhibitShell>
  );
}
