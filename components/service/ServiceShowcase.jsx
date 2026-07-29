'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import { Accent, Eyebrow, Lede } from '@/components/ui/Type'
import { serviceImage } from '@/lib/images'

/**
 * The signature image band. One photograph per service, paired with that
 * service's stats.
 *
 * Greyscale by default, colour on hover: full-colour photography would fight
 * a black-and-white type system, and desaturating it lets the image read as
 * texture while keeping the page's discipline.
 */
export default function ServiceShowcase({ service }) {
  const image = serviceImage(service.slug)
  if (!image) return null

  return (
    <Section id="inside">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-5 md:pt-2">
          <Eyebrow>Inside the work</Eyebrow>
          <h2 className="mt-7 text-[clamp(28px,7vw,34px)] leading-[1.08] font-semibold tracking-[-0.05em] md:text-[clamp(34px,4vw,42px)]">
            {image.caption.split(' ').slice(0, -1).join(' ')}{' '}
            <Accent>{image.caption.split(' ').slice(-1)}</Accent>.
          </h2>
          <Lede className="mt-6 max-w-[380px]">{service.lede}</Lede>

          <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-6">
            {service.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-[28px] leading-none font-semibold tracking-[-0.05em] md:text-[34px]">
                  {stat.value}
                </dt>
                <dd className="mt-2 max-w-[130px] text-[13px] leading-snug text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1} y={28} className="md:col-span-7">
          <motion.figure
            whileHover="hover"
            initial="rest"
            className="group relative overflow-hidden rounded-3xl border border-soft"
          >
            <motion.div
              variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] w-full"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 810px) 100vw, 58vw"
                className="object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
              />
            </motion.div>

            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-[13px] font-medium text-white md:p-7">
              {image.caption}
            </figcaption>
          </motion.figure>
        </Reveal>
      </div>
    </Section>
  )
}
