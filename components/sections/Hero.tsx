"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  MotionConfig,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { OpenStatusBadge } from "@/components/layout/OpenStatusBadge";
import { BOOK_EYE_TEST_HREF } from "@/lib/constants";
import { googleRating } from "@/content/stats";

/**
 * Hero — "The First Look".
 *
 * Within five seconds a visitor should feel they can trust these people with
 * their eyes. The page opens in the warm ivory of the shop itself — bright,
 * welcoming, premium — with the two brothers as the emotional centre.
 *
 * The whole stage is engineered to live in a single viewport: the section is
 * exactly `min-h-[100svh]` (svh, so mobile address bars never cause a scroll),
 * its content fits without scrolling on a 1280×768 laptop, and on desktop it is
 * a 55 / 45 split — type left, brothers right.
 *
 * The portrait is no longer a framed card: it is graded bright and warm, then
 * dissolved into the page with a soft gradient mask on every meeting edge, so it
 * reads as part of the ivory canvas rather than a photo pasted on top.
 *
 * Colour law: Warm White dominates · Deep Charcoal carries the headline · Royal
 * Blue is the primary accent (the CTA, the eyebrow) · Champagne Gold is the
 * quiet premium highlight — the ambient key-light and the one stressed word.
 *
 * Motion is split so two engines never fight the same node:
 *   • GSAP         → the portrait: a one-time focus-resolve (blur→sharp) plus a
 *                    whisper of pointer parallax for depth. Calm, never showy.
 *   • Framer Motion → the foreground: a staggered, blurred-in reveal of type.
 */

// The new founders photo. NOTE: the file on disk is `.JPG` (uppercase) — keep
// this string matching the real filename exactly, because production (Linux) is
// case-sensitive even though Windows dev is not.
const HERO_POSTER = "/images/founders/brothers-hero.JPG";

/**
 * A still is the hero by design. To re-enable a moving hero, provide an H.264
 * .mp4 and set `HERO_VIDEO = { mp4: "/videos/hero.mp4" }`; the still becomes its
 * poster and inherits the same grade + dissolve.
 */
