'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => setIsLoaded(true), 500)
        }
      })

      // Counter animation
      tl.to(counterRef.current, {
        textContent: 100,
        duration: 2,
        ease: 'power2.inOut',
        snap: { textContent: 1 },
        onUpdate: function() {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(Number(this.targets()[0].textContent)) + '%'
          }
        }
      })

      // Text reveal
      tl.from(textRef.current?.querySelectorAll('.letter'), {
        y: 100,
        opacity: 0,
        rotateX: -90,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power4.out'
      }, '-=1.5')

      // Hide preloader
      tl.to(preloaderRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1,
        ease: 'power4.inOut',
        delay: 0.3
      })

      // Fade out
      tl.to(preloaderRef.current, {
        opacity: 0,
        duration: 0.3
      })

    }, preloaderRef)

    return () => ctx.revert()
  }, [])

  if (isLoaded) return null

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-[#0a0e1a] flex flex-col items-center justify-center"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 border border-amber-400/20 rotate-45 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 border border-emerald-400/20 rounded-full animate-pulse" />
      </div>

      {/* Counter */}
      <span 
        ref={counterRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl md:text-9xl font-thin text-amber-400/20 tabular-nums"
      >
        0%
      </span>

      {/* Main text */}
      <div ref={textRef} className="relative z-10 text-center">
        <div className="overflow-hidden">
          <h1 className="text-4xl md:text-6xl font-light tracking-[0.3em] text-white">
            {'HOTEL KEUR GUI'.split('').map((letter, i) => (
              <span key={i} className="letter inline-block" style={{ perspective: '1000px' }}>
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </h1>
        </div>
        <div className="overflow-hidden mt-4">
          <p className="text-amber-400 tracking-[0.5em] text-xs uppercase">
            {'Luxury Experience'.split('').map((letter, i) => (
              <span key={i} className="letter inline-block">
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Loading bar */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-px bg-white/10">
        <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 animate-loading-bar" 
          style={{ 
            animation: 'loadingBar 2s ease-in-out forwards',
            width: '0%'
          }} 
        />
      </div>

      <style jsx>{`
        @keyframes loadingBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}
