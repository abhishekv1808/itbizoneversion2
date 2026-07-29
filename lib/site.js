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
  address: {
    line1: 'Sy. No 13/1, Site No. 21, 4th Floor, Narasappa Road',
    line2: 'Near Metro Pillar 471, T. Dasarahalli',
    city: 'Bengaluru 560057',
  },
}

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
  { label: 'WhatsApp', href: 'https://wa.me/919535111129' },
]
