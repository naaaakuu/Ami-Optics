"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent, type KeyboardEvent } from "react";
import { ExhibitShell } from "@/components/sections/LensLab/ExhibitShell";
import { getExhibit } from "@/content/lensLab";

/**
 * Exhibit 02 — Progressive.
 *
 * One spectacle lens, three blended vision zones. A gaze indicator slides up and
 * down the lens; whichever zone it rests in snaps into sharp focus while the
 * others soften — exactly how the eye moves through a progressive lens. Distance
 * at the top, computer in the middle, reading at the bottom. Default: computer.
 *
 * SVG + CSS only (no canvas, no rAF). The handle is a real slider for assistive
 * tech (arrow keys / Home / End), draggable by pointer for the tactile feel, and
 * each zone label is clickable. Under reduced motion the focus simply switches
 * with no transition.
 */

const exhibit = getExhibit("progressive");

const ZONES = [
  { key: "distance", label: "Distance" },
  { key: "computer", label: "Computer" },
  { key: "reading", label: "Reading" },
] as const;

export function ProgressiveExhibit() {
  const [pos, setPos] = useState(1); // 0 = distance (top) … 2 = reading (bottom)
  const trackRef = useRef<HTMLDivElement>(null);
  const active = Math.round(Math.max(0, Math.min(2, pos)));

  const setFromClientY = (clientY: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const ratio = (clientY - rect.top) / rect.height;
    setPos(Math.max(0, Math.min(2, ratio * 2)));
  };

  const onPointerDown = (e: ReactPointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientY(e.clientY);
  };
  const onPointerMove = (e: ReactPointerEvent) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) setFromClientY(e.clientY);
  };
  const onPointerUp = (e: ReactPointerEvent) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setPos(active); // settle on the nearest zone
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setPos(Math.max(0, active - 1));
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setPos(Math.min(2, active + 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPos(2);
    }
  };

  const bandStyle = (zone: number): React.CSSProperties => ({
    filter: active === zone ? "none" : "blur(2.4px)",
    opacity: active === zone ? 1 : 0.4,
    transition: "filter 0.4s var(--ease-out-quint), opacity 0.4s var(--ease-out-quint)",
  });

  return (
    <ExhibitShell exhibit={exhibit}>
      <figure className="flex flex-col gap-3 sm:gap-4 lg:h-full lg:justify-center">
        <div className="relative flex h-[38svh] min-h-[200px] w-full items-center justify-center gap-3 overflow-hidden rounded-[1.75rem] bg-paper-bright/55 px-4 ring-1 ring-line shadow-[0_30px_80px_-52px_rgba(34,29,20,0.55)] sm:gap-5 md:h-[44svh] md:min-h-[240px] lg:h-auto lg:min-h-0 lg:max-h-[600px] lg:flex-1">
          {/* gaze track + handle */}
          <div
            ref={trackRef}
            className="relative h-[74%] w-1.5 shrink-0 rounded-full bg-line-strong"
          >
            <button
              type="button"
              role="slider"
              aria-label="Gaze position"
              aria-valuemin={0}
              aria-valuemax={2}
              aria-valuenow={active}
              aria-valuetext={`${ZONES[active].label} zone`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onKeyDown={onKeyDown}
              style={{ top: `${(pos / 2) * 100}%` }}
              className="absolute left-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none items-center justify-center rounded-full bg-royal shadow-[0_6px_16px_-6px_rgba(30,42,120,0.7)] ring-4 ring-paper-bright transition-transform active:cursor-grabbing active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal"
            >
              <span aria-hidden className="h-2 w-2 rounded-full bg-paper-bright" />
            </button>
          </div>

          {/* the lens */}
          <svg
            viewBox="0 0 300 330"
            className="h-[80%] w-auto"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            role="img"
            aria-label="A single progressive lens with distance, computer and reading zones."
          >
            {/* lens body */}
            <rect x="34" y="12" width="232" height="306" rx="116" className="fill-paper-bright/70 text-royal/70" />
            {/* zone dividers */}
            <path d="M52 122h196M52 222h196" className="text-line-strong" strokeWidth={1} strokeDasharray="3 6" />

            {/* distance */}
            <g style={bandStyle(0)} className="text-ink">
              <path d="M70 78q38-30 80 0t80 0" className="text-royal" />
              <circle cx="210" cy="50" r="11" className="text-champagne" />
              <path d="M84 92h132" className="text-line-strong" />
            </g>
            {/* computer */}
            <g style={bandStyle(1)} className="text-ink">
              <rect x="116" y="150" width="68" height="44" rx="3" className="text-royal" />
              <path d="M150 165v14M138 179h24" className="text-royal" />
              <path d="M104 200h92l-7 9H111z" className="text-ink" />
            </g>
            {/* reading */}
            <g style={bandStyle(2)} className="text-ink">
              <path d="M120 252h60M120 264h60M120 276h60M120 288h40" className="text-ink" strokeWidth={2.4} />
            </g>
          </svg>

          {/* zone labels */}
          <div className="flex h-[74%] flex-col justify-between py-1">
            {ZONES.map((z, i) => {
              const isActive = active === i;
              return (
                <button
                  key={z.key}
                  type="button"
                  onClick={() => setPos(i)}
                  aria-pressed={isActive}
                  className={`text-left text-[0.7rem] font-bold uppercase tracking-[0.12em] transition-colors duration-300 sm:text-xs ${
                    isActive ? "text-champagne" : "text-muted-light hover:text-muted"
                  }`}
                >
                  {z.label}
                </button>
              );
            })}
          </div>
        </div>

        <figcaption className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2">
          <span className="text-[0.85rem] leading-snug text-muted text-pretty">
            Slide the gaze to each zone — one lens replaces three pairs.
          </span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-champagne">
            {ZONES[active].label} in focus
          </span>
        </figcaption>
      </figure>
    </ExhibitShell>
  );
}
