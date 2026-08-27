import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Signature heading reveal: the text rises up from behind a clip. Reliable by
 * construction — it starts hidden and flips to shown after mount (onMount) or
 * when scrolled into view, so framer always animates a real state *change*
 * (animating on the very first render can silently leave content stuck hidden).
 * Always resolves to fully legible.
 *
 *   <h1 className="...type..."><MaskedText>Title</MaskedText></h1>
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
  /** Reveal right after mount (for above-the-fold headings like the hero). */
  onMount?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  const show = (onMount && mounted) || inView

  return (
    <span ref={ref} className={`block overflow-hidden pb-[0.06em] ${className}`}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: '115%' }}
        animate={{ y: show ? '0%' : '115%' }}
        transition={{ duration: 0.9, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  )
}
