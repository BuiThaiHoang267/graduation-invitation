import { useEffect, useRef } from 'react'

type Trail = {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  size: number
  hue: number
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Skip on touch-only devices (no real cursor to trail)
    if (window.matchMedia('(hover: none)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let trails: Trail[] = []
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    let lastSpawn = 0
    const onMove = (e: PointerEvent) => {
      const now = performance.now()
      if (now - lastSpawn < 12) return
      lastSpawn = now
      for (let i = 0; i < 2; i++) {
        trails.push({
          x: e.clientX + (Math.random() - 0.5) * 4,
          y: e.clientY + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6 - 0.2,
          alpha: 0.9,
          size: Math.random() * 2.5 + 1,
          hue: Math.random() > 0.5 ? 188 : 280,
        })
      }
      if (trails.length > 220) trails = trails.slice(-220)
    }

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      trails = trails.filter((t) => t.alpha > 0.04)

      ctx.shadowBlur = 10
      for (const t of trails) {
        t.x += t.vx
        t.y += t.vy
        t.alpha *= 0.93
        t.size *= 0.985

        const color = `hsla(${t.hue}, 90%, 70%, ${t.alpha})`
        ctx.shadowColor = color
        ctx.beginPath()
        ctx.arc(t.x, t.y, Math.max(0.4, t.size), 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
      }
      ctx.shadowBlur = 0

      raf = requestAnimationFrame(tick)
    }

    resize()
    tick()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40"
    />
  )
}
