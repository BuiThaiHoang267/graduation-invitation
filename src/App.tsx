import { useState } from 'react'
import { AuroraBackground } from './components/AuroraBackground'
import { BootSequence } from './components/BootSequence'
import { Confetti } from './components/Confetti'
import { CursorTrail } from './components/CursorTrail'
import { DegreeSection } from './components/DegreeSection'
import { EventDetails } from './components/EventDetails'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Message } from './components/Message'
import { ParticlesBackground } from './components/ParticlesBackground'
import { ScrollProgress } from './components/ScrollProgress'

export default function App() {
  const [bootDone, setBootDone] = useState(false)

  return (
    <>
      <BootSequence onComplete={() => setBootDone(true)} />
      <AuroraBackground />
      <ParticlesBackground />
      <CursorTrail />
      <Confetti trigger={bootDone} />
      <ScrollProgress />
      <main className="relative">
        <Hero />
        <DegreeSection />
        <EventDetails />
        <Message />
        <Footer />
      </main>
    </>
  )
}
