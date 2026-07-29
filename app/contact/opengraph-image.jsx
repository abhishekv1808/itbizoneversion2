import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/ogImage'
import { SITE } from '@/lib/site'

export const alt = `Contact ${SITE.name}`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return ogImage({
    eyebrow: 'Contact',
    title: 'Tell us what you’re building.',
    footer: SITE.hours,
  })
}
