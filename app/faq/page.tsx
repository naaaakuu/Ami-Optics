import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { FaqExplorer } from "@/components/sections/FaqExplorer";
import { faqCategories } from "@/content/faqs";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "FAQ — Honest Answers About Eye Care",
  description: `Answers to common questions about eye testing, spectacles, lenses, contact lenses, repairs and home checkups at ${siteConfig.name}, Virar — trusted since 1996.`,
  alternates: { canonical: "/faq" },
};

/** schema.org FAQPage markup — every question, verbatim. */
function getFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((category) =>
      category.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer.join(" "),
        },
      })),
    ),
  };
}

export default function FaqPage() {
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`;
  const phoneHref = `tel:${siteConfig.phone.primary.replace(/\s+/g, "")}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd()) }}
      />

      {/* ---- Hero ---- */}
      <Section className="bg-paper pb-0">
        <Container className="flex flex-col items-center text-center">
          <Reveal className="flex flex-col items-center">
            <p className="eyebrow text-champagne">Frequently Asked Questions</p>
            <Heading as="h1" size="display" className="mx-auto mt-6 max-w-[16ch]">
              Questions? We&apos;ve answered them.
            </Heading>
            <p className="mx-auto mt-6 max-w-[560px] text-lg leading-relaxed text-muted text-pretty">
              Honest answers to common questions about eye care, glasses,
              lenses and our service.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ---- Explorer ---- */}
      <Section className="bg-paper">
        <Container>
          <div className="mx-auto max-w-4xl">
            <FaqExplorer />
          </div>
        </Container>
      </Section>

      {/* ---- Still curious ---- */}
      <Section className="bg-paper-dim">
        <Container className="flex flex-col items-center gap-7 text-center">
          <Reveal>
            <Heading as="h2" size="title" className="mx-auto max-w-[22ch]">
              Still have a question?
            </Heading>
            <p className="mx-auto mt-4 max-w-[520px] text-muted text-pretty">
              Ask us directly — in English, हिंदी or मराठी. No question is too
              small when it&apos;s about your eyes.
            </p>
          </Reveal>
          <Reveal delay={100} className="flex flex-wrap justify-center gap-4">
            <Button href={whatsappHref} size="lg" arrow>
              Ask on WhatsApp
            </Button>
            <Button href={phoneHref} size="lg" variant="secondary">
              Call {siteConfig.phone.primary}
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
