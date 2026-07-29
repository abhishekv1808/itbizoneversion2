import { SITE_URL } from '@/lib/site'
import { SERVICE_SLUGS } from '@/lib/services'

/**
 * Served at /sitemap.xml.
 *
 * Only the three service pages that actually exist are listed. The other three
 * services promoted on the home page (UI/UX Design, Digital Marketing,
 * E-commerce Development) have no page yet — listing them would hand Google
 * URLs that 404.
 */
export default function sitemap() {
  const now = new Date()

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/quote`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    ...SERVICE_SLUGS.map((slug) => ({
      url: `${SITE_URL}/services/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    })),
  ]
}
