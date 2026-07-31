import { notFound } from 'next/navigation'
import ServiceHero from '@/components/service/ServiceHero'
import ServicePillars from '@/components/service/ServicePillars'
import ServiceDeliverables from '@/components/service/ServiceDeliverables'
import ServiceProcess from '@/components/service/ServiceProcess'
import ServiceWork from '@/components/service/ServiceWork'
import ServiceFAQ from '@/components/service/ServiceFAQ'
import ServiceQuote from '@/components/service/ServiceQuote'
import ServiceShowcase from '@/components/service/ServiceShowcase'
import DevHero from '@/components/service/dev/DevHero'
import DevShowcase from '@/components/service/dev/DevShowcase'
import Responsive from '@/components/sections/Responsive'
import CaseStudies from '@/components/sections/CaseStudies'
import DesignGallery from '@/components/sections/DesignGallery'
import DesignShowcase from '@/components/sections/DesignShowcase'
import { getService, SERVICE_SLUGS } from '@/lib/services'
import { SITE } from '@/lib/site'
import { breadcrumbSchema, serviceSchema } from '@/lib/schema'

/** Keys usable in a service's `layout`. */
const BLOCKS = {
  pillars: ServicePillars,
  showcase: ServiceShowcase,
  deliverables: ServiceDeliverables,
  process: ServiceProcess,
  work: ServiceWork,
  gallery: DesignGallery,
  morph: DesignShowcase,
  devwork: DevShowcase,
  // Both are home-page sections reused verbatim rather than reimplemented:
  // they read from PROJECTS and CASE_STUDIES, so they stay correct wherever
  // they are mounted and neither ignores the `service` prop it is handed.
  responsive: Responsive,
  cases: CaseStudies,
  faq: ServiceFAQ,
}

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

  // provider is an @id reference to the single organisation node, not a
  // restatement of the company — see lib/schema.js.
  const service_ = serviceSchema(service)
  const crumbs = breadcrumbSchema([
    { name: 'Services', path: '/#services' },
    { name: service.name, path: `/services/${service.slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([service_, faqSchema, crumbs]),
        }}
      />

      {service.heroVariant === 'immersive' ? (
        <DevHero />
      ) : (
        <ServiceHero service={service} />
      )}

      {/*
        Section order comes from the service's own `layout`, so the six pages
        argue in the order that suits them — a visual service leads with the
        photograph, a measurable one leads with method — instead of all six
        running the identical template. Sections that render nothing (proof
        without case studies) simply drop out.
      */}
      {service.layout.map((key) => {
        const Block = BLOCKS[key]
        return Block ? <Block key={key} service={service} /> : null
      })}

      <ServiceQuote service={service} />
    </>
  )
}
