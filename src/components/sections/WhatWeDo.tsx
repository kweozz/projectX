import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from '../Button'
import p1 from '../../assets/cases/besix.webp'
import p2 from '../../assets/case/carousel-2-boardroom.webp'
import p3 from '../../assets/process/sunset.webp'
import p4 from '../../assets/case/carousel-1-workshop.webp'

type Q = { pre: string; hi: string; post: string }
const QUESTIONS: Q[] = [
  { pre: 'Mijn ', hi: 'concurrent lijkt digitaal voorop', post: '. Maakt dat echt iets uit?' },
  { pre: 'Iedereen praat over ', hi: 'AI.', post: ' Wat betekent het voor mijn zaak?' },
  { pre: '', hi: 'Waar investeer ik', post: ' eerst: mensen, systemen of verkoop?' },
  { pre: 'De ', hi: 'volgende generatie staat klaar', post: '. Is het bedrijf dat ook?' },
  { pre: '', hi: 'Mijn ERP is tien jaar', post: ' oud. Vervangen, of verder bouwen?' },
  { pre: 'We groeien, maar de ', hi: 'marge groeit niet mee.', post: ' Waar lekt het?' },
]

// Deck cards that fade + sink while the hero card (p1) breaks out and morphs.
const deck = [
  { src: p2, left: '20.05%', top: '54vh', rot: 4, z: 20 },
  { src: p3, left: '44.66%', top: '50vh', rot: -3, z: 15 },
  { src: p4, left: '63.64%', top: '55vh', rot: 6, z: 10 },
]

export default function WhatWeDo() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // State A — FAQ text fades out as the morph begins.
  const faqOpacity = useTransform(p, [0, 0.1, 0.2], [1, 1, 0])
  const faqY = useTransform(p, [0, 0.2], [0, -48])

  // Deck cards 2-4 — fade out and sink.
  const deckOpacity = useTransform(p, [0.06, 0.32], [1, 0])
  const deckY = useTransform(p, [0.06, 0.4], [0, 160])

  // Hero card (p1) — morphs from the deck into the full-width WWD header.
  const mWidth = useTransform(p, [0.16, 0.52], ['26%', '100%'])
  const mTop = useTransform(p, [0.16, 0.52], ['53vh', '13vh'])
  const mRotate = useTransform(p, [0.16, 0.52], [-8, 0])
  const mRadius = useTransform(p, [0.16, 0.52], [12, 16])

  // State B — WWD content fades in once the header has landed.
  const wwdOpacity = useTransform(p, [0.56, 0.74], [0, 1])
  const wwdY = useTransform(p, [0.56, 0.8], [48, 0])

  return (
    <section ref={ref} className="relative h-[280vh] bg-white">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="relative mx-auto h-full max-w-[1312px] px-6 md:px-16">
          {/* State A — FAQ heading + questions */}
          <motion.div
            style={{ opacity: faqOpacity, y: faqY }}
            className="absolute inset-x-6 top-[10vh] flex flex-col items-center gap-10 md:inset-x-16"
          >
            <h2 className="text-center font-display text-[clamp(1.75rem,4.5vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.018em] text-ink">
              Wij krijgen vaak dezelfde vragen
            </h2>
            <ul className="flex flex-col items-center gap-[clamp(1rem,2.4vw,2.25rem)]">
              {QUESTIONS.map((q, i) => (
                <li
                  key={i}
                  className="max-w-[1100px] text-center font-display text-[clamp(1.125rem,2.3vw,1.875rem)] font-medium leading-snug tracking-[-0.024em] text-ink"
                >
                  {q.pre}
                  <span className="font-semibold text-rust">{q.hi}</span>
                  {q.post}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Deck cards 2-4 — fade + sink */}
          <motion.div style={{ opacity: deckOpacity, y: deckY }} className="absolute inset-0">
            {deck.map((c, i) => (
              <div
                key={i}
                className="absolute w-[26%] origin-center"
                style={{ left: c.left, top: c.top, rotate: `${c.rot}deg`, zIndex: c.z }}
              >
                <img
                  src={c.src}
                  alt=""
                  className="aspect-[336/420] w-full rounded-[12px] border-[5px] border-white object-cover shadow-[0_14px_28px_0_rgba(0,0,0,0.2)]"
                />
              </div>
            ))}
          </motion.div>

          {/* Hero card (p1) — morphing into the WWD header */}
          <motion.div
            style={{ width: mWidth, top: mTop, rotate: mRotate, borderRadius: mRadius }}
            className="absolute left-0 z-30 h-[38vh] overflow-hidden border-[5px] border-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.35)]"
          >
            <img src={p1} alt="" className="size-full object-cover" />
          </motion.div>

          {/* State B — Wat Wij Doen content */}
          <motion.div
            style={{ opacity: wwdOpacity, y: wwdY }}
            className="absolute inset-x-6 top-[56vh] md:inset-x-16"
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
              <div className="flex flex-col gap-5 lg:w-[46%]">
                <span className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-rust">
                  Wat wij doen
                </span>
                <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
                  Wij denken mét u. Met twee blikken tegelijk.
                </h2>
                <p className="max-w-[520px] font-display text-lg leading-relaxed text-muted">
                  Een bedrijf lees je van boven, door de cijfers — en van buiten, door de
                  mensen. Beide kloppen, beide zijn onvolledig. Wij bieden ze samen, want
                  wij zíjn die twee blikken.
                </p>
                <Button variant="primary" surface="light" to="/contact" icon arrow="up-right" className="mt-2 w-fit">
                  Plan een gesprek
                </Button>
              </div>

              <div className="flex flex-1 flex-col gap-6 sm:flex-row lg:flex-col lg:gap-8">
                <div className="flex-1 border-t border-black/10 pt-5">
                  <h3 className="font-display text-xl font-medium text-ink">Robin — van boven</h3>
                  <p className="mt-2 font-display text-base leading-relaxed text-muted">
                    Businessmodellen en marges. Vertaalt uw ambitie naar cijfers waar uw
                    management zijn handtekening onder zet.
                  </p>
                </div>
                <div className="flex-1 border-t border-black/10 pt-5">
                  <h3 className="font-display text-xl font-medium text-ink">Hendrik — van buiten</h3>
                  <p className="mt-2 font-display text-base leading-relaxed text-muted">
                    Kijkt naar wat mensen écht doen: hoe een klant afhaakt, waar een proces
                    wringt, welke data er ligt en wat ze kost.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
