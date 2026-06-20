import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import VideoPlayer from './VideoPlayer'
import { MEDIA } from '../data/media'

gsap.registerPlugin(ScrollTrigger)

export default function Tour() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const playerWrapRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const player = playerWrapRef.current
    if (!section || !header || !player) return

    const mobile = window.matchMedia('(max-width: 767px)').matches

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { opacity: 0, y: mobile ? 24 : 40 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 60%',
            scrub: mobile ? 0.5 : 1,
          },
        },
      )

      gsap.fromTo(
        player,
        { opacity: 0, y: mobile ? 32 : 100, scale: mobile ? 1 : 0.88 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: mobile ? 'top 35%' : 'top 20%',
            scrub: mobile ? 0.5 : 1,
          },
        },
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="tour" ref={sectionRef} className="section-pad relative overflow-x-hidden bg-cream py-16 md:py-28">
      <div className="pointer-events-none absolute -right-32 top-20 hidden h-64 w-64 rounded-full bg-lavender/20 blur-3xl md:block" />
      <div className="pointer-events-none absolute -left-20 bottom-10 hidden h-48 w-48 rounded-full bg-brand/10 blur-3xl md:block" />

      <div ref={headerRef} className="container-max mb-6 px-4 text-center sm:mb-10 sm:px-6 md:mb-14">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <SectionLabel number="05" label="Virtual Tour" />
        </motion.div>
        <h2 className="font-serif text-2xl font-semibold text-charcoal sm:text-3xl md:text-5xl">
          Take a <span className="text-brand">virtual tour</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-charcoal/65 sm:mt-4 sm:text-base md:text-lg">
          See the warmth and comfort of Luna Cottage for yourself.
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-3 sm:px-6 lg:max-w-6xl">
        <div ref={playerWrapRef} className="w-full">
          <VideoPlayer
            src={MEDIA.video}
            poster={MEDIA.nightWide}
            title="Luna Cottage: Full property walkthrough"
            className="rounded-xl sm:rounded-2xl md:rounded-3xl"
          />
        </div>
      </div>
    </section>
  )
}
