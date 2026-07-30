/**
 * Canvas-drawn artwork for the website-development page.
 *
 * Everything the 3D hero and the portfolio showcase display is generated here
 * rather than loaded. Three reasons that matters more than it might look:
 *
 *   • No network. Twenty floating panels as image files would be twenty
 *     requests on a page already carrying a WebGL context.
 *   • No licensing. Nothing depicts a real product or a real client's site.
 *   • On-palette by construction. The colours below are the site's own tokens,
 *     so the scene cannot drift away from the rest of the page the way stock
 *     screenshots would.
 *
 * Every dimension is a fraction of w/h, so one drawing routine produces the
 * same composition at any texture size.
 */

const DARK = {
  ground: '#0f0f10',
  panel: '#17171a',
  line: 'rgba(255,255,255,0.08)',
  ink: 'rgba(255,255,255,0.86)',
  quiet: 'rgba(255,255,255,0.38)',
  faint: 'rgba(255,255,255,0.14)',
  accent: '#17c964',
}

const LIGHT = {
  ground: '#ffffff',
  panel: '#fafafa',
  line: 'rgba(0,0,0,0.08)',
  ink: 'rgba(10,10,10,0.88)',
  quiet: 'rgba(10,10,10,0.42)',
  faint: 'rgba(10,10,10,0.12)',
  accent: '#17c964',
}

/** Deterministic jitter, so a reload never redraws a different scene. */
function seeded(seed) {
  let v = seed * 9301 + 49297
  return () => {
    v = (v * 9301 + 49297) % 233280
    return v / 233280
  }
}

