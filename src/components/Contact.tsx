import { useEffect, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import { SITE } from '../data/content'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const tel = (number: string) => `tel:${number.replace(/[^\d+]/g, '')}`
const sms = (number: string) => `sms:${number.replace(/[^\d+]/g, '')}`

const primaryPhone = SITE.phones.find((p) => p.primary) ?? SITE.phones[0]
const otherPhones = SITE.phones.filter((p) => p !== primaryPhone)

async function getRecaptchaToken(siteKey: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!window.grecaptcha) {
      reject(new Error('reCAPTCHA failed to load. Please refresh and try again.'))
      return
    }
    window.grecaptcha.ready(() => {
      window.grecaptcha!
        .execute(siteKey, { action: 'contact' })
        .then(resolve)
        .catch(() => reject(new Error('reCAPTCHA verification failed. Please try again.')))
    })
  })
}

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const hasRecaptcha = SITE.recaptchaSiteKey.length > 0

  useEffect(() => {
    if (!hasRecaptcha) return
    if (document.querySelector('script[data-recaptcha-v3]')) return

    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE.recaptchaSiteKey}`
    script.async = true
    script.defer = true
    script.setAttribute('data-recaptcha-v3', 'true')
    document.head.appendChild(script)
  }, [hasRecaptcha])

  const fallbackMessage = `Sorry, we couldn't send your message. Please call or text ${primaryPhone.number} or email ${SITE.email}.`

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    if (data.get('botcheck')) return

    setStatus('sending')
    setErrorMsg('')

    try {
      let recaptchaToken = ''
      if (hasRecaptcha) {
        recaptchaToken = await getRecaptchaToken(SITE.recaptchaSiteKey)
      }

      const fullName = String(data.get('fullName') || '').trim()
      const phone = String(data.get('phone') || '').trim()
      const email = String(data.get('email') || '').trim()
      const role = String(data.get('role') || '').trim()
      const message = String(data.get('message') || '').trim()

      const now = new Date()
      const submittedAt = now.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' })
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          role,
          message,
          submittedAt: `${submittedAt} (${timeZone})`,
          pageUrl: window.location.href,
          referrer: document.referrer || 'Direct visit',
          language: navigator.language,
          recaptchaToken,
        }),
      })

      const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null

      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || fallbackMessage)
      }

      setStatus('sent')
      form.reset()
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : fallbackMessage)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-pad bg-gradient-to-b from-lavender/30 to-cream">
      <div className="container-max px-6">
        <SectionLabel number="06" label="Contact" />
        <h2 className="section-title">
          We&apos;re Here <span className="text-brand">For You</span>
        </h2>
        <p className="section-lead max-w-2xl">
          Reach out any time. We&apos;re happy to answer your questions and schedule a visit.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="glass-card rounded-2xl p-6 md:p-7">
              <p className="label-gold">Your contact</p>
              <p className="mt-2 font-serif text-2xl font-bold text-charcoal">{SITE.owner}</p>
            </div>

            <div className="glass-card rounded-2xl p-6 md:p-7">
              <p className="label-gold">{primaryPhone.label}</p>
              <p className="mt-2 font-serif text-3xl font-bold text-charcoal">{primaryPhone.number}</p>
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

            <div className="glass-card space-y-4 rounded-2xl p-6 text-sm text-charcoal/80 md:p-7 md:text-base">
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

            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-brand/10 px-4 py-2 text-sm font-medium text-brand">
                Private pay &amp; Medicaid accepted
              </span>
              <span className="rounded-full bg-brand/10 px-4 py-2 text-sm font-medium text-brand">
                Tours available by appointment
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gold/25 shadow-lg">
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
            className="glass-card rounded-3xl p-8 md:p-10"
          >
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand text-2xl text-cream">
                  ✓
                </div>
                <p className="font-serif text-xl font-bold text-charcoal">Message sent!</p>
                <p className="mt-3 text-base text-charcoal/70">
                  Thank you for reaching out. We&apos;ll reply to your email or phone soon.
                </p>
              </div>
            ) : (
              <>
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-plum/80">
                      Full name
                    </label>
                    <input
                      required
                      id="contact-name"
                      name="fullName"
                      autoComplete="name"
                      placeholder="Jane Doe"
                      className="form-input-light"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="mb-2 block text-sm font-semibold text-plum/80">
                      Phone number
                    </label>
                    <input
                      required
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(206) 555-0123"
                      className="form-input-light"
                    />
                  </div>
                </div>

                <label htmlFor="contact-email" className="mb-2 mt-4 block text-sm font-semibold text-plum/80">
                  Email
                </label>
                <input
                  required
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="form-input-light"
                />

                <label htmlFor="contact-role" className="mb-2 mt-4 block text-sm font-semibold text-plum/80">
                  I am a…
                </label>
                <select required id="contact-role" name="role" className="form-input-light" defaultValue="">
                  <option value="" disabled>
                    Select one
                  </option>
                  <option>Family Member</option>
                  <option>Healthcare Professional</option>
                  <option>Other</option>
                </select>

                <label htmlFor="contact-message" className="mb-2 mt-4 block text-sm font-semibold text-plum/80">
                  Your message
                </label>
                <textarea
                  required
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell us a little about your situation and how we can help."
                  className="form-input-light resize-none"
                />

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

                {hasRecaptcha && (
                  <p className="mt-3 text-center text-[11px] leading-relaxed text-charcoal/45">
                    Protected by reCAPTCHA. Google{' '}
                    <a
                      href="https://policies.google.com/privacy"
                      className="underline hover:text-charcoal/70"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a
                      href="https://policies.google.com/terms"
                      className="underline hover:text-charcoal/70"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms of Service
                    </a>{' '}
                    apply.
                  </p>
                )}

                <p className="mt-4 text-center text-sm text-charcoal/55">
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
