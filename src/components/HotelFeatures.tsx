'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const features = [
  {
    number: '01',
    title: 'Excellence Culinaire',
    description: 'Nos chefs étoilés créent des expériences gastronomiques inoubliables avec des produits locaux et internationaux de premier choix.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    number: '02',
    title: 'Bien-être Absolu',
    description: 'Notre spa signature offre des rituels de bien-être personnalisés inspirés des traditions africaines et asiatiques ancestrales.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    number: '03',
    title: 'Service Personnalisé',
    description: 'Chaque invité bénéficie d\'un concierge dédié disponible 24h/24 pour répondre à toutes vos envies et besoins.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    number: '04',
    title: 'Lieu d\'Exception',
    description: 'Architecture contemporaine harmonieusement intégrée à la nature, offrant des vues spectaculaires sur l\'océan Atlantique.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  }
]

const stats = [
  { value: '250+', label: 'Chambres & Suites' },
  { value: '5', label: 'Étoiles' },
  { value: '98%', label: 'Satisfaction Client' },
  { value: '15+', label: 'Prix d\'Excellence' }
]

export default function HotelFeatures() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Features animation
      gsap.from('.feature-item', {
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.features-list',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Stats counter animation
      const stats = document.querySelectorAll('.stat-value')
      stats.forEach((stat) => {
        const target = stat.getAttribute('data-value') || '0'
        gsap.from(stat, {
          textContent: 0,
          duration: 2,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          modifiers: {
            textContent: (value: number) => Math.round(value) + (target.includes('+') ? '+' : target.includes('%') ? '%' : '')
          }
        })
      })

      // Horizontal line animation
      gsap.from('.horizontal-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.horizontal-line',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#0d2818]/20 to-[#0a0e1a]" />
      
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div 
                className="stat-value text-4xl md:text-5xl font-bold text-gradient-animate mb-2"
                data-value={stat.value}
              >
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Horizontal divider */}
        <div className="horizontal-line h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent mb-20" />

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-amber-400 text-sm tracking-[0.3em] uppercase mb-4 block">Pourquoi Nous Choisir</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">L&apos;Art de </span>
            <span className="text-gradient-animate">l&apos;Excellence</span>
          </h2>
        </div>

        {/* Features List */}
        <div className="features-list grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.number}
              className="feature-item group relative p-8 rounded-2xl glass border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-500"
            >
              {/* Number */}
              <div className="absolute top-6 right-6 text-6xl font-bold text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors">
                {feature.number}
              </div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-emerald-500/20 via-transparent to-amber-500/20 blur-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
