import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import VideoPlayer from './VideoPlayer'
import { MEDIA } from '../data/media'

const HIGHLIGHTS = [
  { label: 'Exterior & grounds', time: '0:00' },
  { label: 'Living spaces', time: '—' },
  { label: 'Dining & kitchen', time: '—' },
] as const

export default function Tour() {
  return (
    <section id="tour" className="section-pad relative overflow-hidden bg-cream">
      <div className="pointer-events-none absolute -right-32 top-20 h-64 w-64 rounded-full bg-lavender/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-48 w-48 rounded-full bg-brand/10 blur-3xl" />

      <div className="container-max relative px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel number="06" label="Virtual Tour" />
            <h2 className="font-serif text-3xl font-semibold text-charcoal md:text-5xl">
              Take a <span className="text-brand">virtual tour</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal/65 md:text-lg">
              Walk through Luna Cottage from your screen — explore the rooms, gardens, and warm
              interiors before you visit in person.
            </p>

            <ul className="mt-8 space-y-3">
              {HIGHLIGHTS.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between rounded-xl border border-charcoal/5 bg-white/60 px-4 py-3 text-sm"
                >
                  <span className="font-medium text-charcoal/80">{item.label}</span>
                  <span className="text-xs tabular-nums text-charcoal/40">{item.time}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-xs leading-relaxed text-charcoal/45">
              Tip: use <kbd className="rounded bg-white px-1.5 py-0.5 font-mono text-[10px] ring-1 ring-charcoal/10">Space</kbd> to play,
              {' '}<kbd className="rounded bg-white px-1.5 py-0.5 font-mono text-[10px] ring-1 ring-charcoal/10">←</kbd>
              {' '}/{' '}
              <kbd className="rounded bg-white px-1.5 py-0.5 font-mono text-[10px] ring-1 ring-charcoal/10">→</kbd> to skip,
              {' '}<kbd className="rounded bg-white px-1.5 py-0.5 font-mono text-[10px] ring-1 ring-charcoal/10">F</kbd> for fullscreen.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <VideoPlayer
              src={MEDIA.video}
              poster={MEDIA.nightWide}
              title="Luna Cottage — Full property walkthrough"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
