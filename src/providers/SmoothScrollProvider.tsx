import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerLenis, unregisterLenis } from '../lib/scroll'

gsap.registerPlugin(ScrollTrigger)

type Props = { children: ReactNode }

export default function SmoothScrollProvider({ children }: Props) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
    })

    registerLenis(lenis)

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
    })

    const onLenisRefresh = () => lenis.resize()
    ScrollTrigger.addEventListener('refresh', onLenisRefresh)
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    ScrollTrigger.refresh()

    return () => {
      window.removeEventListener('load', onLoad)
      ScrollTrigger.removeEventListener('refresh', onLenisRefresh)
      gsap.ticker.remove(tick)
      unregisterLenis()
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
