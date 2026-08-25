import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/sections/Footer'
import { ArrowRight } from '../components/icons'
import heroBg from '../assets/hero/hero-bg.mp4'
import heroPoster from '../assets/hero/hero-bg.webp'

const ease = [0.22, 1, 0.36, 1] as const

const DETAILS = [
  { label: 'E-mail', value: 'info@lumen2032.be', href: 'mailto:info@lumen2032.be' },
  { label: 'Telefoon', value: '+32 (0)9 281 33 00', href: 'tel:+3292813300' },
  { label: 'Kantoor', value: 'Prins Boudewijnlaan 24E, 2550 Kontich', href: null },
]

const REASONS = ['2032-Scan', 'Roadmap-traject', 'Samenwerking', 'Iets anders']

export default function Contact() {
  const [form, setForm] = useState({
    naam: '',
    email: '',
    bedrijf: '',
    reden: REASONS[0],
    bericht: '',
  })

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const body = [
      `Naam: ${form.naam}`,
      `Bedrijf: ${form.bedrijf}`,
      `Onderwerp: ${form.reden}`,
      '',
      form.bericht,
    ].join('\n')
    window.location.href = `mailto:info@lumen2032.be?subject=${encodeURIComponent(
      `Aanvraag ${form.reden} — ${form.naam}`,
    )}&body=${encodeURIComponent(body)}`
  }

  const field =
    'w-full rounded-lg border border-[#78716c]/40 bg-white px-4 py-3 font-display text-base text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-ink'

  return (
    <div className="bg-ink-900">
      <Navbar />

      {/* Hero (dark, amber video bg) — same layout as the projects overview */}
      <header className="relative flex min-h-[62vh] items-end overflow-hidden bg-ink-900">
        <video
          src={heroBg}
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-ink/85 via-ink/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-16 pt-40 md:px-16 md:pb-24">
          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease }}
            className="max-w-[18ch] font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white"
          >
            Laten we uw 2032 scherpstellen.
          </motion.h1>
          <motion.p
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-6 max-w-[620px] font-display text-lg leading-relaxed text-white/80 md:text-2xl"
          >
            Een eerste gesprek verplicht tot niets en levert u hoe dan ook een scherper
            beeld op. Laat iets achter — we reageren binnen één werkdag.
          </motion.p>
        </div>
      </header>

      {/* Details + form (light) */}
      <section className="bg-white py-20 md:py-30">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 md:px-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          {/* Details */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 0.7, ease }}
            className="flex flex-col gap-10"
          >
            {DETAILS.map((d) => (
              <div key={d.label} className="flex flex-col gap-1.5 border-t border-[rgba(90,98,113,0.2)] pt-5">
                <span className="font-display text-sm uppercase tracking-[0.08em] text-muted">
                  {d.label}
                </span>
                {d.href ? (
                  <a
                    href={d.href}
                    className="font-display text-xl font-medium text-ink transition-colors hover:text-amber"
                  >
                    {d.value}
                  </a>
                ) : (
                  <span className="font-display text-xl font-medium text-ink">{d.value}</span>
                )}
              </div>
            ))}
            <p className="max-w-[360px] font-display text-base leading-relaxed text-muted">
              Liever meteen aan de slag? Start met de 2032-Scan en krijg een becijferd
              beeld van waar uw bedrijf vandaag staat.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="font-display text-sm font-medium text-ink">Naam</span>
                <input required value={form.naam} onChange={set('naam')} className={field} placeholder="Uw naam" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-display text-sm font-medium text-ink">E-mail</span>
                <input required type="email" value={form.email} onChange={set('email')} className={field} placeholder="naam@bedrijf.be" />
              </label>
            </div>
            <label className="flex flex-col gap-2">
              <span className="font-display text-sm font-medium text-ink">Bedrijf</span>
              <input value={form.bedrijf} onChange={set('bedrijf')} className={field} placeholder="Uw bedrijf" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-display text-sm font-medium text-ink">Waarover gaat het?</span>
              <select value={form.reden} onChange={set('reden')} className={field}>
                {REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-display text-sm font-medium text-ink">Bericht</span>
              <textarea
                required
                value={form.bericht}
                onChange={set('bericht')}
                rows={5}
                className={`${field} resize-none`}
                placeholder="Vertel kort waar u mee zit."
              />
            </label>
            <button
              type="submit"
              className="group inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-cta px-7 font-display text-base font-medium uppercase text-cream transition-transform duration-200 hover:-translate-y-0.5"
            >
              Verstuur bericht
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
