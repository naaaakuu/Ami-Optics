"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import {
  motion,
  MotionConfig,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import {
  EyeIcon,
  FrameIcon,
  LensIcon,
  CutIcon,
  FitIcon,
  CheckIcon,
} from "@/components/brand/Icons";
import { journeySteps, type JourneyStep } from "@/content/journey";

/**
 * EyeCareJourney — "The Ami Optics Way" (Homepage Section 3).
 *
 * Six steps resolve one by one as you scroll. On desktop, the right column
 * shows a sticky video panel that switches to the clip for whichever step is
 * currently most visible in the viewport — using IntersectionObserver so the
 * Framer Motion entrance animations are unaffected.
 *
 * Colour: deliberately light — warm ivory canvas, charcoal text, champagne
 * accent on step labels and icon medallions, royal blue on the eyebrow.
 * No dark backgrounds. The video panel itself may show real shop footage
 * but lives inside a warm-cream card, not a dark overlay.
 *
 * Accessibility: videos are muted, decorative, and aria-hidden; the section
 * reads fully without them. Under prefers-reduced-motion, the video pauses
 * and all entrance animations resolve instantly (handled by MotionConfig).
 */

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const icons: Record<
  JourneyStep["icon"],
  (p: { className?: string }) => ReactElement
> = {
  eye: EyeIcon,
  frame: FrameIcon,
  lens: LensIcon,
  cut: CutIcon,
  fit: FitIcon,
  check: CheckIcon,
};

const headStack: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.05, staggerChildren: 0.12 } },
};
const headItem: Variants = {
  hidden: { opacity: 0, y: -12, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

const stepItem: Variants = {
  hidden: { opacity: 0, y: -18, filter: "blur(5px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: i === journeySteps.length - 1 ? 0.95 : 0.7,
      ease: EASE,
    },
  }),
};

const iconItem: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

