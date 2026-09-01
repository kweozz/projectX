import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from '../icons'
import Button from '../Button'
import faqImage from '../../assets/faq/faq.webp'

type QA = { question: string; answer: string }

// NOTE: the Figma design supplies the questions but no answer copy.
// The answers below are concise placeholders — replace with real copy.
const ITEMS: QA[] = [
  {
    question: 'Mijn concurrent lijkt digitaal voorop. Maakt dat echt iets uit?',
    answer:
      'Voorsprong zit zelden in de tools zelf, maar in hoe consequent ze gebruikt worden. We brengen in kaart waar het verschil écht gemaakt wordt — en of dat voor u het inhalen waard is.',
  },
  {
    question: 'Iedereen praat over AI. Wat betekent het voor mijn zaak?',
    answer:
      'AI is pas waardevol als het een concreet proces sneller, goedkoper of beter maakt. We vertrekken vanuit uw grootste knelpunten, niet vanuit de hype.',
  },
  {
    question: 'Waar investeer ik eerst: mensen, systemen of verkoop?',
    answer:
      'Dat hangt af van waar de grootste rem op groei zit. Een korte diagnose maakt duidelijk welke euro vandaag het meeste opbrengt.',
  },
  {
    question: 'We groeien, maar de marge groeit niet mee. Waar lekt het?',
    answer:
      'Margeverlies zit vaak verstopt in processen, prijszetting of overhead die meegroeide zonder herziening. We leggen de lekken bloot en prioriteren de fixes.',
  },
  {
    question: 'Mijn ERP is tien jaar oud. Vervangen, of verder bouwen?',
    answer:
      'Niet elke verouderde ERP moet vervangen worden. We wegen de kost van vervangen af tegen gericht bijbouwen, op basis van uw roadmap.',
  },
  {
    question: 'De volgende generatie staat klaar. Is het bedrijf dat ook?',
    answer:
      'Een vlotte overdracht vraagt meer dan een opvolger: structuur, systemen en beslissingen die niet van één persoon afhangen. We maken het bedrijf overdraagbaar.',
  },
]

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: QA
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-[rgba(90,98,113,0.2)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-8 text-left"
      >
        <span
          className={`font-display text-xl tracking-[-0.02em] transition-colors duration-300 ${
            isOpen ? 'text-ink' : 'text-muted'
          }`}
        >
          {item.question}
        </span>
        <ChevronDown
          className={`size-6 shrink-0 text-ink transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-[560px] pb-8 font-display text-base leading-relaxed text-muted">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="vragen" className="bg-white py-20 md:py-30">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 md:grid-cols-2 md:gap-[120px] md:px-16">
        {/* Left column */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-10 md:gap-16"
        >
          <h2 className="max-w-[700px] font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink">
            Wij krijgen vaak dezelfde vragen
          </h2>

          <Button variant="primary" surface="light" to="/contact" icon arrow="up-right" className="w-fit">
            Plan een gesprek
          </Button>

          <div className="group relative mt-auto overflow-hidden rounded-[10px]">
            <img
              src={faqImage}
              alt=""
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        </motion.div>

        {/* Right column — accordion */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center"
        >
          {ITEMS.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
