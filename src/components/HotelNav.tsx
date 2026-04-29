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
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      delay: 0.5, // Faster for inner pages
      ease: 'power3.out'
    })
  }, { scope: navRef })

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Chambres', href: '/chambres' },
    { name: 'Restaurant', href: '/restaurant' },
    { name: 'Galerie', href: '/galerie' },
    { name: 'Contact', href: '/#contact' }
  ]

  const isActive = (href: string) => {
    if (href === '/' || href === '/#contact') return pathname === '/'
    return pathname === href
  }

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#0a0e1a]/90 backdrop-blur-lg py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3" data-cursor-text="Accueil">
          <div className="w-10 h-10 border border-amber-400/50 flex items-center justify-center text-amber-400 font-light text-lg group-hover:bg-amber-400 group-hover:text-black transition-all duration-300">
            K
          </div>
          <div className="hidden sm:block">
            <span className="text-white font-light tracking-[0.2em]">KEUR GUI</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              className={`text-xs tracking-[0.2em] uppercase transition-colors relative group ${
                isActive(link.href) ? 'text-amber-400' : 'text-white/60 hover:text-white'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-2 left-0 h-px bg-amber-400 transition-all duration-300 ${
                isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <button 
            data-magnetic
            data-cursor-text="Réserver"
            className="px-6 py-3 border border-amber-400/50 text-amber-400 text-xs tracking-[0.2em] uppercase hover:bg-amber-400 hover:text-black transition-all duration-300"
          >
            Réserver
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`w-6 h-px bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-px bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-px bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 right-0 bg-[#0a0e1a]/95 backdrop-blur-lg border-t border-amber-400/10 transition-all duration-500 ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              className={`text-sm tracking-[0.2em] uppercase transition-colors ${
                isActive(link.href) ? 'text-amber-400' : 'text-white/60 hover:text-white'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button className="mt-4 w-full py-4 border border-amber-400/50 text-amber-400 text-xs tracking-[0.2em] uppercase">
            Réserver
          </button>
        </div>
      </div>
    </nav>
  )
}
