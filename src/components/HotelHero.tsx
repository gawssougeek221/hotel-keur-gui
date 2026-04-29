'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Magnetic, RevealText, FadeIn, Float } from '@/components/MicroAnimations'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function HotelHero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    // Title character animation
    const title = document.querySelector('.hero-title')
    if (title) {
      const text = title.textContent || ''
      title.innerHTML = text.split('').map(char => 
        `<span class="char inline-block overflow-hidden">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('')

      tl.from('.hero-title .char', {
        y: 120,
        rotateX: -90,
        opacity: 0,
        stagger: 0.03,
        duration: 1.2
      }, 0.5)
    }

    // Subtitle reveal
    tl.from('.hero-subtitle', {
      y: 60,
      opacity: 0,
      duration: 1
    }, 0.8)

    // Decorative line
    tl.from('.hero-line', {
      scaleX: 0,
      duration: 1.5,
      ease: 'power2.inOut'
    }, 1)

    // CTA buttons
    tl.from('.hero-cta', {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8
    }, 1.2)

    // Scroll indicator
    tl.from('.scroll-indicator', {
      opacity: 0,
      y: -20,
      duration: 0.8
    }, 1.5)

    // Parallax on scroll
    gsap.to('.hero-bg', {
      yPercent: 30,
      scale: 1.1,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    })

    gsap.to('.hero-content', {
      y: 100,
      opacity: 0,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '50% top',
        scrub: 1
      }
    })

    // Floating animation for decorative elements
    gsap.to('.float-element', {
      y: -30,
      duration: 3,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      stagger: {
        each: 0.5,
        from: 'random'
      }
    })

    // Glow pulse on decorative elements
    gsap.to('.glow-element', {
      opacity: 0.3,
      scale: 1.2,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.3
    })

  }, { scope: heroRef })

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="hero-bg absolute inset-0 z-0">
        <img 
          src="/images/hotel/hero-bg.png" 
          alt="Hotel Keur Gui" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/80 via-[#0a0e1a]/40 to-[#0a0e1a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e1a]/70 via-transparent to-[#0a0e1a]/70" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="float-element glow-element absolute top-32 left-[15%] w-2 h-2 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50" />
        <div className="float-element glow-element absolute top-48 right-[20%] w-3 h-3 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50" />
        <div className="float-element absolute bottom-40 left-[25%] w-2 h-2 bg-white/40 rounded-full" />
        <div className="float-element absolute top-1/3 right-[10%] w-24 h-24 border border-amber-400/20 rotate-45" />
        <div className="float-element absolute bottom-1/4 left-[10%] w-32 h-32 border border-amber-400/10 rounded-full" />
        
        {/* Animated lines */}
        <div className="absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-amber-400/0 via-amber-400/30 to-amber-400/0 animate-pulse" />
        <div className="absolute bottom-1/3 right-0 w-48 h-px bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 animate-pulse" />
      </div>

      {/* Content */}
      <div className="hero-content relative z-20 text-center px-4 max-w-6xl mx-auto">
        {/* Decorative top line */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="hero-line w-20 h-px bg-gradient-to-r from-transparent to-amber-400" />
          <span className="text-amber-400 text-[10px] tracking-[0.5em] uppercase">Bienvenue</span>
          <div className="hero-line w-20 h-px bg-gradient-to-l from-transparent to-amber-400" />
        </div>

        {/* Main Title */}
        <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-[0.15em] text-white mb-6" style={{ perspective: '1000px' }}>
          HOTEL KEUR GUI
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle text-lg md:text-xl lg:text-2xl text-white/70 font-light tracking-[0.3em] uppercase mb-12">
          L&apos;Art de l&apos;Hospitalité Sénégalaise
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Magnetic strength={0.3}>
            <button 
              className="hero-cta group relative px-10 py-4 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 transition-transform duration-300 group-hover:scale-100 scale-x-0 origin-left" />
              <span className="relative z-10 text-black font-semibold tracking-wider text-sm uppercase">
                Réserver
              </span>
            </button>
          </Magnetic>
          
          <Magnetic strength={0.2}>
            <button 
              className="hero-cta group flex items-center gap-3 px-8 py-4 border border-white/30 hover:border-amber-400/50 transition-colors"
            >
              <span className="text-white/80 group-hover:text-white text-sm tracking-wider uppercase transition-colors">
                Explorer
              </span>
              <svg className="w-4 h-4 text-amber-400 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-amber-400 rounded-full animate-bounce" />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 w-16 h-16 border-l border-t border-amber-400/20 z-30" />
      <div className="absolute top-6 right-6 w-16 h-16 border-r border-t border-amber-400/20 z-30" />
      <div className="absolute bottom-6 left-6 w-16 h-16 border-l border-b border-amber-400/20 z-30" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-r border-b border-amber-400/20 z-30" />
    </section>
  )
}
