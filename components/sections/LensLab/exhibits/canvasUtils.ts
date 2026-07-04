/**
 * Tiny shared helpers for the Canvas 2D lens exhibits (Anti-Glare, Polarised).
 * Kept colour-system honest: scene colours are read from the CSS design tokens
 * at runtime so the canvases never drift from the brand palette.
 */

/** Read a CSS custom property off :root, with a fallback for SSR/empty. */
export function readVar(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

/** Apply an alpha to a #rrggbb / #rgb colour (passes other formats through). */
export function withAlpha(color: string, alpha: number): string {
  const a = Math.max(0, Math.min(1, alpha));
  if (color.startsWith("#")) {
    let hex = color.slice(1);
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    const n = parseInt(hex, 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  }
  return color;
}
