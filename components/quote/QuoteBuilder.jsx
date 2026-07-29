'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2, RotateCcw } from 'lucide-react'
import { QUOTABLE_SERVICES, estimateRange, formatINR } from '@/lib/pricing'
import { track, EVENTS } from '@/lib/analytics'
import { SITE } from '@/lib/site'

const EMPTY_CONTACT = { name: '', email: '', phone: '', company: '', message: '' }

const EASE = [0.22, 1, 0.36, 1]

export default function QuoteBuilder() {
  const [slug, setSlug] = useState(QUOTABLE_SERVICES[0].slug)
  const [picked, setPicked] = useState(() => new Set())
  const [contact, setContact] = useState(EMPTY_CONTACT)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [failure, setFailure] = useState('')
  const startedRef = useRef(false)

  /**
   * Service pages deep-link in as /quote?service=<slug>.
   *
   * Read after mount from window rather than through useSearchParams, which
   * would opt this page out of static rendering. The default is already
   * rendered, so the worst case is one frame on the wrong tab.
   */
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get('service')
    if (wanted && QUOTABLE_SERVICES.some((s) => s.slug === wanted)) {
      setSlug(wanted)
    }
  }, [])

  const service = QUOTABLE_SERVICES.find((s) => s.slug === slug)

  const selected = useMemo(() => {
    const all = service.groups.flatMap((g) => g.items)
    return all.filter((item) => picked.has(item.name))
  }, [service, picked])

  const { low, high } = estimateRange(selected)

  const toggle = (item) => {
    if (!startedRef.current) {
      startedRef.current = true
      track('quote_started', { service: service.name })
    }

    setPicked((current) => {
      const next = new Set(current)
      if (next.has(item.name)) next.delete(item.name)
      else next.add(item.name)
      return next
    })
  }

  // Switching service invalidates the selection — the catalogues don't overlap.
  const changeService = (nextSlug) => {
    setSlug(nextSlug)
    setPicked(new Set())
  }

  const reset = () => {
    setPicked(new Set())
    setStatus('idle')
    setContact(EMPTY_CONTACT)
    setErrors({})
  }

  const update = (key) => (event) => {
    const { value } = event.target
    setContact((c) => ({ ...c, [key]: value }))
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e))
  }

  const submit = async (event) => {
    event.preventDefault()
    if (status === 'sending' || !selected.length) return

    setStatus('sending')
    setFailure('')
    setErrors({})

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contact,
          service: service.name,
          // Names only — the server prices them from the catalogue.
          quote: { slug, items: selected.map((i) => i.name) },
        }),
      })

      const payload = await response.json().catch(() => ({}))

      if (response.status === 422 && payload.errors) {
        setErrors(payload.errors)
        setStatus('idle')
        return
      }

      if (!response.ok) {
        track(EVENTS.leadFailed, { status: response.status, source: 'quote' })
        setFailure(payload.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      track(EVENTS.quoteRequest, {
        service: service.name,
        item_count: selected.length,
        value: low,
        currency: 'INR',
      })
      setStatus('sent')
    } catch {
      track(EVENTS.leadFailed, { status: 'network', source: 'quote' })
      setFailure('Could not reach the server. Please check your connection.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="rounded-3xl border border-soft bg-chip p-8 text-center md:p-12"
      >
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-ink text-white">
          <Check size={22} />
        </span>
        <h2 className="mt-6 text-[28px] leading-tight font-semibold tracking-[-0.045em]">
          Estimate sent.
        </h2>
        <p className="mx-auto mt-3 max-w-[420px] text-[15px] leading-[1.5] text-muted">
          A copy is on its way to {contact.email || 'your inbox'}. We&rsquo;ll
          come back with an itemised written quotation, usually within one
          working day.
        </p>
        <button
          onClick={reset}
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-soft bg-bg px-5 py-3 text-sm font-semibold transition-colors hover:bg-chip"
        >
          <RotateCcw size={15} />
          Build another
        </button>
      </motion.div>
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {/* ── Catalogue ─────────────────────────────────────────────── */}
      <div className="lg:col-span-7">
        <fieldset>
          <legend className="text-[13px] font-medium text-muted">
            1. What do you need?
          </legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {QUOTABLE_SERVICES.map((option) => {
              const active = option.slug === slug
              return (
                <button
                  key={option.slug}
                  type="button"
                  onClick={() => changeService(option.slug)}
                  aria-pressed={active}
                  className={`rounded-full border px-5 py-2.5 text-[15px] font-medium transition-colors duration-200 ${
                    active
                      ? 'border-ink bg-ink text-white'
                      : 'border-soft bg-bg text-ink hover:bg-chip'
                  }`}
                >
                  {option.name}
                </button>
              )
            })}
          </div>
        </fieldset>

        <fieldset className="mt-10">
          <legend className="text-[13px] font-medium text-muted">
            2. Pick the pieces you want
          </legend>

          <div className="mt-4 flex flex-col gap-8">
            {service.groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-[13px] font-medium text-quiet">
                  {group.title}
                </h3>
                <div className="mt-3 overflow-hidden rounded-2xl border border-soft">
                  {group.items.map((item, i) => {
                    const active = picked.has(item.name)
                    return (
                      <label
                        key={item.name}
                        className={`flex cursor-pointer items-center gap-3 px-4 py-3.5 transition-colors duration-200 ${
                          i > 0 ? 'border-t border-soft' : ''
                        } ${active ? 'bg-chip' : 'bg-bg hover:bg-chip/60'}`}
                      >
                        <input
                          type="checkbox"
                          checked={active}
                          onChange={() => toggle(item)}
                          className="size-4 shrink-0 accent-ink"
                        />
                        <span className="flex-1 text-[15px] font-medium">
                          {item.name}
                        </span>
                        <span className="text-[13px] whitespace-nowrap text-muted tabular-nums">
                          from {formatINR(item.price)}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </fieldset>
      </div>

      {/* ── Running total + capture ───────────────────────────────── */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-24">
          <div className="rounded-3xl border border-soft bg-chip p-6 md:p-7">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[13px] font-medium text-muted">
                Indicative range
              </span>
              {selected.length > 0 && (
                <button
                  type="button"
                  onClick={() => setPicked(new Set())}
                  className="text-[13px] text-quiet underline underline-offset-4 hover:text-ink"
                >
                  Clear
                </button>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={low}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="mt-2 text-[clamp(26px,6vw,32px)] leading-none font-semibold tracking-[-0.05em] tabular-nums"
              >
                {selected.length
                  ? `${formatINR(low)} – ${formatINR(high)}`
                  : '—'}
              </motion.p>
            </AnimatePresence>

            <p className="mt-3 text-[13px] leading-[1.5] text-quiet">
              {selected.length
                ? `${selected.length} item${selected.length > 1 ? 's' : ''} selected. An estimate, not a quotation — the written quotation is itemised and holds for 30 days.`
                : 'Select a few pieces to see a range.'}
            </p>

            {selected.length > 0 && (
              <ul className="mt-5 flex flex-col gap-2 border-t border-soft pt-5">
                {selected.map((item) => (
                  <li
                    key={item.name}
                    className="flex justify-between gap-3 text-[13px]"
                  >
                    <span className="text-muted">{item.name}</span>
                    <span className="shrink-0 tabular-nums text-quiet">
                      {formatINR(item.price)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contact capture stays hidden until there is something to send. */}
          <AnimatePresence>
            {selected.length > 0 && (
              <motion.form
                onSubmit={submit}
                noValidate
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mt-5 flex flex-col gap-3"
              >
                <p className="text-[13px] font-medium text-muted">
                  3. Where should we send it?
                </p>

                <Field
                  label="Name"
                  value={contact.name}
                  onChange={update('name')}
                  error={errors.name}
                  autoComplete="name"
                />
                <Field
                  label="Email"
                  type="email"
                  value={contact.email}
                  onChange={update('email')}
                  error={errors.email}
                  autoComplete="email"
                />
                <Field
                  label="Phone (optional)"
                  type="tel"
                  value={contact.phone}
                  onChange={update('phone')}
                  error={errors.phone}
                  autoComplete="tel"
                />

                {failure && (
                  <p role="alert" className="text-[13px] text-red-600">
                    {failure}{' '}
                    <a
                      href={`mailto:${SITE.email}`}
                      className="underline underline-offset-4"
                    >
                      Email us instead
                    </a>
                    .
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-1 inline-flex h-13 items-center justify-center gap-2 rounded-full bg-ink px-7 text-[15px] font-semibold text-white transition-opacity disabled:opacity-60"
                >
                  {status === 'sending' && (
                    <Loader2 size={16} className="animate-spin" />
                  )}
                  {status === 'sending' ? 'Sending' : 'Email me this estimate'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function Field({ label, error, type = 'text', ...props }) {
  const id = `quote-${label.split(' ')[0].toLowerCase()}`
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
      {error && (
        <span role="alert" className="text-[13px] text-red-600">
          {error}
        </span>
      )}
    </div>
  )
}
