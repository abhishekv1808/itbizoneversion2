'use client'

/**
 * Thin wrapper over gtag.
 *
 * Every call is a no-op unless GA4 is actually configured and loaded, so
 * components can fire events unconditionally without guarding each call site
 * and without breaking local development, where no measurement ID is set.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''

/*
  Google Ads conversion tracking.

  GA4 alone is not enough to run paid traffic on. A GA4 event can be imported
  into Ads as a conversion, but the import is delayed and attribution is
  weaker, and Smart Bidding needs the signal to arrive fast and reliably to
  have anything to optimise towards. The Ads tag is a second, direct path for
  the same action.

  Both IDs are optional. Set neither and every call below is a silent no-op,
  so nothing here breaks local development or a deploy that has not been wired
  up yet.

    NEXT_PUBLIC_GOOGLE_ADS_ID     the AW-XXXXXXXXX conversion account
    NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL   the label for the lead conversion,
                                        from Ads › Goals › Conversions
*/
export const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || ''
const ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL || ''

export const analyticsEnabled = Boolean(GA_ID || ADS_ID)
export const adsEnabled = Boolean(ADS_ID)

export function track(event, params = {}) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return

  window.gtag('event', event, params)
}

/**
 * Reports a conversion to Google Ads as well as GA4.
 *
 * Call this for actions worth money — a submitted form, a booked call, a
 * tapped phone number — and plain `track` for everything else. Sending every
 * scroll and click here would train the bidding on noise.
 *
 * `value` and `currency` are passed through when given: value-based bidding
 * cannot work without them, and a lead with no value is indistinguishable
 * from any other to the algorithm.
 */
export function trackConversion(event, params = {}) {
  track(event, params)

  if (!ADS_ID || !ADS_LEAD_LABEL) return
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  window.gtag('event', 'conversion', {
    send_to: `${ADS_ID}/${ADS_LEAD_LABEL}`,
    ...(params.value != null && { value: params.value }),
    ...(params.currency && { currency: params.currency }),
  })
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
