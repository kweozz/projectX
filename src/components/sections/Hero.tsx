import { motion } from 'framer-motion'
import MaskedText from '../MaskedText'
import Button from '../Button'
import FractalGlass from '../FractalGlass'
import FlutedImage from '../FlutedImage'
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

// Two treatments:
//  • 'photo' — light editorial: the cream field holds the type on the left while
//    the facade photo melts into soft vertical reeded-glass streaks on the right
//    and dissolves back into the cream.
//  • 'glass' — dark: the ink flows into the fluted-glass shader (kept option).
export type HeroVariant = 'photo' | 'glass'

export default function Hero({ variant = 'photo' }: { variant?: HeroVariant }) {
  const dark = variant === 'glass'
  const revealMask =
    'linear-gradient(to right, transparent 0%, transparent 28%, black 62%, black 100%)'

  return (
    <section
      id="top"
      className={`relative min-h-[100svh] w-full overflow-hidden ${dark ? 'bg-ink' : 'bg-cream'}`}
    >
      {dark ? (
        /* Fractal glass — clean, fades in from the ink on the left. */
        <div
          className="pointer-events-none absolute inset-0"
          style={{ maskImage: revealMask, WebkitMaskImage: revealMask }}
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
        /* Facade melting through fluted glass, dissolving into the cream. */
        <>
          <div
            className="pointer-events-none absolute inset-0"
            style={{ maskImage: revealMask, WebkitMaskImage: revealMask }}
          >
            <FlutedImage
              src={heroImage}
              className="absolute inset-0 size-full"
              fluteWidth={30}
              magnify={2.1}
              edge={0.22}
              shine={0.08}
              streak={48}
              objectPositionX={0.62}
              objectPositionY={0.5}
            />
          </div>
          {/* Melt the streaks into the cream at the top and bottom. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cream to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-cream to-transparent" />
        </>
      )}

      {/* Keep the type crisp: a soft wash in the section colour behind the copy. */}
      {dark ? (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
          <div className="pointer-events-none absolute inset-0 hidden md:block md:bg-gradient-to-r md:from-ink md:via-ink/40 md:to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-ink" />
        </>
      ) : (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream via-cream/40 to-transparent md:bg-gradient-to-r md:from-cream md:via-cream/50 md:to-transparent" />
      )}

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
              className={`max-w-[720px] font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.2] tracking-[-0.019em] ${
                dark ? 'text-white' : 'text-ink'
              }`}
            >
              <MaskedText onMount>Waar staat uw bedrijf in 2032?</MaskedText>
            </motion.h1>
            <motion.p
              variants={item}
              className={`max-w-xl font-display text-lg leading-[1.34] md:text-2xl ${
                dark ? 'text-white/90' : 'text-muted'
              }`}
            >
              Strategisch advies voor Vlaamse kmo&apos;s op business en digitaal vlak.
              Gedragen door heel uw team, geleid door u en uw cijfers.
            </motion.p>
          </div>

          <motion.div variants={item} className="flex flex-wrap items-center gap-6">
            <Button variant="primary" surface={dark ? 'dark' : 'light'} size="sm" to="/contact">
              Plan een gesprek
            </Button>
            <Button
              variant="tertiary"
              surface={dark ? 'dark' : 'light'}
              size="sm"
              to="/contact"
              icon
              arrow="up-right"
              className="py-2"
            >
              Of begin met de 2032-zelfscan
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
