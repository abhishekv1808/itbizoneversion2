'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import useReducedMotion from '@/lib/useReducedMotion'

const COPIES = 4

/**
 * Renders `items` four times and drives the track to -50% — the loop point
 * lands between two identical copies, so the seam is invisible.
 */
export default function Marquee({
  items,
  renderItem,
  duration = 30,
  className = '',
}) {
  const trackRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const tween = gsap.to(trackRef.current, {
      xPercent: -50,
      duration,
      ease: 'none',
      repeat: -1,
    })

    return () => tween.kill()
  }, [duration, reducedMotion])

  return (
    <div className={`edge-fade relative overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        {Array.from({ length: COPIES }, (_, copy) =>
          items.map((item, i) => renderItem(item, `${copy}-${i}`))
        )}
      </div>
    </div>
  )
}
