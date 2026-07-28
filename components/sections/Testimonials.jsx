'use client'

import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import Reveal, { RevealGroup, revealItem } from '@/components/ui/Reveal'
import Monogram from '@/components/ui/Monogram'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'

const TESTIMONIALS = [
  {
    quote:
      'They rebuilt our identity and the front-end in the same quarter, and the two actually match. That has never once happened to us before.',
    name: 'Marisa Okonjo',
    role: 'VP Brand, Ledgerline',
  },
  {
    quote:
      'The retainer replaced three vendors. Faster, and the work argues with us in the way good partners should.',
    name: 'Daniel Ferreira',
    role: 'Head of Product, Northsend',
  },
  {
    quote:
      'Every handoff arrives production-ready. Our engineers stopped rewriting design files six weeks in.',
    name: 'Priya Raghunathan',
    role: 'Director of Engineering, Corvus',
  },
]

export default function Testimonials() {
  return (
    <Section id="testimonials">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-[560px]">
          <Eyebrow>Testimonials</Eyebrow>
          <SectionTitle className="mt-7">
            What partners <Accent>say</Accent>.
          </SectionTitle>
        </Reveal>

        <Reveal delay={0.1} className="max-w-[340px]">
          <Lede>
            The shortest version: teams stay, and they widen the scope after the
            first engagement.
          </Lede>
        </Reveal>
      </div>

      <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((item) => (
          <motion.figure
            key={item.name}
            variants={revealItem}
            className="flex flex-col justify-between gap-8 rounded-3xl border border-soft bg-bg p-7 transition-colors duration-300 hover:bg-chip lg:p-8"
          >
            <blockquote className="text-[19px] leading-[1.45] font-medium tracking-[-0.035em]">
              <span className="font-serif text-[26px] leading-none italic">
                &ldquo;
              </span>
              {item.quote}
            </blockquote>

            <figcaption className="flex items-center gap-3 border-t border-soft pt-6">
              <Monogram name={item.name} size="sm" />
              <span className="flex flex-col">
                <span className="text-sm font-semibold">{item.name}</span>
                <span className="text-[13px] text-muted">{item.role}</span>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </RevealGroup>
    </Section>
  )
}
