/**
 * LensLab — "Discover Your Lens" (Homepage Section 5).
 *
 * Brand-approved copy for the six lens "exhibits". The cinematic scroll-through
 * gives each lens its own full-viewport moment, educating before it sells
 * (Constitution Law 2). Copy is honest and benefit-led — never exaggerated.
 *
 * Each exhibit's left side follows one scannable pattern:
 *   icon + LABEL (+ badge)  →  problem-naming headline  →  solution line  →
 *   body  →  "best for" line. So a quick glance reads the problem and the fix
 *   before any animation is even watched.
 *
 * `tone` is a deliberately subtle, WARM/LIGHT scene tint unique to each exhibit
 * (a whisper of colour over the warm paper canvas) — the page background must
 * always stay warm and light; only the animation elements carry real colour.
 */

export type LensLabId =
  | "blue-cut"
  | "progressive"
  | "photochromic"
  | "high-index"
  | "anti-glare"
  | "polarised";

/** Keys into the exhibit icon set (mapped to components in ExhibitShell). */
export type ExhibitIconKey =
  | "screen"
  | "lens"
  | "sun"
  | "feather"
  | "glare"
  | "wave";

export type LensLabExhibit = {
  id: LensLabId;
  /** Two-digit index — used by the nav dots, not shown in the label. */
  index: string;
  /** Short name; the label renders as `${name} LENSES`. */
  name: string;
  /** Small icon shown beside the label. */
  icon: ExhibitIconKey;
  /** Problem-naming headline (Fraunces, large). */
  headline: string;
  /** One-line solution beneath the headline (Fraunces, smaller, royal). */
  solution: string;
  body: string;
  /**
   * A shorter body shown only on phones (<768px), so each exhibit fits within
   * one slide with no internal scroll — even on short viewports (iPhone SE).
   * Tablet and desktop use the fuller `body` above.
   */
  bodyMobile: string;
  /** The "Best for" line (champagne, italic). */
  bestFor: string;
  /** Optional small badge, e.g. "Most popular". */
  badge?: string;
  /** Subtle warm/light scene background for this exhibit's panel. */
  tone: string;
};

export const lensLabExhibits: LensLabExhibit[] = [
  {
    id: "blue-cut",
    index: "01",
    name: "Blue Cut",
    icon: "screen",
    headline: "Your screens are straining your eyes.",
    solution: "Blue cut lenses fix that.",
    body: "Phones, laptops and screens emit blue light continuously. Blue cut lenses filter a portion of it before it reaches your eyes, reducing strain during long hours on screens.",
    bodyMobile: "Screens emit blue light all day. Blue cut lenses filter part of it, easing strain through long screen hours.",
    bestFor: "You work on screens for 4+ hours a day.",
    badge: "Most popular",
    tone: "radial-gradient(115% 120% at 80% 26%, rgba(111,134,224,0.12), transparent 56%), linear-gradient(165deg, var(--color-paper-bright), var(--color-paper) 70%)",
  },
  {
    id: "progressive",
    index: "02",
    name: "Progressive",
    icon: "lens",
    headline: "Reading glasses on, then off, all day.",
    solution: "Progressive lenses end the swap.",
    body: "Progressive lenses contain three vision zones blended seamlessly: distance at the top, computer in the middle, reading at the bottom. No visible line. No switching glasses.",
    bodyMobile: "Three vision zones in one lens, distance, computer and reading, blended with no visible line. No swapping glasses.",
    bestFor: "You're 40+ and tired of carrying multiple pairs.",
    tone: "radial-gradient(115% 120% at 80% 26%, rgba(198,161,91,0.14), transparent 56%), linear-gradient(165deg, var(--color-paper-bright), var(--color-paper) 70%)",
  },
  {
    id: "photochromic",
    index: "03",
    name: "Photochromic",
    icon: "sun",
    headline: "Indoors you're fine. Outdoors you squint.",
    solution: "Photochromic lenses adapt for you.",
    body: "Photochromic lenses are clear indoors and automatically darken in sunlight. Step outside and they adapt. Come back in and they clear. One pair, all day.",
    bodyMobile: "Clear indoors, darkening automatically in sunlight, then clear again as you step back in. One pair, all day.",
    bestFor: "You move between indoors and outdoors frequently.",
    tone: "radial-gradient(120% 120% at 78% 24%, rgba(227,207,159,0.30), transparent 58%), linear-gradient(165deg, var(--color-paper-bright), var(--color-paper-dim) 78%)",
  },
  {
    id: "high-index",
    index: "04",
    name: "High Index Thin",
    icon: "feather",
    headline: "Strong prescriptions get thick and heavy.",
    solution: "High index lenses stay slim.",
    body: "Higher prescriptions traditionally meant thick, heavy lenses. High index lenses bend light more efficiently, giving you the same sharp vision in a lens that's noticeably thinner, lighter and far more comfortable.",
    bodyMobile: "Strong prescriptions once meant thick, heavy lenses. High index lenses bend light more efficiently. Same sharp vision, noticeably thinner and lighter.",
    bestFor: "Your prescription is above ±3.00 and your lenses feel thick.",
    tone: "radial-gradient(115% 120% at 80% 26%, rgba(30,42,120,0.08), transparent 56%), linear-gradient(165deg, var(--color-paper-bright), var(--color-paper) 72%)",
  },
  {
    id: "anti-glare",
    index: "05",
    name: "Anti Glare",
    icon: "glare",
    headline: "Bright lights bounce back as glare.",
    solution: "Anti glare coating clears it.",
    body: "Anti glare coating eliminates reflections from screens, headlights and bright lights. You see more comfortably, and people see your eyes, not the glare on your lenses.",
    bodyMobile: "A coating that clears reflections from screens, headlights and bright lights so you see comfortably, and people see your eyes.",
    bestFor: "You drive at night or spend long hours under bright lighting.",
    tone: "radial-gradient(115% 120% at 80% 26%, rgba(30,42,120,0.10), transparent 56%), linear-gradient(165deg, var(--color-paper-bright), var(--color-paper) 72%)",
  },
  {
    id: "polarised",
    index: "06",
    name: "Polarised",
    icon: "wave",
    headline: "On roads and water, glare takes over.",
    solution: "Polarised lenses cut it out.",
    body: "Polarised lenses block the harsh horizontal glare that bounces off roads, water and wet surfaces. Colours look truer, contrast improves, and your eyes stay relaxed even in bright sun.",
    bodyMobile: "It blocks the harsh glare bouncing off roads and water. Colours look truer and your eyes stay relaxed in bright sun.",
    bestFor: "You drive long distances or spend time outdoors near water.",
    tone: "radial-gradient(120% 120% at 78% 24%, rgba(111,134,224,0.16), transparent 58%), linear-gradient(165deg, var(--color-paper-bright), var(--color-paper) 72%)",
  },
];

export function getExhibit(id: LensLabId): LensLabExhibit {
  const found = lensLabExhibits.find((e) => e.id === id);
  if (!found) throw new Error(`Unknown LensLab exhibit: ${id}`);
  return found;
}
