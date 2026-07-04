import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import {
  frameFamilies,
  lensTechnologies,
  specialtyRanges,
} from "@/content/collections-page";
import { siteConfig } from "@/content/site";
import { BOOK_EYE_TEST_HREF } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Collections — Eyewear for Every Style",
  description: `Explore spectacle frames, lens technologies, sunglasses and kids' eyewear at ${siteConfig.name}, Virar — honest advice for every face and budget since 1996.`,
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <>
      {/* ---- Hero ---- */}
      <Section className="bg-paper pb-0">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-champagne">Explore Frames</p>
            <Heading as="h1" size="display" className="mt-6 max-w-[16ch]">
              Hundreds of frames. One that&apos;s yours.
            </Heading>
            <p className="mt-6 max-w-[520px] text-lg leading-relaxed text-muted text-pretty">
              Every face, every budget — and honest, unhurried help finding the
              pair that feels like it was made for you.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ---- Frame families ---- */}
      <Section className="bg-paper">
        <Container>
          <ul className="grid list-none gap-6 md:grid-cols-2 lg:gap-8">
            {frameFamilies.map((frame, i) => (
              <Reveal
                as="li"
                key={frame.name}
                delay={(i % 2) * 100}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper-bright shadow-[0_4px_24px_rgba(34,29,20,0.05)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-champagne/50 hover:shadow-[0_18px_44px_-18px_rgba(34,29,20,0.18)]"
              >
                {/* real inventory, photographed in-store */}
                <div className="relative aspect-[16/9] bg-white">
                  <span
                    aria-hidden
                    className="absolute left-5 top-5 z-10 font-mono text-[0.7rem] tracking-[0.2em] text-champagne"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Image
                    src={frame.image}
                    alt={frame.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 768px) 45vw, 92vw"
                    className="object-contain p-8 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex grow flex-col p-7 sm:p-8">
                  <h2 className="font-display text-2xl text-ink">{frame.name}</h2>
                  <p className="mt-1 font-display text-base italic text-champagne">
                    {frame.note}
                  </p>
                  <p className="mt-3 leading-relaxed text-muted text-pretty">
                    {frame.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---- Lens technologies (hand-off to the Lens Lab) ---- */}
      <Section className="bg-paper-dim">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-champagne">Lens Technologies</p>
            <Heading as="h2" size="display" className="mt-6 max-w-[16ch]">
              The right lens changes everything.
            </Heading>
            <p className="mt-5 max-w-lg text-muted">
              Six technologies, each solving a real everyday problem — explore
              them hands-on in our Lens Lab.
            </p>
          </Reveal>

          <ul className="mt-12 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {lensTechnologies.map((lens, i) => (
              <Reveal as="li" key={lens.name} delay={(i % 3) * 80} className="h-full">
                <Link
                  href={lens.href}
                  className="group flex h-full flex-col rounded-2xl border border-champagne/35 bg-paper-bright p-7 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-champagne/60 hover:shadow-[0_16px_40px_-16px_rgba(34,29,20,0.16)]"
                >
                  <h3 className="font-display text-xl text-ink">{lens.name}</h3>
                  <p className="mt-2 grow text-muted">{lens.line}</p>
                  <span className="link-quiet mt-5 text-sm font-medium text-royal">
                    Learn more in the Lens Lab{" "}
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---- Specialty eyewear ---- */}
      <Section className="bg-paper">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-champagne">Specialty Eyewear</p>
            <Heading as="h2" size="display" className="mt-6 max-w-[16ch]">
              Beyond the everyday pair.
            </Heading>
          </Reveal>

          <ul className="mt-12 grid list-none gap-6 md:grid-cols-3 lg:gap-8">
            {specialtyRanges.map((range, i) => (
              <Reveal
                as="li"
                key={range.name}
                delay={i * 100}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper-bright shadow-[0_4px_24px_rgba(34,29,20,0.05)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-champagne/50 hover:shadow-[0_18px_44px_-18px_rgba(34,29,20,0.18)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-dim">
                  <Image
                    src={range.image.src}
                    alt={range.image.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 768px) 30vw, 92vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex grow flex-col p-7">
                  <h3 className="font-display text-xl text-ink">{range.name}</h3>
                  <p className="mt-1 font-display text-base italic text-champagne">
                    {range.line}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted text-pretty">
                    {range.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---- Closing CTA ---- */}
      <Section className="bg-paper-dim">
        <Container className="flex flex-col items-center gap-7 text-center">
          <Reveal>
            <Heading as="h2" size="title" className="mx-auto max-w-[20ch]">
              Ready to find your perfect fit?
            </Heading>
            <p className="mx-auto mt-4 max-w-lg text-muted">
              Walk in, try on as many as you like, and take your time — that&apos;s
              how it&apos;s worked here since 1996.
            </p>
          </Reveal>
          <Reveal delay={100} className="flex flex-wrap justify-center gap-4">
            <Button href={BOOK_EYE_TEST_HREF} size="lg" arrow>
              Book an Eye Test
            </Button>
            <Button href="/visit-us" size="lg" variant="secondary">
              Visit Us
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
