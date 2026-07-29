import { SERVICES, SERVICE_SLUGS } from './services'

/**
 * Pricing helpers shared by the estimator UI and the API route that receives
 * its submissions.
 *
 * The catalogue prices in services.js are "from" figures, so a selection can
 * only ever produce a range. Presenting a single exact number would be a
 * quotation, and the written quotation is deliberately a human step.
 */

/** Upper bound of the indicative range. */
const RANGE_MULTIPLIER = 1.4

/** Only services that have a catalogue can be estimated. */
export const QUOTABLE_SLUGS = SERVICE_SLUGS.filter(
  (slug) => SERVICES[slug].groups?.length
)

export const QUOTABLE_SERVICES = QUOTABLE_SLUGS.map((slug) => ({
  slug,
  name: SERVICES[slug].name,
  groups: SERVICES[slug].groups,
}))

/** ₹1,20,000 — Indian digit grouping, no decimals. */
export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Resolves item names against the catalogue and prices them here.
 *
 * The client sends names only and never a total. Trusting a total from the
 * browser would let a tampered payload drop a ₹1 "quotation" into the inbox,
 * and the figure would look official because it arrived by the normal route.
 */
export function priceSelection(slug, names) {
  const service = SERVICES[slug]
  if (!service?.groups) return null

  const catalogue = new Map(
    service.groups.flatMap((group) =>
      group.items.map((item) => [item.name, item.price])
    )
  )

  const wanted = Array.isArray(names) ? names : []
  const items = []

  // Deduplicated, and unknown names are dropped rather than trusted.
  for (const name of new Set(wanted)) {
    if (typeof name !== 'string') continue
    const price = catalogue.get(name)
    if (typeof price === 'number') items.push({ name, price })
  }

  if (!items.length) return null

  const low = items.reduce((sum, item) => sum + item.price, 0)

  return {
    service: service.name,
    slug,
    items,
    low,
    high: roundTo(low * RANGE_MULTIPLIER, 1000),
  }
}

/** Keeps the upper bound from reading as false precision (₹1,23,457). */
function roundTo(value, step) {
  return Math.round(value / step) * step
}

/** Client-side equivalent for the live total, using the same maths. */
export function estimateRange(items) {
  const low = items.reduce((sum, item) => sum + item.price, 0)
  return { low, high: roundTo(low * RANGE_MULTIPLIER, 1000) }
}
