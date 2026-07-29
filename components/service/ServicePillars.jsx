'use client'

import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import Reveal, { RevealGroup, revealItem } from '@/components/ui/Reveal'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'

export default function ServicePillars({ service }) {
  return (
    <Section id="what" className="bg-panel">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-[560px]">
          <Eyebrow>What we build</Eyebrow>
          <SectionTitle className="mt-7">
            Four ways this <Accent>lands</Accent>.
          </SectionTitle>
        </Reveal>

        <Reveal delay={0.1} className="max-w-[330px]">
          <Lede>
            Most projects are one of these. If yours is a mix, the quotation
            says so rather than rounding it to the nearest package.
          </Lede>
        </Reveal>
      </div>

      <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-soft bg-soft md:grid-cols-2">
        {service.pillars.map((pillar, i) => (
          <motion.article
            key={pillar.title}
            variants={revealItem}
            className="flex flex-col gap-3 bg-bg p-7 lg:p-9"
          >
            <span className="text-[13px] font-medium text-quiet tabular-nums">
              0{i + 1}
            </span>
            <h3 className="text-[22px] leading-tight font-semibold tracking-[-0.04em] lg:text-[26px]">
              {pillar.title}
            </h3>
            <p className="text-[15px] leading-[1.5] text-muted">
              {pillar.copy}
            </p>
          </motion.article>
        ))}
      </RevealGroup>
    </Section>
  )
}
