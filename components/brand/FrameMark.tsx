import { cn } from "@/lib/utils";

type FrameMarkProps = {
  /** "duo" = signature red/royal split · "mono" = single colour (currentColor) */
  variant?: "duo" | "mono";
  /** draw the frame on with a stroke animation (used in the hero) */
  animated?: boolean;
  className?: string;
  title?: string;
  strokeWidth?: number;
};

/**
 * The Ami Optics signature: a wayfarer spectacle frame, split red / royal
 * blue — the heart of the real shop logo, rebuilt as crisp vector line-art.
 * Used as the brand icon, in the nav, footer, loaders and as a viewfinder
 * motif throughout the site.
 */
export function FrameMark({
  variant = "duo",
  animated = false,
  className,
  title,
  strokeWidth = 6,
}: FrameMarkProps) {
  const left = variant === "duo" ? "var(--color-spark)" : "currentColor";
  const right = variant === "duo" ? "var(--color-royal)" : "currentColor";
  const pl = animated ? 1 : undefined;

  return (
    <svg
      viewBox="0 0 240 96"
      fill="none"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn("block", className)}
    >
      {title ? <title>{title}</title> : null}
      <g
        className={animated ? "frame-animated" : undefined}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        {/* left lens */}
        <path
          pathLength={pl}
          d="M20 30c0-7 5-11 13-11h40c9 0 14 5 13 14l-2 20c-1 9-7 14-17 14H38c-10 0-17-6-18-16l-0-15Z"
          stroke={left}
        />
        {/* right lens */}
        <path
          pathLength={pl}
          d="M154 30c0-7 5-11 13-11h40c9 0 14 5 13 14l-2 20c-1 9-7 14-17 14h-31c-10 0-17-6-18-16l-0-15Z"
          stroke={right}
        />
        {/* bridge */}
        <path pathLength={pl} d="M99 26c8-5 34-5 42 0" stroke={right} />
        {/* temples */}
        <path pathLength={pl} d="M16 26 4 21" stroke={left} />
        <path pathLength={pl} d="M224 26l12-5" stroke={right} />
      </g>
    </svg>
  );
}
