import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MISSION } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLQuoteElement>(null)
  useLayoutEffect(() => {
    const section = sectionRef.current
    const quote = quoteRef.current
    if (!section || !quote) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=80%',
        pin: true,
        pinSpacing: true,
      })

      gsap.fromTo(
        quote,
        { scale: 0.85, opacity: 0, filter: 'blur(10px)' },
        {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=80%',
            scrub: 1,
          },
        },
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand"
    >
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />
      <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 bg-magenta/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 bg-glow/15 blur-[100px]" />

      <blockquote
        ref={quoteRef}
        className="container-max relative z-10 px-6 text-center font-serif text-2xl font-medium italic leading-relaxed text-cream md:text-4xl lg:text-5xl"
      >
        &ldquo;{MISSION}&rdquo;
        <footer className="mt-8 font-sans text-sm font-semibold not-italic tracking-[0.2em] text-cream/60">
          LUNA COTTAGE AFH MISSION
        </footer>
      </blockquote>
    </section>
  )
}
