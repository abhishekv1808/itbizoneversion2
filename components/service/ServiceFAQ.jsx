'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import { Accent, Eyebrow, SectionTitle } from '@/components/ui/Type'
import { SITE } from '@/lib/site'

export default function ServiceFAQ({ service }) {
  const [open, setOpen] = useState(0)

  return (
    <Section id="faq" className="bg-panel">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-5">
          <Eyebrow>Questions</Eyebrow>
          <SectionTitle className="mt-7">
            Asked <Accent>often</Accent>.
          </SectionTitle>
          <p className="mt-6 max-w-[300px] text-[15px] leading-[1.5] text-muted">
            Anything not covered here, email{' '}
            <a
              href={`mailto:${SITE.email}`}
              className="text-ink underline underline-offset-4"
            >
              {SITE.email}
            </a>{' '}
            and we&rsquo;ll answer properly.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-7">
          <ul className="border-t border-soft">
            {service.faqs.map((faq, i) => {
              const isOpen = open === i

              return (
                <li key={faq.q} className="border-b border-soft">
                  <h3>
                    <button
                      type="button"
                      // Toggling to null closes the open one, so the list can
                      // sit fully collapsed rather than always forcing one open.
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-6 py-5 text-left"
                    >
                      <span className="text-[17px] leading-snug font-medium tracking-[-0.02em] md:text-[19px]">
                        {faq.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="mt-0.5 shrink-0 text-quiet"
                      >
                        <Plus size={18} />
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pr-10 pb-5 text-[15px] leading-[1.55] text-muted">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
