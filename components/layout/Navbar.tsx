"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/brand/Wordmark";
import { MobileNav } from "@/components/layout/MobileNav";
import { NAV_LINKS, BOOK_EYE_TEST_HREF } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // At the top of the homepage the header floats transparently over the warm
  // ivory hero (dark ink text reads cleanly on it); once scrolled it settles
  // onto a frosted paper bar. Every other page is always the solid bar.
  const overlay = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 text-ink transition-colors duration-500",
        overlay
          ? "bg-transparent"
          : "border-b border-line/70 bg-paper/85 backdrop-blur-md",
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" aria-label="Ami Optics — home" className="transition-opacity hover:opacity-80">
          <Wordmark imgClassName="h-11 w-auto lg:h-12" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex lg:gap-12">
          {NAV_LINKS.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-quiet text-sm font-medium tracking-wide opacity-80 transition-opacity hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={BOOK_EYE_TEST_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 rounded-full bg-royal px-5 py-2.5 text-sm font-medium text-paper-bright transition-colors duration-300 hover:bg-ink lg:ml-2"
          >
            Book an Eye Test
          </a>
        </nav>

        <MobileNav links={NAV_LINKS} />
      </Container>
    </header>
  );
}
