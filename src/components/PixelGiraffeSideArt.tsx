import React from 'react';

interface PixelGiraffeSideArtProps {
  isWinking: boolean;
  onWinkTrigger?: () => void;
  side?: 'left' | 'right';
}

/**
 * Pixel-art Giraffe SVG for the CRT Menu Tile ("O MNĚ") and Cabinet Side-Art.
 * Uses crispEdges & pixelated rendering for authentic 16-bit arcade aesthetics.
 */
export const PixelGiraffeIcon: React.FC<{ isWinking?: boolean; className?: string }> = ({
  isWinking = false,
  className = 'w-16 h-16'
}) => {
  return (
    <svg
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
      className={`pixelated select-none ${className}`}
      aria-hidden="true"
    >
      {/* Ossicones (horns) */}
      <rect x="12" y="2" width="2" height="2" fill="#78350F" />
      <rect x="18" y="2" width="2" height="2" fill="#78350F" />
      <rect x="13" y="4" width="1" height="2" fill="#F59E0B" />
      <rect x="18" y="4" width="1" height="2" fill="#F59E0B" />

      {/* Ears */}
      <rect x="9" y="5" width="2" height="2" fill="#F59E0B" />
      <rect x="10" y="6" width="1" height="1" fill="#FDA4AF" />
      <rect x="21" y="5" width="2" height="2" fill="#F59E0B" />
      <rect x="21" y="6" width="1" height="1" fill="#FDA4AF" />

      {/* Head */}
      <rect x="11" y="5" width="10" height="6" fill="#FFE93B" />
      <rect x="12" y="4" width="8" height="1" fill="#FFE93B" />
      <rect x="15" y="5" width="2" height="2" fill="#B45309" />

      {/* Eyes (Left eye normal, Right eye winks when isWinking is true!) */}
      <rect x="12" y="7" width="2" height="2" fill="#05070D" />
      <rect x="12" y="7" width="1" height="1" fill="#FFFFFF" />

      {isWinking ? (
        <>
          {/* Winking eye line */}
          <rect x="18" y="8" width="3" height="1" fill="#05070D" />
          {/* Little neon pixel heart / star next to wink */}
          <rect x="24" y="4" width="2" height="2" fill="#39FF88" />
          <rect x="25" y="3" width="2" height="2" fill="#FFE93B" />
        </>
      ) : (
        <>
          <rect x="18" y="7" width="2" height="2" fill="#05070D" />
          <rect x="18" y="7" width="1" height="1" fill="#FFFFFF" />
        </>
      )}

      {/* Snout / Muzzle */}
      <rect x="12" y="10" width="8" height="3" fill="#FEF08A" />
      <rect x="13" y="10" width="1" height="1" fill="#78350F" />
      <rect x="18" y="10" width="1" height="1" fill="#78350F" />
      <rect x="14" y="12" width="4" height="1" fill="#92400E" />

      {/* Long Pixel Neck */}
      <rect x="14" y="13" width="4" height="11" fill="#FFE93B" />
      <rect x="13" y="14" width="1" height="10" fill="#F59E0B" />
      {/* Mane */}
      <rect x="12" y="14" width="1" height="2" fill="#92400E" />
      <rect x="12" y="17" width="1" height="2" fill="#92400E" />
      <rect x="12" y="20" width="1" height="2" fill="#92400E" />

      {/* Giraffe Spots on Neck & Body */}
      <rect x="15" y="14" width="2" height="2" fill="#B45309" />
      <rect x="14" y="18" width="2" height="2" fill="#92400E" />
      <rect x="16" y="21" width="2" height="2" fill="#B45309" />

      {/* Body */}
      <rect x="11" y="23" width="10" height="4" fill="#FFE93B" />
      <rect x="12" y="24" width="2" height="2" fill="#92400E" />
      <rect x="16" y="24" width="3" height="2" fill="#B45309" />
      {/* Tail */}
      <rect x="21" y="24" width="1" height="3" fill="#F59E0B" />
      <rect x="21" y="27" width="2" height="1" fill="#78350F" />

      {/* Legs */}
      <rect x="11" y="27" width="2" height="3" fill="#F59E0B" />
      <rect x="14" y="27" width="2" height="3" fill="#EAB308" />
      <rect x="17" y="27" width="2" height="3" fill="#F59E0B" />
      <rect x="19" y="27" width="2" height="3" fill="#EAB308" />

      {/* Pixel Grass Base */}
      <rect x="6" y="29" width="20" height="2" fill="#16A34A" />
      <rect x="8" y="28" width="2" height="1" fill="#39FF88" />
      <rect x="13" y="28" width="2" height="1" fill="#39FF88" />
      <rect x="20" y="28" width="2" height="1" fill="#39FF88" />
      <rect x="23" y="28" width="1" height="1" fill="#39FF88" />
    </svg>
  );
};

export const PixelGiraffeSideArt: React.FC<PixelGiraffeSideArtProps> = ({
  isWinking,
  onWinkTrigger,
  side = 'right'
}) => {
  return (
    <div
      onClick={onWinkTrigger}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onWinkTrigger?.();
        }
      }}
      aria-label="Pixel-art maskot žirafa na boku automatu – klikni pro mrknutí"
      title="Maskot žirafa (klikni na mincovník nebo sem pro mrknutí!)"
      className={`hidden xl:flex flex-col items-center justify-between py-8 px-3 w-28 shrink-0 bg-[#110E1B] border-y-2 ${
        side === 'left'
          ? 'border-l-2 rounded-l-3xl border-[#A855F7]/30'
          : 'border-r-2 rounded-r-3xl border-[#A855F7]/30'
      } shadow-[0_0_30px_rgba(168,85,247,0.12)] cursor-pointer select-none group relative overflow-hidden`}
    >
      {/* Side-art neon stripe */}
      <div className="w-1 h-16 rounded-full bg-gradient-to-b from-[#A855F7] via-[#38BDF8] to-[#39FF88] opacity-60 group-hover:opacity-100 transition-opacity" />

      {/* Vertical Arcade Decal Label */}
      <div className="my-4 flex flex-col items-center gap-2">
        <span className="font-pixel text-[8px] text-[#FFE93B] tracking-widest uppercase [writing-mode:vertical-rl] rotate-180 opacity-85 group-hover:opacity-100">
          GIRAFFE SPIRIT
        </span>
      </div>

      {/* Pixel-Art Giraffe Decal */}
      <div
        className={`relative p-2 rounded-xl bg-[#0A0A14]/90 border transition-all duration-300 ${
          isWinking
            ? 'border-[#FFE93B] shadow-[0_0_20px_rgba(255,233,59,0.65)] scale-110'
            : 'border-[#A855F7]/30 group-hover:border-[#FFE93B]/60'
        }`}
      >
        <PixelGiraffeIcon isWinking={isWinking} className="w-16 h-16" />

        {/* Wink popup indicator */}
        {isWinking && (
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-pixel text-[8px] text-[#39FF88] bg-[#05070D] px-1.5 py-0.5 rounded border border-[#39FF88] whitespace-nowrap shadow-[0_0_10px_#39FF88]">
            *MRK!* ★
          </span>
        )}
      </div>

      {/* Bottom Side-Art Geometry */}
      <div className="my-4 flex flex-col items-center gap-1.5">
        <span className="font-pixel text-[7px] text-[#8B93A7] text-center leading-tight">
          LVL 21
          <br />
          INFP
        </span>
      </div>

      <div className="w-1 h-16 rounded-full bg-gradient-to-t from-[#A855F7] via-[#38BDF8] to-[#FFE93B] opacity-60 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};
