import { execFileSync } from 'node:child_process'
import { SITE_URL } from '@/lib/site'
import { SERVICE_SLUGS } from '@/lib/services'
import { CASE_STUDY_SLUGS } from '@/lib/caseStudies'

/**
 * Served at /sitemap.xml.
 *
 * ── No changefreq, no priority ────────────────────────────────────────────
 * Both were dropped. Google has stated it ignores them outright, so every
 * value was noise that still had to be kept plausible — and a hand-tuned
 * priority scale invites the belief that it is steering crawl budget, which
 * it is not. Bing treats them as hints at best.
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
  const entry = (path, source) => ({
    url: `${SITE_URL}${path}`,
    lastModified: lastCommit(source),
  })

  return [
    entry('/', SOURCES.home),
    entry('/quote', SOURCES.quote),
    entry('/contact', SOURCES.contact),
    entry('/privacy-policy', SOURCES.privacy),
    entry('/terms-of-service', SOURCES.terms),
    ...CASE_STUDY_SLUGS.map((slug) =>
      entry(`/case-studies/${slug}`, SOURCES.caseStudies)
    ),
    ...SERVICE_SLUGS.map((slug) =>
      entry(`/services/${slug}`, SOURCES.services)
    ),
  ]
}
