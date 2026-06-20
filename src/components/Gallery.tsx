import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import { GALLERY_IMAGES, type GalleryTag } from '../data/media'

type Filter = GalleryTag | 'All'

// Build the filter list from the data so a tab only ever appears when it has photos.
const FILTERS: Filter[] = [
  'All',
  ...Array.from(new Set(GALLERY_IMAGES.map((img) => img.tag))),
]

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = useMemo(
    () => (filter === 'All' ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.tag === filter)),
    [filter],
  )

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const showPrev = useCallback(
    () => setLightboxIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length)),
    [filtered.length],
  )
  const showNext = useCallback(
    () => setLightboxIndex((i) => (i === null ? i : (i + 1) % filtered.length)),
    [filtered.length],
  )

  // Changing the filter invalidates the lightbox index, so close it.
  useEffect(() => setLightboxIndex(null), [filter])

  // Keyboard controls + scroll lock while the lightbox is open.
  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [lightboxIndex, closeLightbox, showPrev, showNext])

  const active = lightboxIndex === null ? null : filtered[lightboxIndex]

  return (
    <section id="gallery" className="section-pad bg-charcoal">
      <div className="container-max px-6">
        <SectionLabel number="03" label="Gallery" light />
        <h2 className="font-serif text-3xl font-bold text-cream md:text-5xl">Experience the Home</h2>
        <p className="mt-3 max-w-2xl text-base text-cream/70 sm:text-lg">
          Explore Luna Cottage, from a warm welcome at the door to private bedrooms, accessible
          baths, sunny patio gatherings, and peaceful evenings.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
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

        {/* Responsive grid: reflows smoothly for any number of photos */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.button
                key={img.src}
                layout
                type="button"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                onClick={() => setLightboxIndex(i)}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10 transition hover:ring-glow/50"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                  <p className="font-serif text-lg font-semibold text-cream">{img.title}</p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-cream/75 sm:text-sm">{img.caption}</p>
                </div>
                <span className="absolute right-3 top-3 rounded-full bg-charcoal/50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-cream/80 opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                  {img.tag}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox: portaled to <body> so it always covers the full viewport, above the header */}
      {createPortal(
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-charcoal/95 p-4 backdrop-blur-md sm:p-8"
              onClick={closeLightbox}
            >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-cream transition hover:bg-white/20 sm:right-6 sm:top-6"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {filtered.length > 1 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); showPrev() }}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-cream transition hover:bg-white/20 sm:left-6"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
                </svg>
              </button>
            )}
            {filtered.length > 1 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); showNext() }}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-cream transition hover:bg-white/20 sm:right-6"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                </svg>
              </button>
            )}

            <motion.img
              key={active.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              src={active.src}
              alt={active.alt}
              className="max-h-[78vh] max-w-full rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="mt-4 max-w-xl text-center" onClick={(e) => e.stopPropagation()}>
              <p className="font-serif text-lg font-semibold text-cream">{active.title}</p>
              <p className="mt-1 text-sm text-cream/70">{active.caption}</p>
              <p className="mt-2 text-xs text-cream/40">
                {(lightboxIndex ?? 0) + 1} / {filtered.length}
              </p>
            </div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  )
}
