import { NextRequest, NextResponse } from 'next/server'

const VALID_ACCESS_CODE = 'lkc2025vertec'

export async function POST(request: NextRequest) {
  try {
    const { accessCode } = await request.json()

    // Validate access code
    if (!accessCode || accessCode.toLowerCase() !== VALID_ACCESS_CODE) {
      return NextResponse.json(
        { success: false, error: 'Invalid access code' },
        { status: 401 }
      )
    }

    // Create response with success
    const response = NextResponse.json({ success: true })

    // Set secure authentication cookie
    response.cookies.set('launchkc-access', 'verified', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/'
    })

    return response
  } catch (error) {
    console.error('LaunchKC auth error:', error)
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

// GET endpoint to check auth status
export async function GET(request: NextRequest) {
  const hasValidSession = request.cookies.get('launchkc-access')?.value === 'verified'

  return NextResponse.json({
    authenticated: hasValidSession
  })
}

// DELETE endpoint to logout (clear auth cookie)
export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true, message: 'Logged out' })

  // Clear the authentication cookie
  response.cookies.set('launchkc-access', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0, // Expire immediately
    path: '/'
  })

  return response
}
