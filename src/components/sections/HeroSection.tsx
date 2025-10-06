'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { HyperfactoryGeminiEffect } from '../gemini/GeminiEffect'

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-5 md:py-5">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-alliance font-bold mb-6 leading-tight ">
            <span className="text-white">The Future of</span><br />
            <span className="bg-gradient-to-r from-yellow-600 to-amber-500 bg-clip-text text-transparent">Smart Manufacturing</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4 font-alliance">
            Transform your factory into an intelligent, connected production system.
          </p>
        </motion.div>

        {/* Gemini Effect Diagram - Now the main hero element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mb-8"
        >
          <HyperfactoryGeminiEffect />
        </motion.div>

        {/* Mission Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="text-base sm:text-lg text-gray-400 mb-5 max-w-4xl mx-auto font-medium leading-relaxed px-4 font-serif"
        >
          Let's revitalize American manufacturing, reindustrialize our production capacity,
          and uplift communities to a better future
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/learnmore">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-700 hover:to-amber-600 rounded-lg font-semibold text-black shadow-lg shadow-yellow-600/25 transition-all duration-300 flex items-center gap-2"
            >
              Learn More <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border border-white/20 hover:border-yellow-600/50 rounded-lg font-semibold text-white hover:text-yellow-600 transition-all duration-300"
          >
            Join Waitlist
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
