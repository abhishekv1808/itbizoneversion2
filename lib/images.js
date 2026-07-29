/**
 * ── PLACEHOLDER PHOTOGRAPHY ───────────────────────────────────────────────
 * Sourced from Unsplash, whose licence permits commercial use without
 * attribution. Every image below was opened and looked at before being used —
 * several plausible-looking candidates turned out to be third-party logo
 * renders (Netflix, Facebook) and were rejected.
 *
 * These are stand-ins. Replace them with photographs of your own studio,
 * team and client work as soon as you have them: drop files into /public and
 * change `src` to the local path. Nothing else needs to change.
 *
 * They render greyscale by default and come to colour on hover, so full
 * colour photography does not fight the black-and-white type system.
 * ──────────────────────────────────────────────────────────────────────────
 */

const unsplash = (id, w = 1400) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`

/** One signature image per service, keyed by slug. */
export const SERVICE_IMAGES = {
  'website-development': {
    src: unsplash('photo-1461749280684-dccba630e2f6'),
    alt: 'Source code open in an editor, syntax highlighted',
    caption: 'Hand-written code, not a page builder',
  },
  'ui-ux-design': {
    src: unsplash('photo-1581291518857-4e27b48ff24e'),
    alt: 'A designer sketching interface wireframes on paper',
    caption: 'Structure settled on paper before pixels',
  },
  'digital-marketing': {
    src: unsplash('photo-1460925895917-afdab827c52f'),
    alt: 'An analytics dashboard showing traffic and conversion charts',
    caption: 'Every rupee traced to a tracked conversion',
  },
  'graphic-design': {
    src: unsplash('photo-1626785774573-4b799315345d'),
    alt: 'A design workstation with a tablet, sketchbook and monitor',
    caption: 'Print and digital, kept visually consistent',
  },
  'social-media-management': {
    src: unsplash('photo-1552664730-d307ca884978'),
    alt: 'A team planning a content calendar with sticky notes on a wall',
    caption: 'A calendar you approve before anything is made',
  },
  'ecommerce-development': {
    src: unsplash('photo-1556742049-0cfed4f6a45d'),
    alt: 'A customer paying contactlessly at a retail counter',
    caption: 'Checkout is the one page that cannot fail',
  },
}

/** Used by the home page introduction. */
export const STUDIO_IMAGE = {
  src: unsplash('photo-1522071820081-009f0129c71c'),
  alt: 'The team working together around a table of laptops',
}

export function serviceImage(slug) {
  return SERVICE_IMAGES[slug] ?? null
}
