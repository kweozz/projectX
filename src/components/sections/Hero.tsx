import { motion } from 'framer-motion'
import MaskedText from '../MaskedText'
import Button from '../Button'
import FractalGlass from '../FractalGlass'
import heroPoster from '../../assets/hero/hero-bg.webp'
import heroImage from '../../assets/hero/hero-facade.webp'

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

// Two background treatments, both built on the same "clean ink → …" idea:
//  • 'photo' — the ink colour flows cleanly straight into the sharp facade photo
//    (no fractal in between). The glass feel comes from the building itself.
//  • 'glass' — the ink colour flows into the crisp fluted-glass shader, no photo.
//    Kept as an option; it's the dark→gradient effect on its own.
export type HeroVariant = 'photo' | 'glass'

export default function Hero({ variant = 'photo' }: { variant?: HeroVariant }) {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-ink">
      {variant === 'glass' ? (
        /* Fractal glass — clean, fades in from the ink on the left. */
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, transparent 20%, black 42%, black 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, transparent 20%, black 42%, black 100%)',
          }}
        >
          <FractalGlass
            className="absolute inset-0 size-full"
            poster={heroPoster}
            palette="terracotta glow"
            loopSeconds={16}
            fluteWidth={30}
            fluteStrength={340}
            fluteShine={58}
            exposure={1.4}
            warpStrength={0.09}
            noiseTravel={0.2}
            bottomFade={0}
          />
        </div>
      ) : (
        /* Photo — sharp, full quality; the ink colour dissolves cleanly into it
           via a single feathered edge (no fractal band). */
        <img
          src={heroImage}
          alt=""
          style={{
            objectPosition: '60% 50%',
            maskImage:
              'linear-gradient(to right, transparent 0%, transparent 24%, black 54%, black 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, transparent 24%, black 54%, black 100%)',
          }}
          className="pointer-events-none absolute inset-0 size-full object-cover"
        />
      )}

      {/* Legibility: soft ink washes over the type (not a background fill) — one
          from the bottom, one from the left — so white copy stays crisp even
          where bright gold glass sits behind it. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
      <div className="pointer-events-none absolute inset-0 hidden md:block md:bg-gradient-to-r md:from-ink md:via-ink/40 md:to-transparent" />
      {/* Blend the very bottom into the section below. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-ink" />

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
            <Button variant="tertiary" surface="dark" size="sm" to="/contact" icon arrow="up-right" className="py-2">
              Of begin met de 2032-zelfscan
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
