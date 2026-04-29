'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function HotelFooter() {
  const footerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.footer-content', {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    })
  }, { scope: footerRef })

  return (
    <footer ref={footerRef} className="relative pt-24 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] to-[#0d1f15]" />

      <div className="footer-content max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 border border-amber-400/50 flex items-center justify-center text-amber-400 font-light text-xl">
                K
              </div>
              <div>
                <span className="text-white font-light text-xl tracking-[0.2em]">KEUR GUI</span>
              </div>
            </div>
            <p className="text-white/40 leading-relaxed max-w-sm mb-8">
              L&apos;excellence de l&apos;hospitalité sénégalaise. 
              Une expérience unique au cœur de Dakar.
            </p>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'twitter'].map((social) => (
                <a 
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-amber-400 hover:border-amber-400/50 transition-all duration-300"
                >
                  <span className="text-xs uppercase">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-light mb-6 tracking-[0.2em] uppercase text-sm">Navigation</h4>
            <ul className="space-y-3">
              {['Chambres', 'Équipements', 'Galerie', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/40 hover:text-amber-400 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-light mb-6 tracking-[0.2em] uppercase text-sm">Contact</h4>
            <ul className="space-y-3 text-white/40 text-sm">
              <li>Corniche Ouest, Dakar</li>
              <li>+221 33 849 0000</li>
              <li>contact@hotelkeurgui.com</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-xs">
          <p>© 2024 Hotel Keur Gui. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/60 transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white/60 transition-colors">Conditions</a>
          </div>
        </div>

        {/* Creator Credit */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-white/40 text-xs">
            Créé par{' '}
            <span className="text-amber-400 font-medium">Keur&apos;Geek Digital</span>
            {' '}— Startup spécialisée en{' '}
            <span className="text-white/60">IA</span> et{' '}
            <span className="text-white/60">solutions digitales</span> pour les PME du Sénégal
          </p>
        </div>
      </div>
    </footer>
  )
}
