import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import Button from '../Button'
import boardroom from '../../assets/case/carousel-2-boardroom.webp'
import whiteboard from '../../assets/cases/whiteboard.webp'
import besix from '../../assets/cases/besix.webp'

type Block = {
  name: string
  image: string
  objectPosition?: string
  description: string
  parts: { title: string; text: string }[]
}

// "Wat wij doen" — the approach, told as three clean stacking blocks.
const BLOCKS: Block[] = [
  {
    name: 'Twee blikken, samen',
    image: boardroom,
    description:
      'Een bedrijf lees je van boven, door de cijfers — en van buiten, door de mensen. Bijna niemand biedt ze samen. Wij wel, want wij zíjn die twee blikken.',
    parts: [
      { title: 'Robin — van boven', text: 'Businessmodellen en marges, vertaald naar cijfers waar uw management tekent.' },
      { title: 'Hendrik — van buiten', text: 'Wat klanten en medewerkers écht doen, welke data er ligt en wat ze kost.' },
    ],
  },
  {
    name: 'Doelen die u zelf ondertekent',
    image: whiteboard,
    description:
      'We bepalen mét u de doelen — voor 2032 én per kwartaal — nagerekend tot de cijfers kloppen. En we toetsen het plan bij echte klanten en medewerkers vóór er een euro naar een leverancier gaat.',
    parts: [
      { title: 'Getoetst, niet aangenomen', text: 'Uw plan getest in de praktijk, niet op papier.' },
      { title: 'Per kwartaal bijgestuurd', text: '2032 wordt kwartaal per kwartaal beslist.' },
    ],
  },
  {
    name: 'Leveranciersneutraal, als een loods',
    image: besix,
    objectPosition: '50% 40%',
    description:
      'We bouwen zelf niets en nemen van niemand commissie — elke briefing gaat neutraal de deur uit, u beslist. En we blijven aan boord zoals een loods: tot uw team zelf de weg kent.',
    parts: [
      { title: 'Geen commissie, u beslist', text: 'Iedereen biedt op hetzelfde speelveld.' },
      { title: 'Vaste prijs, geen lopende teller', text: 'Wie met ons spreekt, krijgt ook ons.' },
    ],
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
  const scale = useTransform(progress, [start, end], [1, 0.86])
  const opacity = useTransform(progress, [start, end], [1, 0.4])
  const style = isDesktop && !isLast ? { scale, opacity } : undefined

  return (
    <div className="relative lg:sticky lg:top-0 lg:h-screen" style={{ zIndex: index + 1 }}>
      <motion.div style={style} className="flex h-full items-center bg-ink-900 py-16 lg:py-0">
        <div className="grid w-full grid-cols-1 items-center gap-8 px-6 md:px-16 lg:grid-cols-[minmax(0,739px)_1fr] lg:gap-[120px] lg:px-0 lg:pr-[max(4rem,calc((100vw-1600px)/2+4rem))]">
          {/* Image — flush to the left edge, right corners rounded */}
          <div className="group relative overflow-hidden rounded-[12px] lg:order-1 lg:rounded-l-none lg:rounded-r-[10px]">
            <img
              src={b.image}
              alt=""
              style={{ objectPosition: b.objectPosition }}
              className="h-72 w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] sm:h-96 lg:h-[min(640px,72vh)]"
            />
          </div>
          {/* Content */}
          <div className="flex flex-col gap-6 lg:order-2 lg:max-w-[560px]">
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-white">
              {b.name}
            </h2>
            <p className="max-w-[52ch] font-display text-base leading-relaxed text-[#d6d3d1] md:text-lg">
              {b.description}
            </p>
            <div className="mt-1 flex flex-col border-t border-[#44403c]">
              {b.parts.map((part) => (
                <div key={part.title} className="flex flex-col gap-1 border-b border-[#44403c] py-4">
                  <h3 className="font-display text-base font-medium tracking-[-0.01em] text-white">
                    {part.title}
                  </h3>
                  <p className="font-display text-base leading-relaxed text-[#d6d3d1]">{part.text}</p>
                </div>
              ))}
            </div>
            <Button variant="primary" surface="dark" to="/contact" icon className="mt-2 w-fit">
              Plan een gesprek
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function WhatWeDo() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section id="wat-wij-doen" className="bg-ink-900">
      {/* Section intro */}
      <div className="mx-auto max-w-[1600px] px-6 pb-6 pt-20 md:px-16 md:pb-10 md:pt-30">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-[760px] flex-col gap-4"
        >
          <span className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-[#f0a07a]">
            Wat wij doen
          </span>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white">
            Wij denken mét u. Met twee blikken tegelijk.
          </h2>
        </motion.div>
      </div>

      {/* Sticky-stack blocks (avexa /works style, like the Diensten page) */}
      <div ref={ref} className="relative">
        {BLOCKS.map((b, i) => (
          <BlockCard key={b.name} b={b} index={i} total={BLOCKS.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}
