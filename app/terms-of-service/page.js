import { ChevronRight } from 'lucide-react'
import { Accent } from '@/components/ui/Type'
import { SITE, SITE_URL } from '@/lib/site'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata = {
  title: `Terms of Service — ${SITE.name}`,
  description: `Terms and conditions governing the use of ${SITE.name}'s website and services. Last updated July 2026.`,
  alternates: { canonical: '/terms-of-service' },
}

const EFFECTIVE_DATE = '30 July 2026'

export default function TermsOfServicePage() {
  const schema = [
    breadcrumbSchema([
      { name: 'Terms of Service', path: '/terms-of-service' },
    ]),
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
            <span className="text-muted">Terms of Service</span>
          </nav>

          <h1 className="mt-8 max-w-[820px] text-[clamp(40px,11vw,50px)] leading-[1.04] font-semibold tracking-[-0.065em] md:text-[clamp(58px,7.5vw,74px)] lg:text-[84px]">
            Terms of <Accent>Service</Accent>
          </h1>

          <p className="mt-7 max-w-[520px] text-[17px] leading-[1.45] text-muted">
            Please read these terms carefully before using our website or
            engaging our services. By accessing this site, you agree to be bound
            by these terms.
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
              <h2>1. Definitions</h2>
              <ul>
                <li>
                  <strong>&ldquo;Company&rdquo;</strong>,{' '}
                  <strong>&ldquo;we&rdquo;</strong>,{' '}
                  <strong>&ldquo;us&rdquo;</strong>,{' '}
                  <strong>&ldquo;our&rdquo;</strong> refers to{' '}
                  {SITE.legalName}, a company incorporated under the laws of
                  India.
                </li>
                <li>
                  <strong>&ldquo;Client&rdquo;</strong>,{' '}
                  <strong>&ldquo;you&rdquo;</strong>,{' '}
                  <strong>&ldquo;your&rdquo;</strong> refers to the individual
                  or entity accessing our website or engaging our services.
                </li>
                <li>
                  <strong>&ldquo;Services&rdquo;</strong> refers to website
                  development, UI/UX design, digital marketing, graphic design,
                  social media management, e-commerce development, and any other
                  services offered by {SITE.name}.
                </li>
                <li>
                  <strong>&ldquo;Website&rdquo;</strong> refers to{' '}
                  <a
                    href={SITE_URL}
                    className="text-ink underline underline-offset-2 transition-colors hover:text-green"
                  >
                    {SITE_URL.replace(/^https?:\/\//, '')}
                  </a>
                  .
                </li>
                <li>
                  <strong>&ldquo;Deliverables&rdquo;</strong> refers to any
                  work product, including but not limited to designs, code,
                  copy, graphics and documentation, produced by us under a
                  service agreement.
                </li>
              </ul>
            </div>

            {/* 2 */}
            <div>
              <h2>2. Acceptance of Terms</h2>
              <p>
                By accessing or using our website and services, you acknowledge
                that you have read, understood and agree to be bound by these
                Terms of Service and our{' '}
                <a
                  href="/privacy-policy"
                  className="text-ink underline underline-offset-2 transition-colors hover:text-green"
                >
                  Privacy Policy
                </a>
                . If you do not agree, please do not use our website or
                services.
              </p>
            </div>

            {/* 3 */}
            <div>
              <h2>3. Services</h2>
              <p>
                We provide digital services including, but not limited to,
                website development, UI/UX design, digital marketing, graphic
                design, social media management and e-commerce development.
              </p>
              <p>
                The specific scope, timeline and pricing for each engagement
                will be set out in a separate proposal or service agreement
                (&ldquo;SOW&rdquo;). In case of conflict between these Terms
                and an SOW, the SOW will prevail for that engagement.
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2>4. Quotations &amp; Payments</h2>
              <h3>a) Quotations</h3>
              <p>
                All quotations are valid for fifteen (15) calendar days from the
                date of issue unless otherwise stated. Prices are quoted in
                Indian Rupees (INR) and are exclusive of applicable taxes
                (GST).
              </p>

              <h3>b) Payment terms</h3>
              <ul>
                <li>
                  A non-refundable advance of 50% of the total project cost is
                  required before work begins, unless otherwise agreed in
                  writing.
                </li>
                <li>
                  The remaining balance is payable upon project completion and
                  before final deliverables are handed over.
                </li>
                <li>
                  For retainer or subscription-based services, invoices are
                  raised monthly in advance and payable within seven (7) days.
                </li>
              </ul>

              <h3>c) Late payments</h3>
              <p>
                Invoices overdue by more than fifteen (15) days may incur an
                interest charge of 1.5% per month. We reserve the right to
                suspend work until outstanding payments are settled.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2>5. Intellectual Property</h2>
              <h3>a) Ownership</h3>
              <p>
                Upon full payment, all intellectual property rights in the
                deliverables produced specifically for your project are assigned
                to you. Pre-existing tools, frameworks, libraries and
                reusable code components remain our property or the property of
                their respective licensors.
              </p>

              <h3>b) Portfolio rights</h3>
              <p>
                We retain the right to display completed work in our portfolio,
                case studies and marketing materials, unless you have requested
                otherwise in writing prior to project commencement.
              </p>

              <h3>c) Open-source &amp; third-party licences</h3>
              <p>
                Deliverables may incorporate open-source software and
                third-party assets. These components remain subject to their
                original licences, which we will disclose upon request.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2>6. Client Responsibilities</h2>
              <p>You agree to:</p>
              <ul>
                <li>
                  Provide timely and accurate content, assets and feedback as
                  reasonably required to execute the project.
                </li>
                <li>
                  Designate a single point of contact authorised to approve
                  deliverables and make decisions on your behalf.
                </li>
                <li>
                  Review deliverables and provide feedback within five (5)
                  business days of each review milestone. Delays in feedback may
                  result in corresponding delays in the project timeline.
                </li>
                <li>
                  Ensure that all content you provide does not infringe upon
                  the intellectual property or other rights of third parties.
                </li>
              </ul>
            </div>

            {/* 7 */}
            <div>
              <h2>7. Revisions &amp; Change Requests</h2>
              <p>
                Each engagement includes a defined number of revision rounds as
                specified in the SOW. Additional revisions or scope changes
                (&ldquo;change requests&rdquo;) will be quoted separately and
                billed at our prevailing rates.
              </p>
            </div>

            {/* 8 */}
            <div>
              <h2>8. Project Timelines</h2>
              <p>
                We will make reasonable efforts to meet agreed timelines.
                However, timelines are estimates and may be affected by factors
                beyond our control, including delayed feedback, incomplete
                content, scope changes or third-party dependencies. We will
                communicate any anticipated delays promptly.
              </p>
            </div>

            {/* 9 */}
            <div>
              <h2>9. Warranties &amp; Disclaimers</h2>
              <h3>a) Our warranty</h3>
              <p>
                We warrant that all services will be performed in a
                professional and workmanlike manner consistent with industry
                standards. For website development projects, we provide a thirty
                (30) day bug-fix warranty from the date of final delivery.
              </p>

              <h3>b) Disclaimer</h3>
              <p>
                Except as expressly stated above, all services and deliverables
                are provided &ldquo;as is&rdquo; without warranties of any
                kind, whether express or implied, including but not limited to
                implied warranties of merchantability, fitness for a particular
                purpose or non-infringement.
              </p>
              <p>
                We do not guarantee specific business results, search engine
                rankings, traffic volumes or conversion rates.
              </p>
            </div>

            {/* 10 */}
            <div>
              <h2>10. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, our total aggregate
                liability arising out of or relating to these Terms or any
                engagement shall not exceed the total fees paid by you for the
                specific service giving rise to the claim.
              </p>
              <p>
                In no event shall we be liable for any indirect, incidental,
                special, consequential or punitive damages, including lost
                profits, data loss or business interruption, whether based on
                warranty, contract, tort or any other legal theory.
              </p>
            </div>

            {/* 11 */}
            <div>
              <h2>11. Termination</h2>
              <h3>a) By you</h3>
              <p>
                You may terminate an engagement by providing fifteen (15) days
                written notice. You shall be liable for payment for all work
                completed up to the date of termination. The advance payment is
                non-refundable.
              </p>

              <h3>b) By us</h3>
              <p>
                We may terminate an engagement if you breach these Terms, fail
                to make payments when due, or if continuation becomes
                impracticable. We will provide fifteen (15) days written notice
                where reasonably possible.
              </p>

              <h3>c) Effect of termination</h3>
              <p>
                Upon termination, we will deliver all completed work for which
                payment has been received. Sections relating to intellectual
                property, confidentiality, limitation of liability and governing
                law survive termination.
              </p>
            </div>

            {/* 12 */}
            <div>
              <h2>12. Confidentiality</h2>
              <p>
                Both parties agree to keep confidential any proprietary or
                sensitive business information disclosed during the engagement.
                This obligation does not apply to information that is publicly
                available, independently developed, or disclosed under legal
                compulsion.
              </p>
            </div>

            {/* 13 */}
            <div>
              <h2>13. Indemnification</h2>
              <p>
                You agree to indemnify and hold us harmless from any claims,
                damages, losses or expenses (including legal fees) arising from:
              </p>
              <ul>
                <li>Content or materials you provide that infringe third-party rights.</li>
                <li>Your use of the deliverables in a manner not authorised by us.</li>
                <li>Your breach of these Terms.</li>
              </ul>
            </div>

            {/* 14 */}
            <div>
              <h2>14. Force Majeure</h2>
              <p>
                Neither party shall be liable for delays or failures in
                performance resulting from events beyond reasonable control,
                including natural disasters, pandemics, government actions, power
                outages, internet disruptions or civil unrest.
              </p>
            </div>

            {/* 15 */}
            <div>
              <h2>15. Website Use</h2>
              <h3>a) Acceptable use</h3>
              <p>You agree not to:</p>
              <ul>
                <li>
                  Use the website in any way that violates applicable laws or
                  regulations.
                </li>
                <li>
                  Attempt to gain unauthorised access to any part of the
                  website, server or database.
                </li>
                <li>
                  Use automated tools to scrape, crawl or extract data from the
                  website without our written permission.
                </li>
                <li>
                  Transmit any harmful code, viruses or other malicious content.
                </li>
              </ul>

              <h3>b) Availability</h3>
              <p>
                We strive to keep the website available at all times but do not
                guarantee uninterrupted access. We may suspend or restrict
                access for maintenance, updates or security reasons without
                prior notice.
              </p>
            </div>

            {/* 16 */}
            <div>
              <h2>16. Governing Law &amp; Jurisdiction</h2>
              <p>
                These Terms are governed by and construed in accordance with
                the laws of India. Any disputes arising from these Terms shall
                be subject to the exclusive jurisdiction of the courts in
                Bengaluru, Karnataka, India.
              </p>
            </div>

            {/* 17 */}
            <div>
              <h2>17. Severability</h2>
              <p>
                If any provision of these Terms is held to be invalid or
                unenforceable, the remaining provisions shall continue in full
                force and effect.
              </p>
            </div>

            {/* 18 */}
            <div>
              <h2>18. Amendments</h2>
              <p>
                We reserve the right to update these Terms at any time. Material
                changes will be posted on this page with a revised effective
                date. Your continued use of our website or services after such
                changes constitutes acceptance of the updated Terms.
              </p>
            </div>

            {/* 19 */}
            <div>
              <h2>19. Contact Us</h2>
              <p>
                If you have questions about these Terms, please contact us:
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
