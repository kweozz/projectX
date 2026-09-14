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

// What Allume does, in three beats — turns the hero from a mood into a message.
const VALUES = ['Onafhankelijk van leveranciers', 'Becijferd, niet op buikgevoel', 'Van plan tot uitvoering']

// 'glass' (default) — the live fractal-glass hero. 'photo' — the fluted photo
// experiment, kept as an option.
export type HeroVariant = 'photo' | 'glass'

export default function Hero({ variant = 'glass' }: { variant?: HeroVariant }) {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-ink-900">
      {variant === 'photo' ? (
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
      ) : (
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
          safeSize={0.34}
          safeDarkness={0.42}
          safeFeather={0.36}
          safeRichness={0.4}
        />
      )}

      {/* Blend the bottom into the section below. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-ink-900" />

      {/* Hero content — bottom-left */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col justify-end px-6 pb-16 pt-32 md:px-16 md:pb-24">
        <motion.div variants={container} initial="hidden" animate="show" className="flex max-w-3xl flex-col gap-7">
          {/* Kicker */}
          <motion.p
            variants={item}
            className="font-display text-sm font-medium uppercase tracking-[0.18em] text-white/70"
          >
            Strategisch advies voor Vlaamse kmo&apos;s
          </motion.p>

          <div className="flex flex-col gap-6">
            <motion.h1
              variants={item}
              className="max-w-[820px] font-display text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-white"
            >
              <MaskedText onMount>Waar staat uw bedrijf in 2032?</MaskedText>
            </motion.h1>
            <motion.p
              variants={item}
              className="max-w-[640px] font-display text-lg leading-[1.4] text-white/90 md:text-2xl"
            >
              Wij vertalen uw ambities naar een becijferde roadmap — van strategie en
              processen tot data en technologie. Onafhankelijk van leveranciers, gedragen
              door uw eigen team.
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

          {/* Value strip — three beats of what Allume does */}
          <motion.ul
            variants={item}
            className="mt-2 flex flex-col gap-x-6 gap-y-2 border-t border-white/15 pt-5 font-display text-sm text-white/80 sm:flex-row sm:flex-wrap sm:items-center"
          >
            {VALUES.map((v, i) => (
              <li key={v} className="flex items-center gap-3">
                {i > 0 && <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline-block" />}
                <span>{v}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
