'use client'

import { usePathname } from 'next/navigation'

/**
 * Links to a section of the home page from anywhere in the app.
 *
 * On `/` the bare hash is kept, because Lenis only intercepts hash-only hrefs
 * and that is what gives the eased scroll. On any other route the hash has to
 * be absolute or the browser resolves it against the current path and does
 * nothing at all.
 */
export default function SectionLink({
  hash,
  className = '',
  onClick,
  children,
  ...rest
}) {
  const pathname = usePathname()
  const href = pathname === '/' ? hash : `/${hash}`

  return (
    <a href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  )
}
