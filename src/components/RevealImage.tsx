import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

type SlideFrom = 'left' | 'right' | 'up' | 'down'
const SLIDE: Record<SlideFrom, { x: number; y: number }> = {
  left: { x: -64, y: 0 },
  right: { x: 64, y: 0 },
  up: { x: 0, y: 64 },
  down: { x: 0, y: -64 },
}

// Image reveal with a few entrance modes and an optional scroll parallax.
//  - default: settles in (zoom 1.16 -> 1 + fade)
//  - slideFrom: the whole frame slides in cleanly from a side + fade
//  - clip: the frame wipes open (top -> bottom)
// Parallax drift lives on an inner layer; the entrance on the outer frame — so
// the transforms never fight. Keeps a subtle hover zoom.
export default function RevealImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  objectPosition,
  hover = true,
  parallax = 0,
  clip = false,
  slideFrom,
}: {
  src: string
  alt?: string
  className?: string
  imgClassName?: string
  objectPosition?: string
  hover?: boolean
  parallax?: number
  clip?: boolean
  slideFrom?: SlideFrom
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bleed = Math.max(parallax + 2, 0)
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`])

  const viewport = { once: true, margin: '0px 0px -12% 0px' } as const
  let wrapProps = {}
  if (slideFrom) {
    wrapProps = {
      initial: { opacity: 0, ...SLIDE[slideFrom] },
      whileInView: { opacity: 1, x: 0, y: 0 },
      viewport,
      transition: { duration: 0.9, ease },
    }
  } else if (clip) {
    wrapProps = {
      initial: { clipPath: 'inset(0 0 100% 0)' },
      whileInView: { clipPath: 'inset(0 0 0% 0)' },
      viewport,
      transition: { duration: 0.95, ease },
    }
  }
  const settle = !slideFrom && !clip

  return (
    <motion.div ref={ref} className={`relative overflow-hidden ${className}`} {...wrapProps}>
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
          initial={settle ? { scale: 1.16, opacity: 0 } : false}
          whileInView={settle ? { scale: 1, opacity: 1 } : undefined}
          viewport={settle ? viewport : undefined}
          transition={settle ? { duration: 1.1, ease } : undefined}
          whileHover={hover ? { scale: 1.05, transition: { duration: 0.6, ease } } : undefined}
          className={`size-full object-cover ${imgClassName}`}
        />
      </motion.div>
    </motion.div>
  )
}
