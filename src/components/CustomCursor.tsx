'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorTextRef = useRef<HTMLSpanElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorText, setCursorText] = useState('')

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    // Mouse move handler
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out'
      })
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      })
    }

    // Magnetic effect for buttons and links
    const handleMagneticEnter = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      gsap.to(target, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMagneticLeave = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement
      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      })
    }

    // Hover handlers
    const handleHoverEnter = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement
      const text = target.dataset.cursorText || 'View'
      
      setIsHovering(true)
      setCursorText(text)
      
      gsap.to(cursor, {
        scale: 2.5,
        backgroundColor: 'rgba(212, 175, 55, 0.2)',
        borderColor: 'rgba(212, 175, 55, 0.8)',
        duration: 0.3
      })
    }

    const handleHoverLeave = () => {
      setIsHovering(false)
      setCursorText('')
      
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(212, 175, 55, 0.5)',
        duration: 0.3
      })
    }

    // Add event listeners
    window.addEventListener('mousemove', moveCursor)

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverEnter)
      el.addEventListener('mouseleave', handleHoverLeave)
      el.addEventListener('mousemove', handleMagneticEnter as any)
      el.addEventListener('mouseleave', handleMagneticLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverEnter)
        el.removeEventListener('mouseleave', handleHoverLeave)
        el.removeEventListener('mousemove', handleMagneticEnter as any)
        el.removeEventListener('mouseleave', handleMagneticLeave)
      })
    }
  }, [cursorText])

  return (
    <>
      {/* Main cursor */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/50 pointer-events-none z-[9998] hidden md:flex items-center justify-center mix-blend-difference"
        style={{ willChange: 'transform' }}
      >
        <span 
          ref={cursorTextRef}
          className={`text-[8px] font-bold text-white uppercase tracking-wider transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        >
          {cursorText}
        </span>
      </div>
      
      {/* Cursor dot */}
      <div 
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-amber-400 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
