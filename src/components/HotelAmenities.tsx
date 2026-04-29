'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const amenities = [
  {
    id: 1,
    name: 'Restaurant Premium',
    description: 'Cuisine internationale 5 étoiles avec des chefs renommés du monde entier',
    image: '/images/hotel/restaurant.png',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    )
  },
  {
    id: 2,
    name: 'Piscine Infinie',
    description: 'Piscine olympique chauffée avec vue panoramique sur l\'océan',
    image: '/images/hotel/pool.png',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    )
  },
  {
    id: 3,
    name: 'Spa & Wellness',
    description: 'Centre de bien-être complet avec soins signature et rituels relaxants',
    image: '/images/hotel/spa.png',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    id: 4,
    name: 'Fitness Center',
    description: 'Équipements fitness dernière génération avec coaches personnels',
    image: '/images/hotel/gym.png',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 5,
    name: 'Bar & Lounge',
    description: 'Ambiance feutrée avec musique live et cocktails signature',
    image: '/images/hotel/bar.png',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    )
  },
  {
    id: 6,
    name: 'Salles de Conférence',
    description: 'Équipements audiovisuels haut de gamme pour vos événements',
    image: '/images/hotel/conference.png',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  }
]

export default function HotelAmenities() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from('.amenities-title', {
        opacity: 0,
        y: 60,
        duration: 1,
        scrollTrigger: {
          trigger: '.amenities-title',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Cards stagger animation
      gsap.from('.amenity-card', {
        opacity: 0,
        y: 80,
        scale: 0.9,
        duration: 0.8,
        stagger: {
          each: 0.1,
          from: 'center'
        },
        scrollTrigger: {
          trigger: '.amenities-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Magnetic hover effect
      const cards = document.querySelectorAll('.amenity-card')
      cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          
          gsap.to(e.currentTarget, {
            x: x * 0.1,
            y: y * 0.1,
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
          })
        })

        card.addEventListener('mouseleave', (e) => {
          gsap.to(e.currentTarget, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
          })
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#0d2818]/30 to-[#0a0e1a]" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="amenities-title text-center mb-16">
          <span className="text-amber-400 text-sm tracking-[0.3em] uppercase mb-4 block">Services</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Nos </span>
            <span className="text-gradient-animate">Équipements</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Des installations de premier ordre pour une expérience inoubliable
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="amenities-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity) => (
            <div 
              key={amenity.id}
              className="amenity-card group relative rounded-2xl overflow-hidden glass border border-emerald-500/20 hover:border-amber-400/50 cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <img 
                  src={amenity.image} 
                  alt={amenity.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/80 to-transparent" />

              {/* Content */}
              <div className="relative p-8 h-full flex flex-col">
                {/* Icon */}
                <div className="mb-4 w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                  {amenity.icon}
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {amenity.name}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm flex-grow">
                  {amenity.description}
                </p>

                {/* Arrow indicator */}
                <div className="mt-4 flex items-center text-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                  <span className="text-sm font-semibold">Découvrir</span>
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
