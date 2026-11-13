import React, { useState } from 'react';
import {
  GraduationCap,
  Briefcase,
  ExternalLink,
  Library,
  CheckCircle,
  Layers,
  Barcode,
  Package,
  Coins,
  Play,
  Minimize2,
  Video
} from 'lucide-react';
import { StorioMascot } from './StorioMascot';
import { RestorioSortingGame } from './RestorioSortingGame';

interface EducationWorkProps {
  onInsertCoin?: () => void;
}

export const EducationWork: React.FC<EducationWorkProps> = ({ onInsertCoin }) => {
  const [isSortingGameStarted, setIsSortingGameStarted] = useState(false);

  const handleStartSorting = () => {
    onInsertCoin?.();
    setIsSortingGameStarted(true);
  };

  return (
    <div id="vzdelani-prace" className="divide-y divide-[#A855F7]/20">
      {/* =====================================================================
          STAGE 02 // ŠKOLA [KLÁVESA B]
         ===================================================================== */}
      <section id="skola" className="py-14 sm:py-16 bg-transparent relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-5 border-b border-[#39FF88]/25">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#39FF88]/15 border border-[#39FF88]/50 text-[#39FF88] font-pixel text-[9px] mb-3 shadow-[0_0_12px_rgba(57,255,136,0.2)]">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>STAGE 02 // ŠKOLA [KLÁVESA B]</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E9E6D8] tracking-tight">
                Vzdělání & Akademický Quest
              </h2>
            </div>

            {/* 1. ROČNÍK (1. SEMESTR) — 10 % XP BADGE */}
            <div className="px-4 py-2.5 rounded-xl bg-[#0D101D] border border-[#39FF88]/50 shadow-[0_0_18px_rgba(57,255,136,0.18)] flex items-center gap-3">
              <span className="font-pixel text-[10px] sm:text-xs text-[#39FF88]">
                1. SEMESTR — 10 % XP
              </span>
              <div className="w-24 h-3 rounded bg-[#05070D] border border-[#39FF88]/50 p-0.5">
                <div
                  className="h-full bg-[#39FF88] rounded-xs shadow-[0_0_8px_#39FF88]"
                  style={{ width: '10%' }}
                />
              </div>
            </div>
          </div>

          {/* 2 Education Cards Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. FF MUNI BRNO (Active Quest) */}
            <div className="rounded-2xl bg-[#0D101D]/90 border border-[#39FF88]/50 p-6 shadow-[0_0_24px_rgba(57,255,136,0.1)] flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#39FF88]/15 border border-[#39FF88]/50 flex items-center justify-center text-[#39FF88] shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-pixel text-[8px] text-[#39FF88] block">
                        1. ROČNÍK · 1. SEMESTR (PROBÍHÁ)
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-[#E9E6D8] mt-1">
                        Informační studia a knihovnictví
                      </h3>
                      <p className="text-xs sm:text-sm text-[#38BDF8] font-medium">
                        Filozofická fakulta Masarykovy univerzity (FF MUNI Brno)
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#E9E6D8]/90 leading-relaxed">
                  Vysokoškolské studium na FF MUNI v Brně (1. ročník, 1. semestr) zaměřené na
                  informační vědu, informační architekturu, organizaci znalostí, práci s daty a
                  moderní knihovnictví.
                </p>

                {/* Progress Bar inside MUNI card */}
                <div className="mt-5 p-3.5 rounded-xl bg-[#05070D] border border-[#39FF88]/30">
                  <div className="flex items-center justify-between font-pixel text-[9px] mb-2">
                    <span className="text-[#E9E6D8]">PROGRESS STUDIA (1. ROČNÍK / 1. SEMESTR)</span>
                    <span className="text-[#39FF88]">10 %</span>
                  </div>
                  <div className="w-full h-2.5 rounded bg-[#14111F] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#38BDF8] to-[#39FF88] shadow-[0_0_10px_#39FF88]"
                      style={{ width: '10%' }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs text-[#8B93A7]">
                <span className="font-semibold text-[#E9E6D8]">Dovednosti:</span>
                <span className="px-2 py-0.5 rounded bg-[#14111F] border border-slate-800 text-[#E9E6D8]">
                  Informační věda
                </span>
                <span className="px-2 py-0.5 rounded bg-[#14111F] border border-slate-800 text-[#E9E6D8]">
                  Organizace dat
                </span>
                <span className="px-2 py-0.5 rounded bg-[#14111F] border border-slate-800 text-[#E9E6D8]">
                  FF MUNI Brno
                </span>
              </div>
            </div>

            {/* 2. Střední škola KIS (Completed Quest) */}
            <div className="rounded-2xl bg-[#0D101D]/90 border border-[#38BDF8]/40 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#38BDF8]/15 border border-[#38BDF8]/50 flex items-center justify-center text-[#38BDF8] shrink-0">
                      <Library className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-pixel text-[8px] text-[#38BDF8] block">
                        2021–2025 · QUEST COMPLETED
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-[#E9E6D8] mt-1">
                        Knihovnické a informační služby
                      </h3>
                      <p className="text-xs sm:text-sm text-[#8B93A7]">
                        Středoškolské odborné vzdělání v oboru
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#E9E6D8]/90 leading-relaxed">
                  Čtyřleté studium oboru Knihovnické a informační služby: katalogizace, správa
                  knihovního fondu, bibliografie, rešerše a informační systémy.
                </p>

                <div className="mt-5 p-3.5 rounded-xl bg-[#05070D] border border-[#38BDF8]/25">
                  <div className="flex items-center justify-between font-pixel text-[9px] mb-2">
                    <span className="text-[#8B93A7]">STŘEDNÍ ŠKOLA</span>
                    <span className="text-[#38BDF8]">100 % DOKONČENO</span>
                  </div>
                  <div className="w-full h-2.5 rounded bg-[#14111F] overflow-hidden">
                    <div className="h-full w-full bg-[#38BDF8]" />
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs text-[#8B93A7]">
                <span className="font-semibold text-[#E9E6D8]">Základy:</span>
                <span className="px-2 py-0.5 rounded bg-[#14111F] border border-slate-800 text-[#E9E6D8]">
                  Katalogizace
                </span>
                <span className="px-2 py-0.5 rounded bg-[#14111F] border border-slate-800 text-[#E9E6D8]">
                  Knihovnictví
                </span>
                <span className="px-2 py-0.5 rounded bg-[#14111F] border border-slate-800 text-[#E9E6D8]">
                  Informační služby
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          STAGE 03 // PRÁCE [KLÁVESA C] + MINIHRA VÝKUPU RESTORIO
         ===================================================================== */}
      <section id="prace" className="py-14 sm:py-16 bg-transparent relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-5 border-b border-[#A855F7]/25">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#A855F7]/15 border border-[#A855F7]/50 text-[#D8B4FE] font-pixel text-[9px] mb-3 shadow-[0_0_12px_rgba(168,85,247,0.2)]">
                <Briefcase className="w-3.5 h-3.5" />
                <span>STAGE 03 // PRÁCE [KLÁVESA C]</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E9E6D8] tracking-tight">
                Zaměstnání — Výkupař v Restorio.cz
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <StorioMascot size="sm" showLabel={true} />
              <a
                href="https://www.restorio.cz/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#39FF88] bg-[#39FF88]/10 hover:bg-[#39FF88]/20 border border-[#39FF88]/50 rounded-xl transition-colors"
              >
                <span>Restorio.cz</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Guild Service Card: Artifact Evaluation Metaphor */}
          <div className="rounded-2xl bg-[#0D101D]/90 border border-[#A855F7]/50 p-6 sm:p-7 shadow-[0_0_28px_rgba(168,85,247,0.12)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-6">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 font-pixel text-[9px] text-[#FFE93B] bg-[#FFE93B]/10 border border-[#FFE93B]/40 px-2.5 py-1 rounded">
                  ZAMĚSTNÁNÍ: VÝKUPAŘ V ONLINE ANTIKVARIÁTU RESTORIO.CZ
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#E9E6D8]">
                  Posuzování stavu přicházejících knih:{' '}
                  <span className="text-[#39FF88]">PŘIJATO</span> vs.{' '}
                  <span className="text-rose-400">VRÁCENO</span>
                </h3>
                <p className="text-sm text-[#E9E6D8]/90 leading-relaxed">
                  V online antikvariátu <strong className="text-white">Restorio.cz</strong> mám na
                  starosti kontrolu fyzického stavu přicházejících knih a jejich zařazení do toku.
                  Výkupní cena je daná systémem — mým úkolem je ověřit, zda kniha nemá vady (polití,
                  plíseň, potrhání, počmárání, chybějící listy či chybějící ISBN), dotisknout
                  chybějící EAN čárové kódy a rozhodnout verdikt:{' '}
                  <strong className="text-[#39FF88]">PŘIJATO</strong> k dalšímu prodeji, nebo{' '}
                  <strong className="text-rose-400">VRÁCENO</strong>.
                </p>
              </div>

              {/* Verdict Metaphor Box */}
              <div className="lg:col-span-4 grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-[#05070D] border-2 border-[#39FF88]/60 text-center shadow-[0_0_16px_rgba(57,255,136,0.15)]">
                  <span className="font-pixel text-[10px] text-[#39FF88] block">🟢 PŘIJATO</span>
                  <span className="text-[11px] text-[#E9E6D8]/80 mt-2 block leading-snug">
                    Knihy v pořádku, čisté a připravené k naskladnění
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-[#05070D] border-2 border-rose-500/60 text-center shadow-[0_0_16px_rgba(244,63,94,0.15)]">
                  <span className="font-pixel text-[10px] text-rose-400 block">🔴 VRÁCENO</span>
                  <span className="text-[11px] text-[#E9E6D8]/80 mt-2 block leading-snug">
                    Polité, plesnivé, potrhané nebo bez ISBN
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Key Guild Duties */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4 border-t border-slate-800/80">
              <div className="p-3.5 rounded-xl bg-[#05070D] border border-[#39FF88]/30">
                <div className="flex items-center gap-2 text-xs font-bold text-[#39FF88] mb-1.5">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Kontrola stavu</span>
                </div>
                <p className="text-xs text-[#8B93A7] leading-relaxed">
                  Rychlá diagnostika vad: čistota, vazba, plíseň, polití a platné ISBN.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#05070D] border border-[#38BDF8]/30">
                <div className="flex items-center gap-2 text-xs font-bold text-[#38BDF8] mb-1.5">
                  <Barcode className="w-4 h-4 shrink-0" />
                  <span>Dotisk EAN kódů</span>
                </div>
                <p className="text-xs text-[#8B93A7] leading-relaxed">
                  Tisk a lepení čárových kódů knihám, kterým štítek chybí nebo je nečitelný.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#05070D] border border-[#FFE93B]/30">
                <div className="flex items-center gap-2 text-xs font-bold text-[#FFE93B] mb-1.5">
                  <Package className="w-4 h-4 shrink-0" />
                  <span>Prázdné bedny</span>
                </div>
                <p className="text-xs text-[#8B93A7] leading-relaxed">
                  Zpracování prázdných beden — speciální typ objednávek v logistickém toku.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#05070D] border border-[#A855F7]/30">
                <div className="flex items-center gap-2 text-xs font-bold text-[#D8B4FE] mb-1.5">
                  <Layers className="w-4 h-4 shrink-0" />
                  <span>Třídění do toku</span>
                </div>
                <p className="text-xs text-[#8B93A7] leading-relaxed">
                  Okamžité posouzení každé knihy: vyhovující naskladnit, vadné vyřadit.
                </p>
              </div>
            </div>
          </div>

          {/* =================================================================
              Z POHLEDU ZÁKAZNÍKA — 3 VIDEA
             ================================================================= */}
          <div className="mt-8 rounded-2xl bg-[#0D101D]/90 border border-[#38BDF8]/50 p-6 sm:p-7 shadow-[0_0_28px_rgba(56,189,248,0.12)]">
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#38BDF8]/15 border border-[#38BDF8]/50 text-[#38BDF8] font-pixel text-[9px] mb-3">
                <Video className="w-3.5 h-3.5" />
                <span>VIDEA</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#E9E6D8]">Z pohledu zákazníka</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Návod a doprava', src: `${import.meta.env.BASE_URL}videos/navod-a-doprava.mp4` },
                { title: 'Dokončení objednávky', src: `${import.meta.env.BASE_URL}videos/dokonceni-objednavky.mp4` },
                { title: 'Zákaznický účet', src: `${import.meta.env.BASE_URL}videos/zakaznicky-ucet.mp4` }
              ].map((video) => (
                <div
                  key={video.src}
                  className="rounded-xl bg-[#05070D] border border-[#38BDF8]/30 overflow-hidden flex flex-col"
                >
                  <video
                    src={video.src}
                    controls
                    preload="metadata"
                    playsInline
                    className="w-full aspect-video bg-black"
                    aria-label={video.title}
                  />
                  <div className="px-3.5 py-3 border-t border-[#38BDF8]/20">
                    <span className="text-sm font-semibold text-[#E9E6D8]">{video.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =================================================================
              MINIHRA VÝKUPU PŘÍMO U PRÁCE (CARTRIDGE #01: VRÁCENO, NEBO PŘIJATO?)
             ================================================================= */}
          <div className="mt-8 rounded-2xl bg-[#0D101D] border-2 border-[#39FF88]/60 shadow-[0_0_30px_rgba(57,255,136,0.14)] overflow-hidden">
            {/* Cartridge Top Strip */}
            <div className="bg-gradient-to-r from-[#0F291E] via-[#14111F] to-[#0F291E] px-4 py-3 sm:px-6 border-b border-[#39FF88]/40 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="font-pixel text-[9px] px-2.5 py-1 rounded bg-[#39FF88]/20 border border-[#39FF88] text-[#39FF88]">
                  PRACOVNÍ MINIHRA
                </span>
                <h3 className="font-pixel text-xs sm:text-sm text-[#E9E6D8]">
                  VRÁCENO, NEBO PŘIJATO? (RESTORIO VÝKUP)
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {isSortingGameStarted ? (
                  <button
                    type="button"
                    onClick={() => setIsSortingGameStarted(false)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#14111F] hover:bg-slate-800 border border-slate-700 text-xs text-[#8B93A7] hover:text-[#E9E6D8] cursor-pointer"
                  >
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>Schovat cartridge</span>
                  </button>
                ) : (
                  <span className="font-pixel text-[8px] text-[#FFE93B] animate-arcade-blink">
                    INSERT COIN TO PLAY
                  </span>
                )}
              </div>
            </div>

            {!isSortingGameStarted ? (
              <div className="p-6 sm:p-8 text-center bg-gradient-to-b from-[#0A0F18] to-[#05070D] flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-[#39FF88]/15 border-2 border-[#39FF88] flex items-center justify-center text-[#39FF88] mb-3 shadow-[0_0_24px_rgba(57,255,136,0.3)]">
                  <Coins className="w-7 h-7" />
                </div>

                <h4 className="text-lg sm:text-xl font-extrabold text-[#E9E6D8] mb-2">
                  Vyzkoušej si mou práci výkupaře v praxi!
                </h4>
                <p className="text-xs sm:text-sm text-[#8B93A7] max-w-xl mb-5 leading-relaxed">
                  Prohlédni si záznam o stavu knihy na stole a rozhodni, zda knihu vezmeme do
                  výkupu (<strong className="text-[#39FF88]">PŘIJATO</strong>), nebo ji musíme
                  odmítnout (<strong className="text-rose-400">VRÁCENO</strong>).
                </p>

                <button
                  type="button"
                  onClick={handleStartSorting}
                  aria-label="Vhodit minci a spustit hru Vráceno, nebo přijato?"
                  className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[#39FF88]/20 hover:bg-[#39FF88]/30 border-2 border-[#39FF88] text-[#39FF88] font-pixel text-xs sm:text-sm shadow-[0_0_25px_rgba(57,255,136,0.4)] hover:shadow-[0_0_35px_rgba(57,255,136,0.65)] active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>INSERT COIN — SPUSTIT HRU VÝKUPU</span>
                </button>
              </div>
            ) : (
              <div className="p-3 sm:p-5 bg-[#05070D]">
                <RestorioSortingGame />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
