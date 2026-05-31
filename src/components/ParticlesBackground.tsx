import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  hue: number
}

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let particles: Particle[] = []
    let mouse = { x: -9999, y: -9999 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.scale(dpr, dpr)

      const count = Math.min(110, Math.floor((window.innerWidth * window.innerHeight) / 16000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.6 + 0.2,
        hue: Math.random() > 0.5 ? 188 : 280,
      }))
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = window.innerWidth
        if (p.x > window.innerWidth) p.x = 0
        if (p.y < 0) p.y = window.innerHeight
        if (p.y > window.innerHeight) p.y = 0

        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < 140) {
          const force = (140 - dist) / 140
          p.x += (dx / dist) * force * 1.2
          p.y += (dy / dist) * force * 1.2
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${p.alpha})`
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.22
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2}, 90%, 70%, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    tick()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />
}
