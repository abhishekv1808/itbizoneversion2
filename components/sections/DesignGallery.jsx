'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { X } from 'lucide-react'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'
import useReducedMotion from '@/lib/useReducedMotion'
import { POSTERS, drawPoster } from '@/lib/posters'

// three.js is a large dependency for a section most visitors scroll past —
// keep it out of the initial bundle and off the server render entirely.
const GalleryGrid = dynamic(() => import('@/components/GalleryGrid'), {
  ssr: false,
  // Must track GalleryGrid's own heights exactly, or the page shifts when
  // three.js finishes loading and swaps in.
  loading: () => <div className="h-[500px] md:h-[760px] lg:h-[880px]" />,
})

export default function DesignGallery() {
  const [active, setActive] = useState(null)
  const [selected, setSelected] = useState(null)
  const reducedMotion = useReducedMotion()
  const lenis = useLenis()

  // Stable identities — GalleryGrid rebuilds its whole scene when these
  // change, so a new function each render would tear the canvas down on
  // every hover.
  const handleSelect = useCallback((poster) => setSelected(poster), [])
  const handleActiveChange = useCallback((poster) => setActive(poster), [])

  useEffect(() => {
    if (!lenis) return
    if (selected) lenis.stop()
    else lenis.start()
    return () => lenis.start()
  }, [selected, lenis])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <Section id="design" className="bg-panel">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-[620px]">
          <Eyebrow>Graphic design</Eyebrow>
          <SectionTitle className="mt-7">
            Posters, creatives, <Accent>campaigns</Accent>.
          </SectionTitle>
        </Reveal>

        <Reveal delay={0.1} className="max-w-[330px]">
          <Lede>
            {reducedMotion
              ? 'Print, social and campaign work from the design studio.'
              : 'Drag anywhere to explore. Click any piece to open it.'}
          </Lede>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-10">
        {reducedMotion ? (
          <PosterGrid onSelect={setSelected} />
        ) : (
          <GalleryGrid
            onSelect={handleSelect}
            onActiveChange={handleActiveChange}
          />
        )}
      </Reveal>

      {/* The canvas is opaque to screen readers and crawlers, so the same
          pieces are listed in text. Mirrors what the WebGL field shows. */}
      {!reducedMotion && (
        <ul className="sr-only">
          {POSTERS.map((poster) => (
            <li key={poster.id}>
              {poster.title} &mdash; {poster.category}
            </li>
          ))}
        </ul>
      )}

      {/* Reserved height stops the caption appearing and disappearing from
          shifting everything below it as the cursor moves. */}
      {!reducedMotion && (
        <div className="mt-6 flex h-6 items-center justify-center">
          <AnimatePresence mode="wait">
            {active && (
              <motion.p
                key={active.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="text-[13px] text-muted"
              >
                <span className="font-medium text-ink">{active.title}</span>
                <span className="mx-2 text-quiet">/</span>
                {active.category}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      <Lightbox poster={selected} onClose={() => setSelected(null)} />
    </Section>
  )
}

/** Reduced-motion and no-WebGL path: the same artwork, laid out flat. */
function PosterGrid({ onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
      {POSTERS.map((poster) => (
        <button
          key={poster.id}
          type="button"
          onClick={() => onSelect(poster)}
          className="group overflow-hidden rounded-2xl border border-soft bg-bg text-left"
        >
          <PosterImage poster={poster} className="aspect-[2/3] w-full" />
          <span className="block px-3 py-3 text-[13px] font-medium">
            {poster.title}
            <span className="mt-0.5 block text-xs font-normal text-quiet">
              {poster.category}
            </span>
          </span>
        </button>
      ))}
    </div>
  )
}

/**
 * Shows a poster's real artwork when it has a `src`, and falls back to the
 * generated composition when it does not.
 *
 * Kept as a plain <img> rather than next/image: this renders inside a lightbox
 * that only exists after a click, so there is no layout to reserve and nothing
 * for the optimiser to pre-size against.
 */
function PosterImage({ poster, scale = 1, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const host = ref.current
    if (!host) return

    if (poster.src) {
      const img = document.createElement('img')
      img.src = poster.src
      img.alt = `${poster.title} — ${poster.category} for ${poster.client ?? 'client'}`
      /*
        Sized by the call site, not here — the same contract the generated
        canvas has. `h-full` was wrong: the wrapper span has no resolved
        height, so the image sized itself by width, overflowed and was clipped
        to the top third of the poster.
      */
      img.className = 'block h-auto w-auto max-w-full'
      img.draggable = false
      host.replaceChildren(img)
    } else {
      const canvas = drawPoster(poster, scale)
      canvas.className = 'h-full w-full object-cover'
      host.replaceChildren(canvas)
    }

    return () => host.replaceChildren()
  }, [poster, scale])

  return <span ref={ref} className={`block overflow-hidden ${className}`} />
}

function Lightbox({ poster, onClose }) {
  return (
    <AnimatePresence>
      {poster && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${poster.title} — ${poster.category}`}
          className="fixed inset-0 z-101 flex items-center justify-center bg-ink/80 px-6 py-16 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-full flex-col items-center gap-5"
          >
            {/* Redrawn at 2× — the grid textures are sized for a ~200px
                poster and would visibly soften at lightbox scale. */}
            <PosterImage
              poster={poster}
              scale={2}
              className="max-h-[70vh] rounded-2xl shadow-2xl [&>canvas]:h-auto [&>canvas]:max-h-[70vh] [&>canvas]:w-auto [&>img]:h-auto [&>img]:max-h-[70vh] [&>img]:w-auto"
            />

            <div className="text-center text-white">
              <p className="text-lg font-semibold tracking-[-0.03em]">
                {poster.title}
              </p>
              <p className="mt-1 text-[13px] text-white/55">
                {poster.category}
              </p>
            </div>
          </motion.div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-6 right-6 inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-200 hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
