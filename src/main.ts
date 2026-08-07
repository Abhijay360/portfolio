import './style.css'
import { FEATURED } from './featured'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <div class="atmosphere" aria-hidden="true">
    <div class="scanlines"></div>
    <div class="orb orb-a"></div>
    <div class="orb orb-b"></div>
    <div class="grid-wash"></div>
    <div class="vignette"></div>
  </div>

  <header class="topbar">
    <a class="mark" href="#top">> ABHIJAY_</a>
    <nav>
      <a href="#work">[ WORK ]</a>
      <a href="https://github.com/Abhijay360" target="_blank" rel="noreferrer">[ GITHUB ]</a>
      <a href="https://www.linkedin.com/in/abhijay-parija-51730b246" target="_blank" rel="noreferrer">[ LINKEDIN ]</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero">
      <p class="eyebrow">◆ PLAYER 1 · CS @ UMASS AMHERST ◆</p>
      <h1 class="brand">ABHIJAY</h1>
      <p class="lede">
        College projects that leave the lab — predictors, orbital tools,
        and hackathon products you can open in a browser.
      </p>
      <div class="cta-row">
        <a class="btn primary" href="#work">▶ INSERT COIN</a>
        <a class="btn ghost" href="mailto:abhijay.parija@gmail.com">✉ EMAIL ME</a>
      </div>
      <div class="hero-visual" id="hero-visual">
        <svg
          id="signal-svg"
          viewBox="0 0 320 80"
          shape-rendering="crispEdges"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Interactive neon signal graphic — move your cursor to warp the waves"
        >
          <path class="trace t1" id="trace-1" d="" />
          <path class="trace t2" id="trace-2" d="" />
          <rect class="cursor-glow" id="cursor-glow" x="-20" y="-20" width="16" height="16" />
          <rect class="node n1" id="node-1" x="100" y="16" width="8" height="8" />
          <rect class="node n2" id="node-2" x="168" y="41" width="8" height="8" />
          <rect class="node n3" id="node-3" x="244" y="31" width="6" height="6" />
        </svg>
        <p class="hud-line" id="hud-line">MOVE CURSOR · WARP SIGNAL · PRESS START</p>
      </div>
    </section>

    <section id="work" class="section">
      <div class="section-head">
        <h2>★ FEATURED WORK ★</h2>
        <p>Select a stage — four college builds with public demos.</p>
      </div>
      <div class="featured" id="featured"></div>
    </section>
  </main>

  <footer class="footer">
    <span>© ${new Date().getFullYear()} ABHIJAY · GAME OVER? NAH.</span>
    <div class="footer-links">
      <a href="https://github.com/Abhijay360" target="_blank" rel="noreferrer">GITHUB</a>
      <a href="https://www.linkedin.com/in/abhijay-parija-51730b246" target="_blank" rel="noreferrer">LINKEDIN</a>
    </div>
  </footer>
`

const accents = ['#FF2BD6', '#FF2A4D', '#FF5CA8', '#FF0040']

const featuredEl = document.querySelector('#featured')!
featuredEl.innerHTML = FEATURED.map(
  (p, i) => `
  <article class="feature" style="--accent:${accents[i % accents.length]}; --i:${i}">
    <div class="feature-meta">
      <span class="feature-index">STAGE 0${i + 1}</span>
      <h3>${p.title.toUpperCase()}</h3>
      <p>${p.blurb}</p>
      <ul class="tags">${p.tags.map((t) => `<li>${t.toUpperCase()}</li>`).join('')}</ul>
    </div>
    <div class="feature-actions">
      <a class="btn primary" href="${p.liveUrl}" target="_blank" rel="noreferrer">▶ PLAY</a>
      <a class="btn ghost" href="https://github.com/Abhijay360/${p.repo}" target="_blank" rel="noreferrer">SRC</a>
    </div>
  </article>
`,
).join('')

type Point = { x: number; y: number }

const WAVE_A: Point[] = [
  { x: 8, y: 50 },
  { x: 40, y: 50 },
  { x: 48, y: 30 },
  { x: 64, y: 30 },
  { x: 72, y: 55 },
  { x: 96, y: 55 },
  { x: 104, y: 20 },
  { x: 128, y: 20 },
  { x: 136, y: 45 },
  { x: 168, y: 45 },
  { x: 176, y: 28 },
  { x: 200, y: 28 },
  { x: 208, y: 60 },
  { x: 240, y: 60 },
  { x: 248, y: 35 },
  { x: 272, y: 35 },
  { x: 280, y: 48 },
  { x: 312, y: 48 },
]

const WAVE_B: Point[] = [
  { x: 8, y: 28 },
  { x: 32, y: 28 },
  { x: 40, y: 48 },
  { x: 56, y: 48 },
  { x: 64, y: 18 },
  { x: 88, y: 18 },
  { x: 96, y: 40 },
  { x: 120, y: 40 },
  { x: 128, y: 58 },
  { x: 152, y: 58 },
  { x: 160, y: 22 },
  { x: 184, y: 22 },
  { x: 192, y: 50 },
  { x: 224, y: 50 },
  { x: 232, y: 16 },
  { x: 256, y: 16 },
  { x: 264, y: 42 },
  { x: 312, y: 42 },
]

const NODES = [
  { el: 'node-1', x: 100, y: 16, size: 8, pull: 1 },
  { el: 'node-2', x: 168, y: 41, size: 8, pull: 0.85 },
  { el: 'node-3', x: 244, y: 31, size: 6, pull: 0.7 },
] as const

const VB_W = 320
const VB_H = 80

function snap(n: number, grid = 2): number {
  return Math.round(n / grid) * grid
}

function pathFrom(points: Point[]): string {
  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`)
    .join(' ')
}

