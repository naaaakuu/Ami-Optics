"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/motion/Reveal";
import {
  EyeIcon,
  FrameIcon,
  LensIcon,
  CutIcon,
  FitIcon,
  CheckIcon,
} from "@/components/brand/Icons";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { journeySteps, type JourneyStep } from "@/content/journey";

const icons: Record<JourneyStep["icon"], (p: { className?: string }) => React.ReactElement> = {
  eye: EyeIcon,
  frame: FrameIcon,
  lens: LensIcon,
  cut: CutIcon,
  fit: FitIcon,
  check: CheckIcon,
};

export function JourneySection() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  return (
    <Section id="journey" className="bg-paper-dim">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow eyebrow--marked justify-center text-royal">
            The Ami Optics Way
          </p>
          <Heading as="h2" size="display" className="mx-auto mt-6 max-w-[14ch]">
            From blurred to brilliantly clear.
          </Heading>
          <p className="mx-auto mt-5 max-w-lg text-muted">
            Six unhurried steps, the same every time — because the right pair is
            never an accident.
          </p>
        </Reveal>

        <div ref={ref} className="relative mx-auto mt-16 max-w-2xl">
          {/* the thread */}
          <div className="absolute left-[27px] top-2 bottom-2 w-px bg-line-strong" aria-hidden />
          <div
            className="absolute left-[27px] top-2 w-px origin-top bg-royal"
            aria-hidden
            style={{ height: `calc((100% - 1rem) * ${progress})` }}
          />

          <ol className="space-y-12">
            {journeySteps.map((step, i) => {
              const Icon = icons[step.icon];
              return (
                <Reveal as="li" key={step.title} delay={i * 60} className="relative flex gap-6">
                  <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line-strong bg-paper text-royal shadow-sm">
                    <Icon className="h-6 w-6" />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink font-mono text-[0.6rem] text-paper">
                      {i + 1}
                    </span>
                  </span>
                  <div className="pt-1.5">
                    <h3 className="font-display text-xl text-ink">{step.title}</h3>
                    <p className="mt-2 max-w-md text-muted">{step.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
