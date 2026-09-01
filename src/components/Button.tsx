import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from './icons'

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'danger' | 'tertiary'
export type ButtonSurface = 'light' | 'dark'
export type ButtonSize = 'sm' | 'md'
type ForceState = 'hover' | 'active' | 'focus' | 'disabled'

// Per variant/surface colour set. Keys map to the CSS vars the .btn class reads.
// All text↔fill pairs verified WCAG AA (see /ui). Focus ring #b46a1a ≥ 3:1.
const TOKENS: Record<string, Record<string, string>> = {
  'primary-light': { '--btn-bg': '#292524', '--btn-fg': '#fbfaf8', '--btn-bg-h': '#3a322c', '--btn-bg-a': '#1b1611', '--btn-bg-d': '#e7e1da', '--btn-fg-d': '#a69f9b' },
  'primary-dark': { '--btn-bg': '#fbfaf8', '--btn-fg': '#150500', '--btn-bg-h': '#ece5dc', '--btn-bg-a': '#ddd4c8', '--btn-bg-d': 'rgba(255,255,255,0.16)', '--btn-fg-d': 'rgba(255,255,255,0.40)' },
  'secondary-light': { '--btn-bg': 'transparent', '--btn-fg': '#150500', '--btn-bd': '#78716c', '--btn-bd-h': '#150500', '--btn-bg-h': '#f4efe8', '--btn-bg-a': '#ece5db', '--btn-bg-d': 'transparent', '--btn-fg-d': '#a69f9b', '--btn-bd-d': '#e0dad2' },
  'secondary-dark': { '--btn-bg': 'transparent', '--btn-fg': '#fbfaf8', '--btn-bd': 'rgba(255,255,255,0.5)', '--btn-bd-h': '#ffffff', '--btn-bg-h': 'rgba(255,255,255,0.06)', '--btn-bg-a': 'rgba(255,255,255,0.10)', '--btn-bg-d': 'transparent', '--btn-fg-d': 'rgba(255,255,255,0.40)', '--btn-bd-d': 'rgba(255,255,255,0.18)' },
  accent: { '--btn-bg': '#e08a2b', '--btn-fg': '#150500', '--btn-bg-h': '#c9791f', '--btn-bg-a': '#ad6716', '--btn-bg-d': '#e7e1da', '--btn-fg-d': '#a69f9b' },
  danger: { '--btn-bg': '#68230e', '--btn-fg': '#fbfaf8', '--btn-bg-h': '#7d2c12', '--btn-bg-a': '#4e1908', '--btn-bg-d': '#e7e1da', '--btn-fg-d': '#a69f9b' },
  'tertiary-light': { '--btn-bg': '#150500', '--btn-fg': '#150500', '--btn-bg-h': '#68230e', '--btn-fg-d': '#a69f9b' },
  'tertiary-dark': { '--btn-bg': '#fbfaf8', '--btn-fg': '#fbfaf8', '--btn-bg-h': '#f3cf6a', '--btn-fg-d': 'rgba(255,255,255,0.40)' },
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-11 px-5 text-sm',
  md: 'h-12 px-7 text-sm md:text-base',
}

function Spinner() {
  return (
    <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export interface ButtonProps {
  variant?: ButtonVariant
  surface?: ButtonSurface
  size?: ButtonSize
  icon?: boolean
  arrow?: 'right' | 'up-right'
  loading?: boolean
  disabled?: boolean
  /** Render as a router link / anchor instead of a <button>. */
  to?: string
  href?: string
  onClick?: MouseEventHandler
  type?: 'button' | 'submit'
  'aria-label'?: string
  /** Docs only: force a visual state on /ui. */
  force?: ForceState
  className?: string
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  surface = 'light',
  size = 'md',
  icon = false,
  arrow = 'right',
  loading = false,
  disabled = false,
  to,
  href,
  onClick,
  type = 'button',
  force,
  className = '',
  children,
  ...aria
}: ButtonProps) {
  const key =
    variant === 'accent' || variant === 'danger' ? variant : `${variant}-${surface}`
  const offset = surface === 'dark' ? '#210b03' : '#ffffff'
  const style = { ...TOKENS[key], '--btn-offset': offset } as CSSProperties
  const isDisabled = disabled || loading
  const tertiary = variant === 'tertiary'

  const iconEl = icon ? (
    arrow === 'up-right' ? (
      <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    ) : (
      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    )
  ) : null

  const cls = tertiary
    ? `btn-text group ${size === 'md' ? 'text-sm md:text-base' : 'text-sm'} ${className}`
    : `btn group ${SIZES[size]} ${className}`

  const inner = loading ? (
    <Spinner />
  ) : (
    <>
      {tertiary ? <span>{children}</span> : children}
      {iconEl}
    </>
  )

  if (to && !isDisabled) {
    return (
      <Link to={to} className={cls} style={style} onClick={onClick} data-force={force} {...aria}>
        {inner}
      </Link>
    )
  }
  if (href && !isDisabled) {
    return (
      <a href={href} className={cls} style={style} onClick={onClick} data-force={force} {...aria}>
        {inner}
      </a>
    )
  }
  return (
    <button
      type={type}
      className={cls}
      style={style}
      disabled={isDisabled}
      onClick={onClick}
      data-force={force}
      {...aria}
    >
      {inner}
    </button>
  )
}
