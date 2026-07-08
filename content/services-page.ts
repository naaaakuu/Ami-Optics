export type ServiceEntry = {
  /** Anchor id on the services page. */
  id: string;
  name: string;
  /** Editorial tagline — Fraunces italic on the card. */
  tagline: string;
  /** Description paragraphs, verbatim from 03_Services.md. */
  description: string[];
  /** Short supporting points shown as quiet tags. */
  points: string[];
  /** Icon key resolved in the page component. */
  icon: "eye" | "frame" | "lens" | "fit" | "clock" | "home" | "wrench" | "sun";
  image: {
    /** Unsplash CDN URL (verified live) — sized via query params + next/image. */
    src: string;
    alt: string;
  };
};

/**
 * The eight core services, with copy sourced verbatim from the approved
 * `03_Services.md` content document. Photography is licensed Unsplash
 * stock (every URL verified live before being committed here).
 */
export const servicesIntro = [
  "At Ami Optics, we believe every customer deserves a solution that fits their vision, lifestyle and budget. Instead of simply selling products, we help you understand your options and recommend what is genuinely best for your eyes.",
  "Whether you're looking for your first pair of spectacles, premium progressive lenses, contact lenses or a quick repair, our goal remains the same: honest advice, quality products and long-term comfort.",
];

export const servicesPage: ServiceEntry[] = [
  {
    id: "eye-testing",
    name: "Computerized Eye Testing",
    tagline: "See clearly. Start accurately.",
    description: [
      "Every great pair of spectacles begins with an accurate eye examination.",
      "Our computerized eye testing helps us understand your vision needs with precision before recommending the most suitable lenses.",
    ],
    points: ["Children", "Adults", "Senior citizens", "First-time users"],
    icon: "eye",
    image: {
      src: "https://images.unsplash.com/photo-1539036776273-021ec1d78bec?w=1200&q=80",
      alt: "A patient looking through a computerized phoropter during an eye examination",
    },
  },
  {
    id: "frames",
    name: "Spectacles & Frames",
    tagline: "Find the frame that fits your personality.",
    description: [
      "Your spectacles are something you wear every day. They should feel comfortable, suit your personality and complement your lifestyle.",
      "We offer a wide range of frame styles for every age group and budget.",
    ],
    points: ["Metal", "Acetate", "Rimless", "Titanium", "Kids", "Smart glasses"],
    icon: "frame",
    image: {
      src: "https://images.unsplash.com/photo-1534078477103-9f6a18b3a5e2?w=1200&q=80",
      alt: "Rows of spectacle frames arranged neatly in an optical display",
    },
  },
  {
    id: "lenses",
    name: "Prescription Lenses",
    tagline: "Your vision deserves the right lens.",
    description: [
      "Frames may define your style, but lenses define your vision.",
      "We help customers choose lenses based on their prescription, work, daily routine and budget rather than simply recommending the most expensive option.",
    ],
    points: ["Single vision", "Progressive", "Bifocal", "Blue Cut", "Photochromic", "High index"],
    icon: "lens",
    image: {
      src: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1200&q=80",
      alt: "A pair of browline eyeglasses resting on a white book",
    },
  },
  {
    id: "contact-lenses",
    name: "Contact Lens Solutions",
    tagline: "Freedom beyond spectacles.",
    description: [
      "Whether you're new to contact lenses or an experienced wearer, we'll help you choose the right option based on your lifestyle and prescription.",
    ],
    points: ["Daily", "Monthly", "Colour", "Toric", "Multifocal", "Solutions & cases"],
    icon: "fit",
    image: {
      src: "https://images.unsplash.com/photo-1599243315159-faa0eac09ec1?w=1200&q=80",
      alt: "A person preparing a contact lens at a bathroom sink",
    },
  },
  {
    id: "fast-delivery",
    name: "Fast Delivery",
    tagline: "Because waiting isn't always necessary.",
    description: [
      "One of the reasons many customers choose Ami Optics is our large in-stock lens inventory.",
      "For many common prescriptions, spectacles can be prepared within approximately 30 minutes, subject to stock availability.",
    ],
    points: ["About 30 minutes for many prescriptions", "In stock lens inventory"],
    icon: "clock",
    image: {
      src: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=1200&q=80",
      alt: "A finished pair of half-rim spectacles on a wooden table in warm evening light",
    },
  },
  {
    id: "home-checkup",
    name: "Home Eye Checkup",
    tagline: "Quality eye care, wherever it's needed.",
    description: [
      "Some customers simply cannot visit the store.",
      "For elderly, bedridden or medically dependent individuals, we provide home eye checkup services whenever possible.",
      "Because quality eye care should remain accessible to those who need it most.",
    ],
    points: ["Elderly", "Bedridden", "Medically dependent"],
    icon: "home",
    image: {
      src: "https://images.unsplash.com/photo-1739932885175-5fdaa1bd5989?w=1200&q=80",
      alt: "An elderly person's hands resting gently on a windowsill at home",
    },
  },
  {
    id: "repairs",
    name: "Repairs & Adjustments",
    tagline: "Good service continues after the purchase.",
    description: [
      "We believe good service continues even after the purchase.",
      "Our team provides repairs and adjustments for spectacles and sunglasses, including many that were not purchased from Ami Optics.",
    ],
    points: ["Frame adjustments", "Nose pads", "Minor repairs", "Servicing", "Cleaning"],
    icon: "wrench",
    image: {
      src: "https://images.unsplash.com/photo-1517948430535-1e2469d314fe?w=1200&q=80",
      alt: "Hands holding a pair of spectacles up in front of an eye chart",
    },
  },
  {
    id: "sunglasses",
    name: "Sunglasses",
    tagline: "Protect your eyes while enhancing your style.",
    description: [
      "Our collection includes sunglasses for everyday use, driving, children and specialty requirements.",
      "This category is carefully curated while keeping our primary focus on prescription eyewear and eye care.",
    ],
    points: ["Fashion", "Kids", "Solar eclipse viewing"],
    icon: "sun",
    image: {
      src: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&q=80",
      alt: "A pair of sunglasses resting on golden beach sand under a bright sky",
    },
  },
];
