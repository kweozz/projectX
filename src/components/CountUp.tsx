import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

type CountUpProps = {
  to: number
  suffix?: string
  duration?: number
  className?: string
}

export default function CountUp({ to, suffix = '', duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setValue(to)
      return
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, duration])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}
