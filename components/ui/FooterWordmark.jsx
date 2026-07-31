'use client'

import { useEffect, useRef, useState } from 'react'
import Logo from '@/components/ui/Logo'
import useReducedMotion from '@/lib/useReducedMotion'

// How long the light takes to cross the wordmark once, on entry.
const SWEEP_MS = 1500

const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

/**
 * The footer signature: revealed by a light sweeping across it, then lit by a
 * torch that follows the cursor.
 *
 * Both effects drive the same two layers — a ghost at 10% opacity and a
 * full-strength copy above it, shown through a radial mask. The entry
 * animation is that same mask walked from one edge to the other, so the reveal
 * and the hover are visibly the same light rather than two unrelated tricks.
 *
 * The two layers align because the overlay repeats the host's horizontal
 * padding: the base sits in flow inside px-6/md:px-9, and the overlay is
 * inset-0 with the same padding, so both content boxes resolve to the same
 * width and the 104% logos land on top of each other.
 */
export default function FooterWordmark() {
  const hostRef = useRef(null)
  const lightRef = useRef(null)
  const frameRef = useRef(0)
  const sweepingRef = useRef(false)
  const [revealed, setRevealed] = useState(false)
  const reducedMotion = useReducedMotion()

  /*
    Pointer position is written straight to the DOM as custom properties
    rather than held in state. A pointermove that called setState would
    re-render the whole footer on every frame of a mouse sweep; moving a CSS
    variable only invalidates the mask on one element.
  */
  const put = (x, y) => {
    const light = lightRef.current
    if (!light) return
    light.style.setProperty('--x', `${x}px`)
    light.style.setProperty('--y', `${y}px`)
  }

  const stopSweep = () => {
    cancelAnimationFrame(frameRef.current)
    sweepingRef.current = false
  }

  /* ── Entry reveal ──────────────────────────────────────────────────── */
  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    /*
      threshold 0.4 rather than 0, so the sweep fires when the wordmark is
      actually being looked at. At 0 it would run while only its top pixel had
      crossed the fold — the animation would be over before the visitor
      finished scrolling to it.
    */
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        setRevealed(true)

        // Reduced motion still gets the wordmark, just without the travel.
        if (reducedMotion) return

        const light = lightRef.current
        if (!light) return

        const { width, height } = host.getBoundingClientRect()
        const start = -width * 0.15
        const end = width * 1.15

        sweepingRef.current = true
        light.style.setProperty('opacity', '1')
        put(start, height / 2)

        const t0 = performance.now()
        const step = (now) => {
          if (!sweepingRef.current) return
          const t = Math.min((now - t0) / SWEEP_MS, 1)
          put(start + (end - start) * easeInOut(t), height / 2)

          if (t < 1) {
            frameRef.current = requestAnimationFrame(step)
          } else {
            // Hand back to the ghost. The layer's own opacity transition
            // carries the fade, so the light dims rather than snapping off.
            sweepingRef.current = false
            light.style.setProperty('opacity', '0')
          }
        }
        frameRef.current = requestAnimationFrame(step)
      },
      { threshold: 0.4 }
    )

    io.observe(host)
    return () => {
      io.disconnect()
      stopSweep()
    }
  }, [reducedMotion])

  /* ── Cursor torch ──────────────────────────────────────────────────── */
  const track = (event) => {
    const host = hostRef.current
    if (!host) return
    const rect = host.getBoundingClientRect()
    put(event.clientX - rect.left, event.clientY - rect.top)
  }

  // Guarded on pointerType: a touch fires enter without ever firing leave, so
  // on a phone the torch would light once and then stay lit forever.
  const show = (event) => {
    if (event.pointerType !== 'mouse') return
    // Taking over mid-sweep, or the two would fight over --x and the light
    // would jump between the cursor and the animation on alternate frames.
    stopSweep()
    track(event)
    lightRef.current?.style.setProperty('opacity', '1')
  }

  const hide = () => {
    if (sweepingRef.current) return
    lightRef.current?.style.setProperty('opacity', '0')
  }

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      onPointerEnter={show}
      onPointerMove={track}
      onPointerLeave={hide}
      className="relative mt-12 select-none overflow-hidden px-6 md:mt-16 md:px-9"
    >
      {/* Ghost. Wider than its box on purpose so the padded edges still crop
          it, which is what the type-set version did with negative tracking.

          It rises as it fades in — a small distance, because the mark is
          1400px wide and anything further reads as the footer shifting. */}
      {/*
        `translate`, not `transform`, in the transition list.

        Tailwind v4 emits translate-y-* as the standalone `translate` property
        rather than folding it into `transform` — computed style reads
        `translate: 0px 20px` with `transform: none`. Naming transform here
        transitioned nothing, so the mark snapped to its final position on the
        first frame while only the fade animated.
      */}
      <div
        className={`transition-[opacity,translate] duration-[1200ms] ease-out ${
          revealed ? 'translate-y-0 opacity-10' : 'translate-y-5 opacity-0'
        }`}
      >
        <Logo reversed alt="" className="w-[104%] max-w-none h-auto" />
      </div>

      <div
        ref={lightRef}
        className="pointer-events-none absolute inset-0 px-6 opacity-0 transition-opacity duration-500 ease-out md:px-9"
        style={{
          /*
            The torch. Held soft — a hard-edged circle reads as a cutout rather
            than a light, and the long tail is what makes the letterforms
            emerge gradually as it approaches them.

            Radius scales with the viewport because the wordmark does: a fixed
            180px covers two letters on desktop and half the mark on a phone.
          */
          '--r': 'clamp(120px, 14vw, 260px)',
          '--x': '50%',
          '--y': '50%',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y), #000 0%, rgba(0,0,0,0.85) 40%, transparent 72%)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y), #000 0%, rgba(0,0,0,0.85) 40%, transparent 72%)',
        }}
      >
        <Logo reversed alt="" className="w-[104%] max-w-none h-auto" />
      </div>
    </div>
  )
}
