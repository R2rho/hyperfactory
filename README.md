# Hyperfactory

A cutting-edge platform for visualizing and interacting with dynamic particle systems and geometric visualizations. Hyperfactory combines real-time 3D rendering with interactive controls to create immersive data visualization experiences.

## Features

- **Interactive 3D Particle Systems**: Real-time WebGL-based particle rendering with multiple geometry types
- **Multiple Geometry Modes**:
  - Wave: Flowing wave patterns with organic motion
  - Grid Mesh: Structured grid with pulsing patterns
  - Woven Mesh: Interlacing fabric-like patterns
  - Hex Mesh: Hexagonal ripple effects
  - Diagonal Mesh: Diagonal wave propagation
  - USA Map: Geographic visualization with data center hotspots
- **Advanced Controls**: Fine-tune particle behavior with real-time parameter adjustment
- **Smooth Animations**: Reveal, animate, and fade transitions between geometries
- **Responsive Design**: Optimized for desktop viewing with modern UI components

## Getting Started

### Prerequisites

- Node.js 20.11.0 or higher
- npm 10.5.0 or higher

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build

```bash
npm run build
npm start
```

## Technology Stack

- **Framework**: Next.js 15 with React 19
- **3D Rendering**: Three.js with React Three Fiber
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: shadcn/ui
- **Controls**: Leva for real-time parameter adjustment
- **Shaders**: Custom GLSL shaders for particle simulation and rendering

## Architecture

The application uses a GPU-based particle simulation system:

1. **Simulation Material**: Computes particle positions on the GPU using fragment shaders
2. **Point Material**: Renders particles with depth-of-field effects and custom glimmer patterns
3. **Geometry Generators**: CPU-side geometry creation for each visualization type
4. **Animation Pipeline**: Reveal → Animate → Fade cycle with smooth transitions

## License

MIT
