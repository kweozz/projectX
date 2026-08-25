import { motion } from 'framer-motion'
import { QuoteMark } from '../icons'
import quoteBg from '../../assets/quote/quote-bg.webp'

export default function QuoteBanner() {
  return (
    <section className="bg-ink">
      <div className="relative flex min-h-[480px] items-center overflow-hidden md:min-h-[612px]">
        {/* Background image + overlay */}
        <img src={quoteBg} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-black/35" />

        {/* Quote */}
        <div className="relative mx-auto flex w-full max-w-[1243px] items-start gap-6 px-6 py-20 md:gap-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <QuoteMark className="mt-2 h-8 w-7 shrink-0 text-white md:h-10 md:w-9" />
          </motion.div>
          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(1.5rem,3.4vw,3rem)] font-medium leading-[1.38] tracking-[-0.03em] text-white"
          >
            Wij helpen Vlaamse bedrijven hun business- en digitale doelstellingen tegen
            2032 scherp te stellen — en vertalen ze naar een roadmap met werven en
            projecten die hun eigen team kan dragen.
          </motion.blockquote>
        </div>
      </div>
    </section>
  )
}
