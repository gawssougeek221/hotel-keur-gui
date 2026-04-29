'use client'

import Preloader from '@/components/Preloader'
import CustomCursor from '@/components/CustomCursor'
import SmoothScroll from '@/components/SmoothScroll'
import { SoundProvider } from '@/components/SoundProvider'
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
    <SoundProvider>
      <Preloader />
      <CustomCursor />
      <SmoothScroll>
        <main className="min-h-screen bg-[#0a0e1a] text-white overflow-x-hidden">
          {/* Navigation */}
          <HotelNav />
          
          {/* Hero Section */}
          <HotelHero />
          
          {/* Marquee */}
          <Marquee />
          
          {/* Interactive Experiences Selector - Awwwards Style */}
          <div id="rooms" data-speed="0.9">
            <InteractiveSelector />
          </div>
          
          {/* Amenities - Horizontal Scroll */}
          <HotelAmenities />
          
          {/* Gallery Section */}
          <div data-speed="1.1">
            <HotelGallery />
          </div>
          
          {/* Testimonials */}
          <HotelTestimonials />
          
          {/* Contact Section */}
          <HotelContact />
          
          {/* Footer */}
          <HotelFooter />
        </main>
      </SmoothScroll>
    </SoundProvider>
  )
}
