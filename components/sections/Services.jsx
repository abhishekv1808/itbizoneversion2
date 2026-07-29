'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import Reveal, { RevealGroup, revealItem } from '@/components/ui/Reveal'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'

// The four headline services carried over from itbizone.com, plus the two
// lines the v1 pricing engine already quoted separately.
const SERVICES = [
  {
    id: '01',
    title: 'Website Development',
    copy: 'Custom sites and web applications — built responsive, fast, and structured so search engines can actually read them.',
    tags: ['Custom builds', 'CMS', 'Web apps'],
    href: '/services/website-development',
  },
  {
    id: '02',
    title: 'UI/UX Design',
    copy: 'Research, flows and interface design that decide what the product does before anyone argues about what it looks like.',
    tags: ['User flows', 'Wireframes', 'Prototypes'],
  },
  {
    id: '03',
    title: 'Digital Marketing',
    copy: 'SEO, Google Ads and paid social run against tracked numbers — leads and conversions, not impressions.',
    tags: ['SEO', 'Google Ads', 'PPC'],
  },
  {
    id: '04',
    title: 'Graphic Design',
    copy: 'Logos, brand identity, print and packaging, with the guidelines that keep it all consistent once your team grows.',
    tags: ['Identity', 'Print', 'Packaging'],
    href: '/services/graphic-design',
  },
  {
    id: '05',
    title: 'Social Media Management',
    copy: 'Strategy, content calendars and community management, reported monthly against growth and engagement.',
    tags: ['Content', 'Campaigns', 'Reporting'],
    href: '/services/social-media-management',
  },
  {
    id: '06',
    title: 'E-commerce Development',
    copy: 'Storefronts with payment gateways, inventory and analytics wired in — from first catalogue to checkout.',
    tags: ['Storefronts', 'Payments', 'Inventory'],
  },
]

export default function Services() {
  return (
    <Section id="services" className="bg-panel">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-[620px]">
          <Eyebrow>What we do</Eyebrow>
          <SectionTitle className="mt-7">
            Six services, <Accent>one</Accent> team.
          </SectionTitle>
        </Reveal>

        <Reveal delay={0.1} className="max-w-[380px]">
          <Lede>
            Take one service or the whole stack. Most clients start with a
            website and widen once they see the first month of numbers.
          </Lede>
        </Reveal>
      </div>

      <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-soft bg-soft md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          // Cards become links only once that service has a page — the rest
          // stay inert rather than promising a route that 404s.
          <motion.article
            key={service.id}
            variants={revealItem}
            className="group relative flex flex-col gap-4 bg-bg p-7 transition-colors duration-300 hover:bg-chip lg:p-8"
          >
            <div className="flex items-start justify-between">
              <span className="text-[13px] font-medium text-quiet tabular-nums">
                {service.id}
              </span>
              <ArrowUpRight
                size={18}
                className="text-quiet transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
              />
            </div>

            <h3 className="text-[26px] leading-tight font-semibold tracking-[-0.045em]">
              {service.href ? (
                // Stretched link: the whole card is clickable, but only the
                // title is in the tab order and read out as the link text.
                <a href={service.href} className="after:absolute after:inset-0">
                  {service.title}
                </a>
              ) : (
                service.title
              )}
            </h3>

            <p className="text-[15px] leading-[1.5] text-muted">
              {service.copy}
            </p>

            <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-soft px-2.5 py-1 text-xs font-medium text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </RevealGroup>
    </Section>
  )
}
