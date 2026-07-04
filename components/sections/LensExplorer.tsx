"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/motion/Reveal";
import { LensDemo } from "@/components/sections/LensDemo";
import { ScreenIcon, RoadIcon, SunIcon, FeatherIcon } from "@/components/brand/Icons";
import { lenses, type LensKey } from "@/content/lenses";
import { cn } from "@/lib/utils";

const tabIcons: Record<LensKey, (p: { className?: string }) => React.ReactElement> = {
  "blue-cut": ScreenIcon,
  progressive: RoadIcon,
  photochromic: SunIcon,
  "high-index": FeatherIcon,
};

export function LensExplorer() {
  const [active, setActive] = useState<LensKey>("blue-cut");
  const lens = lenses.find((l) => l.key === active)!;

  return (
    <Section id="lenses" className="grain relative isolate bg-ink text-paper">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="eyebrow eyebrow--marked text-champagne-soft">
            Discover Your Lens
          </p>
          <Heading as="h2" size="display" className="mt-6 max-w-[16ch]">
            Don&apos;t just read it. See it.
          </Heading>
          <p className="mt-5 max-w-lg text-paper/70">
            The lens matters more than most people realise. Here&apos;s what each
            one actually does — shown, not just told.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* tabs */}
          <div className="flex flex-col gap-3">
            {lenses.map((l) => {
              const Icon = tabIcons[l.key];
              const selected = l.key === active;
              return (
                <button
                  key={l.key}
                  type="button"
                  onClick={() => setActive(l.key)}
                  aria-pressed={selected}
                  className={cn(
                    "group flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors duration-300",
                    selected
                      ? "border-champagne/60 bg-ink-700"
                      : "border-paper/12 hover:border-paper/30",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors",
                      selected ? "border-champagne/50 text-champagne" : "border-paper/20 text-paper/70",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display text-lg text-paper">{l.name}</span>
                    <span className="text-sm text-paper/55">{l.tagline}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* demo panel */}
          <div
            key={active}
            className="rounded-3xl border border-paper/12 bg-ink-700/60 p-7 sm:p-9"
            style={{ animation: "fade-in 0.5s ease-out both" }}
          >
            <LensDemo lens={active} />
            <div className="mt-7 border-t border-paper/10 pt-6">
              <h3 className="font-display text-2xl text-paper">{lens.name} Lenses</h3>
              <p className="mt-3 text-paper/75">{lens.description}</p>
              <p className="mt-4 inline-flex items-start gap-2 text-sm text-champagne-soft">
                <span className="mt-px font-mono text-[0.7rem] uppercase tracking-[0.18em] text-paper/45">
                  Best for
                </span>
                <span className="text-paper/80">{lens.whoFor}</span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
