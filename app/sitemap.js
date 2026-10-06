import { execFileSync } from 'node:child_process'
import { SITE_URL } from '@/lib/site'
import { SERVICE_SLUGS } from '@/lib/services'
import { CASE_STUDY_SLUGS } from '@/lib/caseStudies'

/**
 * Served at /sitemap.xml.
 *
 * ── Priority, but no changefreq ───────────────────────────────────────────
 * Priority is set on a coarse four-step scale (home 1.0, services 0.9, case
 * studies 0.7, careers 0.3, everything else 0.5). Be clear about what it
 * does: Google has stated it ignores both priority and changefreq, so this
 * does NOT steer Google's crawl. Bing reads priority as a hint, and the scale
 * records which pages matter most to the business. changefreq stays out — it
 * would only be a guess.
 *
 * ── lastmod comes from git, or not at all ─────────────────────────────────
 * Every entry previously carried `new Date()`, so all thirteen URLs claimed
 * to have changed at the instant of the build, and would claim it again on
 * the next deploy even if nothing was touched. A lastmod that moves on every
 * deploy is one Google learns to disregard, which is worse than sending none.
 *
 * The date now comes from the last commit that touched the file the page's
 * content actually lives in. If git is unavailable — a shallow CI clone, a
 * tarball deploy — `lastModified` is left undefined and Next omits the tag
 * rather than substituting the build clock. Omitting is honest; stamping is
 * not.
 */

// Where each route's content really comes from. Component-driven pages are
// mapped to the file holding their copy, not to the route file, because that
// is what changes when the page changes.
const SOURCES = {
  home: 'app/page.js',
  quote: 'app/quote/page.js',
  contact: 'app/contact/page.js',
  careers: 'components/sections/Careers.jsx',
  privacy: 'app/privacy-policy/page.js',
  terms: 'app/terms-of-service/page.js',
  caseStudies: 'lib/caseStudies.js',
  services: 'lib/services.js',
}

const cache = new Map()

function lastCommit(file) {
  if (cache.has(file)) return cache.get(file)

  let date
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    // An untracked or never-committed file returns an empty string, not an
    // error, so the emptiness has to be checked rather than assumed away.
    date = iso ? new Date(iso) : undefined
  } catch {
    date = undefined
  }

  cache.set(file, date)
  return date
}

export default function sitemap() {
  const entry = (path, source, priority = 0.5) => ({
    url: `${SITE_URL}${path}`,
    lastModified: lastCommit(source),
    priority,
  })

  // /thank-you is deliberately absent — it is noindex; see that page.
  return [
    entry('/', SOURCES.home, 1.0),
    ...SERVICE_SLUGS.map((slug) =>
      entry(`/services/${slug}`, SOURCES.services, 0.9)
    ),
    ...CASE_STUDY_SLUGS.map((slug) =>
      entry(`/case-studies/${slug}`, SOURCES.caseStudies, 0.7)
    ),
    entry('/quote', SOURCES.quote),
    entry('/contact', SOURCES.contact),
    entry('/careers', SOURCES.careers, 0.3),
    entry('/privacy-policy', SOURCES.privacy),
    entry('/terms-of-service', SOURCES.terms),
  ]
}
