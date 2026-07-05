"use client";

import { useEffect, useRef, useState } from "react";
import { ExhibitShell } from "@/components/sections/LensLab/ExhibitShell";
import { Toggle } from "@/components/sections/LensLab/controls/Toggle";
import { getExhibit } from "@/content/lensLab";

/**
 * Exhibit 01 — Blue-Cut.
 *
 * A Canvas 2D particle system: a screen on the left streams light particles
 * toward an eye on the right. Blue particles (harmful) and warm particles (safe)
 * flow together. A lens sits between them.
 *   • Blue-Cut ON  → warm light passes through; blue light is filtered out at the
 *                    lens (it slows, fades and never reaches the eye, which glows
 *                    calm and warm). The lens shimmers blue as it works.
 *   • Blue-Cut OFF → everything reaches the eye, which takes on a strained red glow.
 *
 * Performance: requestAnimationFrame, particle count capped on small screens,
 * the loop is lazily started and paused via IntersectionObserver so nothing runs
 * off-screen. Under prefers-reduced-motion the canvas renders a single static
 * "before/after" frame and the toggle simply redraws it — no animation.
 */

const exhibit = getExhibit("blue-cut");

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** true = blue (harmful), false = warm (safe). */
  blue: boolean;
  alpha: number;
};

function readVar(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

export function BlueCutExhibit() {
  const [on, setOn] = useState(true);
  const onRef = useRef(on);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const redrawStaticRef = useRef<(() => void) | null>(null);
  const reduceRef = useRef(false);

  useEffect(() => {
    onRef.current = on;
    // Under reduced motion the loop never runs, so nudge a fresh static frame.
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
      blue: readVar("--color-azure", "#6f86e0"),
      warm: readVar("--color-champagne-soft", "#e3cf9f"),
      royal: readVar("--color-royal", "#1e2a78"),
      champagne: readVar("--color-champagne", "#c6a15b"),
      ink: readVar("--color-ink", "#16120b"),
      strain: readVar("--color-spark", "#e1251b"),
    };

    let W = 0;
    let H = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let filter = onRef.current ? 1 : 0; // 0 = OFF, 1 = ON, eased toward target
    let shimmer = 0; // lens glow accumulator while filtering blue
    let t = 0;
    let raf = 0;
    let running = false;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    // Scene geometry derived from the current canvas size (recomputed per frame
    // so resize needs no special handling).
    const geo = () => {
      const screenW = Math.min(Math.max(W * 0.16, 60), 120);
      const screenH = screenW * 0.64;
      return {
        sCx: W * 0.12,
        sCy: H * 0.5,
        screenW,
        screenH,
        lensCx: W * 0.6,
        lensCy: H * 0.5,
        lensRx: Math.min(Math.max(W * 0.045, 22), 40),
        lensRy: Math.min(Math.max(H * 0.34, 86), 240),
        eyeCx: W * 0.87,
        eyeCy: H * 0.5,
        eyeW: Math.min(Math.max(W * 0.14, 54), 120),
      };
    };

    const count = () => (W < 768 ? 70 : 110);

    const spawn = (initial: boolean): Particle => {
      const g = geo();
      const blue = Math.random() < 0.56;
      const startX = g.sCx + g.screenW * 0.5;
      // On init, populate the field; keep blue particles before the lens so the
      // ON state never shows "leaked" blue light on the very first frame.
      const x = initial
        ? blue
          ? rand(startX, g.lensCx - g.lensRx)
          : rand(startX, W)
        : startX;
      return {
        x,
        y: g.sCy + rand(-g.screenH * 0.42, g.screenH * 0.42),
        vx: W * rand(0.0026, 0.0038),
        vy: rand(-0.18, 0.18),
        r: rand(2.6, 4.6) * (W < 768 ? 0.85 : 1),
        blue,
        alpha: 1,
      };
    };

    const build = () => {
      particles = Array.from({ length: count() }, () => spawn(true));
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particles.length !== count()) build();
    };

    const dot = (p: Particle) => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
      ctx.shadowBlur = (W < 768 ? 6 : 10) * p.r * 0.32;
      ctx.shadowColor = p.blue ? COLORS.blue : COLORS.warm;
      ctx.fillStyle = p.blue ? COLORS.blue : COLORS.warm;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawScreen = (g: ReturnType<typeof geo>) => {
      const x = g.sCx - g.screenW / 2;
      const y = g.sCy - g.screenH / 2;
      ctx.save();
      // soft emission glow
      const glow = ctx.createRadialGradient(g.sCx, g.sCy, 2, g.sCx, g.sCy, g.screenW);
      glow.addColorStop(0, withAlpha(COLORS.royal, 0.12));
      glow.addColorStop(1, withAlpha(COLORS.royal, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(x - g.screenW * 0.4, y - g.screenH * 0.4, g.screenW * 1.8, g.screenH * 1.8);
      // screen body
      roundRect(ctx, x, y, g.screenW, g.screenH, 6);
      ctx.fillStyle = withAlpha(COLORS.royal, 0.07);
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = withAlpha(COLORS.royal, 0.55);
      ctx.stroke();
      // stand
      ctx.beginPath();
      ctx.moveTo(g.sCx, y + g.screenH);
      ctx.lineTo(g.sCx, y + g.screenH + g.screenH * 0.16);
      ctx.moveTo(g.sCx - g.screenW * 0.18, y + g.screenH + g.screenH * 0.16);
      ctx.lineTo(g.sCx + g.screenW * 0.18, y + g.screenH + g.screenH * 0.16);
      ctx.stroke();
      ctx.restore();
    };

    const drawLens = (g: ReturnType<typeof geo>) => {
      ctx.save();
      // glass fill
      ctx.beginPath();
      ctx.ellipse(g.lensCx, g.lensCy, g.lensRx, g.lensRy, 0, 0, Math.PI * 2);
      ctx.fillStyle = withAlpha(COLORS.royal, 0.06);
      ctx.fill();
      // blue shimmer while actively filtering
      const shimAlpha = Math.min(0.5, shimmer) * filter;
      if (shimAlpha > 0.001) {
        ctx.shadowBlur = 18;
        ctx.shadowColor = COLORS.blue;
        ctx.fillStyle = withAlpha(COLORS.blue, shimAlpha * 0.4);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      // rim
      ctx.lineWidth = 2;
      ctx.strokeStyle = withAlpha(COLORS.royal, 0.75);
      ctx.stroke();
      // inner highlight
      ctx.beginPath();
      ctx.ellipse(g.lensCx - g.lensRx * 0.32, g.lensCy, g.lensRx * 0.26, g.lensRy * 0.7, 0, 0, Math.PI * 2);
      ctx.strokeStyle = withAlpha(COLORS.royal, 0.18 + shimAlpha);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    };

    const drawEye = (g: ReturnType<typeof geo>) => {
      const eyeH = g.eyeW * 0.6;
      // glow behind the eye: warm (calm) when ON, red (strained) when OFF
      const pulse = 0.5 + 0.5 * Math.sin(t * 2.1);
      ctx.save();
      const warmA = 0.22 * filter;
      const strainA = (0.26 + 0.16 * pulse) * (1 - filter);
      const radius = g.eyeW * (0.95 + 0.06 * (1 - filter) * pulse);
      // warm (calm) and strain (red) glows as two passes for a clean blend
      ctx.fillStyle = radialFill(ctx, g.eyeCx, g.eyeCy, radius, COLORS.champagne, warmA);
      ctx.beginPath();
      ctx.arc(g.eyeCx, g.eyeCy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = radialFill(ctx, g.eyeCx, g.eyeCy, radius, COLORS.strain, strainA);
      ctx.beginPath();
      ctx.arc(g.eyeCx, g.eyeCy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // line-art eye
      ctx.save();
      ctx.lineWidth = 1.7;
      ctx.strokeStyle = withAlpha(COLORS.ink, 0.8);
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(g.eyeCx - g.eyeW / 2, g.eyeCy);
      ctx.quadraticCurveTo(g.eyeCx, g.eyeCy - eyeH, g.eyeCx + g.eyeW / 2, g.eyeCy);
      ctx.quadraticCurveTo(g.eyeCx, g.eyeCy + eyeH, g.eyeCx - g.eyeW / 2, g.eyeCy);
      ctx.stroke();
      // iris
      const ir = Math.min(eyeH * 0.82, g.eyeW * 0.24);
      ctx.beginPath();
      ctx.arc(g.eyeCx, g.eyeCy, ir, 0, Math.PI * 2);
      ctx.stroke();
      // pupil — warm or strained tint
      ctx.beginPath();
      ctx.arc(g.eyeCx, g.eyeCy, ir * 0.46, 0, Math.PI * 2);
      ctx.fillStyle = filter > 0.5 ? withAlpha(COLORS.royal, 0.85) : withAlpha(COLORS.strain, 0.7);
      ctx.fill();
      ctx.restore();
    };

    const step = (active: boolean) => {
      const g = geo();
      const target = onRef.current ? 1 : 0;
      filter += (target - filter) * (reduce ? 1 : 0.1);
      shimmer *= 0.9;

      ctx.clearRect(0, 0, W, H);
      drawScreen(g);

      const lensEnter = g.lensCx - g.lensRx * 1.3;
      for (const p of particles) {
        if (active) {
          p.x += p.vx;
          p.y += p.vy;
        }
        // Blue light is filtered AT the lens in proportion to how "on" we are.
        if (p.blue && p.x > lensEnter) {
          const into = Math.min(1, (p.x - lensEnter) / (g.lensCx - lensEnter));
          // decelerate and fade, scaled by the ON amount
          p.vx *= 1 - 0.05 * filter;
          p.vy += (g.lensCy - p.y) * 0.0006 * filter; // gentle nudge toward centre
          p.alpha -= filter * (0.012 + into * 0.05);
          if (filter > 0.15 && into > 0.2) shimmer += 0.006 * filter;
        }
        const offRight = p.x > W + 10;
        if (p.alpha <= 0.02 || offRight) {
          Object.assign(p, spawn(false));
        }
        dot(p);
      }

      drawLens(g);
      drawEye(g);
    };

    const loop = () => {
      t += 1 / 60;
      step(true);
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
      // Deterministic, animation-free composition for reduced motion.
      filter = onRef.current ? 1 : 0;
      shimmer = onRef.current ? 0.5 : 0;
      t = 0;
      const g = geo();
      ctx.clearRect(0, 0, W, H);
      drawScreen(g);
      const rows = 7;
      for (let i = 0; i < rows; i++) {
        const y = g.sCy + (i - (rows - 1) / 2) * (g.screenH / rows) * 0.95;
        const blue = i % 2 === 0;
        // warm always reaches the eye; blue stops at the lens when ON
        const reaches = !blue || !onRef.current;
        const x = reaches ? g.eyeCx - g.eyeW * 0.55 : g.lensCx - g.lensRx * 0.6;
        dot({ x, y, vx: 0, vy: 0, r: W < 768 ? 3.2 : 3.8, blue, alpha: blue && onRef.current ? 0.5 : 1 });
      }
      drawLens(g);
      drawEye(g);
    };
    redrawStaticRef.current = drawStatic;

    resize();
    build();

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) drawStatic();
    });
    ro.observe(container);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (reduce) {
            drawStatic();
          } else {
            start();
          }
        } else {
          stop();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(container);

    // First paint so the exhibit is never blank before it scrolls into view.
    if (reduce) drawStatic();
    else step(false);

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
          className="relative h-[38svh] min-h-[200px] w-full overflow-hidden rounded-[1.75rem] bg-paper-bright/55 ring-1 ring-line shadow-[0_30px_80px_-52px_rgba(34,29,20,0.55)] md:h-[44svh] md:min-h-[240px] lg:h-auto lg:min-h-0 lg:max-h-[600px] lg:flex-1"
        >
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={
              on
                ? "Demonstration: warm light passes through the lens to the eye while blue light is filtered out before reaching it."
                : "Demonstration: without a blue-cut lens, both warm and blue light reach the eye, which appears strained."
            }
            className="absolute inset-0 h-full w-full"
          />
        </div>

        <figcaption className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
          <span className="max-w-[18rem] text-[0.85rem] leading-snug text-muted text-pretty">
            {on
              ? "Blue light is filtered before it reaches your eyes."
              : "Without blue-cut, all light reaches your eyes."}
          </span>
          <Toggle on={on} onChange={setOn} label="Blue-Cut" />
        </figcaption>
      </figure>
    </ExhibitShell>
  );
}

/* ------------------------------------------------------------------ */
/*  Small canvas helpers                                               */
/* ------------------------------------------------------------------ */

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function radialFill(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  color: string,
  alpha: number,
): CanvasGradient {
  const grad = ctx.createRadialGradient(cx, cy, 1, cx, cy, Math.max(1, r));
  grad.addColorStop(0, withAlpha(color, alpha));
  grad.addColorStop(1, withAlpha(color, 0));
  return grad;
}

/** Apply an alpha to a #rrggbb (or already-rgba) colour string. */
function withAlpha(color: string, alpha: number): string {
  const a = Math.max(0, Math.min(1, alpha));
  if (color.startsWith("#")) {
    let hex = color.slice(1);
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    const n = parseInt(hex, 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return color;
}
