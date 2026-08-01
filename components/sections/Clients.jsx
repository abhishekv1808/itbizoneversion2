'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'
import useReducedMotion from '@/lib/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * ── FILL ME IN ────────────────────────────────────────────────────────────
 * Only the entries below are verified clients, taken from real project
 * folders. The wall renders WALL_SLOTS cells and leaves the remainder blank
 * on purpose — add a `{ name, className }` object per client and the empty
 * cells disappear from the end as you go.
 *
 * `className` is the wordmark treatment. Vary weight and family between
 * neighbours so the wall reads as many brands rather than one list.
 * ──────────────────────────────────────────────────────────────────────────
 */
/*
  Kept in step with lib/projects.js — this wall and the portfolio rail name the
  same clients on the same page, so a name dropped from one has to go from the
  other or the page contradicts itself.

  `logo` is the client's own mark where we have been given one; `className` is
  the wordmark treatment used when we have not. Five of the eight have a logo,
  so both paths render side by side and have to sit at the same visual weight —
  see the grayscale note on the cell below.
*/
const CLIENTS = [
  {
    name: 'Right Assets',
    logo: '/client-logos/Right-assets-management-logo.svg',
    ratio: 4.27,
  },
  {
    name: 'OpenCredit',
    logo: '/client-logos/OpenCredit-logo.webp',
    ratio: 3.01,
  },
  { name: 'Obapstech', className: 'font-[system-ui] font-extrabold' },
  { name: 'Pixcert', className: 'font-sans font-semibold tracking-[-0.06em]' },
  { name: 'Newkumar', className: 'font-[Georgia,serif] font-bold' },
  {
    name: 'Bhoomika Seva Foundation',
    logo: '/client-logos/bhoomika-seva-foundation-logo.png',
    ratio: 1,
  },
  {
    name: 'Krushiyuga',
    logo: '/client-logos/krushiyuga-logo.png',
    ratio: 4,
  },
  // A separate client from Krushiyuga above: the farming business and the
  // environmental non-profit are different brands on different sites.
  { name: 'Namma Krushiyuga', className: 'font-serif font-semibold' },
  /*
    ⚠ Nithyam Organics appears here on the strength of its logo file alone.
    It is in neither lib/projects.js nor any earlier version of this list, so
    unlike the eight above there is nothing in the codebase corroborating the
    engagement. Remove it if the logo was uploaded for something else.
  */
  {
    name: 'Nithyam Organics',
    logo: '/client-logos/Nithyam Organics - Small sized logo.png',
    ratio: 2.25,
  },
]

// 6 × 8 on desktop. Keep it a multiple of 6 so the grid never leaves a ragged
// final row once the wall is full.
const WALL_SLOTS = 48

/*
  How many of those slots are actually shown, per breakpoint.

  The grid is 2 / 4 / 6 columns, so rendering all 48 everywhere gave a phone
  twenty-four rows — 3.8 screens, of which three were empty placeholder dots.
  The wall is meant to read as room to grow, not as a scroll obstacle.

  These keep it six rows wide at every size: 12 at two columns, 24 at four,
  the full 48 at six. Extra slots are hidden with CSS rather than dropped from
  the array, so the server and the client render the same markup and the count
  changes on resize without a re-render.
*/
const VISIBLE_TO_MD = 12
const VISIBLE_TO_LG = 24

export default function Clients() {
  const gridRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const grid = gridRef.current
    if (!grid || reducedMotion) return

    const ctx = gsap.context(() => {
      // Rippling out from the middle makes 48 cells land as one gesture
      // instead of forty-eight separate ones.
      gsap.from('[data-cell]', {
        opacity: 0,
        scale: 0.92,
        duration: 0.6,
        ease: 'power2.out',
        stagger: { grid: 'auto', from: 'center', amount: 0.9 },
        scrollTrigger: { trigger: grid, start: 'top 80%', once: true },
      })
    }, grid)

    return () => ctx.revert()
  }, [reducedMotion])

  const slots = Array.from(
    { length: WALL_SLOTS },
    (_, i) => CLIENTS[i] ?? null
  )

  return (
    <Section id="clients">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-[620px]">
          <Eyebrow>Clients</Eyebrow>
          <SectionTitle className="mt-7">
            The businesses who <Accent>trusted</Accent> us.
          </SectionTitle>
        </Reveal>

        <Reveal delay={0.1} className="max-w-[340px]">
          <Lede>
            Startups, foundations and family businesses — most came for one
            thing and stayed for the rest.
          </Lede>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div
          ref={gridRef}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-soft bg-soft md:grid-cols-4 lg:grid-cols-6"
        >
          {slots.map((client, i) => (
            <div
              key={client?.name ?? `empty-${i}`}
              data-cell
              className={`flex aspect-[3/2] items-center justify-center bg-bg px-3 transition-colors duration-300 hover:bg-chip ${
                i >= VISIBLE_TO_LG
                  ? 'max-lg:hidden'
                  : i >= VISIBLE_TO_MD
                    ? 'max-md:hidden'
                    : ''
              }`}
            >
              {client?.logo ? (
                /*
                  Plain <img>, not next/image. One of these is an SVG, and
                  routing an SVG through the image optimiser needs
                  images.dangerouslyAllowSVG in next.config — a global switch
                  that would apply to every remote pattern too. Loaded as an
                  <img> the browser refuses to run scripts inside an SVG, so
                  this is the safe path and it costs nothing: the five files
                  total under 100KB once the 691KB PNG is served at 48px.

                  Shown in full colour. Grayscale was tried first — the usual
                  logo-wall treatment, and it did settle five clashing palettes
                  next to four grey wordmarks. But desaturating a light mark on
                  a white cell leaves almost nothing: OpenCredit's pale green
                  went to near-white and effectively disappeared. Legibility of
                  the client's actual mark beats tonal tidiness.
                */
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={client.logo}
                  alt={client.name}
                  loading="lazy"
                  decoding="async"
                  /*
                    Capped on both axes, and the height cap depends on shape.

                    A 1:1 mark and a 4.27:1 one cannot share one constraint:
                    max-width alone lets the square ones tower, and a single
                    max-height renders Bhoomika's round badge at 42px beside a
                    140px-wide wordmark — a third of the visual weight. Squarer
                    marks get more height so the two end up roughly equal in
                    area, which is what the eye actually compares.
                  */
                  className={`max-w-[80%] object-contain transition duration-300 hover:scale-[1.04] ${
                    client.ratio <= 1.6
                      ? 'max-h-[56px] lg:max-h-[62px]'
                      : 'max-h-[38px] lg:max-h-[42px]'
                  }`}
                />
              ) : client ? (
                <span
                  className={`text-center text-[15px] leading-tight text-ink/80 transition-colors duration-300 hover:text-ink lg:text-base ${client.className}`}
                >
                  {client.name}
                </span>
              ) : (
                // Empty slot. Reads as grid texture rather than a broken cell.
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-soft"
                />
              )}
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2} className="mt-6">
        <p className="text-[13px] text-quiet">
          Showing {CLIENTS.length} of {WALL_SLOTS} &mdash; more added as
          engagements go public.
        </p>
      </Reveal>
    </Section>
  )
}
