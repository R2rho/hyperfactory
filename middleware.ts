import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Only protect the presentation route
  if (request.nextUrl.pathname === '/launchkc2025/presentation') {
    // Check if user has valid session
    const hasValidSession = request.cookies.get('launchkc-access')?.value === 'verified'
    
    if (!hasValidSession) {
      // Redirect to access code page
      return NextResponse.redirect(new URL('/launchkc2025', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/launchkc2025/presentation'
}
