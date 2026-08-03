'use client'

import { useEffect, useMemo, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from '@/components/ui/Reveal'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'
import { PROJECTS } from '@/lib/projects'
import useReducedMotion from '@/lib/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// Three copies: the track travels exactly one copy's width, so the wrap point
// always lands on an identical frame.
const COPIES = 3
const SPEED = 42 // seconds per copy

function BrowserFrame({ project }) {
  const cardRef = useRef(null)
  const reducedMotion = useReducedMotion()

  /*
    Tilt is written straight to the element rather than through React state.
    A pointermove that re-renders is the classic way a card like this drops
    frames — the transform is cheap, the reconciliation is not.
  */
  const onMove = (event) => {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const el = cardRef.current
    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    gsap.to(el, {
      rotateY: px * 11,
      rotateX: -py * 8,
      y: -10,
      scale: 1.02,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: true,
    })
  }

  const reset = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: 'power3.out',
      overwrite: true,
    })
  }

  return (
    <article
      className="group mr-6 w-[78vw] shrink-0 sm:w-[440px] lg:w-[520px]"
      style={{ perspective: 1200 }}
    >
      <div
        ref={cardRef}
        onPointerMove={onMove}
        onPointerLeave={reset}
        className="overflow-hidden rounded-2xl border border-soft bg-bg shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-shadow duration-500 group-hover:shadow-[0_26px_60px_-18px_rgba(0,0,0,0.28)] will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Preview */}
        <div className="w-full overflow-hidden bg-panel">
          {project.screenshot ? (
            <Image
              src={project.screenshot}
              alt={`${project.name} — ${project.sector} website`}
              width={520}
              height={0}
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 440px, 520px"
              className="h-auto w-full"
              draggable={false}
            />
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default function DevShowcase() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const tweenRef = useRef(null)
  const reducedMotion = useReducedMotion()

  const projects = useMemo(
    () => PROJECTS.filter((p) => p.disciplines.includes('Website')),
    []
  )



  /* ── Marquee ────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const track = trackRef.current
    if (!track || reducedMotion) return

    const tween = gsap.to(track, {
      xPercent: -100 / COPIES,
      duration: SPEED,
      ease: 'none',
      repeat: -1,
    })
    tweenRef.current = tween

    // Only run while the section is on screen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? tween.play() : tween.pause()),
      { threshold: 0 }
    )
    io.observe(track)

    return () => {
      io.disconnect()
      tween.kill()
    }
  }, [reducedMotion])

  /* ── Staggered entrance ─────────────────────────────────────────────────── */
  useEffect(() => {
    if (reducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('[data-card]', {
        opacity: 0,
        y: 46,
        duration: 1,
        stagger: 0.07,
        ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [reducedMotion])

  const pause = () => tweenRef.current?.pause()
  const resume = () => tweenRef.current?.play()

  return (
    <section id="work" ref={sectionRef} className="overflow-hidden py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-9">
        <div className="flex flex-col gap-4 md:flex-row md:gap-8 md:items-end md:justify-between">
          <Reveal className="max-w-[560px]">
            <Eyebrow>Selected builds</Eyebrow>
            <SectionTitle className="mt-7">
              Shipped, and still <Accent>running</Accent>.
            </SectionTitle>
          </Reveal>
          <Reveal delay={0.1} className="max-w-[330px]">
            <Lede>
              Every stack listed was read off that project&rsquo;s own
              package.json. Hover to hold the row still.
            </Lede>
          </Reveal>
        </div>
      </div>

      {/* Full-bleed rail. Edge mask so cards enter and leave rather than
          appearing at a hard boundary. */}
      <div
        className="edge-fade mt-14 overflow-hidden"
        onPointerEnter={pause}
        onPointerLeave={resume}
        onFocusCapture={pause}
        onBlurCapture={resume}
      >
        <div ref={trackRef} className="flex w-max will-change-transform">
          {Array.from({ length: COPIES }, (_, copy) =>
            projects.map((project) => (
              <div data-card key={`${copy}-${project.id}`}>
                <BrowserFrame project={project} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
