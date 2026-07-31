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
// Kept in step with lib/projects.js — this wall and the portfolio rail name
// the same clients on the same page, so a name dropped from one has to go
// from the other or the page contradicts itself.
const CLIENTS = [
  { name: 'Right Assets', className: 'font-sans font-bold' },
  { name: 'OpenCredit', className: 'font-sans font-semibold' },
  { name: 'Obapstech', className: 'font-[system-ui] font-extrabold' },
  { name: 'Pixcert', className: 'font-sans font-semibold tracking-[-0.06em]' },
  { name: 'Newkumar', className: 'font-[Georgia,serif] font-bold' },
  { name: 'Bhoomika Seva', className: 'font-serif font-semibold' },
  { name: 'Krushiyuga', className: 'font-sans font-bold' },
  // A separate client from Krushiyuga above: the farming business and the
  // environmental non-profit are different brands on different sites.
  { name: 'Namma Krushiyuga', className: 'font-serif font-semibold' },
]

// 6 × 8 on desktop. Keep it a multiple of 6 so the grid never leaves a ragged
// final row once the wall is full.
const WALL_SLOTS = 48

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
              className="flex aspect-[3/2] items-center justify-center bg-bg px-3 transition-colors duration-300 hover:bg-chip"
            >
              {client ? (
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
