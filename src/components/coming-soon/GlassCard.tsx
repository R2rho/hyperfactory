'use client'

import { motion } from 'framer-motion'

// Professional liquid glass card with realistic refraction based on advanced glass techniques
export function GlassCard({ children, className = "", ...props }: any) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl border-0 group ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        // Main glass background with color mixing for realistic transparency
        backgroundColor: `color-mix(in srgb, rgba(187, 187, 188, 0.12), transparent)`,

        // Advanced backdrop filter with saturation for liquid glass effect
        backdropFilter: `blur(12px) saturate(180%)`,
        WebkitBackdropFilter: `blur(12px) saturate(180%)`,

        // Complex multi-layer shadow system for authentic glass depth and refraction
        boxShadow: `
          inset 0 0 0 1px color-mix(in srgb, rgba(255,255,255,0.1), transparent),
          inset 1.8px 3px 0px -2px color-mix(in srgb, rgba(255,255,255,0.9), transparent),
          inset -2px -2px 0px -2px color-mix(in srgb, rgba(255,255,255,0.8), transparent),
          inset -3px -8px 1px -6px color-mix(in srgb, rgba(255,255,255,0.6), transparent),
          inset -0.3px -1px 4px 0px color-mix(in srgb, rgba(0,0,0,0.24), transparent),
          inset -1.5px 2.5px 0px -2px color-mix(in srgb, rgba(0,0,0,0.4), transparent),
          inset 0px 3px 4px -2px color-mix(in srgb, rgba(0,0,0,0.4), transparent),
          inset 2px -6.5px 1px -4px color-mix(in srgb, rgba(0,0,0,0.2), transparent),
          0px 1px 5px 0px color-mix(in srgb, rgba(0,0,0,0.2), transparent),
          0px 6px 16px 0px color-mix(in srgb, rgba(0,0,0,0.16), transparent)
        `,

        // Subtle prismatic background with brand colors
        background: `
          radial-gradient(circle at 25% 25%, color-mix(in srgb, rgba(59, 130, 246, 0.08), transparent) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, color-mix(in srgb, rgba(16, 185, 129, 0.06), transparent) 0%, transparent 50%),
          linear-gradient(135deg, color-mix(in srgb, rgba(255,255,255,0.02), transparent) 0%, transparent 100%)
        `,

        // Smooth transitions for interactive states
        transition: `
          background-color 400ms cubic-bezier(1, 0.0, 0.4, 1),
          box-shadow 400ms cubic-bezier(1, 0.0, 0.4, 1),
          backdrop-filter 400ms cubic-bezier(1, 0.0, 0.4, 1),
          transform 300ms ease-out
        `
      }}
      {...props}
    >
      {/* Animated liquid glass surface reflection */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl group-hover:opacity-100 opacity-70 transition-opacity duration-300"
        style={{
          background: `
            linear-gradient(135deg,
              color-mix(in srgb, rgba(255,255,255,0.15), transparent) 0%,
              color-mix(in srgb, rgba(255,255,255,0.04), transparent) 25%,
              transparent 50%,
              color-mix(in srgb, rgba(255,255,255,0.03), transparent) 75%,
              color-mix(in srgb, rgba(255,255,255,0.12), transparent) 100%
            )
          `
        }}
        animate={{
          background: [
            `linear-gradient(135deg,
              color-mix(in srgb, rgba(255,255,255,0.15), transparent) 0%,
              color-mix(in srgb, rgba(255,255,255,0.04), transparent) 25%,
              transparent 50%,
              color-mix(in srgb, rgba(255,255,255,0.03), transparent) 75%,
              color-mix(in srgb, rgba(255,255,255,0.12), transparent) 100%
            )`,
            `linear-gradient(145deg,
              color-mix(in srgb, rgba(255,255,255,0.12), transparent) 0%,
              color-mix(in srgb, rgba(255,255,255,0.06), transparent) 25%,
              transparent 50%,
              color-mix(in srgb, rgba(255,255,255,0.04), transparent) 75%,
              color-mix(in srgb, rgba(255,255,255,0.15), transparent) 100%
            )`,
            `linear-gradient(135deg,
              color-mix(in srgb, rgba(255,255,255,0.15), transparent) 0%,
              color-mix(in srgb, rgba(255,255,255,0.04), transparent) 25%,
              transparent 50%,
              color-mix(in srgb, rgba(255,255,255,0.03), transparent) 75%,
              color-mix(in srgb, rgba(255,255,255,0.12), transparent) 100%
            )`
          ]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{
          background: [
            `linear-gradient(135deg,
              color-mix(in srgb, rgba(255,255,255,0.25), transparent) 0%,
              color-mix(in srgb, rgba(255,255,255,0.08), transparent) 25%,
              transparent 50%,
              color-mix(in srgb, rgba(255,255,255,0.06), transparent) 75%,
              color-mix(in srgb, rgba(255,255,255,0.22), transparent) 100%
            )`,
            `linear-gradient(145deg,
              color-mix(in srgb, rgba(255,255,255,0.22), transparent) 0%,
              color-mix(in srgb, rgba(255,255,255,0.12), transparent) 25%,
              transparent 50%,
              color-mix(in srgb, rgba(255,255,255,0.08), transparent) 75%,
              color-mix(in srgb, rgba(255,255,255,0.25), transparent) 100%
            )`,
            `linear-gradient(135deg,
              color-mix(in srgb, rgba(255,255,255,0.25), transparent) 0%,
              color-mix(in srgb, rgba(255,255,255,0.08), transparent) 25%,
              transparent 50%,
              color-mix(in srgb, rgba(255,255,255,0.06), transparent) 75%,
              color-mix(in srgb, rgba(255,255,255,0.22), transparent) 100%
            )`
          ],
          transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />

      {/* Flowing light refraction streak */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none group-hover:h-0.5 transition-all duration-300"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, color-mix(in srgb, rgba(255,255,255,0.6), transparent) 50%, transparent 100%)'
        }}
        animate={{
          x: ['-120%', '120%']
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        whileHover={{
          background: 'linear-gradient(90deg, transparent 0%, color-mix(in srgb, rgba(255,255,255,0.9), transparent) 50%, transparent 100%)',
          x: ['-120%', '120%'],
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0
          }
        }}
      />

      {/* Additional hover glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `
            radial-gradient(circle at 50% 50%,
              color-mix(in srgb, rgba(59, 130, 246, 0.1), transparent) 0%,
              color-mix(in srgb, rgba(16, 185, 129, 0.08), transparent) 30%,
              transparent 70%
            )
          `,
          boxShadow: `
            inset 0 0 0 1px color-mix(in srgb, rgba(255,255,255,0.2), transparent),
            0 0 20px color-mix(in srgb, rgba(59, 130, 246, 0.1), transparent)
          `
        }}
      />

      {children}
    </motion.div>
  )
}
