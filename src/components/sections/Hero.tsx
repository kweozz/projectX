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

// 'glass' (default) — split hero: cream + centred type on the left, brand-red
// fluted glass on the right melting cleanly into the cream. 'photo' — the fluted
// photo experiment, kept as an option.
export type HeroVariant = 'photo' | 'glass'

export default function Hero({ variant = 'glass' }: { variant?: HeroVariant }) {
  if (variant === 'photo') {
    return (
      <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-ink">
        <FlutedImage
          src={heroImage}
          className="absolute inset-0 size-full"
          fluteWidth={8}
          meltEnd={0.46}
          thin={0.2}
          seedJitter={0.12}
          sat={1.14}
          contrast={1.09}
          objectPositionX={0.55}
          objectPositionY={0.52}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />
        <HeroContent dark />
      </section>
    )
  }

  const revealMask =
    'linear-gradient(to right, transparent 0%, transparent 26%, black 58%, black 100%)'

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-cream">
      {/* Brand-red fluted glass on the right, melting into the cream on the left. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ maskImage: revealMask, WebkitMaskImage: revealMask }}
      >
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
      </div>
      {/* Keep the type crisp on cream (only over the left column). */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, var(--color-cream) 0%, rgba(251,250,248,0.72) 30%, transparent 50%)',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream to-transparent lg:hidden" />

      <HeroContent />
    </section>
  )
}

function HeroContent({ dark = false }: { dark?: boolean }) {
  return (
    <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-[1600px] px-6 md:px-16 lg:grid-cols-2">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center justify-center gap-8 py-32 text-center lg:items-center"
      >
        <div className="flex flex-col gap-6">
          <motion.h1
            variants={item}
            className={`font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.12] tracking-[-0.019em] ${
              dark ? 'text-white' : 'text-ink'
            }`}
          >
            <MaskedText onMount>Waar staat uw bedrijf in 2032?</MaskedText>
          </motion.h1>
          <motion.p
            variants={item}
            className={`mx-auto max-w-[520px] font-display text-lg leading-[1.4] md:text-xl ${
              dark ? 'text-white/90' : 'text-muted'
            }`}
          >
            Strategisch advies voor Vlaamse kmo&apos;s op business en digitaal vlak.
            Gedragen door heel uw team, geleid door u en uw cijfers.
          </motion.p>
        </div>

        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-6">
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

      {/* right column left empty so the fluted glass reads through */}
      <div aria-hidden />
    </div>
  )
}
