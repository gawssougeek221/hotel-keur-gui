'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const marqueeInner = marqueeRef.current
    if (!marqueeInner) return

    // Clone content for seamless loop
    const content = marqueeInner.innerHTML
    marqueeInner.innerHTML = content + content

    // Animate
    gsap.to(marqueeInner, {
      x: '-50%',
      duration: 30,
      ease: 'none',
      repeat: -1
    })
  }, [])

  const items = [
    'SPA & BIEN-ÊTRE',
    '•',
    'CUISINE GASTRONOMIQUE',
    '•',
    'PISCINE INFINIE',
    '•',
    'SERVICE 24H/24',
    '•',
    'VUE OCÉAN',
    '•',
    'DÉTENTE ABSOLUE',
    '•'
  ]

  return (
    <div className="relative py-12 bg-[#0a0e1a] overflow-hidden border-y border-amber-400/10">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0e1a] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0e1a] to-transparent z-10" />

      {/* Marquee content */}
      <div 
        ref={marqueeRef}
        className="flex whitespace-nowrap"
      >
        {items.map((item, i) => (
          <span 
            key={i}
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-amber-400/20 via-amber-400 to-amber-400/20 mx-8"
            style={{
              WebkitTextStroke: item === '•' ? '0' : '1px rgba(212, 175, 55, 0.3)'
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
