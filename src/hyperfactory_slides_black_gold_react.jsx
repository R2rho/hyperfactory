import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Factory, Cpu, Boxes, Shield, Workflow, Gauge, Cloud, BarChart3, Rocket, Target, Users, CheckCircle2, ArrowLeft, ArrowRight, MapPin, Building2, Zap, TrendingUp, Globe, Lock, Wrench, UserCheck, Clock, DollarSign, Lightbulb } from "lucide-react";


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

const Panel = ({ children, style, className = "" }) => (
  <div
    className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 backdrop-blur-xl shadow-xl ${className}`}
    style={{ background: "rgba(255,255,255,0.045)", border: "1px solid rgba(255,255,255,0.12)", ...style }}
  >
    {children}
  </div>
);

const H = ({ children, sub }) => (
  <div className="mb-4">
    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{children}</h2>
    {sub && <p className="text-white/70 mt-2 max-w-3xl">{sub}</p>}
  </div>
);

const Bullet = ({ children }) => (
  <div className="flex items-start gap-3 text-lg leading-7">
    <CheckCircle2 className="w-5 h-5 text-amber-300 mt-1 flex-shrink-0" />
    <div className="text-white/85">{children}</div>
  </div>
);











// --- Hyperfactory Gemini Effect -----------------------------------------
function HyperfactoryGeminiEffect() {
  const containerRef = React.useRef(null);

  return (
    <div className="relative w-full max-w-6xl mx-auto" ref={containerRef}>
      {/* Subtle center glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 -z-10 opacity-25 rounded-full blur-3xl"
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

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Left */}
          <div className="flex flex-col gap-6">
            <NodeCard title="Equipment & PLCs" subtitle="Cells · Lines · Robots · CNC" icon={<Gauge className="w-4 h-4" />} tone="gold" />
            <NodeCard title="Business Systems" subtitle="ERP · QMS · MES" icon={<Workflow className="w-4 h-4" />} tone="gold" />
            <NodeCard title="Data Sources" subtitle="Sensors · Historians · Files" icon={<BarChart3 className="w-4 h-4" />} tone="gold" />
          </div>

          {/* Core */}
          <div className="relative">
            <CoreCard />
          </div>

          {/* Right */}
          <div className="flex flex-col gap-6">
            <NodeCard title="Real‑time Visibility" subtitle="Dashboards · Traceability" icon={<Cloud className="w-4 h-4" />} tone="glass" />
            <NodeCard title="Operations Intelligence" subtitle="Costs · Lead Times · Throughput" icon={<Boxes className="w-4 h-4" />} tone="glass" />
            <NodeCard title="Reliability & Security" subtitle="Predictive · Zero‑Trust" icon={<Shield className="w-4 h-4" />} tone="glass" />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Diagram reused (lightweight) -----------------------------------------
function HyperfactoryDiagram() {
  return <HyperfactoryGeminiEffect />;
}

function NodeCard({ title, subtitle, icon, tone = "gold" }) {
  const styles =
    tone === "gold"
      ? { background: "linear-gradient(135deg, rgba(209,185,108,0.22), rgba(88,72,36,0.12))", border: "1px solid rgba(255,255,255,0.18)" }
      : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)" };
  return (
    <div className="relative rounded-2xl p-4 backdrop-blur-xl" style={styles}>
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl grid place-items-center border" style={goldGlass}>
          <span className="text-amber-200">{icon}</span>
        </div>
        <div>
          <div className="font-semibold text-white">{title}</div>
          <div className="text-xs text-white/60">{subtitle}</div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-60" />
    </div>
  );
}

function CoreCard() {
  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-4 rounded-[28px] blur-2xl opacity-60" style={goldGlass} />
      <div
        className="relative rounded-3xl p-6"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(6px) saturate(120%)",
          WebkitBackdropFilter: "blur(6px) saturate(120%)"
        }}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl grid place-items-center border" style={goldGlass}>
            <Cpu className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <div className="font-semibold text-white">Hyperfactory Backbone</div>
            <div className="text-xs text-white/60">Orchestration · Unified Namespace · AI Agents</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <Chip icon={<Factory className="w-3.5 h-3.5" />}>Digital Twin</Chip>
          <Chip icon={<Workflow className="w-3.5 h-3.5" />}>AI Agents</Chip>
          <Chip icon={<Shield className="w-3.5 h-3.5" />}>Zero‑Trust</Chip>
          <Chip icon={<Boxes className="w-3.5 h-3.5" />}>Connectors</Chip>
        </div>
      </div>
    </div>
  );
}

const Chip = ({ children, icon }) => (
  <div className="flex items-center gap-2 rounded-lg px-2.5 py-2" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}>
    <span className="text-yellow-600">{icon}</span>
    <span className="text-white/85">{children}</span>
  </div>
);

// Proper tsParticles implementation
const GeometricBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const animationSpeed = 8; // Fixed speed
  const meshOpacity = 0.3; // Fixed opacity (30%)

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let time = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 3D Industrial Surface Topology Animation
    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // 3D Surface Parameters
      const vanishingPointX = width / 2;
      const vanishingPointY = height * 0.15; // Vanishing point higher up
      const surfaceRows = 15;
      const surfaceCols = 20;

      // Metallic gold colors
      const goldBright = 'rgba(255, 215, 0, 0.9)';
      const goldMedium = 'rgba(218, 165, 32, 0.7)';
      const goldDark = 'rgba(184, 134, 11, 0.5)';

      // Generate height map for industrial topology
      const getHeight = (x, z, time) => {
        // Create industrial landscape with platforms, valleys, and structures - adjustable speed
        const speedFactor = animationSpeed * 0.0001; // Convert slider value to appropriate scale
        const wave1 = Math.sin(x * 0.3 + time * speedFactor) * 0.3;
        const wave2 = Math.cos(z * 0.4 + time * speedFactor * 0.8) * 0.2;
        const platforms = Math.floor((x + 4) / 3) % 2 === 0 ? 0.4 : 0;
        const structures = Math.sin(x * 0.8) * Math.cos(z * 0.6) * 0.15;
        return wave1 + wave2 + platforms + structures;
      };

      // Draw 3D surface mesh with proper perspective
      for (let row = 0; row < surfaceRows - 1; row++) {
        for (let col = 0; col < surfaceCols - 1; col++) {
          // Z goes from 0 (foreground/bottom) to 1 (background/vanishing point)
          const z1 = row / (surfaceRows - 1);
          const z2 = (row + 1) / (surfaceRows - 1);

          // X goes from -1 (left) to 1 (right)
          const x1 = (col - surfaceCols/2) / (surfaceCols/2);
          const x2 = (col + 1 - surfaceCols/2) / (surfaceCols/2);

          // Calculate perspective scaling - closer to camera = larger
          const depth1 = z1;
          const depth2 = z2;
          const scale1 = 1 - depth1 * 0.85; // More aggressive perspective
          const scale2 = 1 - depth2 * 0.85;

          // Get heights for topology
          const h1 = getHeight(x1 * 8, z1 * 8, time);
          const h2 = getHeight(x2 * 8, z1 * 8, time);
          const h3 = getHeight(x1 * 8, z2 * 8, time);
          const h4 = getHeight(x2 * 8, z2 * 8, time);

          // Project to screen coordinates with proper perspective
          // Foreground (z=0) should be wide, background (z=1) should converge to vanishing point
          const foregroundWidth = width * 1.2; // Much wider at bottom
          const backgroundWidth = width * 0.05; // Very narrow at top

          const currentWidth1 = foregroundWidth * (1 - depth1) + backgroundWidth * depth1;
          const currentWidth2 = foregroundWidth * (1 - depth2) + backgroundWidth * depth2;

          const screenX1 = vanishingPointX + (x1 * currentWidth1 * 0.5);
          const screenX2 = vanishingPointX + (x2 * currentWidth1 * 0.5);
          const screenX3 = vanishingPointX + (x1 * currentWidth2 * 0.5);
          const screenX4 = vanishingPointX + (x2 * currentWidth2 * 0.5);

          // Y coordinates: bottom of screen to vanishing point
          const baseY1 = height * 0.9 * (1 - depth1) + vanishingPointY * depth1;
          const baseY2 = height * 0.9 * (1 - depth2) + vanishingPointY * depth2;

          const screenY1 = baseY1 - h1 * 50 * scale1;
          const screenY2 = baseY1 - h2 * 50 * scale1;
          const screenY3 = baseY2 - h3 * 50 * scale2;
          const screenY4 = baseY2 - h4 * 50 * scale2;

          // Calculate surface normal for lighting
          const avgHeight = (h1 + h2 + h3 + h4) / 4;
          const brightness = Math.max(0.3, 0.7 + avgHeight * 0.5);

          // Choose color based on depth and height
          let surfaceColor;
          if (depth1 < 0.3) {
            surfaceColor = goldBright;
          } else if (depth1 < 0.6) {
            surfaceColor = goldMedium;
          } else {
            surfaceColor = goldDark;
          }

          // Adjust opacity and line width based on distance and user setting
          const baseOpacity = Math.max(0.15, (1 - depth1 * 0.7) * brightness);
          ctx.globalAlpha = baseOpacity * meshOpacity; // Apply user-controlled opacity
          ctx.lineWidth = Math.max(0.3, 1.5 * scale1);
          ctx.strokeStyle = surfaceColor;

          // Only draw if coordinates are valid and within reasonable bounds
          if (screenX1 >= -width && screenX1 <= width * 2 &&
              screenX2 >= -width && screenX2 <= width * 2 &&
              screenX3 >= -width && screenX3 <= width * 2 &&
              screenX4 >= -width && screenX4 <= width * 2 &&
              screenY1 >= -height && screenY1 <= height * 2 &&
              screenY2 >= -height && screenY2 <= height * 2 &&
              screenY3 >= -height && screenY3 <= height * 2 &&
              screenY4 >= -height && screenY4 <= height * 2) {

            // Draw surface quad wireframe
            ctx.beginPath();
            ctx.moveTo(screenX1, screenY1);
            ctx.lineTo(screenX2, screenY2);
            ctx.lineTo(screenX4, screenY4);
            ctx.lineTo(screenX3, screenY3);
            ctx.closePath();
            ctx.stroke();
            // Add subtle fill for elevated areas
            if (avgHeight > 0.2) {
              const baseFillOpacity = Math.max(0.05, (1 - depth1 * 0.9) * 0.2);
              ctx.globalAlpha = baseFillOpacity * meshOpacity; // Apply user-controlled opacity
              ctx.fillStyle = surfaceColor;
              ctx.fill();
            }
          }
        }
      }

      // Industrial structures removed - clean surface only

      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      time += animationSpeed; // Use adjustable speed
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animationSpeed, meshOpacity]); // Re-run effect when animation speed or opacity changes

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />

    </div>
  );
};

// Value card component
const ValueCard = ({ icon, title, children }) => (
  <div className="rounded-2xl p-5" style={goldGlass}>
    <div className="flex items-center gap-3 mb-2">
      <div className="h-9 w-9 rounded-xl grid place-items-center border" style={goldGlass}>
        <span className="text-amber-200">{icon}</span>
      </div>
      <div className="text-xl font-semibold">{title}</div>
    </div>
    <div className="text-white/80">{children}</div>
  </div>
);

// Enhanced card component for various content
const FeatureCard = ({ icon, title, description, highlight }) => (
  <div className="rounded-2xl p-5 backdrop-blur-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)" }}>
    <div className="flex items-start gap-4">
      <div className="h-10 w-10 rounded-xl grid place-items-center border flex-shrink-0" style={goldGlass}>
        <span className="text-amber-200">{icon}</span>
      </div>
      <div className="flex-1">
        <div className="text-lg font-semibold text-white mb-2">{title}</div>
        {highlight && <div className="text-amber-300 font-medium mb-2">{highlight}</div>}
        <div className="text-white/80 text-sm leading-relaxed">{description}</div>
      </div>
    </div>
  </div>
);

// Team member component
const TeamMember = ({ name, role, isFounder, image }) => (
  <div className="flex flex-col items-center text-center">
    {image ? (
      <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2" style={{ borderColor: isFounder ? "#D4AF37" : "rgba(255,255,255,0.2)" }}>
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
    ) : (
      <div className="w-16 h-16 rounded-full mb-3 border-2 grid place-items-center" style={{ borderColor: isFounder ? "#D4AF37" : "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)" }}>
        <UserCheck className="w-8 h-8 text-white/60" />
      </div>
    )}
    <div className="text-sm font-semibold text-white">{name}</div>
    <div className="text-xs text-white/60 mt-1">{role}</div>
  </div>
);

// --- Slides content ---------------------------------------------------------
const slides = [
  // Slide 0: Background Canvas Only (Temporary)
  // {
  //   key: "background-only",
  //   content: (
  //     <div className="relative z-10 w-full h-full">
  //       {/* Pure geometric background canvas - no content, background rendered by main component */}
  //     </div>
  //   ),
  // },
  {
    key: "title",
    content: (
      <div className="space-y-6 relative">
        {console.log("🎯 TITLE SLIDE: Active")}
        <Panel style={goldGlass}>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <img src="/vertec.png" alt="Vertec" className="h-12 w-12 sm:h-16 sm:w-16 object-contain flex-shrink-0" />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">Hyperfactory</h1>
              <p className="text-white/70 mt-1 sm:mt-2 text-sm sm:text-base">AI‑powered smart factory platform by Vertec</p>
            </div>
          </div>
        </Panel>

      </div>
    ),
  },
  {
    key: "vertec",
    content: (
      <div className="space-y-8">
        <div className="flex flex-col items-center text-center">
          <H>Who We Are</H>
          <img src="/vertec_type_white.png" alt="Vertec" className="h-16 md:h-20 object-contain mb-6" />
          <Panel style={goldGlass}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl md:text-2xl font-medium leading-relaxed text-center">
                Vertec is a manufacturing technology company on a mission to{" "}
                <span className="text-amber-300 font-semibold">revitalize American manufacturing</span>,{" "}
                <span className="text-amber-300 font-semibold">reindustrialize our production capacity</span>, and{" "}
                <span className="text-amber-300 font-semibold">uplift communities</span> to a better future.
              </h2>
            </div>
          </Panel>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Factory className="w-6 h-6" />}
            title="Revitalize Manufacturing"
            description="Bringing modern technology and AI-powered solutions to traditional manufacturing operations across America."
          />
          <FeatureCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Reindustrialize Production"
            description="Rebuilding America's production capacity through smart factory technologies and data-driven operations."
          />
          <FeatureCard
            icon={<Users className="w-6 h-6" />}
            title="Uplift Communities"
            description="Creating high-value jobs and strengthening local manufacturing ecosystems for a better future."
          />
        </div>
      </div>
    ),
  },
  {
    key: "problem",
    content: (
      <div className="space-y-6">
        <H sub="SMB manufacturers, manufacturing & deep tech startups, entrepreneurs, & companies with limited technological maturity">Problem & Who We Serve</H>

        {/* Market Statistics */}
        <Panel style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="grid md:grid-cols-4 gap-4 text-center mb-6">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-amber-300 mb-2">98%</div>
              <div className="text-base md:text-lg text-white/80 mb-2">of U.S. manufacturing are SMBs</div>
              <a href="https://www.score.org/resource/blog-post/how-small-manufacturing-businesses-drive-us-economy" target="_blank" rel="noopener noreferrer" className="text-xs text-amber-400 hover:text-amber-300 underline">Source: SCORE</a>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-amber-300 mb-2">75%</div>
              <div className="text-base md:text-lg text-white/80 mb-2">employ fewer than 20 people</div>
              <a href="https://nam.org/mfgdata/" target="_blank" rel="noopener noreferrer" className="text-xs text-amber-400 hover:text-amber-300 underline">Source: NAM</a>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-amber-300 mb-2">89%</div>
              <div className="text-base md:text-lg text-white/80 mb-2">can't fill job openings</div>
              <a href="https://www.deloitte.com/us/en/insights/industry/manufacturing-industrial-products/manufacturing-skills-gap-study.html" target="_blank" rel="noopener noreferrer" className="text-xs text-amber-400 hover:text-amber-300 underline">Source: Deloitte</a>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-amber-300 mb-2">42%</div>
              <div className="text-base md:text-lg text-white/80 mb-2">use specialized software</div>
              <a href="https://itif.org/publications/2024/04/19/accelerating-digital-technology-adoption-among-smes/" target="_blank" rel="noopener noreferrer" className="text-xs text-amber-400 hover:text-amber-300 underline">Source: ITIF</a>
            </div>
          </div>
        </Panel>

        <Panel>
          <div className="grid md:grid-cols-2 gap-6">
            <Bullet>Many operate with outdated technology and lack resources to implement modern solutions like automation, AI, and data analytics</Bullet>
            <Bullet>Significant skills gap due to technological challenges prevents growth and modernization</Bullet>
            <Bullet>Manufacturing startups face high costs and complexity of traditional solutions</Bullet>
            <Bullet>
              On average, small manufacturers are less productive than larger ones due to lack of technology adoption{" "}
              <a href="https://itif.org/publications/2024/04/19/accelerating-digital-technology-adoption-among-smes/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline">
                (ITIF)
              </a>
            </Bullet>
            <Bullet>Keep what works, integrate what’s missing, own your data</Bullet>
          </div>
        </Panel>
      </div>
    ),
  },
  {
    key: "solution",
    content: (
      <div className="space-y-6">
        <div>
          <H sub="A practical, phased path to a smart factory—human‑in‑the‑loop, vendor‑neutral, measurable outcomes.">Solution — Hyperfactory</H>
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <HyperfactoryDiagram />
        </div>
      </div>
    ),
  },
  {
    key: "value",
    content: (
      <div className="space-y-6">
        <H>Customer Value</H>

        {/* New detailed value propositions */}
        <Panel>
          <div className="space-y-4">
            <Bullet>Automates deployment of a tailored software backbone</Bullet>
            <Bullet>Guides users via chat and built-in tools to connect ERP, machines/equipment, and operations</Bullet>
            <Bullet>Integrates real-time data analytics, machine learning, AI-driven insights, and automation</Bullet>
            <Bullet>Eliminates need for out-of-reach traditional platforms for SMB's and startups:</Bullet>
            <div className="ml-8 space-y-2 text-white/70">
              <div>• Oracle, SAP, Epicor, etc.</div>
              <div>• High licensing fees</div>
              <div>• Proprietary vendor lock-in</div>
              <div>• Complex and expensive integrations with a <a href="https://www.mckinsey.com/capabilities/transformation/our-insights/why-do-most-transformations-fail-a-conversation-with-harry-robinson" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200 underline">70% failure rate</a></div>
            </div>
          </div>
        </Panel>

        {/* Main value highlights */}
        <Panel>
          <div className="grid md:grid-cols-3 gap-6">
            <ValueCard icon={<Rocket className="w-5 h-5" />} title="Growth">Higher throughput, better quoting, faster time‑to‑first‑part</ValueCard>
            <ValueCard icon={<Target className="w-5 h-5" />} title="Visibility & Control">Live scheduling, material visibility, fewer expedites</ValueCard>
            <ValueCard icon={<Shield className="w-5 h-5" />} title="Uptime">Predictive alerts, guided maintenance, higher OEE</ValueCard>
          </div>
        </Panel>
      </div>
    ),
  },
  {
    key: "traction",
    content: (
      <div className="space-y-6">
        <H>Validation & Early Traction</H>
        <Panel>
          <div className="space-y-6">
            {/* Customer logos */}
            <div className="flex items-center justify-center gap-8 md:gap-12 py-4">
              <div className="flex items-center justify-center h-16 w-32">
                <img src="/HIX_Wordmark_1cBlue_200.png" alt="HIX Corporation" className="max-h-12 max-w-full object-contain opacity-90" />
              </div>
              <div className="flex items-center justify-center h-16 w-32">
                <img src="/raven_logo_with_wordmark.png" alt="Raven Space Systems" className="max-h-12 max-w-full object-contain opacity-90" />
              </div>
            </div>

            {/* Results */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <img src="/HIX_Wordmark_1cBlue_200.png" alt="HIX" className="h-6 object-contain opacity-80" />
                  <span className="text-sm text-white/60">Pittsburg, KS</span>
                </div>
                <div className="text-lg font-semibold text-amber-200 mb-2">~50% Output Increase</div>
                <div className="text-white/85">Digitizing scheduling and floor visibility reduced backlog ~75%</div>
              </div>

              <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <img src="/raven_logo.png" alt="Raven" className="h-6 object-contain opacity-80" />
                  <span className="text-sm text-white/60">Kansas City, MO</span>
                </div>
                <div className="text-lg font-semibold text-amber-200 mb-2">Efficiency Gains</div>
                <div className="text-white/85">Data-driven decisions and cost reduction across operations</div>
              </div>
            </div>

            <div className="text-center text-lg">
              <div>Added <b>Foothold Labs</b> as an early adopter; growing pipeline of interested manufacturers.</div>
            </div>
          </div>
        </Panel>
      </div>
    ),
  },
  {
    key: "market",
    content: (
      <div className="space-y-6">
        <H>Market & ICP</H>
        <div className="grid md:grid-cols-2 gap-6">
          <FeatureCard
            icon={<MapPin className="w-5 h-5" />}
            title="Beachhead Market"
            highlight="Kansas City & Midwest"
            description="Start with supplier clusters in KC region, leveraging local manufacturing ecosystem and partnerships. Expand nationally through proven playbooks."
          />
          <FeatureCard
            icon={<Building2 className="w-5 h-5" />}
            title="Ideal Customer Profile"
            highlight="10-250 employees, $5M-$150M revenue"
            description="Entrepreneur-owners acquiring plants, CEOs/COOs seeking growth, plant leaders needing modernization without massive disruption."
          />
        </div>
        <Panel style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-amber-300">$25.8B</div>
              <div className="text-sm text-white/60">MES Market by 2030</div>
              <a href="https://www.marketsandmarkets.com/Market-Reports/manufacturing-execution-systems-mes-market-536.html" target="_blank" rel="noopener noreferrer" className="text-xs text-amber-400 hover:text-amber-300 underline">Source: MarketsandMarkets</a>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-300">$359B</div>
              <div className="text-sm text-white/60">Smart Manufacturing Software by 2032</div>
              <a href="https://www.fortunebusinessinsights.com/software-for-smart-manufacturing-market-110142" target="_blank" rel="noopener noreferrer" className="text-xs text-amber-400 hover:text-amber-300 underline">Source: Fortune BI</a>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-300">10.1%</div>
              <div className="text-sm text-white/60">MES Market CAGR</div>
              <a href="https://www.marketsandmarkets.com/Market-Reports/manufacturing-execution-systems-mes-market-536.html" target="_blank" rel="noopener noreferrer" className="text-xs text-amber-400 hover:text-amber-300 underline">Source: MarketsandMarkets</a>
            </div>
          </div>
        </Panel>
      </div>
    ),
  },
  {
    key: "competition",
    content: (
      <div className="space-y-6">
        <H>Competition & Differentiation</H>
        <div className="space-y-6">
          {/* Competition */}
          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard
              icon={<Building2 className="w-5 h-5" />}
              title="Enterprise Solutions"
              highlight="SAP, Oracle, Siemens, Rockwell"
              description={
                <>
                  Powerful but costly ($500K-$5M+), slow implementation (12-36 months), consultant-heavy, over-engineered for SMBs. Complex and expensive integrations with a{" "}
                  <a href="https://www.mckinsey.com/capabilities/transformation/our-insights/why-do-most-transformations-fail-a-conversation-with-harry-robinson" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline">
                    70% failure rate
                  </a>.
                </>
              }
            />
            <FeatureCard
              icon={<Boxes className="w-5 h-5" />}
              title="Point Solutions"
              highlight="Katana, Tulip, MaintainX, Spreadsheets"
              description="Fragmented data silos, integration nightmares, hard to scale, limited visibility across operations."
            />
          </div>

          {/* Our Advantage */}
          <Panel style={goldGlass}>
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-amber-200">Hyperfactory Advantage</h3>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <Zap className="w-8 h-8 text-amber-300 mx-auto mb-2" />
                <div className="font-semibold">Phased Approach</div>
                <div className="text-sm text-white/70">90-day pilots</div>
              </div>
              <div className="text-center">
                <Cpu className="w-8 h-8 text-amber-300 mx-auto mb-2" />
                <div className="font-semibold">AI-Guided</div>
                <div className="text-sm text-white/70">Smart orchestration</div>
              </div>
              <div className="text-center">
                <Globe className="w-8 h-8 text-amber-300 mx-auto mb-2" />
                <div className="font-semibold">Vendor-Neutral</div>
                <div className="text-sm text-white/70">Open standards</div>
              </div>
              <div className="text-center">
                <Lock className="w-8 h-8 text-amber-300 mx-auto mb-2" />
                <div className="font-semibold">Customer-Owned</div>
                <div className="text-sm text-white/70">Your data, your control</div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    ),
  },
  {
    key: "gtm",
    content: (
      <div className="space-y-6">
        <H sub="Strategic market entry through proven channels and partnerships">Go-To-Market Strategy</H>
        <Panel>
          <div className="grid md:grid-cols-2 gap-6 text-lg">
            <div>Start in KC: pilots → case studies, plant tours, workshops; partner with MEPs, chambers, LaunchKC, universities.</div>
            <div>Entrepreneur‑acquirer motion: lender/broker/attorney channels, search‑fund communities, targeted outreach; “Day‑100 Modernization” pilot.</div>
          </div>
        </Panel>
      </div>
    ),
  },
  {
    key: "model",
    content: (
      <div className="space-y-6">
        <H>Business Model</H>
        <div className="grid md:grid-cols-2 gap-6">
          <FeatureCard
            icon={<DollarSign className="w-5 h-5" />}
            title="SaaS Platform"
            highlight="Recurring Revenue Model"
            description="Subscription-based platform with phased onboarding and targeted integrations. Predictable, scalable revenue stream."
          />
          <FeatureCard
            icon={<TrendingUp className="w-5 h-5" />}
            title="Growth Strategy"
            highlight="Pilots → Full Deployment"
            description="12-24 month expansion across lines/sites. Start small, prove value, scale systematically for durable ARR."
          />
        </div>
        <Panel style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-amber-300">$5K-50K</div>
              <div className="text-sm text-white/80">Monthly ARR per site</div>
              <div className="text-xs text-white/60">Based on complexity</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-300">90 Days</div>
              <div className="text-sm text-white/80">Time to first value</div>
              <div className="text-xs text-white/60">Pilot deployment</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-300">3-5x</div>
              <div className="text-sm text-white/80">ROI within 12 months</div>
              <div className="text-xs text-white/60">Typical customer outcome</div>
            </div>
          </div>
        </Panel>
      </div>
    ),
  },
  {
    key: "ip",
    content: (
      <div className="space-y-6">
        <H>IP & Data Ownership</H>
        <div className="grid md:grid-cols-2 gap-6">
          <FeatureCard
            icon={<Lock className="w-5 h-5" />}
            title="Vertec Platform IP"
            highlight="Protected Core Technology"
            description="We own architecture, orchestration, configs, connectors/schemas, UX/UI, and agent logic. Built on OSS with strict compliance, trade secrets protected."
          />
          <FeatureCard
            icon={<Shield className="w-5 h-5" />}
            title="Customer Data Ownership"
            highlight="No Lock-in Strategy"
            description="Customers own their data completely. Open schemas and standards ensure portability. Your data, your control, your choice."
          />
        </div>
        <Panel style={goldGlass}>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <Cpu className="w-8 h-8 text-amber-300 mx-auto mb-2" />
              <div className="font-semibold">Platform IP</div>
              <div className="text-sm text-white/70">Vertec proprietary</div>
            </div>
            <div>
              <Globe className="w-8 h-8 text-amber-300 mx-auto mb-2" />
              <div className="font-semibold">Open Standards</div>
              <div className="text-sm text-white/70">No vendor lock-in</div>
            </div>
            <div>
              <Lock className="w-8 h-8 text-amber-300 mx-auto mb-2" />
              <div className="font-semibold">Customer Data</div>
              <div className="text-sm text-white/70">100% customer owned</div>
            </div>
          </div>
        </Panel>
      </div>
    ),
  },
  {
    key: "challenges",
    content: (
      <div className="space-y-6">
        <H>Near-Term Challenges & Plan</H>
        <div className="grid md:grid-cols-2 gap-6">
          <FeatureCard
            icon={<Wrench className="w-5 h-5" />}
            title="Product Development"
            highlight="Standardize & Scale"
            description="Standardize connectors/playbooks, harden Day-100 pilot, focus on high-ROI workflows for rapid deployment."
          />
          <FeatureCard
            icon={<BarChart3 className="w-5 h-5" />}
            title="Prove ROI"
            highlight="Measurable Outcomes"
            description="90-day targets with lead-time/OTD/downtime metrics. Publish reference cases and customer success stories."
          />
          <FeatureCard
            icon={<Users className="w-5 h-5" />}
            title="Sales & Change Management"
            highlight="Human-Centered Approach"
            description="Sell to owners with mandate, shop-floor demos, human-in-the-loop implementation for smooth adoption."
          />
          <FeatureCard
            icon={<Lightbulb className="w-5 h-5" />}
            title="Talent & Infrastructure"
            highlight="LaunchKC Investment"
            description="Hire key engineers, build live demo floor for customer tours and real equipment integration testing."
          />
        </div>
      </div>
    ),
  },
  {
    key: "team",
    content: (
      <div className="space-y-6">
        <H>Team</H>
        <Panel>
          <div className="space-y-8">
            {/* Founder */}
            <div className="flex flex-col items-center">
              <TeamMember
                name="Arturo Pino"
                role="Founder/CEO"
                isFounder={true}
                image="/professional_img.jpg"
              />
            </div>

            {/* Team Structure */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Full Time */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-amber-300" />
                  <h3 className="text-xl font-semibold">Full Time</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <TeamMember name="Josue Peña" role="Sr. Applications Engineer" />
                  <TeamMember name="Riley Connors" role="Software Engineer I" />
                  <TeamMember name="Elijah Malcom" role="Technical Specialist" />
                </div>
              </div>

              {/* Part Time */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <UserCheck className="w-5 h-5 text-amber-300" />
                  <h3 className="text-xl font-semibold">Part Time</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <TeamMember name="Jose Cepeda" role="Cybersecurity" />
                  <TeamMember name="Rivan Shahriar" role="Software Engineer I" />
                  <TeamMember name="Luke Malcom" role="Software Engineer Intern" />
                  <TeamMember name="Isaiah Fenton" role="Integration Intern" />
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    ),
  },
  {
    key: "funds",
    content: (
      <div className="space-y-6">
        <H>Use of LaunchKC Funds</H>
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          <div>
            <FeatureCard
              icon={<Factory className="w-6 h-6" />}
              title="Manufacturing Development Facility (MDF)"
              description="Our headquarters and demonstration space where we implement Hyperfactory deployments with real equipment. A place to bring manufacturing partners, operators, young people, technicians, and business leaders to see and understand what Hyperfactory looks like in action."
            />
            <div className="mt-4">
              <FeatureCard
                icon={<Users className="w-6 h-6" />}
                title="Team Expansion"
                description="Convert part-time engineers to full-time to accelerate delivery. Focus on core platform development and customer implementation support."
              />
            </div>
            <div className="mt-4">
              <FeatureCard
                icon={<Lightbulb className="w-6 h-6" />}
                title="Playbook Development"
                description="Create repeatable deployment methodologies and training programs to reduce time-to-value and enable scalable growth across customers."
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <img
              src="/vertec_factory_space.jpg"
              alt="Vertec Manufacturing Development Facility"
              className="w-full h-auto rounded-2xl shadow-lg border border-white/20"
            />
            <div className="text-center mt-4 text-white/80 text-sm">
              Manufacturing Development Facility - Current State
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "close",
    content: (
      <div className="space-y-8 relative">
        {console.log("🎯 CLOSE SLIDE: Active")}

        {/* Simple Thank You */}
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold text-amber-300">
              Thank You
            </h2>
            <p className="text-2xl md:text-3xl text-white/80">
              Questions? Let's talk.
            </p>
          </div>

          {/* Website */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 text-amber-300">
              <Globe className="w-8 h-8" />
              <span className="text-3xl font-bold">hyperfactory.com</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 space-y-4">
            <div className="flex justify-center">
              <button
                className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xl rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                onClick={() => window.open('mailto:contact@hyperfactory.com', '_blank')}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

// --- Root Deck -------------------------------------------------------------
export default function HyperfactorySlides() {
  const [i, setI] = useState(0);
  const clamp = useCallback((n) => Math.max(0, Math.min(slides.length - 1, n)), []);
  const next = useCallback(() => setI((n) => clamp(n + 1)), [clamp]);
  const prev = useCallback(() => setI((n) => clamp(n - 1)), [clamp]);
  const backToStart = useCallback(() => setI(0), []);



  useEffect(() => {
    const onKey = (e) => {
      if (["ArrowRight", "KeyD"].includes(e.code)) next();
      if (["ArrowLeft", "KeyA"].includes(e.code)) prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);



  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `
      }} />
      <div className="h-screen w-full bg-black text-white flex flex-col overflow-hidden relative">

      {/* Top bar */}
      <header className="px-4 md:px-10 py-4 border-b border-white/10 flex items-center justify-between relative" style={{ zIndex: 10 }}>
        <div className="flex items-center gap-2 md:gap-3">
          <img src="/vertec.png" alt="Vertec" className="h-6 w-6 md:h-8 md:w-8 object-contain" />
          <span className="font-bold tracking-wide text-sm md:text-base">VERTEC / HYPERFACTORY</span>
          <span className="text-white/40 hidden md:inline text-sm">— slide {i + 1} of {slides.length}</span>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={prev}
            disabled={i === 0}
            className={`rounded-lg px-2 py-1 md:px-3 md:py-2 border border-white/15 transition flex items-center gap-1 md:gap-2 text-sm md:text-base ${
              i === 0
                ? 'bg-white/5 text-white/30 cursor-not-allowed'
                : 'bg-white/5 hover:bg-white/10 text-white'
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Prev
          </button>
          <button
            onClick={i === slides.length - 1 ? backToStart : next}
            className="rounded-lg px-2 py-1 md:px-3 md:py-2 border border-white/15 transition flex items-center gap-1 md:gap-2 text-sm md:text-base bg-white/5 hover:bg-white/10 text-white"
          >
            {i === slides.length - 1 ? (
              <>Back to Start <ArrowLeft className="w-4 h-4" /></>
            ) : (
              <>Next <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </header>

      {/* Slide stage */}
      <main className="flex-1 flex items-start sm:items-center justify-center px-3 sm:px-4 md:px-6 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-10 relative overflow-y-auto">
        {/* Geometric Background for first and last slides - covers main area only */}
        {(slides[i].key === "background-only" || slides[i].key === "title" || slides[i].key === "close") && (
          <GeometricBackground />
        )}



        <div className="w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl relative" style={{ zIndex: 10 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[i].key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              {slides[i].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-10 py-4 border-t border-white/10 text-white/60 text-sm flex items-center justify-between">
        <div>© {new Date().getFullYear()} Vertec LLC — All rights reserved.</div>
        <div className="flex items-center gap-4">
          {/* <a className="hover:text-white" href="#">Privacy</a>
          <a className="hover:text-white" href="#">Terms</a>
          <a className="hover:text-white" href="#">Contact</a> */}
        </div>
      </footer>
    </div>
    </>
  );
}
