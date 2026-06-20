import type Lenis from 'lenis'

let lenis: Lenis | null = null
const lenisReadyListeners = new Set<() => void>()

export function registerLenis(instance: Lenis) {
  lenis = instance
  lenisReadyListeners.forEach((listener) => listener())
  lenisReadyListeners.clear()
}

export function unregisterLenis() {
  lenis = null
}

export function isLenisReady() {
  return lenis !== null
}

/** Run after Lenis + ScrollTrigger scrollerProxy are configured. */
export function onLenisReady(listener: () => void) {
  if (lenis) {
    listener()
    return () => {}
  }
  lenisReadyListeners.add(listener)
  return () => lenisReadyListeners.delete(listener)
}

export function getScrollY() {
  return lenis?.scroll ?? window.scrollY
}

export function scrollToY(top: number, immediate = true) {
  if (lenis) {
    lenis.scrollTo(top, { immediate })
    return
  }
  window.scrollTo({ top, behavior: 'auto' })
}

export function scrollByY(delta: number, immediate = true) {
  if (lenis) {
    lenis.scrollTo(lenis.scroll + delta, { immediate })
    return
  }
  window.scrollBy({ top: delta, behavior: immediate ? 'auto' : 'smooth' })
}
