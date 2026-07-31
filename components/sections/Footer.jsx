import { ArrowUpRight } from 'lucide-react'
import BackToTop from '@/components/ui/BackToTop'
import FooterWordmark from '@/components/ui/FooterWordmark'
import Logo from '@/components/ui/Logo'
import OfficeStatus from '@/components/ui/OfficeStatus'
import SectionLink from '@/components/ui/SectionLink'
import { SITE, SOCIALS } from '@/lib/site'

const COLUMNS = [
  {
    heading: 'Services',
    links: [
      { label: 'Website Development', href: '/services/website-development' },
      { label: 'UI/UX Design', href: '/services/ui-ux-design' },
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
      { label: 'Graphic Design', href: '/services/graphic-design' },
      { label: 'Social Media', href: '/services/social-media-management' },
      { label: 'E-commerce', href: '/services/ecommerce-development' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', hash: '#about' },
      { label: 'Work', hash: '#work' },
      { label: 'Design gallery', hash: '#design' },
      { label: 'Clients', hash: '#clients' },
      { label: 'How we work', hash: '#process' },
      { label: 'Careers', hash: '#careers' },
      { label: 'Pricing', href: '/quote' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Elsewhere',
    links: SOCIALS.map(({ label, href }) => ({ label, href, external: true })),
  },
]

const LEGAL = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Cookie Policy', href: '#' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="mx-auto w-full max-w-[1200px] px-6 pt-20 md:px-9 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            {/* The footer is bg-ink throughout, so every mark below is
                reversed. */}
            <a href="/" aria-label="ITBIZONE — home" className="inline-flex">
              <Logo reversed alt="" className="h-[34px] w-auto md:h-[44px]" />
            </a>

            <p className="mt-6 max-w-[320px] text-[15px] leading-[1.5] text-white/55">
              {SITE.tagline} Based in Bengaluru, working with businesses
              everywhere.
            </p>

            <a
              href={`mailto:${SITE.email}`}
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-white/10"
            >
              {SITE.email}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <dl className="mt-10 grid gap-5 text-[13px] leading-[1.6] sm:grid-cols-2">
              <div>
                <dt className="font-medium text-white/40">Studio</dt>
                <dd className="mt-1.5 text-white/60">
                  {SITE.address.line1}
                  <br />
                  {SITE.address.line2}
                  <br />
                  {SITE.address.city}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-white/40">Reach us</dt>
                <dd className="mt-1.5 text-white/60">
                  <a
                    href={SITE.phoneHref}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {SITE.phone}
                  </a>
                  <br />
                  {SITE.hours}
                </dd>
              </div>
            </dl>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-3">
            {COLUMNS.map((column) => (
              <nav key={column.heading} className="flex flex-col gap-4">
                <h3 className="text-[13px] font-medium text-white/40">
                  {column.heading}
                </h3>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => {
                    const style =
                      'group inline-flex items-center gap-1 text-[15px] font-medium text-white/75 transition-colors duration-200 hover:text-white'

                    // Hash links resolve against the current route, so they go
                    // through SectionLink; real routes stay plain anchors.
                    return (
                      <li key={link.label}>
                        {link.hash ? (
                          <SectionLink hash={link.hash} className={style}>
                            {link.label}
                          </SectionLink>
                        ) : (
                          <a
                            href={link.href}
                            {...(link.external && {
                              target: '_blank',
                              rel: 'noopener noreferrer',
                            })}
                            className={style}
                          >
                            {link.label}
                            {link.external && (
                              <ArrowUpRight
                                size={13}
                                className="text-white/30 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/70"
                              />
                            )}
                          </a>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between md:mt-20">
          <OfficeStatus />
          <BackToTop />
        </div>
      </div>

      {/* The signature: full-bleed wordmark, set tight enough that the footer
          edge crops it. Low contrast so it reads as ground, not a headline —
          until the cursor lights it. */}
      <FooterWordmark />

      <div className="mx-auto w-full max-w-[1200px] px-6 pt-10 pb-10 md:px-9">
        <div className="flex flex-col gap-4 border-t border-white/10 pt-7 text-[13px] text-white/45 md:flex-row md:items-center md:justify-between">
          {/* Explicit {' '} — a wrapped JSX text node loses its leading space. */}
          <p>
            &copy; {new Date().getFullYear()}{' '}
            {SITE.legalName} &mdash; All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LEGAL.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="transition-colors duration-200 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
