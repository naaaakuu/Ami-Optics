import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { StorySection } from "@/components/sections/StorySection";
import { EyeCareJourney } from "@/components/sections/EyeCareJourney";
import { LensLab } from "@/components/sections/LensLab/LensLab";
import { FramesSection } from "@/components/sections/FramesSection";
import { ValuesSection } from "@/components/sections/ValuesSection";
import { BrothersSection } from "@/components/sections/BrothersSection";
import { StoriesSection } from "@/components/sections/StoriesSection";
import { VisitUsBand } from "@/components/sections/VisitUsBand";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <StorySection />
      <EyeCareJourney />
      <LensLab />
      <FramesSection />
      <ValuesSection />
      <BrothersSection />
      <StoriesSection />
      <VisitUsBand />
      <CtaBand />
    </>
  );
}
