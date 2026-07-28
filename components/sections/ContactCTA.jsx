'use client'

import { motion } from 'framer-motion'
import Reveal from '@/components/ui/Reveal'
import BookCall from '@/components/ui/BookCall'
import { Accent, Eyebrow } from '@/components/ui/Type'
import { SITE } from '@/lib/site'

const lift = {
  rest: { y: 0, boxShadow: '0 0 0 rgba(0,0,0,0)' },
  hover: { y: -1, boxShadow: '0 4px 20px rgba(0,0,0,0.12)' },
  tap: { y: 0, scale: 0.985 },
}

export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 px-6 py-28 md:px-9 md:py-36 lg:py-44"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center text-center">
        <Reveal>
          <Eyebrow>Get in touch</Eyebrow>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="mt-7 max-w-[620px] text-[clamp(40px,12vw,48px)] leading-[1.03] font-semibold tracking-[-0.065em] md:text-[clamp(56px,7vw,68px)] lg:text-[76px]">
            Tell us what you&rsquo;re <Accent>building</Accent>.
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 max-w-[460px] text-[17px] leading-[1.45] text-muted">
            Send us the brief and we&rsquo;ll come back with a written
            quotation, a timeline, and a start date. Quotations hold for 30
            days.
          </p>
        </Reveal>

        <Reveal
          delay={0.18}
          className="mt-9 flex w-full max-w-[320px] flex-col items-center justify-center gap-4 md:w-auto md:max-w-none md:flex-row"
        >
          <motion.a
            href={`mailto:${SITE.email}`}
            variants={lift}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="inline-flex h-14 w-full items-center justify-center rounded-full bg-ink px-[30px] text-[15px] font-semibold text-white md:w-auto"
          >
            Request a quotation
          </motion.a>

          <BookCall />
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-8 text-[13px] text-quiet">
            Or email{' '}
            <a
              href={`mailto:${SITE.email}`}
              className="text-muted underline underline-offset-4"
            >
              {SITE.email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
