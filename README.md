# Abhijay - Portfolio

Personal portfolio for college projects. A WebGL starfield backdrop with a
scroll-pinned horizontal project pan. Featured projects and their live URLs are
hand-maintained in `src/featured.ts`.

## Local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

`render.yaml` publishes `dist/` on the Render free static plan.

## Structure

| File | Role |
|------|------|
| `src/main.ts` | Page markup, scroll observers, anchor handling, mission pan |
| `src/scene.ts` | Three.js starfield. Lazy-imported, returns `null` without WebGL |
| `src/featured.ts` | Project data, live URLs, co-author credits |
| `src/style.css` | Design tokens and all layout |
| `DESIGN.md` | Design system, locks, and motion contract |

## Constraints worth knowing before editing

- Do not set `scroll-behavior: smooth` on `html`. It disables ScrollTrigger pinning.
- Do not pin an element that has `max-width` with `margin-inline: auto`.
- The 3D layer is optional by construction. If it fails, the canvas is removed and
  the CSS gradient fallback takes over, so never put content inside the canvas.
- Reduced motion is honored throughout: the scene draws one frame, the pan does not
  build, and reveals resolve immediately.
