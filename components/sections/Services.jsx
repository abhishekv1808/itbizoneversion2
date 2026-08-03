'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'
import useReducedMotion from '@/lib/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// The four headline services carried over from itbizone.com, plus the two
// lines the v1 pricing engine already quoted separately.
const SERVICES = [
  {
    id: '01',
    title: 'Website Development',
    copy: 'Custom sites and web applications — built responsive, fast, and structured so search engines can actually read them.',
    tags: ['Custom builds', 'CMS', 'Web apps'],
    href: '/services/website-development',
  },
  {
    id: '02',
    title: 'UI/UX Design',
    copy: 'Research, flows and interface design that decide what the product does before anyone argues about what it looks like.',
    tags: ['User flows', 'Wireframes', 'Prototypes'],
    href: '/services/ui-ux-design',
  },
  {
    id: '03',
    title: 'Digital Marketing',
    copy: 'SEO, Google Ads and paid social run against tracked numbers — leads and conversions, not impressions.',
    tags: ['SEO', 'Google Ads', 'PPC'],
    href: '/services/digital-marketing',
  },
  {
    id: '04',
    title: 'Graphic Design',
    copy: 'Logos, brand identity, print and packaging, with the guidelines that keep it all consistent once your team grows.',
    tags: ['Identity', 'Print', 'Packaging'],
    href: '/services/graphic-design',
  },
  {
    id: '05',
    title: 'Social Media Management',
    copy: 'Strategy, content calendars and community management, reported monthly against growth and engagement.',
    tags: ['Content', 'Campaigns', 'Reporting'],
    href: '/services/social-media-management',
  },
  {
    id: '06',
    title: 'E-commerce Development',
    copy: 'Storefronts with payment gateways, inventory and analytics wired in — from first catalogue to checkout.',
    tags: ['Storefronts', 'Payments', 'Inventory'],
    href: '/services/ecommerce-development',
  },
]

