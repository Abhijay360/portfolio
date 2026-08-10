---
name: Abhijay Arcade Portfolio
version: 1.0.0
tokens:
  color:
    bg: "#070B2A"
    bgElevated: "#0D1440"
    ink: "#F8E8FF"
    inkSoft: "#B8A0D4"
    pink: "#FF2BD6"
    pinkHot: "#FF79EC"
    red: "#FF2A4D"
    redHot: "#FF5C7A"
    blue: "#1A2470"
  font:
    display: "'Press Start 2P', monospace"
    body: "'VT323', monospace"
  space:
    1: "4px"
    2: "8px"
    3: "12px"
    4: "16px"
    5: "24px"
    6: "32px"
    7: "48px"
    8: "64px"
  radius:
    none: "0"
  shadow:
    hard: "4px 4px 0 #000"
---

# Design system — Arcade CRT

## Overview

**Creative North Star: "Player Select Screen."** The portfolio reads like a neon arcade attract mode — identity plate, insert-coin CTA, then numbered stages for each shipped project. Expression is the product; structure stays scannable for recruiters.

## Brand & atmosphere

- Dark navy field with pink/red neon accents
- CRT scanlines + vignette (intentional; not decorative grid wallpaper)
- Pixel fonts only; zero border-radius; hard drop shadows
- Glow used sparingly to mark focus/hover/active HUD chrome

## Layout principles

1. **Identity leads.** First viewport: avatar + name + one lede + CTAs. Interactive signal sits below as secondary delight.
2. **Stages are linear.** Featured work is a vertical stage list (not a bento of equal cards). Stage index → title → blurb → tags → PLAY/SRC.
3. **Spacing scale.** Use `--space-*` tokens only. Generous section gaps (`--space-7`/`--space-8`); tight clusters inside a stage (`--space-2`/`--space-3`).
4. **Touch targets ≥ 44px** on primary actions.
5. **Reading width.** Body/lede max ~36–40ch; display titles may break freely.

## Components

| Component | Role |
|-----------|------|
| Topbar | Sticky HUD nav; brand mark left, external links right |
| Avatar frame | Pixel portrait + P1 badge |
| Buttons | Primary (pink fill) / Ghost (red outline) |
| Stage article | Featured project row with accent border |
| Signal panel | Interactive SVG HUD toy |

## Do / Don't

- Do keep neon arcade identity when refining layout
- Do separate identity cluster from signal toy with generous gap
- Don't add nested cards or soft SaaS shadows
- Don't replace Press Start 2P / VT323
- Don't use decorative two-axis grid backgrounds (detector: codex-grid)
