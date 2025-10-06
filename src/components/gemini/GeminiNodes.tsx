'use client'

import { Factory, Cpu, Boxes, Shield, Workflow, Gauge, Cloud, BarChart3 } from 'lucide-react'

// --- Theme helpers ---------------------------------------------------------
const goldGlass = {
  background:
    "linear-gradient(135deg, rgba(184,134,11,0.18), rgba(120,113,108,0.12))",
  border: "1px solid rgba(255,255,255,0.12)",
};

// Node card component
export const NodeCard = ({ title, subtitle, icon, tone }: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tone: 'gold' | 'glass';
}) => (
  <div
    className="rounded-xl p-3 md:p-4 text-center border backdrop-blur-sm"
    style={tone === "gold" ? goldGlass : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}
  >
    <div className="flex items-center justify-center mb-2">
      <div className="h-7 w-7 md:h-8 md:w-8 rounded-lg grid place-items-center" style={{ background: "rgba(255,255,255,0.1)" }}>
        <span className="text-yellow-600">{icon}</span>
      </div>
    </div>
    <div className="font-semibold text-white text-xs md:text-sm">{title}</div>
    <div className="text-xs text-white/60 mt-1">{subtitle}</div>
  </div>
);

// Core card component
export const CoreCard = () => {
  return (
    <div className="relative">
      <div
        className="rounded-2xl p-4 md:p-6 text-center border backdrop-blur-sm max-w-sm mx-auto"
        style={goldGlass}
      >
        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
          <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl grid place-items-center border" style={goldGlass}>
            <Cpu className="w-4 h-4 md:w-5 md:h-5 text-yellow-600" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-white text-sm md:text-base">Hyperfactory Core</div>
            <div className="text-xs text-white/60">Orchestration · Unified Namespace · AI Agents</div>
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

const Chip = ({ children, icon }: { children: React.ReactNode; icon: React.ReactNode }) => (
  <div className="flex items-center gap-1.5 md:gap-2 rounded-lg px-2 md:px-2.5 py-1.5 md:py-2" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}>
    <span className="text-yellow-600">{icon}</span>
    <span className="text-white/85 text-xs">{children}</span>
  </div>
);

// Left column nodes
export const LeftNodes = () => (
  <div className="flex flex-col gap-6">
    <NodeCard title="Equipment & PLCs" subtitle="Cells · Lines · Robots · CNC" icon={<Gauge className="w-4 h-4" />} tone="gold" />
    <NodeCard title="Business Systems" subtitle="ERP · QMS · MES" icon={<Workflow className="w-4 h-4" />} tone="gold" />
    <NodeCard title="Data Sources" subtitle="Sensors · Historians · Files" icon={<BarChart3 className="w-4 h-4" />} tone="gold" />
  </div>
);

// Right column nodes
export const RightNodes = () => (
  <div className="flex flex-col gap-6">
    <NodeCard title="Real‑time Visibility" subtitle="Dashboards · Traceability" icon={<Cloud className="w-4 h-4" />} tone="glass" />
    <NodeCard title="Operations Intelligence" subtitle="Costs · Lead Times · Throughput" icon={<Boxes className="w-4 h-4" />} tone="glass" />
    <NodeCard title="Reliability & Security" subtitle="Predictive · Zero‑Trust" icon={<Shield className="w-4 h-4" />} tone="glass" />
  </div>
);
