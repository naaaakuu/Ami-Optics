import { siteConfig } from "@/content/site";
import { googleRating } from "@/content/stats";

const schemaDayNames: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export function getOpticianJsonLd() {
  const baseUrl = getSiteUrl();

  const openingHoursSpecification = siteConfig.hours
    .filter((entry) => entry.windows.length > 0)
    .flatMap((entry) =>
      entry.windows.map((slot) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${schemaDayNames[entry.day]}`,
        opens: slot.opens,
        closes: slot.closes,
      })),
    );

  const sameAs = Object.values(siteConfig.social).filter(
    (url): url is string => Boolean(url),
  );

  return {
    "@context": "https://schema.org",
    "@type": "Optician",
    name: siteConfig.name,
    description: siteConfig.description,
    url: baseUrl,
    telephone: siteConfig.phone.primary,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.street}, ${siteConfig.address.landmark}`,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    openingHoursSpecification,
    sameAs,
    hasMap: siteConfig.googleMapsUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: googleRating.rating,
      reviewCount: googleRating.count,
      bestRating: 5,
      worstRating: 1,
    },
  };
}
