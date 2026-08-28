---
name: Abhijay Lobby
version: 3.0.0
tokens:
  color:
    void: "#07070B"
    void2: "#0D0D13"
    fg: "#F3F1EB"
    fg2: "#9D9BAA"
    fg3: "#625F70"
    accent: "#FFA51F"
    accentHot: "#FFC257"
    rule: "rgba(255,255,255,0.10)"
  font:
    display: "'Clash Display', 'Satoshi', system-ui, sans-serif"
    body: "'Satoshi', system-ui, sans-serif"
    mono: "'JetBrains Mono', ui-monospace, monospace"
  dials:
    designVariance: 8
    motionIntensity: 9
    visualDensity: 3
---

# Design system - Lobby

## Creative north star

**"Mission select."** A cinematic WebGL starfield you fly through as you scroll.
The projects are the missions, and every one of them launches. The 3D carries the
energy so the copy does not have to; there is no fake HUD chrome anywhere.

## Locks

These are invariants. Breaking one breaks the page.

- **Theme lock.** Dark only. No section inverts to a light background.
- **Accent lock.** `#FFA51F` amber is the only accent on the page. Per-project
  accent colors in `featured.ts` are data, not UI, and must not reach the chrome.
- **Radius rule.** Interactive controls are full-pill (`999px`), media frames are
  `4px`, and nothing else is boxed. There is no third radius.
- **One display face.** Clash Display for headings, Satoshi for body, JetBrains
  Mono only for genuinely technical strings (stack lines, counts).

## Motion contract

`MOTION_INTENSITY: 9`, so the page must actually move. It does, in three places:

1. Camera depth through the particle field, scrubbed by page scroll.
2. The mission track pans horizontally while its section is pinned.
3. Sections fade up once as they enter the viewport.

Every one of these collapses to a static composition under
`prefers-reduced-motion: reduce`. The scene renders exactly one frame and stops.

**Never set `scroll-behavior: smooth` on `html`.** The CSS property intercepts
ScrollTrigger's own scroll adjustments and silently disables pinning. In-page
anchor smoothing is handled per click in `main.ts`.

**Never pin a `max-width` + `margin-inline: auto` element.** ScrollTrigger swaps
the pinned node to `position: fixed`, auto margins stop resolving, and the layout
collapses. The pinned section is full-bleed; the gutter lives on its children.

## Layout principles

1. The hero is one moment: headline, one line of support, two actions. Nothing else.
2. No two sections share a layout family. Hero is cinematic-offset, work is a
   pinned horizontal pan, about is an asymmetric split, contact is a centered statement.
3. Content is real HTML text layered over the canvas. If WebGL never initializes,
   the page still reads correctly against the CSS fallback gradient.

## Do / Don't

- Do let the starfield and the pan carry the energy.
- Do keep every project's live URL one click from the viewport.
- Don't add eyebrows, section numbers, status dots, scroll cues, or version stamps.
- Don't use em-dashes anywhere in visible copy.
- Don't reintroduce the navy `#0a192f` + mint `#64ffda` palette. It is the most
  cloned developer-portfolio template on the internet and it was what shipped here
  until v3, despite the docs claiming otherwise.
