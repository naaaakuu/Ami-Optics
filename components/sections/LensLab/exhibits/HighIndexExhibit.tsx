"use client";

import { useState } from "react";
import { ExhibitShell } from "@/components/sections/LensLab/ExhibitShell";
import { Slider } from "@/components/sections/LensLab/controls/Slider";
import { getExhibit } from "@/content/lensLab";

/**
 * Exhibit 04 — High-Index Thin.
 *
 * Two lens cross-sections, same prescription. As the power slider climbs, the
 * standard lens swells thick and heavy while the high-index lens stays slim —
 * the gap between them widening dramatically, with live edge-thickness numbers.
 *
 * SVG whose paths recompute from the slider value (no canvas, no rAF). The
 * slider is keyboard accessible; the numbers carry the message without relying
 * on the drawing, so it reads under reduced motion too.
 */

const exhibit = getExhibit("high-index");

const PX_PER_MM = 6;
const CENTER_MM = 0.8;

// Edge thickness (mm) as the minus power grows — standard climbs ~2.3× faster.
const standardEdge = (power: number) => 0.2 + 1.0 * power;
const highEdge = (power: number) => 0.5 + 0.45 * power;

/** Vertical cross-section of a minus lens: thick edges, pinched thin centre. */
function crossSection(cx: number, topY: number, h: number, edgeMm: number) {
  const halfEdge = (edgeMm * PX_PER_MM) / 2;
  const halfCenter = (CENTER_MM * PX_PER_MM) / 2;
  const midY = topY + h / 2;
  const botY = topY + h;
  return [
    `M${cx - halfEdge} ${topY}`,
    `Q${cx - halfCenter} ${midY} ${cx - halfEdge} ${botY}`,
    `L${cx + halfEdge} ${botY}`,
    `Q${cx + halfCenter} ${midY} ${cx + halfEdge} ${topY}`,
    "Z",
  ].join(" ");
}

export function HighIndexExhibit() {
  const [power, setPower] = useState(4); // |dioptres|, 1–8

  const stdMm = standardEdge(power);
  const hiMm = highEdge(power);
  const thinner = Math.round((1 - hiMm / stdMm) * 100);

  return (
    <ExhibitShell exhibit={exhibit}>
      <figure className="flex flex-col gap-3 sm:gap-4 lg:h-full lg:justify-center">
        <div className="relative flex h-[44svh] min-h-[240px] w-full flex-col justify-center gap-3 overflow-hidden rounded-[1.75rem] bg-paper-bright/55 px-5 py-5 ring-1 ring-line shadow-[0_30px_80px_-52px_rgba(34,29,20,0.55)] lg:h-auto lg:min-h-0 lg:max-h-[600px] lg:flex-1">
          {/* column headers */}
          <div className="grid grid-cols-2 text-center">
            <span className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-muted">
              Standard
            </span>
            <span className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-royal">
              High-Index
            </span>
          </div>

          {/* cross-sections — SVG fills a real box (an inline svg can't size from
              flex-1 alone and would collapse to zero height) */}
          <div className="relative min-h-0 flex-1">
            <svg
              viewBox="0 0 360 210"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 h-full w-full"
              fill="none"
              role="img"
              aria-label={`At ${power.toFixed(
                2,
              )} dioptres, a standard lens edge is about ${stdMm.toFixed(
                1,
              )} millimetres versus ${hiMm.toFixed(1)} for high-index.`}
            >
              {/* centre guide */}
              <path d="M180 18v174" className="stroke-line-strong" strokeWidth={1} strokeDasharray="3 6" />
              {/* standard */}
              <path
                d={crossSection(100, 25, 160, stdMm)}
                className="fill-paper-dim stroke-muted [transition:d_0.18s_ease-out]"
                strokeWidth={2}
                strokeLinejoin="round"
              />
              {/* high-index */}
              <path
                d={crossSection(260, 25, 160, hiMm)}
                className="fill-royal/15 stroke-royal [transition:d_0.18s_ease-out]"
                strokeWidth={2}
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* readouts */}
          <div className="grid grid-cols-2 text-center">
            <div>
              <div className="font-display text-2xl font-medium text-ink tabular-nums">
                {stdMm.toFixed(1)}<span className="text-base text-muted-light"> mm</span>
              </div>
              <div className="mt-0.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-muted-light">
                Thicker · heavier
              </div>
            </div>
            <div>
              <div className="font-display text-2xl font-medium text-royal tabular-nums">
                {hiMm.toFixed(1)}<span className="text-base text-muted-light"> mm</span>
              </div>
              <div className="mt-0.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-royal/70">
                Slimmer · lighter
              </div>
            </div>
          </div>

          {/* headline comparison */}
          <div className="absolute right-4 top-4 rounded-full bg-royal/10 px-3 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-royal ring-1 ring-royal/20">
            {thinner}% thinner
          </div>
        </div>

        <Slider
          label="Prescription power"
          ariaValueText={`minus ${power.toFixed(2)} dioptres`}
          value={power}
          min={1}
          max={8}
          step={0.5}
          onChange={setPower}
          leftLabel={<>−1.00 · mild</>}
          rightLabel={<>strong · −8.00</>}
        />
      </figure>
    </ExhibitShell>
  );
}
