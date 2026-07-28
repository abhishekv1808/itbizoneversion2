'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import Reveal, { RevealGroup, revealItem } from '@/components/ui/Reveal'
import Monogram from '@/components/ui/Monogram'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'

const TEAM = [
  { name: 'Noor Haddad', role: 'Founder, Creative Director' },
  { name: 'Elias Vance', role: 'Design Lead' },
  { name: 'Sana Kirby', role: 'Brand Director' },
  { name: 'Tomas Ilves', role: 'Engineering Lead' },
  { name: 'Ada Nwosu', role: 'Motion & 3D' },
  { name: 'Rafael Costa', role: 'Studio Producer' },
]

export default function Team() {
  return (
    <Section id="team" className="bg-panel">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-[560px]">
          <Eyebrow>The team</Eyebrow>
          <SectionTitle className="mt-7">
            Small by <Accent>design</Accent>.
          </SectionTitle>
          <Lede className="mt-6 max-w-[440px]">
            Fourteen people, no juniors on client work, and everyone you meet in
            the pitch stays on the project.
          </Lede>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href="#careers"
            className="group inline-flex items-center gap-2 rounded-full border border-soft bg-bg px-5 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-chip"
          >
            Meet everyone
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </Reveal>
      </div>

      <RevealGroup className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
        {TEAM.map((person) => (
          <motion.div
            key={person.name}
            variants={revealItem}
            className="group flex flex-col gap-4"
          >
            <div className="aspect-square overflow-hidden rounded-2xl border border-soft bg-bg transition-colors duration-300 group-hover:bg-chip">
              <Monogram name={person.name} size="lg" className="border-0 bg-transparent" />
            </div>
            <div>
              <div className="text-[15px] leading-tight font-semibold tracking-[-0.03em]">
                {person.name}
              </div>
              <div className="mt-1 text-[13px] leading-tight text-muted">
                {person.role}
              </div>
            </div>
          </motion.div>
        ))}
      </RevealGroup>
    </Section>
  )
}
