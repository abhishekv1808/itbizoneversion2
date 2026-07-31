import Image from 'next/image'

// Intrinsic size of both files. Passed so next/image can reserve the right
// box; callers size with CSS height and w-auto.
const LOGO_W = 1561
const LOGO_H = 274

/*
  Two real files, not one file and a filter.

  This used to render the black mark with `brightness-0 invert` on dark
  surfaces. That flattened everything to solid white, which meant the orange
  dot on the i and the orange full stop disappeared — a plain `invert` was no
  better, since it turns the orange blue. The supplied reversed artwork keeps
  both accents, so the filter is gone.

  Both files are 1561x274, so swapping between them cannot shift layout.
*/
const SOURCES = {
  default: '/itbizone-logo.png',
  reversed: '/itbizone-logo-white.png',
}

/**
 * The ITBIZONE wordmark.
 *
 * One component rather than several copies of next/image, so which artwork
 * goes on which background is decided in a single place.
 *
 * `reversed` selects the white-on-transparent variant for dark surfaces.
 * `alt` defaults to the company name; pass '' where the mark is decorative or
 * the wrapping element already carries the label.
 */
export default function Logo({
  className = 'h-6 w-auto',
  reversed = false,
  priority = false,
  alt = 'ITBIZONE',
}) {
  return (
    <Image
      src={reversed ? SOURCES.reversed : SOURCES.default}
      alt={alt}
      width={LOGO_W}
      height={LOGO_H}
      priority={priority}
      className={className}
    />
  )
}
