'use client'

import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import Reveal, { RevealGroup, revealItem } from '@/components/ui/Reveal'
import { Accent, Eyebrow, SectionTitle } from '@/components/ui/Type'

// Mirrors the engagement terms published on itbizone.com — quotation,
// 50/50 payment split, and the 30-day post-delivery correction window.
const STEPS = [
  {
    id: '01',
    title: 'Brief & quotation',
    detail: 'We scope the work and send a written quotation, valid 30 days.',
  },
  {
    id: '02',
    title: 'Kickoff',
    detail: 'Signed agreement and 50% advance. The timeline starts here.',
  },
  {
    id: '03',
    title: 'Design & build',
    detail: 'You review at every milestone. Scope changes are priced in writing first.',
  },
  {
    id: '04',
    title: 'Launch',
    detail: 'Balance on delivery. Full ownership of the deliverables transfers to you.',
  },
  {
    id: '05',
    title: 'Support',
    detail: 'Anything defective gets corrected free for 30 days after delivery.',
  },
]

export default function Process() {
  return (
    <Section id="process" className="bg-panel">
      <div className="flex flex-col gap-4 md:flex-row md:gap-8 md:items-end md:justify-between">
        <Reveal>
          <Eyebrow>How we work</Eyebrow>
          <SectionTitle className="mt-7">
            No surprises, <Accent>ever</Accent>.
          </SectionTitle>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="text-sm font-medium text-muted">
            Five steps, priced up front
          </span>
        </Reveal>
      </div>

      <RevealGroup className="mt-12 border-t border-soft">
        {STEPS.map((step) => (
          <motion.div
            key={step.id}
            variants={revealItem}
            className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-1 border-b border-soft py-6 md:grid-cols-[80px_1fr_1fr] md:gap-x-8"
          >
            <span className="text-sm font-medium text-quiet tabular-nums">
              {step.id}
            </span>

            <span className="text-[20px] leading-tight font-semibold tracking-[-0.04em] md:text-[26px]">
              {step.title}
            </span>

            <span className="col-start-2 text-sm text-muted md:col-start-3 md:text-right">
              {step.detail}
            </span>
          </motion.div>
        ))}
      </RevealGroup>
    </Section>
  )
}
