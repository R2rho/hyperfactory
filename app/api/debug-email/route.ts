import { NextRequest, NextResponse } from 'next/server'
import { OdooService } from '@/lib/odoo'

export async function POST(request: NextRequest) {
  const debugId = Math.random().toString(36).substring(7)
  console.log(`[DEBUG-EMAIL-${debugId}] Starting email debug at ${new Date().toISOString()}`)
  
  try {
    const { leadId } = await request.json()

    if (!leadId) {
      return NextResponse.json(
        { error: 'leadId is required' },
        { status: 400 }
      )
    }

    console.log(`[DEBUG-EMAIL-${debugId}] Testing email for lead ${leadId}`)
    
    const odooService = new OdooService()
    
    // Step 1: Check if lead exists
    console.log(`[DEBUG-EMAIL-${debugId}] Step 1: Checking if lead exists`)
    const leadDetails = await odooService['client'].searchRead<any>(
      'crm.lead',
      [['id', '=', leadId]],
      { fields: ['id', 'name', 'email_from', 'partner_id'], limit: 1 }
    )
    
    if (leadDetails.length === 0) {
      console.log(`[DEBUG-EMAIL-${debugId}] Lead ${leadId} not found`)
      return NextResponse.json({
        success: false,
        error: `Lead ${leadId} not found`
      })
    }
    
    console.log(`[DEBUG-EMAIL-${debugId}] Lead found:`, leadDetails[0])
    
    // Step 2: Check/create email template
    console.log(`[DEBUG-EMAIL-${debugId}] Step 2: Finding/creating email template`)
    const templateId = await odooService.findOrCreateEmailTemplate()
    console.log(`[DEBUG-EMAIL-${debugId}] Template ID: ${templateId}`)
    
    // Step 3: Get template details
    console.log(`[DEBUG-EMAIL-${debugId}] Step 3: Getting template details`)
    const templateDetails = await odooService['client'].searchRead<any>(
      'mail.template',
      [['id', '=', templateId]],
      { 
        fields: ['id', 'name', 'subject', 'email_from', 'use_default_to', 'email_to', 'partner_to'],
        limit: 1 
      }
    )
    console.log(`[DEBUG-EMAIL-${debugId}] Template details:`, templateDetails[0])
    
    // Step 4: Try to send email
    console.log(`[DEBUG-EMAIL-${debugId}] Step 4: Attempting to send email`)
    const sendResult = await odooService['client'].execute(
      'mail.template',
      'send_mail',
      [templateId, leadId],
      {
        force_send: true,
        raise_exception: true, // Let's see the actual error if any
      }
    )
    
    console.log(`[DEBUG-EMAIL-${debugId}] Send result:`, sendResult)
    
    // Step 5: Check if email was created
    console.log(`[DEBUG-EMAIL-${debugId}] Step 5: Checking if email was created`)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Wait 1 second
    
    const mailRecords = await odooService['client'].searchRead<any>(
      'mail.mail',
      [
        ['res_id', '=', leadId],
        ['model', '=', 'crm.lead']
      ],
      { 
        fields: ['id', 'subject', 'email_to', 'state', 'failure_reason', 'date'],
        order: 'date desc',
        limit: 3
      }
    )
    
    console.log(`[DEBUG-EMAIL-${debugId}] Mail records found:`, mailRecords)
    
    return NextResponse.json({
      success: true,
      debugId,
      leadDetails: leadDetails[0],
      templateId,
      templateDetails: templateDetails[0],
      sendResult,
      mailRecords,
      message: 'Debug completed successfully'
    })

  } catch (error) {
    console.error(`[DEBUG-EMAIL-${debugId}] Error:`, error)
    console.error(`[DEBUG-EMAIL-${debugId}] Error details:`, {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    })
    
    return NextResponse.json(
      { 
        success: false, 
        debugId,
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'Email debug endpoint',
    usage: 'POST with { "leadId": 54 } to debug email sending for a specific lead'
  })
}
