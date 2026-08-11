'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import dynamic from 'next/dynamic'
import useWebGLWorthIt from '@/lib/useWebGLWorthIt'

// Another static three.js import, and another 532KB of parse on a phone for
// a decorative canvas. Loaded only where useWebGLWorthIt says it earns it.
const PortfolioCanvas = dynamic(() => import('@/components/PortfolioCanvas'), {
  ssr: false,
})
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'
import { PROJECTS } from '@/lib/projects'

gsap.registerPlugin(ScrollTrigger)

// Matches --breakpoint-md. The pin only runs above it; narrow viewports get a
// native swipe instead, which beats fighting the browser for the gesture.
const DESKTOP = '(min-width: 810px) and (prefers-reduced-motion: no-preference)'

export default function Portfolio() {
  const sectionRef = useRef(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const fillRef = useRef(null)
  const progressRef = useRef(0)
  const webglWorthIt = useWebGLWorthIt()
  const skewRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!section || !viewport || !track) return

    const mm = gsap.matchMedia()

    mm.add(DESKTOP, () => {
      // Only hide the native overflow once the pin is actually taking over.
      // Doing this in CSS would strand the cards for anyone on a wide screen
      // with reduced motion on, where this branch never runs.
      viewport.style.overflowX = 'hidden'

      /*
        Horizontal travel is whatever overflows the viewport. Measured in a
        function so `invalidateOnRefresh` re-reads it after a resize.

        The zero guard matters. A refresh can land while the section has no
        layout — mid-resize, on a restored tab, or when a browser recalculates
        during chrome show/hide. clientWidth reads 0 then, and
        `scrollWidth - 0` makes the distance the entire track, which translates
        every card off the left edge and leaves the rail blank with the last
        card clipped against the left margin. Keeping the last good
        measurement means a bad sample is ignored rather than committed.
      */
      let measured = 0
      const distance = () => {
        const width = viewport.clientWidth
        if (!width || !track.scrollWidth) return measured
        measured = Math.max(track.scrollWidth - width, 0)
        return measured
      }

      /*
        Vertical scroll consumed by the pin, which is deliberately less than the
        horizontal distance travelled.

        At 58vw the eight cards make a ~6900px track, so a 1:1 mapping pinned
        the section for ~5450px — roughly six screens of scrolling to pass one
        section. 0.62 keeps it substantial without feeling endless; the cards
        simply move a little faster than the wheel.
      */
      const scrollLength = () => distance() * 0.62

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollLength()}`,
          pin: true,
          /*
            Was 1. A full second of smoothing over a 5450px pin meant a fast
            fling outran the tween: the trigger ended, the section unpinned and
            the middle cards were never drawn — only the last two arrived.
            0.3 still glides but tracks the scroll closely enough that nothing
            is skipped.
          */
          scrub: 0.3,
          // Jumps the tween to its end state if the scroll blows past the
          // trigger, so the track can never be left stranded mid-travel.
          fastScrollEnd: true,
          // Without this a resize keeps the stale scroll distance and the last
          // card ends up unreachable.
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            progressRef.current = self.progress
            if (fillRef.current) {
              gsap.set(fillRef.current, { scaleX: self.progress })
            }
          },
        },
      })

      // Velocity skew, applied to the track rather than each card so it stays
      // one composited transform.
      skewRef.current = gsap.quickTo(track, 'skewX', {
        duration: 0.5,
        ease: 'power3.out',
      })

      return () => {
        skewRef.current = null
        tween.scrollTrigger?.kill()
        tween.kill()
        gsap.set(track, { x: 0, skewX: 0 })
        viewport.style.overflowX = ''
      }
    })

    return () => mm.revert()
  }, [])

  // Lenis reports px/frame. Clamped hard — an unbounded skew shears the cards
  // into unreadable slivers on a fast fling.
  useLenis((lenis) => {
    if (!skewRef.current) return
    skewRef.current(gsap.utils.clamp(-4, 4, lenis.velocity * 0.06))
  })

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative isolate overflow-hidden bg-panel"
    >
      {webglWorthIt ? <PortfolioCanvas progressRef={progressRef} /> : null}

      <div className="relative z-10 flex min-h-screen flex-col justify-center py-20 md:py-24">
        <header className="mx-auto w-full max-w-[1200px] shrink-0 px-6 md:px-9">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[620px]">
              <Eyebrow>Selected work</Eyebrow>
              <SectionTitle className="mt-6">
                Things we&rsquo;ve actually <Accent>shipped</Accent>.
              </SectionTitle>
            </div>
            {/* Counted from the data rather than written out, so removing a
                project can't leave the copy claiming a number the rail does
                not show — which is exactly what "Eight builds" did once
                Lexakind came out. */}
            <Lede className="max-w-[340px]">
              {PROJECTS.length} builds, from NGO donation sites to a lending
              marketplace and a livestock catalogue. Same team on every one.
            </Lede>
          </div>
        </header>

        <div
          ref={viewportRef}
          className="mt-12 w-full overflow-x-auto md:mt-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            ref={trackRef}
            className="flex w-max gap-5 px-6 will-change-transform md:px-9"
          >
            {PROJECTS.map((project) => (
              <article
                key={project.id}
                /*
                  A single viewport-relative width from sm upward, deliberately
                  — no px overrides at md or lg.

                  This once read `sm:w-[58vw] md:w-[400px] lg:w-[440px]`, but
                  the md and lg values never applied: while md/lg were set in px
                  and sm in rem, Tailwind emitted sm last and it won every
                  conflict above 1200px. Fixing that ordering activated the two
                  overrides for the first time and collapsed these cards from
                  ~835px to 440px. Keeping one vw value means there is no
                  ordering left to get wrong.

                  58vw came down to 48vw: ~691px at 1440, which shows a little
                  over two cards at a time instead of 1.7. The pin length is
                  measured from the track rather than assumed, so it follows
                  this on its own.
                */
                className="group flex w-[70vw] shrink-0 flex-col overflow-hidden rounded-3xl border border-soft bg-bg transition-colors duration-300 hover:bg-chip sm:w-[48vw]"
              >
                {/*
                  A real capture where we have one, and the client wordmark set
                  large where we do not — which reads as a lockup rather than a
                  missing image.

                  Gated on screenshotVerified rather than on screenshot being
                  present: most entries still point at the generic stock set,
                  and showing those here would put another company's product on
                  a card headed with this client's name.
                */}
                <div className="relative flex aspect-[5/3] items-center justify-center overflow-hidden border-b border-soft bg-chip px-8">
                  {project.screenshotVerified ? (
                    <Image
                      src={project.screenshot}
                      alt={`${project.name} — ${project.sector} website built by ITBIZONE`}
                      fill
                      sizes="(max-width: 640px) 78vw, 58vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <span
                      className={`text-center text-[clamp(22px,4vw,30px)] leading-tight text-ink/85 transition-transform duration-500 group-hover:scale-[1.03] ${project.wordmark}`}
                    >
                      {project.name}
                    </span>
                  )}

                  {/*
                    Both captures open on a dark full-width bar — OpenCredit's
                    is navy, Krushiyuga's green — and these two sit right on
                    top of it, so grey-on-dark would be unreadable. They get a
                    light chip when there is an image behind them and stay bare
                    against the flat wordmark panel.
                  */}
                  <span
                    className={`absolute top-5 left-6 text-[13px] font-medium tabular-nums ${
                      project.screenshotVerified
                        ? 'rounded-full bg-bg/90 px-2 py-0.5 text-ink backdrop-blur-sm'
                        : 'text-quiet'
                    }`}
                  >
                    {project.id}
                  </span>

                  {project.screenshotVerified ? (
                    <span className="absolute top-5 right-6 inline-flex size-7 items-center justify-center rounded-full bg-bg/90 text-ink backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      <ArrowUpRight size={16} />
                    </span>
                  ) : (
                    <ArrowUpRight
                      size={18}
                      className="absolute top-5 right-6 text-quiet transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-4 p-7 lg:p-8">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-[15px] font-semibold tracking-[-0.03em]">
                      {project.sector}
                    </span>
                    <span className="text-[13px] text-quiet">
                      {project.disciplines.join(' · ')}
                    </span>
                  </div>

                  <p className="text-[15px] leading-[1.5] text-muted">
                    {project.summary}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                    {project.stack.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-soft px-2.5 py-1 text-xs font-medium text-muted"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}

            {/*
              End of the rail.

              Narrower than a project card on purpose — it is a signpost, not
              an eighth build — and it gives the horizontal scroll somewhere to
              land instead of stopping on a hard edge. It also fills whatever
              slack is left over at very wide viewports, where two cards plus
              the container padding do not divide evenly into the track.

              A real anchor, so it works as navigation for anyone who reaches
              it by keyboard rather than by scrolling.

              Contents are centred rather than bottom-aligned: the panel is as
              tall as a project card, and anything pinned to its bottom edge
              lands under the floating WhatsApp button.
            */}
            <a
              href="#case-studies"
              className="group flex w-[52vw] shrink-0 flex-col justify-center rounded-3xl border border-dashed border-soft bg-chip/40 p-7 transition-colors duration-300 hover:bg-chip sm:w-[32vw] lg:w-[26vw]"
            >
              <span className="text-[13px] font-medium text-quiet">
                End of the reel
              </span>
              <span className="mt-3 text-[clamp(24px,3vw,32px)] leading-[1.05] font-semibold tracking-[-0.05em]">
                Up next — <Accent>case studies</Accent>.
              </span>
              <span className="mt-3 text-[15px] leading-[1.45] text-muted">
                Two of these taken apart properly: the brief, the build and what
                actually shipped.
              </span>

              <span className="mt-7 inline-flex items-center gap-2 text-[15px] font-semibold">
                Keep scrolling
                {/*
                  Points down, not out: once the rail ends the section unpins
                  and the page carries on vertically, so that is the direction
                  to signal. It loops rather than waiting for hover, because on
                  a pinned rail most people never put a cursor on this.
                */}
                <ArrowDown
                  size={17}
                  className="motion-safe:animate-[nudge-down_1.6s_ease-in-out_infinite]"
                />
              </span>
            </a>
          </div>
        </div>

        <div className="mx-auto mt-10 flex w-full max-w-[1200px] shrink-0 items-center gap-5 px-6 md:px-9">
          <span className="text-[13px] font-medium text-quiet tabular-nums">
            01
          </span>
          <span className="relative h-px flex-1 bg-soft">
            <span
              ref={fillRef}
              className="absolute inset-0 origin-left scale-x-0 bg-ink"
            />
          </span>
          <span className="text-[13px] font-medium text-quiet tabular-nums">
            {String(PROJECTS.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  )
}
