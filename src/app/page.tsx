'use client'

import HotelNav from '@/components/HotelNav'
import HotelHero from '@/components/HotelHero'
import HotelRooms from '@/components/HotelRooms'
import HotelAmenities from '@/components/HotelAmenities'
import HotelFeatures from '@/components/HotelFeatures'
import HotelGallery from '@/components/HotelGallery'
import HotelTestimonials from '@/components/HotelTestimonials'
import HotelContact from '@/components/HotelContact'
import HotelFooter from '@/components/HotelFooter'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0e1a] text-white overflow-x-hidden">
      {/* Navigation */}
      <HotelNav />
      
      {/* Hero Section */}
      <HotelHero />
      
      {/* Rooms Section */}
      <div id="rooms">
        <HotelRooms />
      </div>
      
      {/* Features Section */}
      <HotelFeatures />
      
      {/* Amenities Section */}
      <div id="amenities">
        <HotelAmenities />
      </div>
      
      {/* Gallery Section */}
      <div id="gallery">
        <HotelGallery />
      </div>
      
      {/* Testimonials Section */}
      <HotelTestimonials />
      
      {/* Contact Section */}
      <div id="contact">
        <HotelContact />
      </div>
      
      {/* Footer */}
      <HotelFooter />
    </main>
  )
}
