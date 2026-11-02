import React from 'react';
import { Mail, Github, ExternalLink, ArrowUp } from 'lucide-react';

interface FooterProps {
  credits: number;
  onInsertCoin: () => void;
  onBackToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  credits,
  onInsertCoin,
  onBackToTop
}) => {
  return (
    <footer id="kontakt" className="py-12 sm:py-14 bg-transparent relative text-[#E9E6D8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl bg-[#0D101D]/90 border-2 border-[#A855F7]/50 p-6 sm:p-8 shadow-[0_0_30px_rgba(168,85,247,0.14)]">
          {/* Top Badge & Credit Display */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#A855F7]/25">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#A855F7]/15 border border-[#A855F7]/50 text-[#D8B4FE] font-pixel text-[9px] mb-2.5">
                <span>STAGE 06 // KONTAKT [KLÁVESA ESC]</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#E9E6D8]">
                Spojení & Kredity Automatu
              </h2>
            </div>

            {/* Blinking PRESS START TO CONTINUE + CREDIT Counter */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-pixel text-[9px] sm:text-[10px] text-[#39FF88] animate-arcade-blink px-3 py-2 rounded-lg bg-[#05070D] border border-[#39FF88]/40">
                PRESS START TO CONTINUE
              </span>

              <button
                type="button"
                onClick={onInsertCoin}
                aria-label="Vhodit minci (+1 CREDIT)"
                className="font-pixel text-[10px] px-3.5 py-2 rounded-lg bg-[#FFE93B]/15 hover:bg-[#FFE93B]/25 border border-[#FFE93B] text-[#FFE93B] shadow-[0_0_14px_rgba(255,233,59,0.25)] cursor-pointer transition-all active:scale-95"
              >
                🪙 CREDIT: {String(credits).padStart(2, '0')} (+1)
              </button>
            </div>
          </div>

          {/* Contact Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            <a
              href="mailto:simon.vlach@email.cz"
              aria-label="Napsat e-mail Šimonu Vlachovi"
              className="group p-4 rounded-xl bg-[#05070D] border border-[#38BDF8]/40 hover:border-[#38BDF8] transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#38BDF8]/15 border border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-pixel text-[8px] text-[#38BDF8] block">E-MAIL</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#E9E6D8] group-hover:text-[#38BDF8] transition-colors">
                    Napsat zprávu
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#8B93A7] group-hover:text-[#38BDF8]" />
            </a>

            <a
              href="https://github.com/VlachS"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Otevřít GitHub profil VlachS"
              className="group p-4 rounded-xl bg-[#05070D] border border-[#A855F7]/40 hover:border-[#A855F7] transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#A855F7]/15 border border-[#A855F7]/40 flex items-center justify-center text-[#D8B4FE]">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-pixel text-[8px] text-[#D8B4FE] block">GITHUB</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#E9E6D8] group-hover:text-[#D8B4FE] transition-colors">
                    github.com/VlachS
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#8B93A7] group-hover:text-[#D8B4FE]" />
            </a>

            <a
              href="https://www.restorio.cz/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Otevřít web Restorio.cz"
              className="group p-4 rounded-xl bg-[#05070D] border border-[#39FF88]/40 hover:border-[#39FF88] transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#39FF88]/15 border border-[#39FF88]/40 flex items-center justify-center text-[#39FF88]">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-pixel text-[8px] text-[#39FF88] block">ZAMĚSTNÁNÍ</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#E9E6D8] group-hover:text-[#39FF88] transition-colors">
                    Restorio.cz
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#8B93A7] group-hover:text-[#39FF88]" />
            </a>
          </div>

          {/* Bottom Copyright & Back to Top */}
          <div className="pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8B93A7]">
            <div className="flex items-center gap-2 font-pixel text-[9px] text-[#FFE93B]">
              <span>♥</span>
              <span>© 2026 VLACH SOFT</span>
              <span className="text-[#8B93A7] font-sans text-xs">
                · Šimon Vlach (FF MUNI Brno & Restorio.cz)
              </span>
            </div>

            <button
              type="button"
              onClick={onBackToTop}
              aria-label="Zpět nahoru na hlavní obrazovku automatu"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14111F] hover:bg-[#A855F7]/20 border border-[#A855F7]/40 text-[#E9E6D8] font-pixel text-[8px] transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#39FF88]" />
              <span>ZPĚT NA SELECT SECTION</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
