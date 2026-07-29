import { ChevronRight } from 'lucide-react'
import BookCall from '@/components/ui/BookCall'
import SectionLink from '@/components/ui/SectionLink'
import { Accent } from '@/components/ui/Type'

export default function ServiceHero({ service }) {
  const [before, accent, after] = service.title

  return (
    <section className="border-b border-soft px-6 pt-32 pb-20 md:px-9 md:pt-40 md:pb-28">
      <div className="mx-auto w-full max-w-[1200px]">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-[13px] text-quiet"
        >
          <a href="/" className="transition-colors hover:text-ink">
            Home
          </a>
          <ChevronRight size={13} />
          <SectionLink hash="#services" className="transition-colors hover:text-ink">
            Services
          </SectionLink>
          <ChevronRight size={13} />
          <span className="text-muted">{service.name}</span>
        </nav>

        <h1 className="mt-8 max-w-[880px] text-[clamp(40px,11vw,50px)] leading-[1.04] font-semibold tracking-[-0.065em] md:text-[clamp(58px,7.5vw,74px)] lg:text-[84px]">
          {before} <Accent>{accent}</Accent>
          {after}
        </h1>

        <p className="mt-7 max-w-[560px] text-[17px] leading-[1.45] text-muted">
          {service.lede}
        </p>

        <div className="mt-9 flex w-full max-w-[320px] flex-col items-center gap-4 md:max-w-none md:flex-row">
          <a
            href="#quote"
            className="inline-flex h-14 w-full items-center justify-center rounded-full bg-ink px-[30px] text-[15px] font-semibold text-white transition-transform duration-200 hover:-translate-y-px md:w-auto"
          >
            Get a quotation
          </a>
          <BookCall />
        </div>

        <dl className="mt-16 grid grid-cols-3 gap-6 border-t border-soft pt-10">
          {service.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-[clamp(28px,7vw,34px)] leading-none font-semibold tracking-[-0.05em] md:text-[42px]">
                  {stat.value}
                </span>
                <span className="mt-2.5 block text-[13px] font-medium text-muted">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
