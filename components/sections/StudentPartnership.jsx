'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, GraduationCap } from 'lucide-react'
import Section from '@/components/ui/Section'
import Reveal, { RevealGroup, revealItem } from '@/components/ui/Reveal'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'

const PILLARS = [
  {
    title: 'Paid, not "exposure"',
    copy: 'Every placement is compensated at the studio rate for the hours worked. No portfolio-only arrangements.',
  },
  {
    title: 'Real client work',
    copy: 'Students ship inside live engagements with a named mentor reviewing every deliverable.',
  },
  {
    title: 'A finished case study',
    copy: 'You leave with one deep, publishable project instead of six half-briefs nobody can verify.',
  },
]

const PARTNERS = [
  'Central Saint Martins',
  'RISD',
  'NID Ahmedabad',
  'Aalto ARTS',
  'ArtCenter',
]

export default function StudentPartnership() {
  return (
    <Section id="academy">
      <div className="grid gap-12 md:grid-cols-12 md:gap-14">
        <Reveal className="md:col-span-5">
          <Eyebrow>Alwayzz Academy</Eyebrow>
          <SectionTitle className="mt-7">
            A studio seat for <Accent>students</Accent>.
          </SectionTitle>
          <Lede className="mt-6 max-w-[420px]">
            Two placements per term, six months each, built with design
            programmes that want their students touching production work before
            they graduate.
          </Lede>

          <div className="mt-8 flex flex-wrap gap-3">
            <motion.a
              href="#contact"
              whileHover={{ y: -1, boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}
              whileTap={{ scale: 0.985 }}
              className="inline-flex h-13 items-center gap-2 rounded-full bg-ink px-7 text-[15px] font-semibold text-white"
            >
              Apply for a placement
              <ArrowUpRight size={16} />
            </motion.a>
            <a
              href="#contact"
              className="inline-flex h-13 items-center rounded-full border border-soft px-7 text-[15px] font-semibold transition-colors duration-300 hover:bg-chip"
            >
              Partner your programme
            </a>
          </div>
        </Reveal>

        <div className="md:col-span-7">
          <RevealGroup className="grid gap-px overflow-hidden rounded-3xl border border-soft bg-soft">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                variants={revealItem}
                className="flex items-start gap-5 bg-bg p-7 lg:p-8"
              >
                <span className="mt-0.5 text-[13px] font-medium text-quiet tabular-nums">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-[19px] leading-tight font-semibold tracking-[-0.04em]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.5] text-muted">
                    {pillar.copy}
                  </p>
                </div>
              </motion.div>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-muted">
              <GraduationCap size={15} />
              Partner programmes
            </span>
            {PARTNERS.map((partner) => (
              <span
                key={partner}
                className="rounded-full border border-soft px-3 py-1.5 text-[13px] font-medium text-muted"
              >
                {partner}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
