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
      <div class="hero-visual" aria-hidden="true">
        <svg viewBox="0 0 320 80" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
          <path class="trace t1" d="M8 50 L40 50 L48 30 L64 30 L72 55 L96 55 L104 20 L128 20 L136 45 L168 45 L176 28 L200 28 L208 60 L240 60 L248 35 L272 35 L280 48 L312 48" />
          <path class="trace t2" d="M8 28 L32 28 L40 48 L56 48 L64 18 L88 18 L96 40 L120 40 L128 58 L152 58 L160 22 L184 22 L192 50 L224 50 L232 16 L256 16 L264 42 L312 42" />
          <rect class="node n1" x="100" y="16" width="8" height="8" />
          <rect class="node n2" x="168" y="41" width="8" height="8" />
          <rect class="node n3" x="244" y="31" width="6" height="6" />
        </svg>
        <p class="hud-line">HIGH SCORE · SHIPPED BUILDS · PRESS START</p>
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
