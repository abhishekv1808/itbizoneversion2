import BookCall from '@/components/ui/BookCall'
import { Accent } from '@/components/ui/Type'
import { SITE } from '@/lib/site'

const GUARANTEES = [
  'Written quotation, valid 30 days',
  'Scope changes priced before they start',
  'Full ownership transfers on final payment',
  'Defects corrected free for 30 days',
]

export default function ServiceQuote({ service }) {
  const subject = encodeURIComponent(`${service.name} enquiry`)

  return (
    <section
      id="quote"
      className="scroll-mt-24 px-6 py-24 md:px-9 md:py-32 lg:py-40"
    >
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <h2 className="max-w-[560px] text-[clamp(34px,9vw,42px)] leading-[1.05] font-semibold tracking-[-0.06em] md:text-[clamp(46px,6vw,58px)]">
            Tell us what you need <Accent>built</Accent>.
          </h2>

          <p className="mt-6 max-w-[440px] text-[17px] leading-[1.45] text-muted">
            Send the brief and you get an itemised quotation, a timeline and a
            start date back. No discovery fee, no obligation.
          </p>

          <div className="mt-9 flex w-full max-w-[320px] flex-col items-center gap-4 md:max-w-none md:flex-row">
            <a
              href={`mailto:${SITE.email}?subject=${subject}`}
              className="inline-flex h-14 w-full items-center justify-center rounded-full bg-ink px-[30px] text-[15px] font-semibold text-white transition-transform duration-200 hover:-translate-y-px md:w-auto"
            >
              Request a quotation
            </a>
            <BookCall />
          </div>
        </div>

        <ul className="flex flex-col gap-4 md:col-span-5 md:pt-3">
          {GUARANTEES.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 border-b border-soft pb-4 text-[15px] leading-snug"
            >
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-dot" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
