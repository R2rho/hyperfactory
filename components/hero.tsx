"use client"

import Link from "next/link"
import { GL } from "./gl"
import { Pill } from "./pill"
import { Button } from "./ui/button"
import { useState } from "react"
import { USFlag } from "./us-flag"
import { MetallicText } from "./metallic-text"
// import { GeometrySelector } from "./geometry-selector"

export function Hero() {
  const [hovering, setHovering] = useState(false)
  const [geometryType, setGeometryType] = useState<"plane" | "grid" | "woven" | "hex" | "diagonal">("grid")

  const handleGeometryChange = (newType: string) => {
    setGeometryType(newType as "plane" | "grid" | "woven" | "hex" | "diagonal")
  }

  return (
    <div className="relative h-svh flex flex-col justify-between">
      <GL hovering={hovering} geometryType={geometryType} onGeometryChange={handleGeometryChange} />

      {/* <GeometrySelector onSelect={setGeometryType} current={geometryType} /> */}

      <div className="pb-16 mt-auto text-center relative">
        <Pill className="mb-6">EARLY ACCESS</Pill>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-alliance font-medium">
          The Future of <br />
          <div className="inline-block w-full max-w-2xl">
            <MetallicText text="Smart Manufacturing" />
          </div>
        </h1>
        <p className="font-mono text-sm sm:text-base text-foreground/60 text-balance mt-8 max-w-[440px] mx-auto">
          Transform your factory into an intelligent, connected production system
        </p>

        <div className="flex items-center justify-center gap-4 mt-14">
          <Link className="contents max-sm:hidden" href="/learn-more">
            <Button variant="outline" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
              [Learn More]
            </Button>
          </Link>
          <Button
            onClick={() => {
              const element = document.getElementById('waitlist')
              element?.scrollIntoView({ behavior: 'smooth' })
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="max-sm:hidden"
          >
            [Join Waitlist]
          </Button>

          {/* Mobile buttons */}
          <Link className="contents sm:hidden" href="/learn-more">
            <Button
              size="sm"
              variant="outline"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              [Learn More]
            </Button>
          </Link>
          <Button
            onClick={() => {
              const element = document.getElementById('waitlist')
              element?.scrollIntoView({ behavior: 'smooth' })
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            size="sm"
            className="sm:hidden"
          >
            [Join Waitlist]
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-3 text-xs text-foreground/50 font-mono">
          <USFlag className="w-12 h-auto" />
          <span className="uppercase tracking-wide">Reindustrialize America</span>
        </div>
      </div>
    </div>
  )
}
