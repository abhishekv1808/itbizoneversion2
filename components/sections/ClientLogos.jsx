'use client'

import Marquee from '@/components/Marquee'

const COMPANIES = [
  { name: 'Airbnb', className: 'font-cursive font-bold' },
  { name: 'Shopify', className: 'font-[system-ui] font-extrabold' },
  { name: 'Notion', className: 'font-[Georgia,serif] font-medium' },
  { name: 'Linear', className: 'font-sans font-semibold' },
  { name: 'Webflow', className: 'font-sans font-bold' },
  { name: 'Figma', className: 'font-[system-ui] font-semibold' },
  { name: 'Slack', className: 'font-[Georgia,serif] font-bold' },
  { name: 'Stripe', className: 'font-[system-ui] font-extrabold' },
  { name: 'Vercel', className: 'font-sans font-semibold' },
  { name: 'Framer', className: 'font-serif font-semibold' },
]

export default function ClientLogos() {
  return (
    <section id="clients" className="border-y border-soft px-6 md:px-9">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-5 py-9 md:flex-row md:items-center md:gap-10">
        <p className="max-w-[163px] shrink-0 text-sm leading-[1.35] font-medium text-muted">
          Partnered with top-tier companies globally
        </p>

        <Marquee
          items={COMPANIES}
          renderItem={(company, key) => (
            <span
              key={key}
              className={`mr-11 shrink-0 text-base whitespace-nowrap ${company.className}`}
            >
              {company.name}
            </span>
          )}
          className="flex h-9 w-full min-w-0 flex-1 items-center"
        />
      </div>
    </section>
  )
}
