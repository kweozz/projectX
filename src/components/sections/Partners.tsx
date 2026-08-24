import { motion } from 'framer-motion'
import { QuoteMark } from '../icons'
import robin from '../../assets/partners/robin.webp'
import hendrik from '../../assets/partners/hendrik.webp'

type Partner = {
  image: string
  objectPosition?: string
  quote: string
  name: string
  role: string
}

const PARTNERS: Partner[] = [
  {
    image: robin,
    quote: 'Kijkt van boven: cijfers, structuur.',
    name: 'Robin Van Bouchout',
    role: 'Business strateeg',
  },
  {
    image: hendrik,
    objectPosition: '50% 30%',
    quote: 'Kijkt van buiten: klanten, gedrag.',
    name: 'Hendrik Gerard',
    role: 'Digitaal strateeg',
  },
]

const ease = [0.22, 1, 0.36, 1] as const

export default function Partners() {
  return (
    <section id="partners" className="bg-white py-20 md:py-30">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-12 px-6 md:px-16 lg:flex-row lg:gap-16">
        <motion.h2
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 0.7, ease }}
          className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium tracking-[-0.035em] text-ink lg:flex-1"
        >
          Partners
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:shrink-0"
        >
          {PARTNERS.map((partner) => (
            <motion.figure
              key={partner.name}
              variants={{
                hidden: { opacity: 0, y: 32 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
              }}
              className="flex w-full flex-col lg:w-[386px]"
            >
              <div className="overflow-hidden rounded-[11px] bg-card">
                <img
                  src={partner.image}
                  alt={partner.name}
                  style={{ objectPosition: partner.objectPosition }}
                  className="h-[420px] w-full object-cover lg:h-[483px]"
                />
              </div>

              <figcaption className="flex flex-col gap-5 pt-5">
                <div className="flex items-center gap-3.5">
                  <QuoteMark className="h-6 w-[22px] shrink-0 text-ink" />
                  <p className="font-display text-2xl font-medium tracking-[-0.03em] text-ink">
                    {partner.quote}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="font-display text-xl font-medium text-ink">{partner.name}</p>
                  <p className="font-display text-sm text-muted">{partner.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
