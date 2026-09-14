import { motion } from 'framer-motion'
import MaskedText from '../MaskedText'
import Button from '../Button'
import FractalGlass from '../FractalGlass'
import FlutedImage from '../FlutedImage'
import heroPoster from '../../assets/hero/hero-bg.webp'
import heroImage from '../../assets/hero/hero-facade.webp'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
}
const item = {
  hidden: { y: 26, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

// Split hero on white: left-aligned type on the left, glass on the right melting
// into the white. 'photo' (default) = the facade through animated fluted glass;
// 'glass' = the brand-red fractal-glass field (kept option).
export type HeroVariant = 'photo' | 'glass'

const revealMask =
  'linear-gradient(to right, transparent 0%, transparent 30%, black 60%, black 100%)'

export default function Hero({ variant = 'photo' }: { variant?: HeroVariant }) {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ maskImage: revealMask, WebkitMaskImage: revealMask }}
      >
        {variant === 'glass' ? (
          <FractalGlass
            className="absolute inset-0 size-full"
            poster={heroPoster}
            palette="rust glow"
            loopSeconds={16}
            fluteWidth={34}
            fluteStrength={320}
            fluteShine={48}
            exposure={1.35}
            warpStrength={0.07}
            noiseTravel={0.18}
            bottomFade={0}
          />
        ) : (
          <FlutedImage
            src={heroImage}
            className="absolute inset-0 size-full"
            fluteWidth={30}
            amp={17}
            edge={0.03}
            shine={0.05}
            chroma={0.03}
            sway={2}
            sweep={0.05}
            zoom={2}
            objectPositionX={0.5}
            objectPositionY={0.42}
          />
        )}
      </div>

      {/* Keep the type crisp: white behind the left column only. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.7) 32%, transparent 52%)',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent lg:hidden" />

      {/* Content — left column, left-aligned */}
      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-[1600px] px-6 md:px-16 lg:grid-cols-2">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start justify-center gap-8 py-32"
        >
          <div className="flex flex-col gap-6">
            <motion.h1
              variants={item}
              className="max-w-[560px] font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.12] tracking-[-0.019em] text-ink"
            >
              <MaskedText onMount>Waar staat uw bedrijf in 2032?</MaskedText>
            </motion.h1>
            <motion.p
              variants={item}
              className="max-w-[500px] font-display text-lg leading-[1.4] text-muted md:text-xl"
            >
              Strategisch advies voor Vlaamse kmo&apos;s op business en digitaal vlak.
              Gedragen door heel uw team, geleid door u en uw cijfers.
            </motion.p>
          </div>

          <motion.div variants={item} className="flex flex-wrap items-center gap-6">
            <Button variant="primary" surface="light" size="sm" to="/contact">
              Plan een gesprek
            </Button>
            <Button variant="tertiary" surface="light" size="sm" to="/contact" icon arrow="up-right" className="py-2">
              Of begin met de 2032-zelfscan
            </Button>
          </motion.div>
        </motion.div>

        <div aria-hidden />
      </div>
    </section>
  )
}
