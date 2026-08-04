import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/ogImage'
import { CASE_STUDY_SLUGS, getCaseStudy } from '@/lib/caseStudies'

export const alt = 'ITBIZONE case study'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

/*
  One card per study, generated at build time alongside the pages.

  These were the only routes on the site shipping without an og:image. A
  file-based opengraph-image does not cascade into a segment that declares its
  own `openGraph` object, so the root card never applied here and every share
  of a case study fell back to a bare link.
*/
export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }))
}

export default async function Image({ params }) {
  const { slug } = await params
  const study = getCaseStudy(slug)

  if (!study) {
    return ogImage({ title: 'Everything digital, under one roof.' })
  }

  return ogImage({
    eyebrow: study.project.sector,
    title: study.tagline,
    footer: study.project.name,
  })
}
