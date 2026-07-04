import type { LensKey } from "@/content/lenses";

type LoopOpts = { delay?: number; ease?: string; iter?: string; dir?: string };

const loop = (
  name: string,
  dur: number,
  { delay = 0, ease = "ease-in-out", iter = "infinite", dir = "" }: LoopOpts = {},
): React.CSSProperties => ({
  animation: `${name} ${dur}s ${ease} ${iter} ${dir}`.trim(),
  animationDelay: `${delay}s`,
});

/** Self-contained SVG demonstrations for each lens type (dark background). */
export function LensDemo({ lens }: { lens: LensKey }) {
  if (lens === "blue-cut") {
    const rays = [78, 96, 114, 132];
    return (
      <Frame label="Blue light, filtered before it reaches you">
        {/* screen */}
        <rect x="20" y="78" width="62" height="48" rx="3" className="stroke-paper/40" fill="none" />
        <path d="M44 126v8M38 134h26" className="stroke-paper/40" />
        {/* lens */}
        <rect x="168" y="36" width="26" height="128" rx="13" className="stroke-paper" fill="rgba(111,134,224,0.08)" />
        {/* incoming blue rays */}
        {rays.map((y, i) => (
          <g key={y} style={loop("ray", 2.6, { delay: i * 0.4, ease: "linear" })}>
            <circle cx="180" cy={y} r="3.4" fill="var(--color-azure)" />
          </g>
        ))}
        {/* filtered/safe light continuing to the eye */}
        {[92, 118].map((y, i) => (
          <g key={y} style={loop("ray-safe", 2.6, { delay: 0.7 + i * 0.5, ease: "linear" })}>
            <circle cx="196" cy={y} r="3" fill="var(--color-champagne-soft)" />
          </g>
        ))}
        {/* eye */}
        <path d="M300 100s10-14 24-14 24 14 24 14-10 14-24 14-24-14-24-14Z" className="stroke-paper" fill="none" />
        <circle cx="324" cy="100" r="6" className="stroke-paper" fill="none" />
      </Frame>
    );
  }

  if (lens === "progressive") {
    const zones = [
      { y: 56, label: "FAR", glyph: "M150 64l10-12 10 12 8-8 8 8" },
      { y: 104, label: "SCREEN", glyph: "M150 96h36v20h-36zM164 116v6M156 122h16" },
      { y: 152, label: "NEAR", glyph: "M150 146c8-4 16-4 18 0v16c-2-4-10-4-18 0zM168 146c8-4 16-4 18 0v16c-2-4-10-4-18 0z" },
    ];
    return (
      <Frame label="One lens — near, middle and distance, in focus">
        <rect x="120" y="26" width="128" height="168" rx="64" className="stroke-paper" fill="rgba(255,255,255,0.03)" />
        {zones.map((z, i) => (
          <g key={z.label} style={loop("zone", 3.6, { delay: i * 0.9 })}>
            <path d={z.glyph} className="stroke-champagne-soft" fill="none" />
            <text x="262" y={z.y + 30} className="fill-paper/55" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="2">
              {z.label}
            </text>
          </g>
        ))}
        <path d="M132 96h104M132 146h104" className="stroke-paper/15" strokeDasharray="3 5" />
      </Frame>
    );
  }

  if (lens === "photochromic") {
    return (
      <Frame label="Clear indoors → darkens in sunlight">
        <circle cx="184" cy="110" r="74" className="stroke-paper" fill="rgba(255,255,255,0.04)" />
        <circle cx="184" cy="110" r="74" fill="var(--color-ink)" style={loop("tint", 3.4, { dir: "alternate" })} />
        <circle cx="184" cy="110" r="74" className="stroke-paper/60" fill="none" />
        {/* sun */}
        <g className="text-champagne" style={loop("float-soft", 5)}>
          <circle cx="300" cy="58" r="14" fill="var(--color-champagne)" />
          <path d="M300 34v8M300 74v8M276 58h8M316 58h8M283 41l5 5M312 65l5 5M283 75l5-5M312 51l5-5" className="stroke-champagne" />
        </g>
      </Frame>
    );
  }

  // high-index
  return (
    <Frame label="Same power — thinner, lighter lens">
      {/* standard, thick */}
      <g style={loop("fade-a", 3.6)}>
        <path d="M150 50c30 12 30 108 0 120 24-6 60-6 84 0 -30-12-30-108 0-120-24 6-60 6-84 0Z" className="stroke-paper/70" fill="rgba(255,255,255,0.04)" />
        <text x="184" y="206" textAnchor="middle" className="fill-paper/55" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="2">STANDARD</text>
      </g>
      {/* high-index, thin */}
      <g style={loop("fade-b", 3.6)}>
        <path d="M168 54c14 10 14 102 0 112 16-4 32-4 48 0 -14-10-14-102 0-112-16 4-32 4-48 0Z" className="stroke-champagne-soft" fill="rgba(198,161,91,0.08)" />
        <text x="192" y="206" textAnchor="middle" className="fill-champagne-soft" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="2">HIGH‑INDEX</text>
      </g>
    </Frame>
  );
}

function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <figure className="flex flex-col gap-4">
      <svg viewBox="0 0 372 220" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-full" role="img" aria-label={label}>
        {children}
      </svg>
      <figcaption className="text-center font-mono text-[0.7rem] uppercase tracking-[0.18em] text-paper/50">
        {label}
      </figcaption>
    </figure>
  );
}
