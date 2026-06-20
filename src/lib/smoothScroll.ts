import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerLenis, unregisterLenis } from './scroll'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance: Lenis | null = null
let tick: ((time: number) => void) | null = null
let onRefresh: (() => void) | null = null

export function initSmoothScroll() {
  if (lenisInstance || typeof window === 'undefined') return lenisInstance
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null

  const lenis = new Lenis({
    duration: 0.85,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.1,
  })

  lenis.on('scroll', ScrollTrigger.update)

  tick = (time: number) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  onRefresh = () => lenis.resize()
  ScrollTrigger.addEventListener('refresh', onRefresh)

  registerLenis(lenis)
  lenisInstance = lenis
  ScrollTrigger.refresh()

  return lenis
}

export function destroySmoothScroll() {
  if (!lenisInstance) return

  if (onRefresh) {
    ScrollTrigger.removeEventListener('refresh', onRefresh)
    onRefresh = null
  }

  if (tick) {
    gsap.ticker.remove(tick)
    tick = null
  }

  lenisInstance.destroy()
  lenisInstance = null
  unregisterLenis()
}

export function getLenisInstance() {
  return lenisInstance
}
