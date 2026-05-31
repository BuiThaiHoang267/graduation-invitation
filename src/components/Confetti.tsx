import { useEffect, useRef, useState } from 'react'

const DURATION_MS = 3200
const FADE_TAIL_MS = 900
const COUNT = 180

type Props = {
  trigger: boolean
}

type Confetto = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rotation: number
  rotationSpeed: number
  color: string
  shape: 'rect' | 'circle' | 'line'
  alpha: number
}

const COLORS = ['#22d3ee', '#67e8f9', '#a855f7', '#e879f9', '#f0abfc', '#ffffff']

export function Confetti({ trigger }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [active, setActive] = useState(false)
  const hasFiredRef = useRef(false)

  useEffect(() => {
    if (trigger && !hasFiredRef.current) {
      hasFiredRef.current = true
      setActive(true)
    }
  }, [trigger])

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const W = window.innerWidth
    const H = window.innerHeight
    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.width = W + 'px'
    canvas.style.height = H + 'px'
    ctx.scale(dpr, dpr)

    const shapes: Confetto['shape'][] = ['rect', 'circle', 'line']
    // Mix: 60% rain from top, 40% cannon burst from bottom corners
    const particles: Confetto[] = Array.from({ length: COUNT }, (_, i) => {
      const isCannon = i >= Math.floor(COUNT * 0.6)
      if (isCannon) {
        const fromLeft = i % 2 === 0
        const angle = fromLeft
          ? -Math.PI / 4 + (Math.random() - 0.5) * 0.6
          : (-Math.PI * 3) / 4 + (Math.random() - 0.5) * 0.6
        const speed = 10 + Math.random() * 6
        return {
          x: fromLeft ? 0 : W,
          y: H,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 7 + 4,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.3,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          alpha: 1,
        }
      }
      return {
        x: Math.random() * W,
        y: -20 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 3.5,
        vy: Math.random() * 2 + 2,
        size: Math.random() * 7 + 4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.25,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        alpha: 1,
      }
    })

    const startTime = performance.now()
    let raf = 0

    const tick = () => {
      const elapsed = performance.now() - startTime
      ctx.clearRect(0, 0, W, H)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.08 // gravity
        p.vx *= 0.992 // drag
        p.rotation += p.rotationSpeed

        const remaining = DURATION_MS - elapsed
        if (remaining < FADE_TAIL_MS) {
          p.alpha = Math.max(0, remaining / FADE_TAIL_MS)
        }

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.fillStyle = p.color

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        } else if (p.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2.2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // line / streamer
          ctx.fillRect(-p.size / 2, -1, p.size, 2)
        }
        ctx.restore()
      }

      if (elapsed < DURATION_MS) {
        raf = requestAnimationFrame(tick)
      } else {
        setActive(false)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
    />
  )
}
