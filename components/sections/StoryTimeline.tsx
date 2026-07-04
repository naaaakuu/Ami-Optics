import Image from "next/image";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { homeStoryChapters, elderNote } from "@/content/heritage";

/**
 * The Journey — the second movement of "Our Story".
 *
 * Compressed to three memorable chapters so the homepage inspires curiosity
 * rather than exhausting it (the full milestone history lives on /about). Two
 * quiet lead chapters strung on a champagne thread, then a bright, present-day
 * arrival: the brothers today, the line that lands the lump in the throat, and
 * the door to the complete story. Past in restraint, today in colour.
 */

const TODAY_IMAGE = "/images/heritage/founders.jpg";

export function StoryTimeline() {
  const lead = homeStoryChapters.slice(0, 2);
  const today = homeStoryChapters[homeStoryChapters.length - 1];

  return (
    <div className="mt-24 lg:mt-32">
      {/* kicker */}
      <Reveal className="flex items-center gap-4">
        <span className="eyebrow text-royal">The Journey</span>
        <span className="h-px flex-1 bg-line" aria-hidden />
        <span className="eyebrow text-muted">1996 → Today</span>
      </Reveal>

      {/* two lead chapters, strung on a single thread */}
      <ol className="mt-16">
        {lead.map((c) => (
          <Reveal
            as="li"
            key={c.title}
            className="grid gap-x-8 gap-y-2 sm:grid-cols-[9rem_1fr]"
          >
            <div className="sm:pt-1 sm:text-right">
              <span className="font-display text-3xl leading-none text-ink sm:text-4xl">
                {c.year}
              </span>
              <span aria-hidden className="mt-2 block h-px w-8 bg-champagne sm:ml-auto" />
            </div>
            <div className="relative border-l-2 border-line pb-14 pl-7 sm:pl-9">
              {/* champagne thread draws down the hairline as the chapter reveals */}
              <span aria-hidden className="timeline-thread absolute -left-[2px] bottom-0 top-0 w-[2px] bg-champagne/60" />
              <span
                aria-hidden
                className="absolute -left-[7px] top-1.5 z-[1] h-3 w-3 rotate-45 border border-champagne bg-paper"
              />
              <h3 className="font-display text-2xl text-ink sm:text-[1.7rem]">
                {c.title}
              </h3>
              <p className="mt-3 max-w-md text-lg leading-relaxed text-muted">
                {c.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>

      {/* TODAY — the arrival */}
      <Reveal
        variant="focus"
        className="relative overflow-hidden rounded-[2rem] bg-paper-bright shadow-[0_48px_100px_-44px_rgba(34,29,20,0.5)] ring-1 ring-line"
      >
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[22rem] lg:min-h-[30rem]">
            <Image
              src={TODAY_IMAGE}
              alt="Jignesh and Jatin Vora today, smiling behind the counter at Ami Optics"
              fill
              sizes="(min-width: 1024px) 42vw, 92vw"
              className="grade-portrait object-cover"
              style={{ objectPosition: "50% 32%" }}
            />
            {/* melt the photo's edge into the panel */}
            <div
              aria-hidden
              className="absolute inset-0 hidden lg:block bg-[linear-gradient(90deg,transparent_48%,var(--color-paper-bright)_97%)]"
            />
            <div
              aria-hidden
              className="absolute inset-0 lg:hidden bg-[linear-gradient(180deg,transparent_62%,var(--color-paper-bright)_99%)]"
            />
          </div>

          <div className="flex flex-col justify-center gap-5 p-8 sm:p-12 lg:p-14">
            <span className="eyebrow text-royal">Today</span>
            <Heading as="h3" size="title" className="max-w-[14ch] text-ink">
              {today.title}
            </Heading>
            <p className="max-w-md leading-relaxed text-muted">{today.body}</p>
            <div aria-hidden className="h-px w-12 bg-champagne" />
            <p className="max-w-md text-lg italic leading-snug text-ink text-pretty">
              {elderNote}
            </p>
            <div className="pt-2">
              <Button href="/about" variant="ghost" arrow>
                Read our complete story
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
