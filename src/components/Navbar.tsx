import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from './Button'
import logo from '../assets/allume-logo.svg'

const NAV_LINKS = [
  { label: 'Onze aanpak', href: '/#aanpak' },
  { label: 'Diensten', href: '/diensten', route: true },
  { label: 'Projecten', href: '/cases', route: true },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // Auto-hide: reveal on scroll up, hide on scroll down (always visible at top).
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      const diff = y - lastY.current
      // Ignore tiny jitter; keep the bar shown near the very top.
      if (Math.abs(diff) > 6) {
        setHidden(diff > 0 && y > 96)
        lastY.current = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // While the mobile menu is open, keep the bar pinned regardless of direction.
  const isHidden = hidden && !open

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: isHidden ? '-100%' : 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 bg-rust transition-shadow duration-300 ${
        scrolled || open ? 'shadow-[0_2px_24px_-10px_rgba(0,0,0,0.5)]' : ''
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-16">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Allume" className="h-[26px] w-auto" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) =>
            link.route ? (
              <Link
                key={link.label}
                to={link.href}
                className="font-display text-base font-medium text-white/90 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="font-display text-base font-medium text-white/90 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ),
          )}
          <Button variant="primary" surface="dark" size="sm" to="/contact" icon arrow="up-right">
            Contacteer ons
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          className="flex size-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-cream transition-transform duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span className={`h-0.5 w-6 bg-cream transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span
            className={`h-0.5 w-6 bg-cream transition-transform duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="flex flex-col gap-4 overflow-hidden px-6 pb-6 pt-2 md:hidden"
        >
          {NAV_LINKS.map((link) =>
            link.route ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-lg font-medium text-white/90"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-lg font-medium text-white/90"
              >
                {link.label}
              </a>
            ),
          )}
          <Button
            variant="primary"
            surface="dark"
            size="sm"
            to="/contact"
            icon
            arrow="up-right"
            onClick={() => setOpen(false)}
          >
            Contacteer ons
          </Button>
        </motion.div>
      )}
    </motion.header>
  )
}
