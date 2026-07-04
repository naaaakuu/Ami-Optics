import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { OpenStatusBadge } from "@/components/layout/OpenStatusBadge";
import { HomeIcon } from "@/components/brand/Icons";
import { siteConfig } from "@/content/site";
import { MAP_EMBED_SRC } from "@/lib/constants";

export function VisitUsBand() {
  const phoneHref = `tel:${siteConfig.phone.primary.replace(/\s+/g, "")}`;
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`;

  return (
    <Section id="visit-us" className="bg-paper">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-7">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-2 text-royal">
              <HomeIcon className="h-3.5 w-3.5" />
              Visit Us
            </p>
            <Heading as="h2" size="display" className="mt-6 max-w-[14ch]">
              Find us at Jivdani Chowk.
            </Heading>
          </Reveal>

          <Reveal delay={80}>
            <OpenStatusBadge className="text-ink" />
            <address className="mt-4 not-italic leading-relaxed text-muted">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.landmark}
              <br />
              {siteConfig.address.locality}, {siteConfig.address.state} –{" "}
              {siteConfig.address.postalCode}
            </address>
          </Reveal>

          <Reveal delay={120} className="flex flex-wrap gap-x-8 gap-y-4 text-sm">
            <div>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted-light">
                Call
              </p>
              <a href={phoneHref} className="link-quiet mt-1 block text-ink">
                {siteConfig.phone.primary}
              </a>
              <a
                href={`tel:${siteConfig.phone.secondary.replace(/\s+/g, "")}`}
                className="link-quiet mt-1 block text-ink"
              >
                {siteConfig.phone.secondary}
              </a>
            </div>
            <div>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted-light">
                We speak
              </p>
              <p className="mt-1 text-ink">English · हिंदी · मराठी</p>
            </div>
          </Reveal>

          <Reveal delay={160} className="flex flex-wrap gap-4 pt-1">
            <Button href={phoneHref} arrow>
              Call Now
            </Button>
            <Button href={whatsappHref} variant="secondary">
              WhatsApp
            </Button>
            <Button href={siteConfig.googleMapsUrl} variant="ghost" arrow>
              Directions
            </Button>
          </Reveal>
        </div>

        <Reveal
          variant="fade"
          className="group overflow-hidden rounded-3xl border border-line transition-[border-color,box-shadow] duration-500 hover:border-champagne/50 hover:shadow-[0_28px_70px_-40px_rgba(34,29,20,0.45)]"
        >
          <iframe
            src={MAP_EMBED_SRC}
            title={`${siteConfig.name} location on Google Maps`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[360px] w-full grayscale-[0.2] transition-[filter] duration-500 group-hover:grayscale-0"
          />
        </Reveal>
      </Container>
    </Section>
  );
}
