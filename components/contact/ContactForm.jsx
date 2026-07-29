'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import { SITE } from '@/lib/site'

const SERVICES = [
  'Website Development',
  'UI/UX Design',
  'Digital Marketing',
  'Graphic Design',
  'Social Media Management',
  'E-commerce Development',
  'Something else',
]

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  message: '',
  website: '', // honeypot
}

const field =
  'w-full rounded-xl border border-soft bg-bg px-4 py-3.5 text-[15px] outline-none transition-colors duration-200 placeholder:text-quiet focus:border-ink/30'

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [failure, setFailure] = useState('')
  const errorRef = useRef(null)

  const update = (key) => (event) => {
    setValues((v) => ({ ...v, [key]: event.target.value }))
    // Clear the error as soon as they start fixing it, rather than making
    // them submit again to find out whether it is resolved.
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
        body: JSON.stringify(values),
      })

      const payload = await response.json().catch(() => ({}))

      if (response.status === 422 && payload.errors) {
        setErrors(payload.errors)
        setStatus('idle')
        errorRef.current?.focus()
        return
      }

      if (!response.ok) {
        setFailure(payload.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setValues(EMPTY)
      setStatus('sent')
    } catch {
      setFailure('Could not reach the server. Please check your connection.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        role="status"
        className="flex flex-col items-start gap-4 rounded-2xl border border-soft bg-panel p-8"
      >
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-dot/15 text-dot">
          <Check size={20} />
        </span>
        <h3 className="text-[22px] font-semibold tracking-[-0.04em]">
          Thanks — that&rsquo;s with us.
        </h3>
        <p className="text-[15px] leading-[1.5] text-muted">
          We read everything that comes in and reply within one working day.
          If it&rsquo;s urgent, call{' '}
          <a href={SITE.phoneHref} className="text-ink underline underline-offset-4">
            {SITE.phone}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-[13px] font-medium text-muted underline underline-offset-4 transition-colors hover:text-ink"
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          required
          error={errors.name}
          errorRef={errorRef}
          input={
            <input
              type="text"
              value={values.name}
              onChange={update('name')}
              autoComplete="name"
              placeholder="Your name"
              className={field}
            />
          }
        />
        <Field
          label="Email"
          required
          error={errors.email}
          input={
            <input
              type="email"
              value={values.email}
              onChange={update('email')}
              autoComplete="email"
              placeholder="you@company.com"
              className={field}
            />
          }
        />
        <Field
          label="Phone"
          error={errors.phone}
          input={
            <input
              type="tel"
              value={values.phone}
              onChange={update('phone')}
              autoComplete="tel"
              placeholder="+91"
              className={field}
            />
          }
        />
        <Field
          label="Company"
          error={errors.company}
          input={
            <input
              type="text"
              value={values.company}
              onChange={update('company')}
              autoComplete="organization"
              placeholder="Optional"
              className={field}
            />
          }
        />
      </div>

      <Field
        label="What do you need?"
        input={
          <select
            value={values.service}
            onChange={update('service')}
            className={`${field} appearance-none`}
          >
            <option value="">Select a service</option>
            {SERVICES.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        }
      />

      <Field
        label="Project details"
        required
        error={errors.message}
        input={
          <textarea
            value={values.message}
            onChange={update('message')}
            rows={6}
            placeholder="What are you building, and by when?"
            className={`${field} resize-y`}
          />
        }
      />

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={update('website')}
          />
        </label>
      </div>

      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="rounded-xl border border-soft bg-panel px-4 py-3 text-[14px] text-muted"
          >
            {failure}{' '}
            <a
              href={`mailto:${SITE.email}`}
              className="text-ink underline underline-offset-4"
            >
              Email us instead
            </a>
            .
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ink px-8 text-[15px] font-semibold text-white transition-transform duration-200 hover:-translate-y-px disabled:opacity-60"
        >
          {status === 'sending' && (
            <Loader2 size={16} className="animate-spin motion-reduce:animate-none" />
          )}
          {status === 'sending' ? 'Sending' : 'Send enquiry'}
        </button>
        <span className="text-[13px] text-quiet">
          We reply within one working day.
        </span>
      </div>
    </form>
  )
}

function Field({ label, required, error, input, errorRef }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[13px] font-medium text-muted">
        {label}
        {required && <span className="ml-0.5 text-quiet">*</span>}
      </span>
      {input}
      {error && (
        <span
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="text-[13px] text-ink/70 outline-none"
        >
          {error}
        </span>
      )}
    </label>
  )
}
