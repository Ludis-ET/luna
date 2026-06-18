import { useEffect, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import { SITE } from '../data/content'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const tel = (number: string) => `tel:${number.replace(/[^\d+]/g, '')}`
const sms = (number: string) => `sms:${number.replace(/[^\d+]/g, '')}`

const primaryPhone = SITE.phones.find((p) => p.primary) ?? SITE.phones[0]
const otherPhones = SITE.phones.filter((p) => p !== primaryPhone)

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const hasFormService = SITE.formAccessKey.length > 0
  const hasRecaptcha = SITE.recaptchaSiteKey.length > 0

  // Load the reCAPTCHA script once, only if a site key is configured.
  useEffect(() => {
    if (!hasRecaptcha) return
    if (document.querySelector('script[data-recaptcha]')) return
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    script.setAttribute('data-recaptcha', 'true')
    document.head.appendChild(script)
  }, [hasRecaptcha])

  const fallbackMessage = `Sorry, we couldn't send your message. Please call or text ${primaryPhone.number} or email ${SITE.email}.`

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot: bots fill hidden fields; humans don't.
    if (data.get('botcheck')) return

    if (!hasFormService) {
      setErrorMsg(fallbackMessage)
      setStatus('error')
      return
    }

    // Require the captcha to be solved before sending.
    if (hasRecaptcha) {
      const token = window.grecaptcha?.getResponse() ?? ''
      if (!token) {
        setErrorMsg('Please confirm you are not a robot before sending.')
        setStatus('error')
        return
      }
    }

    setStatus('sending')

    // Build a rich, readable email: include who, what, and useful context.
    const now = new Date()
    const submittedAt = now.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' })
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    data.append('access_key', SITE.formAccessKey)
    data.append('subject', `New website inquiry from ${data.get('name') || 'a visitor'}`)
    data.append('from_name', 'Luna Cottage Website')
    if (data.get('email')) data.append('replyto', String(data.get('email')))
    data.append('Submitted', `${submittedAt} (${timeZone})`)
    data.append('Page', window.location.href)
    data.append('Referrer', document.referrer || 'Direct visit')
    data.append('Language', navigator.language)
    data.append('Device', navigator.userAgent)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const json = await res.json()
      if (json.success) {
        setStatus('sent')
        form.reset()
        window.grecaptcha?.reset()
      } else {
        setErrorMsg(fallbackMessage)
        setStatus('error')
      }
    } catch {
      setErrorMsg(fallbackMessage)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-pad bg-gradient-to-b from-lavender/30 to-cream">
      <div className="container-max px-6">
        <SectionLabel number="06" label="Contact" />
        <h2 className="font-serif text-3xl font-bold text-charcoal md:text-5xl">
          We&apos;re Here <span className="text-brand">For You</span>
        </h2>
        <p className="mt-4 max-w-2xl text-charcoal/70">
          Reach out any time. We&apos;re happy to answer your questions and schedule a visit.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="space-y-5">
            {/* Owner */}
            <div className="glass-card rounded-2xl p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-brand">Your contact</p>
              <p className="mt-1 font-serif text-2xl font-bold text-charcoal">{SITE.owner}</p>
              <p className="text-sm text-charcoal/70">Owner &amp; Registered Nurse</p>
            </div>

            {/* Primary number: call or text */}
            <div className="glass-card rounded-2xl p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-brand">{primaryPhone.label}</p>
              <p className="mt-1 font-serif text-3xl font-bold text-charcoal">{primaryPhone.number}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={tel(primaryPhone.number)} className="btn-primary">
                  Call now
                </a>
                <a
                  href={sms(primaryPhone.number)}
                  className="inline-flex items-center gap-2 rounded-full border border-brand/30 px-6 py-3 text-sm font-semibold text-brand transition hover:bg-brand/5"
                >
                  Send a text
                </a>
              </div>
            </div>

            {/* Office + email + address */}
            <div className="glass-card space-y-4 rounded-2xl p-6 text-sm text-charcoal/80">
              {otherPhones.map((phone) => (
                <p key={phone.number}>
                  <span className="font-semibold text-charcoal">{phone.label}:</span>{' '}
                  <a href={tel(phone.number)} className="hover:text-brand">{phone.number}</a>
                </p>
              ))}
              <p>
                <span className="font-semibold text-charcoal">Email:</span>{' '}
                <a href={`mailto:${SITE.email}`} className="hover:text-brand">{SITE.email}</a>
              </p>
              <p>
                <span className="font-semibold text-charcoal">Address:</span> {SITE.address}
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2.5">
              <span className="rounded-full bg-brand/10 px-4 py-2 text-sm font-medium text-brand">
                Private pay &amp; Medicaid accepted
              </span>
              <span className="rounded-full bg-brand/10 px-4 py-2 text-sm font-medium text-brand">
                Tours available by appointment
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-brand/10 shadow-lg">
              <iframe
                title="Luna Cottage location"
                src="https://maps.google.com/maps?q=10524+23rd+Dr+SE,+Everett,+WA+98208&output=embed"
                className="h-56 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8"
          >
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand text-2xl text-cream">
                  ✓
                </div>
                <p className="font-serif text-xl font-bold text-charcoal">Message sent!</p>
                <p className="mt-2 text-sm text-charcoal/70">We&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <>
                {/* Honeypot anti-spam field: hidden from real users */}
                <input
                  type="text"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-charcoal/80">
                      Full name
                    </label>
                    <input required id="name" name="name" autoComplete="name" placeholder="Jane Doe" className="form-input-light" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold text-charcoal/80">
                      Phone number
                    </label>
                    <input required id="phone" name="phone" type="tel" autoComplete="tel" placeholder="(206) 555-0123" className="form-input-light" />
                  </div>
                </div>

                <label htmlFor="email" className="mb-1.5 mt-4 block text-xs font-semibold text-charcoal/80">
                  Email
                </label>
                <input required id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className="form-input-light" />

                <label htmlFor="role" className="mb-1.5 mt-4 block text-xs font-semibold text-charcoal/80">
                  I am a…
                </label>
                <select required id="role" name="role" className="form-input-light" defaultValue="">
                  <option value="" disabled>Select one</option>
                  <option>Family Member</option>
                  <option>Healthcare Professional</option>
                  <option>Other</option>
                </select>

                <label htmlFor="message" className="mb-1.5 mt-4 block text-xs font-semibold text-charcoal/80">
                  Your message
                </label>
                <textarea
                  required
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us a little about your situation and how we can help."
                  className="form-input-light resize-none"
                />

                {hasRecaptcha && (
                  <div className="g-recaptcha mt-4" data-sitekey={SITE.recaptchaSiteKey} />
                )}

                {status === 'error' && (
                  <p className="mt-4 rounded-lg bg-magenta/10 px-4 py-3 text-sm text-magenta" role="alert">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary mt-6 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>

                <p className="mt-3 text-center text-xs text-charcoal/55">
                  Prefer to talk now? Call or text{' '}
                  <a href={tel(primaryPhone.number)} className="font-semibold text-brand">
                    {primaryPhone.number}
                  </a>
                </p>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