function canvasOf(w, h) {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  return canvas
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

/* ── Browser chrome ──────────────────────────────────────────────────────── */
function chrome(ctx, w, h, p, barH) {
  ctx.fillStyle = p.panel
  ctx.fillRect(0, 0, w, barH)
  ctx.strokeStyle = p.line
  ctx.lineWidth = Math.max(1, w * 0.002)
  ctx.beginPath()
  ctx.moveTo(0, barH)
  ctx.lineTo(w, barH)
  ctx.stroke()

  const r = barH * 0.14
  const cy = barH * 0.5
  ;['rgba(255,255,255,0.22)', 'rgba(255,255,255,0.16)', 'rgba(255,255,255,0.12)'].forEach(
    (fill, i) => {
      ctx.beginPath()
      ctx.arc(w * 0.045 + i * r * 3.4, cy, r, 0, Math.PI * 2)
      ctx.fillStyle = p === LIGHT ? p.faint : fill
      ctx.fill()
    }
  )

  // Address pill
  roundRect(ctx, w * 0.26, cy - barH * 0.22, w * 0.48, barH * 0.44, barH * 0.22)
  ctx.fillStyle = p.faint
  ctx.fill()
}

/* ── Panel types for the 3D hero ─────────────────────────────────────────── */

const PANELS = {
  /** A site laid out as nav + hero + cards. */
  browser(ctx, w, h, p, rand) {
    const barH = h * 0.1
    ctx.fillStyle = p.ground
    ctx.fillRect(0, 0, w, h)
    chrome(ctx, w, h, p, barH)

    const top = barH + h * 0.07
    // Headline bars
    ctx.fillStyle = p.ink
    ctx.fillRect(w * 0.08, top, w * 0.55, h * 0.055)
    ctx.globalAlpha = 0.5
    ctx.fillRect(w * 0.08, top + h * 0.085, w * 0.38, h * 0.03)
    ctx.globalAlpha = 1

    // Accent CTA
    roundRect(ctx, w * 0.08, top + h * 0.15, w * 0.2, h * 0.055, h * 0.028)
    ctx.fillStyle = p.accent
    ctx.fill()

    // Card row
    for (let i = 0; i < 3; i++) {
      const cw = w * 0.26
      roundRect(ctx, w * 0.08 + i * (cw + w * 0.03), h * 0.66, cw, h * 0.22, w * 0.02)
      ctx.fillStyle = p.panel
      ctx.fill()
      ctx.strokeStyle = p.line
      ctx.stroke()
      ctx.fillStyle = p.quiet
      ctx.globalAlpha = 0.6 + rand() * 0.4
      ctx.fillRect(w * 0.11 + i * (cw + w * 0.03), h * 0.72, cw * 0.6, h * 0.018)
      ctx.globalAlpha = 1
    }
  },

  /** Syntax-coloured code, abstracted to bars so no language is implied. */
  code(ctx, w, h, p, rand) {
    ctx.fillStyle = p.ground
    ctx.fillRect(0, 0, w, h)

    // Gutter
    ctx.fillStyle = p.panel
    ctx.fillRect(0, 0, w * 0.09, h)

    const rows = 16
    const gap = h / (rows + 3)
    for (let i = 0; i < rows; i++) {
      const y = gap * (i + 1.5)
      const indent = w * (0.13 + (i % 4) * 0.035)
      let x = indent
      const tokens = 2 + Math.floor(rand() * 3)

      for (let t = 0; t < tokens; t++) {
        const tw = w * (0.05 + rand() * 0.17)
        if (x + tw > w * 0.94) break
        ctx.fillStyle = t === 0 ? p.accent : p.ink
        ctx.globalAlpha = t === 0 ? 0.85 : 0.2 + rand() * 0.4
        ctx.fillRect(x, y, tw, gap * 0.34)
        x += tw + w * 0.02
      }
      // Line number
      ctx.globalAlpha = 0.3
      ctx.fillStyle = p.quiet
      ctx.fillRect(w * 0.035, y, w * 0.022, gap * 0.34)
      ctx.globalAlpha = 1
    }
  },

  /** Greyscale wireframe: boxes, cross-outs, placeholder text. */
  wireframe(ctx, w, h, p) {
    ctx.fillStyle = p.ground
    ctx.fillRect(0, 0, w, h)
    ctx.strokeStyle = p.faint
    ctx.lineWidth = Math.max(1.5, w * 0.005)

    ctx.strokeRect(w * 0.08, h * 0.08, w * 0.84, h * 0.16)
    // Crossed image box
    ctx.beginPath()
    ctx.moveTo(w * 0.08, h * 0.08)
    ctx.lineTo(w * 0.92, h * 0.24)
    ctx.moveTo(w * 0.92, h * 0.08)
    ctx.lineTo(w * 0.08, h * 0.24)
    ctx.stroke()

    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = p.faint
      ctx.fillRect(w * 0.08, h * (0.33 + i * 0.06), w * (0.7 - i * 0.09), h * 0.022)
    }

    for (let i = 0; i < 2; i++) {
      ctx.strokeRect(w * (0.08 + i * 0.44), h * 0.68, w * 0.4, h * 0.22)
    }
  },

  /** A component sheet — buttons, toggles, inputs. */
  components(ctx, w, h, p, rand) {
    ctx.fillStyle = p.ground
    ctx.fillRect(0, 0, w, h)

    const rows = 4
    for (let r = 0; r < rows; r++) {
      const y = h * (0.12 + r * 0.21)
      // Button
      roundRect(ctx, w * 0.08, y, w * 0.3, h * 0.1, h * 0.05)
      ctx.fillStyle = r === 1 ? p.accent : p.panel
      ctx.fill()
      if (r !== 1) {
        ctx.strokeStyle = p.line
        ctx.stroke()
      }
      // Toggle
      roundRect(ctx, w * 0.46, y + h * 0.02, w * 0.16, h * 0.06, h * 0.03)
      ctx.fillStyle = rand() > 0.5 ? p.accent : p.faint
      ctx.fill()
      // Input
      roundRect(ctx, w * 0.68, y, w * 0.24, h * 0.1, w * 0.015)
      ctx.fillStyle = p.panel
      ctx.fill()
      ctx.strokeStyle = p.line
      ctx.stroke()
    }
  },

  /** Terminal / build output. */
  terminal(ctx, w, h, p, rand) {
    ctx.fillStyle = '#0b0b0c'
    ctx.fillRect(0, 0, w, h)

    const rows = 11
    const gap = h / (rows + 2)
    for (let i = 0; i < rows; i++) {
      const y = gap * (i + 1)
      ctx.fillStyle = i % 5 === 0 ? p.accent : p.ink
      ctx.globalAlpha = i % 5 === 0 ? 0.9 : 0.22 + rand() * 0.3
      // Prompt caret
      ctx.fillRect(w * 0.07, y, w * 0.02, gap * 0.3)
      ctx.fillRect(w * 0.12, y, w * (0.12 + rand() * 0.66), gap * 0.3)
      ctx.globalAlpha = 1
    }
  },
}

export const PANEL_KINDS = Object.keys(PANELS)

/**
 * Draws one floating hero panel.
 *
 * `width` is the long side; panels are 16:10 so they read as screens rather
 * than posters. 512 wide is the sweet spot — smaller shows compression on the
 * nearest panels, larger buys nothing at the size they occupy on screen.
 */
