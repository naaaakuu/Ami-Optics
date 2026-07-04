import type { Service } from "@/types/content";

export const services: Service[] = [
  {
    slug: "eye-testing",
    name: "Eye Testing",
    summary:
      "Comprehensive in-store eye examinations, combining modern testing technology with honest advice.",
    image: {
      src: "/images/shop/eye-testing.jpeg",
      alt: "Eye testing in progress at Ami Optics",
      width: 1600,
      height: 1200,
    },
  },
  {
    slug: "spectacle-frames",
    name: "Spectacle Frames",
    summary:
      "A hand-picked range of spectacle frames, fitted in-store to suit your face and prescription.",
    image: {
      src: "/images/products/spectacle-frames.jpeg",
      alt: "Spectacle frames on display at Ami Optics",
      width: 1600,
      height: 1200,
    },
    details: ["Premium", "Metal", "Rimless", "Half-Rim", "Kids"],
  },
  {
    slug: "prescription-lenses",
    name: "Prescription Lenses",
    summary:
      "Lenses fitted and dispensed in-house, matched to your prescription and lifestyle.",
    image: {
      src: "/images/products/prescription-lenses.png",
      alt: "Prescription lenses fitted at Ami Optics",
      width: 1600,
      height: 1200,
    },
    details: ["Single Vision", "Bifocal", "Progressive", "Blue Cut"],
  },
  {
    slug: "contact-lenses",
    name: "Contact Lenses",
    summary:
      "Contact lenses fitted to your prescription, with guidance on fit, wear, and care.",
  },
];
