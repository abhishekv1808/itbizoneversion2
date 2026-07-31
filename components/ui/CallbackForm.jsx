'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Loader2, Phone } from 'lucide-react'
import { trackConversion, track, EVENTS } from '@/lib/analytics'
import { SITE } from '@/lib/site'

const EMPTY = { name: '', phone: '', email: '' }

/**
 * Three fields and a button, posted straight from wherever it is mounted.
 *
 * The long form lives at /quote and is the right tool for someone who has
 * already decided. This is for the visitor who has just arrived on an ad: it
 * asks for a name, a number and an email, and nothing else. Every extra field
 * is a chance to leave, and a page that sends people elsewhere to convert
 * loses the ones who do not follow.
 *
 * `intent: 'callback'` tells /api/contact to waive the project description it
 * normally requires, and marks the enquiry as a callback in the inbox so a
 * thin lead is never mistaken for a briefed one.
 */
export default function CallbackForm({ service, className = '' }) {
  const router = useRouter()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [failure, setFailure] = useState('')

  const update = (key) => (event) => {
    const { value } = event.target
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e))
  }

  const submit = async (event) => {
    event.preventDefault()
    if (status === 'sending') return

    setStatus('sending')
    setFailure('')
    setErrors({})

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, intent: 'callback', service }),
      })
      const payload = await response.json().catch(() => ({}))

      if (response.status === 422 && payload.errors) {
        setErrors(payload.errors)
        setStatus('idle')
        return
      }
      if (!response.ok) {
        track(EVENTS.leadFailed, { status: response.status, source: 'callback' })
        setFailure(payload.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      /*
        The conversion Ads bids on. Fired only after the server has accepted
        it, so a rejected submission never counts as a lead.

        Then a client-side push to /thank-you rather than a full navigation:
        the document is never unloaded, so the event above is safely away
        before the route changes, and the page view on arrival gives Ads a
        URL-based conversion as well as an event-based one.
      */
      trackConversion(EVENTS.lead, { source: 'callback', service })
      setStatus('sent')
      router.push('/thank-you')
    } catch {
      track(EVENTS.leadFailed, { status: 'network', source: 'callback' })
      setFailure('Could not reach the server. Please check your connection.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div
        className={`rounded-3xl border border-soft bg-bg p-7 text-center ${className}`}
      >
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-ink text-white">
          <Check size={20} />
        </span>
        <p className="mt-5 text-[19px] font-semibold tracking-[-0.03em]">
          We&rsquo;ll call you.
        </p>
        <p className="mx-auto mt-2 max-w-[300px] text-[14px] leading-[1.5] text-muted">
          Usually within one working day. If it&rsquo;s urgent,{' '}
          <a
            href={SITE.phoneHref}
            className="font-medium text-ink underline underline-offset-4"
          >
            {SITE.phone}
          </a>{' '}
          reaches us directly.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className={`rounded-3xl border border-soft bg-bg p-6 md:p-7 ${className}`}
    >
      <p className="text-[14px] md:text-[17px] font-semibold tracking-[-0.03em]">
        Ask for a callback
      </p>
      <p className="mt-1.5 text-[14px] leading-[1.5] text-muted">
        No brief needed — leave a number and we&rsquo;ll work out the scope on
        the call.
      </p>

      <div className="mt-5 flex flex-col gap-3">
        <Field
          label="Name"
          value={values.name}
          onChange={update('name')}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          label="Phone"
          type="tel"
          inputMode="tel"
          value={values.phone}
          onChange={update('phone')}
          error={errors.phone}
          autoComplete="tel"
        />
        <Field
          label="Email"
          type="email"
          inputMode="email"
          value={values.email}
          onChange={update('email')}
          error={errors.email}
          autoComplete="email"
        />
      </div>

      {/*
        Honeypot. Hidden from sight and from assistive tech, and skipped by
        tabbing — anything that fills it is a bot, and /api/contact accepts
        those silently rather than telling them why they failed.
      */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        onChange={update('website')}
      />

      {failure ? (
        <p role="alert" className="mt-3 text-[13px] text-red-600">
          {failure}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-5 inline-flex h-12 md:h-13 w-full items-center justify-center gap-2 rounded-full bg-ink px-7 text-[15px] font-semibold text-white transition-opacity disabled:opacity-60"
      >
        {status === 'sending' ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Phone size={16} />
        )}
        {status === 'sending' ? 'Sending' : 'Request a callback'}
      </button>

      <p className="mt-3 text-center text-[12px] text-quiet">
        No obligation. We don&rsquo;t share your details.
      </p>
    </form>
  )
}

function Field({ label, error, type = 'text', ...props }) {
  const id = `cb-${label.toLowerCase()}`
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-medium text-muted">
        {label}
      </label>
      <input
        id={id}
        type={type}
        aria-invalid={Boolean(error)}
        className={`h-12 rounded-xl border bg-bg px-4 text-[15px] outline-none transition-colors focus:border-ink ${
          error ? 'border-red-400' : 'border-soft'
        }`}
        {...props}
      />
      {error ? (
        <span role="alert" className="text-[13px] text-red-600">
          {error}
        </span>
      ) : null}
    </div>
  )
}
