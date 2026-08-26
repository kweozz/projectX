import { motion } from 'framer-motion'
import CountUp from '../CountUp'
import MaskedText from '../MaskedText'
import card1 from '../../assets/stats/card1.webp'
import card2 from '../../assets/stats/card2.webp'
import card3 from '../../assets/stats/card3.webp'
import card4 from '../../assets/stats/card4.webp'

type Stat = {
  image: string
  source: string
  value: number
  suffix: string
  description: string
}

const STATS: Stat[] = [
  {
    image: card1,
    source: 'UNIZO / imec, 2024',
    value: 43,
    suffix: '%',
    description: "Van de Vlaamse kmo's is digitaal fit.",
  },
  {
    image: card2,
    source: 'Voka / Deloitte / VLAIO',
    value: 58,
    suffix: '%',
    description: 'Heeft geen uitgeschreven digitale strategie.',
  },
  {
    image: card3,
    source: 'Voka / Deloitte / VLAIO',
    value: 70,
    suffix: '%',
    description: 'Heeft geen actieplan met meetbare doelen.',
  },
  {
    image: card4,
    source: 'BCG, 2020',
    value: 70,
    suffix: '%',
    description: 'Van de transformaties haalt de doelen niet.',
  },
]

const cardVariants = {
  hidden: { y: 32, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function StatCard({ stat, className = '' }: { stat: Stat; className?: string }) {
  return (
    <motion.article
      variants={cardVariants}
      className={`flex flex-col overflow-hidden rounded-xl md:h-[320px] md:flex-row ${className}`}
    >
      {/* Image */}
      <div className="group relative h-52 min-w-0 overflow-hidden md:h-full md:flex-1">
        <img
          src={stat.image}
          alt=""
          className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        {/* Subtle sheen that fades in on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      {/* Data panel — fixed width on desktop, image fills the rest */}
      <div className="flex shrink-0 flex-col justify-between gap-6 bg-card px-6 py-6 md:w-[244px]">
        <p className="font-display text-sm uppercase tracking-[0.08em] text-ink">
          {stat.source}
        </p>
        <p className="font-display text-[clamp(2.5rem,4vw,3.47rem)] font-medium leading-none tracking-[-0.04em] text-ink">
          <CountUp to={stat.value} suffix={stat.suffix} />
        </p>
        <p className="font-display text-sm leading-snug text-muted">
          {stat.description}
        </p>
      </div>
    </motion.article>
  )
}

export default function Stats() {
  return (
    <section id="stats" className="bg-ink-900 py-20 md:py-30">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-16 px-6 md:px-16">
        <motion.h2
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.07] tracking-[-0.018em] text-white"
        >
          <MaskedText>Veel visies worden vandaag niet gerealiseerd</MaskedText>
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ staggerChildren: 0.12 }}
          className="flex flex-col gap-6"
        >
          {/* Row 1 — asymmetric: narrower card + wider card */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[533fr_755fr]">
            <StatCard stat={STATS[0]} />
            <StatCard stat={STATS[1]} />
          </div>
          {/* Row 2 — two equal cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <StatCard stat={STATS[2]} />
            <StatCard stat={STATS[3]} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
