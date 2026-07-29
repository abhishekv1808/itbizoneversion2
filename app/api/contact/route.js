import { SITE } from '@/lib/site'

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

function validate(body) {
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

  if (phone && phone.length > MAX.phone) errors.phone = 'That number is too long.'
  if (company.length > MAX.company) errors.company = 'That name is too long.'

  if (!message) errors.message = 'Tell us a little about the project.'
  else if (message.length < 10)
    errors.message = 'A bit more detail would help us quote properly.'
  else if (message.length > MAX.message)
    errors.message = 'That is longer than we can accept — send the detail by email.'

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

  const { errors, data } = validate(body)
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
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#6b6b6b">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`
    )
    .join('')

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
        subject: `New enquiry — ${data.name}${data.service ? ` (${data.service})` : ''}`,
        html: `
          <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#0a0a0a">
            <h2 style="margin:0 0 16px;font-size:18px">New enquiry from the website</h2>
            <table style="border-collapse:collapse;margin-bottom:20px">${rows}</table>
            <div style="padding:16px;background:#fafafa;border-radius:8px;white-space:pre-wrap">${escapeHtml(data.message)}</div>
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
