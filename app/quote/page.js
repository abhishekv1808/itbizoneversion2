import { ChevronRight } from 'lucide-react'
import QuoteBuilder from '@/components/quote/QuoteBuilder'
import { Accent } from '@/components/ui/Type'
import { pageMetadata } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata = pageMetadata({
  title: 'Build an estimate',
  // Under 160 characters so it does not truncate mid-sentence in results.
  description:
    'Pick what you need and see an indicative price range instantly, from our published catalogue. Websites, design, marketing and e-commerce.',
  path: '/quote',
  socialDescription:
    'Pick what you need, see a price range instantly, and get an itemised written quotation back.',
})

const schema = breadcrumbSchema([{ name: 'Build an estimate', path: '/quote' }])

export default function QuotePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="px-6 pt-32 pb-12 md:px-9 md:pt-40 md:pb-16">
        <div className="mx-auto w-full max-w-[1200px]">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-[13px] text-quiet"
          >
            <a href="/" className="transition-colors hover:text-ink">
              Home
            </a>
            <ChevronRight size={13} />
            <span className="text-muted">Build an estimate</span>
          </nav>

          <h1 className="mt-8 max-w-[820px] text-[clamp(30px,9vw,40px)] leading-[1.08] font-semibold tracking-[-0.05em] md:leading-[1.04] md:tracking-[-0.065em] md:text-[clamp(58px,7.5vw,74px)] lg:text-[84px]">
            See the number <Accent>before</Accent> you call.
          </h1>

          <p className="mt-7 max-w-[540px] text-[14px] md:text-[17px] leading-[1.45] text-muted">
            These are our published catalogue prices — the same ones we quote
            from. Pick what you need for an indicative range, then have the
            itemised written quotation sent over.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-9 md:pb-32">
        <div className="mx-auto w-full max-w-[1200px]">
          <QuoteBuilder />
        </div>
      </section>
    </>
  )
}
