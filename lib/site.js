/**
 * Company facts, sourced from the v1 site (itbizone.com) and the MCA listing.
 * Every section reads contact details from here so a change lands everywhere.
 */
export const SITE = {
  name: 'ITBIZONE',
  legalName: 'ITBIZONE Technologies Pvt Ltd',
  founded: 2023,
  tagline: 'Empowering businesses through innovative digital solutions.',
  description:
    'Websites, design and marketing delivered by one Bengaluru team — so your brand, your site and your campaigns finally say the same thing.',
  email: 'info@itbizone.com',
  phone: '+91 9535111129',
  phoneHref: 'tel:+919535111129',
  // Digits only, no + or spaces — wa.me rejects anything else.
  whatsapp: '919535111129',
  /**
   * Set NEXT_PUBLIC_CALENDLY_URL to the real 15-minute event link. Until it is
   * set, `bookingHref` below resolves to /contact rather than a dead Calendly
   * URL — a booking button that 404s costs more than one that asks for a brief.
   * Keep the event duration at 15 minutes so it matches the button copy.
   */
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL || '',
  hours: 'Mon – Fri, 9:00 AM – 6:00 PM IST',
  /*
    Name, address and phone have to read identically everywhere they appear —
    footer, contact page, legal pages and the JSON-LD. Google cross-checks them
    against the Business Profile, and a mismatch (a dropped state, a different
    line break) weakens the local listing. So the parts live here once and the
    display lines below are built from them, never retyped.
  */
  address: {
    line1: 'Sy. No 13/1, Site No. 21, 4th Floor, Narasappa Road',
    line2: 'Near Metro Pillar 471, T. Dasarahalli',
    locality: 'Bengaluru',
    region: 'Karnataka',
    postalCode: '560057',
    country: 'IN',
    // Third display line.
    city: 'Bengaluru, Karnataka 560057',
  },
  /*
    TODO: the office's coordinates, read off the Google Business Profile pin
    (right-click the pin in Google Maps → the first row is "lat, long").
    Left null until then — the schema omits `geo` rather than publishing a
    guessed point, because a wrong pin is worse for map results than none.
  */
  geo: { latitude: null, longitude: null },
}

/** One-line postal address, for prose, map queries and llms.txt. */
export const FULL_ADDRESS = `${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.city}`

/** True once a real Calendly link is configured. */
export const hasCalendly = Boolean(SITE.calendly)

/** Where the booking CTA points. Falls back to the contact page. */
export const bookingHref = SITE.calendly || '/contact'

/** Canonical origin, used by metadataBase, sitemap, robots and JSON-LD. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://itbizone.com'
).replace(/\/$/, '')

/**
 * wa.me deep link. `context` becomes the prefilled first message, so a visitor
 * on a service page arrives in the inbox already telling you what they want.
 */
export function whatsappHref(context) {
  const text = context
    ? `Hi ${SITE.name}, I'd like to know more about ${context}.`
    : `Hi ${SITE.name}, I'd like to discuss a project.`
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`
}

export const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/itbizone-technologies/' },
  { label: 'Instagram', href: 'https://www.instagram.com/itbizone/' },
  { label: 'Facebook', href: 'https://www.facebook.com/itbizone.tech/' },
  { label: 'X', href: 'https://x.com/itbizOne' },
  { label: 'WhatsApp', href: `https://wa.me/${SITE.whatsapp}` },
]
