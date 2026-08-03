'use client'

import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import Reveal, { RevealGroup, revealItem } from '@/components/ui/Reveal'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'
import { PROJECTS } from '@/lib/projects'

export default function ServiceWork({ service }) {
  // Services that showcase differently (the design gallery, say) carry no
  // projectFilter at all — bail before touching it.
  if (!service.projectFilter?.length) return null

  const projects = PROJECTS.filter((project) =>
    project.disciplines.some((d) => service.projectFilter.includes(d))
  )

  if (!projects.length) return null

  return (
    <Section id="work">
      <div className="flex flex-col gap-4 md:flex-row md:gap-8 md:items-end md:justify-between">
        <Reveal className="max-w-[560px]">
          <Eyebrow>Proof</Eyebrow>
          <SectionTitle className="mt-7">
            Built and <Accent>shipped</Accent>.
          </SectionTitle>
        </Reveal>

        <Reveal delay={0.1} className="max-w-[320px]">
          <Lede>
            Every stack listed is what that project actually runs on.
          </Lede>
        </Reveal>
      </div>

      <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-soft bg-soft md:grid-cols-2 lg:grid-cols-4">
        {projects.map((project) => (
          <motion.article
            key={project.id}
            variants={revealItem}
            className="flex flex-col gap-3 bg-bg p-7 transition-colors duration-300 hover:bg-chip"
          >
            <span
              className={`text-[19px] leading-tight text-ink/85 ${project.wordmark}`}
            >
              {project.name}
            </span>
            <span className="text-[13px] text-quiet">{project.sector}</span>
            <p className="text-[14px] leading-[1.5] text-muted">
              {project.summary}
            </p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
              {project.stack.slice(0, 3).map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-soft px-2.5 py-1 text-xs font-medium text-muted"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </RevealGroup>
    </Section>
  )
}
