import './style.css'
import { FEATURED, githubUrlFor } from './featured'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const app = document.querySelector<HTMLDivElement>('#app')!
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const arrow = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4"/></svg>`

const missions = FEATURED.map((p) => {
  const github = githubUrlFor(p)
  const live = p.liveUrl
  return `
  <article class="mission">
    <a class="mission-frame" href="${live ?? github}" target="_blank" rel="noreferrer"
       aria-label="${live ? `Open the ${p.title} live demo` : `View ${p.title} source`}">
      <img src="${p.image}" width="1280" height="800" alt="${p.title} interface" loading="lazy" decoding="async"/>
    </a>
    <h3>${p.title}</h3>
    ${p.coAuthor ? `<p class="credit">With ${p.coAuthor}</p>` : ''}
    <p class="blurb">${p.blurb}</p>
    <p class="stack" translate="no">${p.stack.split(', ').join('  /  ')}</p>
    <div class="mission-cta">
      ${live ? `<a class="launch" href="${live}" target="_blank" rel="noreferrer">Open demo ${arrow}</a>` : ''}
      <a class="source" href="${github}" target="_blank" rel="noreferrer">Source</a>
    </div>
  </article>`
}).join('')

const liveCount = FEATURED.filter((p) => p.liveUrl).length

app.innerHTML = `
  <a class="skip-link" href="#work">Skip to the work</a>
  <div class="backdrop"></div>
  <canvas id="bg-canvas" aria-hidden="true"></canvas>
  <div class="vignette"></div>
  <div class="grain"></div>

  <div class="page">
    <nav class="nav" aria-label="Primary">
      <a class="wordmark" href="#top"><span class="pip" aria-hidden="true"></span>Abhijay Parija</a>
      <div class="nav-links">
        <a href="#work" data-nav="work">Work</a>
        <a href="#about" data-nav="about">About</a>
        <a href="https://github.com/Abhijay360" target="_blank" rel="noreferrer">GitHub</a>
      </div>
      <a class="nav-cta" href="mailto:abhijay.parija@gmail.com">Get in touch</a>
    </nav>

    <main id="top">
      <header class="hero bleed">
        <div class="hero-inner">
          <h1>Everything here <span class="lit">launches</span>.</h1>
          <p class="hero-lede">
            CS and Business at UMass Amherst. ${FEATURED.length} projects,
            ${liveCount} working deploys you can open right now.
          </p>
          <div class="hero-cta">
            <a class="btn" href="#work">View the work</a>
            <a class="btn-quiet" href="mailto:abhijay.parija@gmail.com">Get in touch</a>
          </div>
        </div>
      </header>

      <section class="affil bleed" aria-label="Affiliations">
        <p class="affil-lead">Studying and building at</p>
        <div class="affil-marks">
          <a class="affil-mark" href="https://www.umass.edu" target="_blank" rel="noreferrer">
            <img src="/logos/umass.png" width="256" height="256"
                 alt="University of Massachusetts Amherst" loading="lazy" decoding="async"/>
          </a>
          <a class="affil-mark" href="https://www.umassai.com" target="_blank" rel="noreferrer">
            <img src="/logos/massai.png" width="256" height="256"
                 alt="MassAI at UMass Amherst" loading="lazy" decoding="async"/>
          </a>
        </div>
      </section>

      <section id="work" class="section missions" aria-labelledby="work-title">
        <div class="section-head missions-head">
          <h2 id="work-title">Selected work</h2>
          <span class="meta">${liveCount} live demos</span>
        </div>
        <div class="mission-track" id="mission-track" tabindex="0" role="group" aria-label="Project rail, scrolls horizontally">${missions}</div>
      </section>

      <section id="about" class="section bleed" aria-labelledby="about-title">
        <div class="section-head"><h2 id="about-title">About</h2></div>
        <div class="about-grid">
          <div class="about-copy reveal">
            <p>
              I build software that leaves the lab. Sports analytics, orbital safety,
              dorm matching, flight risk, experiment planning. The common thread is that
              each one ends up as something you can actually open and use.
            </p>
            <p>
              Right now I am a sophomore studying <strong>Computer Science and Business
              at UMass Amherst</strong>, shipping full-stack projects and deploying them
              so they stay reachable.
            </p>
            <ul class="tech" translate="no">
              <li>Python</li><li>TypeScript</li><li>FastAPI</li><li>React</li>
              <li>Next.js</li><li>Three.js</li><li>scikit-learn</li><li>Monte Carlo</li>
            </ul>
          </div>
          <div class="portrait reveal">
            <img src="/about.jpg" width="1200" height="1500" alt="Abhijay Parija" loading="lazy" decoding="async"/>
          </div>
        </div>
      </section>

      <section class="section contact bleed" aria-labelledby="contact-title">
        <h2 id="contact-title" class="reveal">Want to work together?</h2>
        <p class="reveal">Email is the fastest way to reach me, and I read everything that comes in.</p>
        <div class="hero-cta reveal">
          <a class="btn" href="mailto:abhijay.parija@gmail.com">Get in touch</a>
          <a class="btn-quiet" href="https://github.com/Abhijay360" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </section>

      <footer class="footer bleed">
        <span>Abhijay Parija, ${new Date().getFullYear()}</span>
        <div class="footer-links">
          <a href="mailto:abhijay.parija@gmail.com">Email</a>
          <a href="https://github.com/Abhijay360" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/abhijay-parija-51730b246" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </footer>
    </main>
  </div>
`

