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

export default function Home() {
  return (
    <>
      {/* Clean opening transition (avexa-style): the hero pins while the first
          section scrolls up and covers it. Only this pair shares the sticky
          context, so the hero releases once Stats has taken over. */}
      <div className="relative">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <Hero />
        </div>
        <div className="relative z-10 overflow-hidden rounded-t-[28px] shadow-[0_-30px_60px_-30px_rgba(0,0,0,0.6)]">
          <Stats />
        </div>
      </div>

      <Faq />
      <QuoteBanner />
      <Process />
      <Projects />
      <Pricing />
      <Sectors />
      <Partners />
      <Footer />
    </>
  )
}
