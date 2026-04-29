'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from '@/components/CustomCursor'
import HotelNav from '@/components/HotelNav'
import HotelFooter from '@/components/HotelFooter'
import { Home, Users, Wifi, Coffee, Wind, Tv, Bath, Shield } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const rooms = [
  {
    id: 1,
    name: 'Chambre Standard',
    subtitle: 'Confort & Simplicité',
    description: 'Une chambre élégante avec des touches de design sénégalais, offrant tout le confort nécessaire pour un séjour agréable. Parfaitement adaptée pour les voyageurs solitaires ou les couples.',
    price: '75 000',
    image: '/images/room1.jpg',
    size: '25m²',
    capacity: '2 personnes',
    features: ['Wi-Fi gratuit', 'Climatisation', 'TV écran plat', 'Salle de bain privative'],
    icon: Home
  },
  {
    id: 2,
    name: 'Chambre Supérieure',
    subtitle: 'Élégance Sénégalaise',
    description: 'Une spacieuse chambre décorée avec des tissus bogolan authentiques et des artisans locaux. Offre une vue sur le jardin et un balcon privé.',
    price: '120 000',
    image: '/images/room2.jpg',
    size: '35m²',
    capacity: '2 personnes',
    features: ['Balcon privé', 'Vue jardin', 'Mini-bar', 'Coffre-fort'],
    icon: Users
  },
  {
    id: 3,
    name: 'Suite Junior',
    subtitle: 'Luxe Intemporel',
    description: 'Une suite avec salon séparé, décorée avec des œuvres d\'art sénégalaises. Parfaite pour les séjours prolongés avec un espace de vie confortable.',
    price: '180 000',
    image: '/images/room3.jpg',
    size: '50m²',
    capacity: '3 personnes',
    features: ['Salon séparé', 'Terrasse', 'Baignoire', 'Room service 24h'],
    icon: Bath
  },
  {
    id: 4,
    name: 'Suite Présidentielle',
    subtitle: 'Excellence Absolue',
    description: 'Notre suite la plus prestigieuse avec vue panoramique sur Dakar, terrasse privée, jacuzzi et service de majordome. L\'expérience ultime du luxe sénégalais.',
    price: '350 000',
    image: '/images/room4.jpg',
    size: '85m²',
    capacity: '4 personnes',
    features: ['Vue panoramique', 'Jacuzzi privé', 'Majordome', 'Accès SPA'],
    icon: Shield
  }
]

const featureIcons = [Wifi, Coffee, Wind, Tv, Bath, Shield]

export default function ChambresPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

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

    heroTl.from('.hero-line', {
      scaleX: 0,
      duration: 1,
      ease: 'power2.inOut'
    }, '-=0.5')

    // Room cards stagger animation
    gsap.from('.room-card', {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.rooms-grid',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    // Feature items animation
    gsap.from('.feature-item', {
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.features-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    })

  }, { scope: pageRef })

  const titleChars = 'NOS CHAMBRES'.split('')

  return (
    <div ref={pageRef} className="min-h-screen bg-[#0a0e1a] text-white overflow-x-hidden">
      <CustomCursor />
      <HotelNav />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/hotel-exterior.jpg)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#0a0e1a]/70 to-[#0a0e1a]" />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 border border-amber-400/10 rotate-45" />
        <div className="absolute bottom-1/4 right-10 w-40 h-40 border border-emerald-400/10 rounded-full" />
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4">
          <div className="hero-title overflow-hidden mb-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.2em]">
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
          
          <p className="hero-subtitle text-amber-400 tracking-[0.5em] text-sm uppercase mb-8">
            Un havre de paix au cœur de Dakar
          </p>
          
          <div className="hero-line w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="rooms-grid grid grid-cols-1 lg:grid-cols-2 gap-8">
            {rooms.map((room, index) => (
              <div 
                key={room.id}
                className="room-card group relative"
              >
                <div className="relative overflow-hidden rounded-sm border border-amber-400/10 bg-[#0f1629]/50 backdrop-blur-sm">
                  {/* Image */}
                  <div className="relative h-80 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${room.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-transparent" />
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-amber-400 text-black px-4 py-2">
                      <span className="text-xs tracking-wider">À PARTIR</span>
                      <div className="text-xl font-light">{room.price} FCFA</div>
                    </div>
                    
                    {/* Room Icon */}
                    <div className="absolute bottom-4 left-4 w-12 h-12 border border-amber-400/50 flex items-center justify-center bg-[#0a0e1a]/80 backdrop-blur-sm">
                      <room.icon className="w-6 h-6 text-amber-400" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-amber-400/60 text-xs tracking-[0.3em] uppercase">
                        {room.subtitle}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-light tracking-wide mb-4 group-hover:text-amber-400 transition-colors">
                      {room.name}
                    </h3>
                    
                    <p className="text-white/60 text-sm leading-relaxed mb-6">
                      {room.description}
                    </p>
                    
                    {/* Room Info */}
                    <div className="flex items-center gap-6 text-xs text-white/40 mb-6">
                      <span>{room.size}</span>
                      <span className="w-1 h-1 bg-amber-400/50 rounded-full" />
                      <span>{room.capacity}</span>
                    </div>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {room.features.map((feature, i) => (
                        <span 
                          key={i}
                          className="text-xs px-3 py-1 border border-amber-400/20 text-white/60"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    {/* CTA */}
                    <button 
                      data-magnetic
                      data-cursor-text="Réserver"
                      className="w-full py-4 border border-amber-400/50 text-amber-400 text-xs tracking-[0.2em] uppercase hover:bg-amber-400 hover:text-black transition-all duration-300"
                    >
                      Réserver cette chambre
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-24 px-4 border-t border-amber-400/10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-16">
            Équipements <span className="text-amber-400">Inclus</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {featureIcons.map((Icon, i) => (
              <div 
                key={i}
                className="feature-item group flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 border border-amber-400/20 flex items-center justify-center group-hover:border-amber-400 group-hover:bg-amber-400/10 transition-all duration-300">
                  <Icon className="w-7 h-7 text-amber-400/60 group-hover:text-amber-400 transition-colors" />
                </div>
                <span className="text-xs text-white/40 tracking-wider uppercase">
                  {['Wi-Fi', 'Café', 'Climatisation', 'TV', 'Bain', 'Sécurité'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-emerald-400/5" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-6">
            Besoin d'aide pour choisir ?
          </h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto">
            Notre équipe est disponible 24h/24 pour vous conseiller et personnaliser votre séjour selon vos envies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              data-magnetic
              className="px-8 py-4 bg-amber-400 text-black text-xs tracking-[0.2em] uppercase hover:bg-amber-300 transition-colors"
            >
              Nous contacter
            </button>
            <button 
              data-magnetic
              className="px-8 py-4 border border-white/20 text-white text-xs tracking-[0.2em] uppercase hover:border-amber-400 hover:text-amber-400 transition-all"
            >
              Voir les tarifs
            </button>
          </div>
        </div>
      </section>

      <HotelFooter />
    </div>
  )
}
