import { NextRequest, NextResponse } from 'next/server'
import { OdooService, WaitlistSubmission } from '@/lib/odoo'
import { RateLimiter } from '@/lib/rate-limiter'
import '@/lib/email-cleanup' // Import to ensure cleanup service starts

// Helper function to get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const remoteAddr = request.headers.get('x-vercel-forwarded-for')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  if (remoteAddr) {
    return remoteAddr.split(',')[0].trim()
  }
  
  return 'unknown'
}

// Helper function to get headers as object
function getHeaders(request: NextRequest): Record<string, string> {
  const headers: Record<string, string> = {}
  request.headers.forEach((value, key) => {
    headers[key] = value
  })
  return headers
}

export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(7)
  console.log(`[WAITLIST-${requestId}] Starting waitlist submission at ${new Date().toISOString()}`)

  try {
    // Get client information
    const clientIP = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || ''
    const headers = getHeaders(request)

    // Bot detection
    if (RateLimiter.detectBot(userAgent, headers)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid request',
          code: 'BOT_DETECTED'
        },
        { status: 400 }
      )
    }

    // Rate limiting check
    const rateLimitResult = RateLimiter.isRateLimited(clientIP)
    if (rateLimitResult.limited) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Too many requests. Please try again in ${rateLimitResult.retryAfter} seconds.`,
          code: 'RATE_LIMITED',
          retryAfter: rateLimitResult.retryAfter
        },
        { 
          status: 429,
          headers: {
            'Retry-After': rateLimitResult.retryAfter?.toString() || '900'
          }
        }
      )
    }

    // Parse request body
    let body: WaitlistSubmission
    try {
      body = await request.json()
    } catch (error) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid JSON in request body',
          code: 'INVALID_JSON'
        },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Name and email are required',
          code: 'MISSING_REQUIRED_FIELDS'
        },
        { status: 400 }
      )
    }

    // Validate email format
    if (!RateLimiter.isValidEmail(body.email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format',
          code: 'INVALID_EMAIL'
        },
        { status: 400 }
      )
    }

    // Validate name
    if (!RateLimiter.isValidName(body.name)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid name format',
          code: 'INVALID_NAME'
        },
        { status: 400 }
      )
    }

    // Check if email already submitted
    if (RateLimiter.hasEmailBeenSubmitted(body.email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'You are already on our waitlist! We\'ll be in touch soon.',
          code: 'ALREADY_SUBMITTED',
          message: 'Thank you for your interest! You\'re already registered for early access.'
        },
        { status: 409 }
      )
    }

    // Record the attempt for rate limiting
    RateLimiter.recordAttempt(clientIP)

    // Initialize Odoo service
    console.log(`[WAITLIST-${requestId}] Initializing Odoo service for ${body.email}`)
    const odooService = new OdooService()

    // Check if HyperFactory lead already exists in Odoo
    const existingLead = await odooService.findExistingHyperFactoryLead(body.email)
    if (existingLead) {
      // Record email submission to prevent duplicates
      RateLimiter.recordEmailSubmission(body.email)

      return NextResponse.json(
        {
          success: false,
          error: 'You are already on our waitlist! We\'ll be in touch soon.',
          code: 'ALREADY_EXISTS',
          message: 'Thank you for your interest! You\'re already registered for early access.'
        },
        { status: 409 }
      )
    }

    // Create/find required Odoo records
    const [tagId, teamId] = await Promise.all([
      odooService.findOrCreateHyperFactoryTag(),
      odooService.findOrCreateHyperFactoryTeam()
    ])

    // Create/find partner (contact)
    const partnerId = await odooService.findOrCreatePartner(body)

    // Create lead
    console.log(`[WAITLIST] Creating lead for ${body.email}`)
    const leadId = await odooService.createLead(body, partnerId, tagId, teamId)
    console.log(`[WAITLIST] Lead created with ID: ${leadId}`)

    // Send welcome email - let's wait for it to complete or timeout
    console.log(`[WAITLIST-${requestId}] Triggering welcome email for lead ${leadId}`)

    try {
      // Wait for email sending with a timeout
      const emailResult = await Promise.race([
        odooService.sendWelcomeEmail(leadId),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Email timeout after 10 seconds')), 10000)
        )
      ])

      console.log(`[WAITLIST-${requestId}] Email sending completed successfully for lead ${leadId}`)
    } catch (emailError) {
      console.error(`[WAITLIST-${requestId}] Email sending failed or timed out:`, emailError)
      console.error(`[WAITLIST-${requestId}] Email error details:`, {
        leadId,
        email: body.email,
        name: body.name,
        error: emailError instanceof Error ? emailError.message : String(emailError),
        stack: emailError instanceof Error ? emailError.stack : undefined
      })
      // Continue with success response even if email fails
    }

    // Record successful email submission
    RateLimiter.recordEmailSubmission(body.email)

    console.log(`[WAITLIST-${requestId}] Successfully completed waitlist submission for ${body.email}, leadId: ${leadId}`)

    return NextResponse.json(
      {
        success: true,
        message: 'Welcome to the HyperFactory waitlist! Check your email for confirmation.',
        leadId: leadId
      },
      { status: 201 }
    )

  } catch (error) {
    console.error(`[WAITLIST-${requestId}] Waitlist submission error:`, error)
    console.error(`[WAITLIST-${requestId}] Error details:`, {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    })
    
    // Return generic error to avoid exposing internal details
    return NextResponse.json(
      { 
        success: false, 
        error: 'An error occurred while processing your request. Please try again later.',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
