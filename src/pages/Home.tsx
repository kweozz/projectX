import Hero from '../components/sections/Hero'
import Stats from '../components/sections/Stats'
import Faq from '../components/sections/Faq'
import QuoteBanner from '../components/sections/QuoteBanner'
import Process from '../components/sections/Process'
import Projects from '../components/sections/Projects'
import Pricing from '../components/sections/Pricing'
import Sectors from '../components/sections/Sectors'
import Partners from '../components/sections/Partners'
import Footer from '../components/sections/Footer'

const WHITE = '#ffffff'
const DARK = '#210b03' // ink-900

// A soft colour melt between two adjacent sections, so crossing from a light
// into a dark chapter (and back) feels gradual instead of a hard block edge.
function Seam({ from, to }: { from: string; to: string }) {
  return (
    <div
      aria-hidden
      className="h-16 md:h-24"
      style={{ backgroundImage: `linear-gradient(to bottom, ${from}, ${to})` }}
    />
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      {/* Hero already melts to ink-900, Stats is ink-900 → no seam */}
      <Stats />
      <Seam from={DARK} to={WHITE} />
      <Faq />
      <Seam from={WHITE} to={DARK} />
      <QuoteBanner />
      <Seam from={DARK} to={WHITE} />
      <Process />
      <Seam from={WHITE} to={DARK} />
      <Projects />
      <Seam from={DARK} to={WHITE} />
      <Pricing />
      <Seam from={WHITE} to={DARK} />
      <Sectors />
      <Seam from={DARK} to={WHITE} />
      <Partners />
      <Seam from={WHITE} to={DARK} />
      <Footer />
    </>
  )
}
