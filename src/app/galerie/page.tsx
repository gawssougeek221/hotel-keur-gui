'use client'

import { useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from '@/components/CustomCursor'
import HotelNav from '@/components/HotelNav'
import HotelFooter from '@/components/HotelFooter'
import { X, ChevronLeft, ChevronRight, Grid3X3, LayoutList, Search } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const categories = [
  { id: 'all', name: 'Tout' },
  { id: 'rooms', name: 'Chambres' },
  { id: 'restaurant', name: 'Restaurant' },
  { id: 'spa', name: 'SPA & Piscine' },
  { id: 'exterior', name: 'Extérieur' },
  { id: 'events', name: 'Événements' },
]

const galleryItems = [
  { id: 1, src: '/images/room1.jpg', category: 'rooms', title: 'Chambre Standard', subtitle: 'Confort & élégance' },
  { id: 2, src: '/images/room2.jpg', category: 'rooms', title: 'Chambre Supérieure', subtitle: 'Design sénégalais' },
  { id: 3, src: '/images/room3.jpg', category: 'rooms', title: 'Suite Junior', subtitle: 'Luxe intemporel' },
  { id: 4, src: '/images/room4.jpg', category: 'rooms', title: 'Suite Présidentielle', subtitle: 'Excellence absolue' },
  { id: 5, src: '/images/restaurant.png', category: 'restaurant', title: 'Notre Restaurant', subtitle: 'Saveurs du Sénégal' },
  { id: 6, src: '/images/spa.png', category: 'spa', title: 'SPA Keur Gui', subtitle: 'Détente absolue' },
  { id: 7, src: '/images/pool.png', category: 'spa', title: 'Piscine', subtitle: 'Vue sur Dakar' },
  { id: 8, src: '/images/hotel-exterior.jpg', category: 'exterior', title: 'Façade', subtitle: 'Architecture moderne' },
  { id: 9, src: '/images/lobby.jpg', category: 'exterior', title: 'Lobby', subtitle: 'Accueil premium' },
  { id: 10, src: '/images/garden.jpg', category: 'exterior', title: 'Jardins', subtitle: 'Oasis urbain' },
  { id: 11, src: '/images/event1.jpg', category: 'events', title: 'Salle de conférence', subtitle: 'Équipée' },
  { id: 12, src: '/images/event2.jpg', category: 'events', title: 'Espace mariage', subtitle: 'Magique' },
  { id: 13, src: '/images/terrace.jpg', category: 'restaurant', title: 'Terrasse', subtitle: 'Ambiance nocturne' },
  { id: 14, src: '/images/bar.png', category: 'restaurant', title: 'Bar Lounge', subtitle: 'Cocktails locaux' },
  { id: 15, src: '/images/spa-treatment.jpg', category: 'spa', title: 'Soin massage', subtitle: 'Relaxation' },
  { id: 16, src: '/images/roof.jpg', category: 'exterior', title: 'Rooftop', subtitle: 'Vue panoramique' },
]

export default function GaleriePage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory)

  useGSAP(() => {
    // Hero animation
    const heroTl = gsap.timeline()
    
    heroTl.from('.hero-title .char', {
      y: 100,
      opacity: 0,
      rotateX: -90,
      stagger: 0.03,
      duration: 1,
      ease: 'power4.out',
      delay: 0.5
    })
    
    heroTl.from('.hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5')

    heroTl.from('.filter-controls', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.3')

    // Gallery items animation
    const animateGallery = () => {
      gsap.from('.gallery-item', {
        scale: 0.8,
        opacity: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power3.out'
      })
    }

    // Initial animation
    setTimeout(animateGallery, 800)

  }, { scope: pageRef })

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length)
  }

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
  }

  const titleChars = 'NOTRE GALERIE'.split('')

  return (
    <div ref={pageRef} className="min-h-screen bg-[#0a0e1a] text-white overflow-x-hidden">
      <CustomCursor />
      <HotelNav />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: 'url(/images/hotel-exterior.jpg)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#0a0e1a]/80 to-[#0a0e1a]" />
        </div>
        
        {/* Decorative */}
        <div className="absolute top-1/4 left-10 w-32 h-32 border border-amber-400/10 rotate-45" />
        <div className="absolute bottom-1/4 right-20 w-24 h-24 border border-amber-400/10 rounded-full" />
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4">
          <div className="hero-title overflow-hidden mb-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.15em]">
              {titleChars.map((char, i) => (
                <span 
                  key={i} 
                  className="char inline-block"
                  style={{ perspective: '1000px' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>
          </div>
          
          <p className="hero-subtitle text-amber-400 tracking-[0.4em] text-sm uppercase mb-8">
            Découvrez notre univers
          </p>
        </div>
      </section>

      {/* Filter Controls */}
      <section className="filter-controls py-8 px-4 border-b border-amber-400/10 sticky top-0 z-40 bg-[#0a0e1a]/95 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-amber-400 text-black'
                    : 'border border-white/20 text-white/60 hover:border-amber-400/50 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          
          {/* View Toggle */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-white/20 rounded-sm overflow-hidden">
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2 transition-colors ${viewMode === 'masonry' ? 'bg-amber-400 text-black' : 'text-white/60 hover:text-white'}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-amber-400 text-black' : 'text-white/60 hover:text-white'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {viewMode === 'masonry' ? (
            /* Masonry Layout */
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="gallery-item group relative break-inside-avoid cursor-pointer"
                  onClick={() => openLightbox(index)}
                  data-cursor-text="Voir"
                >
                  <div className={`relative overflow-hidden ${
                    index % 5 === 0 ? 'aspect-[3/4]' : 
                    index % 3 === 0 ? 'aspect-square' : 
                    'aspect-[4/3]'
                  }`}>
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${item.src})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Overlay Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-light tracking-wide">{item.title}</h3>
                      <p className="text-amber-400/60 text-xs tracking-wider uppercase">{item.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Grid Layout */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="gallery-item group relative aspect-square cursor-pointer"
                  onClick={() => openLightbox(index)}
                  data-cursor-text="Voir"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${item.src})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Overlay Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-light tracking-wide text-sm">{item.title}</h3>
                      <p className="text-amber-400/60 text-xs tracking-wider uppercase">{item.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 border-t border-amber-400/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-light text-amber-400 mb-2">24</div>
              <div className="text-white/40 text-xs tracking-wider uppercase">Chambres</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-light text-amber-400 mb-2">85</div>
              <div className="text-white/40 text-xs tracking-wider uppercase">Places Restaurant</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-light text-amber-400 mb-2">200+</div>
              <div className="text-white/40 text-xs tracking-wider uppercase">Places Événements</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-light text-amber-400 mb-2">∞</div>
              <div className="text-white/40 text-xs tracking-wider uppercase">Souvenirs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-[#0a0e1a]/98 backdrop-blur-lg flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 w-12 h-12 border border-white/20 flex items-center justify-center hover:border-amber-400 hover:text-amber-400 transition-colors z-10"
            onClick={closeLightbox}
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Navigation */}
          <button 
            className="absolute left-4 md:left-8 w-12 h-12 border border-white/20 flex items-center justify-center hover:border-amber-400 hover:text-amber-400 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            className="absolute right-4 md:right-8 w-12 h-12 border border-white/20 flex items-center justify-center hover:border-amber-400 hover:text-amber-400 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          {/* Image */}
          <div 
            className="relative max-w-5xl max-h-[80vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-full h-full bg-cover bg-center rounded-sm"
              style={{ 
                backgroundImage: `url(${filteredItems[lightboxIndex]?.src})`,
                aspectRatio: '16/10'
              }}
            />
            
            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a0e1a] to-transparent">
              <h3 className="text-2xl font-light tracking-wide text-white mb-1">
                {filteredItems[lightboxIndex]?.title}
              </h3>
              <p className="text-amber-400/60 text-sm tracking-wider uppercase">
                {filteredItems[lightboxIndex]?.subtitle}
              </p>
            </div>
          </div>
          
          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm tracking-wider">
            {lightboxIndex + 1} / {filteredItems.length}
          </div>
        </div>
      )}

      <HotelFooter />
    </div>
  )
}
