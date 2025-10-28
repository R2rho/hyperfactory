import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LearnMorePage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-alliance font-medium mb-8 text-balance">
          The Future of Smart Manufacturing
        </h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            Transform your factory into an intelligent, connected production system with HyperFactory's AI-powered
            platform.
          </p>

          <h2 className="text-2xl font-alliance font-medium mt-12 mb-4">Unified Manufacturing Intelligence</h2>
          <p className="text-foreground/80 leading-relaxed mb-6">
            HyperFactory Core orchestrates your entire manufacturing ecosystem through a unified namespace, connecting
            equipment, PLCs, business systems, and data sources into one intelligent platform. Our AI agents work
            continuously to optimize operations, predict maintenance needs, and ensure security through zero-trust
            architecture.
          </p>

          <h2 className="text-2xl font-alliance font-medium mt-12 mb-4">Real-Time Visibility & Control</h2>
          <p className="text-foreground/80 leading-relaxed mb-6">
            Gain complete visibility into your operations with real-time dashboards, comprehensive traceability, and
            operations intelligence. Monitor costs, lead times, and throughput while our predictive systems ensure
            reliability and security across your entire production environment.
          </p>

          <h2 className="text-2xl font-alliance font-medium mt-12 mb-4">Vendor Neutral & Future-Proof</h2>
          <p className="text-foreground/80 leading-relaxed mb-6">
            Works seamlessly with your existing equipment and systems, regardless of manufacturer or age. From cells and
            lines to robots and CNC machines, from ERP and QMS to MES systems, HyperFactory integrates it all into a
            cohesive digital twin of your operations.
          </p>

          <div className="mt-16 p-8 border border-border rounded-lg bg-foreground/5">
            <h3 className="text-xl font-alliance font-medium mb-4">Let's revitalize American manufacturing</h3>
            <p className="text-foreground/80 leading-relaxed mb-6">
              Join us in reindustrializing our production capacity and uplifting communities to a better future.
            </p>
            <Link href="/#contact">
              <Button size="default">[Join Waitlist]</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
