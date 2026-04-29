'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from '@/components/CustomCursor'
import HotelNav from '@/components/HotelNav'
import HotelFooter from '@/components/HotelFooter'
import { Clock, MapPin, Phone, ChefHat, Wine, UtensilsCrossed, Leaf } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const menuCategories = [
  {
    name: 'Entrées',
    items: [
      { name: 'Pastels au Poisson', desc: 'Beignets croustillants farcis au poisson frais, sauce piment maison', price: '4 500' },
      { name: 'Salade Sénégalaise', desc: 'Laitue, tomates, oignons, avocat, vinaigrette au citron bissap', price: '5 000' },
      { name: 'Bissap Taupe', desc: 'Feuilles d\'hibiscus sautées à l\'huile de palme', price: '3 500' },
    ]
  },
  {
    name: 'Plats Principaux',
    items: [
      { name: 'Thiéboudienne Royal', desc: 'Riz rouge au poisson et légumes, recette traditionnelle', price: '12 000' },
      { name: 'Mafé de Bœuf', desc: 'Ragoût à la sauce arachide, accompagné de riz blanc', price: '10 000' },
      { name: 'Yassa Poulet', desc: 'Poulet mariné au citron et oignons caramélisés', price: '9 500' },
      { name: 'Dibi', desc: 'Agneau grillé aux épices, sauce moutarde', price: '14 000' },
    ]
  },
  {
    name: 'Desserts',
    items: [
      { name: 'Thiakry', desc: 'Pudding de mil au lait caillé et vanille', price: '3 500' },
      { name: 'Banane Flambée', desc: 'Banane plantain caramélisée au rhum', price: '4 000' },
      { name: 'Fondant au Chocolat', desc: 'Cœur coulant, glace vanille de Madagascar', price: '5 500' },
    ]
  }
]

const drinks = [
  { name: 'Bissap', desc: 'Hibiscus frais', price: '2 000' },
  { name: 'Bouye', desc: 'Jus de baobab', price: '2 500' },
  { name: 'Dakaroise', desc: 'Bière locale', price: '3 000' },
  { name: 'Vin de Palme', desc: 'Traditionnel', price: '3 500' },
]

const chef = {
  name: 'Chef Mamadou Diallo',
  bio: 'Originaire de Saint-Louis, le Chef Diallo a perfectionné son art dans les plus grandes cuisines de Paris avant de revenir au Sénégal pour réinventer la cuisine sénégalaise. Sa philosophie : sublimer les produits locaux avec des techniques modernes.',
  image: '/images/chef.jpg'
}

