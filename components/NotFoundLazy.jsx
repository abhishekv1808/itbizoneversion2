'use client'

import dynamic from 'next/dynamic'

/**
 * Client wrapper whose only job is to keep three.js out of every other route.
 *
 * not-found.js is part of the boundary the App Router wraps around every page,
 * so importing the WebGL scene there directly put 532KB of three.js into the
 * client graph of the home page and all six service pages — the single largest
 * contributor to mobile blocking time, for a 404 nobody had asked for.
 *
 * The dynamic import has to live in a client component: `ssr: false` is not
 * allowed in a Server Component, and not-found.js has to stay a Server
 * Component because it exports `metadata`.
 */
const NotFoundScene = dynamic(() => import('@/components/NotFoundScene'), {
  ssr: false,
  // Holds the viewport in the scene's own colour so the 404 does not flash a
  // blank white page while the chunk arrives.
  loading: () => <div className="min-h-screen bg-ink" />,
})

export default function NotFoundLazy() {
  return <NotFoundScene />
}
