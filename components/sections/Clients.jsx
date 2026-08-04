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
 * ── ADDING A CLIENT ───────────────────────────────────────────────────────
 * Append `{ name, logo, ratio }` where a mark has been supplied, or
 * `{ name, className }` where it has not — the cell branches on `logo`.
 *
 * `className` is the wordmark treatment for the no-logo case. Vary weight and
 * family between neighbours so the wall reads as many brands rather than one
 * list.
 *
 * ⚠ The grid takes its length from this array, so it is exactly as long as
 * the list. Twelve tiles perfectly at 2 / 4 / 6 columns; a thirteenth leaves
 * a ragged final row at every breakpoint. Add in pairs, or accept the gap.
 * ──────────────────────────────────────────────────────────────────────────
 */
/*
  ⚠ This list and lib/projects.js used to name the same clients, and no longer
  do. Obapstech, Pixcert and Newkumar were removed from the wall at the
  client's request but remain projects 03, 04 and 05 in lib/projects.js, so the
  home page still names all three in "Things we've actually shipped" two
  sections above this one. That is a deliberate divergence, not drift — remove
  them from projects.js too if they should disappear from the page entirely.

  `logo` is the client's own mark where we have been given one; `className` is
  the wordmark treatment used when we have not. All but one now have a logo,
  but both paths still render side by side and have to sit at the same visual
  weight — see the sizing note on the cell below.
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
    ⚠ Everything below this line is here on the strength of a logo file alone.
    None of these appear in lib/projects.js or in any earlier version of this
    list, so unlike the eight above there is nothing in the codebase
    corroborating the engagement. Names are read off the artwork. Remove any
    that were uploaded for a different purpose.
  */
  {
    name: 'Nithyam Organics',
    logo: '/client-logos/Nithyam Organics - Small sized logo.png',
    ratio: 2.25,
  },
  { name: 'DS-MAX', logo: '/client-logos/DS-max-logo.png', ratio: 1.15 },
  {
    name: 'MySwasthaLife',
    logo: '/client-logos/Myswasthalife logo.png',
    ratio: 1,
  },
  {
    name: 'Aryavartha Design Consultants',
    logo: '/client-logos/aryavartha-logo.png',
    ratio: 4.44,
  },
  {
    name: 'Babitha Constructions',
    logo: '/client-logos/babitha-construction-logo.png',
    ratio: 1.11,
  },
  /*
    `boxed` marks a logo whose own background is baked in and is not white:
    PureFit is a white wordmark on solid black, Sattva Farm sits on cream.
    They cannot blend into the cell the way the others do, so they are given a
    rounded corner and made to fill it — a deliberate tile rather than a
    rectangle that looks like a transparency bug.
  */
  {
    name: 'PureFit',
    logo: '/client-logos/PureFit - Logo.png',
    ratio: 1,
    boxed: true,
  },
  {
    name: 'Sattva Farm',
    logo: '/client-logos/SattvaFarm-logo.png',
    ratio: 1,
    boxed: true,
  },
]

/*
  No empty slots any more.

  The wall used to render 48 cells and leave the unfilled ones as grey dots,
  which was meant to read as room to grow. With twelve real clients it read as
  an unfinished component instead — three screens of placeholder dots on a
  phone. The grid is now exactly the clients, and the line under it carries
  the "there are more" idea in words rather than in empty boxes.

  Twelve happens to tile perfectly at every breakpoint: 2 x 6, 4 x 3, 6 x 2,
  so no row is ever left ragged. Worth knowing before adding a thirteenth.
*/

export default function Clients() {
  const gridRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const grid = gridRef.current
    if (!grid || reducedMotion) return

    const ctx = gsap.context(() => {
      // Rippling out from the middle lands the grid as one gesture rather
      // than twelve separate ones.
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

  return (
    <Section id="clients">
      <div className="flex flex-col gap-4 md:flex-row md:gap-8 md:items-end md:justify-between">
        <Reveal className="max-w-[620px]">
          <Eyebrow>Recent clients</Eyebrow>
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
          {CLIENTS.map((client) => (
            <div
              key={client.name}
              data-cell
              className="flex aspect-[3/2] items-center justify-center bg-bg px-3 transition-colors duration-300 hover:bg-chip"
            >
              {client.logo ? (
                /*
                  Plain <img>, not next/image. One of these is an SVG, and
                  routing an SVG through the image optimiser needs
                  images.dangerouslyAllowSVG in next.config — a global switch
                  that would apply to every remote pattern too. Loaded as an
                  <img> the browser refuses to run scripts inside an SVG, so
                  this is the safe path. It does mean no automatic resizing:
                  SattvaFarm ships at 2160x2160 and 1.4MB to fill a 62px cell,
                  which is worth compressing at source.

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
                  className={`object-contain transition duration-300 hover:scale-[1.04] ${
                    client.boxed
                      ? // Its own background is the tile, so it fills a fixed
                        // square and is clipped to a radius. Letting it sit at
                        // the shared max-width would leave a hard-edged
                        // rectangle floating in the middle of the cell.
                        'size-[60px] rounded-lg lg:size-[68px]'
                      : client.ratio <= 1.6
                        ? // Squarer marks run larger than the caps alone would
                          // suggest, because several of these files carry a
                          // wide transparent margin: MySwasthaLife, DS-MAX and
                          // Sattva Farm all sit well inside their own canvas,
                          // so the cap bounds the file rather than the mark.
                          // Trimming the artwork is the real fix.
                          'max-h-[66px] max-w-[86%] lg:max-h-[74px]'
                        : 'max-h-[40px] max-w-[86%] lg:max-h-[46px]'
                  }`}
                />
              ) : (
                <span
                  className={`text-center text-[15px] leading-tight text-ink/80 transition-colors duration-300 hover:text-ink lg:text-base ${client.className}`}
                >
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </Reveal>

      {/*
        Carries the "there is more" idea in words, where the empty cells used
        to carry it in boxes. Deliberately no figure: the only client count
        that could be stated here is the length of the array above, and any
        other number would be invented.
      */}
      <Reveal delay={0.2} className="mt-6">
        <p className="text-[13px] text-quiet">
          A recent selection &mdash; {CLIENTS.length} of the businesses we work
          with. More added as engagements go public.
        </p>
      </Reveal>
    </Section>
  )
}
