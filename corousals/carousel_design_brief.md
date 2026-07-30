# Work Card Carousel — Design Language Brief

## Parent Site Design Identity

Before defining the carousel, understand the site it lives inside. The overall aesthetic
is **Warm Editorial Reductivism** — a system rooted in analogue print culture (think Monocle
magazine, Kinfolk, early Swiss typographic design) crossed with the precision restraint of
Apple's product UI. It is:

- **Warm, not cool.** The base palette is parchment (#F4F3EF), not white. Blacks are near-black
  warm ink (#141310), not pure #000. Every surface has slight warmth.
- **Typographic, not illustrative.** Hierarchy is built through typeface weight, scale contrast,
  and letter-spacing — not decorations, icons, or gradients.
- **Textured silence.** A film grain overlay gives the page an analogue, hand-crafted feel despite
  being digital. Space and negative space are the primary design tools.
- **Motion is physical.** Animations are scroll-linked (scrubbed), not time-triggered. Elements
  move as if they have mass. Easing is `cubic-bezier(0.22,1,0.36,1)` — fast start, long tail.

---

## Carousel Design Direction: **Warm Material Realism**

This is NOT glassmorphism (no blue-frosted blur panels), NOT neobrutalism (no thick black
borders or flat hard shadows), NOT neumorphism (no soft inset shadows). The direction is
**warm material realism** — surfaces that feel like slightly textured paper or warm frosted
matte card stock, grounded in the same parchment family as the site.

Think: a physical portfolio deck you'd slide across a table in a high-end studio pitch meeting.

---

## Slide Surface

- **Background per slide:** `#F4F3EF` (same as page) or one step warmer: `#EAE8E2` (`--paper-soft`).
  Each project already has a unique gradient accent color (card-1 through card-4). The slide
  background should use a very subtle version of that accent — e.g., for card-1 (warm amber),
  use `linear-gradient(160deg, #F4F3EF 60%, #e8d5c0 100%)` — almost imperceptible shift of warmth.
- **No hard card borders.** Use a 1px line at `rgba(20,19,16,0.12)` (`--line`) max. Prefer
  using spacing to define boundary over drawing a box.
- **Grain:** the parent page has a CSS noise grain. Individual slides do not need their own
  grain — they inherit it from the `<body>` grain overlay.

---

## Typography Inside Slides

Use the same three-font system as the site:

| Role | Font | Style |
|---|---|---|
| Slide counter / label | IBM Plex Mono | 0.7rem, uppercase, letter-spacing 0.1em, `--ink-40` |
| Feature stat or number | Space Grotesk | 2–4rem, weight 700, `--ink` |
| Body description | Inter | 0.95rem, line-height 1.7, `--ink-70` |
| Section eyebrow | IBM Plex Mono | 0.72rem, uppercase, `--ink-40` |

Typography should feel **editorial** — like a magazine spread, not a product UI.
Use large typographic contrasts: a big quiet number beside a small body paragraph.

---

## Slide Layout Language

Each slide should follow a **two-zone asymmetric grid**:

```
┌─────────────────────────────────────────┐
│  [eyebrow / label]       [01 / 04]      │  ← top bar: mono labels
│                                         │
│  [large visual or stat]                 │
│                                         │
│  [description paragraph — max 3 lines]  │
│                                         │
│  [optional: tag pill or data point]     │
└─────────────────────────────────────────┘
```

- **Avoid** perfectly symmetrical two-column splits — they feel like a deck template.
- **Prefer** one dominant content zone (image OR large type) + one subordinate zone (label + text).
- Visual elements (screenshots, mockups, diagrams) should be **cropped boldly** — show a detail,
  not the whole screen. Let the image bleed to the edge of the slide rather than floating centred.

---

## Slide Transition

- **Type:** Horizontal slide with subtle depth layering — the incoming slide moves at 100% speed
  while the outgoing slide moves at ~85% speed, creating a mild parallax depth (like physical
  cards sliding past each other).
- **No fade-between transitions.** This is a physical medium — slides physically push each other.
- **Duration:** 480ms.
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` — matches the site-wide easing token `--ease`.
- **No bounce, no elastic.** The motion should feel like high-quality machined hardware, not a
  rubber toy.

---

## Navigation Controls

- **Dots / Indicators:** Use short horizontal lines (not circles) — 24px wide, 2px tall, `--ink-30`
  for inactive, `--ink` for active. Active indicator animates its width from 24px → 48px on slide
  change, filling left-to-right with an ease.
- **Arrow buttons:** Very minimal. A small `←` / `→` character in IBM Plex Mono, 0.8rem, set in
  a 32×32px invisible hit area. No visible button background in resting state — only a faint 1px
  border appears on hover.
- **Position:** indicators bottom-center of the slide card. Arrow buttons bottom-right cluster.

---

## Colour Accent Per Card

Each project card already has an accent gradient in the site tokens. Use these for subtle accent
moments inside the carousel (e.g., a tag pill background, a data number colour, or a thin rule):

| Card | Accent Gradient | Mono accent to pull |
|---|---|---|
| Card 1 (AI Instagram) | `#e8d5c0 → #d4b896` | `#c49a6c` (warm amber) |
| Card 2 (Sahadar Shield) | `#c0cfe8 → #9db8d9` | `#6e98c8` (slate blue) |
| Card 3 | `#c0e8cc → #96c9a5` | `#5dab78` (sage green) |
| Card 4 | `#d4c0e8 → #b89fd4` | `#9a75c8` (muted violet) |

Use accent colours **sparingly** — one accent touch per slide maximum. The slide should read
as warm parchment with a single note of colour, not a coloured slide.

---

## What to Avoid

| ❌ Avoid | Reason |
|---|---|
| Glassmorphism (frosted blur panels) | Feels cool-toned and tech-product, breaks the warm analogue feel |
| Drop shadows (`box-shadow: 0 10px 40px rgba(0,0,0,0.3)`) | Too dramatic; shadows are used only as paper whispers (max opacity 0.08) |
| Rounded rectangles with visible full border | Creates UI-widget feel; prefer borderless or one-side ruled |
| Gradient text effects | Out of character; typography stays single-colour |
| Animated looping backgrounds | Slides are static canvases — only the transition moves |
| Carousel auto-play | User controls the pacing; no auto-advance |
| Emojis or iconography inside slides | Text-only; the writing carries the message |
| White background (#fff) | Use parchment (#F4F3EF) or warmer; pure white breaks the palette |

---

## Prompt Template for AI Generation

If generating carousel slide designs with an AI image tool, use this as your base prompt:

> *"Editorial magazine spread layout. Warm parchment background (#F4F3EF). IBM Plex Mono
> uppercase label in top-left, small, muted. Space Grotesk bold large headline or large number
> as the hero element. Inter body text, 3 lines max, dark warm ink. Asymmetric layout, one
> dominant zone. Very thin 1px warm grey rule as the only border element. Film grain texture
> overlay. No gradients, no coloured backgrounds, no drop shadows. Feels like a physical printed
> card from a premium studio portfolio deck. Colour palette: warm black, parchment white, one
> subtle muted accent (warm amber / slate blue / sage green / muted violet depending on project)."*
