import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from '../icons'
import logo from '../../assets/hero/logo.svg'
import ctaVideo from '../../assets/cta/cta-bg.mp4'
import ctaPoster from '../../assets/cta/cta-bg.webp'
import linkedin from '../../assets/cta/linkedin.svg'
import twitter from '../../assets/cta/twitter.svg'
import facebook from '../../assets/cta/facebook.svg'

const ease = [0.22, 1, 0.36, 1] as const

const LINK_COLUMNS = [
  {
    title: 'Diensten',
    links: [
      { label: '2032-Scan', href: '/#diensten' },
      { label: 'Roadmap-traject', href: '/#diensten' },
      { label: 'Samenwerking', href: '/#diensten' },
      { label: 'Tarieven', href: '/#diensten' },
    ],
  },
  {
    title: 'Bedrijf',
    links: [
      { label: 'Over ons', href: '/#aanpak' },
      { label: 'Onze aanpak', href: '/#aanpak' },
      { label: 'Cases', href: '/cases' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

const SOCIALS = [
  { icon: linkedin, label: 'LinkedIn' },
  { icon: twitter, label: 'X' },
  { icon: facebook, label: 'Facebook' },
]

export default function Footer() {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Below-the-fold autoplay: browsers pause muted videos that load off-screen
  // and don't resume them. Play whenever the video scrolls into view.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) video.play().catch(() => {})
          else video.pause()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  return (
    <section id="contact">
      {/* CTA */}
      <div className="relative overflow-hidden bg-ink-900">
        <video
          ref={videoRef}
          src={ctaVideo}
          poster={ctaPoster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/20 via-transparent to-ink-900" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 0.8, ease }}
          className="relative z-10 mx-auto flex max-w-[1600px] flex-col items-center gap-6 px-6 pb-24 pt-32 text-center md:px-16 md:pb-32 md:pt-40"
        >
          <h2 className="max-w-[800px] font-display text-[clamp(2.25rem,5.5vw,4rem)] font-semibold leading-[1.15] tracking-[-0.023em] text-white">
            Klaar om uw bedrijf te transformeren?
          </h2>
          <p className="max-w-[620px] font-display text-lg leading-relaxed text-white/90 md:text-xl">
            Een eerste gesprek verplicht tot niets en levert u hoe dan ook een scherper
            beeld op.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-display text-sm font-medium uppercase tracking-tight text-ink transition-transform duration-200 hover:-translate-y-0.5"
            >
              Plan een gesprek
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 font-display text-sm font-medium uppercase tracking-tight text-white"
            >
              <span className="underline decoration-from-font underline-offset-4">
                Of begin met de 2032-zelfscan
              </span>
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-ink-900">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-16 px-6 pb-16 pt-20 md:gap-20 md:px-16 md:pt-30">
          {/* Upper */}
          <div className="flex flex-col justify-between gap-12 md:flex-row md:gap-16">
            {/* Brand */}
            <div className="flex max-w-[340px] flex-col gap-8">
              <div className="flex items-center gap-4">
                <img src={logo} alt="" className="size-[26px]" />
                <span className="font-sans text-2xl text-cream">Lumen</span>
              </div>
              <div className="flex flex-col gap-3 font-display text-sm">
                <p className="leading-relaxed text-[#e2e0db]">
                  Strategisch advies voor Vlaamse kmo&apos;s. Gestuurd door uw cijfers,
                  gedragen door uw team.
                </p>
                <p className="leading-relaxed text-[#a69f9b]">
                  Prins Boudewijnlaan 24E, 2550 Kontich · info@lumen2032.be · +32 (0)9 281 33 00
                </p>
              </div>
            </div>

            {/* Link columns */}
            <div className="flex gap-16 sm:gap-20">
              {LINK_COLUMNS.map((col) => (
                <div key={col.title} className="flex w-[140px] flex-col gap-5">
                  <p className="font-display text-sm font-medium uppercase tracking-[0.07em] text-white">
                    {col.title}
                  </p>
                  <ul className="flex flex-col gap-3 font-display text-sm text-[#e2e0db]">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a href={link.href} className="transition-colors hover:text-white">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-white/10" />

          {/* Lower bar */}
          <div className="flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="font-display text-sm text-[#a69f9b]">
              © 2026 Lumen — Alle rechten voorbehouden.
            </p>
            <div className="flex items-center gap-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                >
                  <img
                    src={social.icon}
                    alt=""
                    className="size-4 brightness-0 invert"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}
