/** Small pill label that opens a section — same shape as the hero ticker chips. */
export function Eyebrow({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-soft bg-chip px-3.5 py-1.5 text-[13px] font-medium text-muted ${className}`}
    >
      {children}
    </span>
  )
}

/** The serif italic accent word carried down from the hero title. */
export function Accent({ children }) {
  return (
    <span className="font-serif font-semibold italic tracking-[-0.06em]">
      {children}
    </span>
  )
}

export function SectionTitle({ children, className = '' }) {
  return (
    <h2
      className={`text-[clamp(30px,8vw,36px)] leading-[1.06] font-semibold tracking-[-0.055em] md:text-[clamp(38px,5vw,48px)] lg:text-[54px] ${className}`}
    >
      {children}
    </h2>
  )
}

export function Lede({ children, className = '' }) {
  return (
    <p
      className={`text-[17px] leading-[1.55] font-normal text-muted ${className}`}
    >
      {children}
    </p>
  )
}
