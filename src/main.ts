import './style.css'
import { FEATURED } from './featured'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <div class="atmosphere" aria-hidden="true">
    <div class="orb orb-a"></div>
    <div class="orb orb-b"></div>
    <div class="grid-wash"></div>
  </div>

  <header class="topbar">
    <a class="mark" href="#top">Abhijay</a>
    <nav>
      <a href="#work">Work</a>
      <a href="https://github.com/Abhijay360" target="_blank" rel="noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/abhijay-parija-51730b246" target="_blank" rel="noreferrer">LinkedIn</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero">
      <p class="eyebrow">Computer Science · UMass Amherst</p>
      <h1 class="brand">Abhijay</h1>
      <p class="lede">
        College projects that leave the lab — predictors, orbital tools,
        and hackathon products you can open in a browser.
      </p>
      <div class="cta-row">
        <a class="btn primary" href="#work">See live projects</a>
        <a class="btn ghost" href="mailto:abhijay.parija@gmail.com">Email me</a>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <svg viewBox="0 0 1200 420" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="trace t1" d="M40 280 C 220 80, 380 360, 560 180 S 900 40, 1160 220" />
          <path class="trace t2" d="M20 160 C 260 320, 420 40, 640 240 S 980 360, 1180 120" />
          <circle class="node n1" cx="560" cy="180" r="6" />
          <circle class="node n2" cx="640" cy="240" r="6" />
          <circle class="node n3" cx="900" cy="90" r="4" />
        </svg>
      </div>
    </section>

    <section id="work" class="section">
      <div class="section-head">
        <h2>Featured work</h2>
        <p>Four college builds with public demos.</p>
      </div>
      <div class="featured" id="featured"></div>
    </section>
  </main>

  <footer class="footer">
    <span>© ${new Date().getFullYear()} Abhijay</span>
    <div class="footer-links">
      <a href="https://github.com/Abhijay360" target="_blank" rel="noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/abhijay-parija-51730b246" target="_blank" rel="noreferrer">LinkedIn</a>
    </div>
  </footer>
`

const featuredEl = document.querySelector('#featured')!
featuredEl.innerHTML = FEATURED.map(
  (p, i) => `
  <article class="feature" style="--accent:${p.accent}; --i:${i}">
    <div class="feature-meta">
      <span class="feature-index">0${i + 1}</span>
      <h3>${p.title}</h3>
      <p>${p.blurb}</p>
      <ul class="tags">${p.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
    </div>
    <div class="feature-actions">
      <a class="btn primary" href="${p.liveUrl}" target="_blank" rel="noreferrer">Open live</a>
      <a class="btn ghost" href="https://github.com/Abhijay360/${p.repo}" target="_blank" rel="noreferrer">Source</a>
    </div>
  </article>
`,
).join('')
