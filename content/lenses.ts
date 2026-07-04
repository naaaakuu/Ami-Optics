export type LensKey = "blue-cut" | "progressive" | "photochromic" | "high-index";

export type Lens = {
  key: LensKey;
  name: string;
  tagline: string;
  description: string;
  whoFor: string;
};

export const lenses: Lens[] = [
  {
    key: "blue-cut",
    name: "Blue‑Cut",
    tagline: "Calmer screens, all day.",
    description:
      "Filters a portion of the blue light from phones, laptops and screens before it reaches your eyes, for more comfortable long sessions.",
    whoFor: "Anyone spending long hours on digital devices.",
  },
  {
    key: "progressive",
    name: "Progressive",
    tagline: "One pair, every distance.",
    description:
      "Reading, screen and distance vision flow together in a single lens — no visible lines, no second pair to swap to.",
    whoFor: "Usually 40+, needing clear vision near, mid and far.",
  },
  {
    key: "photochromic",
    name: "Photochromic",
    tagline: "Clear indoors, shaded in sun.",
    description:
      "Stays clear inside and automatically darkens outdoors in sunlight — spectacles and sunglasses in one.",
    whoFor: "People always moving between indoors and outdoors.",
  },
  {
    key: "high-index",
    name: "High‑Index Thin",
    tagline: "Strong powers, slim lenses.",
    description:
      "Thinner, lighter lenses for higher prescriptions — the comfort and the look, without the thickness.",
    whoFor: "Higher prescriptions wanting a lighter, slimmer lens.",
  },
];
