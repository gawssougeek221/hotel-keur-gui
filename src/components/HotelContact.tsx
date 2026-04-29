'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function HotelContact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useGSAP(() => {
    gsap.from('.contact-title', {
      y: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.contact-title',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    gsap.from('.contact-info-item', {
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.contact-info',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    gsap.from('.contact-form-item', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.contact-form-wrapper',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })
  }, { scope: sectionRef })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 3000)
  }

  return (
    <section ref={sectionRef} id="contact" className="py-32 px-4 md:px-8 bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="contact-title text-center mb-20">
          <span className="text-amber-400/60 text-xs tracking-[0.5em] uppercase block mb-4">Contact</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide">
            Réservez Votre <span className="text-amber-400">Séjour</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="contact-info space-y-8">
            <div className="contact-info-item flex items-start gap-6">
              <div className="w-12 h-12 rounded-full border border-amber-400/30 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-light mb-1">Adresse</h4>
                <p className="text-white/40">Corniche Ouest, Dakar</p>
                <p className="text-white/40">Sénégal</p>
              </div>
            </div>

            <div className="contact-info-item flex items-start gap-6">
              <div className="w-12 h-12 rounded-full border border-amber-400/30 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-light mb-1">Téléphone</h4>
                <p className="text-white/40">+221 33 849 0000</p>
                <p className="text-white/40">+221 77 000 0000</p>
              </div>
            </div>

            <div className="contact-info-item flex items-start gap-6">
              <div className="w-12 h-12 rounded-full border border-amber-400/30 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-light mb-1">Email</h4>
                <p className="text-white/40">contact@hotelkeurgui.com</p>
                <p className="text-white/40">reservations@hotelkeurgui.com</p>
              </div>
            </div>

            <div className="contact-info-item flex items-start gap-6">
              <div className="w-12 h-12 rounded-full border border-amber-400/30 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-light mb-1">Réception</h4>
                <p className="text-white/40">24 heures / 7 jours</p>
                <p className="text-amber-400/60 text-sm">Toujours à votre service</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit} className="space-y-6">
              {isSubmitted ? (
                <div className="glass border border-emerald-400/30 rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 rounded-full border border-emerald-400/50 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-white text-xl mb-2">Merci!</h4>
                  <p className="text-white/40">Votre message a été envoyé avec succès.</p>
                </div>
              ) : (
                <>
                  <div className="contact-form-item">
                    <input
                      type="text"
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/30 focus:border-amber-400 transition-colors outline-none"
                      required
                    />
                  </div>
                  <div className="contact-form-item">
                    <input
                      type="email"
                      placeholder="Votre email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/30 focus:border-amber-400 transition-colors outline-none"
                      required
                    />
                  </div>
                  <div className="contact-form-item">
                    <input
                      type="tel"
                      placeholder="Téléphone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/30 focus:border-amber-400 transition-colors outline-none"
                    />
                  </div>
                  <div className="contact-form-item">
                    <textarea
                      placeholder="Votre message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/30 focus:border-amber-400 transition-colors outline-none resize-none"
                    />
                  </div>
                  <div className="contact-form-item pt-4">
                    <button
                      type="submit"
                      data-magnetic
                      disabled={isSubmitting}
                      className="group relative overflow-hidden px-10 py-4"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 transition-transform duration-300 group-hover:scale-100 scale-x-0 origin-left" />
                      <span className="relative z-10 text-black font-semibold tracking-wider text-sm uppercase">
                        {isSubmitting ? 'Envoi...' : 'Envoyer'}
                      </span>
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
