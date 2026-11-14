import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, Coins } from 'lucide-react';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { EducationWork } from './components/EducationWork';
import { Hobbies } from './components/Hobbies';
import { ArcadeGamesSection } from './components/ArcadeGamesSection';
import { Footer } from './components/Footer';
import { ArcadeControlPanel, ArcadeSectionId } from './components/ArcadeControlPanel';
import { PixelGiraffeSideArt } from './components/PixelGiraffeSideArt';
import { AttractModeOverlay } from './components/AttractModeOverlay';

export default function App() {
  const [credits, setCredits] = useState<number>(1);
  const [activeSection, setActiveSection] = useState<ArcadeSectionId | null>(null);
  const [isGiraffeWinking, setIsGiraffeWinking] = useState<boolean>(false);
  const [isCrtFlashing, setIsCrtFlashing] = useState<boolean>(false);
  const [isAttractMode, setIsAttractMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const winkTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const flashTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Synthesize classic 8-bit arcade coin chime (B5 -> E6)
  const playCoinSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {
      // Ignore if blocked before user gesture
    }
  }, [soundEnabled]);

  // Synthesize subtle navigation blip
  const playNavBlip = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.09);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.11);
    } catch {
      // Ignore
    }
  }, [soundEnabled]);

  // Trigger Giraffe Wink
  const triggerGiraffeWink = useCallback(() => {
    setIsGiraffeWinking(true);
    if (winkTimeoutRef.current) clearTimeout(winkTimeoutRef.current);
    winkTimeoutRef.current = setTimeout(() => {
      setIsGiraffeWinking(false);
    }, 1100);
  }, []);

  // Insert Coin handler: CREDIT +1, Giraffe winks, CRT flashes for 0.5s
  const handleInsertCoin = useCallback(() => {
    setCredits((prev) => prev + 1);
    triggerGiraffeWink();
    setIsCrtFlashing(true);
    playCoinSound();

    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    flashTimeoutRef.current = setTimeout(() => {
      setIsCrtFlashing(false);
    }, 500);
  }, [playCoinSound, triggerGiraffeWink]);

  // Navigate to section inside the CRT screen
  const handleNavigate = useCallback(
    (sectionId: ArcadeSectionId) => {
      setActiveSection(sectionId);
      playNavBlip();
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [playNavBlip]
  );

  const handleBackToTop = useCallback(() => {
    setActiveSection(null);
    playNavBlip();
    const el = document.getElementById('uvod');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [playNavBlip]);

  // Keyboard shortcuts: A, B, C, D, ENTER, ESC scroll to sections
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Dismiss attract mode on any key press
      if (isAttractMode) {
        setIsAttractMode(false);
        return;
      }

      // Do not hijack typing inside inputs or textareas
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Do not hijack if modifier keys are pressed
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      const key = e.key.toLowerCase();
      if (key === 'a') {
        e.preventDefault();
        handleNavigate('o-mne');
      } else if (key === 'b') {
        e.preventDefault();
        handleNavigate('skola');
      } else if (key === 'c') {
        e.preventDefault();
        handleNavigate('prace');
      } else if (key === 'd') {
        e.preventDefault();
        handleNavigate('zajmy');
      } else if (e.key === 'Enter' && target?.tagName !== 'BUTTON' && target?.tagName !== 'A') {
        e.preventDefault();
        handleNavigate('hry');
      } else if (key === 'v') {
        e.preventDefault();
        handleNavigate('videa');
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleBackToTop();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNavigate, handleBackToTop, isAttractMode]);

  // 30-second Idle Timer for Attract Mode
  useEffect(() => {
    const resetIdleTimer = () => {
      if (isAttractMode) {
        setIsAttractMode(false);
      }
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIsAttractMode(true);
      }, 30000);
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach((ev) => window.addEventListener(ev, resetIdleTimer, { passive: true }));
    resetIdleTimer();

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, resetIdleTimer));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [isAttractMode]);

  return (
    <div className="min-h-screen bg-[#0A0A14] text-[#E9E6D8] relative overflow-x-hidden py-3 px-2 sm:py-6 sm:px-4 md:px-6 flex flex-col items-center">
      {/* =====================================================================
          AURORA GLOW BEHIND THE CABINET (Purple #A855F7 + Cyan #38BDF8 + Green #39FF88)
         ===================================================================== */}
      <div className="fixed top-10 left-1/4 -translate-x-1/2 w-[520px] h-[520px] bg-[#A855F7]/15 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed top-1/3 right-1/4 translate-x-1/3 w-[500px] h-[500px] bg-[#38BDF8]/12 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-[620px] h-[340px] bg-[#39FF88]/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* =====================================================================
          ATTRACT MODE OVERLAY (Triggers after 30s idle or via Demo button)
         ===================================================================== */}
      <AttractModeOverlay
        isOpen={isAttractMode}
        credits={credits}
        onDismiss={() => setIsAttractMode(false)}
        onInsertCoin={handleInsertCoin}
      />

      {/* =====================================================================
          PHYSICAL RETRO ARCADE CABINET CONTAINER
         ===================================================================== */}
      <div className="relative z-10 w-full max-w-[1320px] flex items-stretch justify-center">
        {/* LEFT SIDE-ART PIXEL GIRAFFE (Hidden on mobile/tablet, visible on XL) */}
        <PixelGiraffeSideArt
          side="left"
          isWinking={isGiraffeWinking}
          onWinkTrigger={handleInsertCoin}
        />

        {/* MAIN ARCADE CABINET BODY (#14111F) */}
        <div className="flex-1 max-w-6xl bg-[#14111F] border-2 sm:border-4 border-[#2A223E] rounded-3xl shadow-[0_0_90px_rgba(168,85,247,0.22),0_30px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col">
          {/* -----------------------------------------------------------------
              1. ILLUMINATED TOP MARQUEE PANEL
             ----------------------------------------------------------------- */}
          <header className="relative bg-[#14111F] p-3 sm:p-5 border-b-4 border-[#27203A]">
            {/* Backlit Marquee Sign Box */}
            <div className="animate-marquee-pulse relative rounded-2xl p-[2px] bg-gradient-to-r from-[#A855F7] via-[#38BDF8] to-[#39FF88] shadow-[0_0_30px_rgba(168,85,247,0.45)]">
              <div className="rounded-[14px] bg-gradient-to-r from-[#1A102E] via-[#0E1B2E] to-[#0D261D] px-4 py-3.5 sm:px-6 sm:py-4 flex flex-col lg:flex-row items-center justify-between gap-3">
                {/* Marquee Title */}
                <button
                  type="button"
                  onClick={handleBackToTop}
                  aria-label="Šimon Vlach — The Portfolio Game (návrat nahoru)"
                  className="text-center lg:text-left cursor-pointer group"
                >
                  <span className="font-pixel text-xs sm:text-base md:text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFE93B] via-[#38BDF8] to-[#39FF88] tracking-wider block drop-shadow-[0_2px_10px_rgba(57,255,136,0.35)]">
                    ŠIMON VLACH — THE PORTFOLIO GAME
                  </span>
                </button>

                {/* Top Cabinet Bezel Controls (Credit, Attract Demo, Sound) */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={handleInsertCoin}
                    aria-label="Vhodit minci (+1 CREDIT)"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#05070D]/90 border border-[#FFE93B]/60 text-[#FFE93B] font-pixel text-[8px] sm:text-[9px] hover:bg-[#FFE93B]/15 cursor-pointer transition-colors"
                  >
                    <Coins className="w-3.5 h-3.5 text-[#FFE93B]" />
                    <span>CREDIT: {String(credits).padStart(2, '0')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAttractMode(true)}
                    aria-label="Spustit Attract Mode ukázku"
                    title="Ukázka Attract Mode (jinak se zapne po 30 s nečinnosti)"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#05070D]/90 border border-[#A855F7]/50 text-[#D8B4FE] font-pixel text-[8px] hover:bg-[#A855F7]/20 cursor-pointer transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-[#A855F7]" />
                    <span>ATTRACT</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    aria-label={soundEnabled ? 'Vypnout zvuky automatu' : 'Zapnout zvuky automatu'}
                    className="p-1.5 rounded-lg bg-[#05070D]/90 border border-[#38BDF8]/40 text-[#38BDF8] hover:bg-[#38BDF8]/15 cursor-pointer transition-colors"
                    title={soundEnabled ? 'Zvuk automatu zapnut' : 'Zvuk automatu vypnut'}
                  >
                    {soundEnabled ? (
                      <Volume2 className="w-3.5 h-3.5" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5 opacity-60" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Sticky Quick-Jump Bar inside the Bezel */}
            <nav
              aria-label="Rychlá navigace sekcemi automatu"
              className="mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
            >
              {[
                { id: 'o-mne' as ArcadeSectionId, label: 'O MNĚ', key: 'A', color: 'hover:border-[#FFE93B] text-[#FFE93B]' },
                { id: 'skola' as ArcadeSectionId, label: 'ŠKOLA', key: 'B', color: 'hover:border-[#39FF88] text-[#39FF88]' },
                { id: 'prace' as ArcadeSectionId, label: 'PRÁCE', key: 'C', color: 'hover:border-[#A855F7] text-[#D8B4FE]' },
                { id: 'zajmy' as ArcadeSectionId, label: 'ZÁJMY', key: 'D', color: 'hover:border-[#38BDF8] text-[#38BDF8]' },
                { id: 'hry' as ArcadeSectionId, label: 'HRY ×2', key: 'ENTER', color: 'hover:border-[#39FF88] text-[#39FF88]' },
                { id: 'videa' as ArcadeSectionId, label: 'VIDEA', key: 'V', color: 'hover:border-[#A855F7] text-[#D8B4FE]' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={`px-2.5 py-1 rounded-lg bg-[#0A0A14] border border-slate-800 font-pixel text-[8px] sm:text-[9px] transition-all cursor-pointer flex items-center gap-1.5 ${
                    item.color
                  } ${activeSection === item.id ? 'border-white bg-white/10' : ''}`}
                >
                  <span>{item.label}</span>
                  <span className="text-[7px] text-[#8B93A7]">[{item.key}]</span>
                </button>
              ))}
            </nav>
          </header>

          {/* -----------------------------------------------------------------
              2. CURVED CRT MONITOR BEZEL & SCREEN (#05070D)
             ----------------------------------------------------------------- */}
          <div className="p-2 sm:p-4 md:p-6 bg-gradient-to-b from-[#0E0B16] via-[#14111F] to-[#0E0B16]">
            {/* Outer Dark Plastic CRT Bezel */}
            <div className="relative rounded-[22px] sm:rounded-[30px] p-1.5 sm:p-3 bg-[#09070F] border-2 sm:border-4 border-[#1F1A30] shadow-[inset_0_0_30px_rgba(0,0,0,0.95)]">
              {/* THE CRT SCREEN ITSELF */}
              <main
                className={`relative rounded-[18px] sm:rounded-[24px] bg-[#05070D] border border-[#38BDF8]/25 overflow-hidden crt-vignette ${
                  isCrtFlashing ? 'animate-crt-flash' : ''
                }`}
              >
                {/* Subtle CRT Scanline Overlay (pointer-events-none so all content is clickable) */}
                <div
                  className="pointer-events-none absolute inset-0 z-30 crt-scanlines"
                  aria-hidden="true"
                />

                {/* Subtle RGB Chromatic Aberration Edge Rim */}
                <div
                  className="pointer-events-none absolute inset-0 z-30 rounded-[18px] sm:rounded-[24px] shadow-[inset_2px_0_4px_rgba(255,0,80,0.12),inset_-2px_0_4px_rgba(0,230,255,0.12)]"
                  aria-hidden="true"
                />

                {/* ALL WEBSITE CONTENT LIVES INSIDE THE CRT SCREEN */}
                <div className="relative z-10">
                  {/* Top CRT Menu Grid ("SELECT SECTION" + 6 Tiles + XP Bar + Player 1 Intro) */}
                  <Hero
                    isGiraffeWinking={isGiraffeWinking}
                    onNavigate={handleNavigate}
                    onInsertCoin={handleInsertCoin}
                  />

                  {/* [A] O MNĚ */}
                  <AboutMe />

                  {/* [B] ŠKOLA & [C] PRÁCE */}
                  <EducationWork onInsertCoin={handleInsertCoin} />

                  {/* [D] ZÁJMY */}
                  <Hobbies />

                  {/* [ENTER] HRY ×2 (Cartridges with INSERT COIN) */}
                  <ArcadeGamesSection onInsertCoin={handleInsertCoin} />

                  {/* FOOTER */}
                  <Footer onBackToTop={handleBackToTop} />
                </div>
              </main>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              3. PHYSICAL CONTROL PANEL (Joystick + A/B/C/D Buttons + Coin Door)
             ----------------------------------------------------------------- */}
          <ArcadeControlPanel
            activeSection={activeSection}
            credits={credits}
            onNavigate={handleNavigate}
            onInsertCoin={handleInsertCoin}
          />
        </div>

        {/* RIGHT SIDE-ART PIXEL GIRAFFE (Hidden on mobile/tablet, visible on XL) */}
        <PixelGiraffeSideArt
          side="right"
          isWinking={isGiraffeWinking}
          onWinkTrigger={handleInsertCoin}
        />
      </div>

      {/* =====================================================================
          GLOSSY ARCADE FLOOR REFLECTION UNDER THE CABINET
         ===================================================================== */}
      <div
        aria-hidden="true"
        className="w-full max-w-5xl h-12 sm:h-16 mt-1 rounded-full bg-gradient-to-r from-[#A855F7]/20 via-[#38BDF8]/25 to-[#39FF88]/20 blur-2xl pointer-events-none opacity-75"
      />
    </div>
  );
}
