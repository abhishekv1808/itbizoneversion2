'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ArrowDown } from 'lucide-react'
import dynamic from 'next/dynamic'
import HeroBackdrop from './HeroBackdrop'
import CurvedLines from './CurvedLines'
import Marquee from './Marquee'
import BookCall from './ui/BookCall'
import Magnetic from './ui/Magnetic'
import { SITE } from '@/lib/site'
import useReducedMotion from '@/lib/useReducedMotion'
import useWebGLWorthIt from '@/lib/useWebGLWorthIt'

/*
  three.js is a 532KB chunk, and it was a static import here — so every phone
  parsed it before the page could respond, which is where the six seconds of
  blocking time came from. Loading it dynamically means the chunk is only
  requested on the devices that render it at all; on everything else the CSS
  backdrop below is the whole hero background and three.js is never fetched.
*/
const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

gsap.registerPlugin(SplitText)

// Each ticker item now links to its service page — six internal links out of
// the hero, and the chips stop being decoration.
const TICKER_ITEMS = [
  { label: 'Website Development', href: '/services/website-development' },
  { label: 'UI/UX Design', href: '/services/ui-ux-design' },
  { label: 'Digital Marketing', href: '/services/digital-marketing' },
  { label: 'Graphic Design', href: '/services/graphic-design' },
  { label: 'Social Media', href: '/services/social-media-management' },
  { label: 'E-commerce', href: '/services/ecommerce-development' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  const hostRef = useRef(null)
  const headlineRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const webglWorthIt = useWebGLWorthIt()

  /*
    Masked line reveal, replacing the opacity fade the headline used to share
    with everything else.

    Lines stay readable while they move, which staggered characters do not,
    and the text is painted at full opacity from the first frame rather than
    faded in.

    Worth being precise about LCP here: on this hero it is NOT the h1. The
    background image is full-bleed, so nothing on the page is larger and it
    wins the measurement regardless of how the headline animates. That is why
    the image is preloaded in app/layout.js. The masked reveal matters on the
    service hero, whose fallback is a CSS gradient and therefore not an LCP
    candidate at all.
  */
  useEffect(() => {
    const host = hostRef.current
    if (!host || reducedMotion) return

    const ctx = gsap.context(() => {
      const outer = new SplitText(headlineRef.current, {
        type: 'lines',
        linesClass: 'overflow-hidden',
      })
      const inner = new SplitText(outer.lines, { type: 'lines' })

      gsap.from(inner.lines, {
        yPercent: 118,
        duration: 1.05,
        stagger: 0.085,
        ease: 'expo.out',
      })

      return () => {
        inner.revert()
        outer.revert()
      }
    }, host)

    return () => ctx.revert()
  }, [reducedMotion])

  /*
    The content drifts up and dissolves as the section leaves, so the hero
    hands over to the next one instead of sliding away underneath it. Tied to
    scroll rather than time, so it is reversible and never plays on its own.
  */
  const { scrollYProgress } = useScroll({
    target: hostRef,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  return (
    <section
      ref={hostRef}
      className="relative isolate flex min-h-[620px] flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16 text-center md:min-h-[850px] md:px-8 md:py-35 lg:px-9 lg:py-40"
    >
      {/* Always painted, and the LCP element. The canvas fades in over it. */}
      <HeroBackdrop />
      {webglWorthIt ? <HeroCanvas /> : null}
      <CurvedLines />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={reducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-20 flex w-full flex-col items-center"
      >
        <motion.div variants={rise} className="w-full">
          <Marquee
            items={TICKER_ITEMS}
            renderItem={(item, key) => (
              <a
                key={key}
                href={item.href}
                className="mr-2 inline-flex shrink-0 items-center rounded-full bg-chip px-3.5 py-1.5 text-[13px] font-medium whitespace-nowrap text-muted transition-colors duration-200 hover:bg-bg hover:text-ink"
              >
                {item.label}
              </a>
            )}
            className="mx-auto mb-7 flex h-9 w-full max-w-[500px] items-center"
          />
        </motion.div>

        <h1
          ref={headlineRef}
          // 13vw resolved to 51px at 390px, which fit about seven characters
          // to a line and pushed the sub-copy and both CTAs below the fold.
          // 9.5vw lands at 37px and keeps the whole offer on one screen.
          className="mb-5 max-w-[560px] text-[clamp(32px,9.5vw,44px)] leading-[1.06] font-semibold tracking-[-0.055em] md:text-[clamp(60px,8vw,72px)] md:leading-[1.03] md:tracking-[-0.07em] lg:text-[82px]"
        >
          Everything digital, under{' '}
          <span className="font-serif font-semibold italic tracking-[-0.08em]">
            one
          </span>{' '}
          roof.
        </h1>

        <motion.p
          variants={rise}
          className="max-w-[476px] text-[14px] leading-[1.55] font-normal text-muted md:text-[17px] md:leading-[1.45]"
        >
          {SITE.description}
        </motion.p>

        <motion.div
          variants={rise}
          className="mt-8 flex w-full max-w-[320px] flex-col items-center justify-center gap-4 md:w-auto md:max-w-none md:flex-row"
        >
          <Magnetic className="w-full md:w-auto">
            <a
              href="#contact"
              // h-12 on phones. 56px is a desktop button size; the tap target
              // guidance it was built around asks for 44px, so 48 clears it
              // with room and returns 8px to the fold.
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-ink px-6 text-[14px] font-semibold text-white transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.18)] md:h-14 md:px-[30px] md:text-[15px] md:w-auto"
            >
              Get a quotation
            </a>
          </Magnetic>

          <Magnetic className="w-full md:w-auto">
            <BookCall />
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Scroll cue, gone almost immediately once the page moves — it only has
          a job for someone who has not scrolled yet. */}
      <motion.div
        aria-hidden="true"
        style={reducedMotion ? undefined : { opacity: cueOpacity }}
        className="absolute inset-x-0 bottom-7 z-20 flex justify-center"
      >
        <span className="inline-flex flex-col items-center gap-1.5 text-[11px] font-medium tracking-[0.2em] text-quiet uppercase">
          Scroll
          <ArrowDown size={13} className="animate-bounce" />
        </span>
      </motion.div>

      <div
        aria-hidden="true"
        className="progressive-blur pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[178px]"
      />
    </section>
  )
}
