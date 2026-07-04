export type Testimonial = {
  name: string;
  text: string;
  /** the one signature story — rendered larger */
  featured?: boolean;
  /** short editorial note shown only under the featured card — not a customer quote */
  note?: string;
};

/** Real Google reviews, lightly trimmed. The featured one is the heart of it. */
export const testimonials: Testimonial[] = [
  {
    name: "Palshankar",
    featured: true,
    text: "I bought my frame here back in 2016 and literally wore it for ten years, until I lost it near Naigaon khadi. I came back in 2026, and I'm still mind‑blown by the quality of these specs.",
    note: "Some customers even fly in from Saudi Arabia to have their spectacles made whenever they visit India.",
  },
  {
    name: "Vivek Tirodkar",
    text: "The eye check‑up was incredibly thorough and the staff explained everything clearly. What impressed me most was the follow‑up — they genuinely care about your comfort even after you walk out.",
  },
  {
    name: "Tip Top Maker",
    text: "Everyone in my family who wears glasses goes here. He sells his own frames, so even being far cheaper than Titan or Lenskart, the quality is very nice and durable.",
  },
  {
    name: "Mandar Belwalkar",
    text: "They suggest good brands without even being asked. I've bought lenses from them for a long time — they message beforehand every time, and the prices are good too.",
  },
  {
    name: "Amod Naik",
    text: "Friendly, patient staff and personalised attention. Accurate prescriptions, durable frames, clear lenses, and genuinely advanced, precise eye scans.",
  },
  {
    name: "Sushil Vaidya",
    text: "Both brothers are very cooperative and quick. A superb shop in Virar, and the rates are very reasonable compared to other shops. Best wishes for the future.",
  },
  {
    name: "Suresh Mali",
    text: "Professional but very personal service. I got a very thorough exam and great help choosing a pair of glasses that actually suited me.",
  },
  {
    name: "Vikram Dubey",
    text: "Very humble and honest showroom. Polite staff, reasonable rates and good‑quality products. Highly recommended — please do visit.",
  },
];
