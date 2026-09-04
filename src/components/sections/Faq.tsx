import { motion } from 'framer-motion'
import p1 from '../../assets/cases/besix.webp'
import p2 from '../../assets/case/carousel-2-boardroom.webp'
import p3 from '../../assets/process/sunset.webp'
import p4 from '../../assets/case/carousel-1-workshop.webp'

const ease = [0.22, 1, 0.36, 1] as const

// Each question is a statement with one highlighted key phrase (rust accent).
// pre / hi / post split so the highlight stays part of the sentence flow.
type Q = { pre: string; hi: string; post: string }
const QUESTIONS: Q[] = [
  { pre: 'Mijn ', hi: 'concurrent lijkt digitaal voorop', post: '. Maakt dat echt iets uit?' },
  { pre: 'Iedereen praat over ', hi: 'AI.', post: ' Wat betekent het voor mijn zaak?' },
  { pre: '', hi: 'Waar investeer ik', post: ' eerst: mensen, systemen of verkoop?' },
  { pre: 'De ', hi: 'volgende generatie staat klaar', post: '. Is het bedrijf dat ook?' },
  { pre: '', hi: 'Mijn ERP is tien jaar', post: ' oud. Vervangen, of verder bouwen?' },
  { pre: 'We groeien, maar de ', hi: 'marge groeit niet mee.', post: ' Waar lekt het?' },
]

// Scattered polaroid collage — positions as % of a 1160×360 band (from Figma feel).
const collage = [
  { src: p1, left: '8%', top: '6%', w: '20%', rot: -7, z: 10 },
  { src: p2, left: '27%', top: '26%', w: '21%', rot: 5, z: 30 },
  { src: p3, left: '49%', top: '2%', w: '19%', rot: -4, z: 20 },
  { src: p4, left: '67%', top: '24%', w: '22%', rot: 6, z: 10 },
]

export default function Faq() {
  return (
    <section id="vragen" className="overflow-hidden bg-white py-20 md:py-30">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-6 md:px-16">
        <motion.h2
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ duration: 0.7, ease }}
          className="text-center font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.03em] text-ink"
        >
          Wij krijgen vaak dezelfde vragen
        </motion.h2>

        {/* Manifesto list */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ staggerChildren: 0.08, delayChildren: 0.15 }}
          className="mt-14 flex flex-col items-center gap-6 md:mt-16 md:gap-7"
        >
          {QUESTIONS.map((q, i) => (
            <motion.li
              key={i}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
              className="max-w-[820px] text-center font-display text-[clamp(1.25rem,2.6vw,1.75rem)] font-medium leading-snug tracking-[-0.02em] text-ink"
            >
              {q.pre}
              <span className="text-rust">{q.hi}</span>
              {q.post}
            </motion.li>
          ))}
        </motion.ul>

        {/* Scattered polaroid collage */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          className="relative mt-16 aspect-[1160/360] w-full max-w-[1160px] md:mt-20"
        >
          {collage.map((img, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40, rotate: img.rot * 0.3 },
                show: {
                  opacity: 1,
                  y: 0,
                  rotate: img.rot,
                  transition: { duration: 0.8, ease },
                },
              }}
              className="absolute origin-center"
              style={{ left: img.left, top: img.top, width: img.w, zIndex: img.z }}
            >
              <img
                src={img.src}
                alt=""
                className="aspect-[4/5] w-full rounded-[10px] border-[6px] border-white object-cover shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)]"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
