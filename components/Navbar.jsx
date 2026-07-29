'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { ChevronUp } from 'lucide-react'
import SectionLink from '@/components/ui/SectionLink'
import { SITE } from '@/lib/site'

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Design', href: '#design' },
  { label: 'Industries', href: '#industries' },
  { label: 'About', href: '#about' },
  { label: 'Why us', href: '#why' },
  // A real route, not a section — flagged so it renders as a plain link.
  { label: 'Contact', href: '/contact', route: true },
]

const overlay = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut', staggerChildren: 0.05 },
  },
  exit: { opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } },
}

const linkItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.2 } },
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const lenis = useLenis()

  // Lenis owns the scroll position, so it has to be the thing that stops.
  // Setting body.overflow alone leaves it animating behind the overlay.
  useEffect(() => {
    if (!lenis) return
    if (open) lenis.stop()
    else lenis.start()

    return () => lenis.start()
  }, [open, lenis])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-100">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-[19px] md:px-8 lg:px-9">
          <a
            href="/"
            className="text-[26px] leading-none font-semibold tracking-[-0.06em] md:text-[30px]"
          >
            ITBIZ<span className="font-serif italic">one</span>
          </a>

          <motion.button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            whileHover={{ y: -1, boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-medium text-white"
          >
            Menu
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="inline-flex"
            >
              <ChevronUp size={16} />
            </motion.span>
          </motion.button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={overlay}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-99 flex flex-col bg-bg"
          >
            <nav className="flex flex-1 flex-col items-center justify-center gap-1">
              {LINKS.map((link) => {
                const style =
                  'text-[32px] leading-[1.25] font-medium tracking-[-0.04em] transition-opacity duration-200 hover:opacity-45 lg:text-[40px] xl:text-[48px]'
                const close = () => setOpen(false)

                return (
                  <motion.div key={link.label} variants={linkItem}>
                    {link.route ? (
                      <a href={link.href} onClick={close} className={style}>
                        {link.label}
                      </a>
                    ) : (
                      <SectionLink
                        hash={link.href}
                        onClick={close}
                        className={style}
                      >
                        {link.label}
                      </SectionLink>
                    )}
                  </motion.div>
                )
              })}
            </nav>

            <div className="border-t border-soft px-5 py-6 text-center text-[13px] text-muted md:px-9 md:py-7">
              &copy; {new Date().getFullYear()} {SITE.name} &mdash; All rights
              reserved.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
