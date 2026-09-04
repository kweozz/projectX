import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MaskedText from '../MaskedText'
import Button from '../Button'
import heroPhoto from '../../assets/hero/hero-photo.webp'

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
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Subtle parallax: the photo drifts a touch slower than the scroll.
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] w-full overflow-hidden bg-ink-900">
      {/* Full-bleed hero photograph (woman with the 2032 report). */}
      <motion.div style={{ y: photoY }} className="absolute inset-0 -bottom-[12%]">
        <img
          src={heroPhoto}
          alt=""
          className="size-full scale-105 object-cover object-[70%_center]"
        />
      </motion.div>

      {/* Legibility + section blend: soft top shade, strong sink to ink-900 at the
          bottom so the hero flows straight into the FAQ seam (no visible line). */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(33,11,3,0)_0%,rgba(33,11,3,0.18)_32%,rgba(33,11,3,0.24)_59%,rgb(33,11,3)_100%)]" />

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
