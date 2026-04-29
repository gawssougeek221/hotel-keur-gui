'use client'

import React, { useState, useEffect } from 'react'
import { Bed, Crown, Diamond, Sparkles, UtensilsCrossed } from 'lucide-react'

const InteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([])
  
  const options = [
    {
      title: "Chambre Deluxe",
      description: "Élégance sénégalaise avec vue jardin",
      image: "/images/hotel/deluxe-room.png",
      icon: <Bed size={24} className="text-amber-400" />,
      price: "150,000 CFA"
    },
    {
      title: "Suite Executive",
      description: "Luxe contemporain face à l'Atlantique",
      image: "/images/hotel/executive-suite.png",
      icon: <Crown size={24} className="text-amber-400" />,
      price: "250,000 CFA"
    },
    {
      title: "Présidentielle",
      description: "L'excellence absolue avec piscine privée",
      image: "/images/hotel/presidential-suite.png",
      icon: <Diamond size={24} className="text-amber-400" />,
      price: "500,000 CFA"
    },
    {
      title: "Spa & Bien-être",
      description: "Rituels sénégalais et soins signature",
      image: "/images/hotel/spa.png",
      icon: <Sparkles size={24} className="text-amber-400" />,
      price: "Sur réservation"
    },
    {
      title: "Gastronomie",
      description: "Cuisine sénégalaise raffinée",
      image: "/images/hotel/restaurant.png",
      icon: <UtensilsCrossed size={24} className="text-amber-400" />,
      price: "Menu 35,000 CFA"
    }
  ]

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index)
    }
  }

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i])
      }, 180 * i)
      timers.push(timer)
    })
    
    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [])

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-[#0a0e1a] font-sans text-white py-16 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Header Section */}
      <div className="w-full max-w-2xl px-6 mb-4 text-center relative z-10">
        <span className="text-amber-400/60 text-xs tracking-[0.5em] uppercase block mb-4">Nos Expériences</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 tracking-wide">
          Découvrez <span className="text-amber-400">Keur Gui</span>
        </h2>
        <p className="text-base md:text-lg text-white/50 font-light max-w-xl mx-auto">
          Une expérience hôtelière unique au cœur de l&apos;hospitalité sénégalaise
        </p>
      </div>

      <div className="h-12" />

      {/* Options Container */}
      <div className="flex w-full max-w-[900px] min-w-[320px] h-[400px] md:min-w-[600px] mx-4 items-stretch overflow-hidden relative">
        {options.map((option, index) => (
          <div
            key={index}
            className={`
              option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out cursor-pointer
              ${activeIndex === index ? 'active' : ''}
            `}
            style={{
              backgroundImage: `url('${option.image}')`,
              backgroundSize: activeIndex === index ? 'auto 100%' : 'auto 120%',
              backgroundPosition: 'center',
              backfaceVisibility: 'hidden',
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
              minWidth: '60px',
              minHeight: '100px',
              margin: 0,
              borderRadius: 0,
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: activeIndex === index ? 'rgba(212, 175, 55, 0.8)' : 'rgba(212, 175, 55, 0.1)',
              backgroundColor: '#0a0e1a',
              boxShadow: activeIndex === index 
                ? '0 20px 60px rgba(0,0,0,0.50)' 
                : '0 10px 30px rgba(0,0,0,0.30)',
              flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
              zIndex: activeIndex === index ? 10 : 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              position: 'relative',
              overflow: 'hidden',
              willChange: 'flex-grow, box-shadow, background-size, background-position'
            }}
            onClick={() => handleOptionClick(index)}
          >
            {/* Shadow effect */}
            <div 
              className="shadow absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
              style={{
                bottom: activeIndex === index ? '0' : '-40px',
                height: '120px',
                boxShadow: activeIndex === index 
                  ? 'inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000' 
                  : 'inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000'
              }}
            />
            
            {/* Label with icon and info */}
            <div className="label absolute left-0 right-0 bottom-5 flex items-center justify-start h-12 z-2 pointer-events-none px-4 gap-3 w-full">
              <div 
                className="icon min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center rounded-full backdrop-blur-md shadow-lg flex-shrink-0 flex-grow-0 transition-all duration-200"
                style={{
                  backgroundColor: 'rgba(10, 14, 26, 0.85)',
                  border: '2px solid rgba(212, 175, 55, 0.3)'
                }}
              >
                {option.icon}
              </div>
              <div className="info text-white whitespace-pre relative">
                <div 
                  className="main font-light text-lg tracking-wide transition-all duration-700 ease-in-out"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                  }}
                >
                  {option.title}
                </div>
                <div 
                  className="sub text-sm text-white/50 transition-all duration-700 ease-in-out"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                  }}
                >
                  {option.description}
                </div>
                <div 
                  className="price text-amber-400 text-sm mt-1 transition-all duration-700 ease-in-out"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                  }}
                >
                  {option.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="mt-12 relative z-10">
        <button 
          className="px-8 py-3 border border-amber-400/50 text-amber-400 text-sm tracking-[0.2em] uppercase hover:bg-amber-400 hover:text-black transition-all duration-300"
        >
          Réserver Maintenant
        </button>
      </div>
    </section>
  )
}

export default InteractiveSelector
