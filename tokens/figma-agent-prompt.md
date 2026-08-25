# Figma agent prompt — Lumen design tokens (Global + Semantic)

Paste the block below to a Figma agent to (re)build the full token system.
It keeps the existing color ramps and fixes the **inverse** tokens so text on dark
uses warm-neutral greys (not orange). All values are WCAG AA+ on the dark brown.

---

## PROMPT — copy from here

Set up our design tokens in Figma as **two variable collections**, each with a single
mode named `Default`. Use the exact values below. Colors in **Semantic** must be
*aliases* (references) to **Global** variables, never raw hex.

### Collection 1 — `Global`

**color / sun:** 50 `#fef9ec`, 100 `#fcedc9`, 200 `#f8d98f`, 300 `#f5c054`, 400 `#f2a626`, 500 `#ec8814`, 600 `#d1640e`, 700 `#ad4510`, 800 `#8d3613`, 900 `#742d13`, 950 `#421506`

**color / dark-brown:** 50 `#fdf5ef`, 100 `#fae8d9`, 200 `#f4ceb2`, 300 `#ecae81`, 400 `#e3864e`, 500 `#dc6a2e`, 600 `#cd5423`, 700 `#ab401e`, 800 `#893520`, 900 `#72301f`, 950 `#210b03`

**color / deep-amber:** 50 `#fdf6ee`, 100 `#fae9d4`, 200 `#f4d0a7`, 300 `#ecb170`, 400 `#e38e3e`, 500 `#dc7522`, 600 `#cc5f18`, 700 `#a94816`, 800 `#883a19`, 900 `#703118`, 950 `#4d240a`

**color / rich-orange:** 50 `#fff7ec`, 100 `#ffedd3`, 200 `#ffd7a5`, 300 `#ffba6d`, 400 `#ff9332`, 500 `#ff750a`, 600 `#f05c00`, 700 `#c84302`, 800 `#a64d0d`, 900 `#7e3510`, 950 `#441806`

**color / warm-amber:** 50 `#fffaeb`, 100 `#fff0c6`, 200 `#ffde88`, 300 `#ffc84a`, 400 `#ffb020`, 500 `#f99307`, 600 `#d97a14`, 700 `#b35210`, 800 `#923f14`, 900 `#783514`, 950 `#451a06`

**color / light-gold:** 50 `#fffdf0`, 100 `#fffad9`, 200 `#fff3b3`, 300 `#ffe87d`, 400 `#ffd14d`, 500 `#f5b828`, 600 `#d99418`, 700 `#b36d14`, 800 `#915418`, 900 `#77451a`, 950 `#45240b`

**color / neutral / flint:** 50 `#fafaf9`, 100 `#f5f5f4`, 200 `#e7e5e4`, 300 `#d6d3d1`, 400 `#a8a29e`, 500 `#78716c`, 600 `#57534e`, 700 `#44403c`, 800 `#292524`, 900 `#1c1917`, 950 `#0c0a09`

**color / error / bordeaux:** 50 `#fef3f2`, 100 `#fee4e2`, 200 `#fececa`, 300 `#fcaca5`, 400 `#f87b71`, 500 `#ef5244`, 600 `#dc3626`, 700 `#b9291c`, 800 `#8c2403`, 900 `#7f2517`, 950 `#450f08`

**color / success / forest:** 50 `#f0fdf4`, 100 `#dcfce7`, 200 `#bbf7d0`, 300 `#86efac`, 400 `#4ade80`, 500 `#22c55e`, 600 `#16a34a`, 700 `#15803d`, 800 `#166534`, 900 `#14532d`, 950 `#052e16`

**color / warning / amber:** 50 `#fffbeb`, 100 `#fef3c7`, 200 `#fde68a`, 300 `#fcd34d`, 400 `#fbbf24`, 500 `#f59e0b`, 600 `#d97706`, 700 `#b45309`, 800 `#92400e`, 900 `#78350f`, 950 `#451a03`

**color / info / steel:** 50 `#f0f9ff`, 100 `#e0f2fe`, 200 `#bae6fd`, 300 `#7dd3fc`, 400 `#38bdf8`, 500 `#0ea5e9`, 600 `#0284c7`, 700 `#0369a1`, 800 `#075985`, 900 `#0c4a6e`, 950 `#082f49`

