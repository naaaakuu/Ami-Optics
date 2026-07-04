# Ami Optics — Redesign Notes ("In Focus")

Session handoff. Read this first if you're continuing the work.

---

## 1. TL;DR

The homepage was rebuilt from a generic minimal template into a signature,
scroll-told experience called **"In Focus"** — content resolves from soft/blurred
to sharp, mirroring an eye test and the relief of the right pair of glasses. The
real brand (vivid **red + royal blue**, split-frame logo, bilingual, *Since 1996*)
now drives the design, reconciled with the Manifesto's premium intent.

**Zero new dependencies.** All motion is CSS + small native React hooks (the dev
environment in this session could not run `npm install` or a build, so everything
is correct-by-construction and dependency-free — which is also what the Digital
Constitution argues for).

---

## 2. Creative direction

- **Concept:** *In Focus.* The page performs the act of seeing clearly. Signature
  mechanic = `focus-in` (blur→sharp + a 1% settle). The split red/royal **frame
  mark** (rebuilt from the real logo) is the recurring "viewfinder" motif.
- **Colour** (reconciles the bright logo with the Manifesto's charcoal/champagne):
  - `royal` #1e2a78 — **primary brand** (it's in *both* the logo and the Manifesto)
  - `paper` #f6f1e7 ivory + `ink` #16120b warm espresso — the premium canvas
  - `champagne` #c6a15b — heritage warmth (three generations, the shop's tungsten light)
  - `spark` #e1251b — the logo red, used **rarely** as an accent (focus rings, the
    "trust" underline, the closed-status dot, *Since 1996*)
- **Type:** Fraunces (display, incl. italic) · Geist Sans (body) · Geist Mono
  (technical micro-labels / the *SINCE 1996* stamp voice).
- **Photography:** unified by a **duotone** treatment + film grain, so the raw,
  inconsistent phone photos read as one intentional editorial set.
- **Motion law:** calm, purposeful, fully `prefers-reduced-motion` aware.

---

## 3. Design system (`app/globals.css`)

Tailwind v4 `@theme` tokens generate the utilities. Key colour utilities:
`bg-ink` `ink-700` `bg-paper` `paper-dim` `paper-bright` `text-royal` `royal-bright`
`azure` `champagne` `champagne-soft` `spark` `spark-deep` `muted` `muted-light`
`line` `line-strong`. Legacy aliases `accent→royal`, `border→line`,
`heritage→champagne` keep older files compiling.

Type utilities: `text-mega` `text-hero` `text-display` `text-title` (fluid clamps).

