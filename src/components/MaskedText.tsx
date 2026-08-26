import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Signature heading reveal: the text rises up from behind a clip when it
 * enters view — subtle, once, always resolves to fully legible. Use inside a
 * heading element so it inherits the type styles:
 *   <h1 className="...type..."><MaskedText>Title</MaskedText></h1>
 *
 * We observe the (untransformed) outer span with useInView and drive the inner
 * span's transform — more reliable than whileInView on the moving element.
 */
export default function MaskedText({
  children,
  delay = 0,
  className = '',
  onMount = false,
}: {
  children: ReactNode
  delay?: number
  className?: string
  /** Reveal immediately on mount (for above-the-fold headings like the hero). */
  onMount?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })
  const show = onMount || inView

  return (
    <span ref={ref} className={`block overflow-hidden pb-[0.06em] ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '115%' }}
        animate={{ y: show ? '0%' : '115%' }}
        transition={{ duration: 0.9, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  )
}
