'use client'

import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import gsap from 'gsap'
import useReducedMotion from '@/lib/useReducedMotion'

/**
 * GSAP counts a plain object and writes the formatted value to the node, so
 * the number tweens without re-rendering React on every frame.
 * Framer's useInView supplies the trigger — no ScrollTrigger registration.
 */
export default function Counter({ to, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  // Vertical-only margin. A bare '-60px' also shrinks the root horizontally,
  // which pushes narrow numbers in a left-hand grid column outside the
  // observation window on small viewports and they never fire.
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return

    const write = (v) => {
      el.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`
    }

    if (reducedMotion) {
      write(to)
      return
    }

    const counter = { value: 0 }
    const tween = gsap.to(counter, {
      value: to,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => write(counter.value),
    })

    return () => tween.kill()
  }, [inView, to, prefix, suffix, decimals, reducedMotion])

  return (
    <span ref={ref} data-counter={to}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  )
}
