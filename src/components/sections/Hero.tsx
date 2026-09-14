import { motion } from 'framer-motion'
import MaskedText from '../MaskedText'
import Button from '../Button'
import FractalGlass from '../FractalGlass'
import heroPoster from '../../assets/hero/hero-bg.webp'
// Terracotta glass-facade at golden hour — the glass literally reads as the
// brand #d33414, so the screen-blended fractal glow melts into it.
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

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-ink-900">
      {/* Right-hand composite: real photo with the fractal-glass shader screened
          over it, so the warm glow "flows" across the facade while its dark base
          leaves the photo untouched. A feathered mask fades the whole group into
          the clean ink colour on the left — part colour, part fractal, part photo
          — instead of a flat gradient fill. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, transparent 30%, black 70%, black 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, transparent 30%, black 70%, black 100%)',
        }}
      >
        <img
          src={heroImage}
          alt=""
          style={{ objectPosition: '62% 50%' }}
          className="absolute inset-0 size-full object-cover"
        />
        {/* Fractal glow, screened over the photo; its own mask keeps it strongest
            on the right and clean toward the middle. */}
        <FractalGlass
          className="absolute inset-0 size-full opacity-60 mix-blend-screen"
          poster={heroPoster}
          palette="terracotta glow"
          loopSeconds={16}
          fluteWidth={34}
          fluteStrength={300}
          fluteShine={40}
          exposure={1.35}
          warpStrength={0.08}
          noiseTravel={0.18}
          bottomFade={0}
        />
      </div>

      {/* Legibility: a soft ink wash over the lower-left where the type sits (not
          a background fill — it only darkens the copy area). */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent md:bg-gradient-to-r md:from-ink-900 md:via-ink-900/50 md:to-transparent" />
      {/* Blend the very bottom into the section below. */}
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
            <Button variant="tertiary" surface="dark" size="sm" to="/contact" icon arrow="up-right" className="py-2">
              Of begin met de 2032-zelfscan
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
