import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/ogImage'
import { getService, SERVICE_SLUGS } from '@/lib/services'

export const alt = 'ITBIZONE service'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

// One card per service, generated at build time alongside the pages.
export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }))
}

export default async function Image({ params }) {
  const { slug } = await params
  const service = getService(slug)

  if (!service) {
    return ogImage({ title: 'Everything digital, under one roof.' })
  }

  // `title` is [before, accent, after]. ServiceHero renders it as
  // `{before} <Accent>{accent}</Accent>{after}` — the space between the first
  // two is in the JSX, not the data, so joining on '' would give "inleads".
  const [before, accent, after] = service.title
  return ogImage({
    eyebrow: service.name,
    title: `${before} ${accent}${after}`,
    footer: service.duration,
  })
}
