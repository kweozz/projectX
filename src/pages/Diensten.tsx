import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/sections/Footer'
import MaskedText from '../components/MaskedText'
import { ArrowRight } from '../components/icons'
import Button from '../components/Button'
import heroBg from '../assets/hero/hero-bg.mp4'
import heroPoster from '../assets/hero/hero-bg.webp'
import scanImg from '../assets/services/scan.webp'
import roadmapImg from '../assets/services/roadmap.webp'
import partnerImg from '../assets/services/partner.webp'
import logoVideo from '../assets/roles/logo-video.mp4'
// method step images (from Figma)
import mIntake from '../assets/method/intake.webp'
import mAsis from '../assets/method/asis.webp'
import mTobe from '../assets/method/tobe.webp'
import mBlueprint from '../assets/method/blueprint.webp'
import mRoadmap from '../assets/method/roadmap.webp'
import mExec from '../assets/method/uitvoering.webp'

const ease = [0.22, 1, 0.36, 1] as const
const viewport = { once: true, margin: '0px 0px -15% 0px' }

// Allume mark, used as an alpha mask so a video plays inside the logo silhouette.
const LOGO_MASK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 297 235'%3E%3Cpath d='M210.335 233.34L109.233 2.80325C108.654 1.48168 109.622 0 111.065 0H140.673C141.46 0 142.174 0.461543 142.496 1.17921L246.247 231.716C246.843 233.04 245.875 234.537 244.423 234.537H212.166C211.372 234.537 210.653 234.067 210.335 233.34Z' fill='%23000'/%3E%3Cpath d='M259.606 233.34L158.505 2.80325C157.925 1.48168 158.893 0 160.336 0H189.944C190.731 0 191.445 0.461543 191.768 1.17921L295.519 231.716C296.114 233.04 295.146 234.537 293.695 234.537H261.438C260.644 234.537 259.925 234.067 259.606 233.34Z' fill='%23000'/%3E%3Cpath d='M144.958 115.465L98.5059 4.44326C97.8188 2.80108 95.49 2.80738 94.8118 4.45324L1.13815 231.775C0.595687 233.092 1.5635 234.537 2.9873 234.537H95.3066C96.1175 234.537 96.8481 234.048 97.1564 233.298L144.963 116.998C145.165 116.506 145.163 115.955 144.958 115.465Z' fill='%23000'/%3E%3C/svg%3E\")"

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
  name: string
  meta: string
  promise: string
  description: string
  image: string
  objectPosition?: string
  parts: { title: string; text: string }[]
}

