import { motion } from 'framer-motion'
import Navbar from '../Navbar'
import MaskedText from '../MaskedText'
import FractalGlass from '../FractalGlass'
import { ArrowUpRight } from '../icons'
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
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-ink">
      {/* Live fractal-glass shader background. The WCAG text-safe zone holds the
          bottom-left dark (where the copy sits) with a guaranteed 4.5:1 contrast
          against white — so the dark comes from the gradient itself, no overlay. */}
      <FractalGlass
        className="absolute inset-0 size-full"
        poster={heroPoster}
        safeZone="bottom-left"
        safeStyle="warm tint"
        safeContrast="4.5:1"
        safeSize={0.55}
        safeDarkness={0.5}
        safeFeather={0.5}
      />

      <Navbar />

      {/* Hero content */}
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
              className="max-w-[625px] font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.27] tracking-[-0.019em] text-white"
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
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-cream px-5 py-3 font-sans text-sm font-medium uppercase tracking-tight text-ink-800 transition-transform duration-200 hover:-translate-y-0.5"
            >
              Plan een gesprek
            </a>
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 font-sans text-sm font-medium uppercase tracking-tight text-white"
            >
              <span className="underline decoration-from-font underline-offset-4">
                Of begin met de 2032-zelfscan
              </span>
              <ArrowUpRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
