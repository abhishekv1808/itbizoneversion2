'use client'

import { useEffect, useState } from 'react'
import ScrollMorphHero from '@/components/ui/scroll-morph-hero'
import { POSTERS, POSTER_RATIO, drawPoster } from '@/lib/posters'

/**
 * How many pieces go on the ring.
 *
 * Down from 20. The ring's circumference is fixed by the stage height, so
 * count, card size and gap all compete for the same arc: 20 cards at an 8px
 * gap drew each one ~100px wide with no air between them. 14 pays for both a
 * bigger card and a real gap.
 *
 * It is not the whole set — POSTERS has more, and the WebGL wall on the home
 * page shows all of them. This is a selection, which is what the heading says.
 */
const COUNT = 14

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
        // Drawn at 9:16 to match the card, so object-cover has nothing to
        // crop and the caption block survives intact.
        src:
          poster.src ??
          drawPoster(poster, 0.75, POSTER_RATIO.story).toDataURL('image/png'),
      }))
    )
  }, [])

  return (
    <ScrollMorphHero
      items={items}
      eyebrow="Selected work"
      /*
        Counted, not written out. This said "Thirty-two pieces" against a set
        that has never been 32 — it was 13 when the copy was written and is
        POSTERS.length now, so the number was wrong in both directions.
      */
      introTitle={`${POSTERS.length} pieces, one visual system.`}
      introHint="Scroll to explore"
      activeTitle="Every surface, on brand."
      activeCopy="Posters, packaging, ad creative and social sets — drawn from the same identity so the brand still looks like itself wherever it lands. Hover any card for the detail."
    />
  )
}
