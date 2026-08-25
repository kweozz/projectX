import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'

const GREY = '#a8a29e' // starts muted
const INK = '#210b03' // fills in to the brand ink

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const color = useTransform(progress, range, [GREY, INK])
  return (
    <motion.span style={{ color }} className="inline">
      {children}{' '}
    </motion.span>
  )
}

/**
 * Scroll-linked text reveal: the words start grey and get "inked" in as the
 * paragraph scrolls up through the viewport (typical Framer effect).
 */
export default function ScrollRevealText({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.55'],
  })

  const words = text.split(' ')

  if (reduce) {
    return (
      <p ref={ref} className={className} style={{ color: INK }}>
        {text}
      </p>
    )
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </p>
  )
}
