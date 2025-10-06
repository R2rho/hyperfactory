'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { WorkflowDisplay } from './WorkflowDisplay'

export function ComingSoonHero() {
  // Refs for measuring text width
  const futureRef = useRef<HTMLSpanElement>(null)
  const printingRef = useRef<HTMLSpanElement>(null)

  // Animation controls
  const futureControls = useAnimation()
  const printingControls = useAnimation()

  // Create smooth shimmer animation with precise light positioning
  const createShimmerAnimation = (textWidth: number, baseColor: string, highlightColor: string, falloffColor: string) => {
    const steps = 25 // More steps for smoother animation
    const lightWidth = 12 // Narrower light beam
    const keyframes = []

    // Start with no light (completely off-screen left)
    keyframes.push(`linear-gradient(90deg, ${baseColor} 0%, ${baseColor} 100%)`)

    // Create smooth progression - light travels from -lightWidth to 100+lightWidth
    for (let i = 1; i <= steps; i++) {
      const progress = ((i / steps) * (100 + lightWidth * 2)) - lightWidth // Start from off-screen left
      const lightStart = progress - lightWidth / 2
      const lightCenter = progress
      const lightEnd = progress + lightWidth / 2

      // Clamp values to prevent invalid percentages
      const clampedStart = Math.max(0, lightStart)
      const clampedEnd = Math.min(100, lightEnd)

      if (lightEnd <= 0) {
        // Light is completely off-screen left
        keyframes.push(`linear-gradient(90deg, ${baseColor} 0%, ${baseColor} 100%)`)
      } else if (lightStart >= 100) {
        // Light is completely off-screen right
        keyframes.push(`linear-gradient(90deg, ${baseColor} 0%, ${baseColor} 100%)`)
      } else if (lightStart <= 0 && lightEnd >= 100) {
        // Light covers entire text (shouldn't happen with our values)
        keyframes.push(`linear-gradient(90deg, ${highlightColor} 0%, ${highlightColor} 100%)`)
      } else if (lightStart <= 0) {
        // Light entering from left
        keyframes.push(`linear-gradient(90deg, ${highlightColor} 0%, ${falloffColor} ${lightCenter}%, ${baseColor} ${clampedEnd}%, ${baseColor} 100%)`)
      } else if (lightEnd >= 100) {
        // Light exiting to right
        keyframes.push(`linear-gradient(90deg, ${baseColor} 0%, ${baseColor} ${clampedStart}%, ${falloffColor} ${lightCenter}%, ${highlightColor} 100%)`)
      } else {
        // Light is within the text bounds
        keyframes.push(`linear-gradient(90deg, ${baseColor} 0%, ${baseColor} ${clampedStart}%, ${falloffColor} ${lightCenter - lightWidth/4}%, ${highlightColor} ${lightCenter}%, ${falloffColor} ${lightCenter + lightWidth/4}%, ${baseColor} ${clampedEnd}%, ${baseColor} 100%)`)
      }
    }

    // End with no light
    keyframes.push(`linear-gradient(90deg, ${baseColor} 0%, ${baseColor} 100%)`)

    return keyframes
  }

  // Animation speed control - adjust this value to change shimmer speed
  // Lower values = faster shimmer, higher values = slower shimmer
  const SPEED_MULTIPLIER = 0.15 // Try values like 0.7 (faster), 1.3 (slower), etc.

  // Pause control - time to wait between complete cycles (in seconds)
  const PAUSE_BETWEEN_CYCLES = 5.0 // Time to wait after both phrases complete before starting again

  // State to prevent overlapping animations
  const [isAnimating, setIsAnimating] = useState(false)

  // Start animations with perfect synchronization
  const startShimmerSequence = useCallback(async () => {
    // Prevent overlapping animations
    if (isAnimating) {
      return
    }

    setIsAnimating(true)

    try {
      const futureKeyframes = createShimmerAnimation(100, '#9ca3af', '#ffffff', '#e5e7eb')
      const printingKeyframes = createShimmerAnimation(100, '#60a5fa', '#ffffff', '#93c5fd')

      // Calculate precise timing for seamless flow (adjusted by speed multiplier)
      const baseFutureDuration = 2.8 // Base duration for "The Future of"
      const basePrintingDuration = 2.2 // Base duration for "Printing"

      const futureDuration = baseFutureDuration * SPEED_MULTIPLIER
      const printingDuration = basePrintingDuration * SPEED_MULTIPLIER
      const pauseDuration = PAUSE_BETWEEN_CYCLES // Use the independent pause control

      const lightWidth = 12 // Must match the lightWidth in createShimmerAnimation

      // Calculate when light reaches the end of "The Future of"
      // Light travels from -lightWidth to 100+lightWidth, so it exits text at: 100/(100+2*lightWidth) of the animation
      const lightExitTime = futureDuration * (100 / (100 + 2 * lightWidth))

      // Ensure minimum delay to prevent overlap at very fast speeds
      const minimumDelay = Math.max(lightExitTime * 1000, 50) // At least 50ms delay

      // Start both animations simultaneously but with different durations
      const futurePromise = futureControls.start({
        backgroundImage: futureKeyframes,
        transition: {
          duration: futureDuration,
          ease: "linear"
        }
      })

      // Start "Printing" animation exactly when light exits "The Future of"
      setTimeout(() => {
        printingControls.start({
          backgroundImage: printingKeyframes,
          transition: {
            duration: printingDuration,
            ease: "linear"
          }
        })
      }, minimumDelay) // Use the safeguarded delay

      // Wait for both animations to complete
      await futurePromise
      await new Promise(resolve => setTimeout(resolve, printingDuration * 1000))

      // Reset both to initial state immediately after completion
      futureControls.set({ backgroundImage: futureKeyframes[0] })
      printingControls.set({ backgroundImage: printingKeyframes[0] })

      // Wait before repeating (adjusted by speed multiplier)
      await new Promise(resolve => setTimeout(resolve, pauseDuration * 1000))

    } finally {
      // Always reset the animating state, even if there's an error
      setIsAnimating(false)
    }

    // Schedule the next cycle
    setTimeout(() => startShimmerSequence(), 100) // Small delay to prevent immediate restart
  }, [futureControls, printingControls, isAnimating, SPEED_MULTIPLIER, PAUSE_BETWEEN_CYCLES, createShimmerAnimation])

  // Start the animation sequence on mount
  useEffect(() => {
    const timer = setTimeout(startShimmerSequence, 2000) // Start after 2 seconds
    return () => clearTimeout(timer)
  }, [startShimmerSequence])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/20 text-blue-400 text-sm mb-8">
            <Sparkles className="w-4 h-4" />
            Coming Soon - Revolutionary Printing Platform
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
            <motion.span
              ref={futureRef}
              className="bg-gradient-to-r bg-clip-text text-transparent"
              animate={futureControls}
              initial={{ backgroundImage: 'linear-gradient(90deg, #9ca3af 0%, #9ca3af 100%)' }}
            >
              The Future of
            </motion.span>{' '}
            <motion.span
              ref={printingRef}
              className="bg-gradient-to-r bg-clip-text text-transparent block"
              style={{
                // fontStyle: 'italic',
                transform: 'skew(-8deg)',
                letterSpacing: '0.02em'
              }}
              animate={printingControls}
              initial={{ backgroundImage: 'linear-gradient(90deg, #60a5fa 0%, #34d399 100%)' }}
            >
              Printing
            </motion.span>
          </h1>

          <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-lg">
            The ultimate platform for creatives and businesses in apparel decoration and printing.
            Source premium DTF transfers, UV DTF, and 3D printing services at lightspeed with the
            easiest experience ever built.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('waitlist')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-blue-600 hover:to-emerald-600 transition-all shadow-lg shadow-blue-500/25"
            >
              Join Waitlist
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <WorkflowDisplay />
        </motion.div>
      </div>
    </section>
  )
}
