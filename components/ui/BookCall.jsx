'use client'

import { motion } from 'framer-motion'
import { CalendarClock } from 'lucide-react'
import loadCalendly from '@/lib/calendly'
import { SITE, bookingHref, hasCalendly } from '@/lib/site'
import { track, trackConversion, EVENTS } from '@/lib/analytics'

const lift = {
  rest: { y: 0, boxShadow: '0 0 0 rgba(0,0,0,0)' },
  hover: { y: -1, boxShadow: '0 4px 20px rgba(0,0,0,0.12)' },
  tap: { y: 0, scale: 0.985 },
}

/**
 * The booking CTA, paired with the primary button in the hero and the closing
 * section.
 *
 * Rendered as a real anchor so it survives without JS and still honours
 * middle-click, cmd-click and "open in new tab" — the popup is an enhancement
 * layered on a plain left click, not the only way in.
 */
export default function BookCall({ className = '' }) {
  // Warm the widget on intent, so the click itself has nothing to wait for.
  // Pointless while no event URL is configured, so skip the request entirely.
  const prefetch = () => {
    if (!hasCalendly) return
    loadCalendly().catch(() => {})
  }

  const open = async (event) => {
    trackConversion(EVENTS.booking, {
      destination: hasCalendly ? 'calendly' : 'contact',
    })

    // Anything but an unmodified left click is the browser's to handle.
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return
    }

    // No event URL yet: let the anchor navigate to /contact on its own.
    if (!hasCalendly) return

    event.preventDefault()

    try {
      const calendly = await loadCalendly()
      if (calendly?.initPopupWidget) {
        calendly.initPopupWidget({ url: SITE.calendly })
        return
      }
      throw new Error('Calendly popup unavailable')
    } catch {
      window.open(SITE.calendly, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.a
      href={bookingHref}
      // Only leave the site when there is somewhere external to go.
      {...(hasCalendly && { target: '_blank', rel: 'noopener noreferrer' })}
      onClick={open}
      onPointerEnter={prefetch}
      onFocus={prefetch}
      variants={lift}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      /*
        The 4px ring plus py-2 around a 40px avatar made this 64px tall — the
        largest control on any page, and 8px taller than the primary button it
        sits beside. Thinner ring and tighter padding bring it to 48, matching
        the button above it.

        The ring's colour had to change with its width. --color-hairline is
        rgb(248,248,248), which measures 1.06:1 against the white fill — a
        4px band of it reads as a soft edge, but at 2px there was nothing left
        to see and the button vanished into the near-white hero behind it.
        Phones get a genuine border plus a low shadow to lift it off the
        background; md and up keep the original ring, which works at 4px.
      */
      className={`inline-flex w-full items-center justify-start gap-2.5 rounded-full border-2 border-black/[0.13] bg-white py-1 pr-5 pl-1 shadow-[0_1px_10px_rgba(0,0,0,0.07)] md:gap-3 md:border-4 md:border-hairline md:py-2 md:pr-6 md:pl-2 md:shadow-none md:w-auto ${className}`}
    >
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-chip text-ink md:size-10">
        <CalendarClock size={17} />
      </span>
      <span className="flex flex-col items-start gap-0.5">
        <span className="text-sm leading-tight font-semibold">
          Chat for 15 minutes
        </span>
        {/*
          --color-quiet is rgb(152,152,152): 2.88:1 on white, which fails AA
          for text this size. muted is 5.33:1 and passes. This was wrong at
          every breakpoint, not only on phones.
        */}
        <span className="inline-flex items-center gap-1.5 text-xs leading-tight font-medium text-muted">
          <span className="size-2 shrink-0 rounded-full bg-dot" />
          {/* Don't promise a calendar we can't open yet. */}
          {hasCalendly ? 'Pick a slot' : 'Send us a brief'}
        </span>
      </span>
    </motion.a>
  )
}
