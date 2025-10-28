import * as THREE from "three"
import { periodicNoiseGLSL } from "./utils"

export class DofPointsMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader: /* glsl */ `
      uniform sampler2D positions;
      uniform sampler2D initialPositions;
      uniform float uTime;
      uniform float uFocus;
      uniform float uFov;
      uniform float uBlur;
      uniform float uPointSize;
      varying float vDistance;
      varying float vPosY;
      varying vec3 vWorldPosition;
      varying vec3 vInitialPosition;
      void main() { 
        vec3 pos = texture2D(positions, position.xy).xyz;
        vec3 initialPos = texture2D(initialPositions, position.xy).xyz;
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        vDistance = abs(uFocus - -mvPosition.z);
        vPosY = pos.y;
        vWorldPosition = pos;
        vInitialPosition = initialPos;
        gl_PointSize = max(vDistance * uBlur * uPointSize, 3.0);
      }`,
      fragmentShader: /* glsl */ `
      uniform float uOpacity;
      uniform float uRevealFactor;
      uniform float uRevealProgress;
      uniform float uTime;
      uniform float uGeometryType;
      varying float vDistance;
      varying float vPosY;
      varying vec3 vWorldPosition;
      varying vec3 vInitialPosition;
      uniform float uTransition;

      ${periodicNoiseGLSL}

      // Original industrial data pulse - used for grid geometry
      float gridDataPulse(vec3 worldPos, vec3 seed, float time) {
        // Grid-based coordinates for organized patterns
        vec2 gridPos = floor(worldPos.xz * 4.0);

        // Create unique ID for each grid cell
        float cellId = gridPos.x * 100.0 + gridPos.y;
        float cellHash = fract(sin(cellId * 127.1) * 43758.5453);

        // Traveling wave across the grid (diagonal sweep)
        float wave = sin((gridPos.x + gridPos.y) * 0.3 - time * 0.4) * 0.5 + 0.5;

        // Pulsing zones - different areas pulse at different rates
        float zoneX = floor(worldPos.x * 1.5);
        float zoneZ = floor(worldPos.z * 1.5);
        float zoneId = zoneX * 10.0 + zoneZ;
        float zoneHash = fract(sin(zoneId * 311.7) * 74.7);
        float zonePulse = sin(time * (0.5 + zoneHash * 0.3) + zoneHash * 6.28318) * 0.5 + 0.5;

        // Heartbeat rhythm
        float heartbeat = time * 0.8;
        float beat1 = smoothstep(0.0, 0.15, sin(heartbeat)) * smoothstep(0.3, 0.15, sin(heartbeat));
        float beat2 = smoothstep(0.0, 0.15, sin(heartbeat + 0.5)) * smoothstep(0.3, 0.15, sin(heartbeat + 0.5));
        float heartbeatPattern = (beat1 + beat2 * 0.7) * 0.3;

        // Random sensor activations
        float sensorTrigger = step(0.985, sin(time * 1.2 + cellHash * 100.0));
        float sensorBurst = sensorTrigger * (1.0 - fract(time * 1.2 + cellHash * 100.0)) * 1.2;

        // Combine patterns
        float baseBrightness = 0.7;
        float waveBrightness = wave * 0.2;
        float zoneBrightness = zonePulse * 0.15;
        float heartbeatBrightness = heartbeatPattern * 0.25;
        float sensorBrightness = sensorBurst * 0.8;

        float brightness = baseBrightness + waveBrightness + zoneBrightness + heartbeatBrightness + sensorBrightness;
        return clamp(brightness, 0.6, 1.8);
      }

      // Woven glimmer - interlacing wave patterns with neural pulses
      float wovenGlimmer(vec3 worldPos, vec3 seed, float time) {
        float weaveFreq = 12.0;
        float xWeave = mod(floor(worldPos.x * weaveFreq), 2.0);
        float zWeave = mod(floor(worldPos.z * weaveFreq), 2.0);
        float weavePattern = xWeave + zWeave;

        // Create unique ID for each weave cell
        float cellId = floor(worldPos.x * weaveFreq) * 100.0 + floor(worldPos.z * weaveFreq);
        float cellHash = fract(sin(cellId * 127.1) * 43758.5453);

        // Strong traveling waves
        float wave1 = sin(time * 2.5 + weavePattern * 3.14159) * 0.5 + 0.5;
        float wave2 = sin(time * 2.0 - weavePattern * 1.57) * 0.5 + 0.5;

        // Neural pulse - sharp activation
        float neuralPulse = sin(time * (1.5 + cellHash * 1.0) + cellHash * 6.28318) * 0.5 + 0.5;
        float neuralSharp = pow(neuralPulse, 2.0); // Make peaks sharper

        float brightness = 0.5 + wave1 * 0.35 + wave2 * 0.25 + neuralSharp * 0.4;
        return clamp(brightness, 0.4, 2.2);
      }

      // Hex glimmer - rippling hexagonal patterns with neural flashes
      float hexGlimmer(vec3 worldPos, vec3 seed, float time) {
        float hexSize = 0.15;
        vec2 hexCoord = vec2(worldPos.x, worldPos.z) / hexSize;
        float hexRow = floor(hexCoord.y);
        float hexCol = floor(hexCoord.x + mod(hexRow, 2.0) * 0.5);
        vec2 hexCenter = vec2(hexCol * hexSize + mod(hexRow, 2.0) * hexSize * 0.5, hexRow * hexSize);
        float distToCenter = length(vec2(worldPos.x, worldPos.z) - hexCenter);

        // Strong ripple effect
        float ripple = sin(distToCenter * 35.0 - time * 6.0) * 0.5 + 0.5;
        float rippleSharp = pow(ripple, 1.5);

        float hexId = hexCol * 100.0 + hexRow;
        float hexHash = fract(sin(hexId * 127.1) * 43758.5453);

        // Neural pulse with sharp peaks
        float hexPulse = sin(time * (1.2 + hexHash * 0.8)) * 0.5 + 0.5;
        float hexSharp = pow(hexPulse, 2.5);

        float brightness = 0.45 + rippleSharp * 0.4 + hexSharp * 0.5;
        return clamp(brightness, 0.35, 2.3);
      }

      // Diagonal glimmer - sweeping diagonal waves with neural activity
      float diagonalGlimmer(vec3 worldPos, vec3 seed, float time) {
        float diagonal = (worldPos.x + worldPos.z) * 3.0;
        float wave1 = sin(diagonal - time * 3.5) * 0.5 + 0.5;
        float wave2 = sin(diagonal + time * 2.5) * 0.5 + 0.5;

        float perpDiag = (worldPos.x - worldPos.z) * 2.0;
        float wave3 = sin(perpDiag - time * 2.0) * 0.5 + 0.5;

        // Sharp peaks for neural effect
        float wave1Sharp = pow(wave1, 1.8);
        float wave2Sharp = pow(wave2, 1.8);
        float wave3Sharp = pow(wave3, 2.0);

        float brightness = 0.5 + wave1Sharp * 0.35 + wave2Sharp * 0.25 + wave3Sharp * 0.3;
        return clamp(brightness, 0.4, 2.1);
      }

      // USA glimmer - scattered data center hotspots with neural firing
      float usaGlimmer(vec3 worldPos, vec3 seed, float time) {
        vec2 pos2d = vec2(worldPos.x, worldPos.z);

        // Major data center locations
        vec2 centers[5];
        centers[0] = vec2(-0.6, 0.3);   // West Coast
        centers[1] = vec2(0.0, 0.4);    // Central
        centers[2] = vec2(0.5, 0.2);    // East Coast
        centers[3] = vec2(0.3, -0.3);   // Southeast
        centers[4] = vec2(-0.3, 0.5);   // Northwest

        float totalInfluence = 0.0;
        for (int i = 0; i < 5; i++) {
          float dist = length(pos2d - centers[i]);
          // Faster, sharper pulses
          float pulse = sin(time * (1.0 + float(i) * 0.2) - dist * 12.0) * 0.5 + 0.5;
          float pulseSharp = pow(pulse, 1.5); // Sharp peaks
          float influence = exp(-dist * 6.0) * pulseSharp;
          totalInfluence += influence;
        }

        float brightness = 0.6 + totalInfluence * 1.0;
        return clamp(brightness, 0.5, 2.4);
      }

      // Plane glimmer - organic flowing waves with neural activity
      float planeGlimmer(vec3 worldPos, vec3 seed, float time) {
        float wave1 = sin(worldPos.x * 2.0 - time * 1.8) * 0.5 + 0.5;
        float wave2 = sin(worldPos.z * 1.8 + time * 1.4) * 0.5 + 0.5;
        float wave3 = sin((worldPos.x + worldPos.z) * 1.5 - time * 2.0) * 0.5 + 0.5;

        // Sharp peaks for neural effect
        float wave1Sharp = pow(wave1, 1.8);
        float wave2Sharp = pow(wave2, 1.8);
        float wave3Sharp = pow(wave3, 2.0);

        float brightness = 0.55 + wave1Sharp * 0.3 + wave2Sharp * 0.3 + wave3Sharp * 0.25;
        return clamp(brightness, 0.45, 2.0);
      }

      // Main glimmer dispatcher
      float getGlimmer(vec3 worldPos, vec3 seed, float time, float geometryType) {
        if (geometryType < 0.5) {
          return planeGlimmer(worldPos, seed, time);
        } else if (geometryType < 1.5) {
          return gridDataPulse(worldPos, seed, time);
        } else if (geometryType < 2.5) {
          return wovenGlimmer(worldPos, seed, time);
        } else if (geometryType < 3.5) {
          return hexGlimmer(worldPos, seed, time);
        } else if (geometryType < 4.5) {
          return diagonalGlimmer(worldPos, seed, time);
        } else {
          return usaGlimmer(worldPos, seed, time);
        }
      }

      float sdCircle(vec2 p, float r) {
        return length(p) - r;
      }

      void main() {
        vec2 cxy = 2.0 * gl_PointCoord - 1.0;

        // Define triangle vertices (equilateral triangle)
        vec2 p0 = vec2(0.0, -0.8);     // top tip (flipped Y)
        vec2 p1 = vec2(-0.7, 0.4);     // bottom left (flipped Y)
        vec2 p2 = vec2(0.7, 0.4);      // bottom right (flipped Y)

        float sdf = sdCircle(cxy, 0.5);

        if (sdf > 0.0) discard;

        // Calculate distance from center for reveal effect
        float distanceFromCenter = length(vWorldPosition.xz);

        // Add noise to the reveal threshold for organic edge
        float noiseValue = periodicNoise(vInitialPosition * 4.0, 0.0);
        float revealThreshold = uRevealFactor + noiseValue * 0.3;

        // Create reveal mask based on distance from center (inverted for proper reveal)
        float revealMask = 1.0 - smoothstep(revealThreshold - 0.2, revealThreshold + 0.1, distanceFromCenter);

        // Calculate geometry-specific glimmer brightness multiplier
        float glimmerBrightness = getGlimmer(vWorldPosition, vInitialPosition, uTime, uGeometryType);

        float alpha = (1.04 - clamp(vDistance, 0.0, 1.0)) * clamp(smoothstep(-0.5, 0.25, vPosY), 0.0, 1.0) * uOpacity * revealMask * uRevealProgress * glimmerBrightness;

        gl_FragColor = vec4(vec3(1.0), mix(alpha, glimmerBrightness - 1.1, uTransition));
      }`,
      uniforms: {
        positions: { value: null },
        initialPositions: { value: null },
        uTime: { value: 0 },
        uFocus: { value: 5.1 },
        uFov: { value: 50 },
        uBlur: { value: 30 },
        uTransition: { value: 0.0 },
        uPointSize: { value: 2.0 },
        uOpacity: { value: 1.0 },
        uRevealFactor: { value: 0.0 },
        uRevealProgress: { value: 0.0 },
        uGeometryType: { value: 0.0 },
      },
      transparent: true,
      // blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  }
}
