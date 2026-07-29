import { ChevronRight, Mail, MapPin, Phone } from 'lucide-react'
import ContactForm from '@/components/contact/ContactForm'
import BookCall from '@/components/ui/BookCall'
import OfficeStatus from '@/components/ui/OfficeStatus'
import { Accent } from '@/components/ui/Type'
import { SITE, SOCIALS } from '@/lib/site'

const FULL_ADDRESS = `${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.city}`
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(FULL_ADDRESS)}&output=embed`

export const metadata = {
  title: `Contact — ${SITE.name}`,
  description: `Talk to ${SITE.legalName} about a website, brand or campaign. Bengaluru studio, ${SITE.hours}. Written quotations within one working day.`,
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.legalName,
    email: SITE.email,
    telephone: SITE.phone,
    url: 'https://itbizone.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560057',
      addressCountry: 'IN',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: SOCIALS.map((social) => social.href),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="px-6 pt-32 pb-16 md:px-9 md:pt-40 md:pb-20">
        <div className="mx-auto w-full max-w-[1200px]">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-[13px] text-quiet"
          >
            <a href="/" className="transition-colors hover:text-ink">
              Home
            </a>
            <ChevronRight size={13} />
            <span className="text-muted">Contact</span>
          </nav>

          <h1 className="mt-8 max-w-[820px] text-[clamp(40px,11vw,50px)] leading-[1.04] font-semibold tracking-[-0.065em] md:text-[clamp(58px,7.5vw,74px)] lg:text-[84px]">
            Let&rsquo;s talk about what you&rsquo;re <Accent>building</Accent>.
          </h1>

          <p className="mt-7 max-w-[520px] text-[17px] leading-[1.45] text-muted">
            Send the brief and you get an itemised quotation, a timeline and a
            start date back. No discovery fee, no obligation.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-9 md:pb-32">
        <div className="mx-auto grid w-full max-w-[1200px] gap-14 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <ContactForm />
          </div>

          <aside className="flex flex-col gap-8 md:col-span-5 md:pl-4">
            <div className="rounded-2xl border border-soft bg-panel p-7">
              <h2 className="text-[13px] font-medium text-quiet">
                Prefer to skip the form?
              </h2>
              <div className="mt-5 flex flex-col gap-4">
                <ContactRow
                  icon={<Phone size={16} />}
                  label="Phone"
                  value={SITE.phone}
                  href={SITE.phoneHref}
                />
                <ContactRow
                  icon={<Mail size={16} />}
                  label="Email"
                  value={SITE.email}
                  href={`mailto:${SITE.email}`}
                />
                <ContactRow
                  icon={<MapPin size={16} />}
                  label="Studio"
                  value={
                    <>
                      {SITE.address.line1}
                      <br />
                      {SITE.address.line2}
                      <br />
                      {SITE.address.city}
                    </>
                  }
                />
              </div>

              <div className="mt-6 border-t border-soft pt-5">
                {/* Dark-on-light here, unlike the footer — the component's own
                    colours assume the ink background, so they are overridden. */}
                <div className="[&_span]:!text-muted">
                  <OfficeStatus />
                </div>
                <p className="mt-2 text-[13px] text-quiet">{SITE.hours}</p>
              </div>
            </div>

            <div>
              <h2 className="text-[13px] font-medium text-quiet">
                Rather book a time?
              </h2>
              <div className="mt-4">
                <BookCall />
              </div>
            </div>

            <div>
              <h2 className="text-[13px] font-medium text-quiet">Elsewhere</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full border border-soft px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-chip"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-9 md:pb-32">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* allow-iframe re-enables pointer events that Lenis strips from every
              iframe; data-lenis-prevent keeps map scroll out of the page. */}
          <div
            data-lenis-prevent
            className="allow-iframe overflow-hidden rounded-3xl border border-soft"
          >
            <iframe
              src={MAP_SRC}
              title={`${SITE.name} office location on Google Maps`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[380px] w-full md:h-[460px]"
            />
          </div>
        </div>
      </section>
    </>
  )
}

function ContactRow({ icon, label, value, href }) {
  const body = (
    <>
      <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-bg text-ink">
        {icon}
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-[13px] text-quiet">{label}</span>
        <span className="text-[15px] leading-snug font-medium">{value}</span>
      </span>
    </>
  )

  if (!href) return <div className="flex items-start gap-3">{body}</div>

  return (
    <a
      href={href}
      className="flex items-start gap-3 transition-opacity duration-200 hover:opacity-70"
    >
      {body}
    </a>
  )
}
