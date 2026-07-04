"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/motion/Reveal";
import { QuoteIcon } from "@/components/brand/Icons";
import { cn } from "@/lib/utils";
import { testimonials } from "@/content/testimonials";
import { googleRating } from "@/content/stats";

const AUTO_ADVANCE_MS = 6000;

function Stars({ className }: { className?: string }) {
  return (
    <span className={className} aria-label="5 out of 5 stars">
      {"★★★★★"}
    </span>
  );
}

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

export function StoriesSection() {
  const count = testimonials.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const autoAdvanceRef = useRef(true);
  const [hovering, setHovering] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number, dir: 1 | -1, manual: boolean) => {
      if (manual) autoAdvanceRef.current = false;
      setDirection(dir);
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const goNext = useCallback(
    (manual = true) => goTo(index + 1, 1, manual),
    [goTo, index],
  );
  const goPrev = useCallback(
    (manual = true) => goTo(index - 1, -1, manual),
    [goTo, index],
  );

  useEffect(() => {
    if (!autoAdvanceRef.current || hovering) return;
    const id = setInterval(() => {
      if (!autoAdvanceRef.current) return;
      setDirection(1);
      setIndex((i) => (i + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [index, hovering, count]);

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

  const t = testimonials[index];

  return (
    <Section id="reviews" className="relative isolate bg-paper-dim">
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-champagne">Customer Stories</p>
            <Heading as="h2" size="display" className="mt-6 max-w-[18ch] text-ink">
              Trust, earned over years. Not advertisements.
            </Heading>
          </div>
          <div className="flex shrink-0 items-center gap-3 rounded-full border border-line bg-paper-bright px-5 py-3">
            <Stars className="text-champagne" />
            <span className="text-sm text-muted">
              <span className="font-medium text-ink">{googleRating.rating.toFixed(1)}</span>{" "}
              · {googleRating.count}+ Google reviews
            </span>
          </div>
        </Reveal>

        <Reveal variant="focus" className="mt-14">
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Customer reviews"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="flex flex-col items-center gap-6 md:flex-row md:justify-center"
          >
            <button
              type="button"
              onClick={() => goPrev()}
              aria-label="Previous review"
              className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-paper-bright text-ink transition-colors hover:border-royal hover:text-royal md:flex"
            >
              <ArrowIcon direction="prev" />
            </button>

            <div
              className="w-full max-w-[680px]"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <figure
                key={index}
                role="group"
                aria-roledescription="slide"
                aria-label={`Review ${index + 1} of ${count}`}
                style={{ "--carousel-offset": `${direction * 24}px` } as React.CSSProperties}
                className="relative overflow-hidden rounded-3xl border border-champagne/35 bg-paper-bright p-8 shadow-[0_20px_60px_-30px_rgba(22,18,11,0.25)] sm:p-12 animate-[carousel-in_0.4s_ease_both]"
              >
                {t.featured ? (
                  <span className="absolute right-6 top-6 rounded-full bg-champagne px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink">
                    Featured story
                  </span>
                ) : null}

                <QuoteIcon className="h-8 w-8 text-champagne" />
                <Stars className="mt-5 block text-sm text-champagne" />
                <blockquote className="mt-4 font-display text-[1.15rem] italic leading-relaxed text-ink">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="font-medium text-ink">{t.name}</span>
                  <span className="text-[0.75rem] text-muted">via Google</span>
                </figcaption>

                {t.note ? (
                  <p className="mt-5 border-t border-line pt-5 font-display text-base italic text-muted">
                    {t.note}
                  </p>
                ) : null}
              </figure>

              <div className="mt-6 flex items-center justify-center gap-4 md:hidden">
                <button
                  type="button"
                  onClick={() => goPrev()}
                  aria-label="Previous review"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper-bright text-ink transition-colors hover:border-royal hover:text-royal"
                >
                  <ArrowIcon direction="prev" />
                </button>
                <button
                  type="button"
                  onClick={() => goNext()}
                  aria-label="Next review"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper-bright text-ink transition-colors hover:border-royal hover:text-royal"
                >
                  <ArrowIcon direction="next" />
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2">
                {testimonials.map((item, i) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => goTo(i, i > index ? 1 : -1, true)}
                    aria-label={`Go to review ${i + 1}`}
                    aria-current={i === index}
                    className={cn(
                      "h-2 w-2 rounded-full border transition-colors",
                      i === index
                        ? "border-champagne bg-champagne"
                        : "border-ink/25 bg-transparent hover:border-ink/45",
                    )}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => goNext()}
              aria-label="Next review"
              className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-paper-bright text-ink transition-colors hover:border-royal hover:text-royal md:flex"
            >
              <ArrowIcon direction="next" />
            </button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
