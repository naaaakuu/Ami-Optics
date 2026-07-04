"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type NavLink = {
  href: string;
  label: string;
};

export function MobileNav({ links }: { links: readonly NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={cn(
            "h-px w-6 bg-current transition-transform duration-300",
            isOpen && "translate-y-[3px] rotate-45",
          )}
        />
        <span
          className={cn(
            "h-px w-6 bg-current transition-transform duration-300",
            isOpen && "-translate-y-[3px] -rotate-45",
          )}
        />
      </button>

      <div
        id="mobile-nav-panel"
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-paper transition-opacity duration-300",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="font-display text-3xl text-ink"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
