'use client'

import { createContext, useContext, useCallback, useRef, ReactNode, useState } from 'react'

type SoundType = 'hover' | 'click' | 'whoosh' | 'success'

interface SoundContextType {
  playSound: (type: SoundType) => void
  setEnabled: (enabled: boolean) => void
  isEnabled: boolean
}

const SoundContext = createContext<SoundContextType | null>(null)

// Generate sound using Web Audio API
const createSound = (audioContext: AudioContext, type: SoundType) => {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  const now = audioContext.currentTime
  
  switch (type) {
    case 'hover':
      oscillator.frequency.setValueAtTime(800, now)
      oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.05)
      gainNode.gain.setValueAtTime(0.03, now)
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1)
      oscillator.start(now)
      oscillator.stop(now + 0.1)
      break
      
    case 'click':
      oscillator.frequency.setValueAtTime(600, now)
      oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.1)
      gainNode.gain.setValueAtTime(0.05, now)
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15)
      oscillator.start(now)
      oscillator.stop(now + 0.15)
      break
      
    case 'whoosh':
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(200, now)
      oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.3)
      gainNode.gain.setValueAtTime(0.02, now)
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
      oscillator.start(now)
      oscillator.stop(now + 0.3)
      break
      
    case 'success':
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(523, now)
      oscillator.frequency.setValueAtTime(659, now + 0.1)
      oscillator.frequency.setValueAtTime(784, now + 0.2)
      gainNode.gain.setValueAtTime(0.04, now)
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4)
      oscillator.start(now)
      oscillator.stop(now + 0.4)
      break
  }
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const [isEnabled, setIsEnabled] = useState(true)

  const playSound = useCallback((type: SoundType) => {
    if (!isEnabled) return
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      }
      
      createSound(audioContextRef.current, type)
    } catch {
      // Audio not supported or blocked
    }
  }, [isEnabled])

  const setEnabled = useCallback((enabled: boolean) => {
    setIsEnabled(enabled)
  }, [])

  return (
    <SoundContext.Provider value={{ playSound, setEnabled, isEnabled }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const context = useContext(SoundContext)
  if (!context) {
    return { playSound: () => {}, setEnabled: () => {}, isEnabled: true }
  }
  return context
}
