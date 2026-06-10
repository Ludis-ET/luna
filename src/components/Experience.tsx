import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from './SectionLabel'
import { EXPERIENCE_BEATS } from '../data/content'
import { MEDIA } from '../data/media'

gsap.registerPlugin(ScrollTrigger)

const BEAT_IMAGES = [
  MEDIA.dayExterior,
  MEDIA.livingRoom,
  MEDIA.dining,
  MEDIA.kitchen,
  MEDIA.nightPath,
  MEDIA.nightWide,
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const slidesRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    const slides = slidesRef.current
    const text = textRef.current
    const glow = glowRef.current
    if (!section || !pin || !slides || !text || !glow) return

    const slideEls = slides.querySelectorAll<HTMLElement>('[data-slide]')
    const textEls = text.querySelectorAll<HTMLElement>('[data-beat]')

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=350%',
        pin: pin,
        pinSpacing: true,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=350%',
          scrub: 1,
        },
      })

      slideEls.forEach((slide, i) => {
        if (i === 0) {
          tl.fromTo(slide, { opacity: 1, scale: 1, x: 0 }, { opacity: 0, scale: 0.95, x: -40, duration: 1 }, 1)
        } else {
          tl.fromTo(
            slide,
            { opacity: 0, scale: 1.08, x: i % 2 === 0 ? 60 : -60 },
            { opacity: 1, scale: 1, x: 0, duration: 1 },
            i,
          )
          if (i < slideEls.length - 1) {
            tl.to(slide, { opacity: 0, scale: 0.95, x: i % 2 === 0 ? -40 : 40, duration: 1 }, i + 1)
          }
        }
      })

      textEls.forEach((el, i) => {
        tl.fromTo(
          el,
          { opacity: 0, y: 40, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 },
          i + 0.2,
        )
        if (i < textEls.length - 1) {
          tl.to(el, { opacity: 0, y: -30, filter: 'blur(6px)', duration: 0.6 }, i + 1)
        }
      })

      gsap.fromTo(
        glow,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=350%',
            scrub: 1,
            onUpdate: (self) => {
              const beat = Math.floor(self.progress * 6)
              glow.style.opacity = beat === 4 ? '1' : '0'
            },
          },
        },
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="relative bg-charcoal">
      <div ref={pinRef} className="relative flex h-screen items-center overflow-hidden">
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,184,77,0.25)_0%,transparent_65%)] opacity-0"
        />

        <div className="container-max relative z-10 grid h-full w-full items-center gap-8 px-6 lg:grid-cols-2">
          <div ref={textRef} className="relative h-48 md:h-56">
            {EXPERIENCE_BEATS.map((beat, i) => (
              <div
                key={beat.text}
                data-beat
                className={`absolute inset-0 flex flex-col justify-center ${i === 0 ? 'opacity-100' : 'opacity-0'}`}
              >
                <SectionLabel number="02" label="Experience" light />
                <h2 className="font-serif text-3xl font-bold text-cream md:text-5xl">{beat.text}</h2>
                <p className="mt-3 max-w-md text-cream/65">{beat.sub}</p>
              </div>
            ))}
          </div>

          <div ref={slidesRef} className="relative h-[50vh] md:h-[65vh]">
            {BEAT_IMAGES.map((src, i) => (
              <div
                key={src}
                data-slide
                className={`absolute inset-0 overflow-hidden rounded-3xl ring-2 ring-magenta/40 ${i === 0 ? 'opacity-100' : 'opacity-0'}`}
                style={{ transform: 'translateZ(0)' }}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
