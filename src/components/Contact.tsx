import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import { SITE } from '../data/content'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="section-pad bg-gradient-to-b from-lavender/30 to-cream">
      <div className="container-max px-6">
        <SectionLabel number="07" label="Contact" />
        <h2 className="font-serif text-3xl font-bold text-charcoal md:text-5xl">
          We&apos;re Here <span className="text-brand">For You</span>
        </h2>
        <p className="mt-4 text-charcoal/70">
          Reach out any time — we&apos;re happy to answer your questions and schedule a visit.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            {SITE.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/-/g, '')}`}
                className="glass-card block rounded-2xl p-6 transition hover:shadow-glow"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-brand">Phone</p>
                <p className="mt-1 font-serif text-2xl font-bold text-charcoal">{phone}</p>
              </a>
            ))}

            <div className="glass-card rounded-2xl p-6 space-y-4 text-sm text-charcoal/80">
              <p>
                <span className="font-semibold text-charcoal">Fax:</span>{' '}
                <a href={`tel:${SITE.fax}`} className="hover:text-brand">{SITE.fax}</a>
              </p>
              <p>
                <span className="font-semibold text-charcoal">Email:</span>{' '}
                <a href={`mailto:${SITE.email}`} className="hover:text-brand">{SITE.email}</a>
              </p>
              <p>
                <span className="font-semibold text-charcoal">Address:</span> {SITE.address}
              </p>
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
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand text-2xl text-cream">
                  ✓
                </div>
                <p className="font-serif text-xl font-bold text-charcoal">Message sent!</p>
                <p className="mt-2 text-sm text-charcoal/60">We&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required name="name" placeholder="Full Name" className="form-input-light" />
                  <input required name="phone" type="tel" placeholder="Phone Number" className="form-input-light" />
                </div>
                <input required name="email" type="email" placeholder="Email" className="form-input-light mt-4" />
                <select name="role" className="form-input-light mt-4" defaultValue="">
                  <option value="" disabled>I am a...</option>
                  <option>Family Member</option>
                  <option>Healthcare Professional</option>
                  <option>Other</option>
                </select>
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="Your message"
                  className="form-input-light mt-4 resize-none"
                />
                <button type="submit" className="btn-primary mt-6 w-full justify-center">
                  Send Message
                </button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
