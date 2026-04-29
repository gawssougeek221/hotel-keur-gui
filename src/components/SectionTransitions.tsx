'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SectionTransitionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function SectionTransition({ children, className = '', id }: SectionTransitionProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Create a reveal animation
    gsap.from(el, {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })

  }, [])

  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  )
}

export function WipeTransition({ children, className = '', id }: SectionTransitionProps) {
  const ref = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const inner = innerRef.current
    if (!el || !inner) return

    // Clip path wipe animation
    gsap.from(inner, {
      clipPath: 'inset(0 100% 0 0)',
      duration: 1.2,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

  }, [])

  return (
    <section ref={ref} id={id} className={className}>
      <div ref={innerRef}>
        {children}
      </div>
    </section>
  )
}

export function StaggerChildren({ 
  children, 
  className = '', 
  stagger = 0.1,
  id 
}: SectionTransitionProps & { stagger?: number }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const items = el.children
    
    gsap.from(items, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })

  }, [stagger])

  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  )
}

export function ParallaxSection({ 
  children, 
  className = '', 
  speed = 0.5,
  id 
}: SectionTransitionProps & { speed?: number }) {
  const ref = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const content = contentRef.current
    if (!el || !content) return

    gsap.to(content, {
      yPercent: -30 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })

  }, [speed])

  return (
    <section ref={ref} id={id} className={className}>
      <div ref={contentRef}>
        {children}
      </div>
    </section>
  )
}

export function ScaleSection({ children, className = '', id }: SectionTransitionProps) {
  const ref = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const inner = innerRef.current
    if (!el || !inner) return

    gsap.from(inner, {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

  }, [])

  return (
    <section ref={ref} id={id} className={className}>
      <div ref={innerRef}>
        {children}
      </div>
    </section>
  )
}
