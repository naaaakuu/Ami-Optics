"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";

/**
 * A quiet "Back to Home" affordance shown on every page except the homepage.
 * It sits just below the fixed navbar, top-left, so a visitor on any sub-page
 * always has a clear one-tap route home. The global Navbar still carries full
 * navigation; this is the extra reassurance the brief asked for.
 */
export function BackToHome() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <Container className="pt-4">
      <Link
        href="/"
        className="link-quiet inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-royal"
      >
        <span aria-hidden className="text-base leading-none">
          ←
        </span>
        Back to Home
      </Link>
    </Container>
  );
}
