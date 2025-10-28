// Environment variable validation
export function validateEnvVars() {
  const requiredVars = [
    'ODOO_DB_URL',
    'ODOO_DB_NAME', 
    'ODOO_EMAIL',
    'ODOO_API_KEY'
  ]

  const missing = requiredVars.filter(varName => !process.env[varName])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

// Validate on module load in server environment
if (typeof window === 'undefined') {
  try {
    validateEnvVars()
  } catch (error) {
    console.error('Environment validation failed:', error)
    // Don't throw in development to allow the app to start
    if (process.env.NODE_ENV === 'production') {
      throw error
    }
  }
}
