import { motion } from 'framer-motion'
import p1 from '../../assets/cases/besix.webp'
import p2 from '../../assets/case/carousel-2-boardroom.webp'
import p3 from '../../assets/process/sunset.webp'
import p4 from '../../assets/case/carousel-1-workshop.webp'

const ease = [0.22, 1, 0.36, 1] as const

// Each question is a statement with one highlighted key phrase (rust accent).
type Q = { pre: string; hi: string; post: string }
const QUESTIONS: Q[] = [
  { pre: 'Mijn ', hi: 'concurrent lijkt digitaal voorop', post: '. Maakt dat echt iets uit?' },
  { pre: 'Iedereen praat over ', hi: 'AI.', post: ' Wat betekent het voor mijn zaak?' },
  { pre: '', hi: 'Waar investeer ik', post: ' eerst: mensen, systemen of verkoop?' },
  { pre: 'De ', hi: 'volgende generatie staat klaar', post: '. Is het bedrijf dat ook?' },
  { pre: '', hi: 'Mijn ERP is tien jaar', post: ' oud. Vervangen, of verder bouwen?' },
  { pre: 'We groeien, maar de ', hi: 'marge groeit niet mee.', post: ' Waar lekt het?' },
]

// Big scattered gallery cards. Positions/rotations from Figma (976:15791),
// as % of the 1280px content width; the section clips their bottoms.
const cards = [
  { src: p1, left: '0%', top: 0, rot: -8, z: 10 },
  { src: p2, left: '20.5%', top: 88, rot: 4, z: 30 },
  { src: p3, left: '45.8%', top: 40, rot: -3, z: 20 },
  { src: p4, left: '65.2%', top: 96, rot: 6, z: 10 },
]

export default function Faq() {
  return (
    <section id="vragen" className="bg-white pt-20 md:pt-30">
      <div className="mx-auto flex max-w-[1408px] flex-col items-center px-6 md:px-16">
        {/* Heading + manifesto question list */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
          className="flex w-full max-w-[1280px] flex-col items-center gap-12"
        >
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
            className="text-center font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink"
          >
            Wij krijgen vaak dezelfde vragen
          </motion.h2>

          <ul className="flex flex-col items-center gap-8 md:gap-9">
            {QUESTIONS.map((q, i) => (
              <motion.li
                key={i}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
                className="max-w-[1000px] text-center font-display text-[clamp(1.25rem,2.6vw,2rem)] font-medium leading-snug tracking-[-0.024em] text-ink"
              >
                {q.pre}
                <span className="font-semibold text-rust">{q.hi}</span>
                {q.post}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Big gallery cards — bottoms clipped by the section overflow */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -5% 0px' }}
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          className="relative mt-16 h-[300px] w-full max-w-[1280px] overflow-hidden md:mt-20 md:h-[360px]"
        >
          {cards.map((c, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 48, rotate: c.rot * 0.4 },
                show: { opacity: 1, y: 0, rotate: c.rot, transition: { duration: 0.8, ease } },
              }}
              className="absolute w-[46%] origin-top sm:w-[32%] md:w-[27%]"
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
