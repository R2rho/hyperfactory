'use client'

export function ComingSoonHeader() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <header className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
      <div className="flex items-center">
        <span
          className="text-6xl font-black text-gray-300 select-none"
          style={{
            fontFamily: '"Roboto", system-ui, sans-serif',
            fontWeight: '900',
            fontStyle: 'italic',
            transform: 'skew(-14deg) scaleX(0.92)',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase'
          }}
        >
          HYPERPRINTS
        </span>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm text-gray-400">
        <button
          onClick={() => scrollToSection('features')}
          className="hover:text-white transition-colors cursor-pointer"
        >
          Features
        </button>
        <button
          onClick={() => scrollToSection('waitlist')}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-emerald-500/20 border border-blue-500/30 hover:from-blue-500/30 hover:to-emerald-500/30 hover:text-white transition-all cursor-pointer"
        >
          Join Waitlist
        </button>
      </nav>
    </header>
  )
}
