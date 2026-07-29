'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion'
import useReducedMotion from '@/lib/useReducedMotion'

/**
 * Scroll-driven morph gallery: scatter → line → circle → arc.
 *
 * ── Two deliberate departures from the reference implementation ───────────
 *
 * 1. No wheel hijacking. The original called preventDefault() on wheel and
 *    drove a virtual scroll counter, which would fight Lenis (this site's
 *    smooth scroll owns the scroll position) and trap the visitor for 3000px
 *    with no way to continue down the page. Here a tall track holds a sticky
 *    viewport and the morph is driven by real scroll progress through it, so
 *    the page still scrolls normally and the section releases on its own.
 *
 * 2. No colour of its own. The reference set its own greys, a blue accent and
 *    a dark :root. Everything here uses the site's tokens so the section
 *    cannot drift away from the rest of the page.
 * ──────────────────────────────────────────────────────────────────────────
 */

const CARD_W = 62
const CARD_H = 93 // 2:3, matching the poster artwork

const lerp = (a, b, t) => a * (1 - t) + b * t

function FlipCard({ item, motionValues, index }) {
  const { x, y, rotation, scale, opacity } = motionValues

  return (
    <motion.div
      animate={{ x, y, rotate: rotation, scale, opacity }}
      transition={{ type: 'spring', stiffness: 40, damping: 15 }}
      style={{
        position: 'absolute',
        width: CARD_W,
        height: CARD_H,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className="group cursor-pointer"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        {/* Front — the artwork */}
        <div
          className="absolute inset-0 overflow-hidden rounded-md border border-soft bg-panel shadow-[0_4px_16px_rgba(0,0,0,0.10)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {item.src ? (
            <img
              src={item.src}
              alt={`${item.title} — ${item.category}`}
              className="h-full w-full object-cover"
              draggable={false}
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-[10px] text-quiet">
              {item.id}
            </span>
          )}
        </div>

        {/* Back — the caption, so the flip reveals something worth reading */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-1 overflow-hidden rounded-md bg-ink px-2 text-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="text-[7px] font-semibold tracking-[0.18em] text-white/45 uppercase">
            {item.category}
          </span>
          <span className="text-[9px] leading-tight font-medium text-white">
            {item.title}
          </span>
        </div>
      </motion.div>
      <span className="sr-only">{`${item.title}, ${item.category}`}</span>
      <span aria-hidden="true" hidden>
        {index}
      </span>
    </motion.div>
  )
}

export default function ScrollMorphHero({
  items = [],
  eyebrow,
  introTitle,
  introHint,
  activeTitle,
  activeCopy,
}) {
  const trackRef = useRef(null)
  const stageRef = useRef(null)
  const reducedMotion = useReducedMotion()

  const [phase, setPhase] = useState('scatter') // scatter | line | circle
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [morph, setMorph] = useState(0)
  const [sweep, setSweep] = useState(0)
  const [parallax, setParallax] = useState(0)

  const total = items.length
  const inView = useInView(trackRef, { margin: '-15% 0px' })

  /* ── Stage size ─────────────────────────────────────────────────────── */
  useEffect(() => {
    const el = stageRef.current
    if (!el) return

    const apply = () =>
      setSize({ width: el.offsetWidth, height: el.offsetHeight })

    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  /* ── Intro, held until the section is actually on screen ────────────── */
  useEffect(() => {
    if (!inView) return

    if (reducedMotion) {
      setPhase('circle')
      return
    }

    const a = setTimeout(() => setPhase('line'), 400)
    const b = setTimeout(() => setPhase('circle'), 1800)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [inView, reducedMotion])

  /* ── Real scroll progress through the tall track ────────────────────── */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  // Circle holds briefly, morphs to the arc, then the arc sweeps.
  const morphRaw = useTransform(scrollYProgress, [0.05, 0.4], [0, 1])
  const sweepRaw = useTransform(scrollYProgress, [0.4, 0.95], [0, 1])

  const morphSpring = useSpring(morphRaw, { stiffness: 40, damping: 20 })
  const sweepSpring = useSpring(sweepRaw, { stiffness: 40, damping: 20 })

  useEffect(() => {
    const unsubs = [
      morphSpring.on('change', setMorph),
      sweepSpring.on('change', setSweep),
    ]
    return () => unsubs.forEach((u) => u())
  }, [morphSpring, sweepSpring])

  /* ── Pointer parallax, mouse only ───────────────────────────────────── */
  useEffect(() => {
    const el = stageRef.current
    if (!el || reducedMotion) return

    const onMove = (event) => {
      if (event.pointerType !== 'mouse') return
      const rect = el.getBoundingClientRect()
      const normalised = ((event.clientX - rect.left) / rect.width) * 2 - 1
      setParallax(normalised * 60)
    }

    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [reducedMotion])

  /* ── Scatter start, stable across re-renders ────────────────────────── */
  const scatter = useMemo(
    () =>
      items.map((_, i) => {
        // Deterministic, so the layout never differs between renders.
        const a = Math.sin(i * 12.9898) * 43758.5453
        const b = Math.sin(i * 78.233) * 12345.6789
        return {
          x: ((a % 1) - 0.5) * 1400,
          y: ((b % 1) - 0.5) * 900,
          rotation: ((a % 1) - 0.5) * 160,
          scale: 0.6,
          opacity: 0,
        }
      }),
    [items]
  )

  const contentOpacity = useTransform(morphSpring, [0.75, 1], [0, 1])
  const contentY = useTransform(morphSpring, [0.75, 1], [16, 0])
  const introOpacity = Math.max(0, 1 - morph * 2.2)

  return (
    // 300vh of track gives the morph and the sweep room to breathe without
    // the visitor feeling held; the sticky stage is one viewport tall.
    <section ref={trackRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-panel">
        <div
          ref={stageRef}
          className="relative flex h-full w-full items-center justify-center"
        >
          {/* Intro copy — fades as the circle breaks into the arc */}
          <div
            className="pointer-events-none absolute z-0 flex flex-col items-center px-6 text-center"
            style={{ opacity: phase === 'circle' ? introOpacity : 0 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
              animate={
                phase === 'circle'
                  ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                  : {}
              }
              transition={{ duration: 0.9 }}
              className="max-w-[520px] text-[clamp(26px,6vw,32px)] leading-[1.08] font-semibold tracking-[-0.05em] md:text-[clamp(34px,4vw,44px)]"
            >
              {introTitle}
            </motion.h2>
            <p className="mt-5 text-[12px] font-semibold tracking-[0.2em] text-quiet uppercase">
              {introHint}
            </p>
          </div>

          {/* Arc copy — fades in once the arc has formed */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="pointer-events-none absolute top-[8%] z-10 flex flex-col items-center px-6 text-center"
          >
            {eyebrow ? (
              <span className="inline-flex items-center rounded-full border border-soft bg-bg px-3.5 py-1.5 text-[13px] font-medium text-muted">
                {eyebrow}
              </span>
            ) : null}
            <h3 className="mt-6 max-w-[560px] text-[clamp(26px,6vw,32px)] leading-[1.08] font-semibold tracking-[-0.05em] md:text-[clamp(34px,4vw,44px)]">
              {activeTitle}
            </h3>
            <p className="mt-4 max-w-[460px] text-[15px] leading-[1.5] text-muted">
              {activeCopy}
            </p>
          </motion.div>

          {/* Cards */}
          <div className="relative flex h-full w-full items-center justify-center">
            {items.map((item, i) => {
              let target

              if (phase === 'scatter') {
                target = scatter[i]
              } else if (phase === 'line') {
                const spacing = 68
                target = {
                  x: i * spacing - (total * spacing) / 2,
                  y: 0,
                  rotation: 0,
                  scale: 1,
                  opacity: 1,
                }
              } else {
                const isMobile = size.width < 810
                const minDimension = Math.min(size.width, size.height)

                // Ring
                const ringRadius = Math.min(minDimension * 0.34, 320)
                const ringAngle = (i / total) * 360
                const ringRad = (ringAngle * Math.PI) / 180
                const ring = {
                  x: Math.cos(ringRad) * ringRadius,
                  y: Math.sin(ringRad) * ringRadius,
                  rotation: ringAngle + 90,
                }

                /*
                  Arc — convex up, apex above centre.

                  x/y here are translations from the centre of a flex-centred
                  stage, not coordinates from its top-left. The arc's centre
                  therefore has to be expressed relative to the centre too:
                  measuring the apex from the top pushes the whole arc down by
                  half the stage height and walks the cards off the bottom.

                  Radius is chosen so the chord spans the stage rather than
                  overshooting it: half-width = radius × sin(spread / 2).
                */
                const spread = isMobile ? 104 : 76
                const arcRadius = isMobile
                  ? Math.min(size.width * 1.5, size.height * 0.85)
                  : Math.min(size.width * 0.75, size.height * 1.2)

                // Apex sits only slightly above centre. Higher than this and
                // the tallest cards run up behind the heading block.
                const apexFromCentre = -size.height * (isMobile ? 0.06 : 0.04)
                const arcCentre = apexFromCentre + arcRadius

                const startAngle = -90 - spread / 2
                const step = spread / Math.max(total - 1, 1)

                // Half a spread of travel: early cards leave as later ones
                // arrive, without emptying the frame.
                const angle = startAngle + i * step - sweep * spread * 0.5

                const arcRad = (angle * Math.PI) / 180
                const arc = {
                  x: Math.cos(arcRad) * arcRadius + parallax,
                  y: Math.sin(arcRad) * arcRadius + arcCentre,
                  rotation: angle + 90,
                  scale: isMobile ? 1.2 : 1.6,
                }

                target = {
                  x: lerp(ring.x, arc.x, morph),
                  y: lerp(ring.y, arc.y, morph),
                  rotation: lerp(ring.rotation, arc.rotation, morph),
                  scale: lerp(1, arc.scale, morph),
                  opacity: 1,
                }
              }

              return (
                <FlipCard key={item.id ?? i} item={item} index={i} motionValues={target} />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
