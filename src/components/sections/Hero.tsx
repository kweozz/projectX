import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../Navbar'
import MaskedText from '../MaskedText'
import { ArrowUpRight } from '../icons'
import heroPoster from '../../assets/hero/hero-bg.webp'
import heroVideo from '../../assets/hero/hero-bg.mp4'

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
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {})
  }, [])

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-ink">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-cover"
        src={heroVideo}
        poster={heroPoster}
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Legibility overlay — darker toward bottom-left where the copy sits */}
      <div className="absolute inset-0 bg-gradient-to-tr from-ink/80 via-ink/30 to-transparent" />

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
