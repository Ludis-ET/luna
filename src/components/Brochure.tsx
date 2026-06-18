import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import { BROCHURE, SITE } from '../data/content'

const DownloadIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
  </svg>
)

const items = [
  {
    href: BROCHURE.brochureUrl,
    badge: 'PDF · Letter size',
    title: 'Care & Services Brochure',
    description:
      'A complete, print-ready overview of Luna Cottage, perfect to share with family, case managers, and social workers.',
    features: [
      'Welcome, mission & philosophy of care',
      'Full services, specialties & amenities',
      'Contact details and how to schedule a tour',
    ],
    cta: 'Open & Save as PDF',
    accent: 'from-brand to-magenta',
  },
  {
    href: BROCHURE.businessCardUrl,
    badge: 'PDF · 3.5 × 2 in',
    title: 'Business Card',
    description:
      `A polished, double-sided business card for ${SITE.owner}, ready to print or hand off digitally.`,
    features: ['Front & back design', 'Direct call/text and office numbers', 'Email, address & website'],
    cta: 'Open & Save as PDF',
    accent: 'from-charcoal to-brand',
  },
]

export default function Brochure() {
  return (
    <section id="brochure" className="section-pad bg-gradient-to-b from-cream to-lavender/20">
      <div className="container-max px-6">
        <SectionLabel number="04" label="Resources" />
        <h2 className="font-serif text-3xl font-bold text-charcoal md:text-5xl">
          Download our <span className="text-brand">brochure</span>
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal/70 md:text-lg">
          Take Luna Cottage with you. Open either file and choose “Save as PDF” to download or print.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {items.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group glass-card flex flex-col rounded-3xl p-8 transition hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-cream shadow-lg`}
                >
                  <DownloadIcon />
                </div>
                <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
                  {item.badge}
                </span>
              </div>

              <h3 className="mt-6 font-serif text-2xl font-bold text-charcoal">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{item.description}</p>

              <ul className="mt-5 space-y-2">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-charcoal/75">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {feature}
                  </li>
                ))}
              </ul>

              <span className="btn-primary mt-7 w-full justify-center group-hover:scale-[1.02]">
                <DownloadIcon />
                {item.cta}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
