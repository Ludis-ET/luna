import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-charcoal/[0.06] bg-cream/95 py-2.5 shadow-[0_4px_24px_-4px_rgba(45,45,45,0.08)] backdrop-blur-xl'
            : 'border-b border-white/40 bg-cream/55 py-4 backdrop-blur-md'
        }`}
      >
        <div className="container-max flex items-center justify-between px-6">
          <a
            href="#hero"
            className="group flex items-center gap-2.5"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-brand/20 bg-white/80 font-serif text-lg font-semibold text-brand transition group-hover:border-brand/40 group-hover:bg-white">
              L
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block font-serif text-sm font-semibold text-charcoal">Luna Cottage</span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-charcoal/45">AFH</span>
            </span>
          </a>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map(({ href, label }) => {
              const id = href.slice(1)
              const isActive = active === id
              return (
                <a
                  key={href}
                  href={href}
                  className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-brand'
                      : 'text-charcoal/55 hover:bg-white/50 hover:text-charcoal'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-white/70 ring-1 ring-brand/10"
                      style={{ zIndex: -1 }}
                    />
                  )}
                  {label}
                </a>
              )
            })}
            <a
              href="#contact"
              className="ml-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-cream transition hover:bg-brand/90"
            >
              Book a tour
            </a>
          </nav>

          <button
            type="button"
            className="rounded-lg p-2.5 text-charcoal/70 transition hover:bg-white/60 lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-5 rounded bg-charcoal transition ${menuOpen ? 'translate-y-1.5 rotate-45' : ''}`} />
            <span className={`my-1 block h-0.5 w-5 rounded bg-charcoal transition ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 rounded bg-charcoal transition ${menuOpen ? '-translate-y-1.5 -rotate-45' : ''}`} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-charcoal/20 backdrop-blur-[2px] lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed right-0 top-0 z-50 flex h-full w-[min(100vw-3rem,20rem)] flex-col gap-1 border-l border-charcoal/5 bg-cream px-5 pb-8 pt-24 shadow-2xl lg:hidden"
            >
              {NAV_LINKS.map(({ href, label }) => {
                const id = href.slice(1)
                const isActive = active === id
                return (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-white text-brand ring-1 ring-brand/15'
                        : 'text-charcoal/70 hover:bg-white/70 hover:text-charcoal'
                    }`}
                  >
                    {label}
                  </a>
                )
              })}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-4 rounded-full bg-brand px-4 py-3 text-center text-sm font-semibold text-cream"
              >
                Book a tour
              </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
