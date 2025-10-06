'use client'

import { motion } from 'framer-motion'
import { GlassCard } from './GlassCard'

// Feature card component
export function FeatureCard({ icon: Icon, title, description, delay = 0 }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <GlassCard className="p-6 h-full hover:bg-white/[0.04] transition-colors duration-300 group">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-emerald-500/20 group-hover:from-blue-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
            <Icon className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-blue-100 transition-colors duration-300">{title}</h3>
        </div>
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{description}</p>
      </GlassCard>
    </motion.div>
  )
}
