import { invitation } from '../data'
import { Reveal } from './Reveal'

const stats = [
  { k: 'Bằng cấp', v: invitation.degree },
  { k: 'Chuyên ngành', v: invitation.major },
  { k: 'Trường', v: invitation.schoolShort },
  { k: 'Năm tốt nghiệp', v: '2026' },
] as const

export function DegreeSection() {
  return (
    <section className="relative px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <span className="chip">01 · Thông tin</span>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              Bốn năm,{' '}
              <span className="text-gradient">một chặng đường</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass-strong p-6 sm:p-10">
            <dl className="grid gap-px overflow-hidden rounded-2xl bg-white/5 sm:grid-cols-4">
              {stats.map(({ k, v }) => (
                <div key={k} className="bg-ink-950/60 p-5 sm:p-6">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
                    {k}
                  </dt>
                  <dd className="mt-2 font-display text-xl font-medium text-white sm:text-2xl">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/60">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">
                {'>'} status
              </span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-mono text-xs text-emerald-300">
                graduated · OK
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
