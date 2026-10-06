import { SITE, SITE_URL, SOCIALS } from './site'
import { SERVICES, SERVICE_SLUGS } from './services'

/*
  Every JSON-LD builder on the site lives in this file, so the business is
  described one way only. Pages import from here; none of them hand-write a
  schema object.
*/

/**
 * The one canonical node for the business.
 *
 * Everything else — each service's `provider`, each case study's `creator` —
 * points here by @id instead of restating the company. Two separately-declared
 * nodes with the same name and no shared identifier read as two different
 * businesses, which splits the local entity Google needs to resolve for map
 * results.
 */
export const ORG_ID = `${SITE_URL}/#organisation`
export const orgRef = { '@id': ORG_ID }

const SERVICE_AREA = {
  '@type': 'City',
  name: 'Bengaluru',
  // Disambiguates from the other places Google might match on the name.
  sameAs: 'https://en.wikipedia.org/wiki/Bengaluru',
}

const serviceId = (slug) => `${SITE_URL}/services/${slug}/#service`

/**
 * Organisation + local business schema, emitted once from the root layout so
 * it is present on every page.
 *
 * ProfessionalService extends LocalBusiness, so this covers both the agency
 * entity and the physical Bengaluru presence Google needs for map and "near
 * me" results. `sameAs` ties the site to the social profiles, which is what
 * lets Google merge them into one knowledge entity.
 *
 * Address, phone and hours all come from lib/site.js — the same values the
 * footer and contact page render — so the three cannot drift apart.
 */
export function organisationSchema() {
  const { address, geo } = SITE
  const hasGeo = geo.latitude != null && geo.longitude != null

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/itbizone-logo.png`,
    // The site's own share card (app/opengraph-image.jsx).
    image: `${SITE_URL}/opengraph-image`,
    email: SITE.email,
    telephone: SITE.phone,
    description: SITE.description,
    slogan: SITE.tagline,
    foundingDate: String(SITE.founded),
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${address.line1}, ${address.line2}`,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    // Omitted until real coordinates are set in lib/site.js.
    ...(hasGeo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: geo.latitude,
        longitude: geo.longitude,
      },
    }),
    areaServed: SERVICE_AREA,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: SOCIALS.filter((s) => s.label !== 'WhatsApp').map((s) => s.href),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Website, app and digital services',
      itemListElement: SERVICE_SLUGS.map((slug) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': serviceId(slug),
          name: SERVICES[slug].name,
          url: `${SITE_URL}/services/${slug}`,
        },
      })),
    },
  }
}

/** Tells Google the site's search-result sitelinks target. */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.name,
    publisher: orgRef,
  }
}

/**
 * Service schema, with the catalogue exposed as real offers.
 *
 * The prices in services.js were previously visible only as rendered text.
 * As `offers` with an explicit currency they become machine-readable, which is
 * what makes a service page eligible for enhanced results. A service without
 * a catalogue (app development) simply has no `offers`.
 */
export function serviceSchema(service) {
  const items = (service.groups ?? []).flatMap((group) => group.items)

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': serviceId(service.slug),
    name: service.seoTitle ?? service.name,
    serviceType: service.name,
    url: `${SITE_URL}/services/${service.slug}`,
    description: service.metaDescription,
    areaServed: SERVICE_AREA,
    provider: orgRef,
    ...(items.length && {
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'INR',
        // "from" prices, so the catalogue floor is the honest low.
        lowPrice: Math.min(...items.map((i) => i.price)),
        highPrice: Math.max(...items.map((i) => i.price)),
        offerCount: items.length,
        offers: items.map((item) => ({
          '@type': 'Offer',
          name: item.name,
          price: item.price,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
        })),
      },
    }),
  }
}

/**
 * FAQPage from the same `{ q, a }` array the visible accordion renders, so the
 * marked-up text is the on-page text, character for character. Google drops
 * FAQ markup that does not match what a visitor can read.
 */
export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }
}

/** Breadcrumbs for any non-home route. */
export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      ...trail.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: crumb.name,
        item: `${SITE_URL}${crumb.path}`,
      })),
    ],
  }
}

/*
  The site's primary navigation, declared in the order we want it read.

  ⚠ This does not set sitelinks. Nothing does — Google generates them
  algorithmically and removed the demotion tool from Search Console in 2016.
  What this markup does is state unambiguously which pages constitute the
  primary navigation, rather than leaving Google to infer it from link
  positions. It is one input among several, and the same order is mirrored in
  components/Navbar.jsx, the footer's Services column and the home page's
  service cards — consistency across those is the part that actually carries
  weight.
*/
export function navigationSchema() {
  const items = [
    ['Website Development', '/services/website-development'],
    ['App Development', '/services/app-development'],
    ['Graphic Design', '/services/graphic-design'],
    ['Social Media Management', '/services/social-media-management'],
    ['Digital Marketing', '/services/digital-marketing'],
    ['UI/UX Design', '/services/ui-ux-design'],
    ['Contact', '/contact'],
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/#primary-nav`,
    name: `${SITE.name} primary navigation`,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: items.length,
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'SiteNavigationElement',
      position: i + 1,
      name,
      url: `${SITE_URL}${path}`,
    })),
  }
}
