'use client'

import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import Reveal, { RevealGroup, revealItem } from '@/components/ui/Reveal'
import Monogram from '@/components/ui/Monogram'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'

// PLACEHOLDER — carried over from the v1 site, which used them as samples.
// Replace with real, attributable quotes before launch.
const TESTIMONIALS = [
  {
    quote:
      'ITBIZONE transformed our digital presence completely. The site, the branding and the ad campaigns finally pull in the same direction.',
    name: 'Rajesh Kumar',
    role: 'CEO, TechStart Bangalore',
  },
  {
    quote:
      'Their e-commerce build handled our first festive season without a single checkout failure. That alone paid for the project.',
    name: 'Priya Sharma',
    role: 'Founder, E-Store Mumbai',
  },
  {
    quote:
      'Professional and on time. We knew the cost before work started and the number never moved.',
    name: 'Amit Patel',
    role: 'Director, FinTech Solutions',
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
            The shortest version: clients stay, and they hand us the next
            project before the first one ships.
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
