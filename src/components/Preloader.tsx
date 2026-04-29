'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => setIsLoaded(true), 300)
      }
    })

    // Counter animation
    tl.to('.counter', {
      textContent: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      snap: { textContent: 1 },
      onUpdate: function() {
        const counter = document.querySelector('.counter')
        if (counter) {
          counter.textContent = Math.round(Number(this.targets()[0].textContent)) + '%'
        }
      }
    }, 0)

    // Text reveal animation
    tl.from('.preloader-text .char', {
      y: 120,
      opacity: 0,
      rotateX: -90,
      stagger: 0.04,
      duration: 1,
      ease: 'power4.out'
    }, 0)

    // Line animation
    tl.to('.preloader-line-inner', {
      scaleX: 1,
      duration: 2.5,
      ease: 'power2.inOut'
    }, 0)

    // Hide preloader
    tl.to('.preloader-content', {
      y: -50,
      opacity: 0,
      duration: 0.5
    }, '+=0.3')

    tl.to(preloaderRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      duration: 0.8,
      ease: 'power4.inOut'
    })

  }, { scope: preloaderRef })

  if (isLoaded) return null

  const hotelName = 'HOTEL KEUR GUI'
  const chars = hotelName.split('')

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-[#0a0e1a] flex flex-col items-center justify-center overflow-hidden"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-20 w-24 h-24 border border-amber-400/20 rotate-45 animate-pulse" />
      <div className="absolute bottom-32 right-20 w-32 h-32 border border-emerald-400/20 rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-amber-400/5 rotate-12" />

      {/* Counter */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-thin text-amber-400/10 pointer-events-none select-none tabular-nums">
        <span className="counter">0%</span>
      </div>

      {/* Main content */}
      <div className="preloader-content relative z-10 text-center">
        {/* Title */}
        <div className="preloader-text overflow-hidden mb-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.4em] text-white">
            {chars.map((char, i) => (
              <span 
                key={i} 
                className="char inline-block"
                style={{ 
                  display: 'inline-block',
                  perspective: '1000px'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        </div>

        {/* Subtitle */}
        <div className="overflow-hidden">
          <p className="text-amber-400 tracking-[0.8em] text-xs uppercase animate-pulse">
            Luxury Experience
          </p>
        </div>

        {/* Loading line */}
        <div className="preloader-line mt-12 w-48 h-[1px] bg-white/10 mx-auto overflow-hidden">
          <div 
            className="preloader-line-inner w-full h-full bg-gradient-to-r from-amber-400 to-emerald-400 origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-amber-400/30" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-amber-400/30" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-amber-400/30" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-amber-400/30" />
    </div>
  )
}
