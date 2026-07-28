'use client'

import { useEffect, useState } from 'react'

const ZONE = 'Asia/Kolkata'
const OPEN_HOUR = 9
const CLOSE_HOUR = 18
const WEEKEND = ['Sat', 'Sun']

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: ZONE,
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

/**
 * Reads the clock in Bengaluru rather than the visitor's timezone, so the
 * answer is the same whoever is looking.
 */
function readOffice() {
  const parts = formatter.formatToParts(new Date())
  const get = (type) => parts.find((part) => part.type === type)?.value ?? ''

  const weekday = get('weekday')
  const hour = Number(get('hour'))

  return {
    label: `${get('hour')}:${get('minute')}`,
    open:
      !WEEKEND.includes(weekday) && hour >= OPEN_HOUR && hour < CLOSE_HOUR,
  }
}

/**
 * Live local time with an open/closed dot.
 *
 * Starts as `--:--` so the server HTML and the first client render agree —
 * a real timestamp here would differ between the two and trip hydration.
 */
export default function OfficeStatus() {
  const [office, setOffice] = useState(null)

  useEffect(() => {
    const tick = () => setOffice(readOffice())
    tick()

    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  const open = office?.open ?? false

  return (
    <span className="inline-flex items-center gap-2.5 text-[13px] text-white/45">
      <span className="relative inline-flex size-2 shrink-0">
        {open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-dot opacity-60 motion-reduce:animate-none" />
        )}
        <span
          className={`relative inline-flex size-2 rounded-full ${
            open ? 'bg-dot' : 'bg-white/25'
          }`}
        />
      </span>

      <span className="tabular-nums">{office?.label ?? '--:--'}</span>
      <span>in Bengaluru</span>

      <span className="text-white/25">&mdash;</span>
      <span>{office === null ? 'checking' : open ? 'open now' : 'closed'}</span>
    </span>
  )
}
