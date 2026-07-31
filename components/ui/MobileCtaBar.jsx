'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Phone } from 'lucide-react'
import { SITE, whatsappHref } from '@/lib/site'

/**
 * Persistent call and WhatsApp bar, phones only.
 *
 * Mobile search traffic in India converts on the phone far more than on a
 * form, and on a small screen the contact options are otherwise buried at the
 * bottom of a long page. This keeps both one thumb-reach away.
 *
 * It replaces the floating WhatsApp button below md rather than joining it —
 * WhatsAppFab is hidden at that width. Two WhatsApp entry points a centimetre
 * apart is not twice the conversion, it is a bug that looks deliberate.
 *
 * Neither link carries an onClick: the delegated listener in <Analytics>
 * already fires a conversion for any tel: or wa.me anchor, so adding one here
 * would double-count. `data-cta` only names the placement in the payload.
 */

// The prefilled WhatsApp message names the service being read, so the first
// message received already says what it is about.
function contextFor(pathname) {
  if (!pathname?.startsWith('/services/')) return null
  const slug = pathname.split('/')[2] || ''
  return slug.replace(/-/g, ' ').trim() || null
}

export default function MobileCtaBar() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    /*
      Held back for the first 40% of a screen. Appearing instantly would cover
      the hero's own buttons at exactly the moment they are being read — but
      the wait is deliberately shorter than the floating button's 60%, because
      an ad visitor who scrolls at all is already looking for a way to make
      contact.
    */
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.4)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const context = contextFor(pathname)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          /*
            pb env(safe-area-inset-bottom) keeps the buttons clear of the iOS
            home indicator, which otherwise sits directly on top of them.
          */
          className="fixed inset-x-0 bottom-0 z-90 border-t border-soft bg-bg/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md md:hidden"
        >
          <div className="flex items-center gap-3">
            <a
              href={SITE.phoneHref}
              data-cta="mobile-bar"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ink text-[15px] font-semibold text-white"
            >
              <Phone size={16} />
              Call now
            </a>

            <a
              href={whatsappHref(context)}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="mobile-bar"
              aria-label="Chat with us on WhatsApp"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] text-[15px] font-semibold text-white"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="currentColor"
                className="size-5 shrink-0"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.548 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.464 3.488" />
              </svg>
              WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
