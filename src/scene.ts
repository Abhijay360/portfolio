import {
  AdditiveBlending, BufferAttribute, BufferGeometry, CanvasTexture, Color, Mesh,
  MeshBasicMaterial, PerspectiveCamera, Points, PointsMaterial, Scene, SRGBColorSpace,
  TorusGeometry, WebGLRenderer,
} from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AMBER = new Color('#ffa51f')
const COOL = new Color('#cfd6ff')

/** Depth of the volume the camera travels through. */
const FIELD_DEPTH = 900

type Layer = { points: Points; drift: number }

/** PointsMaterial draws hard quads without a map, so build a round sprite. */
function dotTexture(): CanvasTexture {
  const size = 64
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.35, 'rgba(255,255,255,0.75)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new CanvasTexture(c)
  tex.colorSpace = SRGBColorSpace
  return tex
}

const SPRITE = /* lazily created inside initScene */ { current: null as CanvasTexture | null }

function buildLayer(count: number, spread: number, size: number, color: Color, opacity: number): Layer {
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * spread
    pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.62
    pos[i * 3 + 2] = -Math.random() * FIELD_DEPTH
  }
  const geo = new BufferGeometry()
  geo.setAttribute('position', new BufferAttribute(pos, 3))
  const mat = new PointsMaterial({
    color, size, sizeAttenuation: true, transparent: true,
    opacity, depthWrite: false, blending: AdditiveBlending,
    map: SPRITE.current, alphaTest: 0.01,
  })
  return { points: new Points(geo, mat), drift: 0 }
}

export type SceneHandle = { destroy: () => void }

/**
 * Cinematic starfield behind the page. Camera depth is scrubbed by page scroll,
 * so the lobby reads as one continuous flight rather than per-section jumps.
 * Returns null when WebGL is unavailable so callers can fall back to the CSS backdrop.
 */
export function initScene(canvas: HTMLCanvasElement): SceneHandle | null {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let renderer: WebGLRenderer
  try {
    renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' })
  } catch {
    return null
  }
  if (!renderer.getContext()) return null

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  renderer.setPixelRatio(dpr)
  renderer.setSize(window.innerWidth, window.innerHeight, false)

  SPRITE.current = dotTexture()

  const scene = new Scene()
  const camera = new PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 1400)
  camera.position.set(0, 0, 40)

  // Particle budget scales with viewport so phones are not asked to draw a desktop field.
  const narrow = window.innerWidth < 768
  const far = buildLayer(narrow ? 900 : 3200, 620, 1.9, COOL, 0.7)
  const near = buildLayer(narrow ? 260 : 850, 420, 3.6, AMBER, 0.5)
  scene.add(far.points, near.points)

  // The core: a single bright ring the hero composition centres on.
  const ring = new Mesh(
    new TorusGeometry(13, 0.34, 2, 128),
    new MeshBasicMaterial({ color: AMBER, transparent: true, opacity: 0.85, blending: AdditiveBlending, depthWrite: false }),
  )
  ring.position.set(6, 1.5, -22)
  scene.add(ring)

  const halo = new Mesh(
    new TorusGeometry(13, 2.6, 2, 96),
    new MeshBasicMaterial({ color: AMBER, transparent: true, opacity: 0.11, blending: AdditiveBlending, depthWrite: false }),
  )
  halo.position.copy(ring.position)
  scene.add(halo)

  const pointer = { x: 0, y: 0 }
  const target = { x: 0, y: 0 }
  const onPointer = (e: PointerEvent) => {
    target.x = (e.clientX / window.innerWidth - 0.5) * 2
    target.y = (e.clientY / window.innerHeight - 0.5) * 2
  }

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight, false)
  }

  // Scroll drives depth. ScrollTrigger owns the scroll listener, never the window.
  const flight = { z: 40 }
  const st = ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1.1,
    onUpdate: (self) => { flight.z = 40 - self.progress * (FIELD_DEPTH - 160) },
  })

  let raf = 0
  let running = true
  const clockStart = performance.now()

  const render = () => {
    const t = (performance.now() - clockStart) / 1000

    if (!reduced) {
      pointer.x += (target.x - pointer.x) * 0.045
      pointer.y += (target.y - pointer.y) * 0.045
      far.points.rotation.z = t * 0.006
      near.points.rotation.z = -t * 0.011
      ring.rotation.x = 1.15 + Math.sin(t * 0.28) * 0.16
      ring.rotation.y = t * 0.22
      halo.rotation.copy(ring.rotation)
      const pulse = 0.78 + Math.sin(t * 1.5) * 0.12
      ;(ring.material as MeshBasicMaterial).opacity = pulse
    }

    camera.position.z += (flight.z - camera.position.z) * 0.06
    camera.position.x += (pointer.x * 4 - camera.position.x) * 0.04
    camera.position.y += (-pointer.y * 2.4 - camera.position.y) * 0.04
    camera.lookAt(0, 0, camera.position.z - 60)

    renderer.render(scene, camera)
    if (running) raf = requestAnimationFrame(render)
  }

  const onVisibility = () => {
    if (document.hidden) { running = false; cancelAnimationFrame(raf) }
    else if (!running) { running = true; raf = requestAnimationFrame(render) }
  }

  window.addEventListener('resize', onResize, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)
  if (!reduced) window.addEventListener('pointermove', onPointer, { passive: true })

  if (reduced) {
    // One still frame: the composition survives, the motion does not.
    camera.position.z = 40
    renderer.render(scene, camera)
  } else {
    raf = requestAnimationFrame(render)
  }

  return {
    destroy() {
      running = false
      cancelAnimationFrame(raf)
      st.kill()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
      SPRITE.current?.dispose()
      SPRITE.current = null
      far.points.geometry.dispose()
      near.points.geometry.dispose()
      ;(far.points.material as PointsMaterial).dispose()
      ;(near.points.material as PointsMaterial).dispose()
      ring.geometry.dispose(); (ring.material as MeshBasicMaterial).dispose()
      halo.geometry.dispose(); (halo.material as MeshBasicMaterial).dispose()
      renderer.dispose()
    },
  }
}
