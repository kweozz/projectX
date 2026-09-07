import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import keuzes from '../../assets/transform/keuzes.webp'
import advies from '../../assets/transform/advies.webp'
import begeleiding from '../../assets/transform/begeleiding.webp'

const ease = [0.22, 1, 0.36, 1] as const

type Block = {
  title: string
  text: string
  image: string
  objectPosition?: string
  bg: string
  fg: string
  reverse: boolean // panel left / image right
}

// "We helpen bedrijven gericht transformeren" — Figma Layout Variation 4
// (1019:21981): centred intro, then full-bleed split cards (image 60% / panel 40%)
// in the brand colours #d33414 / #210b03 / #f9f6f1 that stack over one another.
const BLOCKS: Block[] = [
  {
    title: 'Van ambitie naar duidelijke keuzes.',
    text: 'We brengen cijfers, markt en ambities samen en maken concreet waar uw bedrijf naartoe moet.',
    image: keuzes,
    objectPosition: '50% 40%',
    bg: 'bg-rust',
    fg: 'text-white',
    reverse: false,
  },
  {
    title: 'Strategisch advies',
    text: 'We bekijken klanten, medewerkers, processen, systemen en data en tekenen uit hoe ze beter kunnen samenwerken.',
    image: advies,
    bg: 'bg-ink-900',
    fg: 'text-white',
    reverse: true,
  },
  {
    title: 'Onafhankelijke begeleiding',
    text: 'We maken concrete werven, zoeken waar nodig de juiste partners en bewaken voortgang, budget en resultaat.',
    image: begeleiding,
    objectPosition: '50% 60%',
    bg: 'bg-card',
    fg: 'text-ink',
    reverse: false,
  },
]

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return isDesktop
}

function BlockCard({
  b,
  index,
  total,
  progress,
}: {
  b: Block
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const isDesktop = useIsDesktop()
  const isLast = index === total - 1
  const start = index / total
  const end = (index + 1) / total
  // Kept fully opaque (never shows through); only a subtle recede as it's covered.
  const scale = useTransform(progress, [start, end], [1, 0.95])
  const style = isDesktop && !isLast ? { scale } : undefined

  const image = (
    <div className="h-56 w-full shrink-0 overflow-hidden sm:h-72 lg:h-full lg:w-[60%]">
      <img
        src={b.image}
        alt=""
        style={{ objectPosition: b.objectPosition }}
        className="size-full object-cover"
      />
    </div>
  )
  const panel = (
    <div className={`flex flex-1 flex-col justify-center gap-6 p-8 md:p-12 lg:w-[40%] ${b.fg}`}>
      <h3 className="max-w-[496px] font-display text-2xl font-semibold leading-[1.15] tracking-[-0.018em] md:text-[28px]">
        {b.title}
      </h3>
      <p className="max-w-[496px] font-display text-lg leading-[1.6] md:text-xl">{b.text}</p>
    </div>
  )

  // Full-bleed card that fills the viewport and pins; the next one covers it.
  return (
    <div className="relative lg:sticky lg:top-0 lg:h-screen" style={{ zIndex: index + 1 }}>
      <motion.div
        style={style}
        className={`flex h-full w-full overflow-hidden lg:flex-row lg:items-stretch ${b.bg} ${
          b.reverse ? 'flex-col-reverse' : 'flex-col'
        }`}
      >
        {b.reverse ? (
          <>
            {panel}
            {image}
          </>
        ) : (
          <>
            {image}
            {panel}
          </>
        )}
      </motion.div>
    </div>
  )
}

export default function WhatWeDo() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section id="wat-wij-doen" className="bg-ink-900 pt-20 md:pt-30">
      {/* Intro — centred (Figma 1019:21983) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -20% 0px' }}
        transition={{ duration: 0.7, ease }}
        className="mx-auto mb-12 flex max-w-[1440px] flex-col items-center gap-6 px-6 text-center md:mb-16 md:px-16"
      >
        <h2 className="max-w-[1100px] font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white">
          We helpen bedrijven gericht transformeren.
        </h2>
        <p className="max-w-[900px] font-display text-lg leading-[1.5] text-[#d6d3d1] md:text-2xl">
          Van strategie en bedrijfsvoering tot processen, data en technologie. We brengen
          alles samen in één plan en begeleiden de uitvoering — onafhankelijk van leveranciers.
        </p>
      </motion.div>

      {/* Full-bleed sticky-stacking split cards */}
      <div ref={ref} className="relative">
        {BLOCKS.map((b, i) => (
          <BlockCard key={b.title} b={b} index={i} total={BLOCKS.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}
