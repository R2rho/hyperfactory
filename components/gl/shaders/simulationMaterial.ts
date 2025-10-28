import * as THREE from "three"
import { periodicNoiseGLSL } from "./utils"

// Function to generate equally distributed points on a plane
function getPlane(count: number, components: number, size = 512, scale = 1.0) {
  const length = count * components
  const data = new Float32Array(length)

  for (let i = 0; i < count; i++) {
    const i4 = i * components

    // Calculate grid position
    const x = (i % size) / (size - 1) // Normalize to [0, 1]
    const z = Math.floor(i / size) / (size - 1) // Normalize to [0, 1]

    // Convert to centered coordinates [-0.5, 0.5] and apply scale
    data[i4 + 0] = (x - 0.5) * 2 * scale // X position: scaled range
    data[i4 + 1] = 0 // Y position: flat plane at y=0
    data[i4 + 2] = (z - 0.5) * 2 * scale // Z position: scaled range
    data[i4 + 3] = 1.0 // W component (for RGBA texture)
  }

  return data
}

// Generate a grid/mesh pattern with regular spacing
function getGridMesh(count: number, components: number, size = 512, scale = 1.0) {
  const length = count * components
  const data = new Float32Array(length)

  for (let i = 0; i < count; i++) {
    const i4 = i * components

    const x = (i % size) / (size - 1)
    const z = Math.floor(i / size) / (size - 1)

    // Create grid lines by emphasizing certain positions
    const gridSpacing = 0.05 // 5% spacing for grid lines
    const isGridLineX = Math.abs(x % gridSpacing) < 0.002
    const isGridLineZ = Math.abs(z % gridSpacing) < 0.002

    data[i4 + 0] = (x - 0.5) * 2 * scale
    data[i4 + 1] = isGridLineX || isGridLineZ ? 0.05 : 0 // Slight elevation for grid lines
    data[i4 + 2] = (z - 0.5) * 2 * scale
    data[i4 + 3] = 1.0
  }

  return data
}

// Generate a woven fabric pattern with interlacing
function getWovenMesh(count: number, components: number, size = 512, scale = 1.0) {
  const length = count * components
  const data = new Float32Array(length)

  for (let i = 0; i < count; i++) {
    const i4 = i * components

    const x = (i % size) / (size - 1)
    const z = Math.floor(i / size) / (size - 1)

    // Create weave pattern
    const weaveFreq = 20
    const xWeave = Math.floor(x * weaveFreq) % 2
    const zWeave = Math.floor(z * weaveFreq) % 2
    const weaveHeight = xWeave !== zWeave ? 0.03 : -0.03

    data[i4 + 0] = (x - 0.5) * 2 * scale
    data[i4 + 1] = weaveHeight
    data[i4 + 2] = (z - 0.5) * 2 * scale
    data[i4 + 3] = 1.0
  }

  return data
}

// Generate a hexagonal mesh pattern (like chain-link fence)
function getHexMesh(count: number, components: number, size = 512, scale = 1.0) {
  const length = count * components
  const data = new Float32Array(length)

  for (let i = 0; i < count; i++) {
    const i4 = i * components

    const x = (i % size) / (size - 1)
    const z = Math.floor(i / size) / (size - 1)

    // Create hexagonal pattern
    const hexSize = 0.08
    const hexX = x / hexSize
    const hexZ = z / hexSize

    // Offset every other row for hex pattern
    const rowOffset = Math.floor(hexZ) % 2 === 0 ? 0 : 0.5
    const hexCol = Math.floor(hexX + rowOffset)
    const hexRow = Math.floor(hexZ)

    // Calculate distance to hex center
    const centerX = (hexCol - rowOffset) * hexSize + hexSize / 2
    const centerZ = hexRow * hexSize + hexSize / 2
    const distToCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(z - centerZ, 2))

    // Create hex wire frame
    const isWire = distToCenter > hexSize * 0.35 && distToCenter < hexSize * 0.45

    data[i4 + 0] = (x - 0.5) * 2 * scale
    data[i4 + 1] = isWire ? 0.04 : 0
    data[i4 + 2] = (z - 0.5) * 2 * scale
    data[i4 + 3] = 1.0
  }

  return data
}

// Generate a diagonal mesh pattern
function getDiagonalMesh(count: number, components: number, size = 512, scale = 1.0) {
  const length = count * components
  const data = new Float32Array(length)

  for (let i = 0; i < count; i++) {
    const i4 = i * components

    const x = (i % size) / (size - 1)
    const z = Math.floor(i / size) / (size - 1)

    // Create diagonal grid pattern
    const diagSpacing = 0.04
    const diag1 = Math.abs((x + z) % diagSpacing) < 0.002
    const diag2 = Math.abs((x - z) % diagSpacing) < 0.002

    data[i4 + 0] = (x - 0.5) * 2 * scale
    data[i4 + 1] = diag1 || diag2 ? 0.05 : 0
    data[i4 + 2] = (z - 0.5) * 2 * scale
    data[i4 + 3] = 1.0
  }

  return data
}



