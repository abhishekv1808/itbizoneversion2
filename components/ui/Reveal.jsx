'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]
const MARGIN = '-70px 0px'

/**
 * Resolves to true once the element has been seen — and stays true.
 *
 * The catch-up listener exists because a fast fling can outrun
 * IntersectionObserver: entries coalesce, the observer reports the element as
 * already gone, and `whileInView` never fires. Left alone that strands the
 * content at opacity 0 permanently, so anything scrolled fully past the top of
 * the viewport is revealed regardless of what the observer saw.
 */
function useSeen(ref) {
  const inView = useInView(ref, { once: true, margin: MARGIN })
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    if (inView) setSeen(true)
  }, [inView])

  useEffect(() => {
    if (seen) return

    const check = () => {
      const el = ref.current
      if (el && el.getBoundingClientRect().bottom < 0) setSeen(true)
    }

    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [seen, ref])

  return seen
}

/** Scroll-in reveal used by every section below the hero. Fires once. */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 22,
  className = '',
  ...rest
}) {
  const ref = useRef(null)
  const seen = useSeen(ref)
  const Tag = motion[as] || motion.div

  return (
    <Tag
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={seen ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Parent that hands a staggered delay to `revealItem` children. */
export function RevealGroup({ children, className = '', stagger = 0.08 }) {
  const ref = useRef(null)
  const seen = useSeen(ref)

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={seen ? 'show' : 'hidden'}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const revealItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}
