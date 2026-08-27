import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// An image that settles into place as it scrolls in (zoom 1.16 -> 1 + fade) with
// a subtle hover zoom — the covix/avexa "smooth image" feel. Optionally drifts
// with a gentle parallax as it passes the viewport (depth). Parallax lives on an
// outer motion layer and the settle/hover scale on the inner <img>, so the two
// transforms never fight.
export default function RevealImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  objectPosition,
  hover = true,
  parallax = 0,
}: {
  src: string
  alt?: string
  className?: string
  imgClassName?: string
  objectPosition?: string
  hover?: boolean
  /** Drift in % of the tile height as it crosses the viewport (0 = none). */
  parallax?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // The inner layer is slightly oversized so the drift never reveals an edge.
  const bleed = Math.max(parallax + 2, 0)
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={
          parallax
            ? { y, top: `-${bleed}%`, bottom: `-${bleed}%`, height: `${100 + bleed * 2}%` }
            : undefined
        }
      >
        <motion.img
          src={src}
          alt={alt}
          draggable={false}
          style={{ objectPosition }}
          initial={{ scale: 1.16, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          transition={{ duration: 1.1, ease }}
          whileHover={hover ? { scale: 1.05, transition: { duration: 0.6, ease } } : undefined}
          className={`size-full object-cover ${imgClassName}`}
        />
      </motion.div>
    </div>
  )
}
