'use client'

import { useEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import PortfolioCanvas from '@/components/PortfolioCanvas'
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

      // Horizontal travel is whatever overflows the viewport. Measured in a
      // function so `invalidateOnRefresh` re-reads it after a resize.
      const distance = () => Math.max(track.scrollWidth - viewport.clientWidth, 0)

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
      <PortfolioCanvas progressRef={progressRef} />

      <div className="relative z-10 flex min-h-screen flex-col justify-center py-20 md:py-24">
        <header className="mx-auto w-full max-w-[1200px] shrink-0 px-6 md:px-9">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[620px]">
              <Eyebrow>Selected work</Eyebrow>
              <SectionTitle className="mt-6">
                Things we&rsquo;ve actually <Accent>shipped</Accent>.
              </SectionTitle>
            </div>
            <Lede className="max-w-[340px]">
              Eight builds, from an NGO donation site to a franchise portal and
              a WebGL storefront. Same team on every one.
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
                  58vw from sm upward, deliberately.

                  This previously read `sm:w-[58vw] md:w-[400px] lg:w-[440px]`,
                  but the md and lg values never applied: while md/lg were set
                  in px and sm in rem, Tailwind emitted sm last and it won every
                  conflict above 1200px. Fixing that ordering activated the two
                  overrides for the first time and shrank these cards from
                  ~835px to 440px. The wide card is the intended look, so the
                  dead overrides are gone rather than the ordering re-broken.
                */
                className="group flex w-[78vw] shrink-0 flex-col overflow-hidden rounded-3xl border border-soft bg-bg transition-colors duration-300 hover:bg-chip sm:w-[58vw]"
              >
                {/* Stands in for a screenshot: the client wordmark set large,
                    which reads as a lockup rather than a missing image. */}
                <div className="relative flex aspect-[5/3] items-center justify-center border-b border-soft bg-chip px-8">
                  <span
                    className={`text-center text-[clamp(22px,4vw,30px)] leading-tight text-ink/85 transition-transform duration-500 group-hover:scale-[1.03] ${project.wordmark}`}
                  >
                    {project.name}
                  </span>

                  <span className="absolute top-5 left-6 text-[13px] font-medium text-quiet tabular-nums">
                    {project.id}
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="absolute top-5 right-6 text-quiet transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  />
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
