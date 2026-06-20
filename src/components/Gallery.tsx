import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import { GALLERY_IMAGES, type GalleryTag } from '../data/media'
import { scrollToY } from '../lib/scroll'

gsap.registerPlugin(ScrollTrigger)

const FILTERS: Array<GalleryTag | 'All'> = ['All', 'Exterior', 'Living', 'Dining', 'Comfort']

function getHorizontalScroll(strip: HTMLElement) {
  return Math.max(strip.scrollWidth - window.innerWidth + 48, 0)
}

function isScrolledIntoGallery(section: HTMLElement) {
  const scrollY = window.scrollY
  const top = section.offsetTop
  const bottom = top + section.offsetHeight
  return scrollY >= top - 120 && scrollY < bottom - 120
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const skipFilterAnchor = useRef(true)
  const [filter, setFilter] = useState<GalleryTag | 'All'>('All')
  const [lightbox, setLightbox] = useState<(typeof GALLERY_IMAGES)[number] | null>(null)

  const filtered =
    filter === 'All' ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.tag === filter)

  const handleFilterChange = useCallback((next: GalleryTag | 'All') => {
    if (next === filter) return
    const strip = stripRef.current
    if (strip) gsap.set(strip, { x: 0 })
    setFilter(next)
  }, [filter])

  // Create the horizontal pin scroll once; width recalculates on refresh.
  useLayoutEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    const strip = stripRef.current
    if (!section || !pin || !strip) return

    const ctx = gsap.context(() => {
      gsap.to(strip, {
        x: () => -getHorizontalScroll(strip),
        ease: 'none',
        scrollTrigger: {
          id: 'gallery-horizontal',
          trigger: section,
          start: 'top top',
          end: () => `+=${getHorizontalScroll(strip) + window.innerHeight * 0.5}`,
          pin: pin,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  // When the filter changes, reset the strip and re-anchor scroll inside the gallery.
  useLayoutEffect(() => {
    if (skipFilterAnchor.current) {
      skipFilterAnchor.current = false
      return
    }

    const section = sectionRef.current
    const strip = stripRef.current
    if (!section || !strip) return

    gsap.set(strip, { x: 0 })

    const wasInGallery = isScrolledIntoGallery(section)
    const sectionTop = section.offsetTop

    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh(true)

      if (wasInGallery) {
        scrollToY(sectionTop, true)
        requestAnimationFrame(() => ScrollTrigger.refresh(true))
      }
    })

    return () => cancelAnimationFrame(frame)
  }, [filter])

  return (
    <section id="gallery" ref={sectionRef} className="relative bg-charcoal">
      <div ref={pinRef} className="flex h-screen flex-col justify-center overflow-hidden py-24">
        <div className="container-max mb-8 px-6">
          <SectionLabel number="03" label="Gallery" light />
          <h2 className="font-serif text-3xl font-bold text-cream md:text-5xl">
            Experience the Home
          </h2>
          <p className="mt-3 max-w-2xl text-cream/65">
            Scroll through Luna Cottage, from a warm welcome at the door to private bedrooms,
            accessible baths, sunny patio gatherings, and peaceful evenings.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => handleFilterChange(f)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  filter === f
                    ? 'bg-brand text-cream shadow-glow'
                    : 'bg-white/10 text-cream/70 hover:bg-white/15'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div ref={stripRef} className="flex gap-6 px-6">
          {filtered.map((img) => (
            <motion.button
              key={img.src}
              type="button"
              whileHover={{ scale: 1.03 }}
              onClick={() => setLightbox(img)}
              className="group relative h-[55vh] w-[80vw] max-w-md shrink-0 overflow-hidden rounded-3xl ring-2 ring-transparent transition hover:ring-glow/50 md:w-[45vw]"
            >
              <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                <p className="font-serif text-xl font-semibold text-cream md:text-2xl">{img.title}</p>
                <p className="mt-1 text-sm text-cream/75">{img.caption}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 p-6 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute right-6 top-6 rounded-full bg-white/10 px-4 py-2 text-cream hover:bg-white/20"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