export function drawPanel(kind, seed, width = 512) {
  const w = width
  const h = Math.round(width * 0.625)
  const canvas = canvasOf(w, h)
  const ctx = canvas.getContext('2d')
  const draw = PANELS[kind] ?? PANELS.browser

  draw(ctx, w, h, DARK, seeded(seed + 1))
  return canvas
}

/**
 * A website preview for the portfolio cards, drawn light because it sits
 * inside a browser frame on a light section.
 *
 * `variant` picks the layout so the eight cards do not all look alike, and
 * `accent` lets a card carry a single tint without leaving the palette.
 */
export function drawSitePreview(variant, seed, width = 900) {
  const w = width
  const h = Math.round(width * 0.625)
  const canvas = canvasOf(w, h)
  const ctx = canvas.getContext('2d')
  const rand = seeded(seed + 7)
  const p = LIGHT

  ctx.fillStyle = p.ground
  ctx.fillRect(0, 0, w, h)

  // Nav
  ctx.fillStyle = p.ink
  ctx.globalAlpha = 0.9
  ctx.fillRect(w * 0.06, h * 0.06, w * 0.1, h * 0.028)
  ctx.globalAlpha = 0.35
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(w * (0.58 + i * 0.09), h * 0.065, w * 0.06, h * 0.018)
  }
  ctx.globalAlpha = 1

  const layouts = [
    // Split hero — copy left, block right
    () => {
      ctx.fillStyle = p.ink
      ctx.fillRect(w * 0.06, h * 0.2, w * 0.4, h * 0.075)
      ctx.globalAlpha = 0.45
      ctx.fillRect(w * 0.06, h * 0.31, w * 0.3, h * 0.03)
      ctx.globalAlpha = 1
      roundRect(ctx, w * 0.06, h * 0.4, w * 0.16, h * 0.06, h * 0.03)
      ctx.fillStyle = p.accent
      ctx.fill()
      roundRect(ctx, w * 0.52, h * 0.18, w * 0.42, h * 0.42, w * 0.015)
      ctx.fillStyle = p.panel
      ctx.fill()
      ctx.strokeStyle = p.line
      ctx.stroke()
    },
    // Centred hero
    () => {
      ctx.fillStyle = p.ink
      ctx.fillRect(w * 0.24, h * 0.22, w * 0.52, h * 0.08)
      ctx.globalAlpha = 0.4
      ctx.fillRect(w * 0.32, h * 0.35, w * 0.36, h * 0.028)
      ctx.globalAlpha = 1
      roundRect(ctx, w * 0.42, h * 0.44, w * 0.16, h * 0.06, h * 0.03)
      ctx.fillStyle = p.ink
      ctx.fill()
    },
    // Dashboard — chart + stat tiles
    () => {
      roundRect(ctx, w * 0.06, h * 0.18, w * 0.56, h * 0.42, w * 0.015)
      ctx.fillStyle = p.panel
      ctx.fill()
      ctx.strokeStyle = p.line
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(w * 0.1, h * 0.5)
      for (let i = 1; i <= 8; i++) {
        ctx.lineTo(w * (0.1 + i * 0.06), h * (0.5 - rand() * 0.24))
      }
      ctx.strokeStyle = p.accent
      ctx.lineWidth = Math.max(2, w * 0.004)
      ctx.stroke()
      for (let i = 0; i < 3; i++) {
        roundRect(ctx, w * 0.68, h * (0.18 + i * 0.15), w * 0.26, h * 0.12, w * 0.012)
        ctx.fillStyle = p.panel
        ctx.fill()
        ctx.strokeStyle = p.line
        ctx.stroke()
      }
    },
    // Catalogue grid
    () => {
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 4; c++) {
          roundRect(
            ctx,
            w * (0.06 + c * 0.23),
            h * (0.2 + r * 0.24),
            w * 0.2,
            h * 0.2,
            w * 0.012
          )
          ctx.fillStyle = p.panel
          ctx.fill()
          ctx.strokeStyle = p.line
          ctx.stroke()
          if (r === 0 && c === 1) {
            ctx.fillStyle = p.accent
            ctx.globalAlpha = 0.25
            ctx.fill()
            ctx.globalAlpha = 1
          }
        }
      }
    },
  ]

  layouts[variant % layouts.length]()

  // Footer rule
  ctx.strokeStyle = p.line
  ctx.beginPath()
  ctx.moveTo(w * 0.06, h * 0.86)
  ctx.lineTo(w * 0.94, h * 0.86)
  ctx.stroke()

  return canvas
}
