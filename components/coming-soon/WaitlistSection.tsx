'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, User, Phone, Building2 } from 'lucide-react'
import { px } from '@/components/utils'
import { MetallicText } from '@/components/metallic-text'

const WaitlistForm = ({
  onSubmit,
  isSubmitting,
  isSubmitted,
  submitError,
  submitSuccess,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  phoneError,
  setPhoneError,
  company,
  setCompany,
  validatePhone
}: any) => {
  const polyRoundness = 12
  const hypotenuse = polyRoundness * 2
  const hypotenuseHalf = polyRoundness / 2 - 1.5

  return (
    <motion.div
      style={{
        "--poly-roundness": px(polyRoundness),
      } as React.CSSProperties}
      className="relative p-8 max-w-md mx-auto border border-border/50 bg-background [clip-path:polygon(var(--poly-roundness)_0,calc(100%_-_var(--poly-roundness))_0,100%_var(--poly-roundness),100%_calc(100%_-_var(--poly-roundness)),calc(100%_-_var(--poly-roundness))_100%,var(--poly-roundness)_100%,0_calc(100%_-_var(--poly-roundness)),0_var(--poly-roundness))]"
    >
      <span style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties} className="absolute inline-block w-[var(--h)] top-[var(--hh)] left-[var(--hh)] h-[1px] -rotate-45 origin-top -translate-x-1/2 bg-border/50" />
      <span style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties} className="absolute w-[var(--h)] top-[var(--hh)] right-[var(--hh)] h-[1px] bg-border/50 rotate-45 translate-x-1/2" />
      <span style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties} className="absolute w-[var(--h)] bottom-[var(--hh)] left-[var(--hh)] h-[1px] bg-border/50 rotate-45 -translate-x-1/2" />
      <span style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties} className="absolute w-[var(--h)] bottom-[var(--hh)] right-[var(--hh)] h-[1px] bg-border/50 -rotate-45 translate-x-1/2" />

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full pl-12 pr-8 py-3 bg-background border border-border/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder-foreground/40 font-mono text-sm"
            required
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full pl-12 pr-8 py-3 bg-background border border-border/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder-foreground/40 font-mono text-sm"
            required
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
              if (phoneError) setPhoneError('')
            }}
            onBlur={() => phone && !validatePhone(phone) && setPhoneError('Please enter a valid phone number')}
            placeholder="Phone number"
            className={`w-full pl-12 pr-4 py-3 bg-background border rounded-none focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder-foreground/40 font-mono text-sm ${
              phoneError ? 'border-destructive/50' : 'border-border/50'
            }`}
          />
          {phoneError && (
            <p className="text-destructive text-xs mt-1 ml-1">{phoneError}</p>
          )}
        </div>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company name"
            className="w-full pl-12 pr-4 py-3 bg-background border border-border/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder-foreground/40 font-mono text-sm"
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          style={{
            "--poly-roundness": px(16),
            "--h": px(32),
            "--hh": px(6.5)
          } as React.CSSProperties}
          className={`relative w-full py-3 font-semibold transition-all uppercase font-mono text-sm border [clip-path:polygon(var(--poly-roundness)_0,calc(100%_-_var(--poly-roundness))_0,100%_0,100%_calc(100%_-_var(--poly-roundness)),calc(100%_-_var(--poly-roundness))_100%,0_100%,0_calc(100%_-_var(--poly-roundness)),0_var(--poly-roundness))] ${
            isSubmitting || isSubmitted
              ? 'bg-background border-border/50 text-foreground/50 cursor-not-allowed'
              : 'bg-background border-primary text-primary hover:bg-primary/5'
          }`}
          disabled={isSubmitting || isSubmitted}
        >
          <span className="absolute inline-block w-[var(--h)] top-[var(--hh)] left-[var(--hh)] h-[2px] -rotate-45 origin-top -translate-x-1/2 bg-primary" />
          <span className="absolute w-[var(--h)] bottom-[var(--hh)] right-[var(--hh)] h-[2px] -rotate-45 translate-x-1/2 bg-primary" />
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
            '[Join Waitlist]'
          )}
        </motion.button>
      </form>

      {submitSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-background border border-success/20"
        >
          <p className="text-success text-sm text-center font-mono">
            {submitSuccess}
          </p>
        </motion.div>
      )}

      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-background border border-destructive/20"
        >
          <p className="text-destructive text-sm text-center font-mono">
            {submitError}
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

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

  const validatePhone = (phoneNumber: string): boolean => {
    if (!phoneNumber) return true
    const digitsOnly = phoneNumber.replace(/\D/g, '')
    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      return false
    }
    const phonePattern = /^[\+]?[1-9][\d]{0,3}?[\s\-\(\)]?[\d\s\-\(\)]{7,14}$/
    return phonePattern.test(phoneNumber.trim())
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    setSubmitSuccess('')

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
    <section id="waitlist" className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground font-alliance">
            Ready to revolutionize your{' '}
            <MetallicText text="manufacturing?" />
          </h2>
          <p className="text-lg md:text-xl text-foreground/60 mb-12 max-w-2xl mx-auto font-mono">
            Join the waitlist for early access to HYPERFACTORY. Be among the first manufacturers to
            experience the future of AI-powered smart factories.
          </p>

          <WaitlistForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            isSubmitted={isSubmitted}
            submitError={submitError}
            submitSuccess={submitSuccess}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            phoneError={phoneError}
            setPhoneError={setPhoneError}
            company={company}
            setCompany={setCompany}
            validatePhone={validatePhone}
          />
        </motion.div>
      </div>
    </section>
  )
}
