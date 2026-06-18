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

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          },
        },
      )

      gsap.fromTo(
        player,
        { opacity: 0, y: 100, scale: 0.88 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 20%',
            scrub: 1,
          },
        },
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="tour" ref={sectionRef} className="section-pad relative overflow-hidden bg-cream">
      <div className="pointer-events-none absolute -right-32 top-20 h-64 w-64 rounded-full bg-lavender/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-48 w-48 rounded-full bg-brand/10 blur-3xl" />

      <div ref={headerRef} className="container-max mb-10 px-6 text-center md:mb-14">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <SectionLabel number="05" label="Virtual Tour" />
        </motion.div>
        <h2 className="font-serif text-3xl font-semibold text-charcoal md:text-5xl">
          Take a <span className="text-brand">virtual tour</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-charcoal/65 md:text-lg">
          See the warmth and comfort of Luna Cottage for yourself.
        </p>
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-10">
        <div ref={playerWrapRef} className="mx-auto w-full max-w-[min(100%,1400px)]">
          <VideoPlayer
            src={MEDIA.video}
            poster={MEDIA.nightWide}
            title="Luna Cottage: Full property walkthrough"
            className="rounded-2xl md:rounded-3xl"
          />
        </div>
      </div>
    </section>
  )
}
