import { motion } from 'framer-motion'
import { invitation } from '../data'

export function Avatar() {
  return (
    <div className="relative h-44 w-44 sm:h-52 sm:w-52">
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, #22d3ee, #a855f7, #e879f9, #22d3ee)',
          padding: 2,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <motion.div
        aria-hidden
        animate={{ rotate: -360 }}
        transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-3 rounded-full border border-white/10"
      />

      <div className="absolute inset-4 grid place-items-center overflow-hidden rounded-full bg-gradient-to-br from-ink-900 to-ink-950 shadow-[inset_0_0_40px_rgba(168,85,247,0.25)]">
        <div className="absolute inset-0 opacity-70">
          <div className="absolute -inset-8 animate-pulse-soft bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.6),transparent_55%)]" />
          <div className="absolute -inset-8 animate-pulse-soft bg-[radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.55),transparent_55%)]" />
        </div>
        <span className="relative font-display text-5xl font-semibold tracking-widest text-gradient sm:text-6xl">
          {invitation.initials}
        </span>
      </div>
    </div>
  )
}
