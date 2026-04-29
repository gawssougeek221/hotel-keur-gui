'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const amenities = [
  {
    id: 1,
    name: 'Restaurant Gastronomique',
    description: 'Cuisine sénégalaise raffinée et internationale par notre chef étoilé',
    image: '/images/hotel/restaurant.png'
  },
  {
    id: 2,
    name: 'Spa & Bien-être',
    description: 'Rituels inspirés des traditions africaines dans un écrin de sérénité',
    image: '/images/hotel/spa.png'
  },
  {
    id: 3,
    name: 'Piscine Infinie',
    description: 'Vue panoramique sur l\'océan, coucher de soleil magique',
    image: '/images/hotel/pool.png'
  },
  {
    id: 4,
    name: 'Fitness Center',
    description: 'Équipements premium avec vue sur les jardins tropicaux',
    image: '/images/hotel/gym.png'
  },
  {
    id: 5,
    name: 'Bar Lounge',
    description: 'Cocktails signature et musique live au coucher du soleil',
    image: '/images/hotel/bar.png'
  }
]

export default function HotelAmenities() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const container = containerRef.current
    if (!container) return

    // Calculate total scroll width
    const totalWidth = container.scrollWidth - window.innerWidth

    // Horizontal scroll animation
    gsap.to(container, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    })

    // Title animation
    gsap.from('.amenities-title', {
      y: 60,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.amenities-title',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    // Individual cards animation
    const cards = gsap.utils.toArray('.amenity-card-horizontal')
    cards.forEach((card, i) => {
      gsap.from(card as Element, {
        y: 80,
        opacity: 0,
        rotation: 5,
        duration: 1,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: card as Element,
          containerAnimation: undefined,
          start: 'left 80%',
          toggleActions: 'play none none reverse'
        }
      })
    })

  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="amenities" className="relative bg-[#0a0e1a] overflow-hidden">
      {/* Section Header - Pinned */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-20 pb-8 bg-gradient-to-b from-[#0a0e1a] via-[#0a0e1a] to-transparent">
        <div className="amenities-title text-center px-4">
          <span className="text-amber-400/60 text-xs tracking-[0.5em] uppercase block mb-4">Services</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide">
            Nos <span className="text-amber-400">Équipements</span>
          </h2>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div 
        ref={containerRef}
        className="flex gap-6 md:gap-10 pl-[20vw] pr-[10vw] pt-40 pb-20"
        style={{ width: 'fit-content' }}
      >
        {amenities.map((amenity) => (
          <div 
            key={amenity.id}
            className="amenity-card-horizontal flex-shrink-0 w-[300px] md:w-[400px] lg:w-[500px] group"
          >
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden mb-6">
              <img 
                src={amenity.image} 
                alt={amenity.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-transparent" />
              
              {/* Number */}
              <div className="absolute top-6 left-6 w-12 h-12 rounded-full border border-amber-400/50 flex items-center justify-center">
                <span className="text-amber-400 font-light">0{amenity.id}</span>
              </div>
            </div>

            {/* Content */}
            <div className="px-2">
              <h3 className="text-xl md:text-2xl font-light text-white mb-3 group-hover:text-amber-400 transition-colors">
                {amenity.name}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {amenity.description}
              </p>
              
              {/* Arrow */}
              <div className="mt-6 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-amber-400 text-xs tracking-[0.2em] uppercase">Explorer</span>
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {amenities.map((_, i) => (
          <div key={i} className="w-8 h-px bg-white/20" />
        ))}
      </div>
    </section>
  )
}
