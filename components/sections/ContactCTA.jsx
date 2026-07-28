'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Reveal from '@/components/ui/Reveal'
import { Accent, Eyebrow } from '@/components/ui/Type'
import { BOOK_AVATAR } from '@/lib/assets'

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
            Let&rsquo;s make something <Accent>lasting</Accent>.
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 max-w-[460px] text-[17px] leading-[1.45] text-muted">
            Tell us what you&rsquo;re building. We&rsquo;ll come back within one
            working day with a plan, a price, and a start date.
          </p>
        </Reveal>

        <Reveal
          delay={0.18}
          className="mt-9 flex w-full max-w-[320px] flex-col items-center justify-center gap-4 md:w-auto md:max-w-none md:flex-row"
        >
          <motion.a
            href="mailto:studio@alwayzz.com"
            variants={lift}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="inline-flex h-14 w-full items-center justify-center rounded-full bg-ink px-[30px] text-[15px] font-semibold text-white md:w-auto"
          >
            Start a project
          </motion.a>

          <motion.button
            variants={lift}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="inline-flex w-full items-center justify-start gap-3 rounded-full border-4 border-hairline bg-white py-2 pr-6 pl-2 md:w-auto"
          >
            <Image
              src={BOOK_AVATAR}
              alt=""
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-full object-cover"
            />
            <span className="flex flex-col items-start gap-0.5">
              <span className="text-sm leading-tight font-semibold">
                Chat for 15 minutes
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs leading-tight font-medium text-quiet">
                <span className="size-2 shrink-0 rounded-full bg-dot" />
                Pick a slot
              </span>
            </span>
          </motion.button>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-8 text-[13px] text-quiet">
            Or email{' '}
            <a
              href="mailto:studio@alwayzz.com"
              className="text-muted underline underline-offset-4"
            >
              studio@alwayzz.com
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
