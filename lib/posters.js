/**
 * ── REAL ARTWORK ──────────────────────────────────────────────────────────
 * Twenty-two pieces across three clients: Open Credit loan creatives, the
 * Krushiyuga Farm farmland campaign and identity work, and ITBIZONE's own
 * social output. Titles and categories were read off each piece rather than
 * guessed.
 *
 * Order is interleaved by client on purpose. The wall fills row-major over a
 * COLS-wide lattice, so consecutive entries land side by side — grouping a
 * client together would put six near-identical farmland creatives in one row.
 *
 * `src` paths are stored URL-encoded because some filenames contain spaces —
 * and one contains a double space — so every consumer gets a usable URL
 * without remembering to encode.
 *
 * Source ratios are mixed: 9:16 stories, 4:5 posts, 1:1 posts, a 2819x4000
 * brochure and a visiting card. Each is fitted to its cell at its own
 * proportions rather than cropped — see fitToCell in GalleryGrid.
 *
 * Entries 14 and 22 are the same Affinity creative in post and story formats.
 * They are deliberately eight apart so they never land adjacent and read as a
 * duplicate.
 *
 * `variant` is retained only as the fallback composition for an entry with no
 * `src`; drawPoster below still generates those.
 * ──────────────────────────────────────────────────────────────────────────
 */
export const POSTERS = [
  {
    id: '01',
    title: 'Own Land. Earn Returns.',
    category: 'Ad Creative',
    client: 'Krushiyuga Farm',
    src: '/graphic-images/Managed%20farmland%20by%20Krushiyuga%20Farm.png',
    variant: 0,
  },
  {
    id: '02',
    title: 'Higher Education Loan',
    category: 'Social',
    client: 'Open Credit',
    src: '/graphic-images/15.png',
    variant: 1,
  },
  {
    id: '03',
    title: '75% Judge You by Your Website',
    category: 'Social',
    client: 'ITBIZONE',
    src: '/graphic-images/itbizone-website.png',
    variant: 2,
  },
  {
    id: '04',
    title: 'Premium Managed Farmland',
    category: 'Ad Creative',
    client: 'Krushiyuga Farm',
    src: '/graphic-images/Farmland%20Image.png',
    variant: 3,
  },
  {
    id: '05',
    title: 'Abroad Travel Loan',
    category: 'Social',
    client: 'Open Credit',
    src: '/graphic-images/16.png',
    variant: 4,
  },
  {
    id: '06',
    title: 'It Might Change How We Code',
    category: 'Carousel',
    client: 'ITBIZONE',
    src: '/graphic-images/41.png',
    variant: 5,
  },
  {
    id: '07',
    title: 'Country Chicken & Eggs',
    category: 'Print',
    client: 'Krushiyuga Farm',
    src: '/graphic-images/Krushiyuga%20Farm%20%20-%20Broucher.png',
    variant: 0,
  },
  {
    id: '08',
    title: 'School Fee Loan',
    category: 'Social',
    client: 'Open Credit',
    src: '/graphic-images/17.png',
    variant: 1,
  },
  {
    id: '09',
    title: 'A Billboard in the Desert',
    category: 'Social',
    client: 'ITBIZONE',
    src: '/graphic-images/itbizone-digital-marketing.png',
    variant: 2,
  },
  {
    id: '10',
    title: 'Own a Piece of Agriculture Land',
    category: 'Ad Creative',
    client: 'Krushiyuga Farm',
    src: '/graphic-images/3.png',
    variant: 3,
  },
  {
    id: '11',
    title: 'Loan Offer for Teachers',
    category: 'Social',
    client: 'Open Credit',
    src: '/graphic-images/7.png',
    variant: 4,
  },
  {
    id: '12',
    title: 'A New Kind of IDE',
    category: 'Carousel',
    client: 'ITBIZONE',
    src: '/graphic-images/42.png',
    variant: 5,
  },
  {
    id: '13',
    title: '699 sqft Farmland Offer',
    category: 'Ad Creative',
    client: 'Krushiyuga Farm',
    src: '/graphic-images/Managed%20farmland%20699%20sqft.png',
    variant: 0,
  },
  {
    id: '14',
    title: 'Affinity at Zero Cost',
    category: 'Social',
    client: 'ITBIZONE',
    src: '/graphic-images/26.png',
    variant: 1,
  },
  {
    id: '15',
    title: 'Agriculture Investor Campaign',
    category: 'Ad Creative',
    client: 'Krushiyuga Farm',
    src: '/graphic-images/1.png',
    variant: 2,
  },
  {
    id: '16',
    title: 'Stop Juggling Multiple Agencies',
    category: 'Social',
    client: 'ITBIZONE',
    src: '/graphic-images/itbizone-marketing.png',
    variant: 3,
  },
  {
    id: '17',
    title: 'Founder Visiting Card',
    category: 'Identity',
    client: 'Krushiyuga Farm',
    src: '/graphic-images/Krushiyuga%20Farm%20-%20%20Madhu%20HR%20Visiting%20Card.png',
    variant: 4,
  },
  {
    id: '18',
    title: 'Built for the Agent-First Era',
    category: 'Carousel',
    client: 'ITBIZONE',
    src: '/graphic-images/43.png',
    variant: 5,
  },
  {
    id: '19',
    title: 'Join Hands in Agriculture',
    category: 'Ad Creative',
    client: 'Krushiyuga Farm',
    src: '/graphic-images/2.png',
    variant: 0,
  },
  {
    id: '20',
    title: 'Collaborating with Digital Engineers',
    category: 'Carousel',
    client: 'ITBIZONE',
    src: '/graphic-images/44.png',
    variant: 1,
  },
  {
    id: '21',
    title: 'Eat Protein. Eat Real.',
    category: 'Social',
    client: 'Krushiyuga Farm',
    src: '/graphic-images/4.png',
    variant: 2,
  },
  {
    id: '22',
    title: 'Affinity at Zero Cost',
    category: 'Story',
    client: 'ITBIZONE',
    src: '/graphic-images/ItbizOne.png',
    variant: 3,
  },
]

