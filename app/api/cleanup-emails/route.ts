import { NextRequest, NextResponse } from 'next/server'
import { EmailCleanupService } from '@/lib/email-cleanup'

// GET - Get cleanup status
export async function GET(request: NextRequest) {
  // Only allow in development or with proper auth
  if (process.env.NODE_ENV === 'production') {
    // In production, you might want to add authentication here
    const authHeader = request.headers.get('authorization')
    if (!authHeader || authHeader !== `Bearer ${process.env.CLEANUP_API_KEY}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }

  try {
    const cleanupService = EmailCleanupService.getInstance()
    const status = cleanupService.getStatus()
    
    return NextResponse.json({
      success: true,
      ...status
    })
  } catch (error) {
    console.error('Error getting cleanup status:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get cleanup status'
      },
      { status: 500 }
    )
  }
}

// POST - Trigger manual cleanup
export async function POST(request: NextRequest) {
  // Only allow in development or with proper auth
  if (process.env.NODE_ENV === 'production') {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || authHeader !== `Bearer ${process.env.CLEANUP_API_KEY}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }

  try {
    const body = await request.json().catch(() => ({}))
    const cleanupService = EmailCleanupService.getInstance()
    
    // Check if this is a force cleanup for specific email
    if (body.email && body.force === true) {
      const removed = await cleanupService.forceCleanupEmail(body.email)
      return NextResponse.json({
        success: true,
        action: 'force_cleanup',
        email: body.email,
        removed: removed
      })
    }
    
    // Perform full cleanup
    const result = await cleanupService.performCleanup()
    
    return NextResponse.json({
      success: true,
      action: 'full_cleanup',
      ...result
    })
  } catch (error) {
    console.error('Error performing cleanup:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to perform cleanup'
      },
      { status: 500 }
    )
  }
}

// DELETE - Force remove specific email from tracking
export async function DELETE(request: NextRequest) {
  // Only allow in development or with proper auth
  if (process.env.NODE_ENV === 'production') {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || authHeader !== `Bearer ${process.env.CLEANUP_API_KEY}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }

  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    const cleanupService = EmailCleanupService.getInstance()
    const removed = await cleanupService.forceCleanupEmail(email)
    
    return NextResponse.json({
      success: true,
      action: 'force_remove',
      email: email,
      removed: removed
    })
  } catch (error) {
    console.error('Error force removing email:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to remove email'
      },
      { status: 500 }
    )
  }
}
