'use client'

import { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '@/lib/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// Matches `scroll-mt-24` on Section — Lenis drives anchor jumps itself and
// doesn't read scroll-margin, so the header clearance is restated here.
const ANCHOR_OFFSET = -96

/**
 * One clock for everything.
 *
 * Lenis and GSAP each want their own requestAnimationFrame loop, and running
 * both means ScrollTrigger reads a scroll position that Lenis has already
 * moved on from — pinned sections jitter by a frame. Driving `lenis.raf` from
 * the GSAP ticker collapses them into a single ordered update instead.
 */
function GsapBridge() {
  // Passing the callback subscribes it to Lenis' scroll event, so ScrollTrigger
  // recalculates on smoothed positions rather than the native ones.
  const lenis = useLenis(ScrollTrigger.update)

  useEffect(() => {
    if (!lenis) return

    // GSAP's ticker reports seconds; Lenis expects milliseconds.
    const raf = (time) => lenis.raf(time * 1000)

    gsap.ticker.add(raf)
    // Lag smoothing lets GSAP swallow long frames, which desyncs it from the
    // scroll position Lenis reports. Off, the two always agree.
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      gsap.ticker.lagSmoothing(500, 33)
    }
  }, [lenis])

  return null
}

export default function SmoothScroll({ children }) {
  const reducedMotion = useReducedMotion()

  return (
    <ReactLenis
      root
      options={{
        // The GSAP ticker owns the loop — see GsapBridge.
        autoRaf: false,
        // Interpolation factor per frame. Lower glides longer; 0.1 keeps the
        // page responsive to a flick without feeling detached from the wheel.
        lerp: 0.1,
        wheelMultiplier: 1,
        // Touch is left native. Hijacking it fights the platform's own
        // momentum and is the single most common way smooth scroll feels wrong.
        syncTouch: false,
        smoothWheel: !reducedMotion,
        anchors: { offset: ANCHOR_OFFSET },
      }}
    >
      <GsapBridge />
      {children}
    </ReactLenis>
  )
}
