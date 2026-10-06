import { Phone } from 'lucide-react'
import BookCall from '@/components/ui/BookCall'
import CallbackForm from '@/components/ui/CallbackForm'
import { Accent } from '@/components/ui/Type'
import { SITE } from '@/lib/site'

const GUARANTEES = [
  'Written quotation, valid 30 days',
  'Scope changes priced before they start',
  'Full ownership transfers on final payment',
  'Defects corrected free for 30 days',
]

/**
 * The closing block on every service page, and the one that has to convert.
 *
 * Rebuilt around an on-page form. It previously led with a mailto: link,
 * which is the weakest thing a page can offer paid traffic: it hands the
 * visitor to a mail client that may not be configured, leaves them in an empty
 * compose window with no prompt about what to write, and produces no
 * server-side confirmation — so nothing can be counted as a conversion and
 * Google Ads has no signal to bid on.
 *
 * Three routes are offered instead, in descending order of how much the
 * visitor has to do: leave a number, tap to call, or book a slot. Email is
 * still reachable from the footer for anyone who prefers it.
 */
export default function ServiceQuote({ service }) {
  // A service without its own catalogue (app development) names the one that
  // carries its line items; otherwise the estimator opens on this service.
  const estimateSlug = service.groups?.length ? service.slug : service.estimateSlug
  const estimateHref = estimateSlug ? `/quote?service=${estimateSlug}` : '/quote'

  return (
    <section
      id="quote"
      className="scroll-mt-24 px-6 py-24 md:px-9 md:py-32 lg:py-40"
    >
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-7">
          <h2 className="max-w-[560px] text-[clamp(26px,7.5vw,34px)] leading-[1.08] font-semibold tracking-[-0.05em] md:leading-[1.05] md:tracking-[-0.06em] md:text-[clamp(46px,6vw,58px)]">
            Tell us what you need <Accent>built</Accent>.
          </h2>

          <p className="mt-6 max-w-[440px] text-[14px] md:text-[17px] leading-[1.45] text-muted">
            Send the brief and you get an itemised quotation, a timeline and a
            start date back. No discovery fee, no obligation.
          </p>

          {/*
            Click-to-call carries the number in the label rather than hiding it
            behind a verb. On a phone it dials; on a desktop it is still the
            fastest thing to read and note down. Tracked as a conversion either
            way — on mobile paid traffic it is often the only action taken.
          */}
          <div className="mt-8 flex w-full max-w-[320px] flex-col items-center gap-3 md:max-w-none md:flex-row">
            <a
              href={SITE.phoneHref}
              className="inline-flex h-12 md:h-14 w-full items-center justify-center gap-2.5 rounded-full bg-ink px-[26px] text-[15px] font-semibold text-white transition-transform duration-200 hover:-translate-y-px md:w-auto"
            >
              <Phone size={16} />
              {SITE.phone}
            </a>
            <BookCall />
          </div>

          {/* Catches the visitor who wants a number before speaking to anyone.
              Deep-links to this service so the estimator opens pre-selected. */}
          <p className="mt-6 text-[15px] text-muted">
            Want a figure first?{' '}
            <a
              href={estimateHref}
              className="font-medium text-ink underline underline-offset-4"
            >
              Build an estimate in a minute
            </a>
            .
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {GUARANTEES.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-t border-soft pt-4 text-[15px] leading-snug"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-dot" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5">
          <CallbackForm service={service.name} />
        </div>
      </div>
    </section>
  )
}
