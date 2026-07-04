"use client";

import { Container } from "@/components/ui/Container";
import { useInView } from "@/hooks/use-in-view";
import { useCountUp } from "@/hooks/use-count-up";
import { trustStats, type TrustStat } from "@/content/stats";

function formatStat(stat: TrustStat, current: number): string {
  const decimals = stat.decimals ?? 0;
  const body = stat.raw
    ? Math.round(current).toString()
    : current.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
  return `${stat.prefix ?? ""}${body}${stat.suffix ?? ""}`;
}

function Stat({ stat, active }: { stat: TrustStat; active: boolean }) {
  const current = useCountUp(stat.value, { active });
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="font-display text-4xl font-medium text-paper sm:text-5xl">
        {formatStat(stat, current)}
      </span>
      <span className="eyebrow text-[0.62rem] text-paper/55">{stat.label}</span>
    </div>
  );
}

export function TrustStrip() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section className="border-t border-paper/10 bg-ink-700 text-paper">
      <Container className="py-14 md:py-20">
        <div
          ref={ref}
          className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-6"
        >
          {trustStats.map((stat) => (
            <Stat key={stat.label} stat={stat} active={inView} />
          ))}
        </div>
      </Container>
    </section>
  );
}
