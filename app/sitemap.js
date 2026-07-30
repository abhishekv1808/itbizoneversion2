import { SITE_URL } from '@/lib/site'
import { SERVICE_SLUGS } from '@/lib/services'
import { CASE_STUDY_SLUGS } from '@/lib/caseStudies'

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
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms-of-service`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...CASE_STUDY_SLUGS.map((slug) => ({
      url: `${SITE_URL}/case-studies/${slug}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,
    })),
    ...SERVICE_SLUGS.map((slug) => ({
      url: `${SITE_URL}/services/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    })),
  ]
}
