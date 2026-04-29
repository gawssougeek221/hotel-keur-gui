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
    // Check if we're on home page (has preloader)
    const isHomePage = pathname === '/'
    const delay = isHomePage ? 3.5 : 0.3

    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay, ease: 'power3.out' }
    )
  }, { scope: navRef, dependencies: [pathname] })

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
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
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#0a0e1a]/95 backdrop-blur-lg py-4 shadow-lg shadow-black/20' 
          : 'bg-[#0a0e1a]/80 backdrop-blur-md py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3" data-cursor-text="Accueil">
          <div className="w-11 h-11 border-2 border-amber-400 flex items-center justify-center text-amber-400 font-light text-lg group-hover:bg-amber-400 group-hover:text-black transition-all duration-300">
            K
          </div>
          <div className="hidden sm:block">
            <span className="text-white font-light tracking-[0.2em] text-lg">KEUR GUI</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              className={`text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 relative group px-2 py-1 ${
                isActive(link.href) 
                  ? 'text-amber-400' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-400 transition-all duration-300 ${
                isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
          
          {/* Divider */}
          <div className="w-px h-6 bg-white/20" />
          
          {/* Contact Link */}
          <Link 
            href="/#contact"
            className="text-sm text-white/60 hover:text-amber-400 transition-colors tracking-wider"
          >
            Contact
          </Link>
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <button 
            data-magnetic
            data-cursor-text="Réserver"
            className="px-6 py-3 bg-amber-400 text-black text-xs tracking-[0.15em] uppercase font-medium hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-300"
          >
            Réserver
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 right-0 bg-[#0a0e1a]/98 backdrop-blur-xl border-t border-amber-400/20 transition-all duration-500 ${
        isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              className={`text-base tracking-[0.2em] uppercase font-medium py-3 border-b border-white/10 transition-colors ${
                isActive(link.href) ? 'text-amber-400' : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/#contact"
            className="text-base text-white/60 hover:text-amber-400 tracking-[0.2em] uppercase py-3"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <button className="mt-4 w-full py-4 bg-amber-400 text-black text-sm tracking-[0.2em] uppercase font-medium">
            Réserver
          </button>
        </div>
      </div>
    </nav>
  )
}
