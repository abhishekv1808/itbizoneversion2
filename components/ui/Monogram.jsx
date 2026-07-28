const initials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

const SIZES = {
  sm: 'size-10 text-[13px]',
  md: 'size-12 text-sm',
  lg: 'size-full text-2xl',
}

/**
 * Stands in for a portrait. Monograms keep the section honest until real
 * photography exists, and read as intentional in a black-and-white system.
 */
export default function Monogram({ name, size = 'md', className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full border border-soft bg-chip font-serif font-semibold tracking-[-0.04em] text-muted italic ${SIZES[size]} ${className}`}
    >
      {initials(name)}
    </span>
  )
}
