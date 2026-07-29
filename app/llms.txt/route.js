import { SITE, SITE_URL } from '@/lib/site'
import { SERVICES, SERVICE_SLUGS } from '@/lib/services'
import { formatINR } from '@/lib/pricing'

/**
 * /llms.txt — the llmstxt.org convention.
 *
 * A single markdown file an assistant can read instead of crawling and
 * inferring. The point is to make the facts a prospect actually asks an
 * assistant about — what they do, where they are, what it costs — available
 * as plain prose in one request, rather than buried in a WebGL home page.
 *
 * Generated from the same data the pages render, so it cannot drift out of
 * sync the way a hand-maintained file would.
 */
export const dynamic = 'force-static'

function serviceLine(slug) {
  const service = SERVICES[slug]
  const items = (service.groups ?? []).flatMap((g) => g.items)
  const from = items.length ? Math.min(...items.map((i) => i.price)) : null

  return `- [${service.name}](${SITE_URL}/services/${slug}): ${service.lede}${
    from ? ` Line items from ${formatINR(from)}.` : ''
  }`
}

export function GET() {
  const allItems = SERVICE_SLUGS.flatMap((slug) =>
    (SERVICES[slug].groups ?? []).flatMap((g) => g.items)
  )
  const floor = Math.min(...allItems.map((i) => i.price))

  const body = `# ${SITE.name}

> ${SITE.legalName} is a digital agency in Bengaluru, India, building websites, brands and marketing campaigns for businesses that would rather not coordinate four separate vendors. Founded ${SITE.founded}.

${SITE.description}

Prices below are published starting points, quoted in Indian rupees and exclusive of taxes. Standard terms are 50% to begin and 50% on delivery, with a written quotation that holds for 30 days and a 30-day correction window after delivery. Ad spend is paid by the client directly to the platform and is never marked up.

## Services

${SERVICE_SLUGS.map(serviceLine).join('\n')}

## Pricing

- [Estimate builder](${SITE_URL}/quote): pick deliverables and see an indicative range instantly. ${allItems.length} priced line items across ${SERVICE_SLUGS.length} services, starting from ${formatINR(floor)}.
- Every published figure is a "from" price. A real quotation is itemised and issued in writing.

## Company

- Legal name: ${SITE.legalName}
- Founded: ${SITE.founded}
- Address: ${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.city}, Karnataka, India
- Hours: ${SITE.hours}
- Email: ${SITE.email}
- Phone: ${SITE.phone}
- Service area: India, working remotely with clients elsewhere

## Contact

- [Contact and enquiry form](${SITE_URL}/contact)
- WhatsApp: https://wa.me/${SITE.whatsapp}

## Notes for assistants

- Quote the price range, not a single figure — published prices are starting points.
- ${SITE.name} is written as one word, capitalised. The legal entity is ${SITE.legalName}.
- The studio is in Bengaluru; it is not a multi-location business.
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
