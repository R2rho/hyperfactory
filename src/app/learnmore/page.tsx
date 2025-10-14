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
  description: string | React.ReactNode;
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
  description: string | React.ReactNode;
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
              <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                American manufacturers face unprecedented challenges that threaten their competitiveness and survival.
                The good news? Advanced manufacturing technologies that were once only available to Fortune 500 companies are now accessible to manufacturers of all sizes.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <StatCard
                number="78%"
                label="Trade Uncertainty"
                description={<>Manufacturers cite trade uncertainty as their top business concern<a href="#ref1" className="text-yellow-400 hover:text-yellow-300">¹</a></>}
              />
              <StatCard
                number="68%"
                label="Rising Costs"
                description={<>Report increasing raw material costs as a major challenge<a href="#ref1" className="text-yellow-400 hover:text-yellow-300">¹</a></>}
              />
              <StatCard
                number="$2.1T"
                label="Lost Revenue"
                description={<>Annual losses due to unplanned downtime and inefficiencies<a href="#ref2" className="text-yellow-400 hover:text-yellow-300">²</a></>}
              />
              <StatCard
                number="73%"
                label="Skills Shortage"
                description={<>Manufacturers report difficulty finding qualified workers<a href="#ref3" className="text-yellow-400 hover:text-yellow-300">³</a></>}
              />
            </div>

            {/* Detailed Challenge Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <FeatureCard
                  icon={TrendingUp}
                  title="Operational Pressures Intensifying"
                  description="Supply chain disruptions, fluctuating demand, and increasing customer expectations for faster delivery are putting unprecedented pressure on manufacturing operations. Traditional reactive approaches leave manufacturers constantly firefighting instead of optimizing for long-term success."
                />
                <FeatureCard
                  icon={Factory}
                  title="Technology Adoption Gap"
                  description={<>While 42% of small manufacturers still rely on basic software tools<a href="#ref4" className="text-yellow-400 hover:text-yellow-300">⁴</a>, their larger competitors are investing heavily in digital transformation. This growing technology gap threatens the competitiveness of smaller manufacturers who lack the resources for complex implementations.</>}
                />
                <FeatureCard
                  icon={Target}
                  title="Workforce and Knowledge Crisis"
                  description="The manufacturing skills shortage isn't just about finding workers—it's about attracting the next generation. Young professionals want to work with modern technology, not outdated systems. By creating tech-forward manufacturing environments, companies can inspire younger talent while preserving institutional knowledge from experienced workers."
                />
                <FeatureCard
                  icon={Lightbulb}
                  title="Data Silos Limiting Growth"
                  description="Critical operational data remains trapped in isolated systems—machines, ERP, quality tools, and spreadsheets that don't communicate. Without real-time visibility, manufacturers make decisions based on outdated information and miss optimization opportunities."
                />
              </div>
            </motion.div>



            {/* The Cost of Inaction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <Panel style={goldGlass}>
                <h3 className="text-2xl font-bold mb-6 text-white">What This Means for Your Business</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">Lost Revenue</div>
                    <p className="text-gray-300">Equipment downtime, manual processes, and inefficient workflows directly impact your bottom line. Every hour of unplanned downtime costs money you can't recover.</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">Operational Inefficiencies</div>
                    <p className="text-gray-300">Time spent on manual data entry, searching for information across different systems, and coordinating between departments that should be working together seamlessly.</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">Limited Growth</div>
                    <p className="text-gray-300">Without clear visibility into production data, quality trends, and customer patterns, you can't identify new sales opportunities or optimize your marketing efforts based on actual performance.</p>
                  </div>
                </div>
              </Panel>
            </motion.div>
          </section>



          {/* Solution Section */}
          <section className="py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-white">HyperFactory</h2>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                A unified industrial operations platform that connects your factory floor to your front office, giving you real-time visibility and control over your entire manufacturing operation.
              </p>

            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <FeatureCard
                icon={Workflow}
                title="Unified Operations Platform"
                description="Connect all your systems—ERP, machines, sensors, quality tools—into one cohesive platform. No more data silos or manual data entry between systems. Everything works together to give you complete operational visibility."
              />
              <FeatureCard
                icon={Factory}
                title="Real-Time Factory Intelligence"
                description="Monitor production, track quality metrics, and manage workflows in real-time. Get instant alerts when issues arise and access the data you need to make informed decisions quickly."
              />
              <FeatureCard
                icon={Shield}
                title="Secure Integration"
                description="Enterprise-grade security that protects your operations while enabling seamless connectivity. Your data stays secure and under your control, with no vendor lock-in or proprietary formats."
              />
              <FeatureCard
                icon={Target}
                title="Digital Transformation"
                description="Transform routine tasks and workflows while keeping your team in control of critical decisions. Digital tools that learn from your processes and suggest improvements based on real performance data."
              />
            </div>

            {/* Key Capabilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-16"
            >
              <Panel style={goldGlass}>
                <h3 className="text-2xl font-bold mb-8 text-center text-white">What HyperFactory Does for Your Business</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-yellow-600 mb-4">Operations Management</h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-yellow-600 mt-2 flex-shrink-0"></div>
                        <span>Real-time production monitoring and scheduling</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-yellow-600 mt-2 flex-shrink-0"></div>
                        <span>Quality tracking and automated alerts</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-yellow-600 mt-2 flex-shrink-0"></div>
                        <span>Inventory management and material tracking</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-yellow-600 mt-2 flex-shrink-0"></div>
                        <span>Maintenance scheduling and equipment monitoring</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-yellow-600 mb-4">Business Integration</h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-yellow-600 mt-2 flex-shrink-0"></div>
                        <span>Seamless ERP integration</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-yellow-600 mt-2 flex-shrink-0"></div>
                        <span>Automated reporting and analytics</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-yellow-600 mt-2 flex-shrink-0"></div>
                        <span>Custom dashboards for different roles</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-yellow-600 mt-2 flex-shrink-0"></div>
                        <span>Mobile access for shop floor and management</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Panel>
            </motion.div>
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
                    <p id="ref1" className="mb-2">
                      <span className="text-yellow-600 font-medium">¹</span> National Association of Manufacturers. (2025).
                      <a href="https://nam.org/2025-third-quarter-manufacturers-outlook-survey/"
                         target="_blank" rel="noopener noreferrer"
                         className="text-blue-400 hover:text-blue-300 ml-1 underline">
                        "Q3 2025 Manufacturers' Outlook Survey"
                      </a>
                    </p>

                    <p id="ref2" className="mb-2">
                      <span className="text-yellow-600 font-medium">²</span> Deloitte. (2024).
                      <a href="https://www.deloitte.com/us/en/insights/industry/manufacturing-industrial-products/manufacturing-industry-outlook.html"
                         target="_blank" rel="noopener noreferrer"
                         className="text-blue-400 hover:text-blue-300 ml-1 underline">
                        "2025 Manufacturing Industry Outlook"
                      </a>
                    </p>

                    <p id="ref3" className="mb-2">
                      <span className="text-yellow-600 font-medium">³</span> National Association of Manufacturers & Deloitte. (2021).
                      <a href="https://nam.org/2-1-million-manufacturing-jobs-could-go-unfilled-by-2030-13743/"
                         target="_blank" rel="noopener noreferrer"
                         className="text-blue-400 hover:text-blue-300 ml-1 underline">
                        "2.1 Million Manufacturing Jobs Could Go Unfilled by 2030"
                      </a>
                    </p>

                    <p id="ref4" className="mb-2">
                      <span className="text-yellow-600 font-medium">⁴</span> Information Technology and Innovation Foundation. (2024).
                      <a href="https://itif.org/publications/2024/04/19/accelerating-digital-technology-adoption-among-smes/"
                         target="_blank" rel="noopener noreferrer"
                         className="text-blue-400 hover:text-blue-300 ml-1 underline">
                        "Accelerating Digital Technology Adoption Among SMEs"
                      </a>
                    </p>
                  </div>

                  <div>
                    <p className="mb-2">
                      <span className="text-yellow-600 font-medium">⁵</span> McKinsey & Company. (2022).
                      <a href="https://www.mckinsey.com/capabilities/operations/our-insights/capturing-the-true-value-of-industry-four-point-zero"
                         target="_blank" rel="noopener noreferrer"
                         className="text-blue-400 hover:text-blue-300 ml-1 underline">
                        "Industry 4.0: Digital transformation in manufacturing"
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
                        <a href="https://www.themanufacturinginstitute.org/"
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
