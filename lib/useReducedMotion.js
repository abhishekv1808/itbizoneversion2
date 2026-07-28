'use client'

import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Starts `false` so server and first client render agree, then syncs on mount.
 * Animations gate on this, so a one-frame delay before honouring the
 * preference is the acceptable cost of avoiding a hydration mismatch.
 */
export default function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    setReduced(mq.matches)

    const onChange = (event) => setReduced(event.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
