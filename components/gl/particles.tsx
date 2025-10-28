"use client"

import * as THREE from "three"
import { useMemo, useState, useRef, useEffect } from "react"
import { createPortal, useFrame } from "@react-three/fiber"
import { useFBO } from "@react-three/drei"

import { DofPointsMaterial } from "./shaders/pointMaterial"
import { SimulationMaterial } from "./shaders/simulationMaterial"
import * as easing from "maath/easing"

export function Particles({
  speed,
  aperture,
  focus,
  size = 512,
  noiseScale = 1.0,
  noiseIntensity = 0.5,
  timeScale = 0.5,
  pointSize = 2.0,
  opacity = 1.0,
  planeScale = 1.0,
  geometryType = "plane",
  useManualTime = false,
  manualTime = 0,
  introspect = false,
  onGeometryChange,
  ...props
}: {
  speed: number
  aperture: number
  focus: number
  size: number
  noiseScale?: number
  noiseIntensity?: number
  timeScale?: number
  pointSize?: number
  opacity?: number
  planeScale?: number
  geometryType?: "plane" | "grid" | "woven" | "hex" | "diagonal"
  useManualTime?: boolean
  manualTime?: number
  introspect?: boolean
  onGeometryChange?: (type: string) => void
}) {
  // Reveal animation state
  const revealStartTime = useRef<number | null>(null)
  const [isRevealing, setIsRevealing] = useState(true)
  const revealDuration = 3.5 // seconds

  const [animationPhase, setAnimationPhase] = useState<"revealing" | "animating" | "fading">("revealing")
  const phaseStartTime = useRef<number | null>(null)

  // Animation timing constants
  const animateDuration = 15.0 // seconds - time to show the geometry animation
  const fadeOutDuration = 3.5 // seconds

  const prevGeometryType = useRef(geometryType)

  useEffect(() => {
    if (prevGeometryType.current !== geometryType) {
      console.log("[v0] Geometry changed from", prevGeometryType.current, "to", geometryType)
      prevGeometryType.current = geometryType
      phaseStartTime.current = null
      setAnimationPhase("revealing")
    }
  }, [geometryType])

  const simulationMaterial = useMemo(() => {
    console.log("[v0] Creating new simulation material with geometry:", geometryType)
    return new SimulationMaterial(planeScale, geometryType)
  }, [planeScale, geometryType])

  const target = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  })

  const dofPointsMaterial = useMemo(() => {
    console.log("[v0] Creating dofPointsMaterial")
    return new DofPointsMaterial()
  }, [])

  useEffect(() => {
    console.log("[v0] Updating dofPointsMaterial uniforms with new textures")
    dofPointsMaterial.uniforms.positions.value = target.texture
    dofPointsMaterial.uniforms.initialPositions.value = simulationMaterial.uniforms.positions.value

    // Update geometry type uniform
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
    dofPointsMaterial.uniforms.uGeometryType.value = geometryTypeValue
    dofPointsMaterial.uniformsNeedUpdate = true
  }, [simulationMaterial, target, dofPointsMaterial, geometryType])

  const [scene] = useState(() => new THREE.Scene())
  const [camera] = useState(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1))
  const [positions] = useState(() => new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]))
  const [uvs] = useState(() => new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]))

  const particles = useMemo(() => {
    const length = size * size
    const particles = new Float32Array(length * 3)
    for (let i = 0; i < length; i++) {
      const i3 = i * 3
      particles[i3 + 0] = (i % size) / size
      particles[i3 + 1] = i / size / size
    }
    return particles
  }, [size])

  useFrame((state, delta) => {
    if (!dofPointsMaterial || !simulationMaterial) return

    state.gl.setRenderTarget(target)
    state.gl.clear()
    // @ts-ignore
    state.gl.render(scene, camera)
    state.gl.setRenderTarget(null)

    const currentTime = useManualTime ? manualTime : state.clock.elapsedTime

    if (phaseStartTime.current === null) {
      phaseStartTime.current = currentTime
    }

    const phaseElapsed = currentTime - phaseStartTime.current

    if (animationPhase === "revealing" && phaseElapsed >= revealDuration) {
      console.log("[v0] Transitioning to animating phase")
      setAnimationPhase("animating")
      phaseStartTime.current = currentTime
    } else if (animationPhase === "animating" && phaseElapsed >= animateDuration) {
      console.log("[v0] Transitioning to fading phase")
      setAnimationPhase("fading")
      phaseStartTime.current = currentTime
    } else if (animationPhase === "fading" && phaseElapsed >= fadeOutDuration) {
      console.log("[v0] Cycle complete, switching to next geometry")
      const geometries = ["grid", "woven", "hex", "diagonal", "usa", "plane"]
      const currentIndex = geometries.indexOf(geometryType)
      const nextIndex = (currentIndex + 1) % geometries.length
      const nextGeometry = geometries[nextIndex]

      if (onGeometryChange) {
        onGeometryChange(nextGeometry)
      }

      setAnimationPhase("revealing")
      phaseStartTime.current = currentTime
    }

    let revealProgress = 0
    let fadeProgress = 0

    if (animationPhase === "revealing") {
      revealProgress = Math.min(phaseElapsed / revealDuration, 1.0)
    } else if (animationPhase === "animating") {
      revealProgress = 1.0
    } else if (animationPhase === "fading") {
      fadeProgress = Math.min(phaseElapsed / fadeOutDuration, 1.0)
      revealProgress = 1.0 - fadeProgress // Reverse the reveal
    }

    // Ease out the reveal/fade animation
    const easedProgress = 1 - Math.pow(1 - revealProgress, 3)

    // Map progress to reveal factor (0 = fully hidden, higher values = more revealed)
    const revealFactor = easedProgress * 4.0

    dofPointsMaterial.uniforms.uTime.value = currentTime

    dofPointsMaterial.uniforms.uFocus.value = focus
    dofPointsMaterial.uniforms.uBlur.value = aperture

    easing.damp(dofPointsMaterial.uniforms.uTransition, "value", introspect ? 1.0 : 0.0, introspect ? 0.35 : 0.2, delta)

    simulationMaterial.uniforms.uTime.value = currentTime
    simulationMaterial.uniforms.uNoiseScale.value = noiseScale
    simulationMaterial.uniforms.uNoiseIntensity.value = noiseIntensity
    simulationMaterial.uniforms.uTimeScale.value = timeScale * speed

    // Update point material uniforms
    dofPointsMaterial.uniforms.uPointSize.value = pointSize
    dofPointsMaterial.uniforms.uOpacity.value = opacity
    dofPointsMaterial.uniforms.uRevealFactor.value = revealFactor
    dofPointsMaterial.uniforms.uRevealProgress.value = easedProgress
  })

  return (
    <>
      {createPortal(
        // @ts-ignore
        <mesh material={simulationMaterial}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            <bufferAttribute attach="attributes-uv" args={[uvs, 2]} />
          </bufferGeometry>
        </mesh>,
        // @ts-ignore
        scene,
      )}
      {/* @ts-ignore */}
      <points material={dofPointsMaterial} {...props}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
      </points>
    </>
  )
}
