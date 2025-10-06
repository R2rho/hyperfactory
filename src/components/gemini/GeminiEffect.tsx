'use client'

// import React from 'react'
// import { LeftNodes, RightNodes, CoreCard } from './GeminiNodes'

// export const HyperfactoryGeminiEffect = () => {
//   const containerRef = React.useRef(null);

//   return (
//     <div className="relative w-full max-w-7xl mx-auto" ref={containerRef}>
//       {/* Subtle center glow */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 -z-10 opacity-20 rounded-full blur-3xl"
//         style={{
//           background: "radial-gradient(ellipse, rgba(184,134,11,0.15), transparent 70%)",
//         }}
//       />

//       <div className="relative">
//         {/* SVG diagram with animated data flow */}
//         <svg
//           viewBox="0 0 120 80"
//           className="absolute inset-0 w-full h-full pointer-events-none"
//           style={{ filter: "drop-shadow(0 0 12px rgba(184,134,11,0.2))" }}
//         >
//           {/* Gradients and animations */}
//           <defs>
//             <linearGradient id="geminiGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="rgba(184,134,11,0.8)" />
//               <stop offset="50%" stopColor="rgba(255,215,0,0.6)" />
//               <stop offset="100%" stopColor="rgba(184,134,11,0.4)" />
//             </linearGradient>
//             <linearGradient id="geminiGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
//               <stop offset="50%" stopColor="rgba(184,134,11,0.6)" />
//               <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
//             </linearGradient>
//             <linearGradient id="geminiGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="rgba(184,134,11,0.6)" />
//               <stop offset="50%" stopColor="rgba(255,215,0,0.4)" />
//               <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
//             </linearGradient>
            
//             {/* Animated gradient for data flow */}
//             <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="transparent" />
//               <stop offset="30%" stopColor="rgba(255,215,0,0.8)" />
//               <stop offset="70%" stopColor="rgba(184,134,11,0.6)" />
//               <stop offset="100%" stopColor="transparent" />
//               <animateTransform
//                 attributeName="gradientTransform"
//                 type="translate"
//                 values="-100 0; 220 0; -100 0"
//                 dur="3s"
//                 repeatCount="indefinite"
//               />
//             </linearGradient>
            
//             <filter id="geminiGlow">
//               <feGaussianBlur stdDeviation="1" />
//               <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"/>
//             </filter>
//           </defs>

//           {/* Main connection lines positioned to align with cards */}
//           <g opacity="0.8">
//             {/* Top row connections - align with first cards */}
//             <path d="M 15 20 L 105 20" stroke="url(#geminiGradient1)" strokeWidth="1.5" fill="none" />
//             <path d="M 15 20 L 105 20" stroke="url(#flowGradient)" strokeWidth="2" fill="none" filter="url(#geminiGlow)" />
            
//             {/* Middle row connections - align with middle cards */}
//             <path d="M 15 40 L 105 40" stroke="url(#geminiGradient2)" strokeWidth="1.5" fill="none" />
//             <path d="M 15 40 L 105 40" stroke="url(#flowGradient)" strokeWidth="2" fill="none" filter="url(#geminiGlow)" />
            
//             {/* Bottom row connections - align with bottom cards */}
//             <path d="M 15 60 L 105 60" stroke="url(#geminiGradient3)" strokeWidth="1.5" fill="none" />
//             <path d="M 15 60 L 105 60" stroke="url(#flowGradient)" strokeWidth="2" fill="none" filter="url(#geminiGlow)" />
            
//             {/* Convergence lines to center */}
//             <path d="M 15 20 L 60 40" stroke="url(#geminiGradient1)" strokeWidth="1" fill="none" opacity="0.6" />
//             <path d="M 15 60 L 60 40" stroke="url(#geminiGradient3)" strokeWidth="1" fill="none" opacity="0.6" />
//             <path d="M 60 40 L 105 20" stroke="url(#geminiGradient1)" strokeWidth="1" fill="none" opacity="0.6" />
//             <path d="M 60 40 L 105 60" stroke="url(#geminiGradient3)" strokeWidth="1" fill="none" opacity="0.6" />
//           </g>
//         </svg>

//         {/* Grid layout for cards */}
//         <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center">
//           {/* Left Column */}
//           <div className="flex justify-center">
//             <LeftNodes />
//           </div>

//           {/* Center Core - positioned to align with SVG center */}
//           <div className="flex justify-center">
//             <CoreCard />
//           </div>

