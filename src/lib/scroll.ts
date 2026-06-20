import type Lenis from 'lenis'

let lenis: Lenis | null = null

export function registerLenis(instance: Lenis) {
  lenis = instance
}

export function unregisterLenis() {
  lenis = null
}

export function scrollToY(top: number, immediate = true) {
  if (lenis) {
    lenis.scrollTo(top, { immediate })
    return
  }
  window.scrollTo({ top, behavior: 'auto' })
}