function warpPoints(
  base: Point[],
  cursor: Point | null,
  strength: number,
): Point[] {
  if (!cursor) return base.map((p) => ({ ...p }))

  return base.map((p) => {
    const dx = cursor.x - p.x
    const dy = cursor.y - p.y
    const dist = Math.hypot(dx, dy) || 1
    const influence = Math.max(0, 1 - dist / 90)
    const pull = influence ** 2 * strength
    return {
      x: snap(p.x + dx * pull * 0.55),
      y: snap(Math.min(72, Math.max(8, p.y + dy * pull * 0.75)), 2),
    }
  })
}

function initSignalGraphic() {
  const visual = document.querySelector<HTMLDivElement>('#hero-visual')
  const svg = document.querySelector<SVGSVGElement>('#signal-svg')
  const trace1 = document.querySelector<SVGPathElement>('#trace-1')
  const trace2 = document.querySelector<SVGPathElement>('#trace-2')
  const glow = document.querySelector<SVGRectElement>('#cursor-glow')
  const hud = document.querySelector<HTMLParagraphElement>('#hud-line')
  if (!visual || !svg || !trace1 || !trace2 || !glow) return

  const nodeEls = NODES.map((n) => ({
    ...n,
    rect: document.querySelector<SVGRectElement>(`#${n.el}`)!,
  }))

  let cursor: Point | null = null
  let target: Point | null = null
  let raf = 0
  let active = false

  const render = () => {
    if (cursor && target) {
      cursor = {
        x: cursor.x + (target.x - cursor.x) * 0.28,
        y: cursor.y + (target.y - cursor.y) * 0.28,
      }
    }

    const a = warpPoints(WAVE_A, cursor, active ? 1.15 : 0)
    const b = warpPoints(WAVE_B, cursor, active ? 0.95 : 0)
    trace1.setAttribute('d', pathFrom(a))
    trace2.setAttribute('d', pathFrom(b))

    if (cursor && active) {
      glow.setAttribute('x', String(snap(cursor.x - 8)))
      glow.setAttribute('y', String(snap(cursor.y - 8)))
      glow.classList.add('on')
      visual.classList.add('hot')

      for (const node of nodeEls) {
        const dx = cursor.x - (node.x + node.size / 2)
        const dy = cursor.y - (node.y + node.size / 2)
        const dist = Math.hypot(dx, dy) || 1
        const influence = Math.max(0, 1 - dist / 100) ** 2 * node.pull
        const nx = snap(node.x + dx * influence * 0.65)
        const ny = snap(Math.min(70, Math.max(6, node.y + dy * influence * 0.65)))
        node.rect.setAttribute('x', String(nx))
        node.rect.setAttribute('y', String(ny))
      }
    } else {
      glow.classList.remove('on')
      visual.classList.remove('hot')
      for (const node of nodeEls) {
        node.rect.setAttribute('x', String(node.x))
        node.rect.setAttribute('y', String(node.y))
      }
    }

    raf = requestAnimationFrame(render)
  }

  const toSvgPoint = (clientX: number, clientY: number): Point => {
    const rect = svg.getBoundingClientRect()
    return {
      x: ((clientX - rect.left) / rect.width) * VB_W,
      y: ((clientY - rect.top) / rect.height) * VB_H,
    }
  }

  const onMove = (e: PointerEvent) => {
    active = true
    target = toSvgPoint(e.clientX, e.clientY)
    if (!cursor) cursor = { ...target }
    if (hud) hud.textContent = `X ${Math.round(target.x)} · Y ${Math.round(target.y)} · SIGNAL LOCK`
  }

  const onLeave = () => {
    active = false
    target = null
    cursor = null
    if (hud) hud.textContent = 'MOVE CURSOR · WARP SIGNAL · PRESS START'
  }

  visual.addEventListener('pointermove', onMove)
  visual.addEventListener('pointerenter', onMove)
  visual.addEventListener('pointerleave', onLeave)
  visual.addEventListener('pointerdown', onMove)

  // Seed resting paths before first frame paints
  trace1.setAttribute('d', pathFrom(WAVE_A))
  trace2.setAttribute('d', pathFrom(WAVE_B))
  raf = requestAnimationFrame(render)

  window.addEventListener(
    'beforeunload',
    () => cancelAnimationFrame(raf),
    { once: true },
  )
}

initSignalGraphic()