const SERVICES: Service[] = [
  {
    name: '2032-Scan',
    meta: 'Instap · 3–4 weken · €4.500–7.500',
    promise: 'Een becijferde foto van vandaag.',
    description:
      'De AS-IS-nulmeting over people, finance en technology — plus hoe klant en medewerker het bedrijf vandaag écht beleven. Geen aannames op afstand, wel data.',
    image: scanImg,
    objectPosition: '50% 55%',
    parts: [
      { title: 'Benchmark', text: 'Waar u staat tegenover sectorgenoten.' },
      {
        title: 'Ambitieworkshop & quick wins',
        text: 'Een eerste richting, meteen bruikbaar, nog vóór het traject start.',
      },
    ],
  },
  {
    name: 'Roadmap-traject',
    meta: 'Kern · 2–4 maanden · €15.000–30.000',
    promise: 'Een blauwdruk, geen rapport.',
    description:
      'De TO-BE wordt uitgetekend — journeys, processen, rollen — niet enkel een KPI-lijst. Het toekomstige bedrijf wordt getekend op concrete deliverables.',
    image: roadmapImg,
    objectPosition: '50% 32%',
    parts: [
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
    name: 'Partnerschap',
    meta: 'Doorlopend · €2.500–4.500 / maand',
    promise: 'Aan boord tot het zonder ons kan.',
    description:
      'Vaste aanwezigheid ter plaatse, kwartaalritme en regie over alle leveranciers. De blueprint leeft mee en wordt elk kwartaal bijgesteld op de realiteit.',
    image: partnerImg,
    objectPosition: '50% 45%',
    parts: [
      { title: 'Klankbord', text: 'Bereikbaar wanneer het telt, zonder eigen agenda.' },
      {
        title: 'De blueprint leeft mee',
        text: 'Elk kwartaal bijgesteld op de realiteit.',
      },
    ],
  },
]

const ROLES = [
  {
    title: 'Het kompas',
    text: 'Doelen voor 2032 én dit kwartaal, samen bepaald — becijferd en getoetst bij wie het bedrijf bedient. Wij adviseren wat nodig is; u beslist.',
  },
  {
    title: 'Het klankbord',
    text: 'Sparringpartner van zaakvoerder en MT, bereikbaar wanneer het telt — met de pet van uw bedrijf op, zonder eigen agenda.',
  },
  {
    title: 'De regisseur',
    text: 'Wij vertalen wat finance, IT, marketing en de vloer nodig hebben naar briefings, blueprints en beoordeelde offertes.',
  },
  {
    title: 'De coach op de vloer',
    text: 'Meelopen in de processen, de ambitie vertalen naar elke rol, met change-begeleiding waar nodig.',
  },
]

const METHOD = [
  { phase: 'Intake', when: '±1 week', text: 'Sponsorship van eigenaar of directie. Zonder sponsor starten we niet.', image: mIntake },
  { phase: 'AS-IS', when: 'week 1–4', text: 'Maturiteitsfoto per domein + benchmark tegen sectorgenoten.', image: mAsis },
  { phase: 'TO-BE 2032', when: 'week 4–8', text: 'Ambitieworkshop naar een KPI-boom: doelen getoetst, niet enkel afgesproken.', image: mTobe },
  { phase: 'Blueprint', when: 'week 8–12', text: 'De TO-BE uitgetekend: journeys, processen, rollen — getoetst bij klant en medewerker.', image: mBlueprint },
  { phase: 'Roadmap', when: 'week 12–16', text: 'De blueprint verkaveld in werven, elk met owner, budget en businesscase.', image: mRoadmap },
  { phase: 'Uitvoering', when: 'doorlopend', text: 'Kwartaalritme: KPI-review, change en leveranciersregie.', image: mExec },
]

const NOT_DOING = [
  'Software bouwen of systemen beheren',
  'Campagnes voeren',
  'Interim- of lijnrollen overnemen',
  'Commissies van leveranciers',
]

// Desktop breakpoint gate — the sticky-stack + scroll-scale only run on lg+.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return isDesktop
}

