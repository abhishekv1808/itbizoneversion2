'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import HeroCanvas from './HeroCanvas'
import CurvedLines from './CurvedLines'
import Marquee from './Marquee'
import { BOOK_AVATAR } from '@/lib/assets'

const TICKER_ITEMS = [
  'Brand Identity',
  'App Development',
  'Visual Design',
  'Creative Video',
  'Iconography',
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
          className="mb-5 max-w-[550px] text-[clamp(44px,13vw,52px)] leading-[1.03] font-semibold tracking-[-0.07em] md:text-[clamp(60px,8vw,72px)] lg:text-[82px]"
        >
          Premium creative{' '}
          <span className="font-serif font-semibold italic tracking-[-0.08em]">
            alwayzz
          </span>
          <sup className="align-super font-sans text-[24px] font-semibold tracking-normal">
            &reg;
          </sup>{' '}
          on demand.
        </motion.h1>

        <motion.p
          variants={rise}
          className="max-w-[476px] text-[17px] leading-[1.45] font-normal text-muted"
        >
          A flexible design partnership for founders, brands, and agencies who
          want top craft delivered on their timeline.
        </motion.p>

        <motion.div
          variants={rise}
          className="mt-8 flex w-full max-w-[320px] flex-col items-center justify-center gap-4 md:w-auto md:max-w-none md:flex-row"
        >
          <motion.button
            variants={lift}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="inline-flex h-14 w-full items-center justify-center rounded-full bg-ink px-[30px] text-[15px] font-semibold text-white md:w-auto"
          >
            View Plans
          </motion.button>

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
        </motion.div>
      </motion.div>

      <div
        aria-hidden="true"
        className="progressive-blur pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[178px]"
      />
    </section>
  )
}
