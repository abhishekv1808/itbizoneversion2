'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'
import { PROJECTS } from '@/lib/projects'
import useReducedMotion from '@/lib/useReducedMotion'

/*
  Every phone is drawn to the same height and lets its width follow.

  The captures do not share a bounding box — two are 800x1648 shot straight
  on, the third is 936x1170 because its device is tilted and needs a wider
  box to hold the same phone. Laying them out on a shared aspect ratio would
  either letterbox the tall pair or squash the tilted one; matching on height
  instead stands them on a common baseline, which is how phones next to each
  other are read.
*/
const PHONE_H = 'h-[420px] md:h-[520px] lg:h-[560px]'

// How far each phone drifts across the section, in px. Alternating signs give
// the row a gentle counter-motion instead of moving as one block.
const DRIFT = [-26, 18, -14]

function Phone({ project, index, progress, reducedMotion }) {
  const y = useTransform(progress, [0, 1], [DRIFT[index % DRIFT.length], 0])

  return (
    <Reveal y={28} delay={index * 0.09}>
      <motion.figure
        style={reducedMotion ? undefined : { y }}
        className="flex flex-col items-center"
      >
        {/*
          No frame, no radius, no shadow. The artwork already contains a
          device and sits on transparency — anything added here would read as
          a phone inside a phone.
        */}
        <Image
          src={project.mobile.src}
          alt={`${project.name} — the ${project.sector.toLowerCase()} site on a phone`}
          width={project.mobile.width}
          height={project.mobile.height}
          sizes="(max-width: 810px) 60vw, 30vw"
          className={`${PHONE_H} w-auto object-contain`}
        />

        <figcaption className="mt-6 text-center">
          <span className="block text-[15px] font-semibold tracking-[-0.03em]">
            {project.name}
          </span>
          <span className="mt-1 block text-[13px] text-quiet">
            {project.sector}
          </span>
        </figcaption>
      </motion.figure>
    </Reveal>
  )
}

/**
 * Proof that the sites work on a phone, using the same three builds shown
 * elsewhere on the page rather than a separate set of mockups.
 *
 * Driven off `mobile` in lib/projects.js: give any project a capture and it
 * appears here, in the order the portfolio already lists them.
 */
export default function Responsive() {
  const sectionRef = useRef(null)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })

  const projects = PROJECTS.filter((project) => project.mobile)
  if (!projects.length) return null

  return (
    <div ref={sectionRef}>
      <Section id="responsive" className="bg-panel">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-[600px]">
            <Eyebrow>Responsive</Eyebrow>
            <SectionTitle className="mt-7">
              Built for the screen it&rsquo;s <Accent>opened on</Accent>.
            </SectionTitle>
          </Reveal>

          <Reveal delay={0.1} className="max-w-[340px]">
            <Lede>
              The same three builds, on a phone. Navigation, forms and layout
              are rebuilt for the smaller screen rather than shrunk to fit.
            </Lede>
          </Reveal>
        </div>

        {/*
          A scroll rail below md, not a stack. Three phones stacked vertically
          make the section several screens tall on the device the section is
          about — swiping through them is both shorter and the more honest
          gesture.
        */}
        <div className="scrollbar-none mt-16 flex snap-x snap-mandatory items-end gap-10 overflow-x-auto pb-2 md:mt-20 md:justify-center md:gap-14 md:overflow-visible lg:gap-20">
          {projects.map((project, i) => (
            <div key={project.id} className="shrink-0 snap-center">
              <Phone
                project={project}
                index={i}
                progress={scrollYProgress}
                reducedMotion={reducedMotion}
              />
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
