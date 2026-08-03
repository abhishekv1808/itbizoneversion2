'use client'

import Marquee from '@/components/Marquee'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'
import { TECH_GROUPS } from '@/lib/techLogos'

/**
 * One row per discipline, alternating direction so the section reads as three
 * distinct bands rather than one long drift.
 *
 * Rows are staggered in speed as well as direction — identical durations make
 * neighbouring rows visually lock together and the movement stops reading as
 * separate tracks.
 */
const ROW_DURATION = [42, 34, 48]

function ToolChip({ tool }) {
  return (
    <span className="mr-3 inline-flex shrink-0 items-center gap-2.5 rounded-full border border-soft bg-bg py-2.5 pr-5 pl-3.5 whitespace-nowrap transition-colors duration-300 hover:border-ink/15 hover:bg-chip">
      {tool.path ? (
        // Glyph is decorative — the sibling text carries the accessible name.
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-[18px] shrink-0"
          fill={tool.hex}
        >
          <path d={tool.path} />
        </svg>
      ) : (
        // No licensed glyph. An initial reads as deliberate lettering; an
        // empty circle read as a broken image.
        <span
          aria-hidden="true"
          className="inline-flex size-[18px] shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
          style={
            tool.hex
              ? { background: tool.hex, color: '#fff' }
              : { background: 'var(--color-soft)', color: 'var(--color-muted)' }
          }
        >
          {tool.name[0]}
        </span>
      )}

      <span className="text-[15px] font-medium tracking-[-0.02em] text-ink">
        {tool.name}
      </span>
    </span>
  )
}

export default function TechStack() {
  return (
    <Section id="stack" className="bg-panel">
      <div className="flex flex-col gap-4 md:flex-row md:gap-8 md:items-end md:justify-between">
        <Reveal className="max-w-[600px]">
          <Eyebrow>The stack</Eyebrow>
          <SectionTitle className="mt-7">
            Built on tools your next developer will <Accent>already</Accent>{' '}
            know.
          </SectionTitle>
        </Reveal>

        <Reveal delay={0.1} className="max-w-[350px]">
          <Lede>
            No proprietary page builder, no licence you have to keep renewing to
            keep your own site running. If you replace us, whoever comes next
            opens the project and recognises it.
          </Lede>
        </Reveal>
      </div>

      <div className="mt-14 flex flex-col gap-9">
        {TECH_GROUPS.map((group, i) => (
          <Reveal key={group.id} delay={i * 0.08}>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[13px] font-medium text-muted">
                {group.label}
              </h3>
              <span className="text-[13px] text-quiet">{group.note}</span>
            </div>

            <Marquee
              items={group.tools}
              duration={ROW_DURATION[i % ROW_DURATION.length]}
              reverse={i % 2 === 1}
              renderItem={(tool, key) => <ToolChip key={key} tool={tool} />}
              className="mt-3.5 flex items-center"
            />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
