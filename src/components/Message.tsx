import { invitation } from '../data'
import { Reveal } from './Reveal'

export function Message() {
  return (
    <section className="relative px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <span className="chip">03 · Lời nhắn</span>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              Gửi đến bạn
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass-strong relative p-8 sm:p-12">
            <span
              aria-hidden
              className="absolute -top-8 left-6 font-display text-[8rem] leading-none text-accent-violet/30 sm:text-[10rem]"
            >
              "
            </span>
            <p className="relative text-balance text-base leading-relaxed text-white/85 sm:text-xl sm:leading-[1.7]">
              {invitation.message}
            </p>
            <div className="relative mt-8 flex items-center justify-end gap-3">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-accent-cyan/60" />
              <span className="font-display text-lg text-white/80">{invitation.signature}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
