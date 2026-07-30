'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import Monogram from '@/components/ui/Monogram'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'

// PLACEHOLDER — carried over from the v1 site, which used them as samples.
// Replace with real, attributable quotes before launch. Invented testimonials
// are the one kind of placeholder a prospect can disprove in a single search.
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

const EASE = [0.22, 1, 0.36, 1]

export default function Testimonials() {
  const railRef = useRef(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [hasRoom, setHasRoom] = useState(false)

  /*
    Entrance is keyed to the rail arriving vertically, not to each card
    arriving horizontally.

    Per-card whileInView looks tempting, but a card sitting off to the right
    has never intersected the viewport — with `once: true` it would stay at
    opacity 0 and the visitor would scroll the rail to find blank space.
  */
  const inView = useInView(railRef, { once: true, margin: '-70px 0px' })

  /*
    Button state is read off the element rather than tracked as an index. The
    rail also moves by touch, trackpad and keyboard, so an index would drift
    out of sync the moment anyone swiped it.
  */
  const sync = useCallback(() => {
    const el = railRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    // Below this there is nothing worth a control — three cards very nearly
    // fill a desktop viewport, and arrows that travel 40px read as broken.
    setHasRoom(max > 80)
    // 4px tolerance: sub-pixel widths mean scrollLeft rarely hits max exactly.
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < max - 4)
  }, [])

  useEffect(() => {
    const el = railRef.current
    if (!el) return

    sync()
    // Passive — this only reads layout, it must never block the scroll.
    el.addEventListener('scroll', sync, { passive: true })
    const observer = new ResizeObserver(sync)
    observer.observe(el)

    return () => {
      el.removeEventListener('scroll', sync)
      observer.disconnect()
    }
  }, [sync])

  const nudge = (direction) => {
    const el = railRef.current
    if (!el) return
    // One card plus its gap, measured rather than assumed, so the step stays
    // right across all three card widths.
    const card = el.querySelector('[data-card]')
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8
    el.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  const scrollable = hasRoom

  return (
    <Section id="testimonials">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-[560px]">
          <Eyebrow>Testimonials</Eyebrow>
          <SectionTitle className="mt-7">
            What partners <Accent>say</Accent>.
          </SectionTitle>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-6 md:items-end">
          <Lede className="max-w-[340px]">
            The shortest version: clients stay, and they hand us the next
            project before the first one ships.
          </Lede>

          {/* Controls sit with the copy, not over the rail, so they never
              cover a quote. Hidden entirely when nothing overflows. */}
          {scrollable ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => nudge(-1)}
                disabled={!canPrev}
                aria-label="Previous testimonial"
                className="inline-flex size-11 items-center justify-center rounded-full border border-soft bg-bg transition-all duration-200 hover:bg-chip disabled:pointer-events-none disabled:opacity-35"
              >
                <ArrowLeft size={17} />
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                disabled={!canNext}
                aria-label="Next testimonial"
                className="inline-flex size-11 items-center justify-center rounded-full border border-soft bg-bg transition-all duration-200 hover:bg-chip disabled:pointer-events-none disabled:opacity-35"
              >
                <ArrowRight size={17} />
              </button>
            </div>
          ) : null}
        </Reveal>
      </div>

      {/*
        Full-bleed rail. The negative margin cancels the Section gutter so
        cards run to the viewport edge — which is what makes the horizontal
        intent read — while the matching padding keeps the first card aligned
        with the heading above it.

        Native overflow rather than a transform: touch momentum, shift-wheel,
        trackpad gestures and keyboard arrows all work with no handling at all,
        and Lenis stays in charge of the vertical page scroll.
      */}
      <div
        ref={railRef}
        role="group"
        aria-label="Client testimonials"
        tabIndex={0}
        className="scrollbar-none -mx-6 mt-14 flex snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto px-6 pb-2 focus-visible:outline-none md:-mx-9 md:scroll-px-9 md:px-9"
      >
        {TESTIMONIALS.map((item, i) => (
          <motion.figure
            key={item.name}
            data-card
            initial={{ opacity: 0, y: 26 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
            transition={{ duration: 0.7, delay: i * 0.09, ease: EASE }}
            className="group flex w-[84vw] shrink-0 snap-start flex-col justify-between gap-8 rounded-3xl border border-soft bg-bg p-7 transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:bg-chip hover:shadow-[0_18px_44px_-24px_rgba(0,0,0,0.25)] sm:w-[420px] lg:w-[520px] lg:p-9"
          >
            <blockquote className="text-[19px] leading-[1.45] font-medium tracking-[-0.035em] lg:text-[21px]">
              <span
                aria-hidden="true"
                className="mr-0.5 font-serif text-[34px] leading-none text-quiet italic"
              >
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
      </div>
    </Section>
  )
}
