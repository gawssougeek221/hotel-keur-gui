'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const galleryImages = [
  {
    id: 1,
    src: '/images/hotel/gallery-1.png',
    alt: 'Vue aérienne du resort',
    category: 'Vue'
  },
  {
    id: 2,
    src: '/images/hotel/gallery-2.png',
    alt: 'Plage privée',
    category: 'Plage'
  },
  {
    id: 3,
    src: '/images/hotel/gallery-3.png',
    alt: 'Hall d\'entrée',
    category: 'Intérieur'
  },
  {
    id: 4,
    src: '/images/hotel/gallery-4.png',
    alt: 'Dîner romantique',
    category: 'Restaurant'
  },
  {
    id: 5,
    src: '/images/hotel/pool.png',
    alt: 'Piscine infinie',
    category: 'Piscine'
  },
  {
    id: 6,
    src: '/images/hotel/spa.png',
    alt: 'Spa & Wellness',
    category: 'Spa'
  }
]

export default function HotelGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from('.gallery-title', {
        opacity: 0,
        y: 60,
        duration: 1,
        scrollTrigger: {
          trigger: '.gallery-title',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Gallery items animation with stagger
      gsap.from('.gallery-item', {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        stagger: {
          each: 0.1,
          grid: [2, 3],
          from: 'random'
        },
        scrollTrigger: {
          trigger: '.gallery-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Handle lightbox body scroll lock
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [lightboxOpen])

  const openLightbox = (src: string) => {
    setSelectedImage(src)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setSelectedImage(null)
  }

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-gradient-to-b from-[#0a0e1a] to-[#0f1629]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="gallery-title text-center mb-16">
          <span className="text-amber-400 text-sm tracking-[0.3em] uppercase mb-4 block">Portfolio</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Notre </span>
            <span className="text-gradient-animate">Galerie</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Explorez les moments d&apos;exception capturés dans notre paradis tropical
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={image.id}
              className={`gallery-item group relative overflow-hidden rounded-2xl cursor-pointer ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => openLightbox(image.src)}
            >
              <div className={`relative ${index === 0 ? 'h-96 md:h-full' : 'h-64'}`}>
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-emerald-400 text-sm font-medium">{image.category}</span>
                  <h3 className="text-white text-xl font-bold">{image.alt}</h3>
                </div>

                {/* Zoom icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>

                {/* Border effect */}
                <div className="absolute inset-0 border-2 border-emerald-400/0 group-hover:border-emerald-400/50 rounded-2xl transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={closeLightbox}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <img 
            src={selectedImage} 
            alt="Gallery image"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
