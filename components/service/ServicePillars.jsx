'use client'

import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import Reveal, { RevealGroup, revealItem } from '@/components/ui/Reveal'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'

/**
 * Two presentations of the same four pillars.
 *
 * `grid` is the original 2x2 card block. `rows` stacks them as numbered
 * full-width rules, which reads more like a contents page — services pick
 * whichever suits, so the six pages stop looking like one template.
 */
export default function ServicePillars({ service }) {
  if (service.pillarsVariant === 'rows') return <PillarRows service={service} />

  return (
    <Section id="what" className="bg-panel">
      <div className="flex flex-col gap-4 md:flex-row md:gap-8 md:items-end md:justify-between">
        <Reveal className="max-w-[560px]">
          <Eyebrow>What we build</Eyebrow>
          <SectionTitle className="mt-7">
            <PillarHeading service={service} />
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

function PillarRows({ service }) {
  return (
    <Section id="what" className="bg-panel">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-4">
          <Eyebrow>What we build</Eyebrow>
          <SectionTitle className="mt-7">
            <PillarHeading service={service} />
          </SectionTitle>
          <Lede className="mt-6 max-w-[300px]">
            Most projects are one of these. If yours is a mix, the quotation
            says so rather than rounding it to the nearest package.
          </Lede>
        </Reveal>

        <RevealGroup className="md:col-span-8">
          {service.pillars.map((pillar, i) => (
            <motion.article
              key={pillar.title}
              variants={revealItem}
              className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-soft py-7 last:border-b md:gap-x-10"
            >
              <span className="text-[13px] font-medium text-quiet tabular-nums">
                0{i + 1}
              </span>
              <h3 className="text-[24px] leading-tight font-semibold tracking-[-0.045em] md:text-[30px]">
                {pillar.title}
              </h3>
              <p className="col-start-2 max-w-[520px] text-[15px] leading-[1.55] text-muted">
                {pillar.copy}
              </p>
            </motion.article>
          ))}
        </RevealGroup>
      </div>
    </Section>
  )
}

/**
 * Each service supplies its own [before, accent, after] heading. Six pages
 * sharing one H2 gave six different queries the same on-page signal.
 */
function PillarHeading({ service }) {
  const [before, accent, after] = service.pillarsTitle ?? [
    'Four ways this ',
    'lands',
    '.',
  ]
  return (
    <>
      {before}
      <Accent>{accent}</Accent>
      {after}
    </>
  )
}
