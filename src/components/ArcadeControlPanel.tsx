import React, { useState } from 'react';

export type ArcadeSectionId = 'o-mne' | 'skola' | 'prace' | 'zajmy' | 'hry' | 'kontakt';

interface ArcadeControlPanelProps {
  activeSection: ArcadeSectionId | null;
  credits: number;
  onNavigate: (sectionId: ArcadeSectionId) => void;
  onInsertCoin: () => void;
}

const MAIN_BUTTONS: {
  keyLabel: string;
  title: string;
  sectionId: ArcadeSectionId;
  colorHex: string;
  borderClass: string;
  bgClass: string;
  glowShadow: string;
}[] = [
  {
    keyLabel: 'A',
    title: 'O MNĚ',
    sectionId: 'o-mne',
    colorHex: '#39FF88',
    borderClass: 'border-[#39FF88]',
    bgClass: 'bg-[#39FF88]/15 hover:bg-[#39FF88]/30 text-[#39FF88]',
    glowShadow: 'shadow-[0_0_18px_rgba(57,255,136,0.45),inset_0_0_8px_rgba(57,255,136,0.3)]'
  },
  {
    keyLabel: 'B',
    title: 'ŠKOLA',
    sectionId: 'skola',
    colorHex: '#38BDF8',
    borderClass: 'border-[#38BDF8]',
    bgClass: 'bg-[#38BDF8]/15 hover:bg-[#38BDF8]/30 text-[#38BDF8]',
    glowShadow: 'shadow-[0_0_18px_rgba(56,189,248,0.45),inset_0_0_8px_rgba(56,189,248,0.3)]'
  },
  {
    keyLabel: 'C',
    title: 'PRÁCE',
    sectionId: 'prace',
    colorHex: '#A855F7',
    borderClass: 'border-[#A855F7]',
    bgClass: 'bg-[#A855F7]/15 hover:bg-[#A855F7]/30 text-[#A855F7]',
    glowShadow: 'shadow-[0_0_18px_rgba(168,85,247,0.45),inset_0_0_8px_rgba(168,85,247,0.3)]'
  },
  {
    keyLabel: 'D',
    title: 'ZÁJMY',
    sectionId: 'zajmy',
    colorHex: '#FFE93B',
    borderClass: 'border-[#FFE93B]',
    bgClass: 'bg-[#FFE93B]/15 hover:bg-[#FFE93B]/30 text-[#FFE93B]',
    glowShadow: 'shadow-[0_0_18px_rgba(255,233,59,0.45),inset_0_0_8px_rgba(255,233,59,0.3)]'
  }
];

