"use client"

import { Button } from "./ui/button"

interface GeometrySelectorProps {
  onSelect: (type: string) => void
  current: string
}

export function GeometrySelector({ onSelect, current }: GeometrySelectorProps) {
  const geometries = [
    { id: "grid", label: "Grid Mesh" },
    { id: "woven", label: "Woven Mesh" },
    { id: "hex", label: "Hex Mesh" },
    { id: "plane", label: "Wave" },
    { id: "diagonal", label: "Diagonal Mesh" },
  ]

  return (
    <div className="fixed top-6 right-6 z-50 bg-black/80 backdrop-blur-sm border border-primary/20 rounded-lg p-3">
      <div className="text-xs font-mono text-foreground/60 mb-2">GEOMETRY</div>
      <div className="flex flex-col gap-2">
        {geometries.map((geo) => (
          <Button
            key={geo.id}
            size="sm"
            variant={current === geo.id ? "default" : "outline"}
            onClick={() => onSelect(geo.id)}
            className="text-xs font-mono justify-start"
          >
            {geo.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
