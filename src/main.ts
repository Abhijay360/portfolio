import './style.css'
import { FEATURED } from './featured'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <a class="skip-link" href="#work">Skip to quests</a>

  <div class="atmosphere" aria-hidden="true">
    <div class="village"></div>
    <div class="mist mist-a"></div>
    <div class="mist mist-b"></div>
    <div class="paper-grain"></div>
  </div>

  <header class="topbar">
    <div class="topbar-inner">
      <button type="button" class="shoulder" aria-hidden="true" tabindex="-1">L</button>
      <nav aria-label="Primary">
        <a class="nav-active" href="#top">Main Menu</a>
        <a href="#work">Quests</a>
        <a href="https://github.com/Abhijay360" target="_blank" rel="noreferrer">Guide</a>
        <a href="https://www.linkedin.com/in/abhijay-parija-51730b246" target="_blank" rel="noreferrer">World Map</a>
      </nav>
      <button type="button" class="shoulder" aria-hidden="true" tabindex="-1">R</button>
      <div class="top-icons" aria-hidden="true">
        <span class="icon-dot"></span>
        <span class="icon-bag"></span>
      </div>
    </div>
  </header>

  <main id="top" class="shell">
    <section class="hero" aria-labelledby="brand-title">
      <div class="hero-identity">
        <div class="avatar-frame">
          <img
            class="avatar-pixel"
            src="/avatar-pixel.png"
            width="288"
            height="288"
            alt="Portrait of Abhijay"
          />
        </div>
        <div class="hero-copy">
          <p class="eyebrow">旅人 · CS &amp; Business · UMass Amherst</p>
          <h1 class="brand" id="brand-title">Abhijay</h1>
          <p class="lede">
            College projects that leave the lab — predictors, orbital tools,
            and hackathon products you can open in a browser.
          </p>
          <div class="cta-row">
            <a class="btn primary" href="#work">Enter the Dojo</a>
            <a class="btn ghost" href="mailto:abhijay.parija@gmail.com">Send a Scroll</a>
          </div>
        </div>
      </div>

      <div class="hero-visual" id="hero-visual">
        <p class="panel-label">Ink brush · move to bend the stroke</p>
        <svg
          id="signal-svg"
          viewBox="0 0 320 80"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Interactive ink stroke graphic — move your cursor to warp the lines"
        >
          <path class="trace t1" id="trace-1" d="" />
          <path class="trace t2" id="trace-2" d="" />
          <circle class="cursor-glow" id="cursor-glow" cx="-20" cy="-20" r="5" />
          <circle class="node n1" id="node-1" cx="104" cy="20" r="3.5" />
          <circle class="node n2" id="node-2" cx="172" cy="45" r="3.5" />
          <circle class="node n3" id="node-3" cx="247" cy="34" r="2.5" />
        </svg>
        <p class="hud-line" id="hud-line">Hover the scroll · feel the ink</p>
      </div>
    </section>

    <section id="work" class="section" aria-labelledby="work-title">
      <div class="section-head">
        <p class="board-label">Village Notice Board</p>
        <h2 id="work-title">Featured Quests</h2>
        <p>Four college builds with public demos. Choose a path and enter.</p>
      </div>
      <div class="featured" id="featured"></div>
    </section>
  </main>

  <footer class="footer">
    <span>© ${new Date().getFullYear()} Abhijay · Walk the path</span>
    <div class="footer-links">
      <a href="https://github.com/Abhijay360" target="_blank" rel="noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/abhijay-parija-51730b246" target="_blank" rel="noreferrer">LinkedIn</a>
    </div>
  </footer>
`

const accents = ['#8B4518', '#C23B22', '#3E5C48', '#5C534A']

const featuredEl = document.querySelector('#featured')!
featuredEl.innerHTML = FEATURED.map(
  (p, i) => `
  <article class="feature" style="--accent:${accents[i % accents.length]}; --i:${i}">
    <div class="feature-meta">
      <span class="feature-index">Quest 0${i + 1}</span>
      <h3>${p.title}</h3>
      ${p.coAuthor ? `<p class="co-author">Co-author · ${p.coAuthor}</p>` : ''}
      <p>${p.blurb}</p>
      <ul class="tags">${p.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
    </div>
    <div class="feature-actions">
      <a class="btn primary" href="${p.liveUrl}" target="_blank" rel="noreferrer">Enter</a>
      <a class="btn ghost" href="https://github.com/Abhijay360/${p.repo}" target="_blank" rel="noreferrer">Source</a>
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
  { el: 'node-1', x: 104, y: 20, pull: 1 },
  { el: 'node-2', x: 172, y: 45, pull: 0.85 },
  { el: 'node-3', x: 247, y: 34, pull: 0.7 },
] as const

const VB_W = 320
const VB_H = 80

function soft(n: number): number {
  return Math.round(n * 10) / 10
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
      x: soft(p.x + dx * pull * 0.55),
      y: soft(Math.min(72, Math.max(8, p.y + dy * pull * 0.75))),
    }
  })
}

function initSignalGraphic() {
  const visual = document.querySelector<HTMLDivElement>('#hero-visual')
  const svg = document.querySelector<SVGSVGElement>('#signal-svg')
  const trace1 = document.querySelector<SVGPathElement>('#trace-1')
  const trace2 = document.querySelector<SVGPathElement>('#trace-2')
  const glow = document.querySelector<SVGCircleElement>('#cursor-glow')
  const hud = document.querySelector<HTMLParagraphElement>('#hud-line')
  if (!visual || !svg || !trace1 || !trace2 || !glow) return

  const nodeEls = NODES.map((n) => ({
    ...n,
    circle: document.querySelector<SVGCircleElement>(`#${n.el}`)!,
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
      glow.setAttribute('cx', String(soft(cursor.x)))
      glow.setAttribute('cy', String(soft(cursor.y)))
      glow.classList.add('on')
      visual.classList.add('hot')

      for (const node of nodeEls) {
        const dx = cursor.x - node.x
        const dy = cursor.y - node.y
        const dist = Math.hypot(dx, dy) || 1
        const influence = Math.max(0, 1 - dist / 100) ** 2 * node.pull
        node.circle.setAttribute('cx', String(soft(node.x + dx * influence * 0.65)))
        node.circle.setAttribute(
          'cy',
          String(soft(Math.min(70, Math.max(6, node.y + dy * influence * 0.65)))),
        )
      }
    } else {
      glow.classList.remove('on')
      visual.classList.remove('hot')
      for (const node of nodeEls) {
        node.circle.setAttribute('cx', String(node.x))
        node.circle.setAttribute('cy', String(node.y))
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
    if (hud) hud.textContent = `Ink · ${Math.round(target.x)}, ${Math.round(target.y)}`
  }

  const onLeave = () => {
    active = false
    target = null
    cursor = null
    if (hud) hud.textContent = 'Hover the scroll · feel the ink'
  }

  visual.addEventListener('pointermove', onMove)
  visual.addEventListener('pointerenter', onMove)
  visual.addEventListener('pointerleave', onLeave)
  visual.addEventListener('pointerdown', onMove)

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
