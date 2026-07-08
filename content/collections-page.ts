/**
 * Content for the /collections page: educational descriptions for the eight
 * frame families (photographed in-store — real inventory, not stock), a
 * lens-technology overview that hands off to the homepage Lens Lab, and the
 * three specialty ranges (licensed Unsplash stock, URLs verified live).
 */

export type FrameFamily = {
  name: string;
  /** One-line character note (matches the homepage gallery). */
  note: string;
  /** 2–3 sentence educational description. */
  description: string;
  /** In-store product photograph. */
  image: string;
  alt: string;
};

export const frameFamilies: FrameFamily[] = [
  {
    name: "Metal Frames",
    note: "Lightweight, classic, quietly durable.",
    description:
      "The everyday workhorse of eyewear, slim, strong and easy to wear from morning to night. Metal frames suit almost every face and adjust beautifully for a precise, comfortable fit.",
    image: "/images/products/frame-metal.PNG",
    alt: "Metal spectacle frames, lightweight, classic and quietly durable.",
  },
  {
    name: "Sheet / Acetate Frames",
    note: "Bold colour and real character.",
    description:
      "Acetate brings warmth and personality that metal can't. Rich colours, patterns and confident shapes make it a great choice when your spectacles should say something about you.",
    image: "/images/products/frame-sheet.PNG",
    alt: "Sheet acetate spectacle frames, bold colour and real character.",
  },
  {
    name: "Rimless Frames",
    note: "Barely there and featherlight.",
    description:
      "No rims, almost no weight, just your lenses held by fine temples and a bridge. Rimless frames disappear on the face, letting your features lead rather than your eyewear.",
    image: "/images/products/frame-rimless.PNG",
    alt: "Rimless spectacles, barely there and featherlight.",
  },
  {
    name: "Half Rim Frames",
    note: "Structure on top, open below.",
    description:
      "A frame along the top for definition, open below for lightness. Half rim frames strike a professional balance: structured enough for the office, light enough for all day.",
    image: "/images/products/frame-half-rim.PNG",
    alt: "Half rim spectacle frames, structured on top, open below.",
  },
  {
    name: "Titanium Frames",
    note: "Premium strength, almost no weight.",
    description:
      "Aerospace-grade metal that is remarkably strong, corrosion-resistant and kind to sensitive skin. If you want spectacles you forget you're wearing, titanium is the quiet luxury choice.",
    image: "/images/products/frame-titan.PNG",
    alt: "Titanium spectacle frames, premium strength with almost no weight.",
  },
  {
    name: "Gold Finish Frames",
    note: "Warmth and elegance in every detail.",
    description:
      "A warm gold finish elevates a simple silhouette into something special. Timeless for daily wear, and a favourite for weddings, festivals and occasions that call for a little shine.",
    image: "/images/products/frame-gold.PNG",
    alt: "Gold finish spectacle frames, warmth and elegance in every detail.",
  },
  {
    name: "Magnetic Clip On Frames",
    note: "One frame, two looks.",
    description:
      "A magnetic sun clip snaps over your prescription frame in a second. Clear indoors, shaded outdoors. One purchase, two pairs of glasses, zero fuss.",
    image: "/images/products/frame-clip-o.PNG",
    alt: "Magnetic clip on spectacle frames, one frame for indoor and sun.",
  },
  {
    name: "Smart Glasses",
    note: "Connected, comfortable, forward thinking.",
    description:
      "Eyewear with built-in audio and smart features. Take calls, listen to music and stay connected without anything in your ears. Modern technology in a frame that still looks like a frame.",
    image: "/images/products/frame-smart.PNG",
    alt: "Smart glasses, connected, comfortable and forward thinking.",
  },
];

export type LensTech = {
  name: string;
  line: string;
  /** Anchor on the homepage Lens Lab exhibit. */
  href: string;
};

export const lensTechnologies: LensTech[] = [
  { name: "Blue Cut Lenses", line: "Calmer eyes after long screen hours.", href: "/#lens-blue-cut" },
  { name: "Progressive Lenses", line: "One pair, every distance.", href: "/#lens-progressive" },
  { name: "Photochromic Lenses", line: "Clear indoors, shaded outdoors.", href: "/#lens-photochromic" },
  { name: "High Index Thin Lenses", line: "Strong prescription, slim lens.", href: "/#lens-high-index" },
  { name: "Anti Glare Lenses", line: "See clearly, be seen clearly.", href: "/#lens-anti-glare" },
  { name: "Polarised Lenses", line: "Cut the glare, keep the view.", href: "/#lens-polarised" },
];

export type SpecialtyRange = {
  name: string;
  line: string;
  description: string;
  image: { src: string; alt: string };
};

export const specialtyRanges: SpecialtyRange[] = [
  {
    name: "Kids Eyewear",
    line: "Safe, comfortable, fun for growing eyes.",
    description:
      "Flexible, durable frames sized for small faces, built to survive school days and playgrounds. We test children's eyesight too, so the whole visit happens under one roof.",
    image: {
      src: "https://images.unsplash.com/photo-1537485293242-cce66f8e09da?w=1200&q=80",
      alt: "A young girl playfully peering over the top of her eyeglasses",
    },
  },
  {
    name: "Sunglasses",
    line: "Protect your eyes while enhancing your style.",
    description:
      "UV protection that looks as good as it works. Everyday fashion pairs, kids' sunglasses and specialty options, all curated alongside our prescription eyewear.",
    image: {
      src: "https://images.unsplash.com/photo-1609902726285-00668009f004?w=1200&q=80",
      alt: "A smiling woman wearing round sunglasses by the seaside",
    },
  },
  {
    name: "Driving Glasses",
    line: "Clear vision, reduced glare, safer roads.",
    description:
      "Lenses and tints chosen for the road. Sharper contrast in daylight, less dazzle from oncoming headlights at night. Ask us what suits your driving hours.",
    image: {
      src: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80",
      alt: "A driver's hands on the steering wheel at dusk, city lights ahead",
    },
  },
];
