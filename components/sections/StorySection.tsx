import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/motion/Reveal";
import { StoryTimeline } from "@/components/sections/StoryTimeline";
import { heritageStory, nameStory } from "@/content/heritage";

/**
 * Our Story — the emotional spine of the homepage.
 *
 * Not history to be read, but a journey to be walked. It opens like the first
 * chapter of a documentary: the founder's father in a print pulled from the
 * family album (sepia, mounted, a second photo peeking behind), the origin
 * narrative beside it, and the ownable "Ami / Amita" name story. It then hands
 * off to <StoryTimeline> — the march from one 1996 shutter to today's three
 * shops, ending in the present day, in colour. Restraint throughout: every
 * reveal is there to deepen trust, never to perform.
 */

export function StorySection() {
  return (
    <Section id="story" className="relative overflow-hidden bg-paper">
      <Container className="relative">
        {/* ---- Movement I · Origin ---- */}
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow text-royal">
                Our Story — Three Generations
              </p>
              <Heading as="h2" size="display" className="mt-6 max-w-[16ch]">
                It began before 1996.
              </Heading>
            </Reveal>

            <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-muted">
              {heritageStory.map((para, i) => (
                <Reveal key={i} delay={i * 90}>
                  <p className={i === 0 ? "dropcap text-ink" : undefined}>{para}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <blockquote className="mt-8 max-w-xl border-l-2 border-champagne pl-5 font-display text-xl italic leading-snug text-ink">
                {nameStory}
              </blockquote>
            </Reveal>
          </div>

          {/* the archival portrait, mounted like a print from the album */}
          <Reveal variant="focus" delay={120} className="lg:col-span-6">
            <div className="relative mx-auto max-w-md">
              {/* a second print, peeking from behind */}
              <div
                aria-hidden
                className="absolute -right-5 -top-5 h-full w-full rotate-[3deg] rounded-[1.25rem] bg-paper-dim shadow-sm ring-1 ring-line"
              />

              <figure className="relative -rotate-2">
                <div className="rounded-[1.25rem] bg-paper-bright p-3.5 shadow-[0_50px_100px_-38px_rgba(34,29,20,0.55)] ring-1 ring-champagne/30">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[0.7rem] bg-paper-dim">
                    <Image
                      src="/images/heritage/grandfather.jpg"
                      alt="Vinodchandra Vora, who began the family's life in optics, at the Ami Optics counter"
                      fill
                      sizes="(min-width: 1024px) 40vw, 88vw"
                      className="grade-archival object-cover"
                    />
                    {/* a gently aged vignette */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(84%_84%_at_50%_38%,transparent_56%,rgba(34,29,20,0.2)_100%)]"
                    />
                  </div>
                  <figcaption className="px-1.5 pb-1 pt-4">
                    <span className="eyebrow block text-[0.56rem] text-royal">
                      The first generation
                    </span>
                    <span className="mt-1.5 block font-display text-lg italic text-ink">
                      Vinodchandra Vora
                    </span>
                  </figcaption>
                </div>
              </figure>
            </div>
          </Reveal>
        </div>

        {/* ---- Movement II · The Journey ---- */}
        <StoryTimeline />
      </Container>
    </Section>
  );
}
