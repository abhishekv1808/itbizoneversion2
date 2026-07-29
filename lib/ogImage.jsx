import { ImageResponse } from 'next/og'
import { SITE } from './site'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

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
          <span
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.04em',
            }}
          >
            ITBIZ
          </span>
          <span
            style={{
              fontSize: 34,
              fontWeight: 600,
              fontStyle: 'italic',
              color: '#ffffff',
              letterSpacing: '-0.04em',
              marginLeft: -13,
            }}
          >
            one
          </span>

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
