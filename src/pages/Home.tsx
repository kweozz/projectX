import Navbar from '../components/Navbar'
import Hero from '../components/sections/Hero'
import Faq from '../components/sections/Faq'
import Process from '../components/sections/Process'
import Projects from '../components/sections/Projects'
import QuoteBanner from '../components/sections/QuoteBanner'
import Pricing from '../components/sections/Pricing'
import Sectors from '../components/sections/Sectors'
import Partners from '../components/sections/Partners'
import Footer from '../components/sections/Footer'

// New homepage composition (Figma 919-843). Story order:
// vraag → herkenning → inzet → plan → bewijs → aanbod → sector → gidsen → stap.
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative h-[100svh] overflow-hidden">
        <Hero />
      </div>
      <Faq />
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
