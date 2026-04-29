'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default function HotelNav() {
  const navRef = useRef<HTMLElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useGSAP(() => {
    const isHomePage = pathname === '/'
    const delay = isHomePage ? 3.5 : 0.2

    const tl = gsap.timeline({ delay })

    // Animate each nav item
    tl.fromTo('.nav-logo', 
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo('.nav-link-item', 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo('.nav-cta', 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.2'
    )

  }, { scope: navRef, dependencies: [pathname] })

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Chambres', href: '/chambres' },
    { name: 'Restaurant', href: '/restaurant' },
    { name: 'Galerie', href: '/galerie' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href
  }

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled 
            ? 'py-4' 
            : 'py-6'
        }`}
      >
        {/* Background overlay */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#0a0e1a]/95 backdrop-blur-xl' 
            : 'bg-gradient-to-b from-[#0a0e1a]/80 to-transparent'
        }`} />

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/" className="nav-logo group flex items-center gap-4 relative">
            {/* Animated border */}
            <div className="absolute -inset-2 border border-amber-400/0 group-hover:border-amber-400/30 transition-all duration-500 rounded-sm" />
            
            <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden">
              {/* Background animation */}
              <div className="absolute inset-0 bg-amber-400 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              
              {/* Letter */}
              <span className="relative z-10 text-amber-400 font-serif text-2xl group-hover:text-[#0a0e1a] transition-colors duration-500">
                K
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-white font-light tracking-[0.3em] text-sm group-hover:text-amber-400 transition-colors duration-300">
                KEUR GUI
              </span>
              <span className="text-amber-400/50 text-[10px] tracking-[0.4em] uppercase">
                Hôtel & Spa
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <Link 
                key={link.name}
                href={link.href}
                className={`nav-link-item group relative px-5 py-3 transition-all duration-300 ${
                  isActive(link.href) ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                {/* Link text */}
                <span className={`relative text-sm tracking-[0.2em] uppercase font-light transition-colors duration-300 ${
                  isActive(link.href) 
                    ? 'text-amber-400' 
                    : 'text-white group-hover:text-amber-400'
                }`}>
                  {link.name}
                </span>

                {/* Underline animation */}
                <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent transition-all duration-500 ${
                  isActive(link.href) 
                    ? 'w-full' 
                    : 'w-0 group-hover:w-4/5'
                }`} />

                {/* Dot indicator for active */}
                <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full transition-all duration-300 ${
                  isActive(link.href) ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`} />
              </Link>
            ))}

            {/* Vertical separator */}
            <div className="mx-4 w-px h-8 bg-gradient-to-b from-transparent via-amber-400/30 to-transparent" />

            {/* Contact link */}
            <Link 
              href="/#contact"
              className="nav-link-item text-sm text-white/50 hover:text-amber-400 transition-colors duration-300 tracking-wider"
            >
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="nav-cta hidden lg:block">
            <Link href="/#contact">
              <button 
                data-magnetic
                data-cursor-text="Réserver"
                className="group relative px-8 py-4 overflow-hidden"
              >
                {/* Border */}
                <div className="absolute inset-0 border border-amber-400/50 group-hover:border-amber-400 transition-colors duration-300" />
                
                {/* Background fill */}
                <div className="absolute inset-0 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                {/* Text */}
                <span className="relative z-10 text-amber-400 text-xs tracking-[0.2em] uppercase font-medium group-hover:text-[#0a0e1a] transition-colors duration-300">
                  Réserver
                </span>

                {/* Arrow icon */}
                <svg 
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400 group-hover:text-[#0a0e1a] transition-colors duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden relative w-14 h-14 flex items-center justify-center group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {/* Circle background */}
            <div className="absolute inset-0 border border-amber-400/30 rounded-full group-hover:border-amber-400 group-hover:bg-amber-400/10 transition-all duration-300" />
            
            {/* Hamburger lines */}
            <div className="relative w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-white group-hover:bg-amber-400 transition-all duration-500 origin-left ${
                isMobileMenuOpen ? 'rotate-45 translate-y-0.5' : ''
              }`} />
              <span className={`w-4 h-0.5 bg-white group-hover:bg-amber-400 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0 translate-x-2' : ''
              }`} />
              <span className={`w-full h-0.5 bg-white group-hover:bg-amber-400 transition-all duration-500 origin-left ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-0.5' : ''
              }`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-700 ${
        isMobileMenuOpen 
          ? 'opacity-100 visible' 
          : 'opacity-0 invisible pointer-events-none'
      }`}>
        {/* Background */}
        <div className="absolute inset-0 bg-[#0a0e1a]/98 backdrop-blur-2xl" />
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 border border-amber-400/10 rotate-45 animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 border border-amber-400/5 rounded-full" />
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-center px-8 py-24">
          {/* Navigation links */}
          <div className="space-y-2">
            {navLinks.map((link, index) => (
              <div
                key={link.name}
                className={`overflow-hidden transition-all duration-500 ${
                  isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <Link 
                  href={link.href}
                  className={`group flex items-center py-4 ${
                    isActive(link.href) ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {/* Text */}
                  <span className={`text-3xl font-light tracking-[0.15em] uppercase transition-colors duration-300 ${
                    isActive(link.href) 
                      ? 'text-amber-400' 
                      : 'text-white group-hover:text-amber-400'
                  }`}>
                    {link.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>

          {/* Bottom section */}
          <div className={`mt-16 pt-8 border-t border-amber-400/20 transition-all duration-500 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '600ms' }}>
            <div className="flex flex-col gap-4">
              <Link 
                href="/#contact"
                className="text-white/60 hover:text-amber-400 text-sm tracking-wider transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contactez-nous
              </Link>
              <button 
                className="w-full py-4 bg-amber-400 text-black text-sm tracking-[0.2em] uppercase font-medium mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Réserver maintenant
              </button>
            </div>
          </div>

          {/* Close button */}
          <button 
            className="absolute top-6 right-6 w-12 h-12 border border-amber-400/30 rounded-full flex items-center justify-center hover:border-amber-400 hover:bg-amber-400/10 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
