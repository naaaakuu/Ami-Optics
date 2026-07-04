import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { CollectionCard } from "@/components/sections/CollectionCard";
import { collections } from "@/content/collections";

export function CollectionShowcase() {
  const featured = collections.filter((collection) => collection.featured);

  return (
    <Section id="collections" className="bg-ink text-paper">
      <Container className="flex flex-col gap-12">
        <Reveal className="flex max-w-xl flex-col gap-4">
          <Heading as="h2" size="lg">
            Collections
          </Heading>
          <p className="text-paper/70">
            From everyday spectacle frames to sunglasses and kids&apos;
            eyewear, hand-picked and fitted in-store.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((collection, index) => (
            <Reveal key={collection.slug} delay={index * 100}>
              <CollectionCard collection={collection} tone="dark" />
            </Reveal>
          ))}
        </div>

        <div>
          <Button href="/collections" variant="outline-light">
            View All Collections
          </Button>
        </div>
      </Container>
    </Section>
  );
}
