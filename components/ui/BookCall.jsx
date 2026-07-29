'use client'

import { motion } from 'framer-motion'
import { CalendarClock } from 'lucide-react'
import loadCalendly from '@/lib/calendly'
import { SITE, bookingHref, hasCalendly } from '@/lib/site'
import { track, EVENTS } from '@/lib/analytics'

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
    track(EVENTS.booking, { destination: hasCalendly ? 'calendly' : 'contact' })

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
      className={`inline-flex w-full items-center justify-start gap-3 rounded-full border-4 border-hairline bg-white py-2 pr-6 pl-2 md:w-auto ${className}`}
    >
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-chip text-ink">
        <CalendarClock size={17} />
      </span>
      <span className="flex flex-col items-start gap-0.5">
        <span className="text-sm leading-tight font-semibold">
          Chat for 15 minutes
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs leading-tight font-medium text-quiet">
          <span className="size-2 shrink-0 rounded-full bg-dot" />
          {/* Don't promise a calendar we can't open yet. */}
          {hasCalendly ? 'Pick a slot' : 'Send us a brief'}
        </span>
      </span>
    </motion.a>
  )
}
