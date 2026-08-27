import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from './icons'
import logo from '../assets/hero/logo.svg'

const NAV_LINKS = [
  { label: 'Onze aanpak', href: '/#aanpak' },
  { label: 'Diensten', href: '/diensten', route: true },
  { label: 'Projecten', href: '/cases', route: true },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-white/10 bg-ink-900/70 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-16">
        <Link to="/" className="flex items-center gap-4">
          <img src={logo} alt="" className="size-[26px]" />
          <span className="font-sans text-2xl text-cream">Lumen</span>
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
          <Link
            to="/contact"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-cream px-5 font-display text-sm font-medium uppercase text-ink transition-transform duration-200 hover:-translate-y-0.5"
          >
            Contacteer ons
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
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
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-full bg-cream px-5 font-display text-sm font-medium uppercase text-ink"
          >
            Contacteer ons
            <ArrowUpRight className="size-4" />
          </Link>
        </motion.div>
      )}
    </motion.header>
  )
}
