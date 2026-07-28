const WIDGET_JS = 'https://assets.calendly.com/assets/external/widget.js'
const WIDGET_CSS = 'https://assets.calendly.com/assets/external/widget.css'

let pending

/**
 * Fetches Calendly's popup widget on demand and caches the promise.
 *
 * Loading it up front would cost every visitor a script and a stylesheet for a
 * modal most of them never open, so nothing is requested until someone hovers
 * or clicks the booking button. Callers must handle rejection — the button
 * falls back to opening the booking page in a new tab.
 */
export default function loadCalendly() {
  if (pending) return pending
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Calendly is browser-only'))
  }

  pending = new Promise((resolve, reject) => {
    const stylesheet = document.createElement('link')
    stylesheet.rel = 'stylesheet'
    stylesheet.href = WIDGET_CSS
    document.head.appendChild(stylesheet)

    const script = document.createElement('script')
    script.src = WIDGET_JS
    script.async = true
    script.onload = () => resolve(window.Calendly)
    script.onerror = () => {
      // Let a later attempt retry rather than caching the failure forever.
      pending = undefined
      reject(new Error('Calendly widget failed to load'))
    }
    document.head.appendChild(script)
  })

  return pending
}
