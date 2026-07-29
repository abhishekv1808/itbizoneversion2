'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { GA_ID, analyticsEnabled, track, EVENTS } from '@/lib/analytics'

/**
 * GA4 loader.
 *
 * Renders nothing unless NEXT_PUBLIC_GA_ID is set, so development and preview
 * builds stay out of the production property without any extra configuration.
 *
 * gtag's `config` call sends the first page view itself. Every later one is
 * sent manually, because the App Router navigates between the home page,
 * /contact and the service pages on the client, and gtag never sees those —
 * left alone it would report each visit as a single landing-page hit.
 *
 * Letting `config` own the first view (rather than sending all of them here)
 * avoids a race: this effect can run before the afterInteractive script has
 * defined gtag, which would silently drop the entry page.
 */
export default function Analytics() {
  const pathname = usePathname()
  // The config call already counts as the first page view; don't double-send.
  const firstRun = useRef(true)

  useEffect(() => {
    if (!analyticsEnabled) return
    if (typeof window.gtag !== 'function') return

    if (firstRun.current) {
      firstRun.current = false
      return
    }

    window.gtag('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname])

  /**
   * One delegated listener for every contact link on the site.
   *
   * tel:, mailto: and wa.me anchors are scattered across the footer, contact
   * page, service pages and career section — several of them server
   * components. Catching clicks as they bubble instruments all of them from
   * here, and keeps working for any link added later without a code change.
   */
  useEffect(() => {
    if (!analyticsEnabled) return

    const onClick = (event) => {
      const link = event.target.closest?.('a[href]')
      if (!link) return

      const href = link.getAttribute('href') || ''
      // data-cta names the specific placement, so the floating button can be
      // told apart from the same wa.me link in the footer.
      const where = {
        location: window.location.pathname,
        cta: link.dataset.cta || 'inline',
      }

      if (href.startsWith('tel:')) track(EVENTS.call, where)
      else if (href.startsWith('mailto:')) track(EVENTS.email, where)
      else if (href.includes('wa.me/')) track(EVENTS.whatsapp, where)
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  if (!analyticsEnabled) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: true });
        `}
      </Script>
    </>
  )
}
