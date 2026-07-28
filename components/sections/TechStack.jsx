'use client'

import Marquee from '@/components/Marquee'

// Drawn from the stacks listed across the v1 portfolio and service pages.
const TOOLS = [
  { name: 'React', className: 'font-sans font-semibold' },
  { name: 'Next.js', className: 'font-sans font-bold' },
  { name: 'Node.js', className: 'font-[system-ui] font-semibold' },
  { name: 'MongoDB', className: 'font-[system-ui] font-extrabold' },
  { name: 'WordPress', className: 'font-[Georgia,serif] font-medium' },
  { name: 'Shopify', className: 'font-[system-ui] font-extrabold' },
  { name: 'Tailwind CSS', className: 'font-sans font-semibold' },
  { name: 'AWS', className: 'font-[system-ui] font-bold' },
  { name: 'Figma', className: 'font-sans font-semibold' },
  { name: 'Google Ads', className: 'font-[Georgia,serif] font-bold' },
  { name: 'Meta Ads', className: 'font-serif font-semibold' },
  { name: 'Razorpay', className: 'font-[system-ui] font-semibold' },
]

export default function TechStack() {
  return (
    <section id="stack" className="border-y border-soft px-6 md:px-9">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-5 py-9 md:flex-row md:items-center md:gap-10">
        <p className="max-w-[163px] shrink-0 text-sm leading-[1.35] font-medium text-muted">
          Built on tools your next developer will already know
        </p>

        <Marquee
          items={TOOLS}
          renderItem={(tool, key) => (
            <span
              key={key}
              className={`mr-11 shrink-0 text-base whitespace-nowrap ${tool.className}`}
            >
              {tool.name}
            </span>
          )}
          className="flex h-9 w-full min-w-0 flex-1 items-center"
        />
      </div>
    </section>
  )
}
