'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { whatsappHref } from '@/lib/site'

/**
 * Floating WhatsApp CTA.
 *
 * For an Indian SMB audience this is the highest-intent contact channel and it
 * was previously reachable only from a footer text link.
 *
 * Held back until the visitor is past roughly the first screen: appearing over
 * the hero competes with the two CTAs already there, and someone who has not
 * scrolled has nothing to ask about yet.
 */

// Derives the prefilled message from the route, so the first thing you receive
// already says which service they were reading about.
function contextFor(pathname) {
  if (pathname?.startsWith('/services/')) {
    const slug = pathname.split('/')[2] || ''
    const name = slug.replace(/-/g, ' ').trim()
    return name || null
  }
  if (pathname === '/contact') return null
  return null
}

export default function WhatsAppFab() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const context = contextFor(pathname)

  return (
    <AnimatePresence>
      {visible && (
        // No onClick: the delegated listener in <Analytics> fires the event
        // for any wa.me link. data-cta only names this placement.
        <motion.a
          href={whatsappHref(context)}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="floating"
          aria-label="Chat with us on WhatsApp"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed right-5 bottom-5 z-90 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] py-3 pr-5 pl-3.5 text-white shadow-[0_6px_24px_rgba(0,0,0,0.18)] md:right-8 md:bottom-8"
        >
          {/* WhatsApp's own mark, in white on the brand green. */}
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="currentColor"
            className="size-6 shrink-0"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.548 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.464 3.488" />
          </svg>

          <span className="text-sm font-semibold whitespace-nowrap">
            Chat on WhatsApp
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
