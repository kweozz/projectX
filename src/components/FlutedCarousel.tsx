import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from './icons'

type Slide = { src: string; alt?: string }

// Endless carousel that scrolls with the browser's own smooth momentum (never
// touched mid-scroll, so it feels exactly like the homepage gallery). Several
// copies are rendered; the loop is repositioned only once scrolling has settled,
// which is invisible. The slide closest to the centre is always shown clear;
// every other slide keeps the fluted-glass frosting.
const COPIES = 5

export default function FlutedCarousel({ images }: { images: Slide[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const idleRef = useRef(0)
  const n = images.length
  const loop = Array.from({ length: COPIES }).flatMap(() => images)
  const [active, setActive] = useState(-1)

  const oneCopyWidth = () => {
    const track = trackRef.current
    if (!track) return 0
    const first = track.children[0] as HTMLElement
    const gap = parseFloat(getComputedStyle(track).columnGap || '0')
    return (first.offsetWidth + gap) * n
  }

  const updateActive = () => {
    const track = trackRef.current
    if (!track) return
    const tr = track.getBoundingClientRect()
    const centre = tr.left + tr.width / 2
    let best = 0
    let bestDist = Infinity
    Array.from(track.children).forEach((child, i) => {
      const r = (child as HTMLElement).getBoundingClientRect()
      const d = Math.abs(r.left + r.width / 2 - centre)
      if (d < bestDist) {
        bestDist = d
        best = i
      }
    })
    setActive(best)
  }

  // Only runs when scrolling has stopped → invisible, no jank.
  const reposition = () => {
    const track = trackRef.current
    if (!track) return
    const one = oneCopyWidth()
    if (!one) return
    if (track.scrollLeft < one * 1.5) track.scrollLeft += one
    else if (track.scrollLeft > one * 3.5) track.scrollLeft -= one
  }

  const step = (dir: -1 | 1) => {
    const track = trackRef.current
    if (!track) return
    const first = track.children[0] as HTMLElement | undefined
    const gap = parseFloat(getComputedStyle(track).columnGap || '0')
    const amount = (first?.offsetWidth ?? 600) + gap
    // Snap-mandatory fights a smooth programmatic scroll; disable it briefly.
    track.style.scrollSnapType = 'none'
    track.scrollBy({ left: dir * amount, behavior: 'smooth' })
    window.setTimeout(() => {
      track.style.scrollSnapType = ''
    }, 500)
  }

  const onScroll = () => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(updateActive)
    clearTimeout(idleRef.current)
    idleRef.current = window.setTimeout(reposition, 150)
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    // Start in the middle copy so there's room to scroll either way.
    track.scrollLeft = oneCopyWidth() * 2
    updateActive()
    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(idleRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* Reeded-glass refraction filter — displaces the image in fine vertical
          ribs, like looking through fluted glass. Rendered once, referenced by
          the frosted image layer via CSS `filter: url(#reeded-glass)`. */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <filter id="reeded-glass" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.22 0.004"
            numOctaves="1"
            seed="4"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="26"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory items-center gap-6 overflow-x-auto"
      >
        {loop.map((img, i) => {
          const isActive = i === active
          return (
            <div
              key={i}
              className="relative h-[520px] w-[86vw] shrink-0 snap-center overflow-hidden rounded-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:w-[760px]"
              style={{ transform: isActive ? 'scale(1)' : 'scale(0.86)' }}
            >
              {/* Clear base image */}
              <img src={img.src} alt={img.alt ?? ''} className="size-full object-cover" draggable={false} />
              {/* Reeded-glass copy — fades out when this slide becomes active */}
              <img
                src={img.src}
                alt=""
                aria-hidden
                draggable={false}
                className="reeded-layer absolute inset-0 size-full object-cover transition-opacity duration-500 ease-out"
                style={{ opacity: isActive ? 0 : 1 }}
              />
              {/* Glassy vertical highlight sheen on the ribs */}
              <div
                className={`pointer-events-none absolute inset-0 fluted-glass transition-opacity duration-500 ease-out ${
                  isActive ? 'opacity-0' : 'opacity-100'
                }`}
              />
            </div>
          )
        })}
      </div>

      {/* Prev / next controls — bottom-left, aligned with the content gutter */}
      <div className="mx-auto mt-8 flex max-w-[1600px] gap-3 px-6 md:px-16">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Vorige"
          className="flex size-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white"
        >
          <ArrowRight className="size-4 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Volgende"
          className="flex size-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
    </>
  )
}
