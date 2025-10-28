'use client'

import { Factory, Cpu, Boxes, Shield, Workflow } from 'lucide-react'
import { px } from '../utils'

// Node card component
export const NodeCard = ({ title, subtitle, icon, tone }: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tone: 'gold' | 'glass';
}) => {
  const polyRoundness = 8
  const hypotenuse = polyRoundness * 2
  const hypotenuseHalf = polyRoundness / 2 - 1.5

  return (
    <div
      style={{
        "--poly-roundness": px(polyRoundness),
      } as React.CSSProperties}
      className="relative p-3 md:p-4 text-center border border-border/50 bg-background transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 cursor-pointer [clip-path:polygon(var(--poly-roundness)_0,calc(100%_-_var(--poly-roundness))_0,100%_var(--poly-roundness),100%_calc(100%_-_var(--poly-roundness)),calc(100%_-_var(--poly-roundness))_100%,var(--poly-roundness)_100%,0_calc(100%_-_var(--poly-roundness)),0_var(--poly-roundness))]"
    >
      <span style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties} className="absolute inline-block w-[var(--h)] top-[var(--hh)] left-[var(--hh)] h-[1px] -rotate-45 origin-top -translate-x-1/2 bg-border/50" />
      <span style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties} className="absolute w-[var(--h)] top-[var(--hh)] right-[var(--hh)] h-[1px] bg-border/50 rotate-45 translate-x-1/2" />
      <span style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties} className="absolute w-[var(--h)] bottom-[var(--hh)] left-[var(--hh)] h-[1px] bg-border/50 rotate-45 -translate-x-1/2" />
      <span style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties} className="absolute w-[var(--h)] bottom-[var(--hh)] right-[var(--hh)] h-[1px] bg-border/50 -rotate-45 translate-x-1/2" />

      <div className="flex items-center justify-center mb-2">
        <div className="h-7 w-7 md:h-8 md:w-8 rounded-lg grid place-items-center border border-border/50 bg-background">
          <span className="text-primary">{icon}</span>
        </div>
      </div>
      <div className="font-semibold text-foreground text-xs md:text-sm">{title}</div>
      <div className="text-xs text-foreground/60 mt-1">{subtitle}</div>
    </div>
  );
};

// Core card component
export const CoreCard = () => {
  const polyRoundness = 12
  const hypotenuse = polyRoundness * 2
  const hypotenuseHalf = polyRoundness / 2 - 1.5

  return (
    <div className="relative">
      <div
        style={{
          "--poly-roundness": px(polyRoundness),
        } as React.CSSProperties}
        className="relative p-4 md:p-6 text-center border border-border/50 bg-background max-w-sm mx-auto transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 cursor-pointer [clip-path:polygon(var(--poly-roundness)_0,calc(100%_-_var(--poly-roundness))_0,100%_var(--poly-roundness),100%_calc(100%_-_var(--poly-roundness)),calc(100%_-_var(--poly-roundness))_100%,var(--poly-roundness)_100%,0_calc(100%_-_var(--poly-roundness)),0_var(--poly-roundness))]"
      >
        <span style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties} className="absolute inline-block w-[var(--h)] top-[var(--hh)] left-[var(--hh)] h-[1px] -rotate-45 origin-top -translate-x-1/2 bg-border/50" />
        <span style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties} className="absolute w-[var(--h)] top-[var(--hh)] right-[var(--hh)] h-[1px] bg-border/50 rotate-45 translate-x-1/2" />
        <span style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties} className="absolute w-[var(--h)] bottom-[var(--hh)] left-[var(--hh)] h-[1px] bg-border/50 rotate-45 -translate-x-1/2" />
        <span style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties} className="absolute w-[var(--h)] bottom-[var(--hh)] right-[var(--hh)] h-[1px] bg-border/50 -rotate-45 translate-x-1/2" />

        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
          <div
            style={{
              "--poly-roundness": px(8),
            } as React.CSSProperties}
            className="h-8 w-8 md:h-10 md:w-10 grid place-items-center border border-border/50 bg-background [clip-path:polygon(var(--poly-roundness)_0,calc(100%_-_var(--poly-roundness))_0,100%_var(--poly-roundness),100%_calc(100%_-_var(--poly-roundness)),calc(100%_-_var(--poly-roundness))_100%,var(--poly-roundness)_100%,0_calc(100%_-_var(--poly-roundness)),0_var(--poly-roundness))]"
          >
            <Cpu className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-foreground text-sm md:text-base">Hyperfactory Core</div>
            <div className="text-xs text-foreground/60">Orchestration · Unified Namespace · AI Agents</div>
          </div>
        </div>
        <div className="mt-3 md:mt-4 grid grid-cols-2 gap-2 md:gap-3 text-xs">
          <Chip icon={<Factory className="w-3 h-3 md:w-3.5 md:h-3.5" />}>Digital Twin</Chip>
          <Chip icon={<Workflow className="w-3 h-3 md:w-3.5 md:h-3.5" />}>AI Agents</Chip>
          <Chip icon={<Shield className="w-3 h-3 md:w-3.5 md:h-3.5" />}>Zero‑Trust</Chip>
          <Chip icon={<Boxes className="w-3 h-3 md:w-3.5 md:h-3.5" />}>Connectors</Chip>
        </div>
      </div>
    </div>
  );
};

const Chip = ({ children, icon }: { children: React.ReactNode; icon: React.ReactNode }) => {
  const polyRoundness = 4
  const hypotenuse = polyRoundness * 2
  const hypotenuseHalf = polyRoundness / 2 - 1.5

  return (
    <div
      style={{
        "--poly-roundness": px(polyRoundness),
      } as React.CSSProperties}
      className="relative flex items-center gap-1.5 md:gap-2 px-2 md:px-2.5 py-1.5 md:py-2 border border-border/50 bg-background [clip-path:polygon(var(--poly-roundness)_0,calc(100%_-_var(--poly-roundness))_0,100%_var(--poly-roundness),100%_calc(100%_-_var(--poly-roundness)),calc(100%_-_var(--poly-roundness))_100%,var(--poly-roundness)_100%,0_calc(100%_-_var(--poly-roundness)),0_var(--poly-roundness))]"
    >
      <span style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties} className="absolute inline-block w-[var(--h)] top-[var(--hh)] left-[var(--hh)] h-[0.5px] -rotate-45 origin-top -translate-x-1/2 bg-border/50" />
      <span style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties} className="absolute w-[var(--h)] top-[var(--hh)] right-[var(--hh)] h-[0.5px] bg-border/50 rotate-45 translate-x-1/2" />
      <span style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties} className="absolute w-[var(--h)] bottom-[var(--hh)] left-[var(--hh)] h-[0.5px] bg-border/50 rotate-45 -translate-x-1/2" />
      <span style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties} className="absolute w-[var(--h)] bottom-[var(--hh)] right-[var(--hh)] h-[0.5px] bg-border/50 -rotate-45 translate-x-1/2" />

      <span className="text-primary">{icon}</span>
      <span className="text-foreground/85 text-xs">{children}</span>
    </div>
  );
};

