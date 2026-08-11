import { HERO_IMAGE, HERO_SIZES, HERO_SRCSET } from '@/lib/assets'

/**
 * The hero background, and the page's Largest Contentful Paint element.
 *
 * Split out of HeroCanvas so it renders on the server for every visitor.
 * three.js is now loaded only where it is worth its 532KB, and on everything
 * else this is the entire hero background rather than a fallback that happens
 * to be showing.
 *
 * A real <img> rather than a CSS background: `background-image` cannot carry a
 * srcset, so every device downloaded the 1280px file. An img lets the browser
 * pick, and lets the preload scanner start the request before CSS resolves —
 * which a background image can never do.
 */
export default function HeroBackdrop() {
  return (
    <img
      src={HERO_IMAGE}
      srcSet={HERO_SRCSET}
      sizes={HERO_SIZES}
      alt=""
      aria-hidden="true"
      // Decorative and above the fold: fetch it early, decode off-thread.
      fetchPriority="high"
      decoding="async"
      /*
        Below md the landscape artwork is rotated a quarter turn to fill a
        portrait frame — the same treatment the CSS background used, kept
        because the composition reads badly cropped to a phone's aspect.
      */
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-center select-none max-md:top-1/2 max-md:left-1/2 max-md:h-[100vw] max-md:w-[1000px] max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:rotate-90"
    />
  )
}
