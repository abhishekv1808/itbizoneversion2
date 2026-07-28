'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import Reveal, { RevealGroup, revealItem } from '@/components/ui/Reveal'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'

const ROLES = [
  { title: 'Senior Product Designer', team: 'Design', type: 'Full-time', place: 'Remote (CET ±3)' },
  { title: 'Front-End Engineer', team: 'Engineering', type: 'Full-time', place: 'Lisbon / Remote' },
  { title: 'Motion Designer', team: 'Motion & 3D', type: 'Contract', place: 'Remote' },
  { title: 'Studio Producer', team: 'Operations', type: 'Full-time', place: 'Lisbon' },
]

export default function Careers() {
  return (
    <Section id="careers" className="bg-panel">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-[560px]">
          <Eyebrow>Careers</Eyebrow>
          <SectionTitle className="mt-7">
            Come build <Accent>with us</Accent>.
          </SectionTitle>
          <Lede className="mt-6 max-w-[430px]">
            Four open roles. We read every application ourselves and reply
            either way, usually within a week.
          </Lede>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="inline-flex items-center gap-2 rounded-full border border-soft bg-bg px-4 py-2 text-[13px] font-medium text-muted">
            <span className="size-2 rounded-full bg-dot" />
            Hiring now
          </span>
        </Reveal>
      </div>

      <RevealGroup className="mt-12 border-t border-soft">
        {ROLES.map((role) => (
          <motion.a
            key={role.title}
            href="#contact"
            variants={revealItem}
            className="group flex flex-col gap-3 border-b border-soft py-6 md:flex-row md:items-center md:justify-between md:gap-8"
          >
            <span className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-4">
              <span className="text-[21px] leading-tight font-semibold tracking-[-0.04em] transition-transform duration-300 group-hover:translate-x-1 md:text-[26px]">
                {role.title}
              </span>
              <span className="text-[13px] font-medium text-quiet">
                {role.team}
              </span>
            </span>

            <span className="flex items-center gap-3">
              <span className="rounded-full border border-soft px-3 py-1.5 text-[13px] font-medium text-muted">
                {role.type}
              </span>
              <span className="text-[13px] text-muted">{role.place}</span>
              <ArrowUpRight
                size={18}
                className="text-quiet transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
              />
            </span>
          </motion.a>
        ))}
      </RevealGroup>

      <Reveal delay={0.1} className="mt-8">
        <Lede className="text-[15px]">
          Nothing matching?{' '}
          <a href="#contact" className="font-medium text-ink underline underline-offset-4">
            Send an open application
          </a>{' '}
          — we keep a short list.
        </Lede>
      </Reveal>
    </Section>
  )
}
