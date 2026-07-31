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
      /*
        The mobile step was 8vw, which resolves to 31px at 390px wide and left
        headings running to three and four lines. 7vw with a 30px ceiling puts
        it at 27px there, and the ceiling stops it growing past what a phone
        in landscape needs. Desktop is untouched.
      */
      className={`text-[clamp(25px,7vw,30px)] leading-[1.08] font-semibold tracking-[-0.05em] md:text-[clamp(38px,5vw,48px)] md:leading-[1.06] md:tracking-[-0.055em] lg:text-[54px] ${className}`}
    >
      {children}
    </h2>
  )
}

export function Lede({ children, className = '' }) {
  return (
    <p
      /*
        14px on phones, 17px from md up. 17px is a comfortable reading size in
        a 500px column; in a 345px one it sets about six words to the line and
        turns every three-sentence lede into a five-line block, which is what
        pushed the sections so far apart.

        Line height goes up as the size comes down — 1.55 rather than 1.5.
        Smaller type needs proportionally more leading to stay readable, and
        without it the block reads as denser rather than smaller.
      */
      className={`text-[14px] leading-[1.55] font-normal text-muted md:text-[17px] md:leading-[1.55] ${className}`}
    >
      {children}
    </p>
  )
}
