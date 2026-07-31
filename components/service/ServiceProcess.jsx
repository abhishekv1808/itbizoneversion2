'use client'

import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import Reveal, { RevealGroup, revealItem } from '@/components/ui/Reveal'
import { Accent, Eyebrow, SectionTitle } from '@/components/ui/Type'
import { TOOL_LOGOS } from '@/lib/techLogos'

export default function ServiceProcess({ service }) {
  return (
    <Section id="how" className="bg-panel">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <Eyebrow>How it runs</Eyebrow>
          <SectionTitle className="mt-7">
            Four stages, <Accent>no surprises</Accent>.
          </SectionTitle>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="text-sm font-medium text-muted">
            {service.duration}
          </span>
        </Reveal>
      </div>

      <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-soft bg-soft md:grid-cols-2 lg:grid-cols-4">
        {service.process.map((step, i) => (
          <motion.div
            key={step.title}
            variants={revealItem}
            className="flex flex-col gap-3 bg-bg p-7"
          >
            <span className="text-[13px] font-medium text-quiet tabular-nums">
              0{i + 1}
            </span>
            <h3 className="text-[19px] leading-tight font-semibold tracking-[-0.04em]">
              {step.title}
            </h3>
            <p className="text-[15px] leading-[1.5] text-muted">{step.copy}</p>
          </motion.div>
        ))}
      </RevealGroup>

      <Reveal delay={0.15} className="mt-12">
        <h3 className="text-[13px] font-medium text-quiet">
          {service.stackLabel}
        </h3>
        {/*
          The vendor's own mark where one is licensed, the name alone where it
          is not. Adobe and Amazon had their glyphs withdrawn from
          simple-icons at their own request, so Illustrator, Photoshop,
          InDesign, After Effects and AWS are wordmarks by necessity rather
          than by choice — hand-tracing a replacement would be passing off an
          imitation as the vendor's mark.
        */}
        <ul className="mt-5 flex flex-wrap gap-2">
          {service.stack.map((tool) => {
            const logo = TOOL_LOGOS[tool]

            return (
              <li
                key={tool}
                className="inline-flex items-center gap-2 rounded-full border border-soft bg-bg py-2 pr-4 pl-3 text-sm font-medium"
              >
                {logo?.path ? (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-4 shrink-0"
                    fill={logo.hex}
                  >
                    <path d={logo.path} />
                  </svg>
                ) : (
                  /* Keeps the chip's left inset identical whether or not a
                     mark exists, so a mixed row still aligns. */
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rounded-full bg-line"
                  />
                )}
                {tool}
              </li>
            )
          })}
        </ul>
      </Reveal>
    </Section>
  )
}
