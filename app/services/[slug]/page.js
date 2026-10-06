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
import { pageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema'

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

  // "Website Development Company in Bengaluru | ITBIZONE" — the service and
  // the city, which is the query, rather than the bare service name.
  return pageMetadata({
    title: service.seoTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  })
}

export default async function ServicePage({ params }) {
  const { slug } = await params
  const service = getService(slug)

  if (!service) notFound()

  /*
    provider is an @id reference to the single organisation node the root
    layout emits, not a restatement of the company — see lib/schema.js.

    The FAQ markup is built from the same `service.faqs` the accordion
    renders, so the marked-up text is the visible text. It is only emitted
    when the page actually shows the FAQ block.
  */
  const schema = [
    serviceSchema(service),
    breadcrumbSchema([
      { name: 'Services', path: '/#services' },
      { name: service.name, path: `/services/${service.slug}` },
    ]),
  ]
  if (service.layout.includes('faq') && service.faqs?.length) {
    schema.push(faqSchema(service.faqs))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {service.heroVariant === 'immersive' ? (
        <DevHero service={service} />
      ) : (
        <ServiceHero service={service} />
      )}

      {/*
        Section order comes from the service's own `layout`, so the pages
        argue in the order that suits them — a visual service leads with the
        photograph, a measurable one leads with method — instead of all of them
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
