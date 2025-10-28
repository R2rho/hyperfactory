'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, ArrowRight, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { GL } from '@/components/gl'
import { Leva } from 'leva'

// No longer needed - using Tailwind classes instead

export default function LaunchKCAccessPage() {
  const [accessCode, setAccessCode] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    // Hardcoded access code check
    if (accessCode.trim().toLowerCase() === 'lkc2025') {
      try {
        // Set authentication cookie via API route
        const response = await fetch('/api/launchkc-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accessCode: accessCode.trim() }),
        })

        if (response.ok) {
          // Redirect to presentation
          router.push('/launchkc2025/presentation')
        } else {
          setError('Authentication failed. Please try again.')
        }
      } catch (error) {
        setError('Network error. Please try again.')
      }
    } else {
      setError('Invalid access code. Please check your code and try again.')
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 relative overflow-hidden">
      {/* GL Background */}
      <div className="absolute inset-0 opacity-30">
        <GL hovering={false} geometryType="grid" />
      </div>

      {/* Background geometric pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,199,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,199,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-md w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          {/* Logo */}
          <img src="/vertec.png" alt="Vertec" className="h-16 w-16 mx-auto mb-6 object-contain" />
          
          {/* Title */}
          <h1 className="text-4xl font-bold mb-4 font-alliance">
            <span className="text-foreground">Launch</span>
            <span className="text-primary">KC</span>
            <span className="text-foreground"> 2025</span>
          </h1>

          <p className="text-foreground/60 text-lg font-mono">
            HyperFactory Presentation Access
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="p-8 border border-border/50 bg-background/80 backdrop-blur-sm"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="h-12 w-12 flex items-center justify-center border border-primary bg-primary/10">
              <Lock className="w-6 h-6 text-primary" />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-center mb-6 text-foreground font-mono">
            Enter Your Access Code
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative" style={{ "--poly-roundness": "12px" } as React.CSSProperties}>
              <input
                type="text"
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value)
                  setError('') // Clear error when user types
                }}
                placeholder="Access Code"
                className="w-full px-4 py-4 bg-background border border-border/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder-foreground/40 text-center text-lg font-mono tracking-wider [clip-path:polygon(var(--poly-roundness)_0,calc(100%_-_var(--poly-roundness))_0,100%_0,100%_calc(100%_-_var(--poly-roundness)),calc(100%_-_var(--poly-roundness))_100%,0_100%,0_calc(100%_-_var(--poly-roundness)),0_var(--poly-roundness))]"
                required
                autoComplete="off"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20"
              >
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                <p className="text-destructive text-sm font-mono">{error}</p>
              </motion.div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              style={{ "--poly-roundness": "12px" } as React.CSSProperties}
              className={`relative w-full py-4 font-semibold transition-all shadow-lg flex items-center justify-center gap-2 border font-mono [clip-path:polygon(var(--poly-roundness)_0,calc(100%_-_var(--poly-roundness))_0,100%_0,100%_calc(100%_-_var(--poly-roundness)),calc(100%_-_var(--poly-roundness))_100%,0_100%,0_calc(100%_-_var(--poly-roundness)),0_var(--poly-roundness))] ${
                isSubmitting
                  ? 'bg-background border-border/50 text-foreground/50 cursor-not-allowed'
                  : 'bg-background border-primary text-primary hover:bg-primary/5'
              }`}
              disabled={isSubmitting}
            >
              <span className="absolute inline-block w-8 top-1.5 left-1.5 h-[2px] -rotate-45 origin-top -translate-x-1/2 bg-primary" />
              <span className="absolute w-8 bottom-1.5 right-1.5 h-[2px] -rotate-45 translate-x-1/2 bg-primary" />
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Verifying...
                </span>
              ) : (
                <>
                  Access Presentation <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-foreground/60 text-sm font-mono">
              Don't have an access code? Contact your Vertec representative.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-foreground/40 text-sm font-mono">
            © 2024 HyperFactory by Vertec. All rights reserved.
          </p>
        </motion.div>
      </div>
      <Leva hidden />
    </div>
  )
}
