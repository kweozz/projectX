import { motion } from 'framer-motion'
import { ArrowUpRight } from '../icons'
import argenta from '../../assets/projects/argenta.webp'
import bedrijfX from '../../assets/projects/bedrijf-x.webp'
import plaza from '../../assets/projects/plaza.webp'

type Project = {
  name: string
  image: string
  objectPosition?: string
  tags: string[]
}

const PROJECTS: Project[] = [
  { name: 'ARGENTA', image: argenta, objectPosition: '70% 50%', tags: ['Roadmap-traject'] },
  { name: 'BEDRIJF X', image: bedrijfX, tags: ['2032 scan', 'Maak industrie'] },
  { name: 'BEDRIJF X', image: plaza, tags: ['2032 scan', 'Maak industrie'] },
]

const ease = [0.22, 1, 0.36, 1] as const

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.a
      href="#projecten"
      variants={{
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
      }}
      className="group flex w-[85vw] shrink-0 snap-start flex-col gap-8 sm:w-[560px] lg:w-[644px]"
    >
      <div className="overflow-hidden rounded-[10px] bg-[#f5f5f4]">
        <img
          src={project.image}
          alt={project.name}
          style={{ objectPosition: project.objectPosition }}
          className="h-[380px] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105 lg:h-[508px]"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl font-medium tracking-[-0.03em] text-white">
            {project.name}
          </h3>
          <div className="flex flex-wrap items-center justify-end gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/90 px-3.5 py-1.5 font-display text-sm font-medium uppercase tracking-tight text-white backdrop-blur-[2.5px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="h-px w-full bg-[rgba(90,98,113,0.35)]" />
      </div>
    </motion.a>
  )
}

export default function Projects() {
  // Left inset that lines up with the centered max-w-[1600px] content column.
  const gutterLeft =
    'max(var(--page-gutter), calc((100vw - 1600px) / 2 + var(--page-gutter)))'

  return (
    <section id="projecten" className="bg-ink-900 py-20 md:py-30">
      {/* Header — capped/centered like every other section */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-16">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.018em] text-white">
            Projecten
          </h2>
          <a
            href="#projecten"
            className="group inline-flex items-center gap-2 rounded-full border border-[#78716c] px-6 py-4 font-display text-base font-medium uppercase tracking-tight text-white transition-colors duration-200 hover:border-white"
          >
            <span className="underline decoration-from-font underline-offset-4">
              Al onze projecten bekijken
            </span>
            <ArrowUpRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>

      {/* Horizontal gallery — full-bleed: left aligns with header, runs off the right edge */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -20% 0px' }}
        transition={{ staggerChildren: 0.12 }}
        style={{
          paddingLeft: gutterLeft,
          paddingRight: 'var(--page-gutter)',
          scrollPaddingLeft: gutterLeft,
        }}
        className="no-scrollbar mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto"
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </motion.div>
    </section>
  )
}
