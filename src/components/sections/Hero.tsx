import { motion } from 'framer-motion'
import MaskedText from '../MaskedText'
import Button from '../Button'
import FractalGlass from '../FractalGlass'
import heroPoster from '../../assets/hero/hero-bg.webp'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const item = {
  hidden: { y: 28, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-ink-900">
      {/* Live fractal-glass shader — terracotta palette built around the brand
          #d33414, with a warm-tint WCAG-safe zone bottom-left for the type. */}
      <FractalGlass
        className="absolute inset-0 size-full"
        poster={heroPoster}
        palette="terracotta glow"
        loopSeconds={14}
        fluteWidth={30}
        fluteStrength={340}
        fluteShine={58}
        exposure={1.4}
        warpStrength={0.09}
        noiseTravel={0.2}
        bottomFade={0.6}
        safeZone="bottom-left"
        safeStyle="warm tint"
        safeContrast="4.5:1"
        safeSize={0.3}
        safeDarkness={0.42}
        safeFeather={0.36}
        safeRichness={0.4}
      />
      {/* Blend the bottom into the section below (already brown here, so invisible). */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-ink-900" />

      {/* Hero content — bottom-left */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col justify-end px-6 pb-16 pt-32 md:px-16 md:pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex max-w-3xl flex-col gap-8"
        >
          <div className="flex flex-col gap-6">
            <motion.h1
              variants={item}
              className="max-w-[720px] font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.2] tracking-[-0.019em] text-white"
            >
              <MaskedText onMount>Waar staat uw bedrijf in 2032?</MaskedText>
            </motion.h1>
            <motion.p
              variants={item}
              className="max-w-xl font-display text-lg leading-[1.34] text-white/90 md:text-2xl"
            >
              Strategisch advies voor Vlaamse kmo&apos;s op business en digitaal vlak.
              Gedragen door heel uw team, geleid door u en uw cijfers.
            </motion.p>
          </div>

          <motion.div variants={item} className="flex flex-wrap items-center gap-6">
            <Button variant="primary" surface="dark" size="sm" to="/contact">
              Plan een gesprek
            </Button>
            <Button variant="tertiary" surface="dark" size="sm" to="/contact" icon arrow="up-right">
              Of begin met de 2032-zelfscan
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
