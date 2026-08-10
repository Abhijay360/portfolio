---
name: Abhijay Sumi Village
version: 2.0.0
tokens:
  color:
    washi: "#F2EDE3"
    ink: "#1C1814"
    inkSoft: "#5C534A"
    gold: "#B8975A"
    goldHot: "#D4B06A"
    vermillion: "#C23B22"
    wood: "#3E2F24"
    mist: "#E8E2D6"
  font:
    display: "'Shippori Mincho', 'Noto Serif JP', serif"
    body: "'Zen Kaku Gothic New', 'Noto Sans JP', sans-serif"
  space:
    1: "4px"
    2: "8px"
    3: "12px"
    4: "16px"
    5: "24px"
    6: "32px"
    7: "48px"
    8: "72px"
---

# Design system — Sumi Village

## Overview

**Creative North Star: "Quest Board at the Village Gate."** A grayscale ink-sketch world where Abhijay appears as the colored character sprite; navigation reads like gold RPG menu chrome; projects hang on a quest board.

## Brand & atmosphere

- Monochrome village sketch as full-bleed atmosphere
- Warm washi / mist washes for readability panels
- Gold menu type, vermillion for primary action
- Soft shadows; no neon glow, no pixel fonts, no CRT scanlines

## Layout principles

1. Identity (portrait + name) leads the first viewport
2. Ink signal panel is secondary craft, not competing chrome
3. Featured work = vertical quest list with clear Enter / Source actions
4. Spacing uses `--space-*` only; touch targets ≥ 44px

## Do / Don't

- Do keep color concentrated on portrait + CTAs against the sketch
- Don't reintroduce neon pink/cyan glows or Press Start 2P
- Don't use nested cards or purple gradients
