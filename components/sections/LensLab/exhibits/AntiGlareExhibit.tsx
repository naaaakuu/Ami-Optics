"use client";

import { useEffect, useRef, useState } from "react";
import { ExhibitShell } from "@/components/sections/LensLab/ExhibitShell";
import { Toggle } from "@/components/sections/LensLab/controls/Toggle";
import { getExhibit } from "@/content/lensLab";
import { readVar, withAlpha } from "@/components/sections/LensLab/exhibits/canvasUtils";

/**
 * Exhibit 05 — Anti-Glare.
 *
 * Bright light sources reflect on a spectacle lens. With the coating OFF, each
 * light flares into a harsh starburst and reflection streaks smear the lens;
 * with it ON (default), the flares collapse into clean points and the lens is
 * clear — you see through it, and others see your eyes.
 *
 * Kept warm and light per the brand colour law (no dark night scene). Canvas 2D
 * with rAF, paused off-screen via IntersectionObserver; reduced motion renders a
 * single static frame and the toggle just redraws it.
 */

const exhibit = getExhibit("anti-glare");

const LIGHTS = [
  { fx: 0.32, fy: 0.36, s: 1 },
  { fx: 0.56, fy: 0.26, s: 1.25 },
  { fx: 0.72, fy: 0.46, s: 0.85 },
];

export function AntiGlareExhibit() {
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
      warm: readVar("--color-champagne-soft", "#e3cf9f"),
      gold: readVar("--color-champagne", "#c6a15b"),
      royal: readVar("--color-royal", "#1e2a78"),
      light: readVar("--color-paper-bright", "#fcf9f3"),
    };

    let W = 0;
    let H = 0;
    let dpr = 1;
    let filter = onRef.current ? 1 : 0; // 1 = coating ON (clean)
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

    const lens = () => ({
      cx: W * 0.52,
      cy: H * 0.52,
      rx: Math.min(W * 0.4, 260),
      ry: Math.min(H * 0.4, 230),
    });

    const drawLens = (glare: number) => {
      const L = lens();
      ctx.save();
      // glass
      ctx.beginPath();
      ctx.ellipse(L.cx, L.cy, L.rx, L.ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = withAlpha(COLORS.royal, 0.05);
      ctx.fill();
      // reflection streaks across the lens — fade out as the coating engages
      if (glare > 0.001) {
        ctx.save();
        ctx.clip();
        const sh = 0.85 + 0.15 * Math.sin(t * 2.4);
        ctx.fillStyle = withAlpha(COLORS.light, 0.5 * glare * sh);
        for (const off of [-0.4, 0.05]) {
          ctx.save();
          ctx.translate(L.cx + L.rx * off, L.cy);
          ctx.rotate(-0.62);
          ctx.fillRect(-L.rx * 0.16, -L.ry * 1.4, L.rx * 0.32, L.ry * 2.8);
          ctx.restore();
        }
        ctx.restore();
      }
      // rim
      ctx.beginPath();
      ctx.ellipse(L.cx, L.cy, L.rx, L.ry, 0, 0, Math.PI * 2);
      ctx.lineWidth = 2;
      ctx.strokeStyle = withAlpha(COLORS.royal, 0.7);
      ctx.stroke();
      ctx.restore();
    };

    const drawLight = (fx: number, fy: number, scale: number, glare: number) => {
      const x = W * fx;
      const y = H * fy;
      const base = Math.min(W, H);
      ctx.save();
      // halo + starburst grow with glare
      if (glare > 0.001) {
        const sh = 0.8 + 0.2 * Math.sin(t * 3 + fx * 6);
        const halo = base * 0.16 * scale * glare;
        const g = ctx.createRadialGradient(x, y, 1, x, y, halo);
        g.addColorStop(0, withAlpha(COLORS.gold, 0.5 * glare));
        g.addColorStop(1, withAlpha(COLORS.gold, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, halo, 0, Math.PI * 2);
        ctx.fill();
        // rays
        ctx.strokeStyle = withAlpha(COLORS.light, 0.85 * glare);
        ctx.lineWidth = 1.4;
        const rays = 10;
        const len = base * 0.11 * scale * glare * sh;
        for (let i = 0; i < rays; i++) {
          const a = (i / rays) * Math.PI * 2 + t * 0.2;
          const r0 = base * 0.012 * scale;
          ctx.beginPath();
          ctx.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0);
          ctx.lineTo(x + Math.cos(a) * (r0 + len), y + Math.sin(a) * (r0 + len));
          ctx.stroke();
        }
      }
      // clean core — always present
      ctx.shadowBlur = 10 * scale;
      ctx.shadowColor = COLORS.warm;
      ctx.fillStyle = COLORS.warm;
      ctx.beginPath();
      ctx.arc(x, y, base * 0.013 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      const target = onRef.current ? 1 : 0;
      filter += (target - filter) * (reduce ? 1 : 0.1);
      const glare = 1 - filter;
      ctx.clearRect(0, 0, W, H);
      drawLens(glare);
      for (const l of LIGHTS) drawLight(l.fx, l.fy, l.s, glare);
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
          className="relative h-[44svh] min-h-[240px] w-full overflow-hidden rounded-[1.75rem] bg-paper-bright/55 ring-1 ring-line shadow-[0_30px_80px_-52px_rgba(34,29,20,0.55)] lg:h-auto lg:min-h-0 lg:max-h-[600px] lg:flex-1"
        >
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={
              on
                ? "Demonstration: with anti-glare coating, lights are clean points and the lens is clear."
                : "Demonstration: without anti-glare coating, lights flare into starbursts and reflect across the lens."
            }
            className="absolute inset-0 h-full w-full"
          />
        </div>

        <figcaption className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
          <span className="max-w-[18rem] text-[0.85rem] leading-snug text-muted text-pretty">
            {on
              ? "Clean light, clear lens — people see your eyes."
              : "Glare and reflections sit on every lens."}
          </span>
          <Toggle on={on} onChange={setOn} label="Anti-Glare" />
        </figcaption>
      </figure>
    </ExhibitShell>
  );
}