// Kept in sync with the tokens in globals.css.
const PALETTE = {
  bg: '#ffffff',
  panel: '#fafafa',
  ink: '#0a0a0a',
  muted: '#6b6b6b',
  accent: '#17c964',
}

// Sized for how large a poster actually draws in the grid (~200px tall, so
// ~400px at DPR 2). With 28 of them on the GPU at once, 600×900 would cost
// roughly 60MB of texture memory for detail nobody can see. The lightbox
// passes a scale to redraw sharp on demand.
const TEXTURE_WIDTH = 400
const TEXTURE_HEIGHT = 600

/** Portrait ratios the artwork can be drawn at. */
export const POSTER_RATIO = {
  poster: 2 / 3, // 0.667 — the WebGL wall's plane geometry assumes this
  igPortrait: 4 / 5, // 0.800 — Instagram feed portrait
  story: 9 / 16, // 0.563 — Instagram story / WhatsApp status
}

/** Deterministic per-poster jitter, so a reload never reshuffles the wall. */
function seeded(seed) {
  let value = seed * 9301 + 49297
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

const COMPOSITIONS = [
  // Concentric arcs
  (ctx, w, h, ink, rand) => {
    const cx = w * 0.5
    const cy = h * 0.42
    for (let i = 5; i > 0; i--) {
      ctx.beginPath()
      ctx.arc(cx, cy, w * 0.09 * i, 0, Math.PI * 2)
      ctx.strokeStyle = ink
      ctx.globalAlpha = 0.15 + i * 0.12
      ctx.lineWidth = w * 0.012
      ctx.stroke()
    }
    ctx.globalAlpha = 1
    ctx.beginPath()
    ctx.arc(cx, cy, w * 0.06 + rand() * w * 0.03, 0, Math.PI * 2)
    ctx.fillStyle = ink
    ctx.fill()
  },

  // Stacked bars
  (ctx, w, h, ink, rand) => {
    const rows = 7
    const top = h * 0.16
    const gap = h * 0.045
    for (let i = 0; i < rows; i++) {
      const barWidth = w * (0.24 + rand() * 0.58)
      ctx.fillStyle = ink
      ctx.globalAlpha = 0.25 + (i / rows) * 0.75
      ctx.fillRect(w * 0.12, top + i * gap, barWidth, h * 0.022)
    }
    ctx.globalAlpha = 1
  },

  // Dot matrix
  (ctx, w, h, ink, rand) => {
    const cols = 9
    const rows = 12
    const stepX = (w * 0.76) / (cols - 1)
    const stepY = (h * 0.46) / (rows - 1)
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const r = (rand() * 0.5 + 0.2) * stepX * 0.34
        ctx.beginPath()
        ctx.arc(w * 0.12 + x * stepX, h * 0.15 + y * stepY, r, 0, Math.PI * 2)
        ctx.fillStyle = ink
        ctx.globalAlpha = 0.35 + rand() * 0.65
        ctx.fill()
      }
    }
    ctx.globalAlpha = 1
  },

  // Oversized letterform
  (ctx, w, h, ink, rand, spec) => {
    ctx.fillStyle = ink
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = `600 ${w * 0.78}px Georgia, serif`
    ctx.fillText(spec.title.charAt(0), w * 0.5, h * 0.42)

    ctx.globalAlpha = 0.2
    ctx.fillRect(w * 0.12, h * 0.66, w * 0.76, h * 0.006)
    ctx.globalAlpha = 1
  },

  // Diagonal split
  (ctx, w, h, ink) => {
    ctx.beginPath()
    ctx.moveTo(0, h * 0.62)
    ctx.lineTo(w, h * 0.2)
    ctx.lineTo(w, h * 0.72)
    ctx.lineTo(0, h)
    ctx.closePath()
    ctx.fillStyle = ink
    ctx.globalAlpha = 0.9
    ctx.fill()
    ctx.globalAlpha = 1
  },

  // Nested frames
  (ctx, w, h, ink, rand) => {
    for (let i = 0; i < 6; i++) {
      const inset = w * 0.1 + i * w * 0.06
      ctx.strokeStyle = ink
      ctx.globalAlpha = 0.16 + i * 0.14
      ctx.lineWidth = w * 0.008
      ctx.strokeRect(inset, h * 0.12 + i * h * 0.035, w - inset * 2, h * 0.5 - i * h * 0.06)
    }
    ctx.globalAlpha = 1
    void rand
  },
]

