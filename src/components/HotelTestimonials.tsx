'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const testimonials = [
  {
    id: 1,
    name: 'Marie Laurent',
    role: 'Voyageuse d\'affaires',
    location: 'Paris, France',
    avatar: 'ML',
    rating: 5,
    text: 'Une expérience absolument mémorable. Le service client est impeccable, les chambres sont spacieuses et élégantes. Le spa m\'a permis de me détendre après mes réunions. Je recommande vivement!',
    highlight: 'Service impeccable'
  },
  {
    id: 2,
    name: 'Jean-Pierre Mensah',
    role: 'Entrepreneur',
    location: 'Abidjan, Côte d\'Ivoire',
    avatar: 'JM',
    rating: 5,
    text: 'The Pearl Resort a dépassé toutes mes attentes. La suite présidentielle offre une vue à couper le souffle. Le chef personnel a préparé des mets exquis. C\'est mon nouveau refuge de prédilection.',
    highlight: 'Vue à couper le souffle'
  },
  {
    id: 3,
    name: 'Aminata Diallo',
    role: 'Bloggeuse voyage',
    location: 'Dakar, Sénégal',
    avatar: 'AD',
    rating: 5,
    text: 'J\'ai séjourné dans de nombreux hôtels de luxe, mais The Pearl Resort est unique. L\'attention aux détails, la qualité de la nourriture et l\'ambiance sereine en font un vrai paradis.',
    highlight: 'Un vrai paradis'
  },
  {
    id: 4,
    name: 'Olivier Dupont',
    role: 'Directeur financier',
    location: 'Lyon, France',
    avatar: 'OD',
    rating: 5,
    text: 'Organisation parfaite de notre séminaire d\'entreprise. Les salles de conférence sont ultra-modernes, le personnel est professionnel et attentionné. Un choix excellent pour les événements corporate.',
    highlight: 'Excellent pour événements'
  },
  {
    id: 5,
    name: 'Fatou Ndiaye',
    role: 'Artiste',
    location: 'Bamako, Mali',
    avatar: 'FN',
    rating: 5,
    text: 'L\'inspiration est partout dans ce lieu magique. Entre l\'architecture élégante et les jardins luxuriants, j\'ai trouvé la paix créative que je cherchais. Le spa est un havre de sérénité.',
    highlight: 'Paix créative'
  }
]

export default function HotelTestimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from('.testimonials-title', {
        opacity: 0,
        y: 60,
        duration: 1,
        scrollTrigger: {
          trigger: '.testimonials-title',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Cards animation
      gsap.from('.testimonial-card', {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.testimonials-carousel',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    // Auto-play carousel
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1629] via-[#0a0e1a] to-[#0f1629]" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="testimonials-title text-center mb-16">
          <span className="text-amber-400 text-sm tracking-[0.3em] uppercase mb-4 block">Témoignages</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Avis de Nos </span>
            <span className="text-gradient-animate">Clients</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Découvrez ce que nos clients disent de leur expérience au Pearl Resort
          </p>
        </div>

        {/* Main Featured Testimonial */}
        <div className="testimonials-carousel mb-12">
          <div className="max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                ref={index === 0 ? carouselRef : null}
                className={`testimonial-card transition-all duration-700 ${
                  index === activeIndex 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 absolute inset-0 translate-x-20'
                }`}
              >
                <div className="glass rounded-3xl p-8 md:p-12 relative">
                  {/* Quote icon */}
                  <div className="absolute top-6 right-8 text-emerald-500/20">
                    <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Highlight badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 text-sm font-medium">{testimonial.highlight}</span>
                  </div>

                  {/* Text */}
                  <p className="text-xl md:text-2xl text-slate-200 leading-relaxed mb-8 italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-slate-400 text-sm">{testimonial.role} • {testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'w-10 bg-emerald-500' 
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
