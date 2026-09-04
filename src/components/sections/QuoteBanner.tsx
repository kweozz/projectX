import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { QuoteMark } from '../icons'
import logo from '../../assets/allume-logo.svg'
import caveGlass from '../../assets/quote/cave-glass.webp'
import caveLight from '../../assets/quote/cave-light.webp'

const ease = [0.22, 1, 0.36, 1] as const

export default function QuoteBanner() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Parallax: the reeded "fractal glass" cave drifts behind the content block.
  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink-900 py-20 md:py-30">
      {/* Background — fractal-glass cave (oversized, parallax) + warm-dark scrim */}
      <motion.img
        src={caveGlass}
        alt=""
        style={{ y: bgY }}
        className="absolute inset-x-0 top-[-12%] h-[124%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-[rgba(33,11,3,0.48)]" />

      <motion.div
        style={{ y: contentY }}
        className="relative mx-auto flex max-w-[1312px] flex-col gap-8 px-6 md:px-16"
      >
        <img src={logo} alt="Allume" className="h-[24px] w-auto" />

        <div className="flex flex-col items-stretch gap-6 md:gap-9 lg:flex-row">
          {/* Foreground — light cave image */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 0.7, ease }}
            className="relative h-[320px] flex-1 overflow-hidden rounded-[10px] md:h-[470px]"
          >
            <img src={caveLight} alt="" className="size-full object-cover" />
          </motion.div>

          {/* Terracotta quote card */}
          <motion.figure
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="relative flex h-[470px] items-center rounded-[10px] bg-rust p-6 md:p-7 lg:w-[347px] lg:shrink-0"
          >
            <blockquote className="font-display text-xl font-medium italic leading-[1.6] text-white md:text-2xl">
              &ldquo;Wij helpen Vlaamse bedrijven hun business- en digitale doelstellingen
              tegen 2032 scherp te stellen en vertalen ze naar een roadmap met werven en
              projecten die hun eigen team kan dragen.&rdquo;
            </blockquote>
            <QuoteMark className="absolute bottom-6 right-6 h-10 w-9 text-white" />
          </motion.figure>
        </div>
      </motion.div>
    </section>
  )
}
