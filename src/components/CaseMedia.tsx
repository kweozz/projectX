import { useRef, useState, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight } from './icons'

const ease = [0.22, 1, 0.36, 1] as const

type Props = {
  src: string
  alt: string
  /** Height / extra utility classes for the <img> (e.g. "h-[380px] lg:h-[508px]"). */
  className?: string
  objectPosition?: string
  /** Show the cursor-following "View case" badge on hover. */
  interactive?: boolean
  label?: string
}

/**
 * Image tile with a DAS-Studio-style hover: the picture zooms a touch, a soft
 * overlay darkens it, and a circular "View case" badge follows the cursor.
 * Pointer-events stay off the badge so a wrapping <Link> still receives clicks.
 */
export default function CaseMedia({
  src,
  alt,
  className = '',
  objectPosition,
  interactive = true,
  label = 'Bekijk project',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState(false)

  // Cursor-following badge position.
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.6 })

  const track = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    x.set(e.clientX - r.left)
    y.set(e.clientY - r.top)
  }

  return (
    <div
      ref={ref}
      onMouseEnter={
        interactive
          ? (e) => {
              track(e)
              setHover(true)
            }
          : undefined
      }
      onMouseMove={interactive ? track : undefined}
      onMouseLeave={interactive ? () => setHover(false) : undefined}
      className="relative overflow-hidden rounded-[10px] bg-card"
    >
      <img
        src={src}
        alt={alt}
        style={{ objectPosition }}
        className={`w-full object-cover transition-transform duration-[900ms] ease-out ${
          hover ? 'scale-[1.05]' : 'scale-100'
        } ${className}`}
      />

      {interactive && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-ink"
            animate={{ opacity: hover ? 0.12 : 0 }}
            transition={{ duration: 0.4, ease }}
          />
          <motion.div
            aria-hidden
            style={{ x: sx, y: sy }}
            className="pointer-events-none absolute left-0 top-0 z-10"
          >
            <motion.div
              className="flex size-[116px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full bg-cream px-3 text-center text-ink shadow-[0_10px_30px_rgba(21,5,0,0.18)]"
              animate={{ scale: hover ? 1 : 0.4, opacity: hover ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            >
              <span className="font-display text-sm font-medium uppercase leading-tight tracking-tight">
                {label}
              </span>
              <ArrowUpRight className="size-4" />
            </motion.div>
          </motion.div>
        </>
      )}
    </div>
  )
}
