import { SITE, SITE_URL, SOCIALS } from './site'
import { SERVICES, SERVICE_SLUGS } from './services'

/**
 * The one canonical node for the business.
 *
 * Everything else — the contact page's local listing, each service's
 * `provider` — points here by @id instead of restating the company. Two
 * separately-declared nodes with the same name and no shared identifier read
 * as two different businesses, which splits the local entity Google needs to
 * resolve for map results.
 */
export const ORG_ID = `${SITE_URL}/#organisation`
export const orgRef = { '@id': ORG_ID }

/**
 * Organisation + local business schema for the home page.
 *
 * ProfessionalService extends LocalBusiness, so this covers both the "digital
 * agency" entity and the physical Bengaluru presence Google needs for map and
 * "near me" results. `sameAs` ties the site to the social profiles, which is
 * what lets Google merge them into one knowledge entity.
 */
export function organisationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE_URL,
    email: SITE.email,
    telephone: SITE.phone,
    description: SITE.description,
    slogan: SITE.tagline,
    foundingDate: String(SITE.founded),
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560057',
      addressCountry: 'IN',
    },
    areaServed: { '@type': 'Country', name: 'India' },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: SOCIALS.filter((s) => s.label !== 'WhatsApp').map((s) => s.href),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital services',
      itemListElement: SERVICE_SLUGS.map((slug) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
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
 * The contact page's local listing — the same entity as the home page's, not
 * a second one. Carrying ORG_ID merges them; the extra properties here just
 * enrich the shared node.
 */
export function contactPointSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: SITE.legalName,
    url: SITE_URL,
    email: SITE.email,
    telephone: SITE.phone,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560057',
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: SOCIALS.filter((s) => s.label !== 'WhatsApp').map((s) => s.href),
  }
}

/**
 * Service schema, with the catalogue exposed as real offers.
 *
 * The 90 prices in services.js were previously visible only as rendered text.
 * As `offers` with an explicit currency they become machine-readable, which is
 * what makes a service page eligible for enhanced results.
 */
export function serviceSchema(service) {
  const items = (service.groups ?? []).flatMap((group) => group.items)

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/services/${service.slug}/#service`,
    name: service.name,
    serviceType: service.name,
    url: `${SITE_URL}/services/${service.slug}`,
    description: service.metaDescription,
    areaServed: { '@type': 'Country', name: 'India' },
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
