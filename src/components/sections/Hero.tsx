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

// One 24px period of a triangle wave in the RED channel (green pinned at 128 so
// there's no vertical wobble). feTile repeats it; feDisplacementMap uses it to
// physically refract the photo in vertical ribs → real fluted / reeded glass.
const STRIPE_TILE =
  'data:image/svg+xml,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'>" +
      "<defs><linearGradient id='s' x1='0' y1='0' x2='24' y2='0' gradientUnits='userSpaceOnUse'>" +
      "<stop offset='0' stop-color='#008000'/><stop offset='0.5' stop-color='#ff8000'/>" +
      "<stop offset='1' stop-color='#008000'/></linearGradient></defs>" +
      "<rect width='24' height='24' fill='url(#s)'/></svg>",
  )

// Highlight/shadow per rib — the "depth" that sells the glass (subtle, aligned
// to the 24px displacement period).
const RIB_SHADING =
  'repeating-linear-gradient(90deg,' +
  'rgba(255,255,255,0.16) 0px, rgba(255,255,255,0) 5px,' +
  'rgba(0,0,0,0.18) 12px, rgba(255,255,255,0) 19px,' +
  'rgba(255,255,255,0.16) 24px)'

// Two background treatments, both on the "clean ink → …" idea:
//  • 'photo' — the ink colour flows cleanly into the sharp facade photo seen
//    through fluted/ribbed glass (real refraction + rib shading for depth).
//  • 'glass' — the ink colour flows into the fluted-glass shader, no photo.
export type HeroVariant = 'photo' | 'glass'

export default function Hero({ variant = 'photo' }: { variant?: HeroVariant }) {
  const revealMask =
    'linear-gradient(to right, transparent 0%, transparent 24%, black 54%, black 100%)'

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-ink">
      {/* Hidden SVG: the fluted-glass refraction filter. */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <filter
          id="heroFluted"
          x="-2%"
          y="-2%"
          width="104%"
          height="104%"
          colorInterpolationFilters="sRGB"
        >
          <feImage href={STRIPE_TILE} x="0" y="0" width="24" height="24" result="tile" />
          <feTile in="tile" result="map" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale="16"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {variant === 'glass' ? (
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
        /* Photo behind fluted glass — the ink dissolves cleanly into it. */
        <div
          className="pointer-events-none absolute inset-0"
          style={{ maskImage: revealMask, WebkitMaskImage: revealMask }}
        >
          <img
            src={heroImage}
            alt=""
            style={{ objectPosition: '60% 50%', filter: 'url(#heroFluted)' }}
            className="absolute inset-0 size-full scale-105 object-cover"
          />
          {/* Rib shading for depth (glossy highlight + valley shadow per rib). */}
          <div
            className="absolute inset-0 mix-blend-overlay"
            style={{ backgroundImage: RIB_SHADING }}
          />
        </div>
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
