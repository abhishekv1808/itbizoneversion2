'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { ChevronUp } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import SectionLink from '@/components/ui/SectionLink'
import { SITE } from '@/lib/site'

/*
  The primary navigation, and the order matters beyond this menu.

  Google builds sitelinks largely from a site's primary nav and from how
  consistently the same pages are linked across it. The routes below are
  listed in the order we want them considered, and the footer's Services
  column, the home page's service cards and navigationSchema() in
  lib/schema.js are kept in the same sequence.

  Real routes first, on-page anchors after: an anchor is not a page Google can
  offer as a sitelink, so putting #work and #about above the service pages was
  spending the most prominent slots on links that can never appear.

  E-commerce Development is deliberately not here. It is a real page and stays
  linked from the footer and the services grid, but every extra entry dilutes
  the ones that matter.
*/
const LINKS = [
  { label: 'Website Development', href: '/services/website-development', route: true },
  { label: 'App Development', href: '/services/app-development', route: true },
  { label: 'Graphic Design', href: '/services/graphic-design', route: true },
  { label: 'Social Media Management', href: '/services/social-media-management', route: true },
  { label: 'Digital Marketing', href: '/services/digital-marketing', route: true },
  { label: 'UI/UX Design', href: '/services/ui-ux-design', route: true },
  { label: 'Contact', href: '/contact', route: true },

  // Secondary: on-page sections, and the estimator.
  { label: 'Selected work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '/quote', route: true },
]

const overlay = {
  // visibility, not just opacity: an opacity-0 layer still covers the page and
  // swallows every click behind it.
  hidden: { opacity: 0, visibility: 'hidden' },
  show: {
    opacity: 1,
    visibility: 'visible',
    transition: { duration: 0.4, ease: 'easeOut', staggerChildren: 0.05 },
  },
}

const linkItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.2 } },
}

/**
 * True while a section that opted into `data-nav="invert"` sits under the
 * fixed header.
 *
 * The header floats over whatever is beneath it, so on a dark hero the black
 * wordmark disappeared entirely. Rather than special-casing that one page, any
 * section can declare itself dark and the header adapts.
 *
 * The rootMargin collapses the observer's viewport to a 1px band at the very
 * top — the only strip the header actually overlaps — so a dark section
 * further down the page does not trigger it.
 */
function useOnDarkSection() {
  const [onDark, setOnDark] = useState(false)

  useEffect(() => {
    const targets = document.querySelectorAll('[data-nav="invert"]')
    if (!targets.length) return

    const seen = new Set()
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) seen.add(entry.target)
          else seen.delete(entry.target)
        }
        setOnDark(seen.size > 0)
      },
      { rootMargin: '0px 0px -100% 0px', threshold: 0 }
    )

    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  return onDark
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const onDark = useOnDarkSection()
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
        {/* Matched to Section's px-6 / md:px-9. The logo previously sat 4px
            inside the content it floats over at every breakpoint. */}
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-[17px] md:px-9">
          {/* The colour swap that used to be text-white/text-ink is now the
              reversed artwork — same trigger, same two states. */}
          <a href="/" aria-label="ITBIZONE — home" className="inline-flex">
            <Logo
              priority
              alt=""
              reversed={onDark && !open}
              className="h-[22px] w-auto md:h-[26px]"
            />
          </a>

          <motion.button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            whileHover={{ y: -1, boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}
            whileTap={{ scale: 0.97 }}
            className={`inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors duration-300 ${
              onDark && !open ? 'bg-white text-ink' : 'bg-ink text-white'
            }`}
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

      {/*
        Always in the DOM, shown and hidden with animation rather than mounted
        and unmounted.

        Mounting on open meant the site's entire primary navigation was absent
        from the served HTML — a crawler saw a logo and a Menu button and no
        nav at all, which is the strongest single signal Google uses to build
        sitelinks. The same fix the FAQ answers needed, for the same reason.

        `inert` while closed keeps the links out of the tab order and out of
        the accessibility tree, so nothing is reachable that is not visible.
      */}
      <motion.div
        id="primary-navigation"
        /*
          React 19 takes `inert` as a boolean; an empty string is dropped and
          the attribute never renders. visibility:hidden already removes the
          links from the tab order, so this is belt and braces — but the two
          should not disagree.
        */
        inert={!open}
        aria-hidden={open ? undefined : 'true'}
        variants={overlay}
        initial="hidden"
        animate={open ? 'show' : 'hidden'}
        className={`fixed inset-0 z-99 flex flex-col bg-bg ${
          open ? '' : 'pointer-events-none'
        }`}
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
    </>
  )
}
