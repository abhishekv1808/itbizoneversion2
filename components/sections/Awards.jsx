'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import Reveal, { RevealGroup, revealItem } from '@/components/ui/Reveal'
import { Accent, Eyebrow, SectionTitle } from '@/components/ui/Type'

const AWARDS = [
  { year: '2025', title: 'Site of the Year', org: 'Awwwards', category: 'Brand' },
  { year: '2025', title: 'Wood Pencil', org: 'D&AD', category: 'Identity' },
  { year: '2024', title: 'Webby Winner', org: 'The Webbys', category: 'Product' },
  { year: '2024', title: 'FWA of the Day', org: 'FWA', category: 'Interactive' },
  { year: '2023', title: 'Certificate of Excellence', org: 'Type Directors Club', category: 'Typography' },
  { year: '2023', title: 'Brand Design Award', org: 'Red Dot', category: 'Identity' },
]

export default function Awards() {
  return (
    <Section id="awards" className="bg-panel">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <Eyebrow>Recognition</Eyebrow>
          <SectionTitle className="mt-7">
            The work, <Accent>acknowledged</Accent>.
          </SectionTitle>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="text-sm font-medium text-muted">
            18 awards since 2019
          </span>
        </Reveal>
      </div>

      <RevealGroup className="mt-12 border-t border-soft">
        {AWARDS.map((award) => (
          <motion.a
            key={`${award.year}-${award.title}`}
            href="#"
            variants={revealItem}
            className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 border-b border-soft py-6 md:grid-cols-[80px_1fr_1fr_auto] md:gap-x-8"
          >
            <span className="text-sm font-medium text-quiet tabular-nums">
              {award.year}
            </span>

            <span className="text-[20px] leading-tight font-semibold tracking-[-0.04em] transition-transform duration-300 group-hover:translate-x-1 md:text-[26px]">
              {award.title}
            </span>

            <span className="col-start-2 text-sm text-muted md:col-start-3 md:text-right">
              {award.org} — {award.category}
            </span>

            <ArrowUpRight
              size={18}
              className="col-start-3 row-start-1 text-quiet transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink md:col-start-4"
            />
          </motion.a>
        ))}
      </RevealGroup>
    </Section>
  )
}
