import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
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

const ctaLight =
  'group inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-cta px-7 font-display text-sm font-medium uppercase text-cream transition-transform duration-200 hover:-translate-y-0.5'

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
    objectPosition: '50% 50%',
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
  { phase: 'Intake', when: '±1 week', text: 'Sponsorship van eigenaar of directie. Zonder sponsor starten we niet.' },
  { phase: 'AS-IS', when: 'week 1–4', text: 'Maturiteitsfoto per domein + benchmark tegen sectorgenoten.' },
  { phase: 'TO-BE 2032', when: 'week 4–8', text: 'Ambitieworkshop naar een KPI-boom: doelen getoetst, niet enkel afgesproken.' },
  { phase: 'Blueprint', when: 'week 8–12', text: 'De TO-BE uitgetekend: journeys, processen, rollen — getoetst bij klant en medewerker.' },
  { phase: 'Roadmap', when: 'week 12–16', text: 'De blueprint verkaveld in werven, elk met owner, budget en businesscase.' },
  { phase: 'Uitvoering', when: 'doorlopend', text: 'Kwartaalritme: KPI-review, change en leveranciersregie.' },
]

const NOT_DOING = [
  'Software bouwen of systemen beheren',
  'Campagnes voeren',
  'Interim- of lijnrollen overnemen',
  'Commissies van leveranciers',
]

function ServiceBlock({ s, index }: { s: Service; index: number }) {
  const flipped = index % 2 === 1
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={flipped ? 'lg:order-2' : 'lg:order-1'}>
        <div className="group overflow-hidden rounded-[10px] bg-card">
          <img
            src={s.image}
            alt=""
            style={{ objectPosition: s.objectPosition }}
            className="h-[380px] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] md:h-[560px]"
          />
        </div>
      </Reveal>

      <Reveal delay={0.08} className={flipped ? 'lg:order-1' : 'lg:order-2'}>
        <div className="flex flex-col gap-6">
          <p className="font-display text-sm uppercase tracking-[0.08em] text-amber">
            {s.meta}
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
            {s.name}
          </h2>
          <p className="font-display text-xl font-medium tracking-[-0.01em] text-ink md:text-2xl">
            {s.promise}
          </p>
          <p className="max-w-[52ch] font-display text-lg leading-relaxed text-muted">
            {s.description}
          </p>

          <div className="mt-2 flex flex-col border-t border-[rgba(90,98,113,0.2)]">
            {s.parts.map((p) => (
              <div
                key={p.title}
                className="flex flex-col gap-1 border-b border-[rgba(90,98,113,0.2)] py-4"
              >
                <h3 className="font-display text-base font-medium tracking-[-0.01em] text-ink">
                  {p.title}
                </h3>
                <p className="font-display text-base leading-relaxed text-muted">
                  {p.text}
                </p>
              </div>
            ))}
          </div>

          <Link to="/contact" className={ctaLight}>
            Plan een gesprek
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>
    </div>
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

      {/* Services — editorial feature blocks */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-24 px-6 md:gap-32 md:px-16">
          {SERVICES.map((s, i) => (
            <ServiceBlock key={s.name} s={s} index={i} />
          ))}
        </div>
      </section>

      {/* The four roles (dark) */}
      <section className="bg-ink-900 py-20 md:py-30">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-16 px-6 md:px-16">
          <Reveal>
            <h2 className="max-w-[24ch] font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.07] tracking-[-0.018em] text-white">
              Vier rollen, één partner
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
            {ROLES.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.06}>
                <div className="flex flex-col gap-3 border-t border-white/15 pt-6">
                  <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-white">
                    {r.title}
                  </h3>
                  <p className="max-w-[46ch] font-display text-lg leading-relaxed text-white/70">
                    {r.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Method (cream) */}
      <section className="bg-card py-20 md:py-30">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-16 px-6 md:px-16">
          <Reveal>
            <h2 className="max-w-[24ch] font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.07] tracking-[-0.018em] text-ink">
              Zo verloopt een traject
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {METHOD.map((m, i) => (
              <Reveal key={m.phase} delay={(i % 3) * 0.06}>
                <div className="flex flex-col gap-2 border-t border-[rgba(90,98,113,0.25)] pt-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl font-medium tracking-[-0.01em] text-ink">
                      {m.phase}
                    </h3>
                    <span className="font-display text-sm uppercase tracking-[0.06em] text-amber">
                      {m.when}
                    </span>
                  </div>
                  <p className="font-display text-base leading-relaxed text-muted">
                    {m.text}
                  </p>
                </div>
              </Reveal>
            ))}
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
