'use client'

import Link from 'next/link'

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex flex-col md:flex-row justify-between items-center ">
          <div className="text-center md:text-left">
            <p className="text-white/90 font-medium text-sm">Powered by Vertec</p>
            <p className="text-gray-400 text-xs">Transforming Manufacturing</p>
          </div>
          <p className="text-gray-400 text-xs text-center md:text-right">
            © {currentYear} HyperFactory by Vertec. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
