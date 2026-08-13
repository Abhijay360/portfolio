export type DotMatrixOptions = {
  gap?: number
  threshold?: number
  accent?: string
  accentSoft?: string
  bg?: string
}

type Ripple = {
  x: number
  y: number
  born: number
  power: number
}

const GLYPHS = ['·', '+', '=', '-', '×', ':'] as const

export function initDotMatrix(
  canvas: HTMLCanvasElement,
  src: string,
  opts: DotMatrixOptions = {},
): () => void {
  const gap = opts.gap ?? 8
  const threshold = opts.threshold ?? 0.11
  const accent = opts.accent ?? '#64ffda'
  const accentSoft = opts.accentSoft ?? '#4db8a4'
  const bg = opts.bg ?? '#0a192f'

  const ctx = canvas.getContext('2d')
  if (!ctx) return () => undefined

  const off = document.createElement('canvas')
  const offCtx = off.getContext('2d')
  if (!offCtx) return () => undefined

  const img = new Image()
  img.src = src
  img.crossOrigin = 'anonymous'

  let raf = 0
  let t = 0
  let cols = 0
  let rows = 0
  let samples: Float32Array | null = null
  const ripples: Ripple[] = []
  let pointer: { x: number; y: number; active: boolean } | null = null

  const resize = () => {
    const parent = canvas.parentElement
    if (!parent) return
    const w = Math.round(parent.clientWidth)
    const h = Math.round(parent.clientHeight)
    if (w < 1 || h < 1) return
    canvas.width = w
    canvas.height = h
    cols = Math.floor(w / gap)
    rows = Math.floor(h / gap)
    off.width = cols
    off.height = rows
    samples = null
    if (img.complete && img.naturalWidth) sample()
  }

  const sample = () => {
    if (!samples) samples = new Float32Array(cols * rows)
    offCtx.clearRect(0, 0, cols, rows)
    offCtx.drawImage(img, 0, 0, cols, rows)
    const data = offCtx.getImageData(0, 0, cols, rows).data
    for (let i = 0; i < cols * rows; i++) {
      const j = i * 4
      samples[i] =
        (data[j] * 0.299 + data[j + 1] * 0.587 + data[j + 2] * 0.114) / 255
    }
  }

  const toGrid = (clientX: number, clientY: number) => {
    const rect = canvas.getBoundingClientRect()
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height,
    }
  }

  const pushRipple = (x: number, y: number, power = 1) => {
    ripples.push({ x, y, born: t, power })
    if (ripples.length > 10) ripples.shift()
  }

  const displacementAt = (px: number, py: number) => {
    let dx = 0
    let dy = 0
    let boost = 0

    for (const ripple of ripples) {
      const age = t - ripple.born
      if (age > 4.5) continue
      const dist = Math.hypot(px - ripple.x, py - ripple.y) || 1
      const wave =
        Math.sin(dist * 0.14 - age * 5.5) *
        Math.exp(-age * 0.85) *
        Math.exp(-dist * 0.018) *
        ripple.power
      dx += ((px - ripple.x) / dist) * wave * 14
      dy += ((py - ripple.y) / dist) * wave * 14
      boost += Math.max(0, wave) * 0.55
    }

    if (pointer?.active) {
      const dist = Math.hypot(px - pointer.x, py - pointer.y) || 1
      const pull = Math.max(0, 1 - dist / 90) ** 2
      dx += ((px - pointer.x) / dist) * pull * 10
      dy += ((py - pointer.y) / dist) * pull * 10
      boost += pull * 0.35
    }

    dx += Math.sin(t * 1.1 + px * 0.035 + py * 0.02) * 1.4
    dy += Math.cos(t * 0.95 + px * 0.02 - py * 0.03) * 1.4

    return { dx, dy, boost }
  }

  const glyphFor = (lum: number, x: number, y: number) => {
    const idx = Math.min(
      GLYPHS.length - 1,
      Math.floor(lum * GLYPHS.length + Math.sin(t + x + y) * 0.4),
    )
    return GLYPHS[idx]
  }

  const draw = () => {
    t += 0.016
    ripples.splice(
      0,
      ripples.length,
      ...ripples.filter((r) => t - r.born < 4.5),
    )

    ctx.fillStyle = bg
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (!samples) {
      raf = requestAnimationFrame(draw)
      return
    }

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = `600 ${Math.max(7, gap - 1)}px "JetBrains Mono", monospace`

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const lum = samples[y * cols + x]
        if (lum < threshold) continue

        const baseX = x * gap + gap / 2
        const baseY = y * gap + gap / 2
        const { dx, dy, boost } = displacementAt(baseX, baseY)
        const pulse = 0.82 + Math.sin(t * 1.4 + x * 0.25 + y * 0.18) * 0.18
        const alpha = Math.min(1, (lum - threshold) * 2.2) * pulse * (1 + boost * 0.35)
        const size = gap * (0.55 + lum * 0.45 + boost * 0.25)

        ctx.globalAlpha = alpha
        ctx.fillStyle = lum + boost * 0.2 > 0.55 ? accent : accentSoft
        ctx.font = `600 ${Math.max(7, size)}px "JetBrains Mono", monospace`
        ctx.fillText(glyphFor(lum + boost * 0.15, x, y), baseX + dx, baseY + dy)
      }
    }

    ctx.globalAlpha = 1
    raf = requestAnimationFrame(draw)
  }

  const onPointerDown = (e: PointerEvent) => {
    canvas.setPointerCapture(e.pointerId)
    const p = toGrid(e.clientX, e.clientY)
    pointer = { ...p, active: true }
    pushRipple(p.x, p.y, 1.35)
  }

  const onPointerMove = (e: PointerEvent) => {
    const p = toGrid(e.clientX, e.clientY)
    if (pointer?.active) {
      pointer.x = p.x
      pointer.y = p.y
      if (e.buttons > 0 && Math.random() < 0.18) pushRipple(p.x, p.y, 0.55)
    }
  }

  const onPointerUp = (e: PointerEvent) => {
    if (pointer) {
      pushRipple(pointer.x, pointer.y, 0.9)
    }
    pointer = null
    try {
      canvas.releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
  }

  const onClick = (e: MouseEvent) => {
    const p = toGrid(e.clientX, e.clientY)
    pushRipple(p.x, p.y, 1.1)
  }

  const onLoad = () => {
    resize()
    draw()
  }

  canvas.style.touchAction = 'none'
  canvas.addEventListener('pointerdown', onPointerDown)
  canvas.addEventListener('pointermove', onPointerMove)
  canvas.addEventListener('pointerup', onPointerUp)
  canvas.addEventListener('pointercancel', onPointerUp)
  canvas.addEventListener('click', onClick)

  img.onload = onLoad
  if (img.complete) onLoad()

  const ro = new ResizeObserver(resize)
  ro.observe(canvas.parentElement ?? canvas)

  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    canvas.removeEventListener('pointerdown', onPointerDown)
    canvas.removeEventListener('pointermove', onPointerMove)
    canvas.removeEventListener('pointerup', onPointerUp)
    canvas.removeEventListener('pointercancel', onPointerUp)
    canvas.removeEventListener('click', onClick)
  }
}
