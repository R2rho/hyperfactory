import { NextRequest, NextResponse } from 'next/server'
import { getOdooClient } from '@/lib/odoo'

export async function GET(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not available in production' },
      { status: 404 }
    )
  }

  try {
    const client = getOdooClient()
    
    // Test connection by getting version
    const version = await client.version()
    
    // Test authentication
    const uid = await client.authenticate()
    
    return NextResponse.json({
      success: true,
      version: version,
      authenticated: !!uid,
      uid: uid,
      config: {
        url: process.env.ODOO_DB_URL,
        db: process.env.ODOO_DB_NAME,
        username: process.env.ODOO_EMAIL,
        // Don't expose the API key
      }
    })
  } catch (error) {
    console.error('Odoo connection test failed:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
