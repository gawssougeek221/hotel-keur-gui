'use client'

import Preloader from '@/components/Preloader'
import CustomCursor from '@/components/CustomCursor'
import HotelNav from '@/components/HotelNav'
import HotelHero from '@/components/HotelHero'
import Marquee from '@/components/Marquee'
import InteractiveSelector from '@/components/ui/interactive-selector'
import HotelAmenities from '@/components/HotelAmenities'
import HotelGallery from '@/components/HotelGallery'
import HotelTestimonials from '@/components/HotelTestimonials'
import HotelContact from '@/components/HotelContact'
import HotelFooter from '@/components/HotelFooter'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0e1a] text-white overflow-x-hidden">
      {/* Preloader */}
      <Preloader />
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Navigation */}
      <HotelNav />
      
      {/* Hero Section */}
      <HotelHero />
      
      {/* Marquee */}
      <Marquee />
      
      {/* Interactive Experiences Selector - Awwwards Style */}
      <div id="rooms">
        <InteractiveSelector />
      </div>
      
      {/* Amenities - Horizontal Scroll */}
      <HotelAmenities />
      
      {/* Gallery Section */}
      <HotelGallery />
      
      {/* Testimonials */}
      <HotelTestimonials />
      
      {/* Contact Section */}
      <HotelContact />
      
      {/* Footer */}
      <HotelFooter />
    </main>
  )
}