export default function Services() {
  const gridRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const grid = gridRef.current
    if (!grid || reducedMotion) return

    // Listeners and the global refresh handler are not owned by gsap.context,
    // so they are collected here and torn down explicitly.
    const cleanups = []

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-card]')

      /*
        ── Entrance ──────────────────────────────────────────────────────
        ScrollTrigger.batch rather than one trigger per card: the cards sit in
        a 3-up grid, so a row crosses the fold together and batching lets that
        row animate as one gesture with a short stagger inside it. Six
        independent triggers would fire in DOM order regardless of which row
        was actually on screen.
      */
      gsap.set(cards, { opacity: 0, y: 28 })

      const reveal = (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          overwrite: true,
        })

      ScrollTrigger.batch(cards, {
        start: 'top 88%',
        once: true,
        onEnter: reveal,
      })

      /*
        Catch-up for anything already above the fold.

        batch only fires onEnter when an element crosses the start line going
        downward, so a reload part-way down the page — or a jump straight to
        #services — leaves everything above the viewport stuck at the opacity
        0 that gsap.set just applied. This codebase has been bitten by exactly
        that before, so the check is explicit rather than assumed.
      */
      const catchUp = () => {
        const fold = window.innerHeight * 0.88
        const missed = cards.filter(
          (c) =>
            c.getBoundingClientRect().top < fold &&
            Number(gsap.getProperty(c, 'opacity')) === 0
        )
        if (missed.length) reveal(missed)
      }

      ScrollTrigger.addEventListener('refreshInit', catchUp)
      cleanups.push(() =>
        ScrollTrigger.removeEventListener('refreshInit', catchUp)
      )
      catchUp()

      /*
        ── Cursor light ──────────────────────────────────────────────────
        A soft highlight that follows the pointer across the hovered card.

        quickTo rather than a tween per pointermove: it reuses a single tween
        and only retargets it, so sweeping across six cards costs six
        interpolations instead of hundreds of new tweens. The same technique
        drives the velocity skew on the portfolio rail.

        The custom properties stay unitless and the gradient multiplies them
        by 1px. GSAP interpolates a raw number cleanly, whereas animating to a
        px string leaves the variable unitless on the first frame and the
        gradient silently drops to its fallback.
      */
      cards.forEach((card) => {
        const glow = card.querySelector('[data-glow]')
        if (!glow) return

        const toX = gsap.quickTo(glow, '--mx', { duration: 0.4, ease: 'power3' })
        const toY = gsap.quickTo(glow, '--my', { duration: 0.4, ease: 'power3' })

        const at = (event) => {
          const r = card.getBoundingClientRect()
          return [event.clientX - r.left, event.clientY - r.top]
        }

        const move = (event) => {
          const [x, y] = at(event)
          toX(x)
          toY(y)
        }

        // Fine pointers only. A touch fires enter without ever firing leave,
        // so on a phone the light would come on once and stay on.
        const enter = (event) => {
          if (event.pointerType !== 'mouse') return
          const [x, y] = at(event)
          // Jump to the entry point rather than sliding in from wherever it
          // was left, which reads as a stray object crossing the card.
          gsap.set(glow, { '--mx': x, '--my': y })
          gsap.to(glow, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        }

        const leave = () =>
          gsap.to(glow, { opacity: 0, duration: 0.45, ease: 'power2.out' })

        card.addEventListener('pointerenter', enter)
        card.addEventListener('pointermove', move)
        card.addEventListener('pointerleave', leave)

        cleanups.push(() => {
          card.removeEventListener('pointerenter', enter)
          card.removeEventListener('pointermove', move)
          card.removeEventListener('pointerleave', leave)
        })
      })
    }, grid)

    return () => {
      cleanups.forEach((fn) => fn())
      ctx.revert()
    }
  }, [reducedMotion])

  return (
    <Section id="services" className="bg-panel">
      <div className="flex flex-col gap-4 md:flex-row md:gap-8 md:items-end md:justify-between">
        <Reveal className="max-w-[620px]">
          <Eyebrow>What we do</Eyebrow>
          <SectionTitle className="mt-7">
            Six services, <Accent>one</Accent> team.
          </SectionTitle>
        </Reveal>

        <Reveal delay={0.1} className="max-w-[380px]">
          <Lede>
            Take one service or the whole stack. Most clients start with a
            website and widen once they see the first month of numbers.
          </Lede>
        </Reveal>
      </div>

      <div
        ref={gridRef}
        className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-soft bg-soft md:mt-14 md:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICES.map((service) => (
          <article
            key={service.id}
            data-card
            className="group relative isolate flex flex-col bg-bg p-6 md:p-7 lg:p-8"
          >
            {/*
              The cursor light. pointer-events-none so it never intercepts the
              stretched link, and -z-10 inside the card's own stacking context
              (isolate) so it paints over the background but under the text.
            */}
            <span
              aria-hidden="true"
              data-glow
              className="pointer-events-none absolute inset-0 -z-10 opacity-0"
              style={{
                '--mx': 0,
                '--my': 0,
                background:
                  'radial-gradient(220px circle at calc(var(--mx) * 1px) calc(var(--my) * 1px), rgba(10,10,10,0.07), transparent 70%)',
              }}
            />

            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <span className="text-[13px] font-medium text-quiet tabular-nums">
                  {service.id}
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-quiet transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                />
              </div>

              <h3 className="text-[20px] leading-tight font-semibold tracking-[-0.04em] md:text-[26px] md:tracking-[-0.045em]">
                {/* Stretched link: the whole card is clickable, but only the
                    title is in the tab order and read out as the link text. */}
                <a href={service.href} className="after:absolute after:inset-0">
                  {service.title}
                </a>
              </h3>

              <p className="text-[14px] leading-[1.5] text-muted md:text-[15px]">
                {service.copy}
              </p>

              <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-soft px-2.5 py-1 text-xs font-medium text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
