import { OdooClient } from '@tapni/odoo-xmlrpc'
import './env' // Validate environment variables

// Odoo client configuration
const odooConfig = {
  url: process.env.ODOO_DB_URL!,
  db: process.env.ODOO_DB_NAME!,
  username: process.env.ODOO_EMAIL!,
  password: process.env.ODOO_API_KEY!,
}

// Create singleton Odoo client
let odooClient: OdooClient | null = null

export function getOdooClient(): OdooClient {
  if (!odooClient) {
    console.log(`[ODOO-CLIENT] Creating new Odoo client with config:`, {
      url: odooConfig.url,
    })
    odooClient = new OdooClient(odooConfig)
    console.log(`[ODOO-CLIENT] Odoo client created successfully`)
  }
  return odooClient
}

// Types for our CRM operations
export interface WaitlistSubmission {
  name: string
  email: string
  phone?: string
  company?: string
}

export interface OdooLead {
  id: number
  name: string
  email_from: string
  phone?: string
  partner_name?: string
  tag_ids: number[]
  team_id: number
}

export interface OdooPartner {
  id: number
  name: string
  email: string
  phone?: string
  is_company: boolean
}

export interface OdooTag {
  id: number
  name: string
  color: number
}

export interface OdooTeam {
  id: number
  name: string
  alias_name: string
}

// Utility functions for Odoo operations
export class OdooService {
  private client: OdooClient

  constructor() {
    console.log(`[ODOO-SERVICE] Initializing OdooService`)
    this.client = getOdooClient()
    console.log(`[ODOO-SERVICE] OdooService initialized with client`)
  }

