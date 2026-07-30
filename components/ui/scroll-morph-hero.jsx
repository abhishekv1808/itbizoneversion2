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

// 9:16 — Instagram story / WhatsApp status. The artwork is drawn at the same
// ratio in DesignShowcase, so nothing is cropped.
const CARD_W = 108
const CARD_H = 192

/**
 * Clear space between neighbouring cards in the arc, in px.
 *
 * This is the knob for how many cards are on stage at once: the count is
 * roughly stageWidth / (CARD_W × arcScale + CARD_GAP). At 108 × 1.3 that is
 * ~10–11 across 1440px. More cards on stage needs a smaller card, not a
 * smaller gap — dropping the gap to 0 only buys one more.
 */
const CARD_GAP = 8

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
          className="absolute inset-0 overflow-hidden rounded-xl border border-soft bg-panel shadow-[0_4px_16px_rgba(0,0,0,0.10)]"
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
          className="absolute inset-0 flex flex-col items-center justify-center gap-1 overflow-hidden rounded-xl bg-ink px-3 text-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="text-[9px] font-semibold tracking-[0.18em] text-white/45 uppercase">
            {item.category}
          </span>
          <span className="text-[13px] leading-tight font-medium text-white">
            {item.title}
          </span>
          <span className="mt-1 text-[9px] text-white/35">{item.id}</span>
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

  /*
    The ring holds for the first sixth of the track before anything moves.

    Starting the morph at 0.05 meant the ring was already being pulled toward
    the arc — whose centre is a radius away — within a few pixels of scrolling.
    It deformed out of round immediately and cards drifted across the heading
    while the intro copy was still the thing being read.
  */
  const morphRaw = useTransform(scrollYProgress, [0.16, 0.46], [0, 1])
  const sweepRaw = useTransform(scrollYProgress, [0.46, 0.96], [0, 1])

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
      // Smaller than it was: at story proportions a 60px slide is enough to
      // push the outermost cards off the edge.
      setParallax(normalised * 38)
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
              // Narrow enough to sit inside the ring's clear hole
              // (R − CARD_H × ringScale / 2), which is ~500px on desktop.
              className="max-w-[380px] text-[clamp(24px,5.5vw,30px)] leading-[1.1] font-semibold tracking-[-0.05em] md:max-w-[420px] md:text-[clamp(30px,3.4vw,38px)]"
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
                const spacing = CARD_W + 12
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

                /*
                  Ring, solved for the largest card that fits rather than a
                  hardcoded scale.

                  Two constraints, both linear in the scale s:
                    spacing  R = total × (CARD_W·s + CARD_GAP) / 2π
                    bounds   R + (CARD_H·s) / 2 ≤ ringBound

                  Substituting the first into the second and solving for s
                  gives the biggest cards the stage can hold while keeping them
                  apart. Hardcoding 0.5 left them far smaller than necessary
                  and pulled the ring's hole in so tight that the cards
                  covered the heading.

                  Cards sit tangentially, so their long side runs radially:
                  the clear hole is R − CARD_H·s / 2, which is what the intro
                  copy has to fit inside.
                */
                const ringBound = Math.min(
                  size.height / 2 - 16,
                  // A little horizontal bleed is fine; the stage clips it.
                  size.width / 2 + 64
                )
                const perScale = (total * CARD_W) / (2 * Math.PI) + CARD_H / 2
                const perGap = (total * CARD_GAP) / (2 * Math.PI)

                const ringScale = Math.max(
                  0.35,
                  Math.min((ringBound - perGap) / perScale, 1)
                )
                const ringRadius =
                  (total * (CARD_W * ringScale + CARD_GAP)) / (2 * Math.PI)
                void minDimension
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
                /*
                  Spacing is the input, spread is the output.

                  Previously step = spread / (total − 1) with spread fixed,
                  which decoupled spacing from card size entirely: enlarging
                  the cards widened them to 140px while leaving a 64px pitch,
                  so each one covered half its neighbour, and adding a card
                  only tightened it further.

                  Deriving step from a target pixel pitch inverts that —
                  spacing is guaranteed at any card size or count, and the
                  spread grows instead of squeezing. The arc then runs wider
                  than the stage, so a window of it is visible and the sweep
                  carries the visitor along it.
                */
                const arcScale = isMobile ? 1.15 : 1.5
                const pitch = CARD_W * arcScale + CARD_GAP
                const arcRadius = isMobile ? 1000 : 2200

                const step = ((pitch / arcRadius) * 180) / Math.PI
                const halfWidth = size.width / 2

                // Angular width of the on-stage window, and how many cards
                // that holds. x = radius × sin(δ), so the window edge is where
                // sin(δ) reaches halfWidth / radius.
                const windowDeg =
                  (2 * Math.asin(Math.min(halfWidth / arcRadius, 1)) * 180) /
                  Math.PI
                const visible = Math.max(windowDeg / step, 1)

                // Which card sits at the apex. Clamped half a window in from
                // each end so the frame is never half empty at the extremes.
                const minCentre = visible / 2
                const maxCentre = Math.max(total - 1 - visible / 2, minCentre)
                const centreIndex = lerp(minCentre, maxCentre, sweep)

                // Just below centre: high enough that the end cards clear the
                // stage floor, low enough that the apex clears the heading.
                const apexFromCentre = size.height * 0.022
                const arcCentre = apexFromCentre + arcRadius

                const offset = i - centreIndex
                const angle = -90 + offset * step
                const arcRad = (angle * Math.PI) / 180

                /*
                  Focus falloff and edge fade, both measured in cards from the
                  apex rather than in pixels, so they track the spacing.
                */
                const reach = Math.max(visible / 2, 1)
                const t = Math.min(Math.abs(offset) / reach, 2)
                const focusScale = 1 - Math.min(t, 1) * 0.1
                const focusOpacity = 1 - Math.min(t, 1) * 0.42
                // Past the window edge, ease out rather than clip.
                const edgeFade = t > 1 ? Math.max(0, 1 - (t - 1) * 2.5) : 1

                const arc = {
                  x: Math.cos(arcRad) * arcRadius + parallax,
                  y: Math.sin(arcRad) * arcRadius + arcCentre,
                  rotation: angle + 90,
                  scale: arcScale * focusScale,
                  opacity: focusOpacity * edgeFade,
                }

                target = {
                  x: lerp(ring.x, arc.x, morph),
                  y: lerp(ring.y, arc.y, morph),
                  rotation: lerp(ring.rotation, arc.rotation, morph),
                  scale: lerp(ringScale, arc.scale, morph),
                  // Ring shows every card at full weight; the falloff only
                  // applies once the arc has formed.
                  opacity: lerp(1, arc.opacity, morph),
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