export default function RestaurantPage() {
  const pageRef = useRef<HTMLDivElement>(null)

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

    // Menu sections stagger
    gsap.from('.menu-section', {
      y: 80,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.menu-container',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    })

    // Chef section animation
    gsap.from('.chef-image', {
      x: -100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.chef-section',
        start: 'top 60%',
        toggleActions: 'play none none reverse'
      }
    })

    gsap.from('.chef-content', {
      x: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.chef-section',
        start: 'top 60%',
        toggleActions: 'play none none reverse'
      }
    })

    // Drink items
    gsap.from('.drink-item', {
      scale: 0.8,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.drinks-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    })

  }, { scope: pageRef })

  const titleChars = 'NOTRE CUISINE'.split('')

  return (
    <div ref={pageRef} className="min-h-screen bg-[#0a0e1a] text-white overflow-x-hidden">
      <CustomCursor />
      <HotelNav />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/restaurant.png)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#0a0e1a]/60 to-[#0a0e1a]" />
        </div>
        
        {/* Decorative */}
        <div className="absolute top-1/3 left-10 w-40 h-40 border border-amber-400/10 rotate-45" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-emerald-400/10 rounded-full" />
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4">
          <div className="hero-title overflow-hidden mb-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.15em]">
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
          
          <p className="hero-subtitle text-amber-400 tracking-[0.4em] text-sm uppercase mb-8">
            Saveurs du Sénégal
          </p>

          {/* Info badges */}
          <div className="hero-subtitle flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>12h - 23h</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>RDC, Hotel Keur Gui</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>+221 33 859 00 00</span>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-4 border-b border-amber-400/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 border border-amber-400/30 flex items-center justify-center">
              <UtensilsCrossed className="w-10 h-10 text-amber-400" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-8">
            Une <span className="text-amber-400">Cuisine Authentique</span>
          </h2>
          <p className="text-white/60 leading-relaxed text-lg">
            Notre chef réinvente les grands classiques de la cuisine sénégalaise avec passion et créativité. 
            Chaque plat raconte une histoire, celle de nos terroirs, de nos pêcheurs, de nos agriculteurs. 
            Des produits frais, locaux, sublimés par un savoir-faire d'exception.
          </p>
        </div>
      </section>

      {/* Menu Section */}
      <section className="menu-container py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-4">
              La <span className="text-amber-400">Carte</span>
            </h2>
            <p className="text-white/40 text-sm tracking-wider uppercase">
              Découvrez nos spécialités
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {menuCategories.map((category, i) => (
              <div key={i} className="menu-section">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-px bg-amber-400" />
                  <h3 className="text-amber-400 tracking-[0.3em] text-sm uppercase">
                    {category.name}
                  </h3>
                </div>
                
                <div className="space-y-6">
                  {category.items.map((item, j) => (
                    <div key={j} className="group">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-light text-white group-hover:text-amber-400 transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-amber-400 text-sm">
                          {item.price} FCFA
                        </span>
                      </div>
                      <p className="text-white/40 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                      <div className="w-0 h-px bg-amber-400/30 group-hover:w-full transition-all duration-500 mt-3" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drinks Section */}
      <section className="drinks-section py-24 px-4 bg-gradient-to-b from-transparent via-amber-400/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Wine className="w-10 h-10 text-amber-400 mx-auto mb-4" />
            <h2 className="text-2xl font-light tracking-wider mb-4">
              Boissons & Cocktails
            </h2>
            <p className="text-white/40 text-sm">
              Sélection de boissons locales et internationales
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {drinks.map((drink, i) => (
              <div 
                key={i}
                className="drink-item p-6 border border-amber-400/10 hover:border-amber-400/30 transition-colors text-center group"
              >
                <h4 className="text-white group-hover:text-amber-400 transition-colors mb-2">
                  {drink.name}
                </h4>
                <p className="text-white/40 text-xs mb-2">{drink.desc}</p>
                <span className="text-amber-400 text-sm">{drink.price} FCFA</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef Section */}
      <section className="chef-section py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="chef-image relative">
              <div className="aspect-[3/4] relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: 'url(/images/chef.jpg)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-transparent" />
              </div>
              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-amber-400/20 -z-10" />
            </div>
            
            <div className="chef-content">
              <div className="flex items-center gap-4 mb-6">
                <ChefHat className="w-8 h-8 text-amber-400" />
                <span className="text-amber-400/60 text-xs tracking-[0.3em] uppercase">
                  Notre Chef
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6">
                {chef.name}
              </h2>
              
              <p className="text-white/60 leading-relaxed mb-8">
                {chef.bio}
              </p>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-white/40">Produits locaux</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full" />
                  <span className="text-sm text-white/40">Cuisine créative</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-emerald-400/5" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-6">
            Réservez votre table
          </h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto">
            Pour une expérience culinaire inoubliable, réservez votre table. 
            Nous vous accueillons tous les jours de 12h à 23h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              data-magnetic
              data-cursor-text="Réserver"
              className="px-8 py-4 bg-amber-400 text-black text-xs tracking-[0.2em] uppercase hover:bg-amber-300 transition-colors"
            >
              Réserver une table
            </button>
            <button 
              data-magnetic
              className="px-8 py-4 border border-white/20 text-white text-xs tracking-[0.2em] uppercase hover:border-amber-400 hover:text-amber-400 transition-all"
            >
              Voir la carte complète
            </button>
          </div>
        </div>
      </section>

      <HotelFooter />
    </div>
  )
}
