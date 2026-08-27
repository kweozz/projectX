import { useRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/sections/Footer'
import MaskedText from '../components/MaskedText'
import { ArrowRight } from '../components/icons'
import heroBg from '../assets/hero/hero-bg.mp4'
import heroPoster from '../assets/hero/hero-bg.webp'
import scanImg from '../assets/cases/whiteboard.webp'
import roadmapImg from '../assets/process/report.webp'
import partnerImg from '../assets/cases/corridor.webp'

const ease = [0.22, 1, 0.36, 1] as const
const viewport = { once: true, margin: '0px 0px -15% 0px' }

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type Service = {
  num: string
  name: string
  meta: string // phase · duration · price
  h2: string
  description: string
  image: string
  objectPosition?: string
  cards: { title: string; text: string }[]
}

const SERVICES: Service[] = [
  {
    num: '01',
    name: '2032-Scan',
    meta: 'Instap · 3–4 weken · €4.500–7.500',
    h2: 'Een becijferde foto van vandaag.',
    description:
      'De AS-IS-nulmeting over people, finance en technology — plus hoe klant en medewerker het bedrijf vandaag écht beleven.',
    image: scanImg,
    objectPosition: '50% 45%',
    cards: [
      { title: 'Benchmark', text: 'Waar u staat tegenover sectorgenoten.' },
      {
        title: 'Ambitieworkshop & quick wins',
        text: 'Een eerste richting, meteen bruikbaar, nog vóór het traject start.',
      },
    ],
  },
  {
    num: '02',
    name: 'Roadmap-traject',
    meta: 'Kern · 2–4 maanden · €15.000–30.000',
    h2: 'Een blauwdruk, geen rapport.',
    description:
      'De TO-BE wordt uitgetekend — journeys, processen, rollen — niet enkel een KPI-lijst.',
    image: roadmapImg,
    objectPosition: '50% 40%',
    cards: [
      {
        title: 'KPI-boom & benchmark',
        text: 'Doelen die getoetst zijn, niet enkel afgesproken.',
      },
      {
        title: 'Roadmap met werven',
        text: 'Elk met een eigen owner, budget en businesscase.',
      },
    ],
  },
  {
    num: '03',
    name: 'Partnerschap',
    meta: 'Doorlopend · €2.500–4.500 / maand',
    h2: 'Aan boord tot het zonder ons kan.',
    description:
      'Vaste aanwezigheid, kwartaalritme, regie over alle leveranciers.',
    image: partnerImg,
    objectPosition: '50% 50%',
    cards: [
      { title: 'Klankbord', text: 'Bereikbaar wanneer het telt, zonder eigen agenda.' },
      {
        title: 'De blueprint leeft mee',
        text: 'Elk kwartaal bijgesteld op de realiteit.',
      },
    ],
  },
]

const ctaClass =
  'group inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-cta px-7 font-display text-sm font-medium uppercase text-cream transition-transform duration-200 hover:-translate-y-0.5'

function ServiceCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex flex-col gap-2 rounded-[10px] border border-[rgba(90,98,113,0.2)] bg-card p-6 md:p-8">
      <h3 className="font-display text-xl font-medium tracking-[-0.01em] text-ink">
        {title}
      </h3>
      <p className="font-display text-base leading-relaxed text-muted md:text-lg">{text}</p>
    </div>
  )
}

function ServiceSection({ s, index }: { s: Service; index: number }) {
  const flipped = index % 2 === 1
  const numberRef = useRef(null)

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-[1600px] items-start gap-6 px-6 md:px-16 lg:grid-cols-[1.55fr_1fr] lg:gap-10">
        {/* Big block: image + text */}
        <Reveal className={flipped ? 'lg:order-2' : 'lg:order-1'}>
          <div className="flex flex-col gap-8">
            <div className="group relative overflow-hidden rounded-[10px] bg-card">
              <img
                src={s.image}
                alt=""
                style={{ objectPosition: s.objectPosition }}
                className="h-[360px] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] md:h-[520px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-transparent" />
              <motion.span
                ref={numberRef}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.6, ease }}
                className="absolute left-6 top-5 font-display text-[clamp(3rem,5vw,4.5rem)] font-medium leading-none text-white/95"
              >
                {s.num}
              </motion.span>
            </div>

            <div className="flex flex-col gap-5">
              <p className="font-display text-sm uppercase tracking-[0.08em] text-amber">
                {s.name} · {s.meta}
              </p>
              <h2 className="max-w-[22ch] font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
                {s.h2}
              </h2>
              <p className="max-w-[54ch] font-display text-lg leading-relaxed text-muted md:text-xl">
                {s.description}
              </p>
              <Link to="/contact" className={ctaClass}>
                Plan een gesprek
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Two small cards */}
        <div
          className={`flex flex-col gap-6 lg:pt-2 ${flipped ? 'lg:order-1' : 'lg:order-2'}`}
        >
          {s.cards.map((c, i) => (
            <Reveal key={c.title} delay={0.1 + i * 0.06}>
              <ServiceCard title={c.title} text={c.text} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Diensten() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero (dark, amber video bg) — same layout/type as other page heroes */}
      <header className="relative flex min-h-[62vh] items-end overflow-hidden bg-ink-900">
        <video
          src={heroBg}
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-ink/85 via-ink/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-16 pt-40 md:px-16 md:pb-24">
          <h1 className="max-w-[16ch] font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
            <MaskedText onMount>Van scan tot uitvoering.</MaskedText>
          </h1>
          <motion.p
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="mt-6 max-w-[640px] font-display text-lg leading-relaxed text-white/80 md:text-2xl"
          >
            Drie diensten die op elkaar voortbouwen — instap, kern en doorlopend. Vaste
            prijzen, heldere doorlooptijden.
          </motion.p>
        </div>
      </header>

      {SERVICES.map((s, i) => (
        <ServiceSection key={s.num} s={s} index={i} />
      ))}

      <Footer />
    </div>
  )
}
