/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development'

/*
  ── Content Security Policy ───────────────────────────────────────────────

  Every origin below is here because something in this codebase reaches for it.
  Nothing is listed speculatively — where a directive looks over-broad, the
  comment says which file forced it.

  ⚠ script-src carries 'unsafe-inline', and that is a deliberate trade rather
  than an oversight. Next.js injects its own inline bootstrap and streaming
  payloads on every page, and components/Analytics.jsx has an inline gtag
  init. The strict alternative is a per-request nonce, which has to be issued
  from middleware — and a nonce cannot be baked into a static file, so it
  would force every one of the 29 prerendered pages to render dynamically.
  That is a real cost for a site that is almost entirely static.

  What the policy still buys with 'unsafe-inline' in place: no script may load
  from an origin not listed here, the site cannot be framed, forms cannot be
  repointed at another host, <base> cannot be rewritten to hijack relative
  URLs, and plugins are refused outright. Those are the injection routes that
  actually get used.

  Worth revisiting if this ever moves to mostly-dynamic rendering, where a
  nonce stops costing anything.
*/
const csp = [
  `default-src 'self'`,

  // googletagmanager: the gtag loader in Analytics.jsx.
  // assets.calendly.com: widget.js, fetched on demand by lib/calendly.js.
  // 'unsafe-eval' in dev only — the HMR client needs it, production does not.
  `script-src 'self' 'unsafe-inline' ${isDev ? `'unsafe-eval' ` : ''}https://www.googletagmanager.com https://assets.calendly.com`,

  // Next inlines critical CSS, and next/font emits inline @font-face.
  // assets.calendly.com serves the widget stylesheet.
  `style-src 'self' 'unsafe-inline' https://assets.calendly.com`,

  // data: — DesignShowcase falls back to drawPoster canvases via toDataURL
  //   for any poster with no `src`. Every poster has one today, so this path
  //   is currently unused, but the code is still there.
  // blob: — canvas and WebGL readback.
  // images.higgs.ai — the hero texture, loaded directly by HeroCanvas rather
  //   than through /_next/image, so it is a cross-origin <img>.
  // images.unsplash.com — placeholder photography, see lib/images.js. Drop
  //   this the day those are replaced with files from /public.
  // assets.calendly.com — the popup's own close icon. Only requested once
  //   someone actually opens the booking modal, so it survived the page sweep
  //   and was caught by clicking through it.
  `img-src 'self' data: blob: https://images.higgs.ai https://images.unsplash.com https://www.googletagmanager.com https://assets.calendly.com`,

  // next/font/google self-hosts at build time, so no external font origin.
  `font-src 'self' data:`,

  // GA4 splits collection across regional subdomains, hence the wildcards.
  `connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://assets.calendly.com`,

  // calendly.com — the booking popup mounts an iframe.
  // google.com — the map embed on /contact, see MAP_SRC in app/contact/page.js.
  //   Missing this was caught by the CSP sweep rather than by reading the
  //   code: the map is the only iframe on the site that is not Calendly.
  `frame-src https://calendly.com https://*.calendly.com https://www.google.com`,

  `worker-src 'self' blob:`,
  `media-src 'self'`,

  // Nothing here embeds Flash, Java or PDF objects.
  `object-src 'none'`,

  // The contact form and the quote estimator both post to same-origin /api.
  `form-action 'self'`,

  // Stops an injected <base> from silently repointing every relative URL.
  `base-uri 'self'`,

  // The modern frame-ancestors; X-Frame-Options below covers older agents.
  `frame-ancestors 'none'`,

  `upgrade-insecure-requests`,
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },

  // Legacy companion to frame-ancestors. Browsers honouring both prefer
  // frame-ancestors; this covers the ones that do not.
  { key: 'X-Frame-Options', value: 'DENY' },

  { key: 'X-Content-Type-Options', value: 'nosniff' },

  // Full URL to our own origin, bare origin to third parties — so a referrer
  // never leaks a quote or case-study path off-site.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

  /*
    Nothing on this site asks for a camera, a microphone or a location, so
    they are refused for the document and every frame inside it. This is the
    header to edit if a future embed legitimately needs one.
  */
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  },

  /*
    ⚠ Two years, and includeSubDomains applies to EVERY subdomain of
    itbizone.com — any that is still served over plain HTTP will stop
    resolving for anyone who has visited the apex. Confirm before deploying.

    There is no `preload` token here on purpose: preloading submits the domain
    to a browser-vendor list and is slow and painful to reverse.
  */
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains',
  },
]

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.higgs.ai' },
      // Placeholder photography — see lib/images.js. Drop this entry once the
      // images are replaced with files served from /public.
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
