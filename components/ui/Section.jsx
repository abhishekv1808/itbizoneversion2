/**
 * Every section below the hero shares this rhythm: 1200px measure, the same
 * horizontal gutters as the navbar, and scroll-margin so anchor jumps clear
 * the fixed header.
 */
export default function Section({ id, className = '', inner = '', children }) {
  return (
    <section
      id={id}
      /*
        py-14 on phones, not py-20.

        At 80px top and bottom, fifteen sections spent 2,400px on padding
        alone and the home page ran to nearly 24 screens on a 390px viewport.
        56px still separates the sections clearly at that width — the ratio
        that reads as generous on a 1440px desktop reads as dead space when
        the column is a quarter as wide.
      */
      className={`scroll-mt-24 px-6 py-14 md:px-9 md:py-28 lg:py-36 ${className}`}
    >
      <div className={`mx-auto w-full max-w-[1200px] ${inner}`}>{children}</div>
    </section>
  )
}
