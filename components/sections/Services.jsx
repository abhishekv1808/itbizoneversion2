'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import Reveal, { RevealGroup, revealItem } from '@/components/ui/Reveal'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'

const SERVICES = [
  {
    id: '01',
    title: 'Brand Identity',
    copy: 'Naming, marks, type systems and the guidelines that keep them intact once the team grows.',
    tags: ['Positioning', 'Identity', 'Guidelines'],
  },
  {
    id: '02',
    title: 'Product Design',
    copy: 'End-to-end interface work — flows, design systems, and the unglamorous states most decks skip.',
    tags: ['UX', 'Design systems', 'Prototyping'],
  },
  {
    id: '03',
    title: 'App Development',
    copy: 'Production front-ends in React and Next.js, built to the same tolerance as the design files.',
    tags: ['Next.js', 'React', 'Headless CMS'],
  },
  {
    id: '04',
    title: 'Creative Video',
    copy: 'Launch films, product walkthroughs and social cutdowns, directed and edited in-house.',
    tags: ['Direction', 'Edit', 'Sound'],
  },
  {
    id: '05',
    title: 'Iconography',
    copy: 'Drawn-to-grid icon sets and pictograms that hold up at 16px and on a billboard.',
    tags: ['Icon sets', 'Pictograms', 'Grids'],
  },
  {
    id: '06',
    title: 'Motion & 3D',
    copy: 'WebGL scenes, interface motion and rendered assets that stay light enough to ship.',
    tags: ['WebGL', 'UI motion', 'Render'],
  },
]

export default function Services() {
  return (
    <Section id="services" className="bg-panel">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-[620px]">
          <Eyebrow>What we do</Eyebrow>
          <SectionTitle className="mt-7">
            Six disciplines, <Accent>one</Accent> team.
          </SectionTitle>
        </Reveal>

        <Reveal delay={0.1} className="max-w-[380px]">
          <Lede>
            Engage one discipline or the whole stack. Most partners start with a
            single track and widen once the cadence clicks.
          </Lede>
        </Reveal>
      </div>

      <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-soft bg-soft md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <motion.article
            key={service.id}
            variants={revealItem}
            className="group flex flex-col gap-4 bg-bg p-7 transition-colors duration-300 hover:bg-chip lg:p-8"
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
              {service.title}
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
