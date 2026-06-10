import { useEffect, useState } from 'react'
import { SECTION_IDS } from '../data/content'

export function useActiveSection() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      let current = 'hero'
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 140) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return active
}