/**
 * Draws one poster onto a fresh canvas for use as a texture.
 * Returns the canvas — callers wrap it in a THREE.CanvasTexture.
 */
export function drawPoster(spec, scale = 1, ratio = POSTER_RATIO.poster) {
  // Height is the fixed side, so changing ratio narrows or widens the canvas
  // without changing how much detail is drawn. The default reproduces the
  // original 400x600 exactly — GalleryGrid's plane geometry is built for 2:3
  // and would distort the artwork if the default moved.
  const h = TEXTURE_HEIGHT * scale
  const w = h * ratio

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h

  const ctx = canvas.getContext('2d')
  // Every dimension below is expressed as a fraction of w/h, so the same
  // drawing code produces an identical composition at any scale.
  const rand = seeded(Number(spec.id) + spec.variant * 17)

  const ground = spec.invert ? PALETTE.ink : PALETTE.panel
  const ink = spec.invert
    ? PALETTE.bg
    : spec.accent
      ? PALETTE.accent
      : PALETTE.ink

  ctx.fillStyle = ground
  ctx.fillRect(0, 0, w, h)

  COMPOSITIONS[spec.variant % COMPOSITIONS.length](ctx, w, h, ink, rand, spec)

  // Caption block, shared by every composition so the set reads as a series.
  const label = spec.invert ? PALETTE.bg : PALETTE.ink
  const quiet = spec.invert ? 'rgba(255,255,255,0.5)' : PALETTE.muted

  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'

  ctx.fillStyle = quiet
  ctx.font = `500 ${w * 0.038}px system-ui, sans-serif`
  ctx.fillText(spec.category.toUpperCase(), w * 0.12, h * 0.82)

  ctx.fillStyle = label
  ctx.font = `600 ${w * 0.068}px system-ui, sans-serif`
  ctx.fillText(spec.title, w * 0.12, h * 0.875)

  ctx.fillStyle = quiet
  ctx.font = `500 ${w * 0.038}px system-ui, sans-serif`
  ctx.fillText(spec.id, w * 0.12, h * 0.925)

  return canvas
}
