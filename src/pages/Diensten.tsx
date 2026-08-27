import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/sections/Footer'
import MaskedText from '../components/MaskedText'
import ScrollRevealText from '../components/ScrollRevealText'
import { ArrowRight } from '../components/icons'
import heroBg from '../assets/hero/hero-bg.mp4'
import heroPoster from '../assets/hero/hero-bg.webp'
import scanImg from '../assets/cases/whiteboard.webp'
import roadmapImg from '../assets/process/report.webp'
import partnerImg from '../assets/cases/team-walk.webp'
import logoVideo from '../assets/roles/logo-video.mp4'
// method step images
import mIntake from '../assets/projects/plaza.webp'
import mAsis from '../assets/case/stairs.webp'
import mTobe from '../assets/process/panel.webp'
import mBlueprint from '../assets/cases/besix.webp'
import mRoadmap from '../assets/projects/bedrijf-x.webp'
import mExec from '../assets/process/sunset.webp'

const ease = [0.22, 1, 0.36, 1] as const
const viewport = { once: true, margin: '0px 0px -15% 0px' }

// Lumen mark, used as an alpha mask so a video plays inside the logo silhouette.
const LOGO_MASK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 26 26'%3E%3Cpath d='M4.30859 17.3086H8.61719V0H26V26H0V0H4.30859V17.3086ZM13 8.68652V25.9951H17.3086V8.68652H13Z' fill='%23000'/%3E%3C/svg%3E\")"

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

// CTA on a dark background: cream pill, ink label (matches the Figma service cards).
const ctaOnDark =
  'group inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-cream px-7 font-display text-sm font-medium uppercase text-ink transition-transform duration-200 hover:-translate-y-0.5'

// CTA on a light background: dark (cta) pill, cream label.
const ctaOnLight =
  'group inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-cta px-6 font-display text-base font-medium uppercase text-cream transition-transform duration-200 hover:-translate-y-0.5'

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
    objectPosition: '50% 45%',
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
    objectPosition: '50% 40%',
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
    objectPosition: '50% 35%',
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
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-8 px-6 md:px-16 lg:grid-cols-[minmax(0,720px)_1fr] lg:gap-[120px] lg:px-0 lg:pr-16">
          {/* Image — flush to the left edge, rectangular, vertically inset */}
          <div className="group relative overflow-hidden rounded-[12px] lg:order-1 lg:rounded-none">
            <img
              src={s.image}
              alt=""
              style={{ objectPosition: s.objectPosition }}
              className="h-72 w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] sm:h-96 lg:h-[66vh]"
            />
          </div>
          {/* Content */}
          <div className="flex flex-col gap-6 lg:order-2 lg:max-w-[600px]">
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
            <Link to="/contact" className={`mt-2 ${ctaOnDark}`}>
              Plan een gesprek
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
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
            <p className="max-w-[449px] font-display text-xl leading-[1.35] text-muted">
              Ons traject bestaat uit zes duidelijke stappen die u begeleiden van begin
              tot eind. We zorgen voor structuur, samenwerking en resultaatgerichte
              uitvoering, zodat uw project soepel en succesvol verloopt.
            </p>
            <Link to="/contact" className={ctaOnLight}>
              Plan een gesprek
              <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div
            ref={trackRef}
            className="no-scrollbar -mr-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-6 md:-mr-16 md:pr-16 lg:min-w-0 lg:flex-1"
            style={{ scrollPaddingLeft: '0px' }}
          >
            {METHOD.map((m) => (
              <article
                key={m.phase}
                className="relative flex h-[440px] w-[300px] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[10px] bg-ink-900 sm:w-[360px] lg:h-[480px] lg:w-[432px]"
              >
                <img
                  src={m.image}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
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
              </article>
            ))}
          </div>
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

      {/* Positioning — the third model (cream), two-tone reveal */}
      <section className="bg-card py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <ScrollRevealText
            text="De adviseur becijfert zonder te tekenen. De aannemer bouwt zonder plan. Het designbureau tekent zonder cijfers. Wij verbinden alle drie — en blijven tot de roadmap is uitgevoerd."
            className="max-w-[24ch] font-display text-[clamp(2rem,4.4vw,3.75rem)] font-semibold leading-[1.12] tracking-[-0.025em]"
          />
        </div>
      </section>

      {/* Services — dark sticky-stacking cards (avexa /works style) */}
      <section className="bg-ink-900">
        <ServicesStack />
      </section>

      {/* Method — "Zo verloopt een traject" carousel */}
      <MethodSection />

      {/* The four roles (dark) — Lumen mark plays a video inside its silhouette */}
      <section className="bg-ink-900 py-20 md:py-30">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-16 px-6 md:px-16">
          <Reveal>
            <h2 className="max-w-[24ch] font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.07] tracking-[-0.018em] text-white">
              Vier rollen, één partner
            </h2>
          </Reveal>
          <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-24">
            {/* Video-filled logo */}
            <Reveal className="flex shrink-0 items-center justify-center">
              <div
                className="aspect-square w-[220px] md:w-[300px] lg:w-[340px]"
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
            {/* Roles list */}
            <div className="flex w-full flex-col">
              {ROLES.map((r, i) => (
                <Reveal key={r.title} delay={i * 0.06}>
                  <div className="flex flex-col gap-3 border-t border-white/15 py-6">
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
