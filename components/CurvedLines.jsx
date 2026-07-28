'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import useReducedMotion from '@/lib/useReducedMotion'

const COUNT = 20
const STAGGER = 0.25

// Widths (side lines) and heights (top lines) both run 60px → 250px.
const sizeAt = (i) => 60 + i * 10

const SIDE_BASE =
  'absolute -top-[10%] h-[120%] border-[2.5px] border-line opacity-0 hidden md:block'
const TOP_BASE =
  'absolute top-0 -left-[10%] w-[120%] border-[2.5px] border-line border-t-0 rounded-b-[80%] origin-top opacity-0 block md:hidden'

export default function CurvedLines() {
  const rootRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray('[data-line]')

      if (reducedMotion) {
        gsap.set(lines, { opacity: 0.35, scale: 1 })
        return
      }

      // Mirrors the original `line-pulse` keyframes: in to 0.9 by 15%,
      // ease down to 0.4 by 70%, out to 0 with a slight contraction.
      lines.forEach((el) => {
        const delay = Number(el.dataset.index) * STAGGER

        gsap
          .timeline({ repeat: -1, delay })
          .fromTo(
            el,
            { opacity: 0, scale: 1 },
            { opacity: 0.9, duration: 0.75, ease: 'power2.out' }
          )
          .to(el, { opacity: 0.4, duration: 2.75, ease: 'sine.inOut' })
          .to(el, { opacity: 0, scale: 0.85, duration: 1.5, ease: 'power2.in' })
      })
    }, rootRef)

    return () => ctx.revert()
  }, [reducedMotion])

  const lines = Array.from({ length: COUNT }, (_, i) => i)

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      {lines.map((i) => (
        <span
          key={`left-${i}`}
          data-line
          data-index={i}
          style={{ width: sizeAt(i) }}
          className={`${SIDE_BASE} left-0 border-l-0 rounded-r-[80%] origin-left`}
        />
      ))}

      {lines.map((i) => (
        <span
          key={`right-${i}`}
          data-line
          data-index={i}
          style={{ width: sizeAt(i) }}
          className={`${SIDE_BASE} right-0 border-r-0 rounded-l-[80%] origin-right`}
        />
      ))}

      {lines.map((i) => (
        <span
          key={`top-${i}`}
          data-line
          data-index={i}
          style={{ height: sizeAt(i) }}
          className={TOP_BASE}
        />
      ))}
    </div>
  )
}
