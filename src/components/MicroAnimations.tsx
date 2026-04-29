'use client'

import { useEffect, useRef, ReactNode } from 'react'
import gsap from 'gsap'
import { useSound } from './SoundProvider'

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function Magnetic({ children, className = '', strength = 0.4 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { playSound } = useSound()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      })
    }

    const handleEnter = () => {
      playSound('hover')
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    el.addEventListener('mouseenter', handleEnter)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
      el.removeEventListener('mouseenter', handleEnter)
    }
  }, [strength, playSound])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface RevealTextProps {
  children: string
  className?: string
  delay?: number
}

export function RevealText({ children, className = '', delay = 0 }: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const text = children
    el.innerHTML = text.split('').map(char => 
      `<span class="inline-block overflow-hidden">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('')

    gsap.from(el.querySelectorAll('span'), {
      y: 100,
      opacity: 0,
      rotateX: -90,
      stagger: 0.03,
      duration: 0.8,
      delay,
      ease: 'power4.out'
    })
  }, [children, delay])

  return (
    <div ref={ref} className={className} style={{ perspective: '1000px' }}>
      {children}
    </div>
  )
}

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function FadeIn({ children, className = '', delay = 0, direction = 'up' }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const directions = {
      up: { y: 60 },
      down: { y: -60 },
      left: { x: 60 },
      right: { x: -60 }
    }

    gsap.from(el, {
      ...directions[direction],
      opacity: 0,
      duration: 1,
      delay,
      ease: 'power3.out'
    })
  }, [delay, direction])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface ScaleInProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function ScaleIn({ children, className = '', delay = 0 }: ScaleInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { playSound } = useSound()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.from(el, {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      delay,
      ease: 'back.out(1.7)'
    })
  }, [delay])

  const handleClick = () => {
    playSound('click')
    gsap.to(ref.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    })
  }

  return (
    <div ref={ref} className={className} onClick={handleClick}>
      {children}
    </div>
  )
}

interface FloatProps {
  children: ReactNode
  className?: string
  duration?: number
  distance?: number
}

export function Float({ children, className = '', duration = 3, distance = 20 }: FloatProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.to(el, {
      y: -distance,
      duration,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    })
  }, [duration, distance])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface GlitchTextProps {
  children: string
  className?: string
}

export function GlitchText({ children, className = '' }: GlitchTextProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const glitch = () => {
      gsap.to(el, {
        x: () => gsap.utils.random(-3, 3),
        y: () => gsap.utils.random(-2, 2),
        duration: 0.05,
        repeat: 3,
        yoyo: true,
        onComplete: () => {
          gsap.set(el, { x: 0, y: 0 })
        }
      })
    }

    const interval = setInterval(glitch, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  )
}
