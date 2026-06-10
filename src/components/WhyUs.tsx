import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from './SectionLabel'
import { WHY_US } from '../data/content'
import { MEDIA } from '../data/media'

gsap.registerPlugin(ScrollTrigger)

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const list = listRef.current
    if (!section || !list) return

    const items = list.querySelectorAll<HTMLElement>('li')

    const ctx = gsap.context(() => {
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.05,
          },
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="why-us" ref={sectionRef} className="section-pad relative overflow-hidden bg-cream">
      <img
        src={MEDIA.nightGarage}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.06]"
        aria-hidden
      />

      <div className="container-max relative z-10 px-6">
        <SectionLabel number="04" label="Why Choose Us" />
        <h2 className="font-serif text-3xl font-bold text-charcoal md:text-5xl">
          Why Families Choose <span className="text-brand">Luna Cottage</span>
        </h2>

        <ul ref={listRef} className="mt-12 grid gap-4 sm:grid-cols-2">
          {WHY_US.map((item) => (
            <li
              key={item}
              className="flex items-start gap-4 rounded-2xl border border-brand/10 bg-white/60 p-5 backdrop-blur-sm"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-sm text-cream">
                ✓
              </span>
              <span className="text-charcoal/85">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
