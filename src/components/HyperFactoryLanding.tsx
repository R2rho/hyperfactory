'use client'

import { useEffect } from 'react'
import { GeometricBackground } from './ui/GeometricBackground'
import { NavigationHeader } from './ui/NavigationHeader'
import { HeroSection } from './sections/HeroSection'
import { FeaturesSection } from './sections/FeaturesSection'
import { WaitlistSection } from './coming-soon/WaitlistSection'
import { Footer } from './ui/Footer'

export default function HyperFactoryLanding() {
  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Geometric Background */}
      <GeometricBackground />

      {/* Navigation Header */}
      <NavigationHeader />

      {/* Main Content */}
      <main >
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Waitlist Section */}
        <WaitlistSection />
        
        {/* Footer */}
        <Footer />
      </main>

      
    </div>
  );
}