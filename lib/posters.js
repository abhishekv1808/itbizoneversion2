/**
 * ── PLACEHOLDER ARTWORK ───────────────────────────────────────────────────
 * No finished posters, ad creatives or social designs existed on disk, so the
 * gallery ships with procedurally drawn stand-ins. They are deliberately
 * abstract — nothing here imitates real client work.
 *
 * To use real artwork, give each entry a `src` pointing at an image in
 * /public and the carousel loads that instead of drawing. Keep them portrait
 * (2:3) and around 900px tall; anything larger is wasted on screen.
 * ──────────────────────────────────────────────────────────────────────────
 */
export const POSTERS = [
  { id: '01', title: 'Event Poster', category: 'Print', variant: 0, invert: true },
  { id: '02', title: 'Product Launch', category: 'Ad Creative', variant: 1 },
  { id: '03', title: 'Instagram Carousel', category: 'Social', variant: 2, accent: true },
  { id: '04', title: 'Brand Identity', category: 'Identity', variant: 3 },
  { id: '05', title: 'Festival Campaign', category: 'Ad Creative', variant: 4, invert: true },
  { id: '06', title: 'Packaging Sleeve', category: 'Packaging', variant: 5 },
  { id: '07', title: 'Story Series', category: 'Social', variant: 1, accent: true },
  { id: '08', title: 'Corporate Brochure', category: 'Print', variant: 3 },
  { id: '09', title: 'Launch Announcement', category: 'Social', variant: 0 },
  { id: '10', title: 'Data Infographic', category: 'Print', variant: 4 },
  { id: '11', title: 'Display Banner', category: 'Ad Creative', variant: 2, invert: true },
  { id: '12', title: 'Menu System', category: 'Identity', variant: 5 },
  { id: '13', title: 'Label Design', category: 'Packaging', variant: 0, accent: true },
  { id: '14', title: 'Hoarding Layout', category: 'Print', variant: 4 },
  { id: '15', title: 'Reel Cover Set', category: 'Social', variant: 1, invert: true },
  { id: '16', title: 'Business Card', category: 'Identity', variant: 5 },
  { id: '17', title: 'Letterhead Suite', category: 'Identity', variant: 3, accent: true },
  { id: '18', title: 'Offer Creative', category: 'Ad Creative', variant: 0 },
  { id: '19', title: 'Profile Grid', category: 'Social', variant: 2 },
  { id: '20', title: 'Catalogue Spread', category: 'Print', variant: 1, invert: true },
  { id: '21', title: 'Standee Design', category: 'Print', variant: 5, accent: true },
  { id: '22', title: 'Gift Box', category: 'Packaging', variant: 4 },
  { id: '23', title: 'Email Header', category: 'Ad Creative', variant: 3 },
  { id: '24', title: 'Poll Sticker', category: 'Social', variant: 0, invert: true },
  { id: '25', title: 'Signage System', category: 'Identity', variant: 2 },
  { id: '26', title: 'Pouch Wrap', category: 'Packaging', variant: 1 },
  { id: '27', title: 'Testimonial Card', category: 'Social', variant: 5, invert: true },
  { id: '28', title: 'Roll-up Banner', category: 'Print', variant: 4, accent: true },
  { id: '29', title: 'Coupon Creative', category: 'Ad Creative', variant: 2 },
  { id: '30', title: 'Shelf Talker', category: 'Packaging', variant: 0 },
  { id: '31', title: 'Highlight Cover', category: 'Social', variant: 3, invert: true },
  { id: '32', title: 'Annual Report', category: 'Print', variant: 5 },
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
export function drawPoster(spec, scale = 1) {
  const w = TEXTURE_WIDTH * scale
  const h = TEXTURE_HEIGHT * scale

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
