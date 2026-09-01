import { motion } from 'framer-motion'
import { CheckCircle } from '../icons'
import Button from '../Button'
import banner from '../../assets/pricing/banner.webp'

type Plan = {
  title: string
  description: string
  price: string
  cadence: string
  features: string[]
}

const PLANS: Plan[] = [
  {
    title: '2032-Scan',
    description:
      'We brengen in kaart waar u staat op vlak van business, technologie, klanten en mensen',
    price: '€4.500 tot €7.500',
    cadence: '(eenmalige meting)',
    features: [
      'Duidelijke as-is situatie',
      'Heldere prioriteiten',
      'Lijst met eerste actiepunten',
      'Gesprek met het core-team',
    ],
  },
  {
    title: 'Roadmap-traject',
    description:
      'De volledige route uitgestippeld naar 2032, samen bepaald in volledig traject',
    price: '€15.000 tot €50.000',
    cadence: '(volledig traject)',
    features: [
      'Uw koers naar 2032, volledig in kaart gebracht',
      'Zeer nauwe samenwerking met u en uw team',
      'Realistische roadmap',
      'Aanhaken van resources indien nodig',
    ],
  },
  {
    title: 'Partners',
    description:
      'Een muurtje om tegen te leunen. Doorlopende houvast en altijd bereikbaar advies',
    price: '€3.000 tot €4.500',
    cadence: '(per maand)',
    features: [
      'Elk kwartaal meten en bijsturen',
      'Doorlopende begeleiding',
      'Regulier overleg',
      'Actieplan en inspiratie per kwartaal',
    ],
  },
]

const ease = [0.22, 1, 0.36, 1] as const

function PricingCard({ plan }: { plan: Plan }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
      }}
      className="flex flex-col gap-8 rounded-[10px] bg-card p-8"
    >
      <div className="flex flex-col gap-3">
        <h3 className="font-display text-[25px] font-medium tracking-[-0.03em] text-ink">
          {plan.title}
        </h3>
        <p className="max-w-[360px] font-display text-base leading-relaxed text-ink">
          {plan.description}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-sans text-4xl font-medium tracking-[-0.04em] text-ink">
          {plan.price}
        </p>
        <p className="font-sans text-2xl tracking-[-0.04em] text-ink">{plan.cadence}</p>
      </div>

      <ul className="flex flex-col gap-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-2.5">
            <CheckCircle className="size-[18px] shrink-0 text-muted" />
            <span className="font-sans text-base tracking-[-0.03em] text-muted">{f}</span>
          </li>
        ))}
      </ul>

      <Button variant="primary" surface="light" to="/contact" icon arrow="up-right" className="mt-auto">
        Plan een gesprek
      </Button>
    </motion.div>
  )
}

export default function Pricing() {
  return (
    <section id="diensten" className="bg-white py-20 md:py-30">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-12 px-6 md:gap-[70px] md:px-16">
        <motion.h2
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 0.7, ease }}
          className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.035em] text-ink"
        >
          Onze diensten
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 0.8, ease }}
          className="h-[200px] overflow-hidden rounded-[10px] md:h-[260px]"
        >
          <img src={banner} alt="" className="size-full object-cover" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ staggerChildren: 0.12 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {PLANS.map((plan) => (
            <PricingCard key={plan.title} plan={plan} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
