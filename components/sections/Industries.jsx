'use client'

import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import Reveal, { RevealGroup, revealItem } from '@/components/ui/Reveal'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'

const INDUSTRIES = [
  'Retail & E-commerce',
  'Real Estate',
  'Healthcare & Clinics',
  'Education & EdTech',
  'Manufacturing',
  'Logistics',
  'Hospitality & Restaurants',
  'Professional Services',
  'Fintech',
  'Travel & Tourism',
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
            Knowing the category shortens everything. We arrive already
            understanding who buys from you, what your competitors have
            trained the market to expect, and which regulations apply.
          </Lede>
        </Reveal>

        <RevealGroup
          className="flex flex-wrap content-start gap-2.5 md:col-span-7 md:pt-3"
          stagger={0.05}
        >
          {INDUSTRIES.map((industry) => (
            <motion.span
              key={industry}
              variants={revealItem}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center rounded-full border border-soft bg-bg px-5 py-3 text-[15px] font-medium transition-colors duration-300 hover:border-ink/20 hover:bg-chip"
            >
              {industry}
            </motion.span>
          ))}
        </RevealGroup>
      </div>
    </Section>
  )
}
