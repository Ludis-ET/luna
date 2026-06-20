import { useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import { GALLERY_IMAGES, type GalleryTag } from '../data/media'
import { scrollByY, scrollToY } from '../lib/scroll'

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

function galleryScrollRange(st: ScrollTrigger) {
  return (st.end as number) - (st.start as number)
}

function horizontalDeltaToScroll(delta: number, maxX: number, st: ScrollTrigger) {
  if (maxX <= 0) return 0
  return -(delta / maxX) * galleryScrollRange(st)
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const skipFilterAnchor = useRef(true)
  const dragRef = useRef<{ active: boolean; startX: number; startScroll: number; moved: boolean }>({
    active: false,
    startX: 0,
    startScroll: 0,
    moved: false,
  })
  const [filter, setFilter] = useState<GalleryTag | 'All'>('All')
  const [lightbox, setLightbox] = useState<(typeof GALLERY_IMAGES)[number] | null>(null)
  const [dragging, setDragging] = useState(false)

  const filtered =
    filter === 'All' ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.tag === filter)

  const handleFilterChange = useCallback((next: GalleryTag | 'All') => {
    if (next === filter) return
    const strip = stripRef.current
    if (strip) gsap.set(strip, { x: 0 })
    setFilter(next)
  }, [filter])

  // Vertical scroll pins the section and drives horizontal movement.
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

  // Horizontal wheel / trackpad swipe also advances the gallery while pinned.
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const st = ScrollTrigger.getById('gallery-horizontal')
      if (!st?.isActive) return

      const strip = stripRef.current
      if (!strip) return

      const maxX = getHorizontalScroll(strip)
      if (maxX <= 0) return

      let delta = 0
      if (e.shiftKey && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        delta = e.deltaY
      } else if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        delta = e.deltaX
      } else {
        return
      }

      e.preventDefault()
      scrollByY(horizontalDeltaToScroll(delta, maxX, st), true)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  const onStripPointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return

    const st = ScrollTrigger.getById('gallery-horizontal')
    if (!st?.isActive) return

    dragRef.current = {
      active: true,
      startX: e.clientX,
      startScroll: st.scroll(),
      moved: false,
    }
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [])

  const onStripPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return

    const st = ScrollTrigger.getById('gallery-horizontal')
    const strip = stripRef.current
    if (!st || !strip) return

    const dx = e.clientX - dragRef.current.startX
    if (Math.abs(dx) > 4) dragRef.current.moved = true

    const maxX = getHorizontalScroll(strip)
    const nextScroll = dragRef.current.startScroll + horizontalDeltaToScroll(dx, maxX, st)
    scrollToY(nextScroll, true)
  }, [])

  const endStripDrag = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return
    dragRef.current.active = false
    setDragging(false)
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }, [])

  return (
    <section id="gallery" ref={sectionRef} className="relative bg-charcoal">
      <div ref={pinRef} className="flex h-screen flex-col justify-center overflow-hidden py-16 sm:py-24">
        <div className="container-max mb-6 px-4 sm:mb-8 sm:px-6">
          <SectionLabel number="03" label="Gallery" light />
          <h2 className="font-serif text-3xl font-bold text-cream md:text-5xl">
            Experience the Home
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-cream/65 sm:text-base">
            Scroll through Luna Cottage, from a warm welcome at the door to private bedrooms,
            accessible baths, sunny patio gatherings, and peaceful evenings.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => handleFilterChange(f)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition sm:px-4 sm:py-2 sm:text-sm ${
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

        <div
          ref={stripRef}
          className={`flex touch-pan-y gap-4 px-4 sm:gap-6 sm:px-6 ${dragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
          onPointerDown={onStripPointerDown}
          onPointerMove={onStripPointerMove}
          onPointerUp={endStripDrag}
          onPointerCancel={endStripDrag}
        >
          {filtered.map((img) => (
            <motion.button
              key={img.src}
              type="button"
              whileHover={{ scale: dragging ? 1 : 1.03 }}
              onClick={() => {
                if (dragRef.current.moved) {
                  dragRef.current.moved = false
                  return
                }
                setLightbox(img)
              }}
              className="group relative h-[50vh] w-[85vw] max-w-md shrink-0 overflow-hidden rounded-2xl ring-2 ring-transparent transition hover:ring-glow/50 sm:h-[55vh] sm:w-[80vw] sm:rounded-3xl md:w-[45vw]"
            >
              <img src={img.src} alt={img.alt} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-left sm:p-6">
                <p className="font-serif text-lg font-semibold text-cream sm:text-xl md:text-2xl">{img.title}</p>
                <p className="mt-1 line-clamp-2 text-xs text-cream/75 sm:text-sm">{img.caption}</p>
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 p-4 backdrop-blur-md sm:p-6"
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
              className="absolute right-4 top-4 rounded-full bg-white/10 px-4 py-2 text-sm text-cream hover:bg-white/20 sm:right-6 sm:top-6"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
