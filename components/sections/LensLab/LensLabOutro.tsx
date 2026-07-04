"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/content/site";

/**
 * LensLabOutro — the calm closing screen after the six exhibits.
 * Education has happened; now we offer the one honest next step (Constitution
 * Ch 5.10) without pressure. Light, warm, uncluttered.
 */

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const stack: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.05, staggerChildren: 0.12 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(5px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE },
  },
};

export function LensLabOutro() {
  const reduce = useReducedMotion();
  const phoneHref = `tel:${siteConfig.phone.primary.replace(/\s+/g, "")}`;
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`;

  return (
    <section
      aria-labelledby="lenslab-outro-title"
      className="relative isolate flex min-h-[100svh] items-center bg-[linear-gradient(180deg,var(--color-paper-dim),var(--color-paper)_42%,var(--color-paper-bright))] py-24 text-ink"
    >
      <Container className="relative">
        <motion.div
          variants={stack}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <motion.p
            variants={item}
            className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.32em] text-champagne"
          >
            One Honest Recommendation
          </motion.p>

          <motion.h2
            variants={item}
            id="lenslab-outro-title"
            className="mt-7 font-display text-[length:clamp(2.25rem,1.2rem_+_3.4vw,3.85rem)] font-medium leading-[1.05] tracking-[-0.025em] text-balance text-ink"
          >
            Not sure which lens is right for you?
          </motion.h2>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-[540px] text-base leading-relaxed text-muted text-pretty sm:text-lg"
          >
            Visit us in Virar — we&apos;ll test your eyes and recommend exactly
            what suits your prescription, lifestyle and budget.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center gap-5 sm:flex-row sm:gap-6"
          >
            <Button href={phoneHref} size="lg" variant="primary" arrow>
              Book an Eye Test
            </Button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="link-quiet text-[0.95rem] font-medium text-ink transition-colors hover:text-royal"
            >
              Or WhatsApp us
              <span aria-hidden>→</span>
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
