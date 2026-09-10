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

    // `lerp` (frame-based) tracks the wheel directly instead of running a
    // ~1s duration timer per scroll, so it feels snappy up front — no heavy,
    // "log" inertia trailing behind (especially over the pinned hero) — while
    // still keeping the momentum smooth.
    const l = new Lenis({
      lerp: 0.14,
      wheelMultiplier: 1.05,
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
