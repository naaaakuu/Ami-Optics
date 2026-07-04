import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { FrameMark } from "@/components/brand/FrameMark";
import { founders } from "@/content/heritage";

export function BrothersSection() {
  return (
    <Section id="team" className="bg-paper">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="eyebrow text-royal">Meet the Family</span>
            <span aria-hidden className="h-px w-6 bg-champagne" />
          </div>
          <Heading as="h2" size="display" className="mx-auto mt-6 max-w-[14ch]">
            One vision. Two brothers.
          </Heading>
          <p className="mx-auto mt-5 max-w-lg text-muted">
            For nearly three decades, Jignesh and Jatin have run Ami Optics side
            by side — their strengths fitting together as neatly as a good pair.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:gap-12">
          {founders.map((person, i) => (
            <Reveal key={person.name} delay={i * 120} variant="focus">
              <article className="group">
                {/* champagne hairline mat around the portrait */}
                <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-champagne/45 ring-offset-4 ring-offset-paper transition-shadow duration-500 group-hover:shadow-[0_32px_70px_-32px_rgba(34,29,20,0.45)]">
                  <Photo
                    src={person.image!.src}
                    alt={person.image!.alt}
                    sizes="(min-width: 640px) 45vw, 90vw"
                    duotone="warm"
                    className="aspect-[4/5]"
                    imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                  {/* role overlay — a duplicate of the caption below, so hover-only is fine */}
                  <div
                    aria-hidden
                    className="absolute inset-0 z-[5] flex items-end bg-gradient-to-t from-ink/70 via-ink/10 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  >
                    <div>
                      <p className="font-display text-xl italic text-paper-bright">
                        {person.name.split(" ")[0]}
                      </p>
                      <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-champagne-soft">
                        {person.role}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl text-ink">{person.name}</h3>
                    <p className="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-royal">
                      {person.role}
                    </p>
                  </div>
                  <FrameMark variant="duo" className="mt-1 h-5 w-auto shrink-0" strokeWidth={8} />
                </div>
                <p className="mt-3 max-w-md text-muted">{person.focus}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
