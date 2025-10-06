export function ComingSoonFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center">
          <span
            className="text-3xl font-black text-gray-300 select-none"
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

        <div className="flex items-center gap-6 text-gray-400 text-sm">
          <span>Revolutionizing Printing</span>
        </div>

        <p className="text-gray-400 text-sm">
          © 2024 HYPERPRINTS. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
