import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import { SERVICE_CATEGORIES, SERVICES_INTRO } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    if (!section || !cards) return

    const cardEls = cards.querySelectorAll<HTMLElement>('[data-card]')

    const ctx = gsap.context(() => {
      cardEls.forEach((card) => {
        const items = card.querySelectorAll<HTMLElement>('[data-item]')
        gsap.fromTo(
          card,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              end: 'top 60%',
              scrub: 1,
            },
          },
        )
        gsap.fromTo(
          items,
          { opacity: 0, x: -12 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.04,
            scrollTrigger: {
              trigger: card,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="section-pad bg-cream">
      <div className="container-max px-6">
        <SectionLabel number="02" label="Services" />
        <h2 className="font-serif text-3xl font-bold text-charcoal md:text-5xl">
          Here&apos;s <span className="text-brand">what we do</span>
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-charcoal/70 md:text-lg">
          {SERVICES_INTRO}
        </p>

        <div ref={cardsRef} className="mt-14 grid gap-8 md:grid-cols-2">
          {SERVICE_CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              data-card
              className="glass-card rounded-3xl p-7 md:p-8"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-xl text-brand">
                  {cat.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-charcoal">{cat.title}</h3>
              </div>
              <ul className="max-h-[420px] space-y-2.5 overflow-y-auto pr-1 md:max-h-none md:overflow-visible">
                {cat.items.map((item) => (
                  <li key={item} data-item className="flex gap-2.5 text-sm leading-snug text-charcoal/75">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-lavender/50 bg-lavender/20 p-8 text-center"
        >
          <p className="font-serif text-lg italic text-charcoal/90">
            Each resident receives a customized care plan, developed around their interests,
            preferences, and capabilities, then reviewed regularly and updated whenever needs change.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