// One service. On desktop every card is `sticky top-0` inside a shared tall
// container, so each new card pins over the previous one. As a card gets
// covered it scales down and fades (the avexa /works signature), driven by the
// container's scroll progress. The card has NO box of its own — its background
// equals the section background, so it reads as one dark canvas, not a panel.
function ServiceCard({
  s,
  index,
  total,
  progress,
}: {
  s: Service
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const isDesktop = useIsDesktop()
  const isLast = index === total - 1
  // Covering window: card i recedes while card i+1 rises over it.
  const start = index / (total - 1)
  const end = (index + 1) / (total - 1)
  const scale = useTransform(progress, [start, end], [1, 0.86])
  const opacity = useTransform(progress, [start, end], [1, 0.4])
  const style = isDesktop && !isLast ? { scale, opacity } : undefined

  return (
    <div
      className="relative lg:sticky lg:top-0 lg:h-screen"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={style}
        className="flex h-full items-center bg-ink-900 py-16 lg:py-0"
      >
        <div className="grid w-full grid-cols-1 items-center gap-8 px-6 md:px-16 lg:grid-cols-[minmax(0,739px)_1fr] lg:gap-[120px] lg:px-0 lg:pl-0 lg:pr-[max(4rem,calc((100vw-1600px)/2+4rem))]">
          {/* Image — flush to the left edge, right corners rounded, vertically inset */}
          <div className="group relative overflow-hidden rounded-[12px] lg:order-1 lg:rounded-l-none lg:rounded-r-[10px]">
            <img
              src={s.image}
              alt=""
              style={{ objectPosition: s.objectPosition }}
              className="h-72 w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] sm:h-96 lg:h-[min(640px,72vh)]"
            />
          </div>
          {/* Content */}
          <div className="flex flex-col gap-6 lg:order-2 lg:max-w-[560px]">
            <h2 className="font-display text-[clamp(2.25rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-white">
              {s.name}
            </h2>
            <p className="max-w-[52ch] font-display text-base leading-relaxed text-[#d6d3d1] md:text-lg">
              {s.description}
            </p>
            <div className="mt-1 flex flex-col border-t border-[#44403c]">
              {s.parts.map((p) => (
                <div
                  key={p.title}
                  className="flex flex-col gap-1 border-b border-[#44403c] py-4"
                >
                  <h3 className="font-display text-base font-medium tracking-[-0.01em] text-white">
                    {p.title}
                  </h3>
                  <p className="font-display text-base leading-relaxed text-[#d6d3d1]">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
            <Button variant="primary" surface="dark" to="/contact" icon className="mt-2 w-fit">
              Plan een gesprek
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Shared scroll context for the stack: one tall container, all cards sticky
// inside it so later cards pin over earlier ones.
function ServicesStack() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  return (
    <div ref={containerRef} className="relative">
      {SERVICES.map((s, i) => (
        <ServiceCard
          key={s.name}
          s={s}
          index={i}
          total={SERVICES.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  )
}

// "Zo verloopt een traject" — left column (intro + CTA) beside a horizontal
// card carousel, navigated with prev/next arrows (same mechanism as the
// Projecten gallery). Each card is a full-bleed image with a cream footer.
function MethodSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const updateEdges = () => {
    const el = trackRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2)
  }

  useEffect(() => {
    updateEdges()
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', updateEdges, { passive: true })
    window.addEventListener('resize', updateEdges)
    return () => {
      el.removeEventListener('scroll', updateEdges)
      window.removeEventListener('resize', updateEdges)
    }
  }, [])

  const step = (dir: -1 | 1) => {
    const el = trackRef.current
    if (!el) return
    const first = el.children[0] as HTMLElement | undefined
    const gap = parseFloat(getComputedStyle(el).columnGap || '0')
    const amount = (first?.offsetWidth ?? 432) + gap
    el.style.scrollSnapType = 'none'
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
    window.setTimeout(() => {
      el.style.scrollSnapType = ''
    }, 500)
  }

  const arrowBase =
    'flex size-14 items-center justify-center rounded-full transition-colors duration-200'

  return (
    <section className="bg-white py-20 md:py-30">
      <div className="mx-auto max-w-[1600px] px-6 md:px-16">
        {/* Heading + nav */}
        <div className="flex items-start justify-between gap-6">
          <h2 className="max-w-[12ch] font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.07] tracking-[-0.018em] text-ink">
            <MaskedText>Zo verloopt een traject</MaskedText>
          </h2>
          <div className="flex shrink-0 gap-4">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={atStart}
              aria-label="Vorige"
              className={`${arrowBase} ${atStart ? 'bg-[#e7e5e4] text-ink-900' : 'bg-cta text-cream hover:opacity-90'}`}
            >
              <ArrowRight className="size-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={atEnd}
              aria-label="Volgende"
              className={`${arrowBase} ${atEnd ? 'bg-[#e7e5e4] text-ink-900' : 'bg-cta text-cream hover:opacity-90'}`}
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Two columns: intro/CTA + carousel */}
        <div className="mt-12 flex flex-col gap-10 md:mt-16 lg:flex-row lg:gap-[120px]">
          <div className="flex shrink-0 flex-col justify-between gap-10 lg:min-h-[480px] lg:w-[449px]">
            <Reveal>
              <p className="max-w-[449px] font-display text-xl leading-[1.35] text-muted">
                Ons traject bestaat uit zes duidelijke stappen die u begeleiden van
                begin tot eind. We zorgen voor structuur, samenwerking en
                resultaatgerichte uitvoering, zodat uw project soepel en succesvol
                verloopt.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Button variant="primary" surface="light" to="/contact" icon className="w-fit">
                Plan een gesprek
              </Button>
            </Reveal>
          </div>

          {/* Rounded viewport: cards clip cleanly behind its rounded edge as
              they scroll (same radius as the cards) — flowbase-style, no drag. */}
          <motion.div
            ref={trackRef}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ staggerChildren: 0.1 }}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden rounded-[10px] lg:min-w-0 lg:flex-1"
          >
            {METHOD.map((m) => (
              <motion.article
                key={m.phase}
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { duration: 0.6, ease } },
                }}
                className="group relative flex h-[440px] w-[300px] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[10px] bg-ink-900 sm:w-[360px] lg:h-[480px] lg:w-[432px]"
              >
                <img
                  src={m.image}
                  alt=""
                  className="absolute inset-0 size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                />
                <div className="relative flex flex-col gap-2 bg-card p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-medium uppercase leading-[1.4] tracking-[-0.03em] text-ink-900">
                      {m.phase}
                    </h3>
                    <span className="shrink-0 rounded-full border border-ink-900 px-3.5 py-1.5 font-display text-sm font-medium uppercase leading-none tracking-tight text-ink-900 backdrop-blur-[2.5px]">
                      {m.when}
                    </span>
                  </div>
                  <p className="font-display text-base leading-[1.35] text-muted">
                    {m.text}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function Diensten() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero (dark, amber video) */}
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
          <h1 className="max-w-[18ch] font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
            <MaskedText onMount>Geen rapport. Geen uitvoering. Wél impact.</MaskedText>
          </h1>
          <motion.p
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="mt-6 max-w-[640px] font-display text-lg leading-relaxed text-white/80 md:text-2xl"
          >
            Wij helpen Vlaamse organisaties hun 2032 scherpstellen — becijferd, en met een
            roadmap die hun eigen team draagt. Drie lagen, vaste prijzen.
          </motion.p>
        </div>
      </header>

      {/* Services — dark sticky-stacking cards (avexa /works style) */}
      <section className="bg-ink-900">
        <ServicesStack />
      </section>

      {/* Method — "Zo verloopt een traject" carousel */}
      <MethodSection />

      {/* The four roles (dark) — Allume mark plays a video inside its silhouette */}
      <section className="bg-ink-900 py-20 md:py-30">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-16 px-6 md:px-16">
          <Reveal>
            <h2 className="max-w-[24ch] font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.07] tracking-[-0.018em] text-white">
              Vier rollen, één partner
            </h2>
          </Reveal>
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:pl-[120px]">
            {/* Video-filled logo */}
            <Reveal className="flex shrink-0 items-center justify-center">
              <div
                className="aspect-square w-[240px] md:w-[320px] lg:w-[367px]"
                style={{
                  WebkitMaskImage: LOGO_MASK,
                  maskImage: LOGO_MASK,
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                }}
              >
                <video
                  src={logoVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="size-full object-cover"
                />
              </div>
            </Reveal>
            {/* Roles list — fixed-width block on the right (Figma: 624px) */}
            <div className="flex w-full flex-col lg:w-[624px] lg:shrink-0">
              {ROLES.map((r, i) => (
                <Reveal key={r.title} delay={i * 0.06}>
                  <div className="flex flex-col gap-3 border-t border-white/15 pt-6 pb-7">
                    <h3 className="font-display text-2xl font-normal tracking-[-0.02em] text-white">
                      {r.title}
                    </h3>
                    <p className="max-w-[551px] font-display text-lg leading-relaxed text-[#d6d3d1]">
                      {r.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What we don't do (white) */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 md:grid-cols-[minmax(0,380px)_1fr] md:gap-24 md:px-16">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.07] tracking-[-0.018em] text-ink">
              Wat we niet doen
            </h2>
          </Reveal>
          <ul className="flex flex-col">
            {NOT_DOING.map((n, i) => (
              <Reveal key={n} delay={i * 0.06}>
                <li className="flex items-start gap-5 border-t border-[rgba(90,98,113,0.25)] py-6">
                  <span className="font-display text-2xl leading-none text-amber">—</span>
                  <span className="font-display text-[clamp(1.25rem,2vw,1.75rem)] font-medium leading-[1.25] tracking-[-0.01em] text-ink">
                    {n}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  )
}
