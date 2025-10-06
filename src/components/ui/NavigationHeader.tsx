'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

export const NavigationHeader = () => {
  const router = useRouter()
  const pathname = usePathname()

  const handleJoinWaitlist = () => {
    if (pathname === '/') {
      // If we're on the home page, just scroll to waitlist
      document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // If we're on another page, navigate to home then scroll
      router.push('/')
      setTimeout(() => {
        document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10"
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img src="/vertec.png" alt="Vertec" className="h-8 w-8 object-contain" />
          <span className="text-xl font-alliance font-bold tracking-wide">
            <span className="text-white">HYPER</span>
            <span className="text-yellow-600">FACTORY</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/learnmore" className="text-gray-300 hover:text-yellow-600 transition-colors duration-300">
            Learn More
          </Link>
          <button
            onClick={handleJoinWaitlist}
            className="text-gray-300 hover:text-yellow-600 transition-colors duration-300"
          >
            Join Waitlist
          </button>
          {/* <Link
            href="/learnmore"
            className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-700 hover:to-amber-600 rounded-lg font-semibold text-black transition-all duration-300"
          >
            Get Started
          </Link> */}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </motion.header>
  );
};
