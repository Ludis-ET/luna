import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import { SERVICE_CATEGORIES } from '../data/content'

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
      cardEls.forEach((card, i) => {
        const items = card.querySelectorAll<HTMLElement>('[data-item]')
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, rotateX: 8 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
            },
          },
        )
        gsap.fromTo(
          items,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.08,
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          },
        )
        void i
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="section-pad bg-cream">
      <div className="container-max px-6">
        <SectionLabel number="03" label="Services" />
        <h2 className="font-serif text-3xl font-bold text-charcoal md:text-5xl">
          Everything <span className="text-brand">Under One Roof</span>
        </h2>

        <div ref={cardsRef} className="mt-14 grid gap-8 lg:grid-cols-3">
          {SERVICE_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.title}
              data-card
              className="glass-card group rounded-3xl p-8 [perspective:1000px]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-2xl text-brand transition group-hover:bg-brand group-hover:text-cream">
                {cat.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal">{cat.title}</h3>
              <ul className="mt-5 space-y-3">
                {cat.items.map((item) => (
                  <li key={item} data-item className="flex gap-2 text-sm text-charcoal/75">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
              <span className="mt-4 block text-xs text-charcoal/40">0{idx + 1}</span>
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
            Each resident receives an individualized care plan — assessed upon admission, reviewed every year, and updated whenever needs change.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
