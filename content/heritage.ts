import type { Founder, HeritageMilestone, ValuePillar } from "@/types/content";

/** Short narrative used on the homepage story section. */
export const heritageStory: string[] = [
  "Our story did not begin with a shop. It began in Mumbai's wholesale spectacle market, where Vinodchandra Vora sourced frames and supplied opticians across the region. The trade eventually closed, but the family's bond with optics never did.",
  "In 1996, two of his sons, Jignesh and Jatin, brought those roots back to life with a single small shop in Virar, tucked inside a building away from the road. Some days no one came. On good days, one or two pairs were delivered. Yet every morning the shutters opened with the same hope.",
  "Nearly three decades later, that one shop has grown into three, built not on shortcuts but on years of honest advice and customer goodwill.",
];

/** The name story — a signature, ownable detail. */
export const nameStory =
  "The founders first wanted to call it “Neetram”, but the name was taken. Instead they borrowed from the family's Ami Beauty Parlour, named after the eldest daughter, Amita. And so “Ami” became the family's signature, and it lives on through Ami Optics today.";

/** A quiet, human detail that earns trust. */
export const elderNote =
  "The very first customer was Meenaben Vora, the founders' mother. And even today, Vinodchandra Vora, now in his eighties, still visits the shop, a daily reminder of where the journey began.";

/**
 * The homepage tells the story in just three chapters — enough to feel the
 * journey, not so much that it reads like an archive. The full milestone
 * history lives on the dedicated story page (`heritageMilestones`).
 */
export const homeStoryChapters: { year: string; title: string; body: string }[] = [
  {
    year: "1996",
    title: "Where it began",
    body: "Two brothers, one small shop tucked off the road in Virar. Some mornings no one came. Yet the shutters opened with the same hope every single day.",
  },
  {
    year: "Since then",
    title: "Growing through trust",
    body: "A move to the crossroads at Jivdani Chowk, where four roads meet. One shop quietly became three, earned through honest advice and never shortcuts.",
  },
  {
    year: "Today",
    title: "Three generations, side by side",
    body: "Computerised testing and hand-fitting under one roof, still guided by the same family hands that opened the shutters in 1996.",
  },
];

export const founders: Founder[] = [
  {
    name: "Jignesh Vora",
    role: "Management · Purchasing · Operations",
    focus:
      "Runs the business, the buying and the bench with an exacting eye for detail and quality.",
    image: {
      src: "/images/founders/jignesh.jpg",
      alt: "Jignesh Vora, co-founder of Ami Optics",
      width: 1200,
      height: 1500,
    },
  },
  {
    name: "Jatin Vora",
    role: "Eye Testing · Customer Care",
    focus:
      "Pairs technical expertise with a warm, unhurried manner that puts every customer at ease.",
    image: {
      src: "/images/founders/jatin.jpg",
      alt: "Jatin Vora, co-founder of Ami Optics",
      width: 1200,
      height: 1500,
    },
  },
];

export const heritageMilestones: HeritageMilestone[] = [
  {
    year: "1996",
    title: "The first shutter",
    description:
      "A single shop tucked inside a building, away from the road. Manual eye testing, registers kept by hand, frames sent to Bhayandar to be fitted.",
  },
  {
    year: "1997",
    title: "To the crossroads",
    description:
      "Just a year in, Ami Optics moved to the front of the building at Jivdani Chowk, where four roads meet, and the city could finally see it.",
  },
  {
    year: "2000s",
    title: "One became three",
    description:
      "Trust compounded. One shop quietly grew into two, and then into three connected shops, earned through consistency and never shortcuts.",
  },
  {
    year: "Then",
    title: "Records, computerised",
    description:
      "Handwritten registers became a computerised customer management system. Every prescription, remembered.",
  },
  {
    year: "Later",
    title: "Fitting, brought in house",
    description:
      "Outsourced fitting became a dedicated in house fitter, and a stock of common lenses made same day spectacles possible.",
  },
  {
    year: "Today",
    title: "Precision, by hand and machine",
    description:
      "Computerised eye testing and an automated edging machine. Modern precision, still guided by the same family hands.",
  },
];

export const valuePillars: ValuePillar[] = [
  {
    title: "Honest Recommendations",
    description:
      "We suggest what genuinely suits your eyes, lifestyle and budget. Never simply the most expensive option.",
  },
  {
    title: "Same Day When We Can",
    description:
      "A large in stock lens inventory means many prescriptions are ready in around 30 minutes.",
  },
  {
    title: "Home Eye Checkups",
    description:
      "For the elderly and bedridden who cannot travel, we bring the eye test to them.",
  },
  {
    title: "Care After the Sale",
    description:
      "Adjustments, nose pads, cleaning and repairs, even on spectacles we didn't sell.",
  },
  {
    title: "Built by Family",
    description:
      "Two brothers, still working side by side with the same values they began with in 1996.",
  },
  {
    title: "Trusted for Decades",
    description:
      "Customers who first came as young adults now return with their children, and their children's children.",
  },
];
