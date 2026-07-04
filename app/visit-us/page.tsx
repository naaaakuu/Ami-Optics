import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { OpenStatusBadge } from "@/components/layout/OpenStatusBadge";
import { siteConfig } from "@/content/site";
import { dayLabels, formatWindows } from "@/lib/hours";
import { MAP_EMBED_SRC } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Visit Us",
  description: `Address, hours, and directions for ${siteConfig.name} in ${siteConfig.address.locality}, ${siteConfig.address.city}.`,
  alternates: { canonical: "/visit-us" },
};

export default function VisitUsPage() {
  const phoneHref = `tel:${siteConfig.phone.primary.replace(/\s+/g, "")}`;
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`;

  return (
    <Section className="bg-paper">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-10">
          <div>
            <Heading as="h1" size="lg">
              Visit Us
            </Heading>
            <div className="mt-4">
              <OpenStatusBadge />
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg text-ink">Address</h2>
            <address className="mt-2 not-italic leading-relaxed text-muted">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.landmark}
              <br />
              {siteConfig.address.locality}, {siteConfig.address.city}
              <br />
              {siteConfig.address.state} – {siteConfig.address.postalCode}
            </address>
          </div>

          <div>
            <h2 className="font-display text-lg text-ink">Hours</h2>
            <ul className="mt-2 space-y-1 text-muted">
              {siteConfig.hours.map((entry) => (
                <li key={entry.day} className="flex justify-between gap-4">
                  <span>{dayLabels[entry.day]}</span>
                  <span>{formatWindows(entry.windows)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button href={phoneHref}>Call Now</Button>
            <Button href={whatsappHref} variant="secondary">
              Chat on WhatsApp
            </Button>
            <Button href={siteConfig.googleMapsUrl} variant="secondary">
              Get Directions
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border/60">
          <iframe
            src={MAP_EMBED_SRC}
            title={`${siteConfig.name} location on Google Maps`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[420px] w-full"
          />
        </div>
      </Container>
    </Section>
  );
}