//           {/* Right Column */}
//           <div className="flex justify-center">
//             <RightNodes />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Factory, Cpu, Boxes, Shield, Workflow, Gauge, Cloud, BarChart3, Rocket, Target, Users, CheckCircle2, ArrowLeft, ArrowRight, MapPin, Building2, Zap, TrendingUp, Globe, Lock, Wrench, UserCheck, Clock, DollarSign, Lightbulb } from "lucide-react";

import { LeftNodes, RightNodes, CoreCard, NodeCard} from './GeminiNodes'

/**
 * Hyperfactory Slides — Black & Gold (React)
 * -------------------------------------------------
 * A self-contained, keyboard-navigable slide deck in React.
 * Uses the same aesthetic as your previous Hyperfactory canvas:
 *  - black background, metallic gold accents
 *  - glassy panels, subtle gradients
 *  - no external slideshow libs
 *
 * Keyboard: ←/→ or A/D to navigate. Click arrows on screen too.
 * All slides are 16:9-friendly and responsive.
 */

// --- Theme helpers ---------------------------------------------------------
const goldGlass = {
  background:
    "linear-gradient(135deg, rgba(184,134,11,0.18), rgba(120,113,108,0.12))",
  border: "1px solid rgba(255,255,255,0.12)",
};

// --- Hyperfactory Gemini Effect -----------------------------------------
export function HyperfactoryGeminiEffect() {
  const containerRef = React.useRef(null);

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 md:px-6" ref={containerRef}>
      {/* Subtle center glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-24 md:w-64 md:h-32 -z-10 opacity-25 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(ellipse, rgba(184,134,11,0.12), transparent 70%)",
        }}
      />

      <div className="relative">
        {/* Gemini-style Connection SVG - Only visible on desktop */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block overflow-hidden"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <clipPath id="svgBounds">
              <rect x="0" y="0" width="100" height="100"/>
            </clipPath>
            <linearGradient id="geminiGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,215,0,0.8)" />
              <stop offset="50%" stopColor="rgba(255,183,197,0.6)" />
              <stop offset="100%" stopColor="rgba(255,215,0,0.4)" />
            </linearGradient>
            <linearGradient id="geminiGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,215,0,0.7)" />
              <stop offset="50%" stopColor="rgba(255,221,183,0.5)" />
              <stop offset="100%" stopColor="rgba(255,215,0,0.3)" />
            </linearGradient>
            <linearGradient id="geminiGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,215,0,0.6)" />
              <stop offset="50%" stopColor="rgba(177,197,255,0.4)" />
              <stop offset="100%" stopColor="rgba(255,215,0,0.2)" />
            </linearGradient>
            <filter id="geminiGlow">
              <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="geminiBlur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
            </filter>
          </defs>

          {/* All content clipped to SVG bounds */}
          <g clipPath="url(#svgBounds)">
            {/* Static connection paths - always visible */}
            <path d="M 28 25 Q 35 30 42 35" stroke="url(#geminiGradient1)" strokeWidth="0.3" fill="none" filter="url(#geminiGlow)" opacity="0.6" />
            <path d="M 28 50 Q 35 48 42 50" stroke="url(#geminiGradient2)" strokeWidth="0.3" fill="none" filter="url(#geminiGlow)" opacity="0.6" />
            <path d="M 28 75 Q 35 70 42 65" stroke="url(#geminiGradient3)" strokeWidth="0.3" fill="none" filter="url(#geminiGlow)" opacity="0.6" />
            <path d="M 58 35 Q 65 30 72 25" stroke="url(#geminiGradient1)" strokeWidth="0.3" fill="none" filter="url(#geminiGlow)" opacity="0.6" />
            <path d="M 58 50 Q 65 52 72 50" stroke="url(#geminiGradient2)" strokeWidth="0.3" fill="none" filter="url(#geminiGlow)" opacity="0.6" />
            <path d="M 58 65 Q 65 70 72 75" stroke="url(#geminiGradient3)" strokeWidth="0.3" fill="none" filter="url(#geminiGlow)" opacity="0.6" />

            {/* Continuous flowing particles - constrained within bounds */}
            <circle r="0.3" fill="rgba(255,215,0,0.9)">
              <animateMotion dur="6s" repeatCount="indefinite">
                <mpath href="#flowPath1"/>
              </animateMotion>
            </circle>
            <circle r="0.3" fill="rgba(255,183,197,0.8)">
              <animateMotion dur="6s" repeatCount="indefinite" begin="1s">
                <mpath href="#flowPath2"/>
              </animateMotion>
            </circle>
            <circle r="0.3" fill="rgba(177,197,255,0.8)">
              <animateMotion dur="6s" repeatCount="indefinite" begin="2s">
                <mpath href="#flowPath3"/>
              </animateMotion>
            </circle>
            <circle r="0.3" fill="rgba(255,215,0,0.9)">
              <animateMotion dur="6s" repeatCount="indefinite" begin="3s">
                <mpath href="#flowPath4"/>
              </animateMotion>
            </circle>
            <circle r="0.3" fill="rgba(255,183,197,0.8)">
              <animateMotion dur="6s" repeatCount="indefinite" begin="4s">
                <mpath href="#flowPath5"/>
              </animateMotion>
            </circle>
            <circle r="0.3" fill="rgba(177,197,255,0.8)">
              <animateMotion dur="6s" repeatCount="indefinite" begin="5s">
                <mpath href="#flowPath6"/>
              </animateMotion>
            </circle>

            {/* Hidden paths for particle animation - extended for wider spacing */}
            <path id="flowPath1" d="M 28 25 Q 35 30 42 35" opacity="0"/>
            <path id="flowPath2" d="M 28 50 Q 35 48 42 50" opacity="0"/>
            <path id="flowPath3" d="M 28 75 Q 35 70 42 65" opacity="0"/>
            <path id="flowPath4" d="M 58 35 Q 65 30 72 25" opacity="0"/>
            <path id="flowPath5" d="M 58 50 Q 65 52 72 50" opacity="0"/>
            <path id="flowPath6" d="M 58 65 Q 65 70 72 75" opacity="0"/>

            {/* Background blur paths for depth */}
            <path d="M 28 25 Q 35 30 42 35" stroke="url(#geminiGradient1)" strokeWidth="0.6" fill="none" filter="url(#geminiBlur)" opacity="0.2" />
            <path d="M 28 50 Q 35 48 42 50" stroke="url(#geminiGradient2)" strokeWidth="0.6" fill="none" filter="url(#geminiBlur)" opacity="0.2" />
            <path d="M 28 75 Q 35 70 42 65" stroke="url(#geminiGradient3)" strokeWidth="0.6" fill="none" filter="url(#geminiBlur)" opacity="0.2" />
            <path d="M 58 35 Q 65 30 72 25" stroke="url(#geminiGradient1)" strokeWidth="0.6" fill="none" filter="url(#geminiBlur)" opacity="0.2" />
            <path d="M 58 50 Q 65 52 72 50" stroke="url(#geminiGradient2)" strokeWidth="0.6" fill="none" filter="url(#geminiBlur)" opacity="0.2" />
            <path d="M 58 65 Q 65 70 72 75" stroke="url(#geminiGradient3)" strokeWidth="0.6" fill="none" filter="url(#geminiBlur)" opacity="0.2" />
          </g>


        </svg>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 items-center">
          {/* Left */}
          <div className="flex flex-col gap-4 md:gap-6 order-1 md:order-1">
            <NodeCard title="Equipment & PLCs" subtitle="Cells · Lines · Robots · CNC" icon={<Gauge className="w-4 h-4" />} tone="gold" />
            <NodeCard title="Business Systems" subtitle="ERP · QMS · MES" icon={<Workflow className="w-4 h-4" />} tone="gold" />
            <NodeCard title="Data Sources" subtitle="Sensors · Historians · Files" icon={<BarChart3 className="w-4 h-4" />} tone="gold" />
          </div>

          {/* Core - Center on mobile, middle on desktop */}
          <div className="relative grid place-items-center order-2 md:order-2 my-6 md:my-0">
            <CoreCard />
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4 md:gap-6 order-3 md:order-3">
            <NodeCard title="Real‑time Visibility" subtitle="Dashboards · Traceability" icon={<Cloud className="w-4 h-4" />} tone="glass" />
            <NodeCard title="Operations Intelligence" subtitle="Costs · Lead Times · Throughput" icon={<Boxes className="w-4 h-4" />} tone="glass" />
            <NodeCard title="Reliability & Security" subtitle="Predictive · Zero‑Trust" icon={<Shield className="w-4 h-4" />} tone="glass" />
          </div>
        </div>
      </div>
    </div>
  );
}