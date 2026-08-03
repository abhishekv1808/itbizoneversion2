'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import Reveal, { RevealGroup, revealItem } from '@/components/ui/Reveal'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'

// Each of these is a commitment already published in the ITBIZONE terms —
// nothing here is a claim the company hasn't made in writing.
const REASONS = [
  {
    title: 'You own what you paid for',
    copy: 'On final payment, every design, line of code and asset made for your project transfers to you outright.',
  },
  {
    title: 'Quotations that hold',
    copy: 'Written, itemised, and valid for 30 days. Scope changes get priced and approved before anyone starts them.',
  },
  {
    title: 'Fixed 50/50 terms',
    copy: 'Half to begin, half on delivery. No hourly drift, no invoices you did not see coming.',
  },
  {
    title: 'Corrected free for 30 days',
    copy: 'Anything defective in our work gets fixed at no charge for a month after delivery.',
  },
  {
    title: 'Your information stays yours',
    copy: 'Confidentiality runs both ways, and we will keep a project off our portfolio if you ask.',
  },
  {
    title: 'One team, six services',
    copy: 'The people building the site are the people running the campaigns. Nothing gets lost between vendors.',
  },
]

export default function WhyUs() {
  return (
    <Section id="why" className="bg-panel">
      <div className="flex flex-col gap-4 md:flex-row md:gap-8 md:items-end md:justify-between">
        <Reveal className="max-w-[560px]">
          <Eyebrow>Why ITBIZONE</Eyebrow>
          <SectionTitle className="mt-7">
            Put it in <Accent>writing</Accent>.
          </SectionTitle>
          <Lede className="mt-6 max-w-[440px]">
            Most of what goes wrong in an agency relationship is a term nobody
            agreed on up front. So we agree on all of them up front.
          </Lede>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-soft bg-bg px-5 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-chip"
          >
            Start a conversation
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </Reveal>
      </div>

      <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-soft bg-soft md:grid-cols-2 lg:grid-cols-3">
        {REASONS.map((reason, i) => (
          <motion.div
            key={reason.title}
            variants={revealItem}
            className="flex flex-col gap-3 bg-bg p-7 lg:p-8"
          >
            <span className="text-[13px] font-medium text-quiet tabular-nums">
              0{i + 1}
            </span>
            <h3 className="text-[19px] leading-tight font-semibold tracking-[-0.04em]">
              {reason.title}
            </h3>
            <p className="text-[15px] leading-[1.5] text-muted">
              {reason.copy}
            </p>
          </motion.div>
        ))}
      </RevealGroup>
    </Section>
  )
}
