import { SITE } from '@/lib/site'
import { priceSelection, formatINR } from '@/lib/pricing'

/**
 * Contact form endpoint.
 *
 * Talks to Resend over plain HTTPS rather than pulling in their SDK — it is
 * one POST, and staying dependency-free means swapping providers later is a
 * change to this file alone.
 *
 * Required env:
 *   RESEND_API_KEY      – from resend.com
 *   CONTACT_FROM_EMAIL  – a verified sender on your domain
 *   CONTACT_TO_EMAIL    – optional, defaults to SITE.email
 */

const MAX = { name: 100, email: 200, phone: 40, company: 120, message: 4000 }

/*
  A callback request is a deliberately shorter form: a name, a way to reach
  them, and nothing else. It exists because ad traffic arrives with intent but
  no patience — asking someone who clicked an ad for a ten-character project
  description loses more leads than the description is worth.

  It is a distinct intent rather than a synthetic message, so the enquiry that
  lands in the inbox says plainly that this person asked to be called and did
  not describe the job. Filling the gap with placeholder prose would quietly
  make a thin lead look like a briefed one.
*/
function validate(body, { quote, callback } = {}) {
  const errors = {}
  const clean = (value) => (typeof value === 'string' ? value.trim() : '')

  const name = clean(body.name)
  const email = clean(body.email)
  const phone = clean(body.phone)
  const company = clean(body.company)
  const service = clean(body.service)
  const message = clean(body.message)

  if (!name) errors.name = 'Please tell us your name.'
  else if (name.length > MAX.name) errors.name = 'That name is too long.'

  // Deliberately loose. Strict email regexes reject valid addresses far more
  // often than they catch typos; the reply bouncing is the real validation.
  if (!email) errors.email = 'We need an email to reply to.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > MAX.email)
    errors.email = 'That email address does not look right.'

  if (callback && !phone) {
    // The one field a callback cannot do without.
    errors.phone = 'We need a number to call you on.'
  } else if (phone && phone.length > MAX.phone) {
    errors.phone = 'That number is too long.'
  }
  if (company.length > MAX.company) errors.company = 'That name is too long.'

  // A priced selection is itself the brief, so the estimator does not ask for
  // a message. Only require one when there is no quote attached.
  if (quote || callback) {
    if (message.length > MAX.message)
      errors.message = 'That is longer than we can accept — send the detail by email.'
  } else if (!message) {
    errors.message = 'Tell us a little about the project.'
  } else if (message.length < 10) {
    errors.message = 'A bit more detail would help us quote properly.'
  } else if (message.length > MAX.message) {
    errors.message = 'That is longer than we can accept — send the detail by email.'
  }

  return {
    errors,
    data: { name, email, phone, company, service, message },
  }
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Malformed request.' }, { status: 400 })
  }

  // Honeypot. Real people never fill a field they cannot see, so anything
  // here is a bot — accept it silently rather than telling it why it failed.
  if (body.website) {
    return Response.json({ ok: true }, { status: 200 })
  }

  /**
   * Price the selection here rather than accepting a total from the browser.
   * A tampered payload could otherwise drop a ₹1 "quotation" into the inbox
   * and it would look official, because it arrived through the normal route.
   * Unknown item names are dropped by priceSelection.
   */
  const quote = body.quote
    ? priceSelection(body.quote.slug, body.quote.items)
    : null

  if (body.quote && !quote) {
    return Response.json(
      { error: 'That selection is no longer available. Please rebuild it.' },
      { status: 422 }
    )
  }

  const callback = body.intent === 'callback'
  const { errors, data } = validate(body, { quote, callback })
  if (Object.keys(errors).length) {
    return Response.json({ errors }, { status: 422 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL || SITE.email

  if (!apiKey || !from) {
    console.error(
      'Contact form: RESEND_API_KEY or CONTACT_FROM_EMAIL is not set — enquiry not delivered.',
      { name: data.name, email: data.email }
    )
    return Response.json(
      { error: 'Email is not configured on this server yet.' },
      { status: 503 }
    )
  }

  const rows = [
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone || '—'],
    ['Company', data.company || '—'],
    ['Service', data.service || '—'],
    // Says so explicitly, so a short lead is never mistaken for a briefed one.
    ['Type', callback ? 'Callback requested — no brief given' : 'Enquiry'],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#6b6b6b">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`
    )
    .join('')

  const quoteBlock = quote
    ? `
        <h3 style="margin:24px 0 8px;font-size:15px">Estimate built on the site</h3>
        <table style="border-collapse:collapse;width:100%;font-size:14px">
          ${quote.items
            .map(
              (item) =>
                `<tr><td style="padding:6px 16px 6px 0;border-bottom:1px solid #eee">${escapeHtml(item.name)}</td><td style="padding:6px 0;border-bottom:1px solid #eee;text-align:right;white-space:nowrap">${escapeHtml(formatINR(item.price))}</td></tr>`
            )
            .join('')}
          <tr>
            <td style="padding:10px 16px 0 0"><strong>Indicative range</strong></td>
            <td style="padding:10px 0 0;text-align:right;white-space:nowrap"><strong>${escapeHtml(formatINR(quote.low))} – ${escapeHtml(formatINR(quote.high))}</strong></td>
          </tr>
        </table>
        <p style="margin:12px 0 0;font-size:13px;color:#6b6b6b">
          Prices recalculated server-side from the catalogue, not taken from the browser.
        </p>`
    : ''

  const messageBlock = data.message
    ? `<div style="padding:16px;background:#fafafa;border-radius:8px;white-space:pre-wrap">${escapeHtml(data.message)}</div>`
    : ''

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        // So hitting reply in the inbox goes to the enquirer, not to us.
        reply_to: data.email,
        subject: quote
          ? `Estimate request — ${data.name} (${quote.service}, ${formatINR(quote.low)}+)`
          : `New enquiry — ${data.name}${data.service ? ` (${data.service})` : ''}`,
        html: `
          <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#0a0a0a">
            <h2 style="margin:0 0 16px;font-size:18px">${quote ? 'Estimate request from the website' : 'New enquiry from the website'}</h2>
            <table style="border-collapse:collapse;margin-bottom:20px">${rows}</table>
            ${messageBlock}
            ${quoteBlock}
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const detail = await response.text()
      console.error('Contact form: Resend rejected the send.', response.status, detail)
      return Response.json(
        { error: 'We could not send that just now. Please email us directly.' },
        { status: 502 }
      )
    }
  } catch (error) {
    console.error('Contact form: network error reaching Resend.', error)
    return Response.json(
      { error: 'We could not send that just now. Please email us directly.' },
      { status: 502 }
    )
  }

  return Response.json({ ok: true })
}
