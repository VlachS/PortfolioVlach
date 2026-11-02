import React, { useState } from 'react';
import { Gamepad2, Play, Minimize2, ArrowUpRight } from 'lucide-react';
import { ThinkingMazeGame } from './ThinkingMazeGame';

interface ArcadeGamesSectionProps {
  onInsertCoin: () => void;
}

export const ArcadeGamesSection: React.FC<ArcadeGamesSectionProps> = ({ onInsertCoin }) => {
  const [isMazeGameStarted, setIsMazeGameStarted] = useState(false);

  const handleStartMaze = () => {
    onInsertCoin();
    setIsMazeGameStarted(true);
  };

  return (
    <section id="hry" className="py-14 sm:py-16 bg-transparent relative border-b border-[#A855F7]/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 pb-5 border-b border-[#39FF88]/30">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#39FF88]/15 border border-[#39FF88]/50 text-[#39FF88] font-pixel text-[9px] mb-3 shadow-[0_0_12px_rgba(57,255,136,0.2)]">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>STAGE 05 // JAK PŘEMÝŠLÍM & HRY [KLÁVESA ENTER]</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E9E6D8] tracking-tight">
              Bludiště myšlenek
            </h2>
            <p className="text-xs sm:text-sm text-[#8B93A7] mt-1.5">
              Vhoď minci tlačítkem <strong className="text-[#FFE93B]">INSERT COIN</strong> a vyveď
              myšlenku po kolejích ven z labyrintu.
            </p>
          </div>

          <a
            href="#prace"
            className="inline-flex items-center gap-1.5 font-pixel text-[8px] sm:text-[9px] px-3 py-2 rounded-lg bg-[#14111F] hover:bg-[#39FF88]/15 border border-[#39FF88]/40 text-[#39FF88] transition-colors"
          >
            <span>PRACOVNÍ MINIHRA RESTORIO JE V SEKCI PRÁCE [C]</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* CARTRIDGE: BLUDIŠTĚ MYŠLENEK (ThinkingMazeGame) */}
        <div className="rounded-2xl bg-[#0D101D] border-2 border-[#A855F7]/60 shadow-[0_0_30px_rgba(168,85,247,0.12)] overflow-hidden">
          {/* Cartridge Top Label Strip */}
          <div className="bg-gradient-to-r from-[#221236] via-[#14111F] to-[#221236] px-4 py-3 sm:px-6 border-b border-[#A855F7]/40 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="font-pixel text-[9px] px-2.5 py-1 rounded bg-[#A855F7]/20 border border-[#A855F7] text-[#D8B4FE]">
                CARTRIDGE // MYŠLENKY
              </span>
              <h3 className="font-pixel text-xs sm:text-sm text-[#E9E6D8]">
                BLUDIŠTĚ MYŠLENEK
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {isMazeGameStarted ? (
                <button
                  type="button"
                  onClick={() => setIsMazeGameStarted(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#14111F] hover:bg-slate-800 border border-slate-700 text-xs text-[#8B93A7] hover:text-[#E9E6D8] cursor-pointer"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Vysunout cartridge</span>
                </button>
              ) : (
                <span className="font-pixel text-[8px] text-[#FFE93B] animate-arcade-blink">
                  INSERT COIN TO PLAY
                </span>
              )}
            </div>
          </div>

          {/* Cartridge Body */}
          {!isMazeGameStarted ? (
            <div className="p-6 sm:p-10 text-center bg-gradient-to-b from-[#130D21] to-[#05070D] flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#A855F7]/15 border-2 border-[#A855F7] flex items-center justify-center text-[#D8B4FE] mb-4 shadow-[0_0_24px_rgba(168,85,247,0.3)]">
                <Gamepad2 className="w-8 h-8" />
              </div>

              <span className="font-pixel text-[9px] text-[#D8B4FE] uppercase tracking-wider mb-2">
                BLUDIŠŤOVÁ MINIHRA SE SLEPÝMI ULIČKAMI
              </span>
              <h4 className="text-xl sm:text-2xl font-extrabold text-[#E9E6D8] mb-2">
                „Bludiště myšlenek“
              </h4>
              <p className="text-xs sm:text-sm text-[#8B93A7] max-w-xl mb-6 leading-relaxed">
                „Moje myšlenky se mi dokážou často zamotat. Vždy je musím rozdělit a uspořádat,
                aby všem dávaly smysl.“ Vyveď slovo <strong className="text-[#E9E6D8]">MYŠLENKA</strong>{' '}
                po kolejích ven z labyrintu a vyhni se slepým chodbičkám!
              </p>

              <button
                type="button"
                onClick={handleStartMaze}
                aria-label="Vhodit minci a spustit hru Bludiště myšlenek"
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#A855F7]/20 hover:bg-[#A855F7]/30 border-2 border-[#A855F7] text-[#FFE93B] font-pixel text-xs sm:text-sm shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.65)] active:scale-95 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>INSERT COIN — SPUSTIT HRU</span>
              </button>
            </div>
          ) : (
            <div className="bg-[#05070D]">
              <ThinkingMazeGame />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
