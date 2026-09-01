import Button, { type ButtonVariant, type ButtonSurface } from '../components/Button'

const STATES = [
  { label: 'Default', props: {} },
  { label: 'Hover', props: { force: 'hover' as const } },
  { label: 'Active', props: { force: 'active' as const } },
  { label: 'Focus', props: { force: 'focus' as const } },
  { label: 'Disabled', props: { disabled: true } },
]

const VARIANTS: { v: ButtonVariant; label: string }[] = [
  { v: 'primary', label: 'Primary' },
  { v: 'secondary', label: 'Secondary' },
  { v: 'accent', label: 'Accent' },
  { v: 'danger', label: 'Danger' },
  { v: 'tertiary', label: 'Tertiary' },
]

function labelFor(v: ButtonVariant) {
  return v === 'danger' ? 'Wissen' : v === 'tertiary' ? 'Meer' : 'Actie'
}

function Matrix({ surface }: { surface: ButtonSurface }) {
  const dark = surface === 'dark'
  return (
    <div
      className={`rounded-2xl p-8 md:p-10 ${dark ? 'bg-ink-900' : 'bg-white ring-1 ring-black/10'}`}
    >
      <div className="mb-8 flex items-baseline justify-between">
        <h2
          className={`font-display text-2xl font-semibold tracking-[-0.02em] ${dark ? 'text-white' : 'text-ink'}`}
        >
          Op {dark ? 'donker' : 'licht'}
        </h2>
        <span className={`font-display text-sm ${dark ? 'text-white/50' : 'text-muted'}`}>
          surface="{surface}"
        </span>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[120px_repeat(5,1fr)] items-center gap-4">
        <span />
        {STATES.map((s) => (
          <span
            key={s.label}
            className={`font-display text-xs uppercase tracking-[0.08em] ${dark ? 'text-white/50' : 'text-muted'}`}
          >
            {s.label}
          </span>
        ))}

        {VARIANTS.map(({ v, label }) => (
          <div key={v} className="contents">
            <span
              className={`font-display text-sm font-medium ${dark ? 'text-white/80' : 'text-ink'}`}
            >
              {label}
            </span>
            {STATES.map((s) => (
              <div key={s.label} className="flex items-center">
                <Button variant={v} surface={surface} size="sm" {...s.props}>
                  {labelFor(v)}
                </Button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Ui() {
  return (
    <div className="min-h-screen bg-ink px-6 py-16 md:px-16 md:py-24">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10">
        <header className="flex flex-col gap-3">
          <span className="font-display text-sm uppercase tracking-[0.12em] text-amber">
            Allume · UI
          </span>
          <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold tracking-[-0.02em] text-white">
            Buttons — states & varianten
          </h1>
          <p className="max-w-[640px] font-display text-lg leading-relaxed text-white/70">
            Alle states op basis van het palet, WCAG AA. Hover/actief/focus zijn hier statisch
            geforceerd zodat je ze in één oog ziet — de echte knoppen reageren live (hover met de
            muis, Tab voor focus).
          </p>
        </header>

        <Matrix surface="light" />
        <Matrix surface="dark" />

        {/* Live + extras */}
        <div className="rounded-2xl bg-white p-8 ring-1 ring-black/10 md:p-10">
          <h2 className="mb-6 font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
            Live · maten · loading
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" icon>Plan een gesprek</Button>
            <Button variant="primary" size="sm" icon>Small</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent" icon>Accent</Button>
            <Button variant="danger">Verwijderen</Button>
            <Button variant="primary" loading>Versturen</Button>
            <Button variant="tertiary" icon>Lees meer</Button>
          </div>
          <p className="mt-6 font-display text-sm text-muted">
            Focus-ring: 2px <code>#b46a1a</code> met 2px offset — ≥3:1 op elke achtergrond.
          </p>
        </div>
      </div>
    </div>
  )
}
