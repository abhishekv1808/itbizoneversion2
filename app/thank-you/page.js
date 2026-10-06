import { ArrowUpRight, Check, Phone } from 'lucide-react'
import BookCall from '@/components/ui/BookCall'
import { Accent } from '@/components/ui/Type'
import { SITE, whatsappHref } from '@/lib/site'
import { pageMetadata } from '@/lib/metadata'

/**
 * Where every lead form lands after a successful submit.
 *
 * The point is the URL. An event-based conversion depends on a script having
 * loaded and fired before the visitor moved on; a distinct page load is a
 * signal Google Ads can count on its own, and it is also what a remarketing
 * audience is built from — "reached /thank-you" is a list of people who have
 * already raised a hand.
 *
 * ⚠ noindex, and deliberately absent from app/sitemap.js. A thank-you page
 * ranking in search is a page that gets reached without anyone converting,
 * which quietly inflates the conversion count it exists to measure. It is
 * still `follow`, so the links out of it pass normally, and it is not
 * disallowed in robots.txt — a blocked page can never be crawled, so the
 * noindex on it would never be read.
 */
export const metadata = pageMetadata({
  title: 'Thanks — we have your enquiry',
  description: `Your enquiry is with the ${SITE.name} team in Bengaluru.`,
  path: '/thank-you',
  robots: { index: false, follow: true },
})

const NEXT = [
  'We read it and check what you already have running.',
  'You get a call or a WhatsApp message back, usually the same working day.',
  'If it is a fit, an itemised quotation with a timeline and a start date.',
]

export default function ThankYouPage() {
  return (
    <section className="px-6 pt-36 pb-28 md:px-9 md:pt-44 md:pb-36">
      <div className="mx-auto w-full max-w-[720px] text-center">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-ink text-white">
          <Check size={26} />
        </span>

        <h1 className="mt-8 text-[clamp(34px,9vw,44px)] leading-[1.05] font-semibold tracking-[-0.06em] md:text-[clamp(46px,5vw,56px)]">
          Got it. We&rsquo;ll be <Accent>in touch</Accent>.
        </h1>

        <p className="mx-auto mt-6 max-w-[460px] text-[14px] md:text-[17px] leading-[1.45] text-muted">
          Your enquiry is with the team in Bengaluru. Nothing else is needed
          from you right now.
        </p>

        {/*
          The impatient visitor is the one most likely to buy, so the direct
          routes are offered here rather than being treated as a dead end.
        */}
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={SITE.phoneHref}
            data-cta="thank-you"
            className="inline-flex h-12 md:h-14 w-full items-center justify-center gap-2.5 rounded-full bg-ink px-7 text-[15px] font-semibold text-white transition-transform duration-200 hover:-translate-y-px sm:w-auto"
          >
            <Phone size={16} />
            {SITE.phone}
          </a>
          <BookCall />
        </div>

        <ol className="mx-auto mt-14 max-w-[520px] text-left">
          {NEXT.map((step, i) => (
            <li
              key={step}
              className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-soft py-4 last:border-b"
            >
              <span className="pt-0.5 text-[12px] font-medium text-quiet tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[16px] leading-snug">{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[15px]">
          <a
            href={whatsappHref(null)}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="thank-you"
            className="inline-flex items-center gap-1.5 font-medium underline underline-offset-4"
          >
            Message us on WhatsApp
            <ArrowUpRight size={15} />
          </a>
          <a href="/" className="text-muted underline underline-offset-4">
            Back to the site
          </a>
        </div>
      </div>
    </section>
  )
}
