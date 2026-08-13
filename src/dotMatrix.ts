export type DotMatrixOptions = {
  gap?: number
  dotSize?: number
  threshold?: number
  accent?: string
  accentSoft?: string
  bg?: string
}

export function initDotMatrix(
  canvas: HTMLCanvasElement,
  src: string,
  opts: DotMatrixOptions = {},
): () => void {
  const gap = opts.gap ?? 7
  const dotSize = opts.dotSize ?? 2.2
  const threshold = opts.threshold ?? 0.12
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
      const lum = (data[j] * 0.299 + data[j + 1] * 0.587 + data[j + 2] * 0.114) / 255
      samples[i] = lum
    }
  }

  const draw = () => {
    t += 0.018
    const { width, height } = canvas
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, width, height)

    if (!samples) {
      raf = requestAnimationFrame(draw)
      return
    }

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const lum = samples[y * cols + x]
        if (lum < threshold) continue

        const pulse = 0.85 + Math.sin(t + x * 0.22 + y * 0.15) * 0.15
        const alpha = Math.min(1, (lum - threshold) * 2.1) * pulse
        const size = dotSize * (0.65 + lum * 0.9)

        ctx.globalAlpha = alpha
        ctx.fillStyle = lum > 0.55 ? accent : accentSoft
        ctx.beginPath()
        ctx.arc(x * gap + gap / 2, y * gap + gap / 2, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    ctx.globalAlpha = 1
    raf = requestAnimationFrame(draw)
  }

  const onLoad = () => {
    resize()
    draw()
  }

  img.onload = onLoad
  if (img.complete) onLoad()

  const ro = new ResizeObserver(resize)
  ro.observe(canvas.parentElement ?? canvas)

  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
  }
}
