import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/sections/Footer'
import CountUp from '../components/CountUp'
import FlutedCarousel from '../components/FlutedCarousel'
import ScrollRevealText from '../components/ScrollRevealText'
import { ArrowRight, CheckCircle, QuoteMark } from '../components/icons'
import argenta from '../assets/projects/argenta.webp'
import panel from '../assets/process/panel.webp'
import stairs from '../assets/case/stairs.webp'
import quoteTeam from '../assets/case/quote-team.webp'
// Carousel photos — replace these 3 files with the real case photos (same names).
import carouselWorkshop from '../assets/case/carousel-1-workshop.webp'
import carouselBoardroom from '../assets/case/carousel-2-boardroom.webp'
import carouselStrategy from '../assets/case/carousel-3-strategy.webp'

const ease = [0.22, 1, 0.36, 1] as const
const viewport = { once: true, margin: '0px 0px -20% 0px' }

// NOTE: illustrative placeholder case copy — replace with the real case study.
const META = [
  { label: 'Klant', value: 'Argenta' },
  { label: 'Sector', value: 'Banking' },
  { label: 'Traject', value: 'Roadmap-traject' },
  { label: 'Jaar', value: '2024' },
]

const RESULTS = [
  { value: 68, suffix: '%', label: 'minder tijd verloren aan interne afstemming' },
  { value: 3, suffix: '×', label: 'snellere besluitvorming op strategisch niveau' },
  { value: 8, suffix: '', label: 'werven met een eigen owner en budget' },
  { value: 1, suffix: '', label: 'gedeeld 2032-plan voor het hele bedrijf' },
]

// NOTE: placeholder long-form copy — replace with the real case narrative.
// Two-tone intro statement: strong (dark) opening + soft (grey) continuation.
const STORY_LEAD_STRONG =
  'Argenta had ambitieuze digitale doelen, maar de cijfers zaten verspreid over teams en systemen.'
const STORY_LEAD_SOFT =
  'Er was geen gedeeld beeld van waar het bedrijf écht stond — en dus ook geen gedragen plan om vooruit te gaan.'

const PULL_QUOTE =
  'Niet de tool maakt het verschil, maar of het hele bedrijf naar dezelfde cijfers kijkt.'

const DELIVERABLES = [
  '2032-Scan rapport',
  'Kwartaalroadmap met owners',
  'Business case per werf',
  'Meetdashboard',
  'Begeleiding van het kernteam',
  'Investeringsplan',
]

function Reveal({
  children,
  delay = 0,
  className = '',
  mount = false,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  mount?: boolean
}) {
  // `mount` = animate on mount (for above-the-fold content). whileInView doesn't
  // reliably fire for in-view elements after a client-side route change.
  const shared = {
    initial: { y: 24, opacity: 0 },
    transition: { duration: 0.7, delay, ease },
    className,
  }
  if (mount) {
    return (
      <motion.div {...shared} animate={{ y: 0, opacity: 1 }}>
        {children}
      </motion.div>
    )
  }
  return (
    <motion.div {...shared} whileInView={{ y: 0, opacity: 1 }} viewport={viewport}>
      {children}
    </motion.div>
  )
}