export class SimulationMaterial extends THREE.ShaderMaterial {
  constructor(scale = 10.0, geometryType: "plane" | "grid" | "woven" | "hex" | "diagonal" = "plane") {
    let positionsData: Float32Array
    switch (geometryType) {
      case "plane":
        positionsData = getPlane(512 * 512, 4, 512, scale)
        break
      case "grid":
        positionsData = getGridMesh(512 * 512, 4, 512, scale)
        break
      case "woven":
        positionsData = getWovenMesh(512 * 512, 4, 512, scale)
        break
      case "hex":
        positionsData = getHexMesh(512 * 512, 4, 512, scale)
        break
      case "diagonal":
        positionsData = getDiagonalMesh(512 * 512, 4, 512, scale)
        break
      default:
        positionsData = getPlane(512 * 512, 4, 512, scale)
    }

    const positionsTexture = new THREE.DataTexture(positionsData, 512, 512, THREE.RGBAFormat, THREE.FloatType)
    positionsTexture.needsUpdate = true

    let geometryTypeValue = 0.0
    switch (geometryType) {
      case "plane":
        geometryTypeValue = 0.0
        break
      case "grid":
        geometryTypeValue = 1.0
        break
      case "woven":
        geometryTypeValue = 2.0
        break
      case "hex":
        geometryTypeValue = 3.0
        break
      case "diagonal":
        geometryTypeValue = 4.0
        break
    }

    super({
      vertexShader: /* glsl */ `varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
      fragmentShader: /* glsl */ `uniform sampler2D positions;
      uniform float uTime;
      uniform float uNoiseScale;
      uniform float uNoiseIntensity;
      uniform float uTimeScale;
      uniform float uLoopPeriod;
      uniform float uGeometryType;
      varying vec2 vUv;

      ${periodicNoiseGLSL}

      void main() {
        vec3 originalPos = texture2D(positions, vUv).rgb;
        vec3 finalPos = originalPos;
        
        float continuousTime = uTime * uTimeScale * (6.28318530718 / uLoopPeriod);
        
        // Plane: flowing wave with noise
        if (uGeometryType < 0.5) {
          vec3 noiseInput = originalPos * uNoiseScale;
          float displacementX = periodicNoise(noiseInput + vec3(0.0, 0.0, 0.0), continuousTime);
          float displacementY = periodicNoise(noiseInput + vec3(50.0, 0.0, 0.0), continuousTime + 2.094);
          float displacementZ = periodicNoise(noiseInput + vec3(0.0, 50.0, 0.0), continuousTime + 4.188);
          vec3 distortion = vec3(displacementX, displacementY, displacementZ) * uNoiseIntensity;
          finalPos = originalPos + distortion;
        }
        // Grid: pulsing grid pattern
        else if (uGeometryType < 1.5) {
          float gridSize = 8.0;
          float gridX = mod(originalPos.x * gridSize, 1.0);
          float gridZ = mod(originalPos.z * gridSize, 1.0);
          float isGridLine = step(0.9, gridX) + step(0.9, gridZ);
          float pulse = sin(continuousTime * 2.0) * 0.5 + 0.5;
          finalPos.y = isGridLine * pulse * 0.3;
        }
        // Woven: alternating wave pattern
        else if (uGeometryType < 2.5) {
          float weaveFreq = 12.0;
          float xWeave = mod(floor(originalPos.x * weaveFreq), 2.0);
          float zWeave = mod(floor(originalPos.z * weaveFreq), 2.0);
          float weavePattern = xWeave + zWeave;
          float wave = sin(continuousTime * 2.0 + weavePattern * 3.14159) * 0.2;
          finalPos.y = wave;
        }
        // Hex: hexagonal ripple pattern
        else if (uGeometryType < 3.5) {
          float hexSize = 0.15;
          vec2 hexCoord = vec2(originalPos.x, originalPos.z) / hexSize;
          float hexRow = floor(hexCoord.y);
          float hexCol = floor(hexCoord.x + mod(hexRow, 2.0) * 0.5);
          vec2 hexCenter = vec2(hexCol * hexSize + mod(hexRow, 2.0) * hexSize * 0.5, hexRow * hexSize);
          float distToCenter = length(vec2(originalPos.x, originalPos.z) - hexCenter);
          float ripple = sin(distToCenter * 20.0 - continuousTime * 3.0) * 0.15;
          finalPos.y = ripple;
        }
        // Diagonal: diagonal wave propagation
        else if (uGeometryType < 4.5) {
          float diagonal = (originalPos.x + originalPos.z) * 3.0;
          float wave = sin(diagonal - continuousTime * 2.0) * 0.25;
          finalPos.y = wave;
        }
        
        gl_FragColor = vec4(finalPos, 1.0);
      }`,
      uniforms: {
        positions: { value: positionsTexture },
        uTime: { value: 0 },
        uNoiseScale: { value: 1.0 },
        uNoiseIntensity: { value: 0.5 },
        uTimeScale: { value: 1 },
        uLoopPeriod: { value: 24.0 },
        uGeometryType: { value: geometryTypeValue },
      },
    })
  }
}
