'use client'

import { motion } from 'framer-motion'
import { Zap, TrendingUp, Globe } from 'lucide-react'

// --- Theme helpers ---------------------------------------------------------
const goldGlass = {
  background:
    "linear-gradient(135deg, rgba(184,134,11,0.18), rgba(120,113,108,0.12))",
  border: "1px solid rgba(255,255,255,0.12)",
};

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-white font-alliance">Why HyperFactory?</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-serif">
            Transform your manufacturing operations with AI-driven intelligence and seamless connectivity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl backdrop-blur-sm border"
            style={goldGlass}
          >
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-yellow-600/20 to-amber-500/20 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4 font-alliance">Fully Integrated System</h3>
            <p className="text-gray-300 font-serif">Seamlessly connects all your manufacturing systems into one unified platform for complete visibility.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl backdrop-blur-sm border"
            style={goldGlass}
          >
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-yellow-600/20 to-amber-500/20 flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4 font-alliance">Smart Supply Chain Planning</h3>
            <p className="text-gray-300 font-serif">AI-powered insights optimize your supply chain and operations planning for better decision making.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl backdrop-blur-sm border"
            style={goldGlass}
          >
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-yellow-600/20 to-amber-500/20 flex items-center justify-center mb-6">
              <Globe className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4 font-alliance">Vendor Neutral</h3>
            <p className="text-gray-300 font-serif">Works with your existing equipment and systems, regardless of manufacturer or age.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
