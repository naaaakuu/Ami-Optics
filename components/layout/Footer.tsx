import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/brand/Wordmark";
import { siteConfig } from "@/content/site";
import { NAV_LINKS } from "@/lib/constants";
import { dayLabels, formatWindows } from "@/lib/hours";

export function Footer() {
  const phoneHref = `tel:${siteConfig.phone.primary.replace(/\s+/g, "")}`;
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`;

  return (
    <footer className="bg-ink text-paper">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="space-y-5 lg:col-span-4">
          <Wordmark showSince />
          <p className="max-w-xs text-sm leading-relaxed text-paper/65">
            A family optician in Virar since 1996 — honest eye care, quality
            eyewear and service that puts people first.
          </p>
          <p className="font-display text-lg italic text-champagne-soft">
            Clear vision. Honest advice.
          </p>
          <p lang="hi" className="font-display text-base text-paper/55">
            अमी ऑप्टिक्स · विरार
          </p>
        </div>

        <div className="space-y-3 text-sm text-paper/75 lg:col-span-3">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-paper/45">
            Visit Us
          </p>
          <address className="not-italic leading-relaxed">
            {siteConfig.address.street}
            <br />
            {siteConfig.address.landmark}
            <br />
            {siteConfig.address.locality}, {siteConfig.address.state} –{" "}
            {siteConfig.address.postalCode}
          </address>
          <a
            href={siteConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-quiet inline-block"
          >
            Get Directions
          </a>
        </div>

        <div className="space-y-3 text-sm text-paper/75 lg:col-span-2">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-paper/45">
            Contact
          </p>
          <a href={phoneHref} className="link-quiet block">
            {siteConfig.phone.primary}
          </a>
          <a
            href={`tel:${siteConfig.phone.secondary.replace(/\s+/g, "")}`}
            className="link-quiet block"
          >
            {siteConfig.phone.secondary}
          </a>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="link-quiet block">
            WhatsApp
          </a>
          <div className="flex gap-4 pt-1">
            {siteConfig.social.instagram && (
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="link-quiet">
                Instagram
              </a>
            )}
            {siteConfig.social.facebook && (
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="link-quiet">
                Facebook
              </a>
            )}
          </div>
        </div>

        <div className="space-y-3 text-sm text-paper/75 lg:col-span-3">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-paper/45">
            Hours
          </p>
          <ul className="space-y-1">
            {siteConfig.hours.map((entry) => (
              <li key={entry.day} className="flex justify-between gap-4">
                <span>{dayLabels[entry.day]}</span>
                <span className="text-right text-paper/55">
                  {formatWindows(entry.windows)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col items-center justify-between gap-4 border-t border-paper/10 py-6 text-xs text-paper/55 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-paper">
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>

      {/* crafted-by credit — subtle but proportional to the brand */}
      <Container className="border-t border-paper/10 py-6">
        <p className="text-center text-sm tracking-wide text-paper/55">
          {/* TODO: Wrap "Nakul Vora" in a link once his portfolio/email is confirmed */}
          Crafted by <span className="text-paper/75">Nakul Vora</span>
          <span aria-hidden className="mx-2 text-paper/30">|</span>
          {new Date().getFullYear()}
        </p>
      </Container>
    </footer>
  );
}
