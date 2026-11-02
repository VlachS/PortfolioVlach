import React from 'react';
import { PixelGiraffeIcon } from './PixelGiraffeSideArt';

interface AttractModeOverlayProps {
  isOpen: boolean;
  credits: number;
  onDismiss: () => void;
  onInsertCoin: () => void;
}

const TICKER_ITEMS = [
  '★ FANTASY KNIHY (ERAGON, STOROČÍ, ACOTAR)',
  '★ MARVEL (X-MEN, STORM, JEAN GREY, SCARLET WITCH)',
  '★ DC (RAVEN, HARLEY QUINN, WONDER WOMAN)',
  '★ KOCOUR & FENKA',
  '★ CHEB → PRAHA → BRNO (FLIXBUS)',
  '★ OSOBNOST INFP',
  '★ FF MUNI BRNO (1. ROČNÍK / 1. SEMESTR — 10 % XP)',
  '★ RESTORIO.CZ (PŘIJATO / VRÁCENO)',
  '★ TAYLOR SWIFT — TOLERATE IT',
  '★ DUCHOVNÍ ZVÍŘE: ŽIRAFA & SLON'
];

export const AttractModeOverlay: React.FC<AttractModeOverlayProps> = ({
  isOpen,
  credits,
  onDismiss,
  onInsertCoin
}) => {
  if (!isOpen) return null;

  const tickerText = TICKER_ITEMS.join('   ·   ');

  return (
    <div
      onClick={onDismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Attract Mode — stiskněte libovolnou klávesu nebo klikněte pro návrat"
      className="fixed inset-0 z-50 bg-[#05070D]/95 backdrop-blur-md flex flex-col items-center justify-between p-6 sm:p-10 cursor-pointer select-none overflow-hidden crt-scanlines crt-vignette"
    >
      {/* Ambient Neon Glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#A855F7]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-[#38BDF8]/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Arcade Header */}
      <div className="w-full max-w-4xl flex items-center justify-between text-xs font-pixel z-10 border-b border-[#A855F7]/30 pb-4">
        <span className="text-[#38BDF8] text-[10px] sm:text-xs">1UP: ŠIMON VLACH</span>
        <span className="text-[#FFE93B] text-[10px] sm:text-xs">HI-SCORE: 21620</span>
        <span className="text-[#39FF88] text-[10px] sm:text-xs animate-arcade-blink">
          CREDIT {String(credits).padStart(2, '0')}
        </span>
      </div>

      {/* Center Attract Screen Content */}
      <div className="my-auto flex flex-col items-center text-center max-w-2xl z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14111F] border border-[#A855F7]/50 text-[#A855F7] font-pixel text-[9px] uppercase tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          ★ ATTRACT MODE (DEMO OBRAZOVKA AUTOMATU) ★
        </div>

        <div className="p-5 rounded-2xl bg-[#14111F]/90 border-2 border-[#FFE93B] shadow-[0_0_35px_rgba(255,233,59,0.35)]">
          <PixelGiraffeIcon isWinking={true} className="w-24 h-24 sm:w-28 sm:h-28" />
        </div>

        <h2 className="font-pixel text-xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#38BDF8] to-[#39FF88] leading-relaxed drop-shadow-[0_0_18px_rgba(168,85,247,0.45)]">
          ŠIMON VLACH
          <span className="block text-sm sm:text-lg text-[#FFE93B] mt-3">
            THE PORTFOLIO GAME
          </span>
        </h2>

        {/* Blinking PRESS START */}
        <div className="py-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            className="font-pixel text-base sm:text-2xl text-[#39FF88] animate-arcade-blink px-6 py-3 rounded-xl border-2 border-[#39FF88]/60 bg-[#39FF88]/10 shadow-[0_0_25px_rgba(57,255,136,0.4)] hover:bg-[#39FF88]/20 cursor-pointer"
          >
            PRESS START
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onInsertCoin();
            }}
            className="font-pixel text-[10px] px-4 py-2.5 rounded-lg bg-[#FFE93B]/15 border border-[#FFE93B] text-[#FFE93B] hover:bg-[#FFE93B]/25 shadow-[0_0_15px_rgba(255,233,59,0.3)] cursor-pointer"
          >
            🪙 INSERT COIN (+1 CREDIT)
          </button>
          <span className="text-xs text-[#8B93A7]">
            Jakýkoli pohyb, scroll nebo klávesa vrátí obsah portfolia
          </span>
        </div>
      </div>

      {/* Bottom Scrolling Ticker */}
      <div className="w-full max-w-5xl bg-[#14111F] border-y-2 border-[#38BDF8]/50 py-3 overflow-hidden relative z-10 rounded-lg shadow-[0_0_20px_rgba(56,189,248,0.2)]">
        <div className="animate-ticker font-pixel text-[10px] sm:text-xs text-[#FFE93B] tracking-wider">
          <span className="mx-6">{tickerText}</span>
          <span className="mx-6">{tickerText}</span>
        </div>
      </div>
    </div>
  );
};
