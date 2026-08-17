import './style.css'
import { FEATURED, githubUrlFor } from './featured'
import { initDotMatrix } from './dotMatrix'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <a class="skip-link" href="#software">Skip to projects</a>

  <header class="site-header">
    <nav class="site-nav" aria-label="Primary">
      <a class="nav-active" href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#software">Software</a>
    </nav>
    <div class="social-row" aria-label="Social links">
      <a href="mailto:abhijay.parija@gmail.com" aria-label="Email">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8.24l7.38 6.11a1 1 0 0 0 1.24 0L20 8.24V18H4z"/></svg>
      </a>
      <a href="https://github.com/Abhijay360" target="_blank" rel="noreferrer" aria-label="GitHub">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.12-1.46-1.12-1.46-.92-.63.07-.62.07-.62 1.02.07 1.55 1.05 1.55 1.05.9 1.55 2.36 1.1 2.94.84.1-.65.35-1.1.64-1.35-2.22-.25-4.56-1.11-4.56-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2z"/></svg>
      </a>
      <a href="https://www.linkedin.com/in/abhijay-parija-51730b246" target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.7H3.6V21h2.9V8.7zM5 3a1.7 1.7 0 1 0 0 3.4A1.7 1.7 0 0 0 5 3zM9 8.7h2.8v1.7h.04c.39-.74 1.35-1.52 2.78-1.52 2.97 0 3.52 1.95 3.52 4.49V21h-2.9v-6.8c0-1.62-.03-3.7-2.25-3.7-2.26 0-2.6 1.76-2.6 3.58V21H9V8.7z"/></svg>
      </a>
    </div>
  </header>

  <main>
    <section id="home" class="hero">
      <div class="hero-grid">
        <div class="dot-wrap" title="Click the pixels to ripple the portrait">
          <canvas id="dot-avatar" role="img" aria-label="Interactive dot-matrix portrait of Abhijay — click to ripple"></canvas>
          <p class="dot-hint">Click the pixels</p>
        </div>
        <div class="hero-copy">
          <h1 class="hero-title">hi, <span class="accent">abhijay</span> here.</h1>
          <p class="hero-lede">
            I'm a CS &amp; Business sophomore at UMass Amherst building
            predictors, orbital tools, and hackathon products you can open in a browser.
          </p>
          <a class="btn-outline" href="mailto:abhijay.parija@gmail.com">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4V6zm8 6.8L6.8 8.4h10.4L12 12.8z"/></svg>
            Say hi!
          </a>
        </div>
      </div>
    </section>

    <section id="about" class="section about">
      <div class="section-head">
        <h2><span class="slash">/</span> about me</h2>
        <span class="head-line" aria-hidden="true"></span>
      </div>
      <div class="about-grid">
        <div class="about-copy">
          <p>
            Hey! My name is Abhijay and I enjoy building software that leaves the lab —
            from sports analytics and orbital safety to dorm matching, flight risk,
            and experiment-planning tools.
          </p>
          <p>
            Right now, I'm a sophomore studying Computer Science &amp; Business at
            <span class="accent">UMass Amherst</span>, shipping full-stack projects with
            live demos on Render.
          </p>
          <p class="about-sub">Here are some technologies I have been working with:</p>
          <ul class="tech-list">
            <li>Python</li>
            <li>TypeScript</li>
            <li>FastAPI</li>
            <li>React / Next.js</li>
            <li>Three.js</li>
            <li>Monte Carlo / ML</li>
            <li>scikit-learn</li>
          </ul>
        </div>
        <div class="about-photo-wrap">
          <img
            class="about-photo"
            src="/about.jpg"
            width="640"
            height="800"
            alt="Abhijay in a striped polo shirt"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <section id="software" class="section software">
      <div class="section-head software-head">
        <h2><span class="slash">/</span> software</h2>
        <a class="view-all" href="https://github.com/Abhijay360?tab=repositories" target="_blank" rel="noreferrer">
          View all projects
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12m0 0-4-4m4 4-4 4"/></svg>
        </a>
      </div>

      <div class="carousel" id="carousel">
        <button type="button" class="carousel-btn prev" id="carousel-prev" aria-label="Previous project">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>
        </button>
        <div class="carousel-stage" id="carousel-stage"></div>
        <button type="button" class="carousel-btn next" id="carousel-next" aria-label="Next project">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        </button>
      </div>
      <div class="carousel-dots" id="carousel-dots" role="tablist" aria-label="Featured projects"></div>

      <div class="project-grid" id="project-grid"></div>
    </section>
  </main>

  <footer class="footer">
    <p>Built by Abhijay · ${new Date().getFullYear()}</p>
  </footer>
