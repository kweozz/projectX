import Navbar from '../components/Navbar'
import Hero from '../components/sections/Hero'
import WhatWeDo from '../components/sections/WhatWeDo'
import Process from '../components/sections/Process'
import Projects from '../components/sections/Projects'
import QuoteBanner from '../components/sections/QuoteBanner'
import Pricing from '../components/sections/Pricing'
import Sectors from '../components/sections/Sectors'
import Partners from '../components/sections/Partners'
import Footer from '../components/sections/Footer'

// New homepage (Figma 919-843). Story order:
// vraag → herkenning → wat wij doen → plan → bewijs → aanbod → sector → gidsen → stap.
export default function Home() {
  return (
    <>
      <Navbar />

      {/* Sticky opening: the hero pins while WhatWeDo scrolls up and covers it
          (avexa-style). WhatWeDo then runs its own sticky card-morph internally. */}
      <div className="relative">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <Hero />
        </div>
        <div className="relative z-10 rounded-t-[28px] bg-white shadow-[0_-30px_60px_-30px_rgba(0,0,0,0.55)]">
          <WhatWeDo />
        </div>
      </div>

      <Process />
      <Projects />
      <QuoteBanner />
      <Pricing />
      <Sectors />
      <Partners />
      <Footer />
    </>
  )
}
