"use client";

import { cn } from "@/lib/utils";

type ToggleProps = {
  /** Whether the toggle is in its ON state. */
  on: boolean;
  onChange: (next: boolean) => void;
  /** Short noun for the thing being toggled, e.g. "Blue-Cut". */
  label: string;
  /** Accessible description appended for screen readers. */
  describedBy?: string;
  className?: string;
};

/**
 * Large, touch-friendly ON/OFF switch shared by the lens exhibits whose
 * demonstration is a before/after comparison (Blue-Cut, Anti-Glare, Polarised).
 *
 * Accessibility: a real <button role="switch"> — Space/Enter toggle it for free,
 * aria-checked exposes state, and the visible "ON / OFF" word never relies on
 * colour alone. The hit area is comfortably above 44px for touch.
 */
export function Toggle({ on, onChange, label, describedBy, className }: ToggleProps) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <span className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-describedby={describedBy}
        aria-label={`${label}: currently ${on ? "on" : "off"}`}
        onClick={() => onChange(!on)}
        className={cn(
          "group relative inline-flex h-11 w-[5.5rem] shrink-0 items-center rounded-full px-1.5",
          "ring-1 transition-colors duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
          on
            ? "bg-royal/12 ring-royal/35"
            : "bg-ink/[0.06] ring-line-strong",
        )}
      >
        {/* state word */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute font-mono text-[0.6rem] font-semibold uppercase tracking-[0.16em] transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            on
              ? "left-3.5 text-royal opacity-100"
              : "right-3.5 text-muted opacity-100",
          )}
        >
          {on ? "On" : "Off"}
        </span>
        {/* knob */}
        <span
          aria-hidden
          className={cn(
            "relative z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-[0_6px_16px_-6px_rgba(34,29,20,0.5)]",
            "transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            on
              ? "translate-x-[2.625rem] bg-royal"
              : "translate-x-0 bg-paper-bright ring-1 ring-line-strong",
          )}
        >
          <span
            className={cn(
              "h-2 w-2 rounded-full transition-colors duration-[600ms]",
              on ? "bg-paper-bright" : "bg-muted-light",
            )}
          />
        </span>
      </button>
    </div>
  );
}
