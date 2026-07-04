import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/motion/Reveal";
import { ValuesGrid } from "@/components/sections/ValuesGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { heritageStory } from "@/content/heritage";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Story",
  description: `The story of ${siteConfig.name} — a family-owned optical business in ${siteConfig.address.city}, serving three generations since ${siteConfig.establishedYear}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Section className="bg-paper">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-6">
            <Tag>Est. {siteConfig.establishedYear}</Tag>
            <Heading as="h1" size="lg">
              Our Story
            </Heading>
            <div className="flex flex-col gap-4 text-muted">
              {heritageStory.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal
            delay={120}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-border"
          >
            <Image
              src="/images/heritage/grandfather.jpg"
              alt="Vinodchandra Vora, who began the family's life in optics, at the Ami Optics counter"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </Reveal>
        </Container>
      </Section>

      <ValuesGrid />
      <CtaBand />
    </>
  );
}
