import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from '../Button'
import FractalGlass from '../FractalGlass'
import logo from '../../assets/allume-logo.svg'
import ctaPoster from '../../assets/cta/cta-bg.webp'
import linkedin from '../../assets/cta/linkedin.svg'
import twitter from '../../assets/cta/twitter.svg'
import facebook from '../../assets/cta/facebook.svg'

const ease = [0.22, 1, 0.36, 1] as const

const LINK_COLUMNS = [
  {
    title: 'Diensten',
    links: [
      { label: '2032-Scan', href: '/diensten' },
      { label: 'Roadmap-traject', href: '/diensten' },
      { label: 'Samenwerking', href: '/diensten' },
      { label: 'Tarieven', href: '/diensten' },
    ],
  },
  {
    title: 'Bedrijf',
    links: [
      { label: 'Over ons', href: '/#aanpak' },
      { label: 'Onze aanpak', href: '/#aanpak' },
      { label: 'Projecten', href: '/cases' },
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
  const ctaRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ['start end', 'end start'],
  })
  // The content block drifts over the continuing shader field (block in block).
  const contentY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])

  return (
    <section id="contact">
      {/* CTA — same shader, held dark across the whole frame (warm tint, WCAG
          4.5:1) so the centred type stays crisp and it flows into the ink-900
          section above and the footer below. */}
      <div ref={ctaRef} className="relative overflow-hidden bg-ink-900">
        <FractalGlass
          className="absolute inset-0 size-full"
          poster={ctaPoster}
          palette="golden hour"
          loopSeconds={14}
          fluteWidth={34}
          fluteStrength={260}
          fluteShine={30}
          exposure={1.4}
          warpStrength={0.09}
          noiseTravel={0.2}
          safeZone="whole frame"
          safeStyle="warm tint"
          safeContrast="4.5:1"
          safeDarkness={0.5}
          safeRichness={0.4}
        />
        {/* Melt into the footer below (top stays open to the gradient). */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-900 to-transparent" />

        <motion.div style={{ y: contentY }} className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto flex max-w-[1600px] flex-col items-center gap-6 px-6 pb-24 pt-32 text-center md:px-16 md:pb-32 md:pt-40"
        >
          <h2 className="max-w-[800px] font-display text-[clamp(2.25rem,5.5vw,4rem)] font-semibold leading-[1.15] tracking-[-0.023em] text-white">
            Klaar om uw bedrijf te transformeren?
          </h2>
          <p className="max-w-[620px] font-display text-lg leading-relaxed text-white/90 md:text-xl">
            Een eerste gesprek verplicht tot niets en levert u hoe dan ook een scherper
            beeld op.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
            <Button variant="primary" surface="dark" size="sm" to="/contact" icon>
              Plan een gesprek
            </Button>
            <Button variant="tertiary" surface="dark" size="sm" to="/contact" icon>
              Of begin met de 2032-zelfscan
            </Button>
          </div>
        </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-ink-900">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-16 px-6 pb-16 pt-20 md:gap-20 md:px-16 md:pt-30">
          {/* Upper */}
          <div className="flex flex-col justify-between gap-12 md:flex-row md:gap-16">
            {/* Brand */}
            <div className="flex max-w-[340px] flex-col gap-8">
              <img src={logo} alt="Allume" className="h-[28px] w-auto self-start" />
              <div className="flex flex-col gap-3 font-display text-sm">
                <p className="leading-relaxed text-[#e2e0db]">
                  Strategisch advies voor Vlaamse kmo&apos;s. Gestuurd door uw cijfers,
                  gedragen door uw team.
                </p>
                <p className="leading-relaxed text-[#a69f9b]">
                  Prins Boudewijnlaan 24E, 2550 Kontich · info@allume2032.be · +32 (0)9 281 33 00
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
              © 2026 Allume — Alle rechten voorbehouden.
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
