"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import {
  EyeIcon,
  FrameIcon,
  LensIcon,
  FitIcon,
  WrenchIcon,
  HomeIcon,
  HandshakeIcon,
} from "@/components/brand/Icons";
import { cn } from "@/lib/utils";
import { faqCategories, type FaqItem } from "@/content/faqs";

/**
 * FAQ explorer — category-filtered discovery over premium expandable cards.
 * All 22 answers live in the DOM (SEO + find-in-page friendly); each card
 * expands with a pure-CSS grid-rows transition (see .faq-answer in
 * globals.css), so there is no height-measuring JS and reduced motion
 * resolves instantly via the global rules.
 */

const icons = {
  eye: EyeIcon,
  frame: FrameIcon,
  lens: LensIcon,
  fit: FitIcon,
  wrench: WrenchIcon,
  home: HomeIcon,
  handshake: HandshakeIcon,
} as const;

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn(
        "h-4 w-4 shrink-0 transition-transform duration-300 ease-out",
        open && "rotate-180",
      )}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function FaqCard({ item, id }: { item: FaqItem; id: string }) {
  const [open, setOpen] = useState(false);
  const answerId = `${id}-answer`;

  return (
    <li className="list-none">
      <div
        className={cn(
          "overflow-hidden rounded-2xl border-l-2 bg-paper-bright shadow-[0_2px_16px_rgba(34,29,20,0.04)] ring-1 ring-line transition-[border-color,box-shadow] duration-200",
          open
            ? "border-l-champagne shadow-[0_14px_36px_-18px_rgba(34,29,20,0.18)]"
            : "border-l-champagne/40 hover:border-l-champagne hover:ring-line-strong",
        )}
      >
        <button
          type="button"
          aria-expanded={open}
          aria-controls={answerId}
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-11 w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-paper/60"
        >
          <span className="font-semibold text-ink">{item.question}</span>
          <span className={cn("text-muted transition-colors", open && "text-champagne")}>
            <ChevronIcon open={open} />
          </span>
        </button>
        <div id={answerId} className="faq-answer" data-open={open}>
          <div>
            <div className="space-y-3 px-6 pb-6 leading-relaxed text-muted">
              {item.answer.map((para) => (
                <p key={para.slice(0, 32)} className="text-pretty">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export function FaqExplorer() {
  const [active, setActive] = useState<string>("all");
  const visible =
    active === "all"
      ? faqCategories
      : faqCategories.filter((c) => c.id === active);

  return (
    <div>
      {/* category filter — scrolls horizontally on small screens */}
      <Reveal>
        <div
          role="group"
          aria-label="Filter questions by topic"
          className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {[{ id: "all", label: "All questions" }, ...faqCategories].map((cat) => (
            <button
              key={cat.id}
              type="button"
              aria-pressed={active === cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                "min-h-11 shrink-0 rounded-full border px-5 py-2.5 text-sm transition-[background-color,border-color,color,transform] duration-200 ease-out hover:-translate-y-0.5",
                active === cat.id
                  ? "border-royal bg-royal text-paper-bright"
                  : "border-line bg-paper-bright text-muted hover:border-line-strong hover:text-ink",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </Reveal>

      {/* grouped question cards */}
      <div className="mt-10 flex flex-col gap-12 md:mt-12">
        {visible.map((category) => {
          const Icon = icons[category.icon];
          return (
            <Reveal key={category.id}>
              <section aria-labelledby={`faq-${category.id}-title`}>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne/50 bg-paper-bright text-champagne">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2
                    id={`faq-${category.id}-title`}
                    className="font-display text-2xl text-ink"
                  >
                    {category.label}
                  </h2>
                  <span aria-hidden className="hidden h-px flex-1 bg-line sm:block" />
                  <span className="hidden font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted-light sm:block">
                    {category.items.length}{" "}
                    {category.items.length === 1 ? "question" : "questions"}
                  </span>
                </div>
                <ul className="mt-5 flex flex-col gap-3">
                  {category.items.map((item, i) => (
                    <FaqCard
                      key={item.question}
                      item={item}
                      id={`faq-${category.id}-${i}`}
                    />
                  ))}
                </ul>
              </section>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
