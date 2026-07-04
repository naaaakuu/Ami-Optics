import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function HeritageTeaser() {
  return (
    <Section className="bg-paper">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-border">
          <Image
            src="/images/heritage/grandfather.jpg"
            alt="Vinodchandra Vora, who began the family's life in optics, at the Ami Optics counter"
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-6">
          <Tag>Est. 1996</Tag>
          <Heading as="h2" size="lg">
            A family business, three generations deep.
          </Heading>
          <p className="max-w-md text-muted">
            Ami Optics has been run by the same family for three generations,
            helping Virar see clearly with eye testing and hand-fitted
            spectacle frames since 1996.
          </p>
          <div>
            <Button href="/about" variant="secondary">
              Our Story
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
