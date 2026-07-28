import { ArrowUpRight } from 'lucide-react'

const COLUMNS = [
  {
    heading: 'Studio',
    links: ['Services', 'Industries', 'Awards', 'Academy'],
  },
  {
    heading: 'Company',
    links: ['About', 'Team', 'Careers', 'Contact'],
  },
  {
    heading: 'Social',
    links: ['Instagram', 'LinkedIn', 'Dribbble', 'Read.cv'],
    external: true,
  },
]

const LEGAL = ['Privacy', 'Terms', 'Cookies']

export default function Footer() {
  return (
    <footer className="bg-ink px-6 pt-20 pb-10 text-white md:px-9 md:pt-28">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <a
              href="#"
              className="font-serif text-[44px] leading-none font-semibold tracking-[-0.08em] italic md:text-[56px]"
            >
              Alwayzz
              <span className="ml-1 align-super font-sans text-lg font-semibold tracking-normal not-italic">
                &reg;
              </span>
            </a>

            <p className="mt-6 max-w-[300px] text-[15px] leading-[1.5] text-white/55">
              A flexible design partnership for founders, brands, and agencies
              who want top craft delivered on their timeline.
            </p>

            <a
              href="mailto:studio@alwayzz.com"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-white/10"
            >
              studio@alwayzz.com
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-3">
            {COLUMNS.map((column) => (
              <nav key={column.heading} className="flex flex-col gap-4">
                <h3 className="text-[13px] font-medium text-white/40">
                  {column.heading}
                </h3>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href={column.external ? '#' : `#${link.toLowerCase()}`}
                        className="text-[15px] font-medium text-white/75 transition-colors duration-200 hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-8 text-[13px] text-white/45 md:flex-row md:items-center md:justify-between">
          {/* Explicit {' '} — a wrapped JSX text node loses its leading space. */}
          <p>
            &copy; {new Date().getFullYear()}{' '}
            Alwayzz&reg; &mdash; All rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            {LEGAL.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="transition-colors duration-200 hover:text-white"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
