'use client'

import { useEffect, useRef } from 'react'

export default function Stars() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return
    for (let i = 0; i < 60; i++) {
      const s = document.createElement('div')
      s.className = 'star'
      s.style.left = Math.random() * 100 + '%'
      s.style.top = Math.random() * 100 + '%'
      s.style.setProperty('--dur', (2 + Math.random() * 4) + 's')
      s.style.setProperty('--max-o', (0.3 + Math.random() * 0.7).toFixed(2))
      s.style.animationDelay = (Math.random() * 5) + 's'
      if (Math.random() > 0.85) {
        s.style.width = '3px'
        s.style.height = '3px'
      }
      container.appendChild(s)
    }
    return () => { container.innerHTML = '' }
  }, [])

  return (
    <div ref={ref} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', zIndex: 1, pointerEvents: 'none' }} />
  )
}
