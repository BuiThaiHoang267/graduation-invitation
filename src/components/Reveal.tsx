import { motion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}

const variants: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

export function Reveal({ children, delay = 0, y = 28, className, once = true }: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.25 }}
      variants={{
        hidden: { opacity: 0, y, filter: 'blur(8px)' },
        show: {
          ...variants.show,
          transition: { ...(variants.show as any).transition, delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
