import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/ogImage'

export const alt = 'ITBIZONE — everything digital, under one roof.'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return ogImage({
    eyebrow: 'Bengaluru',
    title: 'Everything digital, under one roof.',
    footer: 'Websites · Design · Marketing',
  })
}