export const ArcadeControlPanel: React.FC<ArcadeControlPanelProps> = ({
  activeSection,
  credits,
  onNavigate,
  onInsertCoin
}) => {
  const [joystickTilt, setJoystickTilt] = useState<'center' | 'left' | 'right'>('center');

  const handleJoystickClick = () => {
    setJoystickTilt('right');
    setTimeout(() => setJoystickTilt('left'), 160);
    setTimeout(() => setJoystickTilt('center'), 340);
  };

  return (
    <div className="w-full bg-[#14111F] border-t-4 border-[#27203A] rounded-b-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)]">
      {/* 1. SLOPED CONTROL DECK (Joystick + 4 Round Neon Buttons + Start/Esc) */}
      <div className="relative bg-gradient-to-b from-[#1B162A] via-[#14111F] to-[#0E0B16] px-4 py-5 sm:px-8 sm:py-6 border-b-2 border-[#251E38]">
        {/* Subtle metallic deck top bevel */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#A855F7]/50 to-transparent" />

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* LEFT: ARCADE JOYSTICK WITH PURPLE BALL TOP (Hidden on mobile per instructions) */}
          <div className="hidden md:flex items-center gap-5">
            <div
              onClick={handleJoystickClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleJoystickClick();
                }
              }}
              aria-label="Herní joystick automatu (vizuální prvek)"
              title="Najetím nebo kliknutím zatřeseš joystickem!"
              className="relative w-24 h-24 rounded-2xl bg-[#0A0A14] border-2 border-[#2B2440] flex items-center justify-center cursor-pointer group shadow-inner"
            >
              {/* Dust washer base */}
              <div className="w-14 h-14 rounded-full bg-[#161324] border border-[#3B3154] shadow-inner flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-[#05070D]" />
              </div>

              {/* Stick & Glowing Purple Ball Top */}
              <div
                className={`joystick-stick absolute bottom-7 flex flex-col items-center origin-bottom transition-transform duration-150 ${
                  joystickTilt === 'left'
                    ? '-rotate-12'
                    : joystickTilt === 'right'
                      ? 'rotate-12'
                      : 'group-hover:rotate-6'
                }`}
              >
                {/* Glowing Purple Ball Top */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D8B4FE] via-[#A855F7] to-[#581C87] border border-[#E9D5FF]/60 shadow-[0_0_22px_rgba(168,85,247,0.85)] relative">
                  {/* Specular highlight */}
                  <div className="absolute top-1.5 left-2 w-3 h-2 rounded-full bg-white/70 rotate-[-25deg]" />
                </div>
                {/* Chrome shaft */}
                <div className="w-2.5 h-6 -mt-1 bg-gradient-to-r from-slate-400 via-white to-slate-500 rounded-b-full shadow" />
              </div>
            </div>

            <div className="text-left">
              <span className="font-pixel text-[10px] text-[#A855F7] block">
                OVLÁDACÍ PANEL
              </span>
              <p className="text-xs text-[#8B93A7] mt-1 max-w-[180px] leading-snug">
                Stiskni tlačítka <strong className="text-[#E9E6D8]">A / B / C / D</strong>,{' '}
                <strong className="text-[#39FF88]">ENTER</strong> nebo{' '}
                <strong className="text-[#FFE93B]">ESC</strong> i na klávesnici.
              </p>
            </div>
          </div>

          {/* CENTER: 4 ROUND GLOWING BUTTONS (A, B, C, D) — Always visible (Touch-friendly on mobile) */}
          <div className="flex items-center justify-center gap-3 sm:gap-5">
            {MAIN_BUTTONS.map((btn) => {
              const isActive = activeSection === btn.sectionId;
              return (
                <div key={btn.keyLabel} className="flex flex-col items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onNavigate(btn.sectionId)}
                    aria-label={`Přejít na sekci ${btn.title} (klávesa ${btn.keyLabel})`}
                    className={`w-13 h-13 sm:w-15 sm:h-15 rounded-full border-2 font-pixel text-sm sm:text-base flex items-center justify-center transition-all active:scale-90 cursor-pointer ${
                      btn.borderClass
                    } ${btn.bgClass} ${btn.glowShadow} ${
                      isActive ? 'ring-2 ring-white scale-105' : ''
                    }`}
                  >
                    {btn.keyLabel}
                  </button>
                  <span className="font-pixel text-[8px] sm:text-[9px] text-[#E9E6D8] tracking-tight">
                    {btn.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* RIGHT: ARCADE START [ENTER] & KONTAKT [ESC] BUTTONS */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => onNavigate('hry')}
              aria-label="Přejít na sekci Hry (klávesa ENTER)"
              className="px-3.5 py-2.5 rounded-xl bg-[#39FF88]/15 hover:bg-[#39FF88]/25 border-2 border-[#39FF88] text-[#39FF88] font-pixel text-[9px] sm:text-[10px] shadow-[0_0_15px_rgba(57,255,136,0.35)] active:scale-95 transition-all cursor-pointer flex flex-col items-center gap-1"
            >
              <span>HRY ×2</span>
              <span className="text-[7px] text-[#E9E6D8] opacity-80">[ENTER]</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('kontakt')}
              aria-label="Přejít na sekci Kontakt (klávesa ESC)"
              className="px-3.5 py-2.5 rounded-xl bg-[#A855F7]/15 hover:bg-[#A855F7]/25 border-2 border-[#A855F7] text-[#A855F7] font-pixel text-[9px] sm:text-[10px] shadow-[0_0_15px_rgba(168,85,247,0.35)] active:scale-95 transition-all cursor-pointer flex flex-col items-center gap-1"
            >
              <span>KONTAKT</span>
              <span className="text-[7px] text-[#E9E6D8] opacity-80">[ESC]</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. LOWER COIN DOOR (MINCOVNÍK) */}
      <div className="bg-[#0D0A14] px-4 py-4 sm:px-8 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left status indicator */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-[#05070D] border border-[#39FF88]/40 font-pixel text-[10px] sm:text-xs text-[#39FF88] shadow-[inset_0_0_10px_rgba(57,255,136,0.2)]">
            CREDIT: <span className="text-[#FFE93B]">{String(credits).padStart(2, '0')}</span>
          </div>
          <span className="font-pixel text-[8px] sm:text-[9px] text-[#8B93A7] animate-arcade-blink hidden sm:inline">
            PRESS START TO CONTINUE
          </span>
        </div>

        {/* Center Physical Coin Slot Button */}
        <button
          type="button"
          onClick={onInsertCoin}
          aria-label="Vhodit minci (INSERT COIN) — přidá kredit a žirafa mrkne"
          className="group relative flex items-center gap-3 px-5 py-2.5 rounded-xl bg-gradient-to-b from-[#2A1F1D] to-[#171112] border-2 border-[#FFE93B] hover:border-[#39FF88] shadow-[0_0_22px_rgba(255,233,59,0.35)] hover:shadow-[0_0_28px_rgba(57,255,136,0.5)] active:scale-95 transition-all cursor-pointer"
        >
          {/* Glowing vertical coin slot */}
          <div className="w-3 h-7 rounded-sm bg-[#05070D] border border-[#FFE93B] flex items-center justify-center shadow-[inset_0_0_6px_#FFE93B]">
            <div className="w-0.5 h-4 bg-[#FFE93B] group-hover:bg-[#39FF88] transition-colors" />
          </div>
          <div className="text-left">
            <span className="font-pixel text-[10px] sm:text-xs text-[#FFE93B] group-hover:text-[#39FF88] block">
              INSERT COIN
            </span>
            <span className="text-[10px] text-[#8B93A7] block">
              Klikni: +1 CREDIT & mrknutí žirafy
            </span>
          </div>
        </button>

        {/* Right Cabinet Serial Badge */}
        <div className="font-pixel text-[8px] sm:text-[9px] text-[#8B93A7] text-center sm:text-right">
          © 2026 VLACH SOFT · CABINET #C2
        </div>
      </div>
    </div>
  );
};
