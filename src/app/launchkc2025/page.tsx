'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, ArrowRight, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

const goldGlass = {
  background:
    "linear-gradient(135deg, rgba(184,134,11,0.18), rgba(120,113,108,0.12))",
  border: "1px solid rgba(255,255,255,0.12)",
};

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
    if (accessCode.trim().toLowerCase() === 'lkc2025vertec') {
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
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background geometric pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(184,134,11,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184,134,11,0.1) 1px, transparent 1px)
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
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-white">Launch</span>
            <span className="bg-gradient-to-r from-yellow-600 to-amber-500 bg-clip-text text-transparent">KC</span>
            <span className="text-white"> 2025</span>
          </h1>
          
          <p className="text-gray-400 text-lg">
            HyperFactory Presentation Access
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-2xl p-8 backdrop-blur-sm"
          style={goldGlass}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-yellow-600 to-amber-500 flex items-center justify-center">
              <Lock className="w-6 h-6 text-black" />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-center mb-6 text-white">
            Enter Your Access Code
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value)
                  setError('') // Clear error when user types
                }}
                placeholder="Access Code"
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-yellow-600/50 focus:ring-2 focus:ring-yellow-600/20 transition-all text-white placeholder-gray-400 text-center text-lg font-mono tracking-wider"
                required
                autoComplete="off"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className={`w-full py-4 rounded-lg font-semibold transition-all shadow-lg flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-700 hover:to-amber-600 shadow-yellow-600/25 text-black'
              }`}
              disabled={isSubmitting}
            >
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
            <p className="text-gray-400 text-sm">
              Don't have an access code? Contact your LaunchKC representative.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 text-sm">
            © 2024 HyperFactory by Vertec. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
