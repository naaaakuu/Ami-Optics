import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/motion/Reveal";
import {
  EyeIcon,
  FrameIcon,
  LensIcon,
  FitIcon,
  ClockIcon,
  HomeIcon,
  WrenchIcon,
  SunIcon,
} from "@/components/brand/Icons";
import { servicesIntro, servicesPage } from "@/content/services-page";
import { siteConfig } from "@/content/site";
import { BOOK_EYE_TEST_HREF } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services — Complete Eye Care in Virar",
  description: `Computerized eye testing, frames, prescription lenses, contact lenses, repairs and home eye checkups at ${siteConfig.name}, Virar — honest recommendations since 1996.`,
  alternates: { canonical: "/services" },
};

const icons = {
  eye: EyeIcon,
  frame: FrameIcon,
  lens: LensIcon,
  fit: FitIcon,
  clock: ClockIcon,
  home: HomeIcon,
  wrench: WrenchIcon,
  sun: SunIcon,
} as const;

export default function ServicesPage() {
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`;

  return (
    <>
      {/* ---- Hero ---- */}
      <Section className="bg-paper pb-0">
        <Container className="flex flex-col items-center text-center">
          <Reveal className="flex flex-col items-center">
            <p className="eyebrow text-champagne">Eye Care Solutions</p>
            <Heading as="h1" size="display" className="mx-auto mt-6 max-w-[18ch]">
              Complete care. Honest recommendations.
            </Heading>
            <p className="mx-auto mt-6 max-w-[560px] text-lg leading-relaxed text-muted text-pretty">
              From accurate eye testing to precision lens fitting to lifetime
              after-sales support — every service is built around genuine care
              for your vision.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-8 max-w-2xl space-y-4 text-muted">
            {servicesIntro.map((para) => (
              <p key={para.slice(0, 24)} className="text-pretty">
                {para}
              </p>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* ---- The eight services ---- */}
      <Section className="bg-paper">
        <Container>
          <ul className="grid list-none gap-6 md:grid-cols-2 lg:gap-8">
            {servicesPage.map((service, i) => {
              const Icon = icons[service.icon];
              return (
                <Reveal
                  as="li"
                  key={service.id}
                  delay={(i % 2) * 100}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper-bright shadow-[0_4px_24px_rgba(34,29,20,0.05)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-champagne/50 hover:shadow-[0_18px_44px_-18px_rgba(34,29,20,0.18)]"
                >
                  <article id={service.id} className="flex h-full flex-col">
                    <div className="relative aspect-[16/9] overflow-hidden bg-paper-dim">
                      <Image
                        src={service.image.src}
                        alt={service.image.alt}
                        fill
                        loading="lazy"
                        sizes="(min-width: 768px) 45vw, 92vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex grow flex-col p-7 sm:p-8">
                      <div className="flex items-start gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-champagne/50 bg-paper text-champagne">
                          <Icon className="h-6 w-6" />
                        </span>
                        <div>
                          <h2 className="font-display text-xl text-ink sm:text-2xl">
                            {service.name}
                          </h2>
                          <p className="mt-1 font-display text-base italic text-champagne">
                            {service.tagline}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 space-y-3 leading-relaxed text-muted">
                        {service.description.map((para) => (
                          <p key={para.slice(0, 24)} className="text-pretty">
                            {para}
                          </p>
                        ))}
                      </div>
                      <div className="mt-auto flex flex-wrap gap-2 pt-5">
                        {service.points.map((point) => (
                          <Tag key={point}>{point}</Tag>
                        ))}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* ---- Closing CTA ---- */}
      <Section className="bg-paper-dim">
        <Container className="flex flex-col items-center gap-7 text-center">
          <Reveal>
            <Heading as="h2" size="title" className="mx-auto max-w-[20ch]">
              Questions about a service?
            </Heading>
            <p className="mx-auto mt-4 max-w-[560px] text-lg text-muted text-pretty">
              Contact us on WhatsApp or visit us in Virar — we&apos;re happy to
              explain exactly what suits your needs.
            </p>
          </Reveal>
          <Reveal delay={100} className="flex flex-wrap justify-center gap-4">
            <Button href={whatsappHref} size="lg" arrow>
              Contact on WhatsApp
            </Button>
            <Button href="/visit-us" size="lg" variant="secondary">
              Visit Us
            </Button>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-sm text-muted-light">
              Or book directly:{" "}
              <a href={BOOK_EYE_TEST_HREF} className="link-quiet text-royal">
                Book an Eye Test
              </a>
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
