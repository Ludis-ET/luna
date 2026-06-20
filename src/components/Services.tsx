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
          { y: 40 },
          {
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
          { x: -10 },
          {
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
        <h2 className="section-title">
          Here&apos;s <span className="text-brand">what we do</span>
        </h2>
        <p className="section-lead">{SERVICES_INTRO}</p>

        <div ref={cardsRef} className="mt-14 grid gap-8 md:grid-cols-2">
          {SERVICE_CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              data-card
              className="relative overflow-hidden rounded-2xl border border-[#c5a880]/30 bg-[#2e1447] p-6 shadow-[0_24px_60px_-20px_rgba(46,20,71,0.6)] md:p-7"
            >
              <div className="pointer-events-none absolute inset-2 rounded-xl border border-[#c5a880]/30" aria-hidden />

              <div className="relative mb-5 flex items-center gap-3 border-b border-[#c5a880]/25 pb-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c5a880] bg-white/5 font-serif text-lg font-bold text-[#c5a880]">
                  {cat.icon}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#faf7f2]">{cat.title}</h3>
              </div>

              <ul className="relative max-h-[420px] space-y-2.5 overflow-y-auto pr-1 md:max-h-none md:overflow-visible">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    data-item
                    className="relative pl-4 text-base leading-relaxed text-[#faf7f2]/90"
                  >
                    <span className="absolute left-0 top-2.5 text-[9px] text-[#c5a880]" aria-hidden>
                      ◆
                    </span>
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
          className="mt-12 rounded-2xl border border-lavender/50 bg-lavender/20 p-8 text-center md:p-10"
        >
          <p className="font-serif text-lg italic text-charcoal/90 md:text-xl">
            Each resident receives a customized care plan, developed around their interests,
            preferences, and capabilities, then reviewed regularly and updated whenever needs change.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
