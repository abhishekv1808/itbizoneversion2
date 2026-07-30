import { ChevronRight } from 'lucide-react'
import { Accent } from '@/components/ui/Type'
import { SITE, SITE_URL } from '@/lib/site'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata = {
  title: `Privacy Policy — ${SITE.name}`,
  description: `How ${SITE.name} collects, uses and protects the personal data you share with us. Last updated July 2026.`,
  alternates: { canonical: '/privacy-policy' },
}

const EFFECTIVE_DATE = '30 July 2026'

export default function PrivacyPolicyPage() {
  const schema = [
    breadcrumbSchema([{ name: 'Privacy Policy', path: '/privacy-policy' }]),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── Hero ─────────────────────────────────────────── */}
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
            <span className="text-muted">Privacy Policy</span>
          </nav>

          <h1 className="mt-8 max-w-[820px] text-[clamp(40px,11vw,50px)] leading-[1.04] font-semibold tracking-[-0.065em] md:text-[clamp(58px,7.5vw,74px)] lg:text-[84px]">
            Privacy <Accent>Policy</Accent>
          </h1>

          <p className="mt-7 max-w-[520px] text-[17px] leading-[1.45] text-muted">
            Your privacy matters. This policy explains what data we collect, why
            we collect it, and how we keep it safe.
          </p>

          <p className="mt-4 text-[13px] text-quiet">
            Effective date: {EFFECTIVE_DATE}
          </p>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────── */}
      <section className="px-6 pb-24 md:px-9 md:pb-32">
        <div className="mx-auto w-full max-w-[820px]">
          <article className="prose-legal flex flex-col gap-12 text-[16px] leading-[1.7] text-muted [&_h2]:mb-4 [&_h2]:text-[22px] [&_h2]:font-semibold [&_h2]:tracking-[-0.03em] [&_h2]:text-ink [&_h3]:mb-2 [&_h3]:text-[17px] [&_h3]:font-semibold [&_h3]:text-ink [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_li]:mb-1.5">
            {/* 1 */}
            <div>
              <h2>1. Who We Are</h2>
              <p>
                {SITE.legalName} (&ldquo;{SITE.name}&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a private limited
                company registered in India. Our registered office is at{' '}
                {SITE.address.line1}, {SITE.address.line2}, {SITE.address.city}.
              </p>
              <p>
                For any privacy-related questions, you can reach us at{' '}
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-ink underline underline-offset-2 transition-colors hover:text-green"
                >
                  {SITE.email}
                </a>{' '}
                or call{' '}
                <a
                  href={SITE.phoneHref}
                  className="text-ink underline underline-offset-2 transition-colors hover:text-green"
                >
                  {SITE.phone}
                </a>
                .
              </p>
            </div>

            {/* 2 */}
            <div>
              <h2>2. Information We Collect</h2>

              <h3>a) Information you give us</h3>
              <ul>
                <li>
                  <strong>Contact details</strong> — name, email address, phone
                  number, company name — when you fill in a contact or quote
                  form.
                </li>
                <li>
                  <strong>Project briefs</strong> — any description, attachments
                  or files you share when requesting a quotation.
                </li>
                <li>
                  <strong>Communication records</strong> — emails, WhatsApp
                  messages and call notes exchanged during a project.
                </li>
              </ul>

              <h3>b) Information collected automatically</h3>
              <ul>
                <li>
                  <strong>Device &amp; browser data</strong> — IP address,
                  browser type, operating system, screen resolution, language
                  preference.
                </li>
                <li>
                  <strong>Usage data</strong> — pages visited, time on page,
                  clicks, scroll depth and referral source, collected via Google
                  Analytics and similar tools.
                </li>
                <li>
                  <strong>Cookies &amp; local storage</strong> — small text
                  files placed on your device to remember preferences and
                  measure traffic. See Section 7 below.
                </li>
              </ul>
            </div>

            {/* 3 */}
            <div>
              <h2>3. How We Use Your Information</h2>
              <p>We use the data we collect to:</p>
              <ul>
                <li>Respond to your enquiries and provide quotations.</li>
                <li>
                  Deliver, manage and improve the services you have engaged us
                  for.
                </li>
                <li>
                  Send project updates, invoices and, where you have opted in,
                  marketing communications.
                </li>
                <li>
                  Analyse website traffic and user behaviour to improve site
                  performance and content.
                </li>
                <li>
                  Comply with legal obligations, resolve disputes and enforce our
                  agreements.
                </li>
              </ul>
            </div>

            {/* 4 */}
            <div>
              <h2>4. Legal Basis for Processing</h2>
              <p>We process personal data on the following grounds:</p>
              <ul>
                <li>
                  <strong>Consent</strong> — when you submit a form or accept
                  cookies.
                </li>
                <li>
                  <strong>Contract</strong> — to fulfil obligations under a
                  service agreement.
                </li>
                <li>
                  <strong>Legitimate interest</strong> — to improve our website,
                  prevent fraud and communicate relevant updates.
                </li>
                <li>
                  <strong>Legal obligation</strong> — to comply with applicable
                  Indian laws, including the Digital Personal Data Protection
                  Act, 2023 (DPDPA).
                </li>
              </ul>
            </div>

            {/* 5 */}
            <div>
              <h2>5. Sharing &amp; Disclosure</h2>
              <p>
                We do <strong>not</strong> sell your personal data. We may share
                information with:
              </p>
              <ul>
                <li>
                  <strong>Service providers</strong> — hosting, analytics,
                  payment processing and email delivery partners who act on our
                  behalf under confidentiality obligations.
                </li>
                <li>
                  <strong>Legal authorities</strong> — if required by law, court
                  order or government request.
                </li>
                <li>
                  <strong>Business transfers</strong> — in the event of a
                  merger, acquisition or asset sale, your data may be
                  transferred as part of the transaction.
                </li>
              </ul>
            </div>

            {/* 6 */}
            <div>
              <h2>6. Data Retention</h2>
              <p>
                We retain personal data only as long as reasonably necessary for
                the purposes described above, or as required by law. Contact
                form submissions and project records are typically retained for
                three (3) years after the end of the business relationship.
                Analytics data is retained in aggregated, anonymised form.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2>7. Cookies</h2>
              <p>Our website uses the following categories of cookies:</p>
              <ul>
                <li>
                  <strong>Essential cookies</strong> — required for the site to
                  function (e.g. session tokens).
                </li>
                <li>
                  <strong>Analytics cookies</strong> — used by Google Analytics
                  to understand how visitors interact with our site. These
                  cookies collect information anonymously.
                </li>
                <li>
                  <strong>Preference cookies</strong> — remember settings such
                  as your cookie consent choice.
                </li>
              </ul>
              <p>
                You can manage or delete cookies via your browser settings. Note
                that disabling certain cookies may affect site functionality.
              </p>
            </div>

            {/* 8 */}
            <div>
              <h2>8. Your Rights</h2>
              <p>
                Under the DPDPA and applicable regulations, you have the right
                to:
              </p>
              <ul>
                <li>
                  <strong>Access</strong> — request a copy of the personal data
                  we hold about you.
                </li>
                <li>
                  <strong>Correction</strong> — ask us to update inaccurate or
                  incomplete data.
                </li>
                <li>
                  <strong>Erasure</strong> — request deletion of your personal
                  data, subject to legal retention requirements.
                </li>
                <li>
                  <strong>Withdraw consent</strong> — opt out of marketing
                  communications at any time.
                </li>
                <li>
                  <strong>Grievance redressal</strong> — raise a complaint with
                  us or with the Data Protection Board of India.
                </li>
              </ul>
              <p>
                To exercise any of these rights, email us at{' '}
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-ink underline underline-offset-2 transition-colors hover:text-green"
                >
                  {SITE.email}
                </a>
                . We will respond within 30 days.
              </p>
            </div>

            {/* 9 */}
            <div>
              <h2>9. Data Security</h2>
              <p>
                We implement industry-standard technical and organisational
                measures — including HTTPS encryption, access controls and
                regular security reviews — to protect your personal data against
                unauthorised access, alteration, disclosure or destruction.
                However, no method of transmission over the internet is 100%
                secure, and we cannot guarantee absolute security.
              </p>
            </div>

            {/* 10 */}
            <div>
              <h2>10. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites (e.g.
                social media platforms). We are not responsible for the privacy
                practices of those sites and encourage you to review their
                policies independently.
              </p>
            </div>

            {/* 11 */}
            <div>
              <h2>11. Children&rsquo;s Privacy</h2>
              <p>
                Our services are not directed at individuals under 18. We do not
                knowingly collect personal data from children. If you believe a
                child has provided us with personal information, please contact
                us and we will promptly delete it.
              </p>
            </div>

            {/* 12 */}
            <div>
              <h2>12. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. Material
                changes will be posted on this page with a revised effective
                date. We encourage you to review this page periodically.
              </p>
            </div>

            {/* 13 */}
            <div>
              <h2>13. Contact Us</h2>
              <p>
                If you have questions or concerns about this policy, contact us:
              </p>
              <ul>
                <li>
                  <strong>Email:</strong>{' '}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-ink underline underline-offset-2 transition-colors hover:text-green"
                  >
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <strong>Phone:</strong>{' '}
                  <a
                    href={SITE.phoneHref}
                    className="text-ink underline underline-offset-2 transition-colors hover:text-green"
                  >
                    {SITE.phone}
                  </a>
                </li>
                <li>
                  <strong>Address:</strong> {SITE.address.line1},{' '}
                  {SITE.address.line2}, {SITE.address.city}
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
