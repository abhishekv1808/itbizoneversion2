'use client'

import { useEffect, useState } from 'react'

/*
  Three separate conditions, all of which must hold before three.js is worth
  downloading at all.

  The library is a 532KB chunk. Parsing and executing that, then compiling
  shaders and holding a WebGL context, cost roughly six seconds of blocked
  main thread on a throttled mid-range phone — for effects that are either
  imperceptible at that size or mouse-only to begin with.

  - min-width 810px  matches --breakpoint-md. Below it the canvases are
                     decorative background texture on a screen too small to
                     read it.
  - pointer: fine    the hero lens and the poster-wall hover follow a cursor.
                     A touch device has nothing to follow.
  - >= 4 cores       a rough floor. navigator.hardwareConcurrency is a hint
                     rather than a guarantee, so it only ever excludes: a
                     browser that does not report it is given the benefit of
                     the doubt.
*/
const QUERY = '(min-width: 810px) and (pointer: fine)'
const MIN_CORES = 4

/**
 * Starts `false` so the server and the first client render agree — the
 * fallback markup is what gets hydrated, and the canvas mounts a frame later
 * only where it earns its cost. Every caller has a non-WebGL path already.
 */
export default function useWebGLWorthIt() {
  const [worthIt, setWorthIt] = useState(false)

  useEffect(() => {
    const cores = navigator.hardwareConcurrency
    if (typeof cores === 'number' && cores < MIN_CORES) return

    // Data Saver is an explicit request not to pull half a megabyte of
    // decoration. Honoured where the browser exposes it.
    if (navigator.connection?.saveData) return

    const mq = window.matchMedia(QUERY)
    setWorthIt(mq.matches)

    const onChange = (event) => setWorthIt(event.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return worthIt
}
