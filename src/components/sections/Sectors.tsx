import { motion } from 'framer-motion'
import MaskedText from '../MaskedText'
import RevealImage from '../RevealImage'
import bouw from '../../assets/sectors/bouw.webp'
import maak from '../../assets/sectors/maak.webp'
import zorg from '../../assets/sectors/zorg.webp'

type Sector = {
  image: string
  title: string
  subtitle: string
  imgHeight: string
  offset: string
}

const SECTORS: Sector[] = [
  {
    image: bouw,
    title: 'Bouw en installatie',
    subtitle: 'BIM wordt contractvoorwaarde.',
    imgHeight: 'h-[340px] md:h-[440px]',
    offset: 'md:pt-0',
  },
  {
    image: maak,
    title: 'Maakindustrie',
    subtitle: 'Industrie 4.0 is een volgordevraag geworden.',
    imgHeight: 'h-[260px] md:h-[300px]',
    offset: 'md:pt-[60px]',
  },
  {
    image: zorg,
    title: 'Zorgpraktijken',
    subtitle: 'BIHR legt tegen 2029 de ondergrens.',
    imgHeight: 'h-[300px] md:h-[380px]',
    offset: 'md:pt-[120px]',
  },
]

const ease = [0.22, 1, 0.36, 1] as const

export default function Sectors() {
  return (
    <section id="sectoren" className="bg-ink-900 py-20 md:py-30">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-16 px-6 md:gap-20 md:px-16">
        <motion.h2
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 0.7, ease }}
          className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.018em] text-white"
        >
          <MaskedText>Strategische focus per sector</MaskedText>
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 items-start gap-8 md:grid-cols-3"
        >
          {SECTORS.map((sector) => (
            <motion.article
              key={sector.title}
              variants={{
                hidden: { opacity: 0, y: 32 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
              }}
              className={`group flex flex-col gap-6 ${sector.offset}`}
            >
              <RevealImage
                src={sector.image}
                alt={sector.title}
                parallax={6}
                clip
                className={`rounded-[10px] ${sector.imgHeight}`}
              />
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-2xl font-medium tracking-[-0.03em] text-white">
                  {sector.title}
                </h3>
                <p className="font-display text-base tracking-[-0.02em] text-white/80">
                  {sector.subtitle}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
