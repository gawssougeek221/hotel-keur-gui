'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HotelHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation
      const title = titleRef.current
      if (title) {
        const chars = title.textContent?.split('') || []
        title.innerHTML = chars.map(char => 
          `<span class="inline-block opacity-0">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('')

        gsap.to(title.querySelectorAll('span'), {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'power4.out',
          delay: 0.3
        })
      }

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out'
      })

      // CTA button animation
      gsap.from(ctaRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        delay: 1.2,
        ease: 'elastic.out(1, 0.5)'
      })

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })

      // Floating elements
      gsap.to('.float-element', {
        y: -20,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.3,
          from: 'random'
        }
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        ref={imageRef}
        className="absolute inset-0 z-0"
      >
        <img 
          src="/images/hotel/hero-bg.png" 
          alt="The Pearl Resort" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/70 via-[#0a0e1a]/50 to-[#0a0e1a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e1a]/80 via-transparent to-[#0a0e1a]/80" />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <div className="float-element absolute top-20 left-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="float-element absolute bottom-20 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="float-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-6 opacity-0 animate-fade-in">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400" />
          <span className="text-amber-400 text-sm tracking-[0.3em] uppercase font-light">Élégance Redéfinie</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-400" />
        </div>

        {/* Main Title */}
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gradient-animate"
          style={{ transform: 'translateY(50px)' }}
        >
          The Pearl Resort
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-slate-300 mb-8 font-light tracking-wide"
        >
          L'Hôtellerie de Luxe à Son Apogée
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            ref={ctaRef}
            className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30"
          >
            <span className="relative z-10">Réserver Votre Séjour</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          <button className="group px-8 py-4 border border-amber-400/50 text-amber-400 font-semibold rounded-full hover:bg-amber-400/10 transition-all duration-300 flex items-center gap-2">
            <span>Découvrir</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
