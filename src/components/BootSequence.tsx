import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const lines = [
  { label: '> graduation.init()', tag: 'OK' },
  { label: '> loading profile: bui-thai-hoang', tag: 'OK' },
  { label: '> fetching event metadata · 10/06/2026', tag: 'OK' },
  { label: '> mounting aurora background', tag: 'OK' },
  { label: '> graduation.exe ready', tag: '✓' },
] as const

const STEP_MS = 600
const TAIL_MS = 1100

type Props = {
  onComplete?: () => void
}

export function BootSequence({ onComplete }: Props) {
  const [done, setDone] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (done) return
    if (step >= lines.length) {
      const id = setTimeout(() => {
        setDone(true)
        onComplete?.() // fire NOW (start of fade) so confetti shows up with Hero
      }, TAIL_MS)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => setStep((s) => s + 1), STEP_MS)
    return () => clearTimeout(id)
  }, [step, done, onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="boot"
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] grid place-items-center bg-ink-950"
        >
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute -top-32 left-1/2 h-[40vw] w-[40vw] -translate-x-1/2 rounded-full bg-accent-cyan/15 blur-[120px]" />

          <div className="relative w-full max-w-md px-8 font-mono text-sm">
            <div className="mb-6 text-center text-[10px] uppercase tracking-[0.4em] text-accent-cyan/80">
              [ graduation.exe ]
            </div>

            <ul className="space-y-2 text-white/80">
              {lines.slice(0, step).map((line, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="truncate">{line.label}</span>
                  <span className="shrink-0 text-emerald-400">[{line.tag}]</span>
                </motion.li>
              ))}
              {step < lines.length && (
                <li className="flex items-center gap-1.5 text-accent-cyan">
                  <span>{'>'}</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                  >
                    █
                  </motion.span>
                </li>
              )}
            </ul>

            <div className="mt-8 h-[3px] overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(100, (step / lines.length) * 100)}%` }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-fuchsia"
              />
            </div>

            <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              <span>{Math.min(100, Math.round((step / lines.length) * 100))}%</span>
              <span>build · 2026.06.10</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
