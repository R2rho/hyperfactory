'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from './GlassCard'

// Animated workflow display inspired by Augment Code
export function WorkflowDisplay() {
  const [currentStep, setCurrentStep] = useState(0)

  const workflowSteps = [
    {
      title: "Upload Design",
      description: "Drop your files or create from scratch",
      icon: "📁",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "AI Optimization",
      description: "Smart material selection & print settings",
      icon: "⚙️",
      color: "from-cyan-500 to-emerald-500"
    },
    {
      title: "Lightning Production",
      description: "Multi-technology printing at light speed",
      icon: "⚡",
      color: "from-emerald-500 to-blue-500"
    },
    {
      title: "Quality Delivery",
      description: "Professional finishing & fast shipping",
      icon: "🚀",
      color: "from-blue-500 to-purple-500"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % workflowSteps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <GlassCard className="p-8">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Lightning-Fast Workflow</h3>
          <p className="text-gray-400 text-sm">From idea to reality in record time</p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {workflowSteps.map((step, i) => (
            <div
              key={i}
              className={`relative h-2 rounded-full transition-all duration-500 ${
                i <= currentStep ? 'bg-gradient-to-r ' + step.color : 'bg-gray-700'
              }`}
            />
          ))}
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-4xl mb-3">{workflowSteps[currentStep].icon}</div>
          <h4 className="text-lg font-semibold text-white mb-2">
            {workflowSteps[currentStep].title}
          </h4>
          <p className="text-gray-400 text-sm">
            {workflowSteps[currentStep].description}
          </p>
        </motion.div>
      </div>
    </GlassCard>
  )
}
