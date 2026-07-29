import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/ogImage'

export const alt = 'Build an estimate — ITBIZONE'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return ogImage({
    eyebrow: 'Pricing',
    title: 'See the number before you call.',
    footer: 'Published catalogue prices',
  })
}
