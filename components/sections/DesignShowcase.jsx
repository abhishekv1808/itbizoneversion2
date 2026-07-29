'use client'

import { useEffect, useState } from 'react'
import ScrollMorphHero from '@/components/ui/scroll-morph-hero'
import { POSTERS, drawPoster } from '@/lib/posters'

// Twenty reads well in the ring and the arc; the full set of 32 crowds both.
const COUNT = 20

/**
 * The morph gallery, fed with the same poster artwork the WebGL wall uses.
 *
 * No stock photography here on purpose. `drawPoster` renders each spec to a
 * canvas in the site's own palette, so the cards are black-and-white by
 * construction rather than by filter, and there is no third-party imagery to
 * licence. Swapping in real work is the documented path in lib/posters.js:
 * give a poster a `src` and it is used instead of the drawn stand-in.
 */
export default function DesignShowcase() {
  const [items, setItems] = useState(() =>
    POSTERS.slice(0, COUNT).map((poster) => ({ ...poster, src: poster.src ?? null }))
  )

  useEffect(() => {
    // Canvas work is browser-only, so the drawn fallbacks are produced after
    // mount. Anything with real artwork already keeps its own src.
    setItems(
      POSTERS.slice(0, COUNT).map((poster) => ({
        ...poster,
        src: poster.src ?? drawPoster(poster, 0.6).toDataURL('image/png'),
      }))
    )
  }, [])

  return (
    <ScrollMorphHero
      items={items}
      eyebrow="Selected work"
      introTitle="Thirty-two pieces, one visual system."
      introHint="Scroll to explore"
      activeTitle="Every surface, on brand."
      activeCopy="Posters, packaging, ad creative and social sets — drawn from the same identity so the brand still looks like itself wherever it lands. Hover any card for the detail."
    />
  )
}
