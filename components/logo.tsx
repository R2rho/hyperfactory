import type React from "react"
import Image from "next/image"

export const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/hyperfactory_logo_w.svg"
        alt="HyperFactory"
        width={24}
        height={24}
        className="w-6 h-6"
        priority
      />
      <svg viewBox="0 0 220 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <text
          x="0"
          y="28"
          fill="white"
          fontSize="24"
          fontWeight="700"
          fontFamily="var(--font-mono)"
          letterSpacing="0.05em"
        >
          HYPERFACTORY
        </text>
      </svg>
    </div>
  )
}
