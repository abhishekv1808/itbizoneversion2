'use client'

import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import Reveal, { RevealGroup, revealItem } from '@/components/ui/Reveal'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'

const INDUSTRIES = [
  { name: 'Fintech', count: 41 },
  { name: 'SaaS & Developer Tools', count: 58 },
  { name: 'Healthcare', count: 22 },
  { name: 'Consumer Retail', count: 34 },
  { name: 'Education', count: 19 },
  { name: 'Climate & Energy', count: 16 },
  { name: 'Media & Entertainment', count: 27 },
  { name: 'Hospitality', count: 14 },
  { name: 'Logistics', count: 12 },
]

export default function Industries() {
  return (
    <Section id="industries">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-5">
          <Eyebrow>Industries</Eyebrow>
          <SectionTitle className="mt-7">
            Fluent in <Accent>your</Accent> category.
          </SectionTitle>
          <Lede className="mt-6 max-w-[400px]">
            Category fluency shortens everything. We arrive knowing the
            compliance edges, the buyer, and what your competitors already
            taught the market to expect.
          </Lede>
        </Reveal>

        <RevealGroup
          className="flex flex-wrap content-start gap-2.5 md:col-span-7 md:pt-3"
          stagger={0.05}
        >
          {INDUSTRIES.map((industry) => (
            <motion.button
              key={industry.name}
              variants={revealItem}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="group inline-flex items-center gap-2.5 rounded-full border border-soft bg-bg px-5 py-3 text-[15px] font-medium transition-colors duration-300 hover:border-ink/20 hover:bg-chip"
            >
              {industry.name}
              <span className="text-[13px] text-quiet tabular-nums transition-colors duration-300 group-hover:text-muted">
                {industry.count}
              </span>
            </motion.button>
          ))}
        </RevealGroup>
      </div>
    </Section>
  )
}
