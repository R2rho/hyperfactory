// Rate limiting and spam protection
interface RateLimitEntry {
  count: number
  firstAttempt: number
  lastAttempt: number
  blocked: boolean
  blockUntil?: number
}

// Email submission tracking with timestamps
interface EmailSubmissionEntry {
  email: string
  submittedAt: number
  lastChecked: number
}

// In-memory store for rate limiting (in production, use Redis or similar)
const rateLimitStore = new Map<string, RateLimitEntry>()
const emailSubmissions = new Map<string, EmailSubmissionEntry>()

// Rate limiting configuration
const RATE_LIMIT_CONFIG = {
  maxAttempts: 3,
  windowMs: 60 * 1000, // 1 minute
  blockDurationMs: 15 * 60 * 1000, // 15 minutes
}

// Email submission cleanup configuration
const EMAIL_CLEANUP_CONFIG = {
  checkIntervalMs: 24 * 60 * 60 * 1000, // Check every 24 hours
  minTimeSinceSubmission: 7 * 24 * 60 * 60 * 1000, // 7 days minimum before checking
  recheckIntervalMs: 24 * 60 * 60 * 1000, // Recheck every 24 hours if lead still exists
}

export class RateLimiter {
  // Check if IP is rate limited
  static isRateLimited(ip: string): { limited: boolean; retryAfter?: number } {
    const now = Date.now()
    const entry = rateLimitStore.get(ip)

    if (!entry) {
      return { limited: false }
    }

    // Check if block period has expired
    if (entry.blocked && entry.blockUntil && now > entry.blockUntil) {
      rateLimitStore.delete(ip)
      return { limited: false }
    }

    // If currently blocked
    if (entry.blocked && entry.blockUntil) {
      const retryAfter = Math.ceil((entry.blockUntil - now) / 1000)
      return { limited: true, retryAfter }
    }

    // Check if window has expired
    if (now - entry.firstAttempt > RATE_LIMIT_CONFIG.windowMs) {
      rateLimitStore.delete(ip)
      return { limited: false }
    }

    // Check if exceeded max attempts
    if (entry.count >= RATE_LIMIT_CONFIG.maxAttempts) {
      entry.blocked = true
      entry.blockUntil = now + RATE_LIMIT_CONFIG.blockDurationMs
      const retryAfter = Math.ceil(RATE_LIMIT_CONFIG.blockDurationMs / 1000)
      return { limited: true, retryAfter }
    }

    return { limited: false }
  }

  // Record an attempt
  static recordAttempt(ip: string): void {
    const now = Date.now()
    const entry = rateLimitStore.get(ip)

    if (!entry) {
      rateLimitStore.set(ip, {
        count: 1,
        firstAttempt: now,
        lastAttempt: now,
        blocked: false,
      })
    } else {
      // If window has expired, reset
      if (now - entry.firstAttempt > RATE_LIMIT_CONFIG.windowMs) {
        rateLimitStore.set(ip, {
          count: 1,
          firstAttempt: now,
          lastAttempt: now,
          blocked: false,
        })
      } else {
        entry.count++
        entry.lastAttempt = now
      }
    }
  }

  // Check if email has already been submitted
  static hasEmailBeenSubmitted(email: string): boolean {
    const entry = emailSubmissions.get(email.toLowerCase())
    if (!entry) return false

    const now = Date.now()

    // If it's been more than the minimum time since submission, we should check Odoo
    if (now - entry.submittedAt > EMAIL_CLEANUP_CONFIG.minTimeSinceSubmission) {
      // If we haven't checked recently, mark for cleanup check
      if (now - entry.lastChecked > EMAIL_CLEANUP_CONFIG.recheckIntervalMs) {
        return false // Allow resubmission, will be checked against Odoo
      }
    }

    return true
  }

  // Record email submission
  static recordEmailSubmission(email: string): void {
    const now = Date.now()
    emailSubmissions.set(email.toLowerCase(), {
      email: email.toLowerCase(),
      submittedAt: now,
      lastChecked: now,
    })
  }

  // Update last checked time for an email
  static updateEmailLastChecked(email: string): void {
    const entry = emailSubmissions.get(email.toLowerCase())
    if (entry) {
      entry.lastChecked = Date.now()
    }
  }

  // Remove email from submissions (when lead no longer exists in Odoo)
  static removeEmailSubmission(email: string): void {
    emailSubmissions.delete(email.toLowerCase())
  }

  // Get emails that need Odoo verification
  static getEmailsForOdooCheck(): string[] {
    const now = Date.now()
    const emailsToCheck: string[] = []

    for (const [email, entry] of emailSubmissions.entries()) {
      // Check if enough time has passed since submission and last check
      const timeSinceSubmission = now - entry.submittedAt
      const timeSinceLastCheck = now - entry.lastChecked

      if (
        timeSinceSubmission > EMAIL_CLEANUP_CONFIG.minTimeSinceSubmission &&
        timeSinceLastCheck > EMAIL_CLEANUP_CONFIG.recheckIntervalMs
      ) {
        emailsToCheck.push(email)
      }
    }

    return emailsToCheck
  }

  // Basic bot detection
  static detectBot(userAgent?: string, headers?: Record<string, string>): boolean {
    if (!userAgent) return true

    const botPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /curl/i,
      /wget/i,
      /python/i,
      /requests/i,
    ]

    // Check user agent
    if (botPatterns.some(pattern => pattern.test(userAgent))) {
      return true
    }

    // Check for missing common browser headers
    if (!headers) return false

    const hasAccept = headers['accept']
    const hasAcceptLanguage = headers['accept-language']
    const hasAcceptEncoding = headers['accept-encoding']

    // Real browsers typically send these headers
    if (!hasAccept || !hasAcceptLanguage || !hasAcceptEncoding) {
      return true
    }

    return false
  }

  // Validate email format
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validate name (basic check for suspicious patterns)
  static isValidName(name: string): boolean {
    if (name.length < 2 || name.length > 100) return false
    
    // Check for suspicious patterns
    const suspiciousPatterns = [
      /test/i,
      /admin/i,
      /null/i,
      /undefined/i,
      /^[0-9]+$/,
      /[<>]/,
    ]

    return !suspiciousPatterns.some(pattern => pattern.test(name))
  }

  // Clean up old entries (call periodically)
  static cleanup(): void {
    const now = Date.now()
    const expiredThreshold = RATE_LIMIT_CONFIG.windowMs + RATE_LIMIT_CONFIG.blockDurationMs

    // Clean up rate limit entries
    for (const [ip, entry] of rateLimitStore.entries()) {
      if (now - entry.lastAttempt > expiredThreshold) {
        rateLimitStore.delete(ip)
      }
    }

    // Clean up very old email submissions (older than 30 days)
    const oldEmailThreshold = 30 * 24 * 60 * 60 * 1000 // 30 days
    for (const [email, entry] of emailSubmissions.entries()) {
      if (now - entry.submittedAt > oldEmailThreshold) {
        emailSubmissions.delete(email)
      }
    }
  }

  // Get cleanup statistics
  static getCleanupStats(): {
    totalEmailSubmissions: number
    emailsNeedingOdooCheck: number
    rateLimitEntries: number
  } {
    return {
      totalEmailSubmissions: emailSubmissions.size,
      emailsNeedingOdooCheck: this.getEmailsForOdooCheck().length,
      rateLimitEntries: rateLimitStore.size,
    }
  }
}

// Cleanup old entries every 30 minutes
setInterval(() => {
  RateLimiter.cleanup()
}, 30 * 60 * 1000)
