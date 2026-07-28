/**
 * Every section below the hero shares this rhythm: 1200px measure, the same
 * horizontal gutters as the navbar, and scroll-margin so anchor jumps clear
 * the fixed header.
 */
export default function Section({ id, className = '', inner = '', children }) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 px-6 py-20 md:px-9 md:py-28 lg:py-36 ${className}`}
    >
      <div className={`mx-auto w-full max-w-[1200px] ${inner}`}>{children}</div>
    </section>
  )
}
