import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { FrameMark } from "@/components/brand/FrameMark";
import { siteConfig } from "@/content/site";
import { BOOK_EYE_TEST_HREF } from "@/lib/constants";

export function CtaBand() {
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`;

  return (
    <Section className="grain relative isolate overflow-hidden bg-ink text-paper">
      <div aria-hidden className="absolute inset-0 -z-10">
        <FrameMark
          variant="mono"
          strokeWidth={1.5}
          className="absolute left-1/2 top-1/2 w-[120vw] max-w-[1400px] -translate-x-1/2 -translate-y-1/2 text-paper/[0.05]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(198,161,91,0.14),transparent_70%)]" />
      </div>

      <Container className="relative flex flex-col items-center gap-7 text-center">
        <Reveal>
          <div className="flex flex-col items-center gap-2">
            <span className="eyebrow text-champagne-soft">
              Clear Vision · Honest Advice · Since 1996
            </span>
            <span aria-hidden className="h-px w-6 bg-champagne" />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <Heading as="h2" size="hero" className="mx-auto max-w-[18ch]">
            Let&apos;s help you see the world clearly.
          </Heading>
        </Reveal>
        <Reveal delay={140}>
          <p className="mx-auto max-w-xl text-paper/70">
            Walk in for an eye test, browse the frames, or just say hello on
            WhatsApp. We&apos;d love to meet you.
          </p>
        </Reveal>
        <Reveal delay={200} className="flex flex-wrap justify-center gap-4 pt-2">
          <Button href={BOOK_EYE_TEST_HREF} size="lg" variant="primary" arrow>
            Book an Eye Test
          </Button>
          <Button href={whatsappHref} size="lg" variant="outline-light">
            Chat on WhatsApp
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
