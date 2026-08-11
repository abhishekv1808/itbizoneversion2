/*
  The hero background, served through the higgs.ai resizer.

  `w` is a query parameter the CDN honours, so one source yields a whole set
  of widths. That matters because this is the Largest Contentful Paint element
  and every phone was being sent the 1280px file: on throttled 4G that is the
  single slowest thing on the page.
*/
const heroAt = (w) =>
  `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260626_041422_4a459e05-abce-4150-9fb7-4ededc423cd1.png&w=${w}&q=85`

// Default source, for anything that cannot take a srcset.
export const HERO_IMAGE = heroAt(1280)

/*
  Widths the browser can choose from. 640 covers a 393px phone at DPR 2 minus
  the resizer's own ceiling; 1920 covers a retina laptop. The candidates are
  deliberately few — every extra entry is another URL the preload scanner has
  to reason about, for a background nobody is reading detail from.
*/
export const HERO_SRCSET = [640, 960, 1280, 1920]
  .map((w) => `${heroAt(w)} ${w}w`)
  .join(', ')

// The hero is full-bleed at every breakpoint.
export const HERO_SIZES = '100vw'
