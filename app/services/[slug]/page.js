import { notFound } from 'next/navigation'
import ServiceHero from '@/components/service/ServiceHero'
import ServicePillars from '@/components/service/ServicePillars'
import ServiceDeliverables from '@/components/service/ServiceDeliverables'
import ServiceProcess from '@/components/service/ServiceProcess'
import ServiceWork from '@/components/service/ServiceWork'
import ServiceFAQ from '@/components/service/ServiceFAQ'
import ServiceQuote from '@/components/service/ServiceQuote'
import DesignGallery from '@/components/sections/DesignGallery'
import { getService, SERVICE_SLUGS } from '@/lib/services'
import { SITE } from '@/lib/site'

// Every service is known at build time, so each one prerenders as static HTML.
export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}

  return {
    title: `${service.name} — ${SITE.name}`,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} — ${SITE.name}`,
      description: service.metaDescription,
      type: 'website',
    },
  }
}

export default async function ServicePage({ params }) {
  const { slug } = await params
  const service = getService(slug)

  if (!service) notFound()

  // Lets the FAQ answers qualify for rich results rather than sitting inside
  // a collapsed accordion that crawlers score as hidden content.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    description: service.metaDescription,
    areaServed: 'IN',
    provider: {
      '@type': 'Organization',
      name: SITE.legalName,
      email: SITE.email,
      telephone: SITE.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
        addressLocality: 'Bengaluru',
        postalCode: '560057',
        addressCountry: 'IN',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([serviceSchema, faqSchema]),
        }}
      />

      <ServiceHero service={service} />
      <ServicePillars service={service} />
      <ServiceDeliverables service={service} />
      <ServiceProcess service={service} />

      {/* Proof, in whichever form suits the service: real project cards, or
          the interactive poster wall for design work. */}
      {service.showcase === 'design-gallery' ? (
        <DesignGallery />
      ) : (
        <ServiceWork service={service} />
      )}

      <ServiceFAQ service={service} />
      <ServiceQuote service={service} />
    </>
  )
}
