import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onBackToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBackToTop }) => {
  return (
    <footer className="py-8 bg-transparent relative text-[#E9E6D8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-pixel text-[9px] text-[#FFE93B]">© 2026 ŠIMON VLACH</span>

        <button
          type="button"
          onClick={onBackToTop}
          aria-label="Zpět nahoru na hlavní obrazovku automatu"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14111F] hover:bg-[#A855F7]/20 border border-[#A855F7]/40 text-[#E9E6D8] font-pixel text-[8px] transition-colors cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5 text-[#39FF88]" />
          <span>ZPĚT NAHORU</span>
        </button>
      </div>
    </footer>
  );
};
