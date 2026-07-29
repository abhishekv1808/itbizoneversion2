'use client'

import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import Reveal, { RevealGroup, revealItem } from '@/components/ui/Reveal'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'
import { formatPrice } from '@/lib/services'

export default function ServiceDeliverables({ service }) {
  return (
    <Section id="scope">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-[560px]">
          <Eyebrow>Scope &amp; pricing</Eyebrow>
          <SectionTitle className="mt-7">
            Priced <Accent>up front</Accent>.
          </SectionTitle>
        </Reveal>

        <Reveal delay={0.1} className="max-w-[340px]">
          <Lede>
            Starting points, not final numbers. Your quotation itemises exactly
            what you are buying and holds for 30 days.
          </Lede>
        </Reveal>
      </div>

      <RevealGroup className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {service.groups.map((group) => (
          <motion.div key={group.title} variants={revealItem}>
            <h3 className="text-[13px] font-medium text-quiet">
              {group.title}
            </h3>

            <ul className="mt-5 border-t border-soft">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-baseline justify-between gap-4 border-b border-soft py-4"
                >
                  <span className="text-[15px] leading-snug font-medium">
                    {item.name}
                  </span>
                  {item.price && (
                    <span className="shrink-0 text-[13px] whitespace-nowrap text-muted tabular-nums">
                      from {formatPrice(item.price)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </RevealGroup>

      <Reveal delay={0.1} className="mt-10">
        <p className="text-[13px] text-quiet">
          All prices in INR, exclusive of taxes. Standard terms are 50% to
          begin and 50% on delivery.
        </p>
      </Reveal>
    </Section>
  )
}
