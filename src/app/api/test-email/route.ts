import { NextRequest, NextResponse } from 'next/server'
import { OdooService } from '@/lib/odoo'

export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not available in production' },
      { status: 404 }
    )
  }

  try {
    const { email, action } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const odooService = new OdooService()

    switch (action) {
      case 'test-template':
        // Test the email template by sending to the provided email
        const testResult = await odooService.testEmailTemplate(email)
        return NextResponse.json({
          success: true,
          templateTested: testResult,
          message: testResult 
            ? 'Email template test successful - check your inbox!' 
            : 'Email template test failed - check server logs'
        })

      case 'verify-lead':
        // Find existing lead and verify if email was sent
        const existingLead = await odooService.findExistingHyperFactoryLead(email)
        if (!existingLead) {
          return NextResponse.json({
            success: false,
            error: 'No HyperFactory lead found for this email'
          })
        }

        const verification = await odooService.verifyEmailSent(existingLead.id)
        return NextResponse.json({
          success: true,
          leadId: existingLead.id,
          emailSent: verification.sent,
          emailDetails: verification.details,
          message: verification.sent 
            ? 'Email records found for this lead' 
            : 'No email records found for this lead'
        })

      case 'check-template':
        // Check if email template exists and get its details
        const templateId = await odooService.findOrCreateEmailTemplate()

        // Get template details
        const templateDetails = await odooService['client'].searchRead<any>(
          'mail.template',
          [['id', '=', templateId]],
          {
            fields: ['id', 'name', 'subject', 'email_from', 'use_default_to', 'email_to', 'partner_to'],
            limit: 1
          }
        )

        return NextResponse.json({
          success: true,
          templateId,
          templateDetails: templateDetails[0] || null,
          message: 'Email template details retrieved'
        })

      case 'check-config':
        // Check Odoo email configuration
        const emailConfig = await odooService.checkEmailConfiguration()
        return NextResponse.json({
          success: true,
          emailConfig,
          message: 'Email configuration retrieved'
        })

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: test-template, verify-lead, check-template, or check-config' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Email test error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not available in production' },
      { status: 404 }
    )
  }

  return NextResponse.json({
    success: true,
    message: 'Email testing endpoint',
    usage: {
      'POST with action: test-template': 'Send test email to specified address',
      'POST with action: verify-lead': 'Check if email was sent for existing lead',
      'POST with action: check-template': 'Get email template details',
      'POST with action: check-config': 'Check Odoo email server configuration'
    },
    example: {
      method: 'POST',
      body: {
        email: 'test@example.com',
        action: 'test-template'
      }
    }
  })
}
