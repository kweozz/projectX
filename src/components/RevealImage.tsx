import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// An image that settles into place as it scrolls in: it starts slightly
// zoomed and fades up to a clean rest state (the covix/avexa "smooth image"
// feel). The wrapper clips, so the settle reads as the image easing open.
// Keeps a subtle hover zoom for interactive tiles.
export default function RevealImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  objectPosition,
  hover = true,
}: {
  src: string
  alt?: string
  className?: string
  imgClassName?: string
  objectPosition?: string
  hover?: boolean
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
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
    </div>
  )
}
