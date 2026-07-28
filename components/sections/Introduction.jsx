import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import Counter from '@/components/ui/Counter'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'

const STATS = [
  { to: 12, suffix: '', label: 'Years in practice' },
  { to: 240, suffix: '+', label: 'Projects shipped' },
  { to: 38, suffix: '', label: 'Countries served' },
  { to: 96, suffix: '%', label: 'Client retention' },
]

export default function Introduction() {
  return (
    <Section id="about">
      <Reveal>
        <Eyebrow>About the studio</Eyebrow>
      </Reveal>

      <div className="mt-7 grid gap-10 md:grid-cols-12 md:gap-12">
        <Reveal delay={0.05} className="md:col-span-7">
          <SectionTitle>
            A studio built for the way modern teams <Accent>actually</Accent>{' '}
            ship.
          </SectionTitle>
        </Reveal>

        <Reveal delay={0.12} className="flex flex-col gap-5 md:col-span-5 md:pt-2">
          <Lede>
            Alwayzz is a small, senior team that plugs into your roadmap instead
            of sitting beside it. No account layers, no handoff theatre — the
            people who scope the work are the people who make it.
          </Lede>
          <Lede>
            We work in continuous partnerships rather than one-off projects, so
            the craft compounds release after release.
          </Lede>
        </Reveal>
      </div>

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
