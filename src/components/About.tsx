import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionLabel from './SectionLabel'
import { ABOUT_PARAGRAPHS, PHILOSOPHY, VALUES, STAFF_TEXT, STAFF_CREDENTIALS } from '../data/content'
import { MEDIA } from '../data/media'

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null)
  const inView = useInView(imageRef, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative bg-cream py-24 md:py-32">
      <div className="container-max grid items-start gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel number="01" label="About" />
          <h2 className="font-serif text-3xl font-semibold text-charcoal md:text-5xl">
            A home built on <span className="text-brand">compassion</span>
          </h2>

          {ABOUT_PARAGRAPHS.map((paragraph, i) => (
            <p
              key={i}
              className={`text-base leading-relaxed text-charcoal/75 md:text-lg ${i === 0 ? 'mt-6' : 'mt-4'}`}
            >
              {paragraph}
            </p>
          ))}

          <div className="mt-8 rounded-2xl border border-brand/15 bg-white/60 p-6">
            <p className="font-serif text-lg font-semibold text-brand">Philosophy of Care</p>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/75 md:text-base">{PHILOSOPHY}</p>
          </div>

          <p className="mt-6 text-sm italic text-charcoal/60">
            We would welcome the opportunity to earn your trust and show you the best care in the industry.
          </p>
        </motion.div>

        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl shadow-[0_24px_60px_-20px_rgba(123,45,158,0.18)]">
            <img
              src={MEDIA.livingRoom}
              alt="Living room at Luna Cottage"
              className="aspect-[4/5] w-full object-cover md:aspect-[5/6]"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-brand/10 bg-white p-4 shadow-lg md:block">
            <p className="font-serif text-lg font-semibold text-brand">6</p>
            <p className="text-xs text-charcoal/60">private rooms</p>
          </div>
        </motion.div>
      </div>

      {/* Values & Approach */}
      <div className="container-max mt-16 px-6 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Values &amp; Approach</p>
          <h3 className="mt-2 font-serif text-2xl font-semibold text-charcoal md:text-3xl">
            How we care, every day
          </h3>
        </motion.div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {VALUES.map((value, i) => (
            <motion.li
              key={value}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-start gap-3 rounded-2xl border border-brand/10 bg-white/60 p-5 backdrop-blur-sm"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs text-cream">
                ✓
              </span>
              <span className="text-sm leading-snug text-charcoal/80 md:text-base">{value}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Our Staff: brand-gradient band with credential pills (distinct from the cards above) */}
      <div className="container-max mt-16 px-6 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-magenta p-8 text-cream shadow-[0_30px_70px_-25px_rgba(123,45,158,0.5)] md:p-12"
        >
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-10" aria-hidden />
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-glow/20 blur-3xl" />

          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cream/70">Our Staff</p>
            <h3 className="mt-2 max-w-2xl font-serif text-2xl font-semibold md:text-3xl">
              Trained, trusted, and always learning
            </h3>
            <p className="mt-4 max-w-3xl leading-relaxed text-cream/85">{STAFF_TEXT}</p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {STAFF_CREDENTIALS.map((credential) => (
                <span
                  key={credential}
                  className="rounded-full bg-white/12 px-4 py-2 text-sm font-medium text-cream ring-1 ring-white/25 backdrop-blur-sm"
                >
                  {credential}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
