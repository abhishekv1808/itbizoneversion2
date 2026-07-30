'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import useReducedMotion from '@/lib/useReducedMotion'

/**
 * Pulls its child a little toward the cursor.
 *
 * Deliberately weak — `strength` is a fraction of the distance from centre, so
 * the control never leaves its hit area. A magnetic button that outruns the
 * pointer is a button people miss.
 *
 * Mouse only: on touch there is no hover state to reward, and honouring
 * pointermove there would make the first tap feel like a miss.
 */
export default function Magnetic({ children, strength = 0.22, className = '' }) {
  const ref = useRef(null)
  const reducedMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 240, damping: 22, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 240, damping: 22, mass: 0.4 })

  const onMove = (event) => {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  )
}
