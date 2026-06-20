import { useEffect, type ReactNode } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { destroySmoothScroll, initSmoothScroll } from '../lib/smoothScroll'

type Props = { children: ReactNode }

export default function SmoothScrollProvider({ children }: Props) {
  useEffect(() => {
    initSmoothScroll()

    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      window.removeEventListener('load', onLoad)
      destroySmoothScroll()
    }
  }, [])

  return <>{children}</>
}