export function EyeCareJourney() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  // Switch the panel video whenever a step enters the viewport (independent
  // of the Framer Motion entrance animations which use their own viewport).
  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(i);
        },
        { threshold: 0.45, rootMargin: "-5% 0px -5% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  const currentVideoSrc = journeySteps[activeStep]?.video ?? journeySteps[0].video;

  // Play the clip once the browser has buffered enough to start.
  // Calling .play() immediately after .load() fails silently — the video
  // isn't ready yet. Listening for 'canplay' first is the reliable fix.
  // The interaction listeners act as a fallback for strict autoplay policies.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playWhenReady = () => {
      video.play().catch(() => {});
    };

    // Register before .load() so we never miss the event.
    video.addEventListener('canplay', playWhenReady, { once: true });
    video.load();

    // Fallback: retry on first user interaction in case 'canplay' fired
    // before the listener was attached (e.g. cached video).
    const handleInteraction = () => {
      video.play().catch(() => {});
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('scroll', handleInteraction, { passive: true });
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction, { passive: true });

    return () => {
      video.removeEventListener('canplay', playWhenReady);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [currentVideoSrc]);

  // Mirror the desktop playback logic for the mobile video panel.
  useEffect(() => {
    const video = mobileVideoRef.current;
    if (!video) return;

    const playWhenReady = () => {
      video.play().catch(() => {});
    };

    video.addEventListener('canplay', playWhenReady, { once: true });
    video.load();

    const handleInteraction = () => {
      video.play().catch(() => {});
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('scroll', handleInteraction, { passive: true });
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction, { passive: true });

    return () => {
      video.removeEventListener('canplay', playWhenReady);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [currentVideoSrc]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="journey"
        className="relative isolate bg-paper py-[var(--section-py-mobile)] text-ink md:py-[var(--section-py-desktop)]"
      >
        {/* warm section background — always visible, no dark overlay */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,var(--color-paper-bright),var(--color-paper)_58%,var(--color-paper-dim))]"
        />

        <Container className="relative">

          {/* ── MOBILE: full-width video panel above steps ──────────────── */}
          <div className="lg:hidden mb-10 overflow-hidden rounded-xl" style={{ backgroundColor: '#1a1a1a' }}>
            <div className="relative w-full aspect-video">
              {/* step label */}
              <div className="absolute left-0 right-0 top-0 z-10 flex items-center gap-3 bg-gradient-to-b from-black/60 to-transparent px-4 py-3">
                <span className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.22em] text-champagne">
                  Step {String(activeStep + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-white/20" aria-hidden />
                <span className="font-display text-sm text-paper">
                  {journeySteps[activeStep].title}
                </span>
              </div>
              <div style={{ width: '100%', height: '100%', backgroundColor: '#000000' }}>
                <video
                  key={currentVideoSrc}
                  ref={mobileVideoRef}
                  aria-hidden
                  muted
                  loop
                  playsInline
                  preload="auto"
                  src={currentVideoSrc}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              {/* progress dots */}
              <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5" aria-hidden>
                {journeySteps.map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 rounded-full transition-all duration-300 ${
                      i === activeStep ? "w-6 bg-champagne" : "w-1.5 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-y-12 lg:grid-cols-[3fr_2fr] lg:gap-x-14">

            {/* ── LEFT: heading + six steps ───────────────────────────── */}
            <div>
              <motion.div
                variants={headStack}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                className="max-w-2xl text-center lg:text-left"
              >
                <motion.div
                  variants={headItem}
                  className="flex flex-col items-center gap-2 lg:items-start"
                >
                  <span className="eyebrow text-royal">The Ami Optics Way</span>
                  <span aria-hidden className="h-px w-6 bg-champagne" />
                </motion.div>
                <motion.h2
                  variants={headItem}
                  className="mt-6 font-display text-[length:clamp(2.25rem,1rem_+_3vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.02em] text-balance text-ink"
                >
                  From Blurred to Brilliantly Clear.
                </motion.h2>
                <motion.p
                  variants={headItem}
                  className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted text-pretty sm:text-lg lg:mx-0"
                >
                  Six unhurried steps, the same every time — because the right
                  pair is never an accident.
                </motion.p>
              </motion.div>

              <ol className="mx-auto mt-14 max-w-xl space-y-8 sm:space-y-10 lg:mx-0">
                {journeySteps.map((step, i) => {
                  const Icon = icons[step.icon];
                  return (
                    <motion.li
                      key={step.title}
                      ref={(el) => {
                        stepRefs.current[i] = el as HTMLElement | null;
                      }}
                      custom={i}
                      variants={stepItem}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.5 }}
                      className="group flex items-start gap-4 sm:gap-5"
                    >
                      <motion.span
                        variants={iconItem}
                        className="relative flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14"
                      >
                        <span
                          aria-hidden
                          className="absolute inset-[-22%] rounded-full bg-[radial-gradient(circle,rgba(198,161,91,0.22),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                        <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-paper-bright text-champagne shadow-[0_12px_30px_-16px_rgba(34,29,20,0.45)] ring-1 ring-champagne/30 transition-transform duration-500 group-hover:scale-105 sm:h-14 sm:w-14">
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        </span>
                      </motion.span>

                      <div className="pt-1">
                        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-champagne">
                          Step 0{i + 1}
                        </p>
                        <h3 className="mt-1.5 font-display text-[1.4rem] font-medium leading-snug text-ink sm:text-[1.55rem]">
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-md text-[0.98rem] leading-relaxed text-muted text-pretty">
                          {step.description}
                        </p>
                      </div>
                    </motion.li>
                  );
                })}
              </ol>
            </div>

            {/* ── RIGHT: sticky video panel (desktop only) ────────────── */}
            <div className="hidden lg:block">
              {/* Explicit dimensions so the video has a real box to fill.
                  overflow-hidden is on this inner div, NOT the section, so
                  sticky still works (overflow-hidden on an ancestor kills it). */}
              <div
                className="sticky top-0 overflow-hidden"
                style={{ minHeight: 500, height: '100vh', backgroundColor: '#1a1a1a' }}
              >
                {/* step label — floated above the video */}
                <div className="absolute left-0 right-0 top-0 z-10 flex items-center gap-3 bg-gradient-to-b from-black/60 to-transparent px-5 py-4">
                  <span className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.22em] text-champagne">
                    Step {String(activeStep + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-white/20" aria-hidden />
                  <span className="font-display text-sm text-paper">
                    {journeySteps[activeStep].title}
                  </span>
                </div>

                {/* video container */}
                <div style={{ width: '100%', height: '100%', backgroundColor: '#000000' }}>
                  <video
                    key={currentVideoSrc}
                    ref={videoRef}
                    aria-hidden
                    muted
                    loop
                    playsInline
                    preload="auto"
                    src={currentVideoSrc}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* progress dots — anchored to the bottom */}
                <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-1.5" aria-hidden>
                  {journeySteps.map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 rounded-full transition-all duration-300 ${
                        i === activeStep
                          ? "w-6 bg-champagne"
                          : "w-1.5 bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </MotionConfig>
  );
}
