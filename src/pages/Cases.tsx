import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/sections/Footer'
import { ArrowRight } from '../components/icons'
import CaseMedia from '../components/CaseMedia'
import heroBg from '../assets/hero/hero-bg.mp4'
import heroPoster from '../assets/hero/hero-bg.webp'
import argenta from '../assets/projects/argenta.webp'
import corridor from '../assets/cases/corridor.webp'
import whiteboard from '../assets/cases/whiteboard.webp'
import teamWalk from '../assets/cases/team-walk.webp'
import besix from '../assets/cases/besix.webp'

const ease = [0.22, 1, 0.36, 1] as const

const FILTERS = ['Alles', 'Roadmap-traject', '2032-Scan', 'Maakindustrie', 'Bouw & Logistiek']

type Case = {
  name: string
  image: string
  objectPosition?: string
  tags: string[]
  to: string
}

// Images match the Figma "Cases Grid Section". Names/tags are placeholder — swap
// in real project names when available. Only ARGENTA has a detail page for now.
const CASES: Case[] = [
  { name: 'BEDRIJF X', image: corridor, tags: ['2032-Scan', 'Maakindustrie'], to: '/case/argenta' },
  { name: 'ARGENTA', image: argenta, objectPosition: '70% 50%', tags: ['Roadmap-traject', 'Banking'], to: '/case/argenta' },
  { name: 'BEDRIJF X', image: whiteboard, tags: ['2032-Scan', 'Maakindustrie'], to: '/case/argenta' },
  { name: 'BEDRIJF X', image: teamWalk, objectPosition: '50% 28%', tags: ['Roadmap-traject', 'Bouw & Logistiek'], to: '/case/argenta' },
  { name: 'BEDRIJF X', image: besix, objectPosition: '50% 40%', tags: ['2032-Scan', 'Maakindustrie'], to: '/case/argenta' },
]

function CaseCard({ c, featured = false }: { c: Case; featured?: boolean }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.5, ease }}
    >
      <Link to={c.to} className="group flex flex-col gap-8">
        <CaseMedia
          src={c.image}
          alt={c.name}
          objectPosition={c.objectPosition}
          className={featured ? 'h-[320px] md:h-[560px]' : 'h-[300px] lg:h-[440px]'}
        />
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl font-medium tracking-[-0.03em] text-ink">
              {c.name}
            </h3>
            <div className="flex flex-wrap items-center justify-end gap-3">
              {c.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink/80 px-3.5 py-1.5 font-display text-sm font-medium uppercase tracking-tight text-ink"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="h-px w-full bg-[rgba(90,98,113,0.2)]" />
        </div>
      </Link>
    </motion.div>
  )
}

export default function Cases() {
  const [active, setActive] = useState('Alles')
  const filtered = CASES.filter((c) => active === 'Alles' || c.tags.includes(active))
  const [featured, ...rest] = filtered

  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero (dark, amber video bg) */}
      <header className="relative flex min-h-[62vh] items-end overflow-hidden bg-ink-900">
        <video
          src={heroBg}
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-ink/85 via-ink/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-16 pt-40 md:px-16 md:pb-24">
          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease }}
            className="max-w-[16ch] font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white"
          >
            Projecten die ertoe doen
          </motion.h1>
          <motion.p
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-6 max-w-[720px] font-display text-lg leading-relaxed text-white/80 md:text-2xl"
          >
            Strategisch advies vertaald naar meetbaar resultaat. Ontdek hoe we Vlaamse
            kmo&apos;s begeleiden in hun roadmap naar 2032.
          </motion.p>
        </div>
      </header>

      {/* Filter + grid (light) */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-16 px-6 md:px-16">
          {/* Filter bar */}
          <div className="flex flex-col gap-6">
            <p className="font-display text-2xl font-semibold text-ink">Filter op</p>
            <div className="flex flex-wrap gap-3">
              {FILTERS.map((f) => {
                const on = active === f
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setActive(f)}
                    className={`rounded-full px-5 py-2 font-display text-sm font-medium uppercase tracking-tight transition-colors ${
                      on
                        ? 'bg-ink-900 text-white'
                        : 'border border-[#78716c] text-ink hover:border-ink'
                    }`}
                  >
                    {f}
                  </button>
                )
              })}
            </div>
            <div className="h-px w-full bg-[rgba(90,98,113,0.2)]" />
          </div>

          {/* Cases */}
          {filtered.length === 0 ? (
            <p className="font-display text-lg text-muted">Geen projecten in deze categorie.</p>
          ) : (
            <motion.div layout className="flex flex-col gap-16">
              <AnimatePresence mode="popLayout">
                {featured && (
                  <div key={`f-${featured.name}-${active}`}>
                    <CaseCard c={featured} featured />
                    <div className="mt-6 flex items-center">
                      <Link
                        to={featured.to}
                        className="group inline-flex items-center gap-2 border-b border-ink pb-1 font-display text-base font-medium uppercase tracking-tight text-ink"
                      >
                        Bekijk project
                        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                )}
                {rest.length > 0 && (
                  <div
                    key={`grid-${active}`}
                    className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2"
                  >
                    {rest.map((c, i) => (
                      <CaseCard key={`${c.name}-${i}`} c={c} />
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