const HERO_VIDEO: { webm?: string; mp4?: string } | null = null;

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero() {
  const reduce = useReducedMotion();
  const groupRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // ----------------------------------------------------------------- GSAP
  // Focus-resolve on the portrait (the brothers settle into focus — the
  // optician's whole job) plus a barely-there pointer parallax on the group for
  // depth. Set in a layout effect so the "from" state paints first — no flash.
  useIsoLayoutEffect(() => {
    if (reduce) return;
    const group = groupRef.current;
    const card = cardRef.current;
    if (!group || !card) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    let onMove: ((e: PointerEvent) => void) | undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { scale: 1.05, filter: "blur(16px)", opacity: 0, y: 14 },
        {
          scale: 1,
          filter: "blur(0px)",
          opacity: 1,
          y: 0,
          duration: 1.9,
          ease: "power3.out",
        },
      );

      if (fine) {
        const xTo = gsap.quickTo(group, "x", { duration: 1.2, ease: "power3" });
        const yTo = gsap.quickTo(group, "y", { duration: 1.2, ease: "power3" });
        onMove = (e) => {
          xTo((e.clientX / window.innerWidth - 0.5) * 10);
          yTo((e.clientY / window.innerHeight - 0.5) * 7);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
      }
    }, group);

    return () => {
      ctx.revert();
      if (onMove) window.removeEventListener("pointermove", onMove);
    };
  }, [reduce]);

  // --------------------------------------------------------- Framer Motion
  const stack: Variants = {
    hidden: {},
    show: { transition: { delayChildren: 0.2, staggerChildren: 0.12 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.95, ease: EASE },
    },
  };
  const headline: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13 } },
  };

  return (
    <MotionConfig reducedMotion="user">
      {/* Hero-scoped photo dissolve. Kept local to this component so no global
          stylesheet is touched. Mobile: the photo melts into the page top and
          bottom (it sits full-bleed below the type). Desktop: it also dissolves
          on its left edge, into the gutter beside the headline, while its right
          edge bleeds solid off-screen. The head-room fade (6–7%) is shallow
          enough that it never touches the brothers' faces. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
.hero-photo-fade{
  -webkit-mask-image:linear-gradient(to bottom,transparent 0%,#000 7%,#000 88%,transparent 100%);
  mask-image:linear-gradient(to bottom,transparent 0%,#000 7%,#000 88%,transparent 100%);
}
@media (min-width:1024px){
  .hero-photo-fade{
    -webkit-mask-image:
      linear-gradient(to right,transparent 0%,#000 17%,#000 100%),
      linear-gradient(to bottom,transparent 0%,#000 6%,#000 85%,transparent 100%);
    -webkit-mask-composite:source-in;
    mask-image:
      linear-gradient(to right,transparent 0%,#000 17%,#000 100%),
      linear-gradient(to bottom,transparent 0%,#000 6%,#000 85%,transparent 100%);
    mask-composite:intersect;
  }
}`,
        }}
      />

      <section className="relative isolate -mt-20 flex min-h-[100svh] flex-col overflow-hidden bg-paper text-ink">
        {/* warm ambient field — an ivory base lifted with a soft champagne
            key-light behind the brothers and the faintest royal sink, so the
            page feels lit and deep without a trace of black */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(58%_52%_at_82%_28%,rgba(198,161,91,0.20),transparent_62%),radial-gradient(48%_48%_at_6%_96%,rgba(30,42,120,0.06),transparent_60%),linear-gradient(180deg,var(--color-paper-bright),var(--color-paper))]"
        />

        {/* The Container fills the viewport (minus the navbar it tucks under) and
            hands a single flexible row to the grid, so the photo can stretch to
            full height while the type stays vertically centred beside it. */}
        <Container className="relative flex w-full flex-1 flex-col pt-24 pb-12 lg:pb-10">
          <div className="grid flex-1 items-stretch gap-y-8 sm:gap-y-10 lg:grid-cols-[55fr_45fr] lg:gap-x-12">
            {/* ---- foreground type (Framer Motion) ---- */}
            <motion.div
              className="flex max-w-xl flex-col justify-center lg:pr-6"
              variants={stack}
              initial="hidden"
              animate="show"
            >
              {/* a quiet editorial kicker — a thin royal rule, no spectacle icon */}
              <motion.p
                variants={item}
                className="eyebrow eyebrow--marked text-royal"
              >
                Family Opticians · Virar · Est. 1996
              </motion.p>

              <motion.h1
                variants={headline}
                className="mt-5 font-display text-[length:clamp(2.3rem,1.05rem_+_3.3vw,3.5rem)] font-medium leading-[1.07] tracking-[-0.02em] text-balance text-ink sm:mt-6"
              >
                <motion.span variants={item} className="block">
                  Clear vision begins with
                </motion.span>
                <motion.span variants={item} className="block">
                  someone you can{" "}
                  <span className="italic text-champagne">trust</span>.
                </motion.span>
              </motion.h1>

              <motion.p
                variants={item}
                className="mt-5 max-w-md text-base leading-relaxed text-muted text-pretty sm:mt-6 sm:text-lg"
              >
                Honest eye care for Virar families, computerised testing and
                hand-fitted frames.
              </motion.p>

              <motion.div
                variants={item}
                className="mt-7 flex flex-col gap-3 sm:mt-8 md:flex-row md:items-center md:gap-4"
              >
                <Button
                  href={BOOK_EYE_TEST_HREF}
                  size="lg"
                  variant="primary"
                  arrow
                  className="w-full md:w-auto"
                >
                  Book an Eye Test
                </Button>
                <Button
                  href="/collections"
                  size="lg"
                  variant="secondary"
                  className="w-full md:w-auto"
                >
                  Explore the Collection
                </Button>
              </motion.div>

              {/* trust, established in the first five seconds — all real */}
              <motion.div
                variants={item}
                className="relative z-20 mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted sm:mt-8"
              >
                <span className="inline-flex items-center gap-2">
                  <span className="text-champagne">★★★★★</span>
                  <span className="font-medium text-ink">
                    {googleRating.rating.toFixed(1)}
                  </span>
                  <span>· {googleRating.count}+ Google reviews</span>
                </span>
                <span className="hidden h-4 w-px bg-line-strong sm:block" />
                <OpenStatusBadge className="text-muted" />
              </motion.div>
            </motion.div>

            {/* ---- the brothers, dissolved into the ivory (GSAP) ----
                Full-bleed below the type on mobile; on desktop it fills the
                right column's height and bleeds off the right edge, its other
                edges melting into the page via .hero-photo-fade. */}
            <div
              ref={groupRef}
              className="relative -mx-6 will-change-transform sm:-mx-8 lg:mx-0 lg:-mr-12 lg:h-full"
            >
              <div
                ref={cardRef}
                className="hero-photo-fade relative aspect-[13/10] w-full will-change-transform lg:aspect-auto lg:h-full"
              >
                {HERO_VIDEO ? (
                  <video
                    className="grade-portrait h-full w-full object-cover"
                    style={{ objectPosition: "50% 38%" }}
                    poster={HERO_POSTER}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  >
                    {HERO_VIDEO.webm ? (
                      <source src={HERO_VIDEO.webm} type="video/webm" />
                    ) : null}
                    {HERO_VIDEO.mp4 ? (
                      <source src={HERO_VIDEO.mp4} type="video/mp4" />
                    ) : null}
                  </video>
                ) : (
                  <Image
                    src={HERO_POSTER}
                    alt="Jignesh and Jatin Vora, founders of Ami Optics, Virar"
                    fill
                    priority
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="grade-portrait object-cover"
                    style={{ objectPosition: "50% 38%" }}
                  />
                )}
              </div>
            </div>
          </div>
        </Container>

        {/* scroll cue — centred at the foot of the hero so it never collides
            with the bottom-left trust strip (which keeps a higher z-index) */}
        <motion.a
          href="#story"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.2, ease: EASE }}
          className="group absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 text-muted transition-colors hover:text-ink lg:flex"
        >
          <span
            aria-hidden
            className="relative block h-10 w-px overflow-hidden bg-line-strong"
          >
            <span className="absolute inset-x-0 top-0 h-3 w-px animate-[scroll-cue_2.4s_ease-in-out_infinite] bg-royal" />
          </span>
          <span className="eyebrow">Our Story</span>
        </motion.a>
      </section>
    </MotionConfig>
  );
}
