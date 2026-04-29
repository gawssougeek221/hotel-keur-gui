'use client'

import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const testimonials = [
  {
    id: 1,
    name: 'Marie Laurent',
    role: 'Voyageuse d\'affaires',
    location: 'Paris',
    text: 'Une expérience absolument mémorable. Le service client est impeccable, les chambres sont spacieuses et élégantes.',
    highlight: 'Service impeccable'
  },
  {
    id: 2,
    name: 'Jean-Pierre Mensah',
    role: 'Entrepreneur',
    location: 'Abidjan',
    text: 'Hotel Keur Gui a dépassé toutes mes attentes. La vue est à couper le souffle et le service est d\'une qualité exceptionnelle.',
    highlight: 'Vue spectaculaire'
  },
  {
    id: 3,
    name: 'Aminata Diallo',
    role: 'Bloggeuse voyage',
    location: 'Dakar',
    text: 'J\'ai séjourné dans de nombreux hôtels de luxe, mais Hotel Keur Gui est unique. L\'attention aux détails est remarquable.',
    highlight: 'Attention remarquable'
  }
]

export default function HotelTestimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useGSAP(() => {
    gsap.from('.testimonials-title', {
      y: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.testimonials-title',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    gsap.from('.testimonial-card', {
      y: 80,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.testimonial-card',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="py-32 px-4 md:px-8 bg-gradient-to-b from-[#0a0e1a] via-[#0d1f15] to-[#0a0e1a]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="testimonials-title text-center mb-16">
          <span className="text-amber-400/60 text-xs tracking-[0.5em] uppercase block mb-4">Témoignages</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide">
            Avis <span className="text-amber-400">Clients</span>
          </h2>
        </div>

        {/* Testimonial card */}
        <div className="testimonial-card relative">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`transition-all duration-700 ${
                index === activeIndex 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 absolute inset-0 translate-x-8'
              }`}
            >
              <div className="glass border border-amber-400/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                {/* Quote mark */}
                <div className="absolute top-6 right-8 text-amber-400/10 text-[120px] font-serif leading-none">
                  &ldquo;
                </div>

                {/* Highlight badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-amber-400 text-xs tracking-[0.2em] uppercase">{testimonial.highlight}</span>
                </div>

                {/* Text */}
                <p className="text-xl md:text-2xl lg:text-3xl text-white/80 font-light leading-relaxed mb-10 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-amber-400/50 flex items-center justify-center text-amber-400 font-light">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-white font-light">{testimonial.name}</div>
                    <div className="text-white/40 text-sm">{testimonial.role} • {testimonial.location}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-px transition-all duration-300 ${
                i === activeIndex ? 'w-12 bg-amber-400' : 'w-6 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
