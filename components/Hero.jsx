'use client'

import { motion } from 'framer-motion'
import HeroCanvas from './HeroCanvas'
import CurvedLines from './CurvedLines'
import Marquee from './Marquee'
import BookCall from './ui/BookCall'
import { SITE } from '@/lib/site'

const TICKER_ITEMS = [
  'Website Development',
  'UI/UX Design',
  'Digital Marketing',
  'Graphic Design',
  'Social Media',
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
}

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const lift = {
  rest: { y: 0, boxShadow: '0 0 0 rgba(0,0,0,0)' },
  hover: { y: -1, boxShadow: '0 4px 20px rgba(0,0,0,0.12)' },
  tap: { y: 0, scale: 0.985 },
}

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[760px] flex-col items-center justify-center overflow-hidden px-6 pt-30 pb-24 text-center md:min-h-[850px] md:px-8 md:py-35 lg:px-9 lg:py-40">
      <HeroCanvas />
      <CurvedLines />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-20 flex w-full flex-col items-center"
      >
        <motion.div variants={rise} className="w-full">
          <Marquee
            items={TICKER_ITEMS}
            renderItem={(item, key) => (
              <span
                key={key}
                className="mr-2 inline-flex shrink-0 items-center rounded-full bg-chip px-3.5 py-1.5 text-[13px] font-medium whitespace-nowrap text-muted"
              >
                {item}
              </span>
            )}
            className="mx-auto mb-7 flex h-9 w-full max-w-[500px] items-center"
          />
        </motion.div>

        <motion.h1
          variants={rise}
          className="mb-5 max-w-[560px] text-[clamp(44px,13vw,52px)] leading-[1.03] font-semibold tracking-[-0.07em] md:text-[clamp(60px,8vw,72px)] lg:text-[82px]"
        >
          Everything digital, under{' '}
          <span className="font-serif font-semibold italic tracking-[-0.08em]">
            one
          </span>{' '}
          roof.
        </motion.h1>

        <motion.p
          variants={rise}
          className="max-w-[476px] text-[17px] leading-[1.45] font-normal text-muted"
        >
          {SITE.description}
        </motion.p>

        <motion.div
          variants={rise}
          className="mt-8 flex w-full max-w-[320px] flex-col items-center justify-center gap-4 md:w-auto md:max-w-none md:flex-row"
        >
          <motion.a
            href="#contact"
            variants={lift}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="inline-flex h-14 w-full items-center justify-center rounded-full bg-ink px-[30px] text-[15px] font-semibold text-white md:w-auto"
          >
            Get a quotation
          </motion.a>

          <BookCall />
        </motion.div>
      </motion.div>

      <div
        aria-hidden="true"
        className="progressive-blur pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[178px]"
      />
    </section>
  )
}
