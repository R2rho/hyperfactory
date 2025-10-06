'use client'

import { motion } from 'framer-motion'
import { Shirt, Sun, Layers3, Droplets } from 'lucide-react'
import { FeatureCard } from './FeatureCard'

export function FeaturesSection() {
  return (
    <section id="features" className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-gray-300">Multi-technology printing,</span><br />
            <span className="text-gray-300">optimized for</span>{' '}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">creators.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From DTF transfers to 3D printing, we bring your creative visions to life with
            industry-leading quality and lightning-fast turnaround times.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={Shirt}
            title="DTF Transfers"
            description="Premium direct-to-film transfers with vibrant colors and exceptional durability for all fabric types."
            delay={0}
          />
          <FeatureCard
            icon={Sun}
            title="UV DTF Transfers"
            description="Revolutionary UV-cured transfers for hard surfaces, glass, metal, and more with stunning detail."
            delay={0.1}
          />
          <FeatureCard
            icon={Layers3}
            title="FDM 3D Printing"
            description="High-precision fused deposition modeling for prototypes, functional parts, and custom designs."
            delay={0.2}
          />
          <FeatureCard
            icon={Droplets}
            title="SLA 3D Printing"
            description="Ultra-detailed resin printing for miniatures, jewelry, and precision industrial applications."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  )
}