**color / base:** white `#ffffff`, black `#000000`, warm-white `#f9f6f1`

**spacing:** 0 `0px`, 1 `4px`, 2 `8px`, 3 `12px`, 4 `16px`, 5 `20px`, 6 `24px`, 8 `32px`, 10 `40px`, 12 `48px`, 16 `64px`, 20 `80px`, 24 `96px`

**radius:** none `0px`, sm `4px`, md `8px`, lg `12px`, xl `16px`, 2xl `24px`, full `9999px`

### Collection 2 — `Semantic` (all values alias Global)

**bgColor:** 50→950 alias `dark-brown.50…950`; `default` = `base.white`; `muted` = `light-gold.100`;
`strong` = `sun.400`; `active` = `sun.500`; `hover` = `sun.300`; `disabled` = `neutral.flint.200`;
`subtle` = `base.warm-white`; `overlay` = `sun.900`; `cta` = `neutral.flint.800`; `cta-hover` = `dark-brown.950`;
**`inverse` = `dark-brown.950`** (the brand brown for dark sections).

**fgColor:** `default` = `dark-brown.950`; `subtle` = `neutral.flint.600`; `strong` = `dark-brown.950`;
`active` = `sun.800`; `hover` = `sun.700`; `accent` = `dark-brown.900`; `disabled` = `neutral.flint.400`;
`on-strong` = `dark-brown.950`; `on-inverse` = `base.white`;
**`inverse` = `base.white`** (primary text on dark);
**`inverse-subtle` = `neutral.flint.300`**  ← CHANGED (was dark-brown.300 / orange);
**`inverse-muted` = `neutral.flint.400`**  ← NEW (captions/tertiary text on dark).

**borderColor:** `default` = `neutral.flint.500`; `subtle` = `neutral.flint.400`; `strong` = `dark-brown.950`;
`active` = `sun.700`;
**`inverse` = `neutral.flint.700`**  ← CHANGED (was dark-brown.700 / orange) — subtle divider on dark;
**`inverse-strong` = `neutral.flint.500`**  ← NEW — visible border / ghost-button outline on dark.

**status — error:** bg `bordeaux.50`, fg `bordeaux.700`, border `bordeaux.300`, strong `bordeaux.800`
**status — success:** bg `forest.50`, fg `forest.700`, border `forest.300`, strong `forest.800`
**status — warning:** bg `amber.50`, fg `amber.700`, border `amber.300`, strong `amber.800`
**status — info:** bg `steel.50`, fg `steel.700`, border `steel.300`, strong `steel.800`

**font / family:** primary `Instrument Sans`, secondary `Instrument Sans` (we do not use Inter), mono `IBM Plex Mono`

**chart:** bar-light `light-gold.200`, bar-mid `light-gold.300`, bar-strong `sun.400`

### Rules

- **Inverse = on the dark brown (`dark-brown.950` / `#210b03`).** Text there is white →
  `flint.300` → `flint.400`; borders `flint.700` (subtle) / `flint.500` (visible); the ONLY
  colored accent on dark is amber (`dark-brown.400` ≈ `#e3864e`), used sparingly for things
  like quote-marks — never for body or subtle text.
- Never introduce new raw hex in Semantic — always alias a Global variable.
- Contrast on `#210b03`: white 18.5:1, `flint.300` ~12.7:1, `flint.400` ~7.3:1 — all pass WCAG AA (AAA for the lighter two).

## PROMPT — copy to here
---

## Why the inverse changed

The previous inverse tokens pointed at the **dark-brown** ramp (300 `#ecae81`, 700 `#ab401e`),
which is orange. On a dark background that reads as *coloured* text/borders. The site design
uses warm-neutral greys on dark (white → `flint.300` → `flint.400`) and keeps orange strictly
as a small accent. These values map 1:1 to what the code uses (`--color-cream`, `white/70`,
footer greys `#e2e0db`/`#a69f9b` ≈ flint.300/400, ghost border `#78716c` = flint.500).
