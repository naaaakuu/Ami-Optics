export type FrameCategory = {
  /** Display name — Fraunces serif on the card. */
  name: string;
  /** One-line description — Inter, under the name. */
  note: string;
  /** Product photograph in /public/images/products (exact filename, .PNG). */
  image: string;
  /** Descriptive alt text for the product photograph. */
  alt: string;
  /** Two-to-three benefit tags shown in the gallery's detail panel. */
  tags: string[];
};

/**
 * The eight frame families shown in the homepage Frames Explorer, each paired
 * with its product photograph. Order and copy are intentional — every entry
 * maps 1:1 to a file in /public/images/products. Keep the .PNG case exactly:
 * the dev server and production build (Linux) are case-sensitive.
 */
export const frameCategories: FrameCategory[] = [
  {
    name: "Metal",
    note: "Lightweight, classic, quietly durable.",
    image: "/images/products/frame-metal.PNG",
    alt: "Metal spectacle frames — lightweight, classic and quietly durable.",
    tags: ["Lightweight", "Durable", "Everyday classic"],
  },
  {
    name: "Sheet / Acetate",
    note: "Bold colour and real character.",
    image: "/images/products/frame-sheet.PNG",
    alt: "Sheet acetate spectacle frames — bold colour and real character.",
    tags: ["Bold colour", "Expressive", "Sturdy"],
  },
  {
    name: "Rimless",
    note: "Barely-there and featherlight.",
    image: "/images/products/frame-rimless.PNG",
    alt: "Rimless spectacles — barely-there and featherlight.",
    tags: ["Featherlight", "Minimal", "Barely visible"],
  },
  {
    name: "Half-Rim",
    note: "Structure on top, open below.",
    image: "/images/products/frame-half-rim.PNG",
    alt: "Half-rim spectacle frames — structured on top, open below.",
    tags: ["Balanced", "Professional", "Light on the face"],
  },
  {
    name: "Titanium",
    note: "Premium strength, almost no weight.",
    image: "/images/products/frame-titan.PNG",
    alt: "Titanium spectacle frames — premium strength with almost no weight.",
    tags: ["Ultra-strong", "Featherweight", "Skin-friendly"],
  },
  {
    name: "Gold Finish",
    note: "Warmth and elegance in every detail.",
    image: "/images/products/frame-gold.PNG",
    alt: "Gold-finish spectacle frames — warmth and elegance in every detail.",
    tags: ["Elegant", "Timeless", "Occasion-ready"],
  },
  {
    name: "Magnetic Clip-On",
    note: "One frame, two looks — indoor and sun.",
    image: "/images/products/frame-clip-o.PNG",
    alt: "Magnetic clip-on spectacle frames — one frame for indoor and sun.",
    tags: ["Two looks in one", "Sun-ready", "Convenient"],
  },
  {
    name: "Smart Glasses",
    note: "Connected, comfortable, forward-thinking.",
    image: "/images/products/frame-smart.PNG",
    alt: "Smart glasses — connected, comfortable and forward-thinking.",
    tags: ["Connected", "Audio built in", "Forward-thinking"],
  },
];
