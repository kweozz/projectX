---
name: agency-design
description: Build premium, clean agency/consultancy websites in the "Lumen" visual language — dark warm-amber palette, big Instrument Sans headings, alternating dark/light sections, WebP media, and restrained Framer Motion scroll animations. Use when creating or extending landing pages, case/detail pages, or marketing sites in this style, and when implementing Figma designs into a Vite + React + TypeScript + Tailwind v4 + Framer Motion stack. Triggers on requests like "build a landing page / case page in our style", "same look & feel as the homepage", "clean premium agency design".
---

# Agency design system (Lumen style)

Build clean, premium agency sites that feel calm and confident: generous whitespace,
big type, few but tasteful motions. **Never overload with animation.**

## Stack

- **Vite + React + TypeScript**, **Tailwind CSS v4** (CSS-first `@theme` in `index.css`),
  **Framer Motion** for animation, **react-router-dom** for multi-page.
- Fonts: **Instrument Sans everywhere** — headings *and* body. Both `--font-display` and `--font-sans` map to Instrument Sans. **We do not use Inter.**

## Design tokens (define in `index.css` under `@theme`)

```css
--font-display: "Instrument Sans", ui-sans-serif, system-ui, sans-serif;
--font-sans: "Instrument Sans", ui-sans-serif, system-ui, sans-serif;
--color-ink: #150500;      /* page dark bg / dark text */
--color-ink-900: #210b03;  /* slightly warmer dark section bg */
--color-cream: #fbfaf8;    /* light text on dark, logo wordmark */
--color-card: #f9f6f1;     /* light card / data-panel bg */
--color-muted: #57534e;    /* secondary text */
--color-amber: #e08a2b;    /* accent (quote marks, highlights) */
--color-cta: #292524;      /* dark pill button bg */
```
Bind components to these tokens (`bg-ink`, `text-cream`, `bg-card`, `text-muted`, …). Never hardcode hex when a token exists.

The full palette (Global ramps + Semantic tokens, with the corrected **inverse** tokens) and a
ready-to-paste Figma-agent prompt live in `tokens/figma-agent-prompt.md`. Key inverse rule: on the
dark brown (`#210b03`) use warm-neutral greys — white → flint.300 (#d6d3d1) → flint.400 (#a8a29e) —
NOT orange; orange (amber) is a small accent only.

## Layout convention (CRITICAL — keep identical across every section)

- Content is **capped at `max-w-[1600px]` and centered**, with **64px side gutters**
  (`px-6 md:px-16`, 24px on mobile) and **120px top/bottom** (`py-20 md:py-30`).
- Pattern: `<section className="py-20 md:py-30">` (no horizontal padding on the section —
  lets backgrounds be full-bleed) with inner `className="mx-auto max-w-[1600px] px-6 md:px-16 …">`.
- Full-bleed elements that must align left with content but bleed off the right edge
  (e.g. a horizontal card gallery) live OUTSIDE the capped container and use:
  `paddingLeft/scrollPaddingLeft: max(var(--page-gutter), calc((100vw - 1600px)/2 + var(--page-gutter)))`.
  (`--page-gutter` = 1.5rem / md 4rem, defined in `index.css`.)

## Section rhythm

Alternate **dark and light** sections for rhythm — never many darks or many lights in a row:
`dark hero → dark → WHITE → dark → WHITE → …`. Dark = `bg-ink` / `bg-ink-900`; light = `bg-white`.
On light sections use `text-ink` / `text-muted`; on dark use `text-white` / `text-white/70`.

## Typography

- Big headings: `font-display`, semibold, tight tracking. Responsive with clamp, e.g.
  `text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.018em]`; hero larger.
- Match Figma line-height/letter-spacing exactly when implementing a design (don't eyeball).
- Body, UI copy, prices and numbers: all **Instrument Sans** (`font-display` and `font-sans` are the same face).

## Motion (Framer Motion — subtle, premium)

- **Standard scroll reveal:** `initial={{ y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
  viewport={{ once: true, margin: '0px 0px -20% 0px' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}`.
  The `-20%` bottom margin makes it fire when the section is actually in view — **not** `-80px`
  (that fires too early for sections just below a 100vh hero, so they look un-animated).
- **Stagger** children: parent `initial="hidden" whileInView="show" transition={{ staggerChildren: 0.12 }}`,
  children get `variants={{ hidden: {opacity:0,y:32}, show: {opacity:1,y:0,transition:{duration:0.7,ease}} }}`.
  Framer context passes through plain divs, but stagger only times DIRECT motion children —
  if you wrap rows in plain divs, put the stagger on each row.
- **Count-up numbers:** animate 0→value with `animate()` + `useInView` (same `-20%` margin),
  respect `prefers-reduced-motion`.
- **Image hover (clean):** wrap image in `group relative overflow-hidden`; image gets
  `transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]`
  plus a fading sheen overlay `bg-gradient-to-t from-black/25 via-transparent to-white/5 opacity-0 group-hover:opacity-100`.
  (Tailwind v4 `scale-*` uses the CSS `scale` property; `transition-transform` covers it.)
- Cross-section parallax/choreography: add only after all sections exist, tuned page-wide.

## Recurring components

- **Primary button:** `rounded-full bg-cream text-ink` (or `bg-cta text-cream` on light) pill,
  uppercase, with an up-right arrow that nudges on hover.
- **Ghost button:** `rounded-full border border-[#78716c]` pill, underlined label + arrow.
- **Accordion (FAQ):** single-open, chevron rotates, smooth height via `AnimatePresence`; start all closed.
- **Full-bleed video background:** `<video autoPlay muted loop playsInline>` with a WebP `poster`.
  Below-the-fold videos MUST be played via an `IntersectionObserver` (browsers pause off-screen
  muted autoplay and don't resume) — otherwise the loop stops.
- **Horizontal gallery:** `overflow-x-auto snap-x snap-mandatory`, hide scrollbar with a
  `.no-scrollbar` utility, full-bleed right per the layout convention.

## Figma → code workflow

1. Load the design context (Figma MCP `get_design_context`) per node; treat returned code as
   REFERENCE only — rewrite it to this stack/tokens, never paste verbatim.
2. Build **section by section**, verifying each in the browser before moving on.
3. Download real assets from Figma; inspect stacked/overlaid images and keep only the top one.
4. Match layout/structure from Figma, but visual values (color/type) come from the tokens.

## Assets (keep the site light)

- **Images → WebP** (`ffmpeg -c:v libwebp -quality 82`, cap long edge at 1600px). ~20× smaller,
  no visible loss. Update imports to `.webp`.
- **Video → H.264** `-crf 19 -preset slow -pix_fmt yuv420p -an`, scale to 1920 wide, `+faststart`.
  Do NOT over-compress smooth gradient/shader videos (CRF ≥28 or small resolution causes banding).
  Always keep the originals so you can re-encode.
