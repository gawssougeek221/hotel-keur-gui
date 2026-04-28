'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HotelContact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from('.contact-title', {
        opacity: 0,
        y: 60,
        duration: 1,
        scrollTrigger: {
          trigger: '.contact-title',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Form fields animation
      gsap.from('.form-field', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Info cards animation
      gsap.from('.info-card', {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: '',
        message: ''
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-gradient-to-b from-[#0f1629] to-[#0a0e1a]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="contact-title text-center mb-16">
          <span className="text-amber-400 text-sm tracking-[0.3em] uppercase mb-4 block">Contact</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Réservez Votre </span>
            <span className="text-gradient-animate">Séjour</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Contactez-nous pour planifier votre expérience luxueuse
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="contact-form">
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 border border-emerald-500/20">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Merci!</h3>
                  <p className="text-slate-400">Votre demande a été envoyée avec succès. Nous vous contacterons bientôt.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="form-field">
                      <label className="block text-slate-300 text-sm mb-2">Nom complet *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-white/5 border-emerald-500/20 focus:border-emerald-500 text-white placeholder:text-slate-500"
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label className="block text-slate-300 text-sm mb-2">Email *</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-white/5 border-emerald-500/20 focus:border-emerald-500 text-white placeholder:text-slate-500"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="form-field">
                      <label className="block text-slate-300 text-sm mb-2">Téléphone</label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-white/5 border-emerald-500/20 focus:border-emerald-500 text-white placeholder:text-slate-500"
                        placeholder="+33 6 00 00 00 00"
                      />
                    </div>
                    <div className="form-field">
                      <label className="block text-slate-300 text-sm mb-2">Nombre de personnes</label>
                      <Input
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="bg-white/5 border-emerald-500/20 focus:border-emerald-500 text-white placeholder:text-slate-500"
                        placeholder="2 adultes"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="form-field">
                      <label className="block text-slate-300 text-sm mb-2">Date d&apos;arrivée</label>
                      <Input
                        name="checkIn"
                        type="date"
                        value={formData.checkIn}
                        onChange={handleChange}
                        className="bg-white/5 border-emerald-500/20 focus:border-emerald-500 text-white"
                      />
                    </div>
                    <div className="form-field">
                      <label className="block text-slate-300 text-sm mb-2">Date de départ</label>
                      <Input
                        name="checkOut"
                        type="date"
                        value={formData.checkOut}
                        onChange={handleChange}
                        className="bg-white/5 border-emerald-500/20 focus:border-emerald-500 text-white"
                      />
                    </div>
                  </div>

                  <div className="form-field mb-6">
                    <label className="block text-slate-300 text-sm mb-2">Message</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-white/5 border-emerald-500/20 focus:border-emerald-500 text-white placeholder:text-slate-500 min-h-[120px]"
                      placeholder="Décrivez votre projet de séjour..."
                    />
                  </div>

                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold rounded-full transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Envoi en cours...
                      </span>
                    ) : (
                      'Envoyer la demande'
                    )}
                  </Button>
                </>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact-info flex flex-col justify-center">
            <div className="space-y-8">
              {/* Address */}
              <div className="info-card group flex items-start gap-4 p-6 rounded-2xl glass border border-transparent hover:border-emerald-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Adresse</h4>
                  <p className="text-slate-400">Boulevard de la Corniche</p>
                  <p className="text-slate-400">Dakar, Sénégal</p>
                </div>
              </div>

              {/* Phone */}
              <div className="info-card group flex items-start gap-4 p-6 rounded-2xl glass border border-transparent hover:border-emerald-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Téléphone</h4>
                  <p className="text-slate-400">+221 33 849 0000</p>
                  <p className="text-slate-400">+221 77 000 0000</p>
                </div>
              </div>

              {/* Email */}
              <div className="info-card group flex items-start gap-4 p-6 rounded-2xl glass border border-transparent hover:border-emerald-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Email</h4>
                  <p className="text-slate-400">reservations@thepearlresort.com</p>
                  <p className="text-slate-400">info@thepearlresort.com</p>
                </div>
              </div>

              {/* Hours */}
              <div className="info-card group flex items-start gap-4 p-6 rounded-2xl glass border border-transparent hover:border-emerald-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Réception</h4>
                  <p className="text-slate-400">24 heures / 7 jours</p>
                  <p className="text-emerald-400 text-sm">Toujours à votre service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
