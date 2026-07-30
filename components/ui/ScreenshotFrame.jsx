import Image from 'next/image'

/**
 * A browser-framed screenshot slot that keeps its shape when empty.
 *
 * Every project in lib/projects.js previously pointed at a file from a generic
 * stock screenshot set — OpenCredit was showing Talkbase, Right Assets was
 * showing HeadshotPro complete with HeadshotPro's own Trustpilot score and
 * client logos. Presenting another company's product as delivered work is the
 * one failure mode a portfolio cannot survive, so those mappings are cleared
 * and this renders a labelled placeholder until real captures exist.
 *
 * The placeholder holds the same aspect ratio as the image will, so dropping a
 * real file in shifts nothing.
 */
export default function ScreenshotFrame({
  src,
  alt,
  label,
  ratio = 'aspect-[16/10]',
  priority = false,
  sizes = '(max-width: 810px) 100vw, 50vw',
  chrome = true,
  className = '',
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-soft bg-bg ${className}`}
    >
      {chrome ? (
        <div className="flex items-center gap-2 border-b border-soft bg-chip px-4 py-3">
          <span className="size-2.5 rounded-full bg-soft" />
          <span className="size-2.5 rounded-full bg-soft" />
          <span className="size-2.5 rounded-full bg-soft" />
          {label ? (
            <span className="ml-2 flex-1 truncate rounded-full bg-bg px-3 py-1 text-[11px] text-quiet">
              {label}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className={`relative w-full overflow-hidden bg-panel ${ratio}`}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top"
          />
        ) : (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-center">
            <span className="text-[13px] font-medium text-muted">
              Screenshot pending
            </span>
            <span className="max-w-[240px] text-[12px] leading-snug text-quiet">
              {label ? `Add a capture of ${label}` : 'Add a capture'}
            </span>
          </span>
        )}
      </div>
    </div>
  )
}
