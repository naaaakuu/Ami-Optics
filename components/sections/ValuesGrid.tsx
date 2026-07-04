import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/motion/Reveal";
import { valuePillars } from "@/content/heritage";

export function ValuesGrid() {
  return (
    <Section className="bg-ink text-paper">
      <Container className="flex flex-col gap-12">
        <Reveal className="max-w-xl">
          <Heading as="h2" size="lg">
            Our Philosophy
          </Heading>
        </Reveal>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {valuePillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 80}>
              <span className="font-display text-3xl text-paper/30">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl">{pillar.title}</h3>
              <p className="mt-2 text-paper/70">{pillar.description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
