import { motion } from 'framer-motion'
import Button from '../Button'
import sunset from '../../assets/process/sunset.webp'
import panel from '../../assets/process/panel.webp'
import report from '../../assets/process/report.webp'

const STEPS = [
  { n: 1, label: 'Waar wilt u staan in 2032?' },
  { n: 2, label: 'Wat zegt uw data vandaag?' },
  { n: 3, label: 'Wat doen we dit kwartaal?' },
]

const ease = [0.22, 1, 0.36, 1] as const

// Collage image positions as % of the 660×480 frame (from Figma)
const collage = [
  { src: sunset, left: '0%', top: '16.67%', width: '51.5%', height: '70.8%', z: 10, border: false },
  { src: panel, left: '36.36%', top: '0%', width: '63.6%', height: '79.17%', z: 20, border: false },
  { src: report, left: '21.2%', top: '45.8%', width: '54.5%', height: '54.17%', z: 30, border: true },
]

export default function Process() {
  return (
    <section id="aanpak" className="bg-white py-20 md:py-30">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-16 px-6 md:gap-20 md:px-16">
        {/* Split row */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-16">
          {/* Left content */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 0.7, ease }}
            className="flex max-w-[489px] flex-col items-start gap-8 md:gap-12"
          >
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.625rem)] font-semibold leading-[1.1] tracking-[-0.024em] text-ink">
              Samen komen we tot beslissingen en een plan
            </h2>
            <p className="font-display text-lg leading-relaxed text-muted md:text-xl">
              Van een becijferde visie van waar uw bedrijf staat tot concrete doelen
              voor 2032, per kwartaal. Een roadmap met werven, owners, budgetten en
              metrics. Getoetst bij echte klanten en medewerkers voor er een euro naar
              een leverancier gaat.
            </p>
            <Button variant="secondary" surface="light" to="/contact" icon arrow="up-right" className="w-fit">
              Bekijk een voorbeeld rapport
            </Button>
          </motion.div>

          {/* Right collage */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ staggerChildren: 0.15 }}
            className="relative aspect-[660/480] w-full max-w-[660px] shrink-0"
          >
            {collage.map((img, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 28, scale: 0.96 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
                }}
                className="absolute"
                style={{ left: img.left, top: img.top, width: img.width, height: img.height, zIndex: img.z }}
              >
                <img
                  src={img.src}
                  alt=""
                  className={`size-full rounded-xl object-cover ${
                    img.border ? 'border-[6px] border-white shadow-xl' : ''
                  }`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[rgba(90,98,113,0.2)]" />

        {/* Steps */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ staggerChildren: 0.12 }}
          className="flex flex-col gap-8 md:flex-row md:gap-10"
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.n}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
              className="flex flex-1 items-center gap-4"
            >
              <div className="relative flex size-[67px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-card">
                <span className="font-display text-[32px] font-medium text-ink">{step.n}</span>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent opacity-15" />
              </div>
              <p className="font-display text-2xl font-medium leading-tight tracking-[-0.02em] text-ink">
                {step.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