  // Wrapper for client.execute with enhanced logging and timeout
  private async executeWithLogging(model: string, method: string, args: any[], kwargs: any = {}, timeoutMs: number = 15000) {
    const callId = Math.random().toString(36).substring(7)
    console.log(`[ODOO-EXECUTE-${callId}] Starting: ${model}.${method} (timeout: ${timeoutMs}ms)`)
    console.log(`[ODOO-EXECUTE-${callId}] Args:`, args)
    console.log(`[ODOO-EXECUTE-${callId}] Kwargs:`, kwargs)

    const startTime = Date.now()
    try {
      const result = await Promise.race([
        this.client.execute(model, method, args, kwargs),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`XMLRPC call timeout after ${timeoutMs}ms`)), timeoutMs)
        )
      ])

      const duration = Date.now() - startTime
      console.log(`[ODOO-EXECUTE-${callId}] SUCCESS in ${duration}ms`)
      console.log(`[ODOO-EXECUTE-${callId}] Result:`, result)
      return result
    } catch (error) {
      const duration = Date.now() - startTime
      console.error(`[ODOO-EXECUTE-${callId}] ERROR after ${duration}ms:`, error)
      console.error(`[ODOO-EXECUTE-${callId}] Error details:`, {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : String(error)
      })
      throw error
    }
  }

  // Find or create HyperFactory tag
  async findOrCreateHyperFactoryTag(): Promise<number> {
    try {
      // Search for existing HyperFactory tag
      const existingTags = await this.client.searchRead<OdooTag>(
        'crm.tag',
        [['name', '=', 'HyperFactory']],
        { fields: ['id', 'name', 'color'] }
      )

      if (existingTags.length > 0) {
        return existingTags[0].id
      }

      // Create new HyperFactory tag with gold color (color index 3 is typically yellow/gold)
      const tagId = await this.client.create('crm.tag', {
        name: 'HyperFactory',
        color: 3, // Gold/yellow color
      })

      return tagId
    } catch (error) {
      console.error('Error finding/creating HyperFactory tag:', error)
      throw new Error('Failed to create HyperFactory tag')
    }
  }

  // Find or create HyperFactory Waitlist sales team
  async findOrCreateHyperFactoryTeam(): Promise<number> {
    try {
      // Search for existing HyperFactory Waitlist team
      const existingTeams = await this.client.searchRead<OdooTeam>(
        'crm.team',
        [['name', '=', 'HyperFactory Waitlist']],
        { fields: ['id', 'name', 'alias_name'] }
      )

      if (existingTeams.length > 0) {
        return existingTeams[0].id
      }

      // Create new HyperFactory Waitlist sales team
      const teamId = await this.client.create('crm.team', {
        name: 'HyperFactory Waitlist',
        alias_name: 'hyperfactory-waitlist',
        alias_domain: 'vertec.com',
      })

      return teamId
    } catch (error) {
      console.error('Error finding/creating HyperFactory team:', error)
      throw new Error('Failed to create HyperFactory sales team')
    }
  }

  // Find existing lead by email
  async findExistingLead(email: string): Promise<OdooLead | null> {
    try {
      const leads = await this.client.searchRead<OdooLead>(
        'crm.lead',
        [['email_from', '=', email]],
        {
          fields: ['id', 'name', 'email_from', 'phone', 'partner_name', 'tag_ids', 'team_id'],
          limit: 1
        }
      )

      return leads.length > 0 ? leads[0] : null
    } catch (error) {
      console.error('Error finding existing lead:', error)
      throw new Error('Failed to search for existing lead')
    }
  }

  // Find existing HyperFactory lead by email (checks for HyperFactory tag)
  async findExistingHyperFactoryLead(email: string): Promise<OdooLead | null> {
    try {
      // First get the HyperFactory tag ID
      const tagId = await this.findOrCreateHyperFactoryTag()

      // Search for leads with this email AND the HyperFactory tag
      const leads = await this.client.searchRead<OdooLead>(
        'crm.lead',
        [
          ['email_from', '=', email],
          ['tag_ids', 'in', [tagId]]
        ],
        {
          fields: ['id', 'name', 'email_from', 'phone', 'partner_name', 'tag_ids', 'team_id'],
          limit: 1
        }
      )

      return leads.length > 0 ? leads[0] : null
    } catch (error) {
      console.error('Error finding existing HyperFactory lead:', error)
      throw new Error('Failed to search for existing HyperFactory lead')
    }
  }

  // Check multiple emails for existing HyperFactory leads
  async checkMultipleHyperFactoryLeads(emails: string[]): Promise<Map<string, boolean>> {
    const results = new Map<string, boolean>()

    if (emails.length === 0) {
      return results
    }

    try {
      // Get the HyperFactory tag ID
      const tagId = await this.findOrCreateHyperFactoryTag()

      // Search for all leads with these emails AND the HyperFactory tag
      const leads = await this.client.searchRead<OdooLead>(
        'crm.lead',
        [
          ['email_from', 'in', emails],
          ['tag_ids', 'in', [tagId]]
        ],
        {
          fields: ['email_from'],
        }
      )

      // Mark emails that have existing leads
      const existingEmails = new Set(leads.map(lead => lead.email_from.toLowerCase()))

      for (const email of emails) {
        results.set(email, existingEmails.has(email.toLowerCase()))
      }

      return results
    } catch (error) {
      console.error('Error checking multiple HyperFactory leads:', error)
      // If there's an error, assume all emails don't exist (safer for re-submission)
      for (const email of emails) {
        results.set(email, false)
      }
      return results
    }
  }

  // Find or create contact (partner)
  async findOrCreatePartner(submission: WaitlistSubmission): Promise<number> {
    try {
      // Search for existing partner by email
      const existingPartners = await this.client.searchRead<OdooPartner>(
        'res.partner',
        [['email', '=', submission.email]],
        { fields: ['id', 'name', 'email', 'phone', 'is_company'] }
      )

      if (existingPartners.length > 0) {
        const partner = existingPartners[0]
        // Update partner with any new information
        await this.client.write('res.partner', [partner.id], {
          name: submission.name,
          phone: submission.phone || partner.phone,
        })
        return partner.id
      }

      // Create new partner
      const partnerId = await this.client.create('res.partner', {
        name: submission.name,
        email: submission.email,
        phone: submission.phone,
        is_company: false,
        category_id: [], // Individual contact
      })

      return partnerId
    } catch (error) {
      console.error('Error finding/creating partner:', error)
      throw new Error('Failed to create contact record')
    }
  }

  // Create new lead
  async createLead(submission: WaitlistSubmission, partnerId: number, tagId: number, teamId: number): Promise<number> {
    try {
      const leadData = {
        name: `HyperFactory Waitlist - ${submission.name}`,
        email_from: submission.email,
        phone: submission.phone,
        partner_id: partnerId, // This is the CUSTOMER/CONTACT, not salesperson
        partner_name: submission.name,
        tag_ids: [[6, 0, [tagId]]], // Many2many field format: [(6, 0, [ids])]
        team_id: teamId,
        type: 'lead',
        // stage_id: 1, // Let Odoo auto-assign the initial stage
        description: `Waitlist submission from HyperFactory website.${submission.company ? `\nCompany: ${submission.company}` : ''}`,
        // user_id: false, // Don't set salesperson - let Odoo auto-assign or leave empty
        // source_id: false, // Let Odoo handle source assignment
      }

      const leadId = await this.client.create('crm.lead', leadData)
      return leadId
    } catch (error) {
      console.error('Error creating lead:', error)
      throw new Error('Failed to create lead')
    }
  }

  // Send welcome email using Odoo email template
  async sendWelcomeEmail(leadId: number): Promise<void> {
    const startTime = Date.now()
    console.log(`[EMAIL] Starting sendWelcomeEmail for lead ${leadId} at ${new Date().toISOString()}`)

    try {
      // Environment check
      console.log(`[EMAIL] Environment: ${process.env.NODE_ENV}`)
      console.log(`[EMAIL] Vercel deployment: ${process.env.VERCEL ? 'YES' : 'NO'}`)
      console.log(`[EMAIL] Odoo URL: ${process.env.ODOO_DB_URL?.substring(0, 20)}...`)

      // First, find or create the email template
      console.log(`[EMAIL] Finding/creating email template...`)
      const templateId = await this.findOrCreateEmailTemplate()
      console.log(`[EMAIL] Template ID: ${templateId}`)

      // Get lead details for debugging
      console.log(`[EMAIL] Fetching lead details for ID ${leadId}...`)
      const leadDetails = await this.client.searchRead<OdooLead>(
        'crm.lead',
        [['id', '=', leadId]],
        { fields: ['id', 'name', 'email_from', 'partner_id'], limit: 1 }
      )

      if (leadDetails.length === 0) {
        console.error(`[EMAIL] ERROR: Lead ${leadId} not found for email sending`)
        return
      }

      const lead = leadDetails[0]
      console.log(`[EMAIL] Lead details:`, {
        id: lead.id,
        name: lead.name,
        email_from: lead.email_from,
      })

      if (!lead.email_from || !lead.email_from.includes('@')) {
        console.error(`[EMAIL] ERROR: Invalid email address for lead ${leadId}: ${lead.email_from}`)
        return
      }

      // Check template details before sending
      console.log(`[EMAIL] Verifying template configuration...`)
      const templateDetails = await this.client.searchRead<any>(
        'mail.template',
        [['id', '=', templateId]],
        {
          fields: ['id', 'name', 'subject', 'email_from', 'use_default_to', 'email_to', 'partner_to', 'model_id'],
          limit: 1
        }
      )

      if (templateDetails.length > 0) {
        console.log(`[EMAIL] Template configuration:`, templateDetails[0])
      } else {
        console.error(`[EMAIL] ERROR: Template ${templateId} not found`)
        return
      }

      // Send email using the template with default recipients
      console.log(`[EMAIL] Executing send_mail with templateId=${templateId}, leadId=${leadId}`)

      const result = await this.executeWithLogging(
        'mail.template',
        'send_mail',
        [templateId, leadId],
        {
          force_send: true,
          raise_exception: false, // Don't break lead creation if email fails
        }
      )

      console.log(`[EMAIL] send_mail result:`, result)
      console.log(`[EMAIL] Result type: ${typeof result}, truthy: ${!!result}`)

      // Additional verification - check if email was actually queued/sent
      if (result) {
        console.log(`[EMAIL] SUCCESS: Email queued/sent for lead ${leadId} to ${lead.email_from}`)

        // Wait a moment and then verify the email was created
        setTimeout(async () => {
          try {
            const verification = await this.verifyEmailSent(leadId)
            console.log(`[EMAIL] Post-send verification:`, verification)
          } catch (verifyError) {
            console.error(`[EMAIL] Error in post-send verification:`, verifyError)
          }
        }, 1000)

      } else {
        console.warn(`[EMAIL] WARNING: send_mail returned falsy result for lead ${leadId}`)
        console.warn(`[EMAIL] This might indicate the email was not queued properly`)
      }

      const totalDuration = Date.now() - startTime
      console.log(`[EMAIL] sendWelcomeEmail completed in ${totalDuration}ms`)

    } catch (error) {
      const totalDuration = Date.now() - startTime
      console.error(`[EMAIL] ERROR in sendWelcomeEmail after ${totalDuration}ms:`, error)
      console.error(`[EMAIL] Error details:`, {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      })
      // Don't throw error here as lead creation should succeed even if email fails
    }
  }



  // Find or create email template
  async findOrCreateEmailTemplate(): Promise<number> {
    console.log(`[EMAIL-TEMPLATE] Starting findOrCreateEmailTemplate`)

    try {
      // Search for existing template
      console.log(`[EMAIL-TEMPLATE] Searching for existing template 'HyperFactory Waitlist Welcome'`)
      const searchStartTime = Date.now()

      const existingTemplates = await this.client.searchRead<{id: number, name: string}>(
        'mail.template',
        [['name', '=', 'HyperFactory Waitlist Welcome']],
        { fields: ['id', 'name'] }
      )

      const searchDuration = Date.now() - searchStartTime
      console.log(`[EMAIL-TEMPLATE] Template search completed in ${searchDuration}ms`)
      console.log(`[EMAIL-TEMPLATE] Found ${existingTemplates.length} existing templates`)

      if (existingTemplates.length > 0) {
        console.log(`[EMAIL-TEMPLATE] Found existing template with ID: ${existingTemplates[0].id}`)
        return existingTemplates[0].id
      }

      console.log(`[EMAIL-TEMPLATE] No existing template found, creating new one`)

      // Get model ID first
      console.log(`[EMAIL-TEMPLATE] Getting model ID for 'crm.lead'`)
      const modelId = await this.getModelId('crm.lead')
      console.log(`[EMAIL-TEMPLATE] Model ID for crm.lead: ${modelId}`)

      // Create new email template
      const templateData = {
        name: 'HyperFactory Waitlist Welcome',
        model_id: modelId,
        subject: 'Welcome to the HyperFactory Waitlist! 🚀',
        body_html: this.getEmailTemplateHTML(),
        email_from: 'HyperFactory <waitlist@vertec.com>',
        use_default_to: true, // Uses default recipients logic
        auto_delete: false,
        // Explicitly set email_to to use the lead's email_from field
        email_to: '${object.email_from}',
        // Also set partner_to to use the partner if available
        partner_to: '${object.partner_id.id if object.partner_id else ""}',
      }

      console.log(`[EMAIL-TEMPLATE] Creating template with data:`, {
        name: templateData.name,
        model_id: templateData.model_id,
        subject: templateData.subject,
        email_from: templateData.email_from,
        use_default_to: templateData.use_default_to,
        email_to: templateData.email_to,
        partner_to: templateData.partner_to,
        body_html_length: templateData.body_html.length
      })

      const templateId = await this.client.create('mail.template', templateData)
      console.log(`[EMAIL-TEMPLATE] Successfully created template with ID: ${templateId}`)

      return templateId
    } catch (error) {
      console.error('[EMAIL-TEMPLATE] Error finding/creating email template:', error)
      console.error('[EMAIL-TEMPLATE] Error details:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      })
      throw new Error('Failed to create email template')
    }
  }

  // Get model ID for email template
  private async getModelId(modelName: string): Promise<number> {
    const models = await this.client.searchRead<{id: number}>(
      'ir.model',
      [['model', '=', modelName]],
      { fields: ['id'], limit: 1 }
    )

    if (models.length === 0) {
      throw new Error(`Model ${modelName} not found`)
    }

    return models[0].id
  }

  // Email template HTML content
  private getEmailTemplateHTML(): string {
    // Use a regular string instead of template literal to avoid JavaScript parsing issues
    // The Odoo template syntax will be processed by Odoo, not JavaScript
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to HyperFactory Waitlist</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Roboto', Arial, sans-serif; background-color: #f8fafc;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background-color: #0a0a0a; padding: 40px 30px; text-align: center;">
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                <span style="font-size: 48px; font-weight: 900; font-style: italic; color: #d1d5db; user-select: none; font-family: 'Roboto', system-ui, sans-serif; transform: skew(-14deg) scaleX(0.92); letter-spacing: -1.44px; text-transform: uppercase;">
                    HYPERFACTORY
                </span>
            </div>
            <h1 style="color: #ffffff; font-size: 28px; font-weight: 900; margin: 0; text-transform: uppercase; letter-spacing: -0.5px;">
                Welcome to the Future!
            </h1>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
            <h2 style="color: #1f2937; font-size: 24px; font-weight: 700; margin: 0 0 20px 0;">
                Hi <t t-out="object.partner_id.name">there</t>,
            </h2>

            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for joining the <strong>HyperFactory waitlist</strong>! You're now part of an exclusive group that will be among the first to experience the revolutionary future of AI-powered smart manufacturing.
            </p>

            <div style="background-color: #f3f4f6; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0;">
                <h3 style="color: #1f2937; font-size: 18px; font-weight: 600; margin: 0 0 10px 0;">
                    What's Next?
                </h3>
                <ul style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                    <li>We'll keep you updated on our progress</li>
                    <li>You'll get early access when we launch</li>
                    <li>Exclusive previews of our technologies</li>
                    <li>Special launch pricing and offers</li>
                </ul>
            </div>

            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0;">
                We're working hard to bring you the ultimate platform for <strong>Smart Manufacturing</strong>.
            </p>

            <div style="text-align: center; margin: 40px 0;">
                <a href="https://hyperfactory.com" style="display: inline-block; background-color: #3b82f6; color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                    Visit Our Website
                </a>
            </div>

            <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 30px 0 0 0;">
                Questions? Just reply to this email - we'd love to hear from you!
            </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0 0 10px 0;">
                © 2024 HyperFactory by Vertec. All rights reserved.
            </p>
            <p style="color: #9ca3af; font-size: 11px; margin: 0;">
                Revitalize American manufacturing, reindustrialize our production capacity
            </p>
        </div>
    </div>
</body>
</html>`

    return htmlContent.trim()
  }

  // Verify if email was sent for a lead
  async verifyEmailSent(leadId: number): Promise<{sent: boolean, details?: any}> {
    try {
      // Check for mail.mail records related to this lead
      const mailRecords = await this.client.searchRead<any>(
        'mail.mail',
        [
          ['res_id', '=', leadId],
          ['model', '=', 'crm.lead']
        ],
        {
          fields: ['id', 'subject', 'email_to', 'state', 'failure_reason', 'date'],
          order: 'date desc',
          limit: 5
        }
      )

      if (mailRecords.length > 0) {
        console.log(`Found ${mailRecords.length} email records for lead ${leadId}:`, mailRecords)
        return {
          sent: true,
          details: mailRecords
        }
      } else {
        console.log(`No email records found for lead ${leadId}`)
        return { sent: false }
      }
    } catch (error) {
      console.error('Error verifying email sent:', error)
      return { sent: false }
    }
  }

  // Test email template by sending to a specific email
  async testEmailTemplate(testEmail: string): Promise<boolean> {
    try {
      // Create a temporary test lead
      const testLead = {
        name: 'Test Email Template',
        email_from: testEmail,
        type: 'lead',
        description: 'Temporary lead for testing email template - can be deleted'
      }

      const testLeadId = await this.client.create('crm.lead', testLead)
      console.log(`Created test lead ${testLeadId} for email testing`)

      // Send email to test lead
      await this.sendWelcomeEmail(testLeadId)

      // Wait a moment then verify
      await new Promise(resolve => setTimeout(resolve, 2000))
      const verification = await this.verifyEmailSent(testLeadId)

      // Clean up test lead
      await this.client.unlink('crm.lead', [testLeadId])
      console.log(`Cleaned up test lead ${testLeadId}`)

      return verification.sent
    } catch (error) {
      console.error('Error testing email template:', error)
      return false
    }
  }

  // Check Odoo email configuration
  async checkEmailConfiguration(): Promise<any> {
    console.log(`[EMAIL-CONFIG] Checking Odoo email configuration`)

    try {
      // Check mail servers
      const mailServers = await this.client.searchRead<any>(
        'ir.mail_server',
        [],
        {
          fields: ['id', 'name', 'smtp_host', 'smtp_port', 'smtp_user', 'smtp_authentication', 'smtp_encryption'],
          limit: 10
        }
      )

      console.log(`[EMAIL-CONFIG] Found ${mailServers.length} mail servers:`, mailServers)

      // Check system parameters related to email
      // We'll make separate calls since the OR syntax is causing TypeScript issues
      const mailParams = await this.client.searchRead<any>(
        'ir.config_parameter',
        [['key', 'like', 'mail%']],
        { fields: ['key', 'value'], limit: 10 }
      )

      const emailParams = await this.client.searchRead<any>(
        'ir.config_parameter',
        [['key', 'like', 'email%']],
        { fields: ['key', 'value'], limit: 10 }
      )

      const smtpParams = await this.client.searchRead<any>(
        'ir.config_parameter',
        [['key', 'like', 'smtp%']],
        { fields: ['key', 'value'], limit: 10 }
      )

      const allEmailParams = [...mailParams, ...emailParams, ...smtpParams]

      console.log(`[EMAIL-CONFIG] Email-related system parameters:`, allEmailParams)

      // Check if there are any failed emails in the queue
      const failedEmails = await this.client.searchRead<any>(
        'mail.mail',
        [['state', '=', 'exception']],
        {
          fields: ['id', 'subject', 'email_to', 'failure_reason', 'date'],
          limit: 10,
          order: 'date desc'
        }
      )

      console.log(`[EMAIL-CONFIG] Recent failed emails:`, failedEmails)

      return {
        mailServers,
        emailParams: allEmailParams,
        failedEmails,
        hasMailServer: mailServers.length > 0,
        hasFailedEmails: failedEmails.length > 0
      }
    } catch (error) {
      console.error('[EMAIL-CONFIG] Error checking email configuration:', error)
      return { error: error instanceof Error ? error.message : String(error) }
    }
  }
}
