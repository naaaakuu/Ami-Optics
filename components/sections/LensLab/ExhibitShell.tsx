"use client";

import type { ReactElement } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import {
  ScreenIcon,
  LensIcon,
  SunIcon,
  FeatherIcon,
  GlareIcon,
  WaveIcon,
  CheckIcon,
} from "@/components/brand/Icons";
import type { ExhibitIconKey, LensLabExhibit } from "@/content/lensLab";

/**
 * Shared layout for every lens exhibit.
 *
 * Desktop: a 50/50 split — editorial copy on the LEFT, the interactive
 * animation on the RIGHT. Crucially the exhibit fills its carousel slide
 * EXACTLY (`lg:h-full`) and never grows past it: the copy keeps its natural
 * height and the animation absorbs whatever vertical space is left over (its
 * box is `flex-1`). That way each slide is a self-contained, fully-visible
 * "chapter" with ZERO internal scrolling, whatever the laptop height — the
 * animation shrinks on shorter viewports, but the "Best for" line and the
 * control never move below the fold.
 * Mobile: the animation comes FIRST (full width), copy below; the slide may
 * scroll internally there (accepted fallback), so the section is free to grow.
 *
 * The copy is structured to be scannable in one glance — label (+ trust badge),
 * the problem named in the headline, the fix in the royal solution line, then
 * the explanation and who it suits. It reveals as the exhibit scrolls into view
 * (calm, one idea at a time — Constitution Law 8); reduced motion resolves it
 * instantly.
 */

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const stack: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.04, staggerChildren: 0.08 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(5px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

const exhibitIcons: Record<ExhibitIconKey, (p: { className?: string }) => ReactElement> = {
  screen: ScreenIcon,
  lens: LensIcon,
  sun: SunIcon,
  feather: FeatherIcon,
  glare: GlareIcon,
  wave: WaveIcon,
};

export function ExhibitShell({
  exhibit,
  children,
}: {
  exhibit: LensLabExhibit;
  /** The interactive animation (canvas / SVG) for this exhibit. */
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const Icon = exhibitIcons[exhibit.icon];

  return (
    <section
      id={`lens-${exhibit.id}`}
      aria-labelledby={`lens-${exhibit.id}-title`}
      className="relative isolate flex min-h-full w-full items-center py-6 sm:py-7 lg:h-full lg:py-8"
      style={{ background: exhibit.tone }}
    >
      <Container className="relative w-full lg:h-full">
        <div className="grid w-full items-center gap-x-14 gap-y-6 lg:h-full lg:grid-cols-2">
          {/* ── Animation — DOM-first so it sits on top on mobile, right on desktop.
              On desktop the column fills the slide height so the animation box's
              flex-1 can consume the space the copy doesn't. ── */}
          <div className="order-1 min-h-0 lg:order-2 lg:h-full">{children}</div>

          {/* ── Copy ─────────────────────────────────────────────────────────── */}
          <motion.div
            variants={stack}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="order-2 min-h-0 max-w-xl lg:order-1"
          >
            {/* label + trust badge (top) */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-x-3 gap-y-2.5">
              <span className="inline-flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.08em] text-champagne">
                <Icon className="h-4 w-4" />
                {exhibit.name.toUpperCase()} LENSES
              </span>
              {exhibit.badge ? (
                <>
                  <span aria-hidden className="hidden h-1 w-1 rounded-full bg-champagne/50 sm:block" />
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-champagne/40 bg-champagne/10 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-champagne">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-champagne" />
                    {exhibit.badge}
                  </span>
                </>
              ) : null}
            </motion.div>

            {/* problem-naming headline */}
            <motion.h3
              variants={item}
              id={`lens-${exhibit.id}-title`}
              className="mt-4 font-display text-[length:clamp(1.9rem,1rem_+_2.4vw,3rem)] font-medium leading-[1.07] tracking-[-0.02em] text-balance text-ink"
            >
              {exhibit.headline}
            </motion.h3>

            {/* solution line */}
            <motion.p
              variants={item}
              className="mt-2.5 font-display text-[length:clamp(1.2rem,0.9rem_+_0.9vw,1.45rem)] font-medium leading-snug text-royal"
            >
              {exhibit.solution}
            </motion.p>

            {/* body */}
            <motion.p
              variants={item}
              className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-muted text-pretty"
            >
              {exhibit.body}
            </motion.p>

            {/* best for */}
            <motion.p
              variants={item}
              className="mt-5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[0.95rem] italic text-champagne"
            >
              <span className="inline-flex items-center gap-1.5 text-[0.66rem] font-bold uppercase not-italic tracking-[0.16em] text-muted-light">
                <CheckIcon className="h-4 w-4 text-royal" />
                Best for
              </span>
              <span>{exhibit.bestFor}</span>
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
