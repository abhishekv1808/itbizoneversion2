'use client'

import { useLenis } from 'lenis/react'
import { ArrowUp } from 'lucide-react'

/**
 * Sends the page home through Lenis so the return trip is eased like every
 * other scroll. Falls back to the anchor's default jump if Lenis hasn't
 * mounted yet, which keeps the control useful during hydration.
 */
export default function BackToTop() {
  const lenis = useLenis()

  const toTop = (event) => {
    if (!lenis) return
    event.preventDefault()
    lenis.scrollTo(0, { duration: 1.4 })
  }

  return (
    <a
      href="#"
      onClick={toTop}
      className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[13px] font-medium text-white/70 transition-colors duration-300 hover:bg-white/10 hover:text-white"
    >
      Back to top
      <ArrowUp
        size={14}
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      />
    </a>
  )
}
