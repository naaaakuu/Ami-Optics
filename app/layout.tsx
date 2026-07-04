import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { SkipLink } from "@/components/layout/SkipLink";
import { Navbar } from "@/components/layout/Navbar";
import { BackToHome } from "@/components/layout/BackToHome";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/content/site";
import { getOpticianJsonLd, getSiteUrl } from "@/lib/seo";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOpticianJsonLd()),
          }}
        />
        <SkipLink />
        <Navbar />
        <main id="main-content" className="flex-1 pt-20">
          <BackToHome />
          {children}
        </main>
        <Footer />
        <GoogleAnalytics gaID="G-LKFSQBFN4B" />
      </body>
    </html>
  );
}
