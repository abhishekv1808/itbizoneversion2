import fs from 'node:fs'
import path from 'node:path'
import { ImageResponse } from 'next/og'
import { SITE } from './site'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

/**
 * The wordmark, inlined as a data URI.
 *
 * Read off disk rather than fetched: the note below about fonts applies here
 * too, and a local synchronous read cannot fail on a flaky network. Wrapped
 * anyway, because the one thing worse than an OG card without a logo is a
 * build that will not complete — if the file moves, the type-set lockup below
 * still renders.
 */
const LOGO_DATA_URI = (() => {
  try {
    const file = fs.readFileSync(
      // The reversed variant: these cards are drawn on #0a0a0a.
      path.join(process.cwd(), 'public', 'itbizone-logo-white.png')
    )
    return `data:image/png;base64,${file.toString('base64')}`
  } catch {
    return null
  }
})()

// Intrinsic 1561x274. Drawn at 40px tall to sit where the 34px type did.
const LOGO_H = 40
const LOGO_W = Math.round((LOGO_H * 1561) / 274)

/**
 * Shared Open Graph card.
 *
 * Deliberately uses the system font stack rather than fetching Inter and
 * Source Serif at build time: OG images are generated during `next build`,
 * and a font fetch failing there fails the whole build. The wordmark's italic
 * "one" survives with a plain italic, so the brand still reads correctly.
 *
 * Black ground, white type — the inverse of the site, which makes shared
 * links legible against both light and dark chat backgrounds.
 */
export function ogImage({ title, eyebrow, footer }) {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0a',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {LOGO_DATA_URI ? (
            /*
              Sits directly on the dark ground. It used to be boxed in a white
              pill, which was only ever a workaround for having no reversed
              artwork — Satori supports no CSS filters, so the mark could not
              be inverted the way it is on the site. With a real white file the
              pill is unnecessary, and it read as a badge rather than a logo.
            */
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={LOGO_DATA_URI}
              width={LOGO_W}
              height={LOGO_H}
              alt="ITBIZONE"
            />
          ) : (
            <span
              style={{
                fontSize: 34,
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.04em',
              }}
            >
              {SITE.name}
            </span>
          )}

          {eyebrow ? (
            <span
              style={{
                marginLeft: 20,
                padding: '7px 16px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.18)',
                fontSize: 20,
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              {eyebrow}
            </span>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: title.length > 46 ? 68 : 82,
            fontWeight: 600,
            color: '#ffffff',
            letterSpacing: '-0.055em',
            lineHeight: 1.05,
            maxWidth: 960,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 22,
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          <span>{footer || SITE.address.city}</span>
          <span>itbizone.com</span>
        </div>
      </div>
    ),
    OG_SIZE
  )
}
