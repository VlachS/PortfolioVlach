import React, { useState, useEffect, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { GiraffePeeker } from './GiraffePeeker';
import { PixelGiraffeIcon } from './PixelGiraffeSideArt';
import { ArcadeSectionId } from './ArcadeControlPanel';

interface HeroProps {
  isGiraffeWinking?: boolean;
  onNavigate: (sectionId: ArcadeSectionId) => void;
  onInsertCoin: () => void;
}

/* Crisp Pixel-Art Icons matching the reference CRT menu aesthetic */
const PixelTrophyIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" shapeRendering="crispEdges" className="w-12 h-12 sm:w-14 sm:h-14 pixelated" aria-hidden="true">
    <rect x="6" y="4" width="12" height="2" fill="#F8FAFC" />
    <rect x="4" y="6" width="2" height="5" fill="#CBD5E1" />
    <rect x="18" y="6" width="2" height="5" fill="#94A3B8" />
    <rect x="6" y="6" width="12" height="7" fill="#E2E8F0" />
    <rect x="8" y="6" width="3" height="6" fill="#FFFFFF" />
    <rect x="8" y="13" width="8" height="2" fill="#CBD5E1" />
    <rect x="10" y="15" width="4" height="3" fill="#94A3B8" />
    <rect x="7" y="18" width="10" height="2" fill="#E2E8F0" />
    <rect x="6" y="20" width="12" height="2" fill="#64748B" />
  </svg>
);

const PixelGearScannerIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" shapeRendering="crispEdges" className="w-12 h-12 sm:w-14 sm:h-14 pixelated" aria-hidden="true">
    <rect x="10" y="3" width="4" height="3" fill="#E2E8F0" />
    <rect x="10" y="18" width="4" height="3" fill="#94A3B8" />
    <rect x="3" y="10" width="3" height="4" fill="#CBD5E1" />
    <rect x="18" y="10" width="3" height="4" fill="#94A3B8" />
    <rect x="5" y="5" width="3" height="3" fill="#E2E8F0" />
    <rect x="16" y="5" width="3" height="3" fill="#CBD5E1" />
    <rect x="5" y="16" width="3" height="3" fill="#94A3B8" />
    <rect x="16" y="16" width="3" height="3" fill="#64748B" />
    <rect x="6" y="6" width="12" height="12" fill="#CBD5E1" />
    <rect x="7" y="7" width="10" height="4" fill="#F8FAFC" />
    <rect x="9" y="9" width="6" height="6" fill="#05070D" />
    <rect x="10" y="11" width="4" height="2" fill="#39FF88" />
  </svg>
);

const PixelLeaderboardIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" shapeRendering="crispEdges" className="w-12 h-12 sm:w-14 sm:h-14 pixelated" aria-hidden="true">
    <rect x="3" y="16" width="3" height="4" fill="#94A3B8" />
    <rect x="7" y="13" width="3" height="7" fill="#CBD5E1" />
    <rect x="11" y="10" width="3" height="10" fill="#E2E8F0" />
    <rect x="15" y="7" width="3" height="13" fill="#F8FAFC" />
    <rect x="19" y="4" width="3" height="16" fill="#FFE93B" />
    <rect x="2" y="21" width="20" height="1" fill="#38BDF8" />
  </svg>
);

const PixelArcadeGameIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" shapeRendering="crispEdges" className="w-12 h-12 sm:w-14 sm:h-14 pixelated" aria-hidden="true">
    {/* Sun / Pixel Orb */}
    <rect x="6" y="5" width="3" height="3" fill="#F8FAFC" />
    {/* Pixel Mountains / Maze Peaks */}
    <rect x="8" y="11" width="2" height="2" fill="#F8FAFC" />
    <rect x="6" y="13" width="6" height="2" fill="#CBD5E1" />
    <rect x="4" y="15" width="10" height="2" fill="#94A3B8" />
    <rect x="15" y="9" width="2" height="2" fill="#E2E8F0" />
    <rect x="13" y="11" width="6" height="2" fill="#CBD5E1" />
    <rect x="11" y="13" width="10" height="4" fill="#94A3B8" />
    <rect x="3" y="17" width="18" height="3" fill="#64748B" />
  </svg>
);

const PixelContactSpeakerIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" shapeRendering="crispEdges" className="w-12 h-12 sm:w-14 sm:h-14 pixelated" aria-hidden="true">
    <rect x="4" y="9" width="4" height="6" fill="#CBD5E1" />
    <rect x="8" y="7" width="2" height="10" fill="#E2E8F0" />
    <rect x="10" y="5" width="3" height="14" fill="#F8FAFC" />
    {/* Sound / Signal Waves */}
    <rect x="15" y="8" width="1" height="2" fill="#A855F7" />
    <rect x="16" y="10" width="1" height="4" fill="#E2E8F0" />
    <rect x="15" y="14" width="1" height="2" fill="#A855F7" />
    <rect x="18" y="6" width="1" height="2" fill="#38BDF8" />
    <rect x="19" y="8" width="1" height="8" fill="#CBD5E1" />
    <rect x="18" y="16" width="1" height="2" fill="#38BDF8" />
  </svg>
);

export const Hero: React.FC<HeroProps> = ({
  isGiraffeWinking = false,
  onNavigate,
  onInsertCoin
}) => {
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('simon_custom_photo');
      if (saved) setCustomPhotoUrl(saved);
    } catch {
      // Ignore localStorage issues
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCustomPhotoUrl(result);
        try {
          localStorage.setItem('simon_custom_photo', result);
        } catch {
          // Ignore quota exceeded
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setCustomPhotoUrl(null);
    try {
      localStorage.removeItem('simon_custom_photo');
    } catch {
      // Ignore
    }
  };

  const MENU_TILES: {
    id: ArcadeSectionId;
    label: string;
    subtitle: string;
    keyBind: string;
    borderStyle: string;
    labelColor: string;
    badgeStyle: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'o-mne',
      label: 'O MNĚ',
      subtitle: '21 let · INFP · Cheb ➔ Brno · Zvířata',
      keyBind: 'A',
      borderStyle:
        'border-[#FFE93B]/80 bg-gradient-to-b from-[#2A2412]/70 to-[#110F0A]/90 shadow-[0_0_24px_rgba(255,233,59,0.28),inset_0_0_18px_rgba(255,233,59,0.12)] hover:border-[#FFE93B] hover:shadow-[0_0_34px_rgba(255,233,59,0.55),inset_0_0_22px_rgba(255,233,59,0.22)]',
      labelColor: 'text-[#FFE93B] drop-shadow-[0_0_8px_rgba(255,233,59,0.6)]',
      badgeStyle: 'bg-[#FFE93B]/20 text-[#FFE93B] border-[#FFE93B]/50',
      icon: <PixelGiraffeIcon isWinking={isGiraffeWinking} className="w-14 h-14 sm:w-16 sm:h-16" />
    },
    {
      id: 'skola',
      label: 'ŠKOLA',
      subtitle: 'Informační studia FF MUNI · 1. semestr',
      keyBind: 'B',
      borderStyle:
        'border-[#39FF88]/70 bg-gradient-to-b from-[#0E291E]/70 to-[#08130F]/90 shadow-[0_0_22px_rgba(57,255,136,0.22),inset_0_0_16px_rgba(57,255,136,0.1)] hover:border-[#39FF88] hover:shadow-[0_0_34px_rgba(57,255,136,0.5),inset_0_0_22px_rgba(57,255,136,0.2)]',
      labelColor: 'text-[#39FF88] drop-shadow-[0_0_8px_rgba(57,255,136,0.6)]',
      badgeStyle: 'bg-[#39FF88]/20 text-[#39FF88] border-[#39FF88]/50',
      icon: <PixelTrophyIcon />
    },
    {
      id: 'prace',
      label: 'PRÁCE',
      subtitle: 'Restorio.cz · Přijato / Vráceno',
      keyBind: 'C',
      borderStyle:
        'border-[#A855F7]/75 bg-gradient-to-b from-[#1E1233]/70 to-[#0D0918]/90 shadow-[0_0_22px_rgba(168,85,247,0.24),inset_0_0_16px_rgba(168,85,247,0.12)] hover:border-[#A855F7] hover:shadow-[0_0_34px_rgba(168,85,247,0.55),inset_0_0_22px_rgba(168,85,247,0.22)]',
      labelColor: 'text-[#A855F7] drop-shadow-[0_0_8px_rgba(168,85,247,0.65)]',
      badgeStyle: 'bg-[#A855F7]/20 text-[#D8B4FE] border-[#A855F7]/50',
      icon: <PixelGearScannerIcon />
    },
    {
      id: 'zajmy',
      label: 'ZÁJMY',
      subtitle: 'Top 3 Apps · Taylor Swift · Knihy · Komiksy',
      keyBind: 'D',
      borderStyle:
        'border-[#38BDF8]/75 bg-gradient-to-b from-[#0C2236]/70 to-[#07111C]/90 shadow-[0_0_22px_rgba(56,189,248,0.24),inset_0_0_16px_rgba(56,189,248,0.12)] hover:border-[#38BDF8] hover:shadow-[0_0_34px_rgba(56,189,248,0.55),inset_0_0_22px_rgba(56,189,248,0.22)]',
      labelColor: 'text-[#38BDF8] drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]',
      badgeStyle: 'bg-[#38BDF8]/20 text-[#38BDF8] border-[#38BDF8]/50',
      icon: <PixelLeaderboardIcon />
    },
    {
      id: 'hry',
      label: 'HRY ×2',
      subtitle: '1) Třídění Restorio · 2) Bludiště myšlenek',
      keyBind: 'ENTER',
      borderStyle:
        'border-[#39FF88]/75 bg-gradient-to-b from-[#0E291E]/70 to-[#08130F]/90 shadow-[0_0_22px_rgba(57,255,136,0.24),inset_0_0_16px_rgba(57,255,136,0.12)] hover:border-[#39FF88] hover:shadow-[0_0_34px_rgba(57,255,136,0.55),inset_0_0_22px_rgba(57,255,136,0.22)]',
      labelColor: 'text-[#39FF88] drop-shadow-[0_0_8px_rgba(57,255,136,0.6)]',
      badgeStyle: 'bg-[#39FF88]/20 text-[#39FF88] border-[#39FF88]/50',
      icon: <PixelArcadeGameIcon />
    },
    {
      id: 'videa',
      label: 'VIDEA',
      subtitle: 'Z pohledu zákazníka · 3 videa z Restoria',
      keyBind: 'V',
      borderStyle:
        'border-[#A855F7]/75 bg-gradient-to-b from-[#1E1233]/70 to-[#0D0918]/90 shadow-[0_0_22px_rgba(168,85,247,0.24),inset_0_0_16px_rgba(168,85,247,0.12)] hover:border-[#A855F7] hover:shadow-[0_0_34px_rgba(168,85,247,0.55),inset_0_0_22px_rgba(168,85,247,0.22)]',
      labelColor: 'text-[#A855F7] drop-shadow-[0_0_8px_rgba(168,85,247,0.65)]',
      badgeStyle: 'bg-[#A855F7]/20 text-[#D8B4FE] border-[#A855F7]/50',
      icon: <PixelContactSpeakerIcon />
    }
  ];

  return (
    <section id="uvod" className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-[#A855F7]/20">
      {/* Top-right CRT glass light reflection arc (matching reference image) */}
      <div className="absolute -top-6 right-6 w-64 h-64 bg-gradient-to-bl from-white/[0.04] via-transparent to-transparent rounded-full blur-xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* 1. SELECT SECTION HEADER (Exact match to uploaded CRT reference photo) */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="font-pixel text-2xl sm:text-4xl md:text-[40px] text-[#FFE93B] tracking-wider leading-tight drop-shadow-[0_4px_0_#78350F] [text-shadow:0_0_22px_rgba(255,233,59,0.55)]">
            SELECT
            <span className="block mt-1.5">SECTION</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#8B93A7]">
            Klikni na dlaždici nebo stiskni příslušnou klávesu na klávesnici či panelu dole
          </p>
        </div>

        {/* 2. 6 NEON FROSTED-GLASS MENU TILES (3x2 on desktop, 2x3 on tablet, 1 col on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto">
          {MENU_TILES.map((tile) => (
            <button
              key={tile.id}
              type="button"
              onClick={() => onNavigate(tile.id)}
              aria-label={`Přejít na sekci ${tile.label} (klávesa ${tile.keyBind})`}
              className={`arcade-tile group relative rounded-[14px] border p-5 sm:p-6 backdrop-blur-md flex flex-col items-center justify-between text-center cursor-pointer min-h-[185px] sm:min-h-[205px] ${tile.borderStyle}`}
            >
              {/* Top Keybind Chip */}
              <div className="w-full flex items-center justify-between mb-2">
                <span className="font-pixel text-[8px] text-[#8B93A7] group-hover:text-[#E9E6D8] transition-colors">
                  STAGE
                </span>
                <span
                  className={`font-pixel text-[8px] px-2 py-0.5 rounded border ${tile.badgeStyle}`}
                >
                  [{tile.keyBind}]
                </span>
              </div>

              {/* Pixel-Art Center Icon */}
              <div className="my-2 transform group-hover:scale-110 transition-transform duration-200">
                {tile.icon}
              </div>

              {/* Pixel Label + Readable Subtitle */}
              <div className="mt-2">
                <span className={`font-pixel text-xs sm:text-sm block ${tile.labelColor}`}>
                  {tile.label}
                </span>
                <span className="text-[11px] sm:text-xs text-[#E9E6D8]/80 block mt-1.5 font-sans leading-snug">
                  {tile.subtitle}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* 3. XP LEVEL BAR UNDER THE TILES (1st year, 1st semester — 10% progress at the start) */}
        <div className="mt-8 sm:mt-10 max-w-xl mx-auto flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-4 py-3 rounded-xl bg-[#0D101D]/90 border border-[#39FF88]/30 shadow-[0_0_20px_rgba(57,255,136,0.1)]">
          <div className="flex items-center gap-2.5 font-pixel text-[10px] sm:text-xs">
            <span className="text-[#E9E6D8]">STUDIUM</span>
            <span className="text-[#39FF88]">1. SEMESTR</span>
          </div>

          <div
            className="flex-1 min-w-[160px] h-4 rounded-md bg-[#05070D] border border-[#39FF88]/50 p-0.5 overflow-hidden shadow-inner"
            role="progressbar"
            aria-valuenow={10}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Studijní postup FF MUNI Brno: 1. ročník, 1. semestr, 10 procent"
          >
            <div
              className="h-full bg-gradient-to-r from-[#22C55E] to-[#39FF88] rounded-xs shadow-[0_0_12px_#39FF88]"
              style={{ width: '10%' }}
            />
          </div>

          <span className="font-pixel text-[10px] text-[#39FF88]">10%</span>
        </div>

        {/* 4. PLAYER 1 CHARACTER CARD (Šimon Vlach Intro + Photo Frame with Peeking Giraffe) */}
        <div className="mt-10 sm:mt-12 rounded-2xl bg-[#0D101D]/90 border border-[#A855F7]/35 p-5 sm:p-7 shadow-[0_0_30px_rgba(168,85,247,0.12)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Bio & Greeting */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-full bg-[#14111F] border border-[#A855F7]/40 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#39FF88] animate-pulse" />
                <span className="font-pixel text-[9px] text-[#FFE93B]">PLAYER 1</span>
                <span className="text-[#8B93A7]">·</span>
                <span className="text-[#E9E6D8] font-medium">Informační studia FF MUNI</span>
                <span className="text-[#8B93A7]">·</span>
                <span className="text-[#39FF88] font-medium">Výkupař Restorio.cz</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#E9E6D8] tracking-tight leading-tight">
                Zdravím, jmenuji se{' '}
                <span className="bg-gradient-to-r from-[#A855F7] via-[#38BDF8] to-[#39FF88] bg-clip-text text-transparent">
                  Šimon Vlach
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#E9E6D8]/90 leading-relaxed">
                Toto je portfolio o mně ve stylu retro herního automatu. Jestli se chcete dozvědět
                více, vyberte si sekci na obrazovce výše nebo sjeďte níže — doufám, že se Vám web
                bude líbit!
              </p>

              {/* Scannable Character Attributes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="p-2.5 rounded-xl bg-[#05070D] border border-[#FFE93B]/30">
                  <span className="font-pixel text-[8px] text-[#FFE93B] block">VĚK / TŘÍDA</span>
                  <span className="text-xs sm:text-sm font-bold text-[#E9E6D8] mt-1 block">
                    21 let · INFP
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#05070D] border border-[#39FF88]/30">
                  <span className="font-pixel text-[8px] text-[#39FF88] block">TRASA</span>
                  <span className="text-xs sm:text-sm font-bold text-[#E9E6D8] mt-1 block">
                    Cheb ➔ Praha ➔ Brno
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#05070D] border border-[#38BDF8]/30">
                  <span className="font-pixel text-[8px] text-[#38BDF8] block">MASKOT</span>
                  <span className="text-xs sm:text-sm font-bold text-[#E9E6D8] mt-1 block">
                    Žirafa & Slon
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#05070D] border border-[#A855F7]/30">
                  <span className="font-pixel text-[8px] text-[#A855F7] block">SPOLUBYDLÍCÍ</span>
                  <span className="text-xs sm:text-sm font-bold text-[#E9E6D8] mt-1 block">
                    Kocour & Fenka
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Photo Frame with Peeking Giraffe */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end pt-8 sm:pt-10 lg:pt-4">
              <div className="relative w-64 sm:w-72">
                <GiraffePeeker onInteraction={onInsertCoin} />

                <div className="relative z-10 bg-[#14111F] border-2 border-[#A855F7]/50 rounded-2xl p-3.5 shadow-2xl">
                  <div className="relative aspect-[4/4.5] rounded-xl overflow-hidden bg-[#05070D] border border-[#38BDF8]/30 flex items-center justify-center">
                    {customPhotoUrl ? (
                      <img
                        src={customPhotoUrl}
                        alt="Šimon Vlach"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#171528] to-[#05070D] p-5 text-center">
                        <div className="w-24 h-24 rounded-full bg-[#1F1B33] border-2 border-[#A855F7]/60 p-1 mb-3 relative shadow-lg">
                          <svg
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-full rounded-full"
                          >
                            <circle cx="50" cy="50" r="48" fill="#14111F" />
                            <path
                              d="M26 44 C24 24, 42 12, 60 12 C78 12, 82 26, 80 44 C74 40, 68 38, 62 40 C56 32, 48 30, 38 34 C32 36, 28 40, 26 44 Z"
                              fill="#FFE93B"
                            />
                            <path
                              d="M38 18 C50 16, 68 20, 72 32 C64 26, 54 24, 42 26 Z"
                              fill="#FEF08A"
                            />
                            <path
                              d="M32 42 C32 35, 68 35, 68 42 C68 56, 62 70, 50 70 C38 70, 32 56, 32 42 Z"
                              fill="#E9E6D8"
                            />
                            <circle cx="43" cy="48" r="2.5" fill="#38BDF8" />
                            <circle cx="57" cy="48" r="2.5" fill="#38BDF8" />
                            <path
                              d="M45 58 Q50 62 55 58"
                              stroke="#334155"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                            <path
                              d="M20 95 C20 78, 35 72, 50 72 C65 72, 80 78, 80 95 Z"
                              fill="#0A0A14"
                            />
                          </svg>
                          <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#39FF88] border-2 border-[#14111F] flex items-center justify-center text-[#05070D] font-bold text-[10px]">
                            ✓
                          </div>
                        </div>

                        <span className="font-pixel text-[9px] text-[#FFE93B]">
                          AVATAR // ŠIMON
                        </span>
                        <p className="text-xs text-[#8B93A7] mt-1.5 max-w-[190px]">
                          Vlastní fotku můžeš nahrát tlačítkem níže.
                        </p>
                      </div>
                    )}

                    {customPhotoUrl && (
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        aria-label="Obnovit výchozí ilustraci"
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/80 hover:bg-black text-white text-xs border border-slate-700 transition-colors cursor-pointer"
                        title="Obnovit výchozí ilustraci"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="font-pixel text-[8px] text-[#39FF88]">1UP: ŠIMON</span>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1 text-[11px] text-[#E9E6D8] hover:text-[#FFE93B] transition-colors font-medium bg-[#A855F7]/20 hover:bg-[#A855F7]/30 border border-[#A855F7]/50 px-2.5 py-1 rounded-md cursor-pointer"
                    >
                      <Upload className="w-3 h-3" />
                      <span>{customPhotoUrl ? 'Změnit fotku' : 'Nahrát fotku'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
