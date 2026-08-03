'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import Reveal, { RevealGroup, revealItem } from '@/components/ui/Reveal'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'
import { getService } from '@/lib/services'
import { TOOL_LOGOS } from '@/lib/techLogos'

/**
 * Digital marketing on the home page.
 *
 * Everything here is read from the digital-marketing entry in lib/services.js
 * — the four pillars, the platform list and the deep link all come from the
 * same source the service page renders. Restating any of it inline would give
 * the two pages a way to disagree, which is exactly what happened to the
 * portfolio and the client wall.
 *
 * No numbers. The obvious pitch for a marketing section is results, and every
 * figure available for one is unmeasured — see the metrics warning in
 * lib/caseStudies.js. What it argues instead is method, which is true today.
 */
export default function Marketing() {
  const service = getService('digital-marketing')
  if (!service) return null

  const { pillars, stack, stackLabel } = service

  return (
    <Section id="marketing">
      <div className="flex flex-col gap-4 md:flex-row md:gap-8 md:items-end md:justify-between">
        <Reveal className="max-w-[620px]">
          <Eyebrow>Digital marketing</Eyebrow>
          <SectionTitle className="mt-7">
            Spend you can <Accent>account for</Accent>.
          </SectionTitle>
        </Reveal>

        <Reveal delay={0.1} className="max-w-[340px]">
          <Lede>
            Search, paid and email run against conversion tracking that works —
            so every rupee is judged on cost per lead, not impressions.
          </Lede>
        </Reveal>
      </div>

      {/*
        Two columns from md, one below it. A four-across grid would set each
        pillar's copy in a 90px column on a phone; stacking keeps the measure
        readable and the numbering does the work of separating them.
      */}
      <RevealGroup className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-soft bg-soft md:mt-14 md:grid-cols-2">
        {pillars.map((pillar, i) => (
          <motion.article
            key={pillar.title}
            variants={revealItem}
            className="flex flex-col gap-2.5 bg-bg p-6 transition-colors duration-300 hover:bg-chip md:gap-3 md:p-8"
          >
            <span className="text-[13px] font-medium text-quiet tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-[18px] leading-tight font-semibold tracking-[-0.035em] md:text-[22px] md:tracking-[-0.04em]">
              {pillar.title}
            </h3>
            <p className="text-[14px] leading-[1.55] text-muted md:text-[15px]">
              {pillar.copy}
            </p>
          </motion.article>
        ))}
      </RevealGroup>

      {/* ── Platforms ─────────────────────────────────────────────────── */}
      <Reveal delay={0.15} className="mt-10 md:mt-14">
        <h3 className="text-[13px] font-medium text-quiet">{stackLabel}</h3>

        <ul className="mt-4 flex flex-wrap gap-2">
          {stack.map((tool) => {
            const logo = TOOL_LOGOS[tool]

            return (
              <li
                key={tool}
                className="inline-flex items-center gap-2 rounded-full border border-soft bg-bg py-1.5 pr-3.5 pl-2.5 text-[13px] font-medium md:py-2 md:pr-4 md:pl-3 md:text-sm"
              >
                {logo?.path ? (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-3.5 shrink-0 md:size-4"
                    fill={logo.hex}
                  >
                    <path d={logo.path} />
                  </svg>
                ) : (
                  // Keeps the left inset identical whether or not a licensed
                  // mark exists, so a mixed row still aligns.
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

      <Reveal delay={0.2} className="mt-9 md:mt-12">
        <a
          href="/services/digital-marketing"
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[14px] font-semibold text-white transition-transform duration-200 hover:-translate-y-px md:h-14 md:px-7 md:text-[15px]"
        >
          How the marketing engagement works
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </Reveal>
    </Section>
  )
}
