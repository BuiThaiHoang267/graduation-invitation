export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute -top-32 -left-32 h-[60vw] w-[60vw] rounded-full bg-accent-cyan/30 blur-[120px] animate-aurora-1" />
      <div className="absolute top-1/3 -right-40 h-[55vw] w-[55vw] rounded-full bg-accent-violet/30 blur-[140px] animate-aurora-2" />
      <div className="absolute -bottom-40 left-1/4 h-[50vw] w-[50vw] rounded-full bg-accent-fuchsia/20 blur-[140px] animate-aurora-3" />
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  )
}
