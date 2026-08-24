import { next } from '@vercel/edge'

// Runs on every request at the edge, before any static file is served.
// Gates the whole site behind HTTP Basic Auth so only people with the
// password can view it. Free on Vercel's Hobby plan.
export const config = {
  // Match everything except Vercel internals.
  matcher: '/((?!_vercel).*)',
}

// Password: set SITE_PASSWORD in the Vercel project's Environment Variables.
// Falls back to this default so the preview is never accidentally public.
const FALLBACK_PASSWORD = 'lumen-preview'

export default function middleware(request: Request) {
  const expected = (globalThis.process?.env?.SITE_PASSWORD as string) || FALLBACK_PASSWORD
  const header = request.headers.get('authorization')

  if (header?.startsWith('Basic ')) {
    try {
      const decoded = atob(header.slice(6))
      const password = decoded.slice(decoded.indexOf(':') + 1)
      if (password === expected) {
        return next()
      }
    } catch {
      // fall through to the auth prompt
    }
  }

  return new Response('Authenticatie vereist.', {
    status: 401,
    headers: {
      // Realm must be ASCII-only, otherwise browsers ignore the header and
      // never show the login prompt.
      'WWW-Authenticate': 'Basic realm="Lumen preview"',
    },
  })
}
