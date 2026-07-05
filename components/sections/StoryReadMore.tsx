"use client";

import { useId, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/**
 * The second and third origin paragraphs, plus the name-story blockquote —
 * collapsed behind "Read more" on mobile only (below Tailwind's `md`, 768px)
 * so the section doesn't read as a wall of text before the rest of the
 * homepage. Tablet and up always render this fully expanded, no button (see
 * the `md:` overrides on `.story-reveal` in globals.css and on the button
 * below) — desktop is untouched by this component's state.
 *
 * Uses the same zero-JS-height grid-rows trick as `.faq-answer`, so reduced
 * motion resolves it instantly via the existing global rule.
 */
export function StoryReadMore({
  paragraphs,
  quote,
}: {
  paragraphs: string[];
  quote: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <>
      <div id={panelId} className="story-reveal" data-open={open}>
        <div>
          <div className="space-y-5">
            {paragraphs.map((para, i) => (
              <Reveal key={i} delay={(i + 1) * 90} forceVisible={open}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120} forceVisible={open}>
            <blockquote className="mt-8 max-w-xl border-l-2 border-champagne pl-5 font-display text-xl italic leading-snug text-ink">
              {quote}
            </blockquote>
          </Reveal>
        </div>
      </div>

      {/* wrapper carries md:hidden — .link-quiet hardcodes its own
          `display`, which (being unlayered custom CSS) always outranks a
          layered Tailwind utility like md:hidden on the same element */}
      <div className="md:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="link-quiet gap-1.5 text-sm font-medium text-royal"
        >
          {open ? "Read less" : "Read more"}
          <span
            aria-hidden
            className={cn(
              "transition-transform duration-300",
              open && "rotate-180",
            )}
          >
            ↓
          </span>
        </button>
      </div>
    </>
  );
}
