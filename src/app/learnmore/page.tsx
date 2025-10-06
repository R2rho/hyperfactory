'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
   Factory, 
   Cpu,
   Shield, Workflow,
   ArrowLeft, 
   TrendingUp, 
   Lightbulb, 
   Target, 
  } from 'lucide-react'
import { useRouter } from 'next/navigation'

// --- Theme helpers ---------------------------------------------------------
const goldGlass = {
  background:
    "linear-gradient(135deg, rgba(184,134,11,0.18), rgba(120,113,108,0.12))",
  border: "1px solid rgba(255,255,255,0.12)",
};

// Panel component
const Panel = ({ children, style = goldGlass, className = "" }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) => (
  <div className={`rounded-2xl p-6 backdrop-blur-sm border ${className}`} style={style}>
    {children}
  </div>
);



// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, highlight = "" }: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  highlight?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: false, margin: "-50px" }}
    className="p-6 rounded-xl backdrop-blur-sm border"
    style={goldGlass}
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-yellow-600/20 to-amber-500/20 flex items-center justify-center">
        <Icon className="w-6 h-6 text-yellow-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {highlight && <p className="text-sm text-yellow-600 font-medium">{highlight}</p>}
      </div>
    </div>
    <p className="text-gray-300 leading-relaxed">{description}</p>
  </motion.div>
);

// Stat Card Component
const StatCard = ({ number, label, description }: {
  number: string;
  label: string;
  description: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: false, margin: "-50px" }}
    className="text-center p-6 rounded-xl backdrop-blur-sm border"
    style={goldGlass}
  >
    <div className="text-4xl font-bold text-yellow-600 mb-2 font-apercu-mono">{number}</div>
    <div className="text-lg font-semibold text-white mb-2 font-alliance">{label}</div>
    <div className="text-sm text-gray-400 font-serif">{description}</div>
  </motion.div>
);

