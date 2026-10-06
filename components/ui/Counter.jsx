'use client'

import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import gsap from 'gsap'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

/**
 * A number that counts up when it scrolls into view.
 *
 * The final value is what renders — on the server and on first paint. The
 * count from zero is a client-only flourish layered on afterwards. It used to
 * be the other way round, so the served HTML said "0 years in business, 0
 * projects": that is what a crawler indexed, and what anyone without
 * JavaScript, or with a slow one, actually saw.
 *
 * GSAP counts a plain object and writes the formatted value to the node, so
 * the number tweens without re-rendering React on every frame. Framer's
 * useInView supplies the trigger — no ScrollTrigger registration.
 */
export default function Counter({ to, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  // Vertical-only margin. A bare '-60px' also shrinks the root horizontally,
  // which pushes narrow numbers in a left-hand grid column outside the
  // observation window on small viewports and they never fire.
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  const final = `${prefix}${to.toFixed(decimals)}${suffix}`

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return

    /*
      Read the media query directly rather than through useReducedMotion. That
      hook starts at `false` and only syncs after mount, so a counter already
      on screen at hydration would start counting before the preference was
      known. With reduced motion the server-rendered final value simply stays.
    */
    if (window.matchMedia(REDUCED_MOTION).matches) return

    const write = (v) => {
      el.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`
    }

    const counter = { value: 0 }
    write(0)
    const tween = gsap.to(counter, {
      value: to,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => write(counter.value),
    })

    // Interrupted mid-count, land on the real figure rather than a partial one.
    return () => {
      tween.kill()
      write(to)
    }
  }, [inView, to, prefix, suffix, decimals])

  return (
    <span ref={ref} data-counter={to}>
      {final}
    </span>
  )
}
