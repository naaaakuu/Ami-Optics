import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/motion/Reveal";
import {
  HandshakeIcon,
  ClockIcon,
  HomeIcon,
  WrenchIcon,
  UsersIcon,
  StarIcon,
} from "@/components/brand/Icons";
import { valuePillars } from "@/content/heritage";

const icons = [HandshakeIcon, ClockIcon, HomeIcon, WrenchIcon, UsersIcon, StarIcon];

/**
 * Why Ami Optics — a warm, supporting section (deliberately not hero-level).
 * Six promise cards in cream with a champagne accent border, fading in and
 * lifting gently on scroll. The whole section stays on the warm ivory
 * palette; the only dark surface on the page is the footer.
 */
export function ValuesSection() {
  return (
    <Section id="why" className="bg-paper-dim">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="eyebrow inline-flex items-center gap-2 text-royal">
            <HandshakeIcon className="h-3.5 w-3.5" />
            Why Ami Optics
          </p>
          <Heading as="h2" size="display" className="mt-6 max-w-[16ch]">
            More than a shop. A promise.
          </Heading>
          <p className="mt-5 max-w-lg text-muted">
            Quietly, every day, the same standards we&apos;ve kept since 1996 —
            because people remember how they were treated long after they forget
            what they bought.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {valuePillars.map((pillar, i) => {
            const Icon = icons[i] ?? StarIcon;
            return (
              <Reveal
                key={pillar.title}
                delay={(i % 3) * 80}
                className="group flex flex-col gap-4 rounded-2xl border border-champagne/35 bg-paper-bright p-8 shadow-[0_4px_24px_rgba(34,29,20,0.05)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-champagne/60 hover:shadow-[0_16px_40px_-16px_rgba(34,29,20,0.16)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-champagne/50 bg-paper text-champagne transition-colors duration-300 group-hover:border-champagne">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-xl text-ink">{pillar.title}</h3>
                <p className="text-muted">{pillar.description}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
