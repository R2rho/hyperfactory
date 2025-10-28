'use client'

import { motion } from 'framer-motion'
import { Zap, TrendingUp, Globe } from 'lucide-react'
import { px } from './utils'

const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: number }) => {
  const polyRoundness = 12
  const hypotenuse = polyRoundness * 2
  const hypotenuseHalf = polyRoundness / 2 - 1.5

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, borderColor: "var(--primary)" }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      style={{
        "--poly-roundness": px(polyRoundness),
      } as React.CSSProperties}
      className="relative p-8 border border-border/50 bg-background transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 [clip-path:polygon(var(--poly-roundness)_0,calc(100%_-_var(--poly-roundness))_0,100%_var(--poly-roundness),100%_calc(100%_-_var(--poly-roundness)),calc(100%_-_var(--poly-roundness))_100%,var(--poly-roundness)_100%,0_calc(100%_-_var(--poly-roundness)),0_var(--poly-roundness))]"
    >
      <span style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties} className="absolute inline-block w-[var(--h)] top-[var(--hh)] left-[var(--hh)] h-[1px] -rotate-45 origin-top -translate-x-1/2 bg-border/50" />
      <span style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties} className="absolute w-[var(--h)] top-[var(--hh)] right-[var(--hh)] h-[1px] bg-border/50 rotate-45 translate-x-1/2" />
      <span style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties} className="absolute w-[var(--h)] bottom-[var(--hh)] left-[var(--hh)] h-[1px] bg-border/50 rotate-45 -translate-x-1/2" />
      <span style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties} className="absolute w-[var(--h)] bottom-[var(--hh)] right-[var(--hh)] h-[1px] bg-border/50 -rotate-45 translate-x-1/2" />

      <div
        style={{
          "--poly-roundness": px(8),
        } as React.CSSProperties}
        className="h-12 w-12 rounded-lg grid place-items-center mb-6 border border-border/50 bg-background [clip-path:polygon(var(--poly-roundness)_0,calc(100%_-_var(--poly-roundness))_0,100%_var(--poly-roundness),100%_calc(100%_-_var(--poly-roundness)),calc(100%_-_var(--poly-roundness))_100%,var(--poly-roundness)_100%,0_calc(100%_-_var(--poly-roundness)),0_var(--poly-roundness))]"
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-4 font-alliance">{title}</h3>
      <p className="text-foreground/60 font-mono text-sm">{description}</p>
    </motion.div>
  )
}

export const Features = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground font-alliance">Why HyperFactory?</h2>
          <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto font-mono">
            Transform your manufacturing operations with AI-driven intelligence and seamless connectivity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="w-6 h-6 text-primary" />}
            title="Fully Integrated System"
            description="Seamlessly connects all your manufacturing systems into one unified platform for complete visibility."
            delay={0.1}
          />
          <FeatureCard
            icon={<TrendingUp className="w-6 h-6 text-primary" />}
            title="Smart Supply Chain Planning"
            description="AI-powered insights optimize your supply chain and operations planning for better decision making."
            delay={0.2}
          />
          <FeatureCard
            icon={<Globe className="w-6 h-6 text-primary" />}
            title="Vendor Neutral"
            description="Works with your existing equipment and systems, regardless of manufacturer or age."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};
