import { motion } from 'framer-motion'
import p1 from '../../assets/cases/besix.webp'
import p2 from '../../assets/case/carousel-2-boardroom.webp'
import p3 from '../../assets/process/sunset.webp'
import p4 from '../../assets/case/carousel-1-workshop.webp'

const ease = [0.22, 1, 0.36, 1] as const

type Q = { pre: string; hi: string; post: string }
const QUESTIONS: Q[] = [
  { pre: 'Mijn ', hi: 'concurrent lijkt digitaal voorop', post: '. Maakt dat echt iets uit?' },
  { pre: 'Iedereen praat over ', hi: 'AI.', post: ' Wat betekent het voor mijn zaak?' },
  { pre: '', hi: 'Waar investeer ik', post: ' eerst: mensen, systemen of verkoop?' },
  { pre: 'De ', hi: 'volgende generatie staat klaar', post: '. Is het bedrijf dat ook?' },
  { pre: '', hi: 'Mijn ERP is tien jaar', post: ' oud. Vervangen, of verder bouwen?' },
  { pre: 'We groeien, maar de ', hi: 'marge groeit niet mee.', post: ' Waar lekt het?' },
]

// Cards: 336×420 (Figma). Left as % of the 1312 content width; top offsets
// carry a +40 base so the rotation never clips the tops — only the bottoms are
// clipped by the section, matching Figma (976:15791).
const cards = [
  { src: p1, left: '0%', top: 40, rot: -8, z: 10 },
  { src: p2, left: '20.05%', top: 137, rot: 4, z: 30 },
  { src: p3, left: '44.66%', top: 81, rot: -3, z: 20 },
  { src: p4, left: '63.64%', top: 144, rot: 6, z: 10 },
]

export default function Faq() {
  return (
    <section id="vragen" className="bg-white pt-[120px]">
      <div className="mx-auto flex max-w-[1312px] flex-col items-center px-6 md:px-16">
        {/* Heading + manifesto list */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
          className="flex w-full flex-col items-center gap-12"
        >
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
            className="max-w-[1280px] text-center font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.018em] text-ink"
          >
            Wij krijgen vaak dezelfde vragen
          </motion.h2>

          <ul className="flex flex-col items-center gap-[clamp(1.5rem,3vw,3rem)]">
            {QUESTIONS.map((q, i) => (
              <motion.li
                key={i}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
                className="max-w-[1100px] text-center font-display text-[clamp(1.25rem,2.5vw,2rem)] font-medium leading-snug tracking-[-0.024em] text-ink"
              >
                {q.pre}
                <span className="font-semibold text-rust">{q.hi}</span>
                {q.post}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Big gallery cards — bottoms clipped by the section (overflow-hidden) */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -5% 0px' }}
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          className="relative mt-14 h-[300px] w-full overflow-hidden sm:h-[340px] md:mt-16 md:h-[380px]"
        >
          {cards.map((c, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 48, rotate: c.rot * 0.4 },
                show: { opacity: 1, y: 0, rotate: c.rot, transition: { duration: 0.8, ease } },
              }}
              className="absolute w-[44%] origin-center sm:w-[30%] md:w-[25.6%]"
              style={{ left: c.left, top: c.top, zIndex: c.z }}
            >
              <img
                src={c.src}
                alt=""
                className="aspect-[336/420] w-full rounded-[12px] border-[5px] border-white object-cover shadow-[0_14px_28px_0_rgba(0,0,0,0.2)]"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
