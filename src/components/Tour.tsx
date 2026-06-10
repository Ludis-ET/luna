import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import { MEDIA } from '../data/media'

export default function Tour() {
  return (
    <section id="tour" className="section-pad bg-cream">
      <div className="container-max px-6">
        <SectionLabel number="06" label="Virtual Tour" />
        <h2 className="font-serif text-3xl font-bold text-charcoal md:text-5xl">
          Take a <span className="text-brand">Virtual Tour</span>
        </h2>
        <p className="mt-4 max-w-xl text-charcoal/70">
          See the warmth and comfort of Luna Cottage for yourself.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card relative mt-10 overflow-hidden rounded-3xl p-2"
        >
          <video
            src={MEDIA.video}
            controls
            playsInline
            className="aspect-video w-full rounded-2xl bg-charcoal object-cover"
            poster={MEDIA.nightWide}
          />
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-brand/20" />
        </motion.div>
      </div>
    </section>
  )
}
