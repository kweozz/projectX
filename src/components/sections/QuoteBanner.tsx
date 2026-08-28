import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { QuoteMark } from '../icons'
import quoteBg from '../../assets/quote/quote-bg.webp'

const ease = [0.22, 1, 0.36, 1] as const

export default function QuoteBanner() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Nested parallax: the background keeps travelling behind the quote block,
  // and the block itself drifts at a different rate over it — depth, "block in
  // block". The bg layer is oversized so it never reveals an edge.
  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const quoteY = useTransform(scrollYProgress, [0, 1], ['11%', '-11%'])

  return (
    <section className="bg-ink">
      <div
        ref={ref}
        className="relative flex min-h-[560px] items-center overflow-hidden md:min-h-[720px]"
      >
        {/* Continuing background (parallax) — oversized so the stronger drift
            never reveals an edge */}
        <motion.img
          src={quoteBg}
          alt=""
          style={{ y: bgY }}
          className="absolute inset-x-0 top-[-20%] h-[140%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />

        {/* Quote block — drifts over the background at its own rate */}
        <motion.div
          style={{ y: quoteY }}
          className="relative mx-auto flex w-full max-w-[1243px] items-start gap-6 px-6 py-20 md:gap-8 md:px-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 0.6, ease }}
          >
            <QuoteMark className="mt-2 h-8 w-7 shrink-0 text-white md:h-10 md:w-9" />
          </motion.div>
          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="font-display text-[clamp(1.5rem,3.4vw,3rem)] font-medium leading-[1.38] tracking-[-0.03em] text-white"
          >
            Wij helpen Vlaamse bedrijven hun business- en digitale doelstellingen tegen
            2032 scherp te stellen — en vertalen ze naar een roadmap met werven en
            projecten die hun eigen team kan dragen.
          </motion.blockquote>
        </motion.div>
      </div>
    </section>
  )
}
