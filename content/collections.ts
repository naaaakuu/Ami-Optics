import type { Collection } from "@/types/content";

export const collections: Collection[] = [
  {
    slug: "spectacle-frames",
    name: "Spectacle Frames",
    group: "Eyewear Frames",
    summary:
      "Our core range of everyday spectacle frames, fitted to suit your face and prescription.",
    image: {
      src: "/images/products/spectacle-frames-collection.jpeg",
      alt: "Spectacle frames available at Ami Optics",
      width: 1600,
      height: 1200,
    },
    featured: true,
  },
  {
    slug: "premium-frames",
    name: "Premium Frames",
    group: "Eyewear Frames",
    summary:
      "Refined, higher-end frame styles for those seeking something more distinctive.",
  },
  {
    slug: "metal-frames",
    name: "Metal Frames",
    group: "Eyewear Frames",
    summary:
      "Lightweight, durable metal frames in classic and contemporary styles.",
  },
  {
    slug: "rimless-frames",
    name: "Rimless Frames",
    group: "Eyewear Frames",
    summary: "Minimal, barely-there frames for a subtle, lightweight look.",
  },
  {
    slug: "half-rim-frames",
    name: "Half-Rim Frames",
    group: "Eyewear Frames",
    summary:
      "A balance of structure and lightness — rimmed on top, open below.",
  },
  {
    slug: "kids-frames",
    name: "Kids Frames",
    group: "Eyewear Frames",
    summary: "Sturdy, comfortable frames sized and styled for children.",
    featured: true,
  },
  {
    slug: "sunglasses",
    name: "Sunglasses",
    group: "Sun & Light Protection",
    summary: "Everyday sunglasses for UV protection and outdoor wear.",
    featured: true,
  },
  {
    slug: "prescription-sunglasses",
    name: "Prescription Sunglasses",
    group: "Sun & Light Protection",
    summary:
      "Sunglasses fitted with your prescription, for clear vision outdoors.",
  },
  {
    slug: "driving-glasses",
    name: "Driving Glasses",
    group: "Sun & Light Protection",
    summary: "Glasses suited to driving conditions, day or night.",
  },
  {
    slug: "reading-glasses",
    name: "Reading Glasses",
    group: "Everyday & Specialty",
    summary: "Dedicated eyewear for comfortable close-up reading.",
  },
  {
    slug: "computer-glasses",
    name: "Computer Glasses",
    group: "Everyday & Specialty",
    summary:
      "Eyewear designed for comfortable, reduced-strain screen use.",
    featured: true,
  },
  {
    slug: "contact-lenses",
    name: "Contact Lenses",
    group: "Lenses",
    summary:
      "Contact lenses fitted to your prescription, with guidance on fit and care.",
  },
  {
    slug: "progressive-lenses",
    name: "Progressive Lenses",
    group: "Lenses",
    summary: "Seamless multi-focal lenses for distance, mid, and near vision.",
  },
  {
    slug: "bifocal-lenses",
    name: "Bifocal Lenses",
    group: "Lenses",
    summary: "Distance and near correction in a single lens.",
  },
  {
    slug: "single-vision-lenses",
    name: "Single Vision Lenses",
    group: "Lenses",
    summary: "Standard correction for one field of vision.",
  },
  {
    slug: "blue-cut-lenses",
    name: "Blue Cut Lenses",
    group: "Lenses",
    summary: "Lenses that filter blue light for comfortable screen use.",
  },
];

export const collectionGroups = [
  "Eyewear Frames",
  "Sun & Light Protection",
  "Everyday & Specialty",
  "Lenses",
] as const;
