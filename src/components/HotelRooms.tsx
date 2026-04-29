'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const rooms = [
  {
    id: 1,
    name: 'Chambre Deluxe',
    description: 'Élégance et confort dans un cadre sénégalais authentique. Vue sur les jardins luxuriants.',
    price: '150,000',
    image: '/images/hotel/deluxe-room.png',
    size: '45 m²'
  },
  {
    id: 2,
    name: 'Suite Executive',
    description: 'Luxe contemporain avec terrasse privée et vue panoramique sur l\'océan Atlantique.',
    price: '250,000',
    image: '/images/hotel/executive-suite.png',
    size: '75 m²'
  },
  {
    id: 3,
    name: 'Suite Présidentielle',
    description: 'L\'excellence absolue. Piscine privée, chef personnel, et service dédié 24h/24.',
    price: '500,000',
    image: '/images/hotel/presidential-suite.png',
    size: '150 m²'
  }
]

export default function HotelRooms() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Title animation
    gsap.from('.rooms-title', {
      y: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.rooms-title',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    // Room items animation
    const roomItems = gsap.utils.toArray('.room-item')
    roomItems.forEach((item, i) => {
      const el = item as HTMLElement
      
      // Reveal animation
      gsap.from(el, {
        y: 120,
        opacity: 0,
        duration: 1,
        delay: i * 0.15,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })

      // Image clip-path reveal
      gsap.from(el.querySelector('.room-image-reveal'), {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Parallax on image
      gsap.to(el.querySelector('.room-image'), {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    })

  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="rooms" className="py-32 px-4 md:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#0d1f15] to-[#0a0e1a]" />
      
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="rooms-title text-center mb-20">
          <span className="text-amber-400/60 text-xs tracking-[0.5em] uppercase block mb-4">Hébergement</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide">
            Nos <span className="text-amber-400">Chambres</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-8" />
        </div>

        {/* Room Grid */}
        <div className="space-y-24 md:space-y-32">
          {rooms.map((room, index) => (
            <div 
              key={room.id}
              className={`room-item grid grid-cols-1 ${index % 2 === 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-2'} gap-8 lg:gap-16 items-center`}
            >
              {/* Image */}
              <div className={`relative ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="room-image-reveal relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.name}
                    className="room-image w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/80 via-transparent to-transparent" />
                </div>
                
                {/* Price tag */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="glass px-4 py-2">
                    <span className="text-amber-400 text-xl font-light">{room.price}</span>
                    <span className="text-white/50 text-xs ml-1">CFA/nuit</span>
                  </div>
                  <div className="text-white/40 text-xs tracking-wider">{room.size}</div>
                </div>

                {/* Number */}
                <div className="absolute -top-4 -right-4 lg:-top-8 lg:-right-8 text-8xl lg:text-9xl font-thin text-amber-400/10">
                  0{room.id}
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 0 ? 'lg:order-2 lg:pl-8' : 'lg:order-1 lg:pr-8'}`}>
                <span className="text-amber-400/60 text-xs tracking-[0.4em] uppercase block mb-4">
                  Chambre {room.id}
                </span>
                <h3 className="text-3xl lg:text-4xl font-light text-white mb-6 tracking-wide">
                  {room.name}
                </h3>
                <p className="text-white/50 leading-relaxed mb-8 text-lg">
                  {room.description}
                </p>
                
                <button 
                  data-magnetic
                  data-cursor-text="Détails"
                  className="group flex items-center gap-4 text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span className="text-sm tracking-[0.2em] uppercase">Découvrir</span>
                  <div className="w-12 h-px bg-amber-400 group-hover:w-20 transition-all duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
