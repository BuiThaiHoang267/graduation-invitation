import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Diff = { days: number; hours: number; minutes: number; seconds: number; isPast: boolean }

function diffFrom(target: Date): Diff {
  const ms = target.getTime() - Date.now()
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  const days = Math.floor(ms / 86_400_000)
  const hours = Math.floor((ms % 86_400_000) / 3_600_000)
  const minutes = Math.floor((ms % 3_600_000) / 60_000)
  const seconds = Math.floor((ms % 60_000) / 1000)
  return { days, hours, minutes, seconds, isPast: false }
}

type Props = { isoDate: string }

const labels = { days: 'Ngày', hours: 'Giờ', minutes: 'Phút', seconds: 'Giây' } as const

export function Countdown({ isoDate }: Props) {
  const target = new Date(isoDate)
  const [diff, setDiff] = useState<Diff>(() => diffFrom(target))

  useEffect(() => {
    const id = setInterval(() => setDiff(diffFrom(target)), 1000)
    return () => clearInterval(id)
  }, [isoDate])

  if (diff.isPast) {
    return (
      <div className="font-mono text-sm uppercase tracking-[0.3em] text-accent-cyan">
        · Đã diễn ra ·
      </div>
    )
  }

  const cells = [
    { key: 'days', value: diff.days },
    { key: 'hours', value: diff.hours },
    { key: 'minutes', value: diff.minutes },
    { key: 'seconds', value: diff.seconds },
  ] as const

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4">
      {cells.map(({ key, value }) => (
        <div
          key={key}
          className="glass flex flex-col items-center justify-center px-2 py-4 sm:px-4 sm:py-6"
        >
          <div className="relative h-12 w-full overflow-hidden sm:h-16">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={value}
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -28, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 grid place-items-center font-display text-4xl font-semibold tabular-nums text-gradient sm:text-6xl"
              >
                {String(value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/60 sm:text-xs">
            {labels[key]}
          </div>
        </div>
      ))}
    </div>
  )
}
