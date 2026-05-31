import { motion } from 'framer-motion'
import { invitation } from '../data'
import { Avatar } from './Avatar'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 py-24 sm:px-10">
      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger}
        className="flex w-full max-w-5xl flex-col items-center text-center"
      >
        <motion.div variants={item}>
          <Avatar />
        </motion.div>

        <motion.p
          variants={item}
          className="mt-10 font-mono text-xs uppercase tracking-[0.4em] text-white/50 sm:text-sm"
        >
          Lễ tốt nghiệp
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-4 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl"
        >
          <span className="text-aurora">{invitation.name}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-base text-white/70 sm:text-lg"
        >
          Trân trọng kính mời bạn đến chung vui trong ngày tốt nghiệp tại{' '}
          <span className="text-white">{invitation.schoolShort}</span>
        </motion.p>

        <motion.div variants={item} className="mt-14 flex items-center gap-2">
          <motion.span
            animate={{ opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-sm font-medium text-accent-cyan drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]"
          >
            Kéo xuống dưới nè
          </motion.span>
          <motion.span
            aria-hidden
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="text-accent-cyan"
          >
            ↓
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  )
}
