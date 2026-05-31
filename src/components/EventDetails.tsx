import { invitation } from '../data'
import { Countdown } from './Countdown'
import { Reveal } from './Reveal'

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  )
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  )
}

function IconMapPin() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function IconArrowOut() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type Row = {
  Icon: () => JSX.Element
  label: string
  value: string
  href?: string
}

const rows: readonly Row[] = [
  { Icon: IconCalendar, label: 'Ngày', value: invitation.eventDateDisplay },
  { Icon: IconClock, label: 'Giờ', value: invitation.eventTimeDisplay },
  {
    Icon: IconMapPin,
    label: 'Địa điểm',
    value: invitation.eventLocation,
    href: invitation.eventLocationUrl,
  },
]

export function EventDetails() {
  return (
    <section className="relative px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="mb-12 flex flex-col items-center gap-3 text-center">
            <span className="chip">02 · Sự kiện</span>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              Đếm ngược đến khoảnh khắc
            </h2>
            <p className="max-w-xl text-sm text-white/60 sm:text-base">
              Một buổi sáng — một tấm bằng — một chương mới bắt đầu.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="glass-strong p-6 sm:p-10">
                <Countdown isoDate={invitation.eventDate} />

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {rows.map(({ Icon, label, value, href }) => {
                    const inner = (
                      <>
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent-cyan/30 to-accent-violet/30 text-accent-cyan">
                          <Icon />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                            {label}
                            {href && (
                              <span className="text-white/30 transition group-hover:text-accent-cyan">
                                <IconArrowOut />
                              </span>
                            )}
                          </div>
                          <div className="mt-1 text-sm font-medium leading-snug text-white/90 sm:text-base">
                            {value}
                          </div>
                        </div>
                      </>
                    )

                    if (href) {
                      return (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="glass group flex items-start gap-3 p-4 transition hover:border-accent-cyan/40 hover:bg-white/[0.07] sm:p-5"
                        >
                          {inner}
                        </a>
                      )
                    }

                    return (
                      <div
                        key={label}
                        className="glass flex items-start gap-3 p-4 sm:p-5"
                      >
                        {inner}
                      </div>
                    )
                  })}
                </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
