'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const rooms = [
  {
    id: 1,
    name: 'Deluxe Room',
    description: 'Chambre spacieuse avec vue imprenable sur le jardin tropical. Design contemporain alliant confort et élégance.',
    price: '150,000',
    currency: 'CFA',
    period: 'nuit',
    image: '/images/hotel/deluxe-room.png',
    amenities: ['WiFi Gratuit', 'TV Écran Plat', 'Climatisation', 'Mini Bar'],
    size: '45 m²',
    bed: 'King Size'
  },
  {
    id: 2,
    name: 'Suite Executive',
    description: 'Suite premium avec salon privé et vue océan panoramique. L\'alliance parfaite du luxe et de l\'intimité.',
    price: '250,000',
    currency: 'CFA',
    period: 'nuit',
    image: '/images/hotel/executive-suite.png',
    amenities: ['Jacuzzi Privé', 'Balcon Terrasse', 'Concierge 24/7', 'Petit Déj Inclus'],
    size: '75 m²',
    bed: 'King Size + Canapé'
  },
  {
    id: 3,
    name: 'Presidential Suite',
    description: 'Luxe ultime avec tous les services haut de gamme. Une expérience d\'exception pour les voyageurs exigeants.',
    price: '500,000',
    currency: 'CFA',
    period: 'nuit',
    image: '/images/hotel/presidential-suite.png',
    amenities: ['Spa Privé', 'Piscine Personnelle', 'Chef Personnel', 'Service VIP'],
    size: '150 m²',
    bed: 'Super King Size'
  }
]

export default function HotelRooms() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Room cards animation
      const cards = gsap.utils.toArray('.room-card')
      cards.forEach((card, i) => {
        gsap.from(card as Element, {
          opacity: 0,
          y: 100,
          duration: 0.8,
          delay: i * 0.15,
          scrollTrigger: {
            trigger: card as Element,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        })
      })

      // Image parallax
      gsap.utils.toArray('.room-image-container').forEach((img) => {
        gsap.to((img as HTMLElement).querySelector('.room-image-inner'), {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: img as Element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-gradient-to-b from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-amber-400 text-sm tracking-[0.3em] uppercase mb-4 block">Hébergement</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Nos </span>
            <span className="text-gradient-animate">Chambres</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Découvrez nos espaces de vie d'exception, où chaque détail a été pensé pour votre confort absolu.
          </p>
        </div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div 
              key={room.id}
              className="room-card group relative rounded-2xl overflow-hidden glass border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-500"
            >
              {/* Image */}
              <div className="room-image-container relative h-64 overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.name}
                  className="room-image-inner w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-transparent" />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 glass px-4 py-2 rounded-full">
                  <span className="text-emerald-400 font-bold">{room.price} {room.currency}</span>
                  <span className="text-slate-400 text-sm">/{room.period}</span>
                </div>

                {/* Size Badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/80 text-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span>{room.size}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {room.name}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {room.description}
                </p>

                {/* Amenities */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {room.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-300 text-sm">
                      <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className="w-full py-3 rounded-full bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 text-emerald-400 font-semibold hover:bg-emerald-500/20 transition-all duration-300">
                  Réserver
                </button>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-transparent to-amber-500/20 blur-xl" />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 rounded-full border border-slate-600 text-slate-300 hover:border-emerald-500 hover:text-emerald-400 transition-all duration-300 flex items-center gap-2 mx-auto">
            <span>Voir Toutes Les Chambres</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
