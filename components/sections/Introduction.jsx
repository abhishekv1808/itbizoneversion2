import Image from 'next/image'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import Counter from '@/components/ui/Counter'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'
import { STUDIO_IMAGE } from '@/lib/images'

// `verified` marks a figure that comes from the MCA registration or the
// service list. The rest are PLACEHOLDERS — swap them for real numbers
// before this goes live.
const STATS = [
  { to: 3, suffix: '', label: 'Years in business', verified: true },
  { to: 6, suffix: '', label: 'Services under one roof', verified: true },
  { to: 150, suffix: '+', label: 'Projects delivered' },
  { to: 90, suffix: '%', label: 'Clients who stay on' },
]

export default function Introduction() {
  return (
    <Section id="about">
      <Reveal>
        <Eyebrow>About us</Eyebrow>
      </Reveal>

      <div className="mt-7 grid gap-10 md:grid-cols-12 md:gap-12">
        <Reveal delay={0.05} className="md:col-span-7">
          <SectionTitle>
            One team for the whole <Accent>digital</Accent> stack.
          </SectionTitle>
        </Reveal>

        <Reveal delay={0.12} className="flex flex-col gap-5 md:col-span-5 md:pt-2">
          <Lede>
            ITBIZONE Technologies is a Bengaluru IT consultancy building
            websites, brands and campaigns for businesses that would rather
            not manage four different vendors to get one thing launched.
          </Lede>
          <Lede>
            Because the site, the design and the marketing are made in the same
            room, the handoffs that usually cost you a month simply
            don&rsquo;t happen.
          </Lede>
        </Reveal>
      </div>

      {/* Greyscale so a colour photograph doesn't fight the type system;
          comes to colour on hover. Placeholder — see lib/images.js. */}
      <Reveal delay={0.1} y={28} className="mt-14 md:mt-16">
        <figure className="group relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-soft md:aspect-[21/9]">
          <Image
            src={STUDIO_IMAGE.src}
            alt={STUDIO_IMAGE.alt}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.02] group-hover:grayscale-0"
          />
        </figure>
      </Reveal>

      <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-soft pt-12 md:mt-20 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div className="text-[clamp(38px,9vw,44px)] leading-none font-semibold tracking-[-0.06em] md:text-[52px]">
              <Counter to={stat.to} suffix={stat.suffix} />
            </div>
            <div className="mt-3 text-sm font-medium text-muted">
              {stat.label}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
