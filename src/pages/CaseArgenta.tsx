import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/sections/Footer'
import CountUp from '../components/CountUp'
import FlutedCarousel from '../components/FlutedCarousel'
import ScrollRevealText from '../components/ScrollRevealText'
import MaskedText from '../components/MaskedText'
import { ArrowRight, CheckCircle, QuoteMark } from '../components/icons'
import argenta from '../assets/projects/argenta.webp'
import panel from '../assets/process/panel.webp'
import quoteTeam from '../assets/case/quote-team.webp'
// Alternating story blocks (from Figma 730-434)
import challengeImg from '../assets/case/challenge.webp'
import approachImg from '../assets/case/approach.webp'
import exec1Img from '../assets/case/exec-1.webp'
import exec2Img from '../assets/case/exec-2.webp'
// Carousel + block photos — replace with the real case photos (same names).
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

const bodyText =
  'flex flex-col gap-5 font-display text-lg leading-[1.6] text-muted md:text-xl'
// Big story-block heading (Figma: 48px semibold)
const subHeading =
  'font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-ink'

export default function CaseArgenta() {
  return (
    <div className="bg-ink-900">
      <Navbar />

      {/* 1 — Hero (dark): back link + tags + title + image + meta cards */}
      <header className="bg-ink-900 pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-10 px-6 md:px-16">
          <div className="flex flex-col gap-6">
            <Reveal mount>
              <Link
                to="/cases"
                className="inline-flex items-center gap-2 font-display text-sm font-medium uppercase tracking-tight text-white/60 transition-colors hover:text-white"
              >
                <ArrowRight className="size-4 rotate-180" />
                Alle projecten
              </Link>
            </Reveal>

            <Reveal mount delay={0.05} className="flex flex-wrap items-center gap-3">
              {['Roadmap-traject', 'Banking'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#78716c] px-3.5 py-1.5 font-display text-sm font-medium uppercase tracking-tight text-white"
                >
                  {tag}
                </span>
              ))}
            </Reveal>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-[20ch] font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white"
            >
              <MaskedText onMount delay={0.1}>
                Van verspreide cijfers naar één helder 2032-plan
              </MaskedText>
            </motion.h1>

            <Reveal mount delay={0.2}>
              <p className="max-w-[900px] font-display text-lg leading-relaxed text-white/70 md:text-xl">
                We brachten business, technologie en klantdata samen in één becijferde
                roadmap — met werven, owners en meetbare doelen die het eigen team kan
                dragen.
              </p>
            </Reveal>
          </div>

          <Reveal mount delay={0.25}>
            <div className="overflow-hidden rounded-xl">
              <img
                src={argenta}
                alt="Argenta"
                className="h-[300px] w-full object-cover md:h-[490px]"
                style={{ objectPosition: '50% 45%' }}
              />
            </div>
          </Reveal>

          {/* Meta as bordered cards (not table-lines) */}
          <Reveal mount delay={0.3} className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {META.map((m) => (
              <div
                key={m.label}
                className="flex flex-col gap-1 rounded-[10px] border border-[#44403c] bg-ink-900 p-4"
              >
                <span className="font-display text-sm uppercase tracking-[0.08em] text-[#d6d3d1]">
                  {m.label}
                </span>
                <span className="font-display text-lg font-medium text-white">
                  {m.value}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </header>

      {/* 2 — Het verhaal: intro + big alternating image/text blocks (light) */}
      <section className="bg-white pb-20 pt-16 md:pb-30 md:pt-24">
        {/* Intro statement — contained */}
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <ScrollRevealText
            text={`${STORY_LEAD_STRONG} ${STORY_LEAD_SOFT}`}
            className="font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.55] tracking-[-0.015em]"
          />
        </div>

        {/* Alternating full-bleed blocks (images bleed to the viewport edge) */}
        <div className="mt-20 flex flex-col gap-24 md:mt-28 md:gap-[120px]">
          {/* Block A — De uitdaging (text left) / image right */}
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-8 px-6 md:px-16 lg:grid-cols-[1fr_minmax(0,724px)] lg:gap-[120px] lg:px-0 lg:pr-0 lg:pl-[max(4rem,calc((100vw-1600px)/2+4rem))]">
              <div className="flex flex-col gap-8 lg:order-1">
                <h2 className={subHeading}>De uitdaging</h2>
                <div className={bodyText}>
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
              </div>
              <div className="overflow-hidden rounded-[10px] lg:order-2 lg:rounded-r-none lg:rounded-l-[10px]">
                <img
                  src={challengeImg}
                  alt=""
                  className="h-[320px] w-full object-cover sm:h-[440px] lg:h-[600px]"
                />
              </div>
            </div>
          </Reveal>

          {/* Block B — image left / De aanpak (text right) */}
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-8 px-6 md:px-16 lg:grid-cols-[minmax(0,796px)_1fr] lg:gap-[120px] lg:px-0 lg:pl-0 lg:pr-[max(4rem,calc((100vw-1600px)/2+4rem))]">
              <div className="overflow-hidden rounded-[10px] lg:order-1 lg:rounded-l-none lg:rounded-r-[10px]">
                <img
                  src={approachImg}
                  alt=""
                  className="h-[320px] w-full object-cover sm:h-[440px] lg:h-[600px]"
                />
              </div>
              <div className="flex flex-col gap-8 lg:order-2">
                <h2 className={subHeading}>De aanpak</h2>
                <div className={bodyText}>
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
                </div>
              </div>
            </div>
          </Reveal>

          {/* Block C — De uitvoering (text left) + quote / two images right */}
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-8 px-6 md:px-16 lg:grid-cols-[minmax(0,526px)_1fr] lg:gap-[120px] lg:px-0 lg:pr-0 lg:pl-[max(4rem,calc((100vw-1600px)/2+4rem))]">
              <div className="flex flex-col gap-8 lg:order-1">
                <h2 className={subHeading}>De uitvoering</h2>
                <div className={bodyText}>
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
                <div className="flex items-center gap-6 py-2">
                  <QuoteMark className="h-10 w-9 shrink-0 text-amber" />
                  <p className="font-display text-2xl italic leading-[1.6] text-muted">
                    {PULL_QUOTE}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 lg:order-2 lg:h-[600px] lg:gap-4">
                <div className="h-full overflow-hidden rounded-[10px]">
                  <img
                    src={exec1Img}
                    alt=""
                    className="h-[320px] w-full object-cover sm:h-[440px] lg:h-full"
                  />
                </div>
                <div className="h-full overflow-hidden rounded-[10px] lg:rounded-r-none lg:rounded-l-[10px]">
                  <img
                    src={exec2Img}
                    alt=""
                    className="h-[320px] w-full object-cover sm:h-[440px] lg:h-full"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Deliverables — distinct framed block with checklist (contained) */}
        <div className="mx-auto mt-24 max-w-[1600px] px-6 md:mt-28 md:px-16">
          <Reveal>
            <div className="rounded-2xl border border-[rgba(90,98,113,0.25)] bg-card px-8 py-10 md:px-12 md:py-12">
              <h2 className="font-display text-2xl font-medium tracking-[-0.02em] text-ink md:text-[2rem]">
                Wat we opleverden
              </h2>
              <ul className="mt-8 grid grid-cols-1 gap-x-12 gap-y-1 sm:grid-cols-2">
                {DELIVERABLES.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border-t border-[rgba(90,98,113,0.2)] py-4"
                  >
                    <CheckCircle className="size-5 shrink-0 text-amber" />
                    <span className="font-display text-lg text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3 — Het resultaat + carousel (dark) */}
      <section className="bg-ink-900 py-20 md:py-30">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.02em] text-white">
            <MaskedText>Het resultaat</MaskedText>
          </h2>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            transition={{ staggerChildren: 0.12 }}
            className="mt-14 grid grid-cols-2 gap-x-8 md:grid-cols-4"
          >
            {RESULTS.map((r) => (
              <motion.div
                key={r.label}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
                }}
                className="flex flex-col items-center gap-3 border-b border-[#44403c] py-6 text-center"
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
          <Reveal className="lg:w-[399px] lg:shrink-0">
            <div className="relative h-[300px] overflow-hidden rounded-[10px] md:h-[420px] lg:h-full">
              <img src={quoteTeam} alt="" className="size-full object-cover" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 fluted-glass backdrop-blur-[2px]" />
            </div>
          </Reveal>

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
