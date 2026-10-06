'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import {
  ArrowUpRight,
  Boxes,
  Gauge,
  Search,
  ShieldCheck,
  Smartphone,
} from 'lucide-react'
import Magnetic from '@/components/ui/Magnetic'
import useReducedMotion from '@/lib/useReducedMotion'

gsap.registerPlugin(SplitText)

/**
 * Light, centred, sharing the home hero's serif italic accent and CTA shapes.
 *
 * The background differs in both source and composition: it is generated in a
 * shader rather than rendered from a fixed artwork, and the colour is anchored
 * to the lower half of the frame instead of washing the whole of it. That is
 * also why the home hero's curved edge lines and progressive-blur foot are
 * absent here — the lines only read against a coloured ground, and the blur
 * would erase the arcs at exactly their strongest point.
 *
 * The WebGL layer is split out of the route bundle and mounted client-side
 * only; the type and CTAs are in the initial HTML and paint immediately.
 */
const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false })

const TRUST = [
  { label: 'Fast performance', Icon: Gauge },
  { label: 'SEO optimised', Icon: Search },
  { label: 'Mobile first', Icon: Smartphone },
  { label: 'Secure', Icon: ShieldCheck },
  { label: 'Modern stack', Icon: Boxes },
]

export default function DevHero({ service }) {
  const hostRef = useRef(null)
  const headlineRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set('[data-reveal]', { opacity: 1, y: 0 })
        return
      }

      /*
        Lines, not characters. Splitting a headline to characters and
        staggering them is the effect everyone recognises, and it makes the
        sentence unreadable while it plays. Masked lines stay legible from the
        first frame — and because the text is painted at full opacity behind a
        clip, it also stays the LCP element instead of deferring it.
      */
      const split = new SplitText(headlineRef.current, {
        type: 'lines',
        linesClass: 'overflow-hidden',
      })
      const inner = new SplitText(split.lines, { type: 'lines' })

      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from(inner.lines, { yPercent: 118, duration: 1.05, stagger: 0.085 }, 0)
        .from('[data-reveal="eyebrow"]', { opacity: 0, y: 12, duration: 0.7 }, 0.1)
        .from('[data-reveal="sub"]', { opacity: 0, y: 16, duration: 0.85 }, 0.42)
        .from('[data-reveal="cta"]', { opacity: 0, y: 16, duration: 0.8 }, 0.58)
        .from(
          '[data-reveal="trust"] > *',
          { opacity: 0, y: 10, duration: 0.55, stagger: 0.055 },
          0.74
        )

      return () => {
        inner.revert()
        split.revert()
      }
    }, host)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      ref={hostRef}
      className="relative isolate flex min-h-[760px] flex-col items-center justify-center overflow-hidden px-6 pt-30 pb-24 text-center md:min-h-[860px] md:px-8 md:py-35 lg:px-9 lg:py-40"
    >
      {/* Ground for the moments before WebGL is up, and for anyone without it.
          Same composition as the shader — clean white above, bands arcing up
          from below — so the swap is not visible. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[radial-gradient(105%_78%_at_50%_30%,#ffffff_0%,#ffffff_44%,#a8e6cf_52%,#6fe0da_60%,#6788f2_74%,#a37af0_100%)]"
      />
      <HeroScene hostRef={hostRef} reducedMotion={reducedMotion} />

      <div className="relative z-20 flex w-full flex-col items-center">
        {/*
          The pill is part of the h1, so the heading opens with the searched
          phrase — service plus city — while still looking like the eyebrow it
          always was. The line-split animation targets only the display span.
        */}
        <h1 className="flex flex-col items-center">
          <span
            data-reveal="eyebrow"
            className="inline-flex items-center gap-2 rounded-full border border-soft bg-bg/70 px-3.5 py-1.5 text-[13px] font-medium text-muted backdrop-blur-sm"
          >
            <span className="size-1.5 rounded-full bg-dot" />
            {service.keyword}
          </span>{' '}
          <span
            ref={headlineRef}
            className="mt-7 block max-w-[620px] text-[clamp(30px,9vw,40px)] leading-[1.08] font-semibold tracking-[-0.05em] md:leading-[1.02] md:tracking-[-0.065em] md:text-[clamp(58px,7.2vw,72px)] lg:text-[80px]"
          >
            We build websites that{' '}
            <span className="font-serif font-semibold italic tracking-[-0.07em]">
              grow
            </span>{' '}
            businesses.
          </span>
        </h1>

        <p
          data-reveal="sub"
          className="mt-7 max-w-[500px] text-[14px] md:text-[17px] leading-[1.5] text-muted"
        >
          Modern, high-performance websites for Bengaluru businesses, designed
          to turn visitors into customers and built to be found on Google.
        </p>

        <div
          data-reveal="cta"
          className="mt-9 flex w-full max-w-[320px] flex-col items-center gap-3.5 md:w-auto md:max-w-none md:flex-row"
        >
          <Magnetic className="w-full md:w-auto">
            <a
              href="/contact"
              className="group inline-flex h-12 md:h-14 w-full items-center justify-center gap-2 rounded-full bg-ink px-8 text-[15px] font-semibold text-white transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.18)] md:w-auto"
            >
              Start your project
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </Magnetic>

          <Magnetic className="w-full md:w-auto">
            <a
              href="#work"
              className="inline-flex h-12 md:h-14 w-full items-center justify-center rounded-full border border-soft bg-bg/70 px-8 text-[15px] font-semibold text-ink backdrop-blur-sm transition-colors duration-300 hover:bg-bg md:w-auto"
            >
              View our work
            </a>
          </Magnetic>
        </div>

        <ul
          data-reveal="trust"
          className="mt-11 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {TRUST.map(({ label, Icon }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full bg-bg/55 px-3 py-1.5 text-[13px] font-medium text-muted backdrop-blur-sm"
            >
              <Icon size={14} className="text-quiet" />
              {label}
            </li>
          ))}
        </ul>
      </div>

      {/*
        No progressive blur at the foot here, unlike the home hero.

        That treatment fades the bottom 178px to solid white, which is exactly
        where this composition is most saturated — it would erase the arcs it
        was meant to soften. The colour runs to the section edge instead, and
        the shader fades the whole field on scroll so the next section still
        arrives on clean white.
      */}
    </section>
  )
}
