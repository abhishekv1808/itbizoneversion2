'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ArrowUpRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'
import { CASE_STUDIES } from '@/lib/caseStudies'
import { projectAlt } from '@/lib/projects'
import useReducedMotion from '@/lib/useReducedMotion'

/**
 * One large image per study with the copy laid over it, and the whole tile is
 * the link through to that study's own page.
 *
 * The previous version put a screenshot beside a column of bullets, a stack
 * list and a metric grid — which read as a product spec rather than a piece of
 * work. Everything explanatory has moved to /case-studies/<slug>; what is left
 * here is the image, the client, one line, and a way in.
 */
function StudyTile({ study, index }) {
  const imageRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const { project, slug, tagline } = study
  const ordinal = String(index + 1).padStart(2, '0')

  // Scale the image rather than the tile: the tile carries the rounded corners
  // and the overflow clip, so growing the image inside it reads as a push-in
  // without the text moving with it.
  const zoom = (to) => {
    if (reducedMotion) return
    gsap.to(imageRef.current, {
      scale: to ? 1.045 : 1,
      duration: to ? 0.85 : 1,
      ease: 'power3.out',
      overwrite: true,
    })
  }

  return (
    <Reveal y={30}>
      <a
        href={`/case-studies/${slug}`}
        onPointerEnter={() => zoom(true)}
        onPointerLeave={() => zoom(false)}
        onFocus={() => zoom(true)}
        onBlur={() => zoom(false)}
        aria-label={`${project.name} case study — ${project.sector}`}
        className="group relative block overflow-hidden rounded-3xl border border-soft bg-panel"
      >
        {/* Tall on mobile so the overlay has room; wide on desktop. */}
        <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[16/9]">
          <div ref={imageRef} className="absolute inset-0 will-change-transform">
            {project.screenshot ? (
              <Image
                src={project.screenshot}
                alt={projectAlt(project)}
                fill
                sizes="(max-width: 810px) 100vw, (max-width: 1200px) 90vw, 1200px"
                className="object-cover object-top"
              />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-[13px] text-quiet">
                Screenshot pending
              </span>
            )}
          </div>

          {/*
            Two scrims, not one. A single dark wash over the whole image dulls
            the screenshot; a bottom-weighted gradient plus a light top vignette
            keeps the middle of the image clean while still guaranteeing
            contrast under the type.
          */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-transparent transition-colors duration-500 group-hover:from-ink/95"
          />

          {/*
            Only the arrow sits at the top. The index and sector used to live
            here too, but a screenshot of a website is mostly white at the top
            and that is also where its own navigation is — 13px white type over
            a 35% scrim was unreadable and collided with the captured site's
            own logo. Both moved down into the heavy scrim.
          */}
          <span className="absolute top-6 right-6 inline-flex size-10 items-center justify-center rounded-full border border-white/30 bg-ink/40 text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-white group-hover:text-ink md:top-8 md:right-8 md:size-11">
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>

          {/* Name, tagline and stack, bottom edge */}
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10">
            <span className="flex items-baseline gap-3 text-[13px] font-medium tabular-nums text-white/60">
              {ordinal}
              <span className="text-white/80">{project.sector}</span>
            </span>

            <h3 className="mt-2.5 max-w-[16ch] text-[clamp(24px,6.5vw,30px)] leading-[1.06] font-semibold tracking-[-0.05em] text-white md:mt-3 md:max-w-[22ch] md:text-[clamp(38px,4.4vw,54px)] md:leading-[1.02] md:tracking-[-0.055em]">
              {project.name}
            </h3>

            <p className="mt-3 max-w-[46ch] text-[15px] leading-[1.45] text-white/70 md:mt-4 md:text-[14px] md:text-[17px]">
              {tagline}
            </p>

            <ul className="mt-5 flex flex-wrap gap-1.5 md:mt-6">
              {project.stack.slice(0, 4).map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-white/20 px-2.5 py-1 text-[11px] font-medium text-white/75 backdrop-blur-sm md:text-[12px]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </a>
    </Reveal>
  )
}

export default function CaseStudies() {
  return (
    <Section id="case-studies">
      <div className="flex flex-col gap-4 md:flex-row md:gap-8 md:items-end md:justify-between">
        <Reveal className="max-w-[560px]">
          <Eyebrow>Case studies</Eyebrow>
          <SectionTitle className="mt-7">
            Two builds, in <Accent>detail</Accent>.
          </SectionTitle>
        </Reveal>

        <Reveal delay={0.1} className="max-w-[340px]">
          <Lede>
            Both are live and running today. Open either one for the brief, the
            build and the stack behind it.
          </Lede>
        </Reveal>
      </div>

      <div className="mt-14 flex flex-col gap-6 md:mt-16 md:gap-8">
        {CASE_STUDIES.map((study, i) => (
          <StudyTile key={study.slug} study={study} index={i} />
        ))}
      </div>
    </Section>
  )
}
