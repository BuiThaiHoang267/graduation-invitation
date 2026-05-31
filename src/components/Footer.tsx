import { invitation } from '../data'
import { Reveal } from './Reveal'

function IconMapPin() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconChat() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.7c0-.9.3-1.5 1.6-1.5H17V4.5c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.1V10.5H8v3h2.5V21h3Z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="relative px-6 pb-24 pt-12 sm:px-10">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <div className="mb-8 flex flex-col items-center gap-3 text-center">
            <span className="chip">04 · Liên hệ</span>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Giữ liên lạc với mình
            </h2>
            <p className="text-sm text-white/60">
              Hôm đó cần chỉ đường hay không thấy mình ở đâu — thì ping cho mình nhé.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="flex flex-col gap-3">
              <InfoItem
                icon={<IconMapPin />}
                label="Địa điểm"
                value={invitation.eventLocation}
                href={invitation.eventLocationUrl}
              />
              <InfoItem
                icon={<IconPhone />}
                label="Điện thoại"
                value={invitation.phone}
                href={invitation.phoneUrl}
              />
              <InfoItem
                icon={<IconChat />}
                label="Zalo"
                value={invitation.phone}
                href={invitation.zaloUrl}
              />
              <InfoItem
                icon={<IconFacebook />}
                label="Facebook"
                value={invitation.facebookHandle}
                href={invitation.facebookUrl}
              />
          </dl>
        </Reveal>
      </div>
    </footer>
  )
}

type InfoItemProps = {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}

function InfoItem({ icon, label, value, href }: InfoItemProps) {
  const content = (
    <>
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent-cyan/30 to-accent-violet/30 text-accent-cyan">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <dt className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
          {label}
          {href && (
            <svg
              viewBox="0 0 24 24"
              className="h-3 w-3 text-white/30 transition group-hover:text-accent-cyan"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </dt>
        <dd className="mt-1 text-sm font-medium leading-snug text-white/90 sm:text-base">
          {value}
        </dd>
      </div>
    </>
  )

  const classes = 'glass flex items-start gap-3 p-4'

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
        className={`${classes} group transition hover:border-accent-cyan/40 hover:bg-white/[0.07]`}
      >
        {content}
      </a>
    )
  }

  return <div className={classes}>{content}</div>
}
