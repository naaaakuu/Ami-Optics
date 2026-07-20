export type TrustStat = {
  /** numeric target for the count-up */
  value: number;
  /** text shown before the number (rarely used) */
  prefix?: string;
  /** text shown after the number, e.g. "+" or "★" */
  suffix?: string;
  decimals?: number;
  /** render the raw number with no thousands separator (years) */
  raw?: boolean;
  label: string;
};

/**
 * SINGLE SOURCE OF TRUTH for the Google rating + review count.
 *
 * Everything in the UI reads from here — the hero trust line, the TrustStrip
 * counters, the stories section, the Open Graph image and the JSON-LD
 * structured data — so the numbers are changed in exactly ONE place.
 *
 * Going live later: swap these literals for a value fetched from the Google
 * Places / Business Profile API. Keep the same shape (`rating`, `count`,
 * `profileUrl`) and nothing in the UI has to change — e.g.
 *
 *   export async function getGoogleRating(): Promise<GoogleRating> {
 *     const data = await fetch(GOOGLE_PLACES_ENDPOINT).then((r) => r.json());
 *     return { rating: data.rating, count: data.user_ratings_total, profileUrl };
 *   }
 */
export type GoogleRating = {
  /** average star rating, 0–5 */
  rating: number;
  /** total number of reviews */
  count: number;
  /** public reviews / profile URL (CTAs + structured data) */
  profileUrl: string;
};

export const googleRating: GoogleRating = {
  rating: 4.9,
  count: 384,
  profileUrl: "https://maps.app.goo.gl/XXgmTza75hPfrwoT7",
};

/**
 * Headline numbers — every one of these is real (Brand Identity + reviews).
 * The Google rating + review count are derived from `googleRating` above so
 * they are never duplicated.
 */
export const trustStats: TrustStat[] = [
  { value: 1996, raw: true, label: "Serving Virar since" },
  { value: googleRating.rating, suffix: "★", decimals: 1, label: "Google rating" },
  { value: googleRating.count, suffix: "+", label: "Google reviews" },
  { value: 316, suffix: "+", label: "Eye tests each month" },
  { value: 900, suffix: "+", label: "Spectacles sold each month" },
  { value: 3, label: "Generations of family" },
];
