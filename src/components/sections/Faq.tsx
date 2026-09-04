import { motion } from 'framer-motion'
import p1 from '../../assets/faq/cards/card1.webp'
import p2 from '../../assets/faq/cards/card2.webp'
import p3 from '../../assets/faq/cards/card3.webp'
import p4 from '../../assets/faq/cards/card4.webp'

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

// Cards: 336×420 (Figma 976:15791). left/top as exact px within the 1312 content
// row; the SECTION (full width) clips only their bottoms — never left/right/top.
const cards = [
  { src: p1, left: '0%', top: 0, rot: -8, z: 10 },
  { src: p2, left: '20.05%', top: 97, rot: 4, z: 30 },
  { src: p3, left: '44.66%', top: 41, rot: -3, z: 20 },
  { src: p4, left: '63.64%', top: 104, rot: 6, z: 10 },
]

export default function Faq() {
  return (
    <section id="vragen" className="relative overflow-hidden bg-white pt-[120px]">
      <div className="mx-auto max-w-[1312px] px-6 md:px-16">
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

        {/* Gallery cards — a short region so the section's overflow clips the
            card bottoms; horizontally the cards stay fully visible. */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px 0px 0px' }}
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          className="relative mt-16 h-[240px] sm:h-[300px] md:h-[340px]"
        >
          {cards.map((c, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 48, rotate: c.rot * 0.4 },
                show: { opacity: 1, y: 0, rotate: c.rot, transition: { duration: 0.8, ease } },
              }}
              className="absolute w-[42%] origin-center sm:w-[31%] md:w-[25.6%]"
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
