"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import { frameCategories } from "@/content/frames";

/**
 * Frames Explorer — an interactive gallery where each of the eight frame
 * families gets its own hero moment, matching the Lens Lab's cinematic
 * quality. Desktop: large image stage left, detail panel right, crossfade
 * between families. Mobile: full-width stage, swipe-navigable, detail below.
 * All eight images stay mounted (stacked, opacity-crossfaded) so switching
 * is instant after first load; motion is CSS-only and reduced-motion aware
 * via the global rules.
 */

function ArrowIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-4 w-4"
    >
      {direction === "prev" ? <path d="M15 5 8 12l7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  );
}

export function FramesSection() {
  const count = frameCategories.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number, dir: 1 | -1) => {
      setDirection(dir);
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const goNext = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) goNext();
    else goPrev();
  }

  const active = frameCategories[index];

  return (
    <Section id="frames" className="bg-paper">
      <Container>
        {/* Heading block — left ~55% headline, right ~45% subtitle + link */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
          <Reveal className="max-w-2xl md:w-[55%]">
            <p className="eyebrow text-royal" style={{ letterSpacing: "0.12em" }}>
              Explore Frames
            </p>
            <Heading as="h2" size="display" className="mt-6 max-w-[16ch]">
              Hundreds of frames. One that&apos;s yours.
            </Heading>
          </Reveal>
          <Reveal delay={150} className="max-w-md md:w-[42%] md:pb-2">
            <p className="text-muted text-pretty">
              Every face, every budget, and honest, unhurried help finding the
              pair that feels like it was made for you.
            </p>
            <Link
              href="/collections"
              className="link-quiet mt-5 text-sm font-medium text-royal"
            >
              See all frames <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>

        <Reveal variant="focus" className="mt-14 md:mt-16">
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Frame styles"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="frames-gallery grid items-stretch gap-6 rounded-[2rem] border border-line bg-paper-bright p-4 shadow-[0_36px_90px_-48px_rgba(34,29,20,0.4)] sm:p-5 lg:grid-cols-[3fr_2fr] lg:gap-0 lg:p-0"
          >
            {/* ---- Stage — the frame's hero moment ---- */}
            <div
              className="group/stage relative overflow-hidden rounded-3xl bg-white lg:rounded-l-[2rem] lg:rounded-r-none"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[30rem]">
                {frameCategories.map((frame, i) => (
                  <Image
                    key={frame.name}
                    src={frame.image}
                    alt={i === index ? frame.alt : ""}
                    aria-hidden={i !== index}
                    fill
                    sizes="(min-width: 1024px) 55vw, 92vw"
                    className={cn(
                      "object-contain p-8 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-12",
                      i === index
                        ? "scale-100 opacity-100 group-hover/stage:scale-[1.03]"
                        : "pointer-events-none scale-[0.97] opacity-0",
                    )}
                  />
                ))}

                {/* index label, echoing the Lens Lab's exhibit numbering */}
                <span
                  aria-hidden
                  className="absolute left-5 top-5 font-mono text-[0.7rem] tracking-[0.2em] text-champagne sm:left-6 sm:top-6"
                >
                  {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* ---- Detail panel ---- */}
            <div className="flex flex-col justify-between gap-8 px-2 pb-2 sm:px-3 sm:pb-3 lg:p-10 xl:p-12">
              {/* keyed so the copy replays the light slide-in on every change */}
              <div
                key={index}
                aria-live="polite"
                style={{ "--carousel-offset": `${direction * 24}px` } as React.CSSProperties}
                className="animate-[carousel-in_0.4s_ease_both]"
              >
                <h3 className="font-display text-3xl text-ink xl:text-4xl">
                  {active.name}
                </h3>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-muted text-pretty">
                  {active.note}
                </p>
                <ul className="mt-5 flex list-none flex-wrap gap-2">
                  {active.tags.map((tag) => (
                    <li
                      key={tag}
                      className="inline-flex items-center rounded-full border border-champagne/45 bg-paper px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-champagne"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {/* family selector — every style one tap away */}
                <div aria-label="Choose a frame style" className="flex flex-wrap gap-2">
                  {frameCategories.map((frame, i) => (
                    <button
                      key={frame.name}
                      type="button"
                      aria-current={i === index}
                      onClick={() => goTo(i, i > index ? 1 : -1)}
                      className={cn(
                        "min-h-11 rounded-full border px-4 py-2 text-sm transition-[background-color,border-color,color,transform] duration-200 ease-out hover:-translate-y-0.5",
                        i === index
                          ? "border-royal bg-royal text-paper-bright"
                          : "border-line bg-paper text-muted hover:border-line-strong hover:text-ink",
                      )}
                    >
                      {frame.name}
                    </button>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-line pt-6">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous frame style"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-ink transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-royal hover:text-royal"
                  >
                    <ArrowIcon direction="prev" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next frame style"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-ink transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-royal hover:text-royal"
                  >
                    <ArrowIcon direction="next" />
                  </button>
                  <p className="ml-auto hidden text-sm text-muted-light sm:block lg:hidden xl:block">
                    Swipe or use arrow keys
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
