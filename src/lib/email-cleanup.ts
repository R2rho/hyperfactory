import { OdooService } from './odoo'
import { RateLimiter } from './rate-limiter'

export class EmailCleanupService {
  private static instance: EmailCleanupService | null = null
  private odooService: OdooService
  private isRunning = false

  private constructor() {
    this.odooService = new OdooService()
  }

  static getInstance(): EmailCleanupService {
    if (!EmailCleanupService.instance) {
      EmailCleanupService.instance = new EmailCleanupService()
    }
    return EmailCleanupService.instance
  }

  // Perform cleanup check against Odoo database
  async performCleanup(): Promise<{
    checked: number
    removed: number
    errors: number
  }> {
    if (this.isRunning) {
      console.log('Email cleanup already running, skipping...')
      return { checked: 0, removed: 0, errors: 0 }
    }

    this.isRunning = true
    let checked = 0
    let removed = 0
    let errors = 0

    try {
      console.log('Starting email cleanup process...')
      
      // Get emails that need to be checked against Odoo
      const emailsToCheck = RateLimiter.getEmailsForOdooCheck()
      
      if (emailsToCheck.length === 0) {
        console.log('No emails need cleanup checking')
        return { checked: 0, removed: 0, errors: 0 }
      }

      console.log(`Checking ${emailsToCheck.length} emails against Odoo database...`)

      // Check all emails in batch
      const leadExistenceMap = await this.odooService.checkMultipleHyperFactoryLeads(emailsToCheck)
      
      for (const email of emailsToCheck) {
        try {
          checked++
          const leadExists = leadExistenceMap.get(email)
          
          if (leadExists === false) {
            // Lead no longer exists in Odoo, remove from our tracking
            RateLimiter.removeEmailSubmission(email)
            removed++
            console.log(`Removed email tracking for ${email} - lead no longer exists in Odoo`)
          } else {
            // Lead still exists, update last checked time
            RateLimiter.updateEmailLastChecked(email)
          }
        } catch (error) {
          errors++
          console.error(`Error checking email ${email}:`, error)
          // Update last checked time even on error to prevent constant retries
          RateLimiter.updateEmailLastChecked(email)
        }
      }

      console.log(`Email cleanup completed: ${checked} checked, ${removed} removed, ${errors} errors`)
      
    } catch (error) {
      console.error('Email cleanup process failed:', error)
      errors++
    } finally {
      this.isRunning = false
    }

    return { checked, removed, errors }
  }

  // Get cleanup status
  getStatus(): {
    isRunning: boolean
    stats: {
      totalEmailSubmissions: number
      emailsNeedingOdooCheck: number
      rateLimitEntries: number
    }
  } {
    return {
      isRunning: this.isRunning,
      stats: RateLimiter.getCleanupStats()
    }
  }

  // Force cleanup for a specific email (useful for testing)
  async forceCleanupEmail(email: string): Promise<boolean> {
    try {
      const lead = await this.odooService.findExistingHyperFactoryLead(email)
      
      if (!lead) {
        RateLimiter.removeEmailSubmission(email)
        console.log(`Force removed email tracking for ${email}`)
        return true
      } else {
        RateLimiter.updateEmailLastChecked(email)
        console.log(`Email ${email} still has active lead in Odoo`)
        return false
      }
    } catch (error) {
      console.error(`Error force cleaning email ${email}:`, error)
      return false
    }
  }
}

// Start periodic cleanup process (every 6 hours)
const CLEANUP_INTERVAL = 6 * 60 * 60 * 1000 // 6 hours

let cleanupInterval: NodeJS.Timeout | null = null

export function startEmailCleanupProcess() {
  if (cleanupInterval) {
    return // Already started
  }

  const cleanupService = EmailCleanupService.getInstance()
  
  // Run initial cleanup after 5 minutes
  setTimeout(() => {
    cleanupService.performCleanup().catch(error => {
      console.error('Initial email cleanup failed:', error)
    })
  }, 5 * 60 * 1000)

  // Set up periodic cleanup
  cleanupInterval = setInterval(() => {
    cleanupService.performCleanup().catch(error => {
      console.error('Periodic email cleanup failed:', error)
    })
  }, CLEANUP_INTERVAL)

  console.log('Email cleanup process started - will run every 6 hours')
}

export function stopEmailCleanupProcess() {
  if (cleanupInterval) {
    clearInterval(cleanupInterval)
    cleanupInterval = null
    console.log('Email cleanup process stopped')
  }
}

// Auto-start in server environment
if (typeof window === 'undefined' && process.env.NODE_ENV !== 'test') {
  startEmailCleanupProcess()
}
