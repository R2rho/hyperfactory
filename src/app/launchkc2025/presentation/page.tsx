'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import HyperfactorySlides from '../../../hyperfactory_slides_black_gold_react'

export default function LaunchKCPresentation() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/launchkc-auth')
        const data = await response.json()

        if (!data.authenticated) {
          router.push('/launchkc2025')
          return
        }

        setIsAuthenticated(true)
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/launchkc2025')
      }
    }

    checkAuth()
  }, [router])

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Verifying access...</div>
      </div>
    )
  }

  // Show presentation if authenticated
  if (isAuthenticated) {
    return <HyperfactorySlides />
  }

  // This shouldn't be reached due to redirect, but just in case
  return null
}
