import { useEffect } from 'react'
import Lenis from 'lenis'

// One shared Lenis instance so route changes / anchor jumps can drive it.
let lenis: Lenis | null = null
export function getLenis() {
  return lenis
}

/**
 * Buttery, weighted smooth scrolling (Lenis). The single biggest "premium
 * feel" upgrade — invisible, no legibility impact. Disabled under
 * prefers-reduced-motion.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const l = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    lenis = l

    let raf = 0
    const loop = (time: number) => {
      l.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      l.destroy()
      lenis = null
    }
  }, [])
}