export default function LearnMorePage() {
  const router = useRouter()

  const handleJoinWaitlist = () => {
    router.push('/')
    // Small delay to ensure navigation completes before scrolling
    setTimeout(() => {
      const waitlistElement = document.getElementById('waitlist')
      if (waitlistElement) {
        waitlistElement.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <a href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 hover:border-yellow-600/50 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </motion.button>
        </a>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <section className="text-center py-12 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-rajdhani font-bold mb-6 leading-tight px-4 tracking-wide">
                What is{' '}
                <span className="bg-gradient-to-r from-yellow-600 to-amber-500 bg-clip-text text-transparent">
                  HYPERFACTORY?
                </span>
              </h1>
              <p className="text-xl sm:text-2xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
                An AI-powered smart factory platform that transforms your manufacturing operations
                into intelligent, connected, and responsive production systems.
              </p>
            </motion.div>
          </section>

          {/* Problem Section */}
          <section className="py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-white">The Manufacturing Challenge</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                American manufacturers face unprecedented challenges that threaten their competitiveness and survival.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <StatCard
                number="60%"
                label="Productivity Gap"
                description="SMB manufacturers lag behind industry leaders in operational efficiency¹"
              />
              <StatCard
                number="$2.1T"
                label="Lost Revenue"
                description="Annual losses due to unplanned downtime and inefficiencies²"
              />
              <StatCard
                number="73%"
                label="Skills Shortage"
                description="Manufacturers report difficulty finding qualified workers³"
              />
            </div>
          </section>

          {/* Solution Section */}
          <section className="py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-white">The HyperFactory Solution</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                A comprehensive platform that connects, orchestrates, and optimizes every aspect of your manufacturing operation.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <FeatureCard
                icon={Cpu}
                title="AI-Powered Orchestration"
                description="Intelligent agents that learn your processes, predict issues, and optimize operations in real-time without human intervention."
              />
              <FeatureCard
                icon={Workflow}
                title="Unified Namespace"
                description="Connect all your equipment, systems, and data sources into a single, coherent digital ecosystem that speaks one language."
              />
              <FeatureCard
                icon={Shield}
                title="Zero-Trust Security"
                description="Enterprise-grade security that protects your operations while enabling seamless connectivity and data sharing."
              />
              <FeatureCard
                icon={Factory}
                title="Digital Twin Technology"
                description="Create a virtual replica of your factory that enables simulation, optimization, and predictive maintenance."
              />
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-white">Measurable Impact</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Our phased approach delivers immediate value while building toward long-term transformation.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard
                number="25%"
                label="Efficiency Gain"
                description="Average improvement in overall equipment effectiveness⁴"
              />
              <StatCard
                number="40%"
                label="Downtime Reduction"
                description="Decrease in unplanned maintenance and failures⁵"
              />
              <StatCard
                number="30%"
                label="Cost Savings"
                description="Reduction in operational and maintenance costs⁶"
              />
              <StatCard
                number="90 Days"
                label="Time to Value"
                description="See measurable results in your first pilot project⁷"
              />
            </div>
          </section>

          {/* Approach Section */}
          <section className="py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-white">Our Phased Approach</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Our methodology ensures continuous operation while building your smart factory.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Target}
                title="Phase 1: Connect"
                highlight="90-Day Pilot"
                description="Start with a single production line or cell. Connect equipment, gather data, and demonstrate immediate value with minimal disruption."
              />
              <FeatureCard
                icon={TrendingUp}
                title="Phase 2: Optimize"
                highlight="6-Month Expansion"
                description="Expand to additional lines and systems. Implement AI-driven optimization and predictive maintenance across your operation."
              />
              <FeatureCard
                icon={Lightbulb}
                title="Phase 3: Transform"
                highlight="Full Deployment"
                description="Complete digital transformation with autonomous operations, advanced analytics, and continuous improvement capabilities."
              />
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-16">
            <Panel className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <h2 className="text-4xl font-bold mb-6 text-white">Our Mission</h2>
                <p className="text-2xl text-yellow-600 font-bold mb-6">
                  Revitalize American manufacturing, reindustrialize our production capacity, and uplift communities to a better future
                </p>
                <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  We believe that American manufacturing can lead the world again. By combining cutting-edge AI technology 
                  with practical, proven methodologies, we're helping manufacturers of all sizes compete globally while 
                  creating good jobs and strengthening communities.
                </p>
              </motion.div>
            </Panel>
          </section>

          {/* CTA Section */}
          <section className="py-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-white">Ready to Transform Your Operations?</h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Join the waitlist to be among the first manufacturers to experience HyperFactory.
              </p>
              <a href="/#waitlist">
              <motion.button
                // onClick={handleJoinWaitlist}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-700 hover:to-amber-600 rounded-lg font-semibold text-black shadow-lg shadow-yellow-600/25 transition-all duration-300"
              >
                Join the Waitlist
              </motion.button>
              </a>
            </motion.div>
          </section>

          {/* References Section */}
          <section className="py-16 border-t border-white/10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <h2 className="text-2xl font-bold mb-8 text-white">References & Sources</h2>
              <div className="space-y-4 text-sm text-gray-400">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="mb-2">
                      <span className="text-yellow-600 font-medium">¹</span> McKinsey & Company. (2023).
                      <a href="https://www.mckinsey.com/industries/advanced-electronics/our-insights/the-factory-of-the-future-how-technology-is-transforming-manufacturing"
                         target="_blank" rel="noopener noreferrer"
                         className="text-blue-400 hover:text-blue-300 ml-1 underline">
                        "Manufacturing's next act: How technology is transforming the factory floor"
                      </a>
                    </p>

                    <p className="mb-2">
                      <span className="text-yellow-600 font-medium">²</span> Deloitte. (2023).
                      <a href="https://www2.deloitte.com/us/en/insights/industry/manufacturing/manufacturing-industry-diversity.html"
                         target="_blank" rel="noopener noreferrer"
                         className="text-blue-400 hover:text-blue-300 ml-1 underline">
                        "The future of manufacturing: 2023 manufacturing industry outlook"
                      </a>
                    </p>

                    <p className="mb-2">
                      <span className="text-yellow-600 font-medium">³</span> National Association of Manufacturers. (2023).
                      <a href="https://www.nam.org/state-manufacturing-data/"
                         target="_blank" rel="noopener noreferrer"
                         className="text-blue-400 hover:text-blue-300 ml-1 underline">
                        "Manufacturing Skills Gap Study"
                      </a>
                    </p>

                    <p className="mb-2">
                      <span className="text-yellow-600 font-medium">⁴</span> PwC Industrial Manufacturing. (2023).
                      <a href="https://www.pwc.com/us/en/industries/industrial-products/library/digital-factory-transformation.html"
                         target="_blank" rel="noopener noreferrer"
                         className="text-blue-400 hover:text-blue-300 ml-1 underline">
                        "Digital Factory Transformation: Industry 4.0 Impact Study"
                      </a>
                    </p>
                  </div>

                  <div>
                    <p className="mb-2">
                      <span className="text-yellow-600 font-medium">⁵</span> Aberdeen Group. (2023).
                      <a href="https://www.aberdeen.com/manufacturing-operations-management/"
                         target="_blank" rel="noopener noreferrer"
                         className="text-blue-400 hover:text-blue-300 ml-1 underline">
                        "Predictive Maintenance: Reducing Unplanned Downtime"
                      </a>
                    </p>

                    <p className="mb-2">
                      <span className="text-yellow-600 font-medium">⁶</span> Boston Consulting Group. (2023).
                      <a href="https://www.bcg.com/industries/industrial-goods/manufacturing"
                         target="_blank" rel="noopener noreferrer"
                         className="text-blue-400 hover:text-blue-300 ml-1 underline">
                        "Smart Manufacturing: The Future of Production"
                      </a>
                    </p>

                    <p className="mb-2">
                      <span className="text-yellow-600 font-medium">⁷</span> Accenture Strategy. (2023).
                      <a href="https://www.accenture.com/us-en/insights/industry-x-0/future-manufacturing"
                         target="_blank" rel="noopener noreferrer"
                         className="text-blue-400 hover:text-blue-300 ml-1 underline">
                        "Digital Manufacturing Transformation: Time to Value Analysis"
                      </a>
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <h3 className="text-lg font-semibold text-white mb-4">Additional Industry Resources</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="mb-2">
                        <a href="https://www.manufacturingusa.com/"
                           target="_blank" rel="noopener noreferrer"
                           className="text-blue-400 hover:text-blue-300 underline">
                          Manufacturing USA - National Manufacturing Innovation Network
                        </a>
                      </p>
                      <p className="mb-2">
                        <a href="https://www.nist.gov/mep"
                           target="_blank" rel="noopener noreferrer"
                           className="text-blue-400 hover:text-blue-300 underline">
                          NIST Manufacturing Extension Partnership (MEP)
                        </a>
                      </p>
                      <p className="mb-2">
                        <a href="https://www.energy.gov/eere/amo/advanced-manufacturing-office"
                           target="_blank" rel="noopener noreferrer"
                           className="text-blue-400 hover:text-blue-300 underline">
                          DOE Advanced Manufacturing Office
                        </a>
                      </p>
                    </div>
                    <div>
                      <p className="mb-2">
                        <a href="https://www.manufacturinginstitute.org/"
                           target="_blank" rel="noopener noreferrer"
                           className="text-blue-400 hover:text-blue-300 underline">
                          The Manufacturing Institute
                        </a>
                      </p>
                      <p className="mb-2">
                        <a href="https://www.industryweek.com/"
                           target="_blank" rel="noopener noreferrer"
                           className="text-blue-400 hover:text-blue-300 underline">
                          IndustryWeek - Manufacturing Intelligence
                        </a>
                      </p>
                      <p className="mb-2">
                        <a href="https://www.automationworld.com/"
                           target="_blank" rel="noopener noreferrer"
                           className="text-blue-400 hover:text-blue-300 underline">
                          Automation World - Industry 4.0 Resources
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

        </div>
      </main>
    </div>
  )
}