/* --- reveals: IntersectionObserver, never a scroll listener ------ */
// Opt in only now that JS is confirmed running (see .js-reveal in the CSS).
if (!reduced) document.documentElement.classList.add('js-reveal')
const revealIO = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('shown')
        revealIO.unobserve(e.target)
      }
    }
  },
  { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
)
document.querySelectorAll('.reveal').forEach((el, i) => {
  ;(el as HTMLElement).style.transitionDelay = `${Math.min(i, 5) * 55}ms`
  revealIO.observe(el)
})

/* --- nav current section ----------------------------------------- */
const navLinks = document.querySelectorAll<HTMLAnchorElement>('[data-nav]')
const navIO = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue
      navLinks.forEach((a) => a.setAttribute('aria-current', String(a.dataset.nav === e.target.id)))
    }
  },
  { threshold: 0.35 },
)
;['work', 'about'].forEach((id) => {
  const el = document.getElementById(id)
  if (el) navIO.observe(el)
})

const track = document.getElementById('mission-track')

/* --- mission pan -------------------------------------------------
   Vertical scroll drives horizontal travel while the section is pinned.
   Desktop pointer only: under 769px the track is a plain vertical stack
   and no tween is built. Reduced motion opts out entirely, leaving the
   track as a native horizontal scroll rail.                          */
const missionsSection = document.getElementById('work')

if (track && missionsSection) {
  const desktop = window.matchMedia('(min-width: 769px)')
  let teardown: (() => void) | null = null

  const buildPan = () => {
    track.classList.add('panning')
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)
    if (distance() <= 0) { track.classList.remove('panning'); return }

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: missionsSection,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })

    // Tabbing to a card that has not panned into view would strand the
    // user, so map the focused card back onto the scroll that reveals it.
    const onFocusIn = (e: FocusEvent) => {
      const card = (e.target as HTMLElement)?.closest<HTMLElement>('.mission')
      const st = tween.scrollTrigger
      if (!card || !st) return
      const total = distance()
      if (total <= 0) return
      const ratio = Math.min(Math.max((card.offsetLeft - 80) / total, 0), 1)
      window.scrollTo({ top: st.start + ratio * (st.end - st.start) })
    }
    track.addEventListener('focusin', onFocusIn)

    teardown = () => {
      track.removeEventListener('focusin', onFocusIn)
      tween.scrollTrigger?.kill()
      tween.kill()
      gsap.set(track, { clearProps: 'x' })
      track.classList.remove('panning')
      teardown = null
    }
  }

  const sync = () => {
    teardown?.()
    if (desktop.matches && !reduced) buildPan()
    ScrollTrigger.refresh()
  }

  sync()
  desktop.addEventListener('change', sync)
}

/* --- in-page anchors: smoothed per click, never via CSS ---------- */
document.addEventListener('click', (e) => {
  const link = (e.target as HTMLElement)?.closest<HTMLAnchorElement>('a[href^="#"]')
  if (!link) return
  const id = link.getAttribute('href')!.slice(1)
  const dest = document.getElementById(id)
  if (!dest) return
  e.preventDefault()
  dest.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  dest.setAttribute('tabindex', '-1')
  dest.focus({ preventScroll: true })
})

/* --- 3D backdrop: lazy, non-blocking, entirely optional ---------- */
const canvas = document.querySelector<HTMLCanvasElement>('#bg-canvas')
if (canvas) {
  import('./scene')
    .then(({ initScene }) => {
      if (!initScene(canvas)) canvas.remove()
    })
    .catch(() => canvas.remove())
}

/* Pin geometry depends on loaded fonts and images, so recompute once
   both have settled rather than after each async chunk lands. */
Promise.all([
  document.fonts?.ready ?? Promise.resolve(),
  new Promise((r) => (document.readyState === 'complete' ? r(null) : window.addEventListener('load', r, { once: true }))),
]).then(() => ScrollTrigger.refresh())
