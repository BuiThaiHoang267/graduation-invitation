import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { type PointerEvent, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  intensity?: number
}

export function TiltCard({ children, className, intensity = 12 }: Props) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { stiffness: 120, damping: 16, mass: 0.6 }
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), springConfig)
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), springConfig)
  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%'])
  const glareBg = useMotionTemplate`radial-gradient(260px circle at ${glareX} ${glareY}, rgba(255,255,255,0.22), transparent 60%)`

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={`preserve-3d relative ${className ?? ''}`}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-70 mix-blend-overlay"
        style={{ background: glareBg }}
      />
    </motion.div>
  )
}
