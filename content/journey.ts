export type JourneyStep = {
  icon: "eye" | "frame" | "lens" | "cut" | "fit" | "check";
  title: string;
  description: string;
  /** Path inside /public — served at this URL by Next.js. */
  video: string;
};

export const journeySteps: JourneyStep[] = [
  {
    icon: "eye",
    title: "Computerised Eye Test",
    description:
      "Every good pair begins here. An accurate, computerised examination, explained in plain language.",
    video: "/videos/journey/step-1-eye-test-web.mp4",
  },
  {
    icon: "frame",
    title: "Choose Your Frame",
    description:
      "Hundreds of frames, and honest help finding the one that suits your face, comfort and personality.",
    video: "/videos/journey/step-2-choose-frame-web.mp4",
  },
  {
    icon: "lens",
    title: "Choose The Right Lens",
    description:
      "Single vision, progressive, blue cut and more, matched to your prescription, lifestyle and budget.",
    video: "/videos/journey/step-3-choose-lens-web.mp4",
  },
  {
    icon: "cut",
    title: "Precision Lens Processing",
    description:
      "Lenses cut and edged in-house on modern automated machinery, for a clean, exact fit.",
    video: "/videos/journey/step-4-lens-processing-web.mp4",
  },
  {
    icon: "fit",
    title: "Fitting & Final Check",
    description:
      "Aligned, adjusted and checked on your face until it sits exactly right.",
    video: "/videos/journey/step-5-fitting-web.mp4",
  },
  {
    icon: "check",
    title: "Walk Out Seeing Better",
    description:
      "Often the same day, and we're here afterwards for any adjustment you need.",
    video: "/videos/journey/step-6-result-web.mp4",
  },
];
