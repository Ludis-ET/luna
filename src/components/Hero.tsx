import { motion } from 'framer-motion'
import { MEDIA } from '../data/media'
import { TRUST_STATS } from '../data/content'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
})

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-cream"
    >
      {/* Background image: clean, no video or 3D */}
      <div className="absolute inset-0">
        <img
          src={MEDIA.dayExterior}
          alt=""
          className="h-full w-full object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/85 to-cream/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/90 via-transparent to-transparent" />
      </div>

      <div className="container-max relative z-10 w-full px-6 pb-14 pt-32 md:pb-20 md:pt-36">
        <motion.p
          {...fadeUp(0)}
          className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-brand"
        >
          Luna Cottage AFH · South Everett
        </motion.p>

        <motion.h1
          {...fadeUp(0.15)}
          className="max-w-3xl font-serif text-[2.5rem] font-semibold leading-[1.1] text-charcoal md:text-6xl lg:text-7xl"
        >
          Where care feels like home.
        </motion.h1>

        <motion.p
          {...fadeUp(0.3)}
          className="mt-5 max-w-xl text-base leading-relaxed text-charcoal/65 md:text-lg"
        >
          A six-bedroom residence run by a Registered Nurse, offering compassionate,
          individualized elder care in a quiet neighborhood.
        </motion.p>

        <motion.div
          {...fadeUp(0.45)}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-cream transition hover:bg-brand/90"
          >
            Schedule a tour
          </a>
          <a
            href="#about"
            className="inline-flex items-center rounded-full border border-charcoal/15 px-7 py-3.5 text-sm font-semibold text-charcoal/80 transition hover:border-brand/40 hover:text-brand"
          >
            Learn more
          </a>
        </motion.div>

        {/* Trust row: visible immediately, no scroll trap */}
        <motion.div
          {...fadeUp(0.6)}
          className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-charcoal/10 pt-8"
        >
          {TRUST_STATS.map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-8">
              {i > 0 && <span className="hidden h-8 w-px bg-charcoal/15 sm:block" aria-hidden />}
              <div>
                <p className="font-serif text-2xl font-semibold text-brand">{value}</p>
                <p className="text-xs font-medium uppercase tracking-wider text-charcoal/50">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-charcoal/35 transition hover:text-brand"
        aria-label="Scroll to about section"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="block h-8 w-px bg-charcoal/25"
        />
      </motion.a>
    </section>
  )
}