`

const carouselStage = document.querySelector<HTMLDivElement>('#carousel-stage')!
const carouselDots = document.querySelector<HTMLDivElement>('#carousel-dots')!
const projectGrid = document.querySelector<HTMLDivElement>('#project-grid')!

let carouselIndex = 0

function renderCarousel() {
  const p = FEATURED[carouselIndex]
  const github = githubUrlFor(p)
  const liveHref = p.liveUrl ?? github
  const liveLabel = p.liveUrl ? 'Open live demo' : 'View source'
  carouselStage.innerHTML = `
    <article class="carousel-slide" style="--accent:${p.accent}">
      <img class="carousel-image" src="${p.image}" alt="${p.title} screenshot" loading="eager" />
      <div class="carousel-overlay">
        <h3>${p.title}</h3>
        <p>${p.blurb}</p>
        <p class="carousel-stack">${p.stack.toUpperCase()}</p>
        <div class="carousel-actions">
          <a class="btn-live" href="${liveHref}" target="_blank" rel="noreferrer">${liveLabel}</a>
          ${p.liveUrl ? `<a class="btn-source" href="${github}" target="_blank" rel="noreferrer">Source</a>` : ''}
        </div>
      </div>
    </article>
  `

  carouselDots.innerHTML = FEATURED.map(
    (_, i) => `
    <button
      type="button"
      class="dot-btn${i === carouselIndex ? ' active' : ''}"
      role="tab"
      aria-selected="${i === carouselIndex}"
      aria-label="Show ${FEATURED[i].title}"
      data-i="${i}"
    ></button>
  `,
  ).join('')
}

function setCarousel(i: number) {
  carouselIndex = (i + FEATURED.length) % FEATURED.length
  renderCarousel()
}

projectGrid.innerHTML = FEATURED.map(
  (p) => {
    const github = githubUrlFor(p)
    const liveHref = p.liveUrl ?? github
    return `
  <article class="project-card" style="--accent:${p.accent}">
    <div class="card-top">
      <svg class="folder-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/></svg>
      <div class="card-links">
        <a href="${github}" target="_blank" rel="noreferrer" aria-label="${p.title} GitHub">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.12-1.46-1.12-1.46-.92-.63.07-.62.07-.62 1.02.07 1.55 1.05 1.55 1.05.9 1.55 2.36 1.1 2.94.84.1-.65.35-1.1.64-1.35-2.22-.25-4.56-1.11-4.56-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2z"/></svg>
        </a>
        ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noreferrer" aria-label="${p.title} live demo">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7m0-7L10 14m-4 7h7"/></svg>
        </a>` : ''}
      </div>
    </div>
    <a class="card-preview" href="${liveHref}" target="_blank" rel="noreferrer" aria-label="${p.liveUrl ? `Open ${p.title} live demo` : `Open ${p.title} source`}">
      ${(p.images ?? [p.image])
        .map(
          (src, i) =>
            `<img src="${src}" alt="${p.title} screenshot ${i + 1}" loading="lazy" />`,
        )
        .join('')}
      <span class="preview-badge">${p.liveUrl ? 'Live demo' : 'Screenshot'}</span>
    </a>
    <h3><a href="${liveHref}" target="_blank" rel="noreferrer">${p.title}</a></h3>
    ${p.coAuthor ? `<p class="co-author">${/[,&]/.test(p.coAuthor) ? 'Co-authors' : 'Co-author'} · ${p.coAuthor}</p>` : ''}
    <p class="card-blurb">${p.blurb}</p>
    <ul class="card-tags">${p.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
    <div class="card-actions">
      ${p.liveUrl ? `<a class="btn-live" href="${p.liveUrl}" target="_blank" rel="noreferrer">Open demo</a>` : ''}
      <a class="btn-source" href="${github}" target="_blank" rel="noreferrer">Source</a>
    </div>
  </article>
`
  },
).join('')

renderCarousel()

document.querySelector('#carousel-prev')?.addEventListener('click', () => setCarousel(carouselIndex - 1))
document.querySelector('#carousel-next')?.addEventListener('click', () => setCarousel(carouselIndex + 1))
carouselDots.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-i]')
  if (btn) setCarousel(Number(btn.dataset.i))
})

const canvas = document.querySelector<HTMLCanvasElement>('#dot-avatar')
if (canvas) initDotMatrix(canvas, '/avatar-source.jpg')

// Highlight active nav link on scroll
const navLinks = document.querySelectorAll<HTMLAnchorElement>('.site-nav a')
const sections = ['home', 'about', 'software'].map((id) => document.getElementById(id))

const onScroll = () => {
  const y = window.scrollY + 120
  let current = 'home'
  for (const sec of sections) {
    if (sec && sec.offsetTop <= y) current = sec.id
  }
  navLinks.forEach((a) => {
    a.classList.toggle('nav-active', a.getAttribute('href') === `#${current}`)
  })
}

window.addEventListener('scroll', onScroll, { passive: true })
onScroll()
