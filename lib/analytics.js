'use client'

/**
 * Thin wrapper over gtag.
 *
 * Every call is a no-op unless GA4 is actually configured and loaded, so
 * components can fire events unconditionally without guarding each call site
 * and without breaking local development, where no measurement ID is set.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''

export const analyticsEnabled = Boolean(GA_ID)

export function track(event, params = {}) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return

  window.gtag('event', event, params)
}

/**
 * The events worth watching. Named constants rather than loose strings so a
 * typo fails here instead of quietly producing an event nobody notices is
 * missing until a month of data is gone.
 *
 * `generate_lead` is GA4's own recommended event name — using it means the
 * conversion imports cleanly into Google Ads, which matters because ITBIZONE
 * runs Ads for clients and will want the same signal for itself.
 */
export const EVENTS = {
  lead: 'generate_lead',
  leadFailed: 'lead_form_error',
  booking: 'book_call_click',
  whatsapp: 'whatsapp_click',
  call: 'phone_click',
  email: 'email_click',
  quoteRequest: 'quote_request_click',
}
