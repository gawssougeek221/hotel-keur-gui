'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const galleryImages = [
  { id: 1, src: '/images/hotel/gallery-1.png', alt: 'Vue aérienne', size: 'large' },
  { id: 2, src: '/images/hotel/gallery-2.png', alt: 'Plage privée', size: 'small' },
  { id: 3, src: '/images/hotel/gallery-3.png', alt: 'Hall d\'entrée', size: 'small' },
  { id: 4, src: '/images/hotel/gallery-4.png', alt: 'Restaurant', size: 'medium' },
  { id: 5, src: '/images/hotel/pool.png', alt: 'Piscine', size: 'medium' },
  { id: 6, src: '/images/hotel/spa.png', alt: 'Spa', size: 'large' }
]

export default function HotelGallery() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Title animation
    gsap.from('.gallery-title', {
      y: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.gallery-title',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    // Gallery items with reveal
    const items = gsap.utils.toArray('.gallery-item')
    items.forEach((item, i) => {
      const el = item as HTMLElement
      
      // Clip-path reveal
      gsap.from(el.querySelector('.gallery-image-wrapper'), {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })

      // Fade in
      gsap.from(el, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: i * 0.05,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })
    })

  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="gallery" className="py-32 px-4 md:px-8 bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="gallery-title text-center mb-16">
          <span className="text-amber-400/60 text-xs tracking-[0.5em] uppercase block mb-4">Portfolio</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide">
            Notre <span className="text-amber-400">Galerie</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-8" />
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={image.id}
              className={`gallery-item group cursor-pointer ${
                image.size === 'large' ? 'col-span-2 row-span-2' :
                image.size === 'medium' ? 'col-span-1 row-span-2' : ''
              }`}
              data-cursor-text="Voir"
            >
              <div className="gallery-image-wrapper relative overflow-hidden">
                <div className={`relative ${
                  image.size === 'large' ? 'aspect-square' :
                  image.size === 'medium' ? 'aspect-[3/4]' : 'aspect-[4/3]'
                }`}>
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-[#0a0e1a]/0 group-hover:bg-[#0a0e1a]/30 transition-colors duration-300" />
                </div>

                {/* Overlay info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-[#0a0e1a] to-transparent">
                  <span className="text-amber-400 text-xs tracking-[0.3em] uppercase">{image.alt}</span>
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-amber-400/0 group-hover:border-amber-400/50 transition-colors duration-300" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-amber-400/0 group-hover:border-amber-400/50 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
