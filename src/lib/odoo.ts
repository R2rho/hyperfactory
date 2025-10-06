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
    odooClient = new OdooClient(odooConfig)
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
    this.client = getOdooClient()
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
      console.error('Error checking multiple HyperPrints leads:', error)
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
    try {
      // First, find or create the email template
      const templateId = await this.findOrCreateEmailTemplate()

      console.log(`Sending welcome email for lead ${leadId} using template ${templateId}`)

      // Send email using the template with default recipients
      const result = await this.client.execute(
        'mail.template',
        'send_mail',
        [templateId, leadId],
        {
          force_send: true,
          raise_exception: false, // Don't break lead creation if email fails
        }
      )

      console.log('Email send result:', result)
    } catch (error) {
      console.error('Error sending welcome email:', error)
      // Don't throw error here as lead creation should succeed even if email fails
    }
  }



  // Find or create email template
  async findOrCreateEmailTemplate(): Promise<number> {
    try {
      // Search for existing template
      const existingTemplates = await this.client.searchRead<{id: number, name: string}>(
        'mail.template',
        [['name', '=', 'HyperFactory Waitlist Welcome']],
        { fields: ['id', 'name'] }
      )

      if (existingTemplates.length > 0) {
        return existingTemplates[0].id
      }

      // Create new email template
      const templateId = await this.client.create('mail.template', {
        name: 'HyperFactory Waitlist Welcome',
        model_id: await this.getModelId('crm.lead'),
        subject: 'Welcome to the HyperFactory Waitlist! 🚀',
        body_html: this.getEmailTemplateHTML(),
        email_from: 'HyperFactory <waitlist@vertec.com>',
        use_default_to: true, // This is the key! Uses default recipients logic
        auto_delete: false,
        // Don't set email_to or partner_to - let Odoo handle it automatically
      })

      return templateId
    } catch (error) {
      console.error('Error finding/creating email template:', error)
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
                    HYPERPRINTS
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
                    <li>Exclusive previews of our printing technologies</li>
                    <li>Special launch pricing and offers</li>
                </ul>
            </div>

            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0;">
                We're working hard to bring you the ultimate platform for <strong>DTF transfers</strong>, <strong>UV DTF</strong>, and <strong>3D printing services</strong> with lightning-fast turnaround times and industry-leading quality.
            </p>

            <div style="text-align: center; margin: 40px 0;">
                <a href="https://hyperprints.com" style="display: inline-block; background-color: #3b82f6; color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; font-size: 16px;">
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
}