Helpers: `.eyebrow` / `.eyebrow--marked`, `.dropcap`, `.link-quiet`, `.grain`
(inlined SVG noise — can't 404), `.duotone` / `.duotone-wrap[--warm]`.

Motion: keyframes `focus-in` `rise-in` `fade-in` `draw` `marquee` `float-soft`
`pulse-ring` `ray` `ray-safe` `tint` `zone` `fade-a/b`; the `[data-reveal]` system
(driven by `<Reveal>`); reduced-motion disables all of it.

---

## 4. New architecture

```
components/
  brand/      FrameMark (signature SVG, animated draw), Wordmark, Icons (line set)
  ui/         Photo (duotone + branded base), Button (variants/arrow/sheen),
              Heading (mega/hero/display/title/lg/md/sm), Tag, Container, Section
  motion/     Reveal (variant: rise|focus|fade, delay) + RevealGroup
  sections/   Hero, TrustStrip, StorySection, JourneySection, LensExplorer,
              LensDemo, FramesSection, ValuesSection, BrothersSection,
              StoriesSection, VisitUsBand, CtaBand
  layout/     Navbar (overlay→solid, dark-aware), Footer, MobileNav, OpenStatusBadge
hooks/        use-in-view, use-scroll-progress, use-count-up, use-prefers-reduced-motion
content/      site, stats, heritage, journey, lenses, frames, testimonials,
              services, collections
```

---

## 5. Homepage, section by section

1. **Hero** — dark grainy stage; frame "draws into focus" + pointer parallax;
   headline resolves blur→sharp; live open-status; ★4.9 / 384+ trust line; CTAs.
2. **TrustStrip** — six **real** animated counters (1996 · 4.9★ · 384+ · 316/mo ·
   300/mo · 3 generations), count-up on scroll-into-view.
3. **StorySection** (`#story`) — the emotional spine: grandfather → two brothers →
   the *Ami/Amita* name story → father still visiting at 80+. Dropcap, duotone portrait.
4. **JourneySection** — signature 6-step stepper; a royal "thread" **draws as you
   scroll** (`use-scroll-progress`).
5. **LensExplorer** (`#lenses`) — interactive tabs with **animated SVG demos**
   (blue-cut filtering, progressive zones, photochromic tint, high-index thinness).
6. **FramesSection** — tactile horizontal scroll-snap rail of frame families.
7. **ValuesSection** — "Why Ami Optics", six icon cards (honest advice, same-day,
   home checkup, after-care, family, decades).
8. **BrothersSection** (`#team`) — Jignesh + Jatin, *"One vision. Two brothers."*
9. **StoriesSection** (`#reviews`) — featured **10-year-frame** review + grid of
   real Google reviews + the Saudi-customers note + 4.9 badge.
10. **VisitUsBand** — landmark address, languages (EN/हिंदी/मराठी), both numbers,
    live hours, map.
11. **CtaBand** — closing, big faint frame motif, *Clear Vision · Honest Advice · Since 1996*.

---

## 6. Run / import images

```powershell
cd ami-optics-website
pnpm install        # (or npm install) — deps unchanged: next, react, react-dom
powershell -ExecutionPolicy Bypass -File scripts\import-assets.ps1   # wire real photos
pnpm dev
```

Image paths the site expects are in `public/images/README.md`. Until imported, the
branded base layers show through (no broken boxes).

---

## 7. Constraints & risks (important)

- **Build was not run this session** (the sandbox couldn't execute shell). The code
  is written to be correct, but do a `pnpm build` / `pnpm dev` pass and watch for:
  - any Tailwind v4 utility that didn't generate (e.g. a colour token typo);
  - the `<Photo>` `next/image` 404s if images aren't imported yet (expected, harmless).
- **Photos can't be auto-placed by me** — run the import script (your shell works).
- Second brother (`Founders/Uncle`) + grandfather photos are **.DNG raw** → export
  to .jpg before they'll display; `founders/jignesh.jpg` currently maps to a Dad photo
  as a placeholder.

---

## 8. Done vs TODO

**Done:** full homepage redesign, design system, brand SVGs + motion hooks, nav/footer,
real data (stats, story, journey, lenses, frames, reviews), import script + manifest.

**TODO (next session, by priority):**
1. `pnpm build` and fix anything the compiler flags; visually QA on mobile.
2. **Secondary pages still use the old simple layout** — upgrade `/about` into the
   full narrative (timeline via `heritageMilestones`, brothers, name story), and give
   `/services`, `/collections`, `/visit-us` the new editorial treatment + Photo/duotone.
3. Replace default `favicon`/`opengraph-image`/`manifest` icons with the **FrameMark**
   (generate a real OG image and favicon from the brand mark). Remove unused
   `public/{next,vercel,window,globe,file}.svg`.
4. Optional signature upgrades: pin the Eye-Care Journey horizontally on desktop;
   add a tiny WhatsApp floating affordance; `heritageMilestones` timeline section.
5. Re-export the best photos to `.webp`, fix rotations, consider a short hero video
   loop (`03. Videos/Automatic lens cutting.mp4`) behind the hero as a motion layer.
6. Accessibility/perf pass: tab order, contrast on champagne-on-ink, Lighthouse.

---

## 9. Decisions log

- **Royal blue = primary** because it's the one colour shared by the real logo and
  the Manifesto; red kept as a rare spark to stay "premium = quiet" (Manifesto Law 15).
- **Warm ivory canvas, not charcoal-dark site** — the shop is warm, family, friendly;
  dark is reserved for cinematic moments (hero, lens demos, reviews, CTA).
- **No new dependencies / CSS-first motion** — robust, fast, maintainable, and
  matched the Constitution's "prefer native platform capabilities".
- **Legacy token aliases** added rather than rewriting every secondary-page class in
  one pass — keeps the build green while migration continues.
