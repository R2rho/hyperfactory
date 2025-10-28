'use client'

import { Hero } from "@/components/hero";
import { HyperfactoryArchitecture } from "@/components/architecture/HyperfactoryArchitecture";
import { Features } from "@/components/features";
import { WaitlistSection } from "@/components/coming-soon/WaitlistSection";
import { Footer } from "@/components/footer";
import { Leva } from "leva";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <Hero />
      <div className="relative z-10 min-h-screen py-24 md:py-32">
        <HyperfactoryArchitecture />
      </div>
      <div className="relative z-10 py-24 md:py-32">
        <Features />
      </div>
      <div className="relative z-10">
        <WaitlistSection />
      </div>
      <Footer />
      <Leva hidden />
    </div>
  );
}
