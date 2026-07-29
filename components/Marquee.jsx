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
  reverse = false,
  className = '',
}) {
  const trackRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    // Reversed rows start already shifted and travel back to 0, so the track
    // is never scrolled past its own content and the seam stays hidden.
    const tween = gsap.fromTo(
      trackRef.current,
      { xPercent: reverse ? -50 : 0 },
      { xPercent: reverse ? 0 : -50, duration, ease: 'none', repeat: -1 }
    )

    return () => tween.kill()
  }, [duration, reverse, reducedMotion])

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
