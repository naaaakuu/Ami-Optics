# Image manifest

The site looks intentional **without** photos (branded colour fields + the SVG
frame motif show through), and blooms when these files exist. Run
`scripts\import-assets.ps1` to auto-copy the best matches, or drop files here by
hand using the paths below.

| Path (under `public/`)                              | Used by                | Suggested source |
|-----------------------------------------------------|------------------------|------------------|
| `images/hero/founder.jpg`                           | **Hero (full-bleed)**  | Founders/Dad — `IMG_9306.JPG` (the founder at the counter; the cinematic hero background) |
| `videos/hero.mp4`                                   | Hero motion layer      | Videos — `Dad Working.mp4` (poster = `hero/founder.jpg`) |
| `images/brand/ami-optics-logo.svg`                  | Navbar + footer logo   | Branding — `AMI OPTICS LOGO.svg` |
| `images/heritage/founder-portrait.jpg`              | Story section portrait | Founders/Dad — inspecting a lens (`IMG_0172_.jpg`) |
| `images/heritage/founders.jpg`                      | Heritage + /about      | Founders/Dad & Uncle — **both brothers** (`IMG_2453_.jpg`) |
| `images/founders/jignesh.jpg`                       | Meet the Brothers      | Founders/Dad — `IMG_2439_.jpg` (leaner brother, operations) |
| `images/founders/jatin.jpg`                         | Meet the Brothers      | Founders/Uncle — `IMG_2132_.jpg` (eye-testing/care) |
| `images/shop/eye-testing.jpeg`                      | /services              | `IMG_2170_.jpg` — a real, upright eye test |
| `images/products/spectacle-frames.jpeg`            | /services              | Products/Spectacle Frames |
| `images/products/spectacle-frames-collection.jpeg` | /collections featured  | Shop Interior frame-wall |
| `images/products/prescription-lenses.png`          | /services              | Products/Lens Type |

## Notes
- **Hero is essential, the rest are optional.** Copy `IMG_9306.JPG` →
  `public/images/hero/founder.jpg` and the hero blooms; until then a branded
  warm-charcoal field stands in (no broken-image icon).
- **Optional — moving hero.** The hero can play a muted, looping video instead of
  the photo. The source clips in `03. Videos/` are `.MOV` (HEVC) and won't play in
  most browsers, so transcode one (e.g. `Dad Working.MOV`) to BOTH formats, drop
  them in `public/videos/`, then set `HERO_VIDEO` in `components/sections/Hero.tsx`:
  ```
  ffmpeg -i "Dad Working.MOV" -vf "scale=1920:-2" -an -c:v libx264 -crf 23 -movflags +faststart public/videos/hero.mp4
  ffmpeg -i "Dad Working.MOV" -vf "scale=1920:-2" -an -c:v libvpx-vp9 -crf 33 -b:v 0 public/videos/hero.webm
  ```
  The founder photo is used automatically as the poster while the video loads.
- **Orientation:** several phone photos (eye-testing especially) are rotated —
  straighten before importing.
- **Duotone:** the `<Photo duotone>` treatment converts photos to a royal/champagne
  wash, which is *why* mixed, inconsistent source photos still feel like one set.
  If you want a photo shown in full colour, render it without the `duotone` prop.
- **Raw files:** `Founders/Uncle` and `Founders/Grandfather` are camera **.DNG**
  (raw) — browsers can't display them. Export to `.jpg`/`.webp` first.
- Optimising to `.webp` later is fine; keep the same filename or update the path
  in the matching `content/*.ts` / component.
