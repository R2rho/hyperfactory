'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, User, Phone, Building2 } from 'lucide-react'
import { GlassCard } from './GlassCard'

export function WaitlistSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  // Phone number validation function
  const validatePhone = (phoneNumber: string): boolean => {
    if (!phoneNumber) return true // Optional field, so empty is valid

    // Remove all non-digit characters for validation
    const digitsOnly = phoneNumber.replace(/\D/g, '')

    // Check if it's a valid length (10-15 digits is typical for international numbers)
    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      return false
    }

    // Basic pattern check - allows various formats like (123) 456-7890, 123-456-7890, +1 123 456 7890, etc.
    const phonePattern = /^[\+]?[1-9][\d]{0,3}?[\s\-\(\)]?[\d\s\-\(\)]{7,14}$/
    return phonePattern.test(phoneNumber.trim())
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPhone(value)

    // Clear error when user starts typing
    if (phoneError) {
      setPhoneError('')
    }

    // Validate on blur or when field has content
    if (value && !validatePhone(value)) {
      setPhoneError('Please enter a valid phone number')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Clear previous errors
    setSubmitError('')
    setSubmitSuccess('')

    // Validate phone if provided
    if (phone && !validatePhone(phone)) {
      setPhoneError('Please enter a valid phone number')
      return
    }

    if (!name || !email) {
      setSubmitError('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          company: company.trim() || undefined,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitted(true)
        setSubmitSuccess(data.message || 'Welcome to the HyperFactory waitlist!')
        // Clear form
        setName('')
        setEmail('')
        setPhone('')
        setCompany('')
        setTimeout(() => {
          setIsSubmitted(false)
          setSubmitSuccess('')
        }, 5000)
      } else {
        if (data.code === 'ALREADY_SUBMITTED' || data.code === 'ALREADY_EXISTS') {
          setSubmitSuccess(data.message || 'You are already on our waitlist!')
          setTimeout(() => setSubmitSuccess(''), 5000)
        } else if (data.code === 'RATE_LIMITED') {
          setSubmitError(`Too many attempts. Please wait ${data.retryAfter} seconds before trying again.`)
        } else {
          setSubmitError(data.error || 'An error occurred. Please try again.')
        }
      }
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="waitlist" className="py-4 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to revolutionize your{' '}
            <span className="bg-gradient-to-r from-yellow-600 to-amber-500 bg-clip-text text-transparent">
              manufacturing?
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join the waitlist for early access to HYPERFACTORY. Be among the first manufacturers to
            experience the future of AI-powered smart factories.
          </p>

          <GlassCard className="p-8 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                {/* Required indicator */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full pl-12 pr-8 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-yellow-600/50 focus:ring-2 focus:ring-yellow-600/20 transition-all text-white placeholder-gray-400"
                  required
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                {/* Required indicator */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full pl-12 pr-8 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-yellow-600/50 focus:ring-2 focus:ring-yellow-600/20 transition-all text-white placeholder-gray-400"
                  required
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  onBlur={() => phone && !validatePhone(phone) && setPhoneError('Please enter a valid phone number')}
                  placeholder="Phone number"
                  className={`w-full pl-12 pr-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:border-yellow-600/50 focus:ring-2 focus:ring-yellow-600/20 transition-all text-white placeholder-gray-400 ${
                    phoneError ? 'border-red-500/50' : 'border-white/10'
                  }`}
                />
                {phoneError && (
                  <p className="text-red-400 text-xs mt-1 ml-1">{phoneError}</p>
                )}
              </div>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company name"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-yellow-600/50 focus:ring-2 focus:ring-yellow-600/20 transition-all text-white placeholder-gray-400"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full py-3 rounded-lg font-semibold transition-all shadow-lg ${
                  isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-700 hover:to-amber-600 shadow-yellow-600/25'
                }`}
                disabled={isSubmitting || isSubmitted}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Joining...
                  </span>
                ) : isSubmitted ? (
                  'Welcome to the future! 🚀'
                ) : (
                  'Join Waitlist'
                )}
              </motion.button>
            </form>

            {/* Success Message */}
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
              >
                <p className="text-emerald-400 text-sm text-center">
                  {submitSuccess}
                </p>
              </motion.div>
            )}

            {/* Error Message */}
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
              >
                <p className="text-red-400 text-sm text-center">
                  {submitError}
                </p>
              </motion.div>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
