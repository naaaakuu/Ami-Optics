"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SliderProps = {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (next: number) => void;
  /** Accessible name for the control. */
  label: string;
  /** Spoken value for assistive tech, e.g. "−4.00 dioptres". */
  ariaValueText?: string;
  /** Caption shown under the left end of the track. */
  leftLabel?: ReactNode;
  /** Caption shown under the right end of the track. */
  rightLabel?: ReactNode;
  className?: string;
};

/**
 * A native range input — keyboard- and touch-accessible by default — styled to
 * the brand (royal accent on a hairline track). Used by the exhibits whose
 * demonstration is a continuous comparison (Photochromic, High-Index).
 */
export function Slider({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  ariaValueText,
  leftLabel,
  rightLabel,
  className,
}: SliderProps) {
  return (
    <div className={cn("w-full", className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        aria-valuetext={ariaValueText}
        style={{ accentColor: "var(--color-royal)" }}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-line outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      />
      {(leftLabel || rightLabel) && (
        <div className="mt-2 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-light">
          <span className="inline-flex items-center gap-1.5">{leftLabel}</span>
          <span className="inline-flex items-center gap-1.5">{rightLabel}</span>
        </div>
      )}
    </div>
  );
}