export default function CaseArgenta() {
  return (
    <div className="bg-ink-900">
      <Navbar />

      {/* 1 — Hero (dark) */}
      <header className="bg-ink-900 pt-32 md:pt-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <Reveal mount>
            <Link
              to="/#projecten"
              className="inline-flex items-center gap-2 font-display text-sm font-medium uppercase tracking-tight text-white/60 transition-colors hover:text-white"
            >
              <ArrowRight className="size-4 rotate-180" />
              Alle projecten
            </Link>
          </Reveal>

          <Reveal mount delay={0.05} className="mt-8 flex flex-wrap items-center gap-3">
            {['Roadmap-traject', 'Banking'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/25 px-3.5 py-1.5 font-display text-sm font-medium uppercase tracking-tight text-white"
              >
                {tag}
              </span>
            ))}
          </Reveal>

          <Reveal mount delay={0.1}>
            <h1 className="mt-8 max-w-[18ch] font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
              Van verspreide cijfers naar één helder 2032-plan
            </h1>
          </Reveal>

          <Reveal mount delay={0.15}>
            <p className="mt-6 max-w-[900px] font-display text-lg leading-relaxed text-white/70 md:text-xl">
              We brachten business, technologie en klantdata samen in één becijferde
              roadmap — met werven, owners en meetbare doelen die het eigen team kan
              dragen.
            </p>
          </Reveal>

          <Reveal
            mount
            delay={0.2}
            className="mt-12 grid grid-cols-2 gap-8 border-t border-white/15 pt-8 md:grid-cols-4"
          >
            {META.map((m) => (
              <div key={m.label} className="flex flex-col gap-1">
                <span className="font-display text-sm uppercase tracking-[0.08em] text-white/50">
                  {m.label}
                </span>
                <span className="font-display text-lg font-medium text-white">
                  {m.value}
                </span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal mount delay={0.25} className="mx-auto mt-16 max-w-[1600px] px-6 pb-20 md:px-16 md:pb-30">
          <div className="overflow-hidden rounded-xl">
            <img
              src={argenta}
              alt="Argenta"
              className="h-[360px] w-full object-cover md:h-[560px]"
            />
          </div>
        </Reveal>
      </header>

      {/* 2 — Het verhaal: intro statement + sticky image with scrolling text (light) */}
      <section className="bg-white pb-20 pt-16 md:pb-30">
        {/* Intro statement — scroll-linked word-by-word colour reveal */}
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <ScrollRevealText
            text={`${STORY_LEAD_STRONG} ${STORY_LEAD_SOFT}`}
            className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.4] tracking-[-0.01em]"
          />
        </div>

        {/* Sticky image + scrolling text column */}
        <div className="mx-auto mt-16 grid max-w-[1600px] grid-cols-1 gap-10 px-6 md:px-16 lg:grid-cols-[538px_1fr] lg:gap-12">
          {/* Sticky image (left) */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <div className="overflow-hidden rounded-md">
              <img src={stairs} alt="" className="h-[300px] w-full object-cover md:h-[420px]" />
            </div>
          </div>

          {/* Scrolling text (right) */}
          <div className="flex max-w-[720px] flex-col gap-14">
            <Reveal>
              <h2 className="font-display text-2xl font-medium tracking-[-0.02em] text-ink">
                De uitdaging
              </h2>
              <div className="mt-6 flex flex-col gap-5 font-display text-xl leading-relaxed text-muted">
                <p>
                  Argenta had ambitieuze digitale doelen, maar de cijfers zaten
                  verspreid over teams en systemen. Er was geen gedeeld beeld van waar
                  het bedrijf écht stond — en dus ook geen gedragen plan om vooruit te
                  gaan.
                </p>
                <p>
                  Elke afdeling werkte met een eigen dashboard, een eigen definitie van
                  succes en een eigen prioriteitenlijst. Wat voor de ene ploeg een
                  doorbraak was, telde voor de andere nauwelijks mee.
                </p>
                <p>
                  Het gevolg: veel overleg, weinig richting. Investeringsbeslissingen
                  bleven maanden hangen omdat niemand met zekerheid durfde zeggen welke
                  euro het meeste zou opbrengen.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <h2 className="font-display text-2xl font-medium tracking-[-0.02em] text-ink">
                De aanpak
              </h2>
              <div className="mt-6 flex flex-col gap-5 font-display text-xl leading-relaxed text-muted">
                <p>
                  We startten met een 2032-Scan: een becijferde nulmeting over business,
                  technologie, klanten en mensen. Geen aannames, wel data — zodat
                  iedereen vanaf dag één naar hetzelfde beeld keek.
                </p>
                <p>
                  Van daaruit bouwden we samen met het kernteam een kwartaalroadmap met
                  heldere werven, owners en budgetten. Elke werf kreeg een meetbaar doel
                  en een verantwoordelijke die er ’s ochtends wakker van lag.
                </p>
                <p>
                  We toetsten elke aanname bij echte klanten en medewerkers voor er een
                  euro naar een leverancier ging. Wat niet standhield, sneuvelde vroeg —
                  bewust en zonder gezichtsverlies.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <h2 className="font-display text-2xl font-medium tracking-[-0.02em] text-ink">
                De uitvoering
              </h2>
              <div className="mt-6 flex flex-col gap-5 font-display text-xl leading-relaxed text-muted">
                <p>
                  De roadmap werd geen document dat in een la verdween, maar een levend
                  ritme: elk kwartaal meten, bijsturen en opnieuw prioriteren op basis
                  van de cijfers.
                </p>
                <p>
                  Waar interne capaciteit ontbrak, haakten we gericht mensen aan — nooit
                  meer dan nodig, altijd met kennisoverdracht naar het eigen team, zodat
                  Argenta het na afloop zelf kan dragen.
                </p>
              </div>
            </Reveal>

            {/* Inline pull-quote with amber accent mark */}
            <Reveal>
              <div className="flex gap-6">
                <QuoteMark className="mt-1 h-9 w-8 shrink-0 text-amber" />
                <p className="font-display text-xl italic leading-relaxed text-muted">
                  {PULL_QUOTE}
                </p>
              </div>
            </Reveal>

            {/* Deliverables */}
            <Reveal>
              <h2 className="font-display text-2xl font-medium tracking-[-0.02em] text-ink">
                Wat we opleverden
              </h2>
              <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                {DELIVERABLES.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="size-[18px] shrink-0 text-amber" />
                    <span className="font-display text-lg text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 — Het resultaat + carousel (dark) */}
      <section className="bg-ink-900 py-20 md:py-30">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.02em] text-white">
              Het resultaat
            </h2>
          </Reveal>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            transition={{ staggerChildren: 0.12 }}
            className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4"
          >
            {RESULTS.map((r, i) => (
              <motion.div
                key={r.label}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
                }}
                className={`flex flex-col gap-3 ${
                  i < 3 ? 'md:border-r md:border-white/15 md:pr-8' : ''
                }`}
              >
                <span className="font-display text-[clamp(2.5rem,4vw,3rem)] font-medium leading-none tracking-[-0.04em] text-white">
                  <CountUp to={r.value} suffix={r.suffix} />
                </span>
                <span className="font-display text-base leading-snug text-white/60">
                  {r.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Endless fluted-glass carousel — centered, others frosted */}
        <Reveal className="mt-16 md:mt-24">
          <FlutedCarousel
            images={[
              { src: carouselWorkshop, alt: 'Workshop' },
              { src: carouselBoardroom, alt: 'Presentatie' },
              { src: carouselStrategy, alt: 'Strategie' },
              { src: panel, alt: '2032' },
            ]}
          />
        </Reveal>
      </section>

      {/* 4 — Client quote (light): image left + quote right */}
      <section className="bg-white py-20 md:py-30">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-10 px-6 md:px-16 lg:flex-row lg:items-stretch lg:gap-16">
          {/* Image with a reeded-glass edge */}
          <Reveal className="lg:w-[399px] lg:shrink-0">
            <div className="relative h-[300px] overflow-hidden rounded-[10px] md:h-[420px] lg:h-full">
              <img src={quoteTeam} alt="" className="size-full object-cover" />
              {/* subtle fluted-glass edge on the right */}
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 fluted-glass backdrop-blur-[2px]" />
            </div>
          </Reveal>

          {/* Quote */}
          <Reveal className="flex flex-1 flex-col justify-center gap-8">
            <QuoteMark className="h-10 w-9 text-amber" />
            <blockquote className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-[1.3] tracking-[-0.02em] text-ink">
              Voor het eerst kijken we allemaal naar dezelfde cijfers — en trekken we aan
              hetzelfde plan.
            </blockquote>
            <div className="flex flex-col gap-1">
              <span className="font-display text-xl font-medium text-ink">Kernteam</span>
              <span className="font-display text-base text-muted">Argenta</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5 — CTA + footer (dark) */}
      <Footer />
    </div>
  )
}
