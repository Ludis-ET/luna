import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionLabel from './SectionLabel'
import { ABOUT_TEXT, ABOUT_EXTENDED, STAFF_TEXT } from '../data/content'
import { MEDIA } from '../data/media'

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null)
  const inView = useInView(imageRef, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative bg-cream py-24 md:py-32">
      <div className="container-max grid items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
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
          <p className="mt-6 text-base leading-relaxed text-charcoal/75 md:text-lg">{ABOUT_TEXT}</p>
          <p className="mt-4 text-base leading-relaxed text-charcoal/70">{ABOUT_EXTENDED}</p>

          <div className="mt-8 rounded-2xl border border-brand/15 bg-white/60 p-6">
            <p className="font-semibold text-charcoal">Our staff</p>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{STAFF_TEXT}</p>
          </div>

          <p className="mt-6 text-sm italic text-charcoal/50">
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
            <p className="text-xs text-charcoal/50">private rooms</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
