'use client'

import React, { useEffect, useRef, useState } from "react";

type ColorScheme = 'gold' | 'bronze' | 'silver' | 'aluminum' | 'copper' | 'carbon' | 'platinum' | 'steelblue' | 'sage';

// Color scheme definitions
const colorSchemes = {
  gold: {
    bright: 'rgba(255, 215, 0, 0.9)',
    medium: 'rgba(218, 165, 32, 0.7)',
    dark: 'rgba(184, 134, 11, 0.5)'
  },
  bronze: {
    bright: 'rgba(205, 127, 50, 0.9)',
    medium: 'rgba(160, 82, 45, 0.7)',
    dark: 'rgba(101, 67, 33, 0.5)'
  },
  silver: {
    bright: 'rgba(192, 192, 192, 0.9)',
    medium: 'rgba(169, 169, 169, 0.7)',
    dark: 'rgba(128, 128, 128, 0.5)'
  },
  aluminum: {
    bright: 'rgba(220, 220, 220, 0.9)',
    medium: 'rgba(180, 180, 180, 0.7)',
    dark: 'rgba(140, 140, 140, 0.5)'
  },
  copper: {
    bright: 'rgba(184, 115, 51, 0.9)',
    medium: 'rgba(138, 85, 38, 0.7)',
    dark: 'rgba(92, 57, 25, 0.5)'
  },
  carbon: {
    bright: 'rgba(80, 80, 80, 0.9)',
    medium: 'rgba(60, 60, 60, 0.7)',
    dark: 'rgba(40, 40, 40, 0.5)'
  },
  platinum: {
    bright: 'rgba(229, 228, 226, 0.9)',
    medium: 'rgba(196, 195, 193, 0.7)',
    dark: 'rgba(163, 162, 160, 0.5)'
  },
  steelblue: {
    bright: 'rgba(176, 196, 222, 0.9)',
    medium: 'rgba(119, 136, 153, 0.7)',
    dark: 'rgba(70, 130, 180, 0.5)'
  },
  sage: {
    bright: 'rgba(117, 140, 88, 0.9)',    // #758c58 with high opacity
    medium: 'rgba(117, 140, 88, 0.7)',    // #758c58 with medium opacity
    dark: 'rgba(117, 140, 88, 0.5)'       // #758c58 with low opacity
  }
};

export const GeometricBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const animationSpeed = 8; // Fixed speed
  const meshOpacity = 0.3; // Fixed opacity (30%)
  const [colorScheme, setColorScheme] = useState<ColorScheme>('gold');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

      // 3D Surface Parameters - Mobile responsive with performance optimization
      const isMobile = width < 768;
      const vanishingPointX = width / 2;
      const vanishingPointY = isMobile ? height * 0.05 : height * 0.05; // Much lower vanishing point on mobile
      // Reduce grid complexity for better performance
      const surfaceRows = isMobile ? 8 : 12;
      const surfaceCols = isMobile ? 10 : 16;
      
      // Get current color scheme
      const currentColors = colorSchemes[colorScheme];
      const brightColor = currentColors.bright;
      const mediumColor = currentColors.medium;
      const darkColor = currentColors.dark;

      // Generate height map for industrial topology
      const getHeight = (x: number, z: number, time: number) => {
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
          // Much less aggressive perspective on mobile for better visibility
          const perspectiveStrength = isMobile ? 0.95 : 0.65;
          const scale1 = 1 - depth1 * perspectiveStrength;
          const scale2 = 1 - depth2 * perspectiveStrength;

          // Get heights for topology
          const h1 = getHeight(x1 * 8, z1 * 8, time);
          const h2 = getHeight(x2 * 8, z1 * 8, time);
          const h3 = getHeight(x1 * 8, z2 * 8, time);
          const h4 = getHeight(x2 * 8, z2 * 8, time);

          // Project to screen coordinates with proper perspective
          // Foreground (z=0) should be wide, background (z=1) should converge to vanishing point
          // Mobile-friendly width scaling - much less dramatic convergence
          const foregroundWidth = isMobile ? width * 2.5 : width * 1.2; // Slightly less wide on mobile
          const backgroundWidth = isMobile ? width * 0.5 : width * 0.15; // Much less narrow at top on mobile

          const currentWidth1 = foregroundWidth * (1 - depth1) + backgroundWidth * depth1;
          const currentWidth2 = foregroundWidth * (1 - depth2) + backgroundWidth * depth2;

          const screenX1 = vanishingPointX + (x1 * currentWidth1 * 0.5);
          const screenX2 = vanishingPointX + (x2 * currentWidth1 * 0.5);
          const screenX3 = vanishingPointX + (x1 * currentWidth2 * 0.5);
          const screenX4 = vanishingPointX + (x2 * currentWidth2 * 0.5);

          // Y coordinates: bottom of screen to vanishing point
          // Mobile-friendly Y positioning - start higher up on mobile
          const bottomY = isMobile ? height * 0.9 : height * 0.9;
          const baseY1 = bottomY * (1 - depth1) + vanishingPointY * depth1;
          const baseY2 = bottomY * (1 - depth2) + vanishingPointY * depth2;

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
            surfaceColor = brightColor;
          } else if (depth1 < 0.6) {
            surfaceColor = mediumColor;
          } else {
            surfaceColor = darkColor;
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
  }, [animationSpeed, meshOpacity, colorScheme]); // Re-run effect when animation speed, opacity, or color scheme changes

  return (
    <>
      {/* Temporary Color Selector - Outside the pointer-events-none container */}
      {/* <div className="fixed top-20 right-4 z-50 pointer-events-auto">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-white/20">
          <div className="text-white text-xs mb-2 font-medium">Surface Material</div>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(colorSchemes).map((scheme) => (
              <button
                key={scheme}
                onClick={() => setColorScheme(scheme as ColorScheme)}
                className={`px-3 py-1.5 text-xs rounded capitalize transition-all ${
                  colorScheme === scheme
                    ? 'bg-yellow-600 text-black font-medium'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {scheme}
              </button>
            ))}
          </div>
        </div>
      </div> */}

      {/* Canvas Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)', // Force hardware acceleration
          }}
        />
      </div>
    </>
  );
};