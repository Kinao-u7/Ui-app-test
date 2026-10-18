import React, { useState } from 'react';
import {
  ArrowLeft,
  Moon,
  Sun,
  Type,
  BookOpen,
  Download,
  Trash2,
  Check,
  Headphones,
  Palette,
  Volume2,
  Play,
  Square,
  Sparkles,
  Sliders,
  Flame,
  CloudRain,
  Waves,
  ShieldCheck,
  HardDrive,
  FileText,
  Clock,
  Compass
} from 'lucide-react';

interface ScreenSettingsProps {
  onBack?: () => void;
  isDark: boolean;
  onToggleDarkMode: () => void;
}

export const ScreenSettings: React.FC<ScreenSettingsProps> = ({
  onBack,
  isDark,
  onToggleDarkMode,
}) => {
  // Navigation inside hub
  const [activeSection, setActiveSection] = useState<'all' | 'appearance' | 'reader' | 'download' | 'tts'>('all');

  // Appearance State
  const [highContrast, setHighContrast] = useState(false);
  const [paperTexture, setPaperTexture] = useState(true);
  const [accentColor, setAccentColor] = useState<'amber' | 'sage' | 'ink'>('amber');

  // Reader Typography State
  const [defaultFont, setDefaultFont] = useState<'serif' | 'display' | 'sans' | 'mono'>('serif');
  const [fontSize, setFontSize] = useState<number>(17);
  const [lineSpacing, setLineSpacing] = useState<'relaxed' | 'normal' | 'loose'>('relaxed');
  const [pageTurnStyle, setPageTurnStyle] = useState<'paginated' | 'scroll'>('paginated');
  const [keepAwake, setKeepAwake] = useState(true);
  const [autoBookmark, setAutoBookmark] = useState(true);

  // Download & Storage State
  const [autoDownloadWifi, setAutoDownloadWifi] = useState(true);
  const [offlinePrecache, setOfflinePrecache] = useState(true);
  const [cacheCleared, setCacheCleared] = useState(false);
  const [notesExported, setNotesExported] = useState(false);

  // TTS (Text-to-Speech) State
  const [ttsVoice, setTtsVoice] = useState<'clara' | 'erik' | 'kenji' | 'system'>('clara');
  const [ttsSpeed, setTtsSpeed] = useState<number>(1.0);
  const [ttsPitch, setTtsPitch] = useState<'warm' | 'balanced' | 'crisp'>('warm');
  const [ambientSound, setAmbientSound] = useState<'none' | 'rain' | 'fire' | 'ocean'>('rain');
  const [autoAdvanceChapter, setAutoAdvanceChapter] = useState(true);
  const [isPlayingTTSPreview, setIsPlayingTTSPreview] = useState(false);

  // Reading Goal
  const [readingGoal, setReadingGoal] = useState<number>(25);

  const handleClearCache = () => {
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 2500);
  };

  const handleExportNotes = () => {
    const sampleData = "# Folio Literary Marginalia\n\n- 'The shoreline does not end; it merely yields to the swell.' — Elena Vance\n- 'To remember everything is a curse of machines.' — Kaito Tanaka\n";
    const blob = new Blob([sampleData], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'folio_reading_marginalia.md';
    a.click();
    URL.revokeObjectURL(url);
    setNotesExported(true);
    setTimeout(() => setNotesExported(false), 2500);
  };

  const handleToggleTTSPreview = () => {
    if (isPlayingTTSPreview) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingTTSPreview(false);
      return;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        'Perched upon the salt-scoured cliffs, she discovered a sequence of unsent letters hidden within the foundational mortar.'
      );
      utterance.rate = ttsSpeed;
      utterance.pitch = ttsPitch === 'warm' ? 0.9 : ttsPitch === 'crisp' ? 1.15 : 1.0;
      utterance.onend = () => setIsPlayingTTSPreview(false);
      utterance.onerror = () => setIsPlayingTTSPreview(false);
      setIsPlayingTTSPreview(true);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlayingTTSPreview(true);
      setTimeout(() => setIsPlayingTTSPreview(false), 3000);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className={`flex-1 flex flex-col transition-colors duration-200 overflow-y-auto pb-12 ${
        isDark ? 'bg-[#000000] text-stone-100' : 'bg-[#FAF8F5] text-stone-900'
      }`}
    >
      {/* Top Header with Preferences Title */}
      <header
        className={`px-4 py-3 border-b sticky top-0 backdrop-blur-md z-10 flex items-center justify-between ${
          isDark
            ? 'bg-[#000000]/90 border-neutral-900 text-stone-100'
            : 'bg-[#FAF8F5]/90 border-stone-200/70 text-stone-900'
        }`}
      >
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label="Back"
              className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full transition-colors ${
                isDark ? 'hover:bg-stone-800 text-stone-300' : 'hover:bg-stone-200/60 text-stone-700'
              }`}
            >
              <ArrowLeft className="w-4 h-4 stroke-[2]" />
            </button>
          )}
          <div>
            <span
              className={`text-[10px] font-mono uppercase tracking-widest block ${
                isDark ? 'text-amber-400' : 'text-stone-400'
              }`}
            >
              Atelier Hub
            </span>
            <h1 className="text-xl font-serif font-semibold tracking-tight">
              Preferences
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleDarkMode}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className={`min-h-[36px] px-3 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors border ${
            isDark
              ? 'bg-stone-900 border-stone-800 text-amber-400 hover:bg-stone-800'
              : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
          }`}
        >
          {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          <span>{isDark ? 'Dark' : 'Light'}</span>
        </button>
      </header>

      <div className="px-4 py-4 space-y-6 max-w-lg mx-auto w-full">
        {/* Hub Overview Banner */}
        <section
          className={`border rounded-2xl p-4 transition-all shadow-sm ${
            isDark
              ? 'bg-gradient-to-br from-[#1C1C22] to-[#141418] border-stone-800'
              : 'bg-gradient-to-br from-white to-[#F6F2EA] border-stone-200/90'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? 'text-amber-400' : 'text-amber-800'}`}>
              Settings & Customization Hub
            </span>
            <span className={`text-[10px] font-mono ${isDark ? 'text-stone-400' : 'text-stone-400'}`}>
              4 Hub Categories
            </span>
          </div>

          <p className={`text-xs leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
            Fine-tune sensory reading parameters, typography geometry, offline monograph cache, and ambient text-to-speech narration.
          </p>

          {/* Hub Quick Jump Grid */}
          <div className="grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-current/10">
            <button
              type="button"
              onClick={() => scrollToSection('sec-appearance')}
              className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 group ${
                isDark ? 'bg-stone-900/60 border-stone-800 hover:border-amber-400/50' : 'bg-white/80 border-stone-200 hover:border-stone-400'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isDark ? 'bg-amber-400/10 text-amber-400' : 'bg-stone-100 text-stone-800'}`}>
                <Palette className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold block truncate">Appearance</span>
                <span className={`text-[10px] block truncate ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  {isDark ? 'Obsidian Night' : 'Alabaster Paper'}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('sec-reader')}
              className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 group ${
                isDark ? 'bg-stone-900/60 border-stone-800 hover:border-amber-400/50' : 'bg-white/80 border-stone-200 hover:border-stone-400'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isDark ? 'bg-amber-400/10 text-amber-400' : 'bg-stone-100 text-stone-800'}`}>
                <Type className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold block truncate">Reader</span>
                <span className={`text-[10px] block truncate ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Newsreader · {fontSize}pt
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('sec-download')}
              className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 group ${
                isDark ? 'bg-stone-900/60 border-stone-800 hover:border-amber-400/50' : 'bg-white/80 border-stone-200 hover:border-stone-400'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isDark ? 'bg-amber-400/10 text-amber-400' : 'bg-stone-100 text-stone-800'}`}>
                <Download className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold block truncate">Download</span>
                <span className={`text-[10px] block truncate ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  142 MB Cached
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('sec-tts')}
              className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 group ${
                isDark ? 'bg-stone-900/60 border-stone-800 hover:border-amber-400/50' : 'bg-white/80 border-stone-200 hover:border-stone-400'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isDark ? 'bg-amber-400/10 text-amber-400' : 'bg-stone-100 text-stone-800'}`}>
                <Headphones className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold block truncate">TTS & Audio</span>
                <span className={`text-[10px] block truncate ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Clara · {ttsSpeed}x Speed
                </span>
              </div>
            </button>
          </div>
        </section>

        {/* ============================================================ */}
        {/* HUB SECTION 1: APPEARANCE */}
        {/* ============================================================ */}
        <section id="sec-appearance" className="pt-2">
          <div className="flex items-center gap-2 mb-2.5">
            <Palette className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-800'}`} />
            <h2 className="text-sm font-serif font-semibold">Appearance & Atmosphere</h2>
          </div>

          <div
            className={`rounded-2xl border divide-y overflow-hidden shadow-2xs ${
              isDark ? 'bg-[#18181C] border-stone-800 divide-stone-800/80' : 'bg-white border-stone-200/90 divide-stone-100'
            }`}
          >
            {/* Visual Scheme Selector */}
            <div className="p-3.5">
              <span className="text-xs font-medium block mb-2">Display Theme</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    if (isDark) onToggleDarkMode();
                  }}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-20 ${
                    !isDark
                      ? 'border-stone-900 bg-[#FAF8F5] text-stone-900 ring-2 ring-stone-900 shadow-xs'
                      : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-serif font-medium">Alabaster Paper</span>
                    {!isDark && <Check className="w-3.5 h-3.5 text-stone-900" />}
                  </div>
                  <span className="text-[10px] opacity-70">Daylight warm tactile linen</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!isDark) onToggleDarkMode();
                  }}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-20 ${
                    isDark
                      ? 'border-amber-400 bg-[#121214] text-stone-100 ring-2 ring-amber-400/80 shadow-xs'
                      : 'border-stone-200 bg-stone-100 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-serif font-medium">Obsidian OLED</span>
                    {isDark && <Check className="w-3.5 h-3.5 text-amber-400" />}
                  </div>
                  <span className="text-[10px] opacity-70">Low glare e-ink nocturnal paper</span>
                </button>
              </div>
            </div>

            {/* High Contrast Paper Mode */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium block">High Contrast Monochrome</span>
                <span className={`text-[11px] block mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Maximizes black and white contrast under direct sunlight
                </span>
              </div>
              <button
                type="button"
                onClick={() => setHighContrast(!highContrast)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  highContrast ? (isDark ? 'bg-amber-400' : 'bg-stone-900') : (isDark ? 'bg-stone-800' : 'bg-stone-300')
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    highContrast ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Tactile Paper Texture Sheen */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium block">Tactile Paper Sheen</span>
                <span className={`text-[11px] block mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Subtle book-cloth texture gradient across reading chambers
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPaperTexture(!paperTexture)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  paperTexture ? (isDark ? 'bg-amber-400' : 'bg-stone-900') : (isDark ? 'bg-stone-800' : 'bg-stone-300')
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    paperTexture ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* HUB SECTION 2: READER CHAMBER */}
        {/* ============================================================ */}
        <section id="sec-reader" className="pt-2">
          <div className="flex items-center gap-2 mb-2.5">
            <BookOpen className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-800'}`} />
            <h2 className="text-sm font-serif font-semibold">Reader Typography & Flow</h2>
          </div>

          <div
            className={`rounded-2xl border divide-y overflow-hidden shadow-2xs ${
              isDark ? 'bg-[#18181C] border-stone-800 divide-stone-800/80' : 'bg-white border-stone-200/90 divide-stone-100'
            }`}
          >
            {/* Font Family Selection */}
            <div className="p-3.5">
              <span className="text-xs font-medium block mb-2">Default Reading Font</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'serif', label: 'Newsreader Serif', font: 'font-serif' },
                  { id: 'display', label: 'Playfair Display', font: 'font-display' },
                  { id: 'sans', label: 'Plus Jakarta Sans', font: 'font-sans' },
                  { id: 'mono', label: 'JetBrains Mono', font: 'font-mono' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setDefaultFont(f.id as any)}
                    className={`min-h-[40px] px-3 rounded-lg border text-left transition-colors flex items-center justify-between ${f.font} ${
                      defaultFont === f.id
                        ? isDark
                          ? 'border-amber-400/80 bg-stone-800 text-amber-300 font-semibold'
                          : 'border-stone-900 bg-stone-100 text-stone-900 font-semibold'
                        : isDark
                        ? 'border-stone-800 hover:border-stone-700 text-stone-300'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <span>{f.label}</span>
                    {defaultFont === f.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Base Font Size Slider */}
            <div className="p-3.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium">Base Reading Size</span>
                <span className="text-xs font-mono tabular-nums">{fontSize} pt</span>
              </div>
              <input
                type="range"
                min="14"
                max="24"
                step="1"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <p
                style={{ fontSize: `${fontSize}px` }}
                className={`font-serif italic mt-2.5 p-2 rounded-lg border leading-snug transition-all ${
                  isDark ? 'bg-stone-900/60 border-stone-800 text-stone-200' : 'bg-stone-50 border-stone-200 text-stone-800'
                }`}
              >
                “The shoreline does not end; it merely yields to the swell.”
              </p>
            </div>

            {/* Line Spacing */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium block">Line Spacing Leading</span>
                <span className={`text-[11px] block mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Optically balanced reading rhythm
                </span>
              </div>
              <div className={`p-0.5 rounded-lg border flex gap-1 ${isDark ? 'bg-stone-900 border-stone-800' : 'bg-stone-100 border-stone-200'}`}>
                {(['normal', 'relaxed', 'loose'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setLineSpacing(s)}
                    className={`min-h-[30px] px-2.5 rounded-md text-[11px] font-medium capitalize transition-colors ${
                      lineSpacing === s
                        ? isDark
                          ? 'bg-stone-800 text-amber-400 shadow-xs'
                          : 'bg-white text-stone-900 shadow-xs'
                        : isDark
                        ? 'text-stone-400'
                        : 'text-stone-500'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Page Turning Style */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium block">Reading Flow</span>
                <span className={`text-[11px] block mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  {pageTurnStyle === 'paginated' ? 'E-Ink Paginated Turn' : 'Continuous Scroll'}
                </span>
              </div>
              <div className={`p-0.5 rounded-lg border flex gap-1 ${isDark ? 'bg-stone-900 border-stone-800' : 'bg-stone-100 border-stone-200'}`}>
                <button
                  type="button"
                  onClick={() => setPageTurnStyle('paginated')}
                  className={`min-h-[30px] px-2.5 rounded-md text-[11px] font-medium transition-colors ${
                    pageTurnStyle === 'paginated'
                      ? isDark
                        ? 'bg-stone-800 text-amber-400 shadow-xs'
                        : 'bg-white text-stone-900 shadow-xs'
                      : isDark
                      ? 'text-stone-400'
                      : 'text-stone-500'
                  }`}
                >
                  Pages
                </button>
                <button
                  type="button"
                  onClick={() => setPageTurnStyle('scroll')}
                  className={`min-h-[30px] px-2.5 rounded-md text-[11px] font-medium transition-colors ${
                    pageTurnStyle === 'scroll'
                      ? isDark
                        ? 'bg-stone-800 text-amber-400 shadow-xs'
                        : 'bg-white text-stone-900 shadow-xs'
                      : isDark
                      ? 'text-stone-400'
                      : 'text-stone-500'
                  }`}
                >
                  Scroll
                </button>
              </div>
            </div>

            {/* Keep Awake Toggle */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium block">Keep Screen Awake</span>
                <span className={`text-[11px] block mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Prevents auto-sleep while immersed in chapters
                </span>
              </div>
              <button
                type="button"
                onClick={() => setKeepAwake(!keepAwake)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  keepAwake ? (isDark ? 'bg-amber-400' : 'bg-stone-900') : (isDark ? 'bg-stone-800' : 'bg-stone-300')
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    keepAwake ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* HUB SECTION 3: DOWNLOAD & STORAGE */}
        {/* ============================================================ */}
        <section id="sec-download" className="pt-2">
          <div className="flex items-center gap-2 mb-2.5">
            <Download className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-800'}`} />
            <h2 className="text-sm font-serif font-semibold">Download & Offline Storage</h2>
          </div>

          <div
            className={`rounded-2xl border divide-y overflow-hidden shadow-2xs ${
              isDark ? 'bg-[#18181C] border-stone-800 divide-stone-800/80' : 'bg-white border-stone-200/90 divide-stone-100'
            }`}
          >
            {/* Storage Footprint Bar */}
            <div className="p-3.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium">Offline Novel Footprint</span>
                <span className="text-xs font-mono font-semibold">
                  {cacheCleared ? '0 MB' : '142 MB (9 Volumes)'}
                </span>
              </div>

              <div className={`w-full h-2 rounded-full overflow-hidden flex ${isDark ? 'bg-stone-800' : 'bg-stone-100'}`}>
                <div className={`h-full ${isDark ? 'bg-amber-400' : 'bg-stone-900'}`} style={{ width: cacheCleared ? '0%' : '75%' }} />
                <div className="h-full bg-amber-600" style={{ width: cacheCleared ? '0%' : '15%' }} />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 mt-2">
                <span>Texts: 118 MB</span>
                <span>Audio Waveforms: 24 MB</span>
                <span>Free Device Space: 38 GB</span>
              </div>
            </div>

            {/* Auto-download over Wi-Fi */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium block">Auto-Download Over Wi-Fi</span>
                <span className={`text-[11px] block mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Automatically precaches unread chapters when connected
                </span>
              </div>
              <button
                type="button"
                onClick={() => setAutoDownloadWifi(!autoDownloadWifi)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  autoDownloadWifi ? (isDark ? 'bg-amber-400' : 'bg-stone-900') : (isDark ? 'bg-stone-800' : 'bg-stone-300')
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    autoDownloadWifi ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Purge Cache Button */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium block">Purge Offline Media Cache</span>
                <span className={`text-[11px] block mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  {cacheCleared ? 'Cache purged cleanly.' : 'Frees 142 MB of local device storage'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleClearCache}
                className={`min-h-[36px] px-3 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border ${
                  cacheCleared
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : isDark
                    ? 'border-stone-700 text-stone-400 hover:text-red-400 hover:border-red-900/50'
                    : 'border-stone-300 text-stone-600 hover:text-red-600 hover:border-red-300'
                }`}
              >
                {cacheCleared ? <Check className="w-3.5 h-3.5" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>{cacheCleared ? 'Purged' : 'Clear Cache'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* HUB SECTION 4: TTS (TEXT-TO-SPEECH) & AUDIO */}
        {/* ============================================================ */}
        <section id="sec-tts" className="pt-2">
          <div className="flex items-center gap-2 mb-2.5">
            <Headphones className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-800'}`} />
            <h2 className="text-sm font-serif font-semibold">TTS (Text-to-Speech) & Narration</h2>
          </div>

          <div
            className={`rounded-2xl border divide-y overflow-hidden shadow-2xs ${
              isDark ? 'bg-[#18181C] border-stone-800 divide-stone-800/80' : 'bg-white border-stone-200/90 divide-stone-100'
            }`}
          >
            {/* TTS Voice Selection */}
            <div className="p-3.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium">Narration Voice Model</span>
                <button
                  type="button"
                  onClick={handleToggleTTSPreview}
                  className={`min-h-[30px] px-2.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                    isPlayingTTSPreview
                      ? 'bg-amber-500 text-stone-950 font-semibold'
                      : isDark
                      ? 'bg-stone-800 text-amber-400 hover:bg-stone-700'
                      : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                  }`}
                >
                  {isPlayingTTSPreview ? <Square className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                  <span>{isPlayingTTSPreview ? 'Stop Sample' : 'Test TTS Voice'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'clara', name: 'Clara Vance', desc: 'Studio English · Calm & Serene' },
                  { id: 'erik', name: 'Erik Lindqvist', desc: 'Nordic Deep · Measured' },
                  { id: 'kenji', name: 'Kenji Mori', desc: 'Tokyo Neo-Noir · Soft' },
                  { id: 'system', name: 'System Speech', desc: 'Native OS Neural Synthesizer' },
                ].map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setTtsVoice(v.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition-colors flex flex-col justify-between ${
                      ttsVoice === v.id
                        ? isDark
                          ? 'border-amber-400/80 bg-stone-800 text-amber-300 font-semibold shadow-2xs'
                          : 'border-stone-900 bg-stone-100 text-stone-900 font-semibold shadow-2xs'
                        : isDark
                        ? 'border-stone-800 hover:border-stone-700 text-stone-300'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium text-xs">{v.name}</span>
                      {ttsVoice === v.id && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-[10px] opacity-70 mt-1">{v.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reading Speed */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium block">Narration Speed</span>
                <span className={`text-[11px] block mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Natural cadence tuning
                </span>
              </div>
              <div className={`p-0.5 rounded-lg border flex gap-1 ${isDark ? 'bg-stone-900 border-stone-800' : 'bg-stone-100 border-stone-200'}`}>
                {[0.8, 1.0, 1.25, 1.5].map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setTtsSpeed(spd)}
                    className={`min-h-[30px] px-2 rounded-md text-[11px] font-mono transition-colors ${
                      ttsSpeed === spd
                        ? isDark
                          ? 'bg-stone-800 text-amber-400 font-semibold shadow-xs'
                          : 'bg-white text-stone-900 font-semibold shadow-xs'
                        : isDark
                        ? 'text-stone-400'
                        : 'text-stone-500'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Pitch */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium block">Vocal Tone & Timbre</span>
                <span className={`text-[11px] block mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Acoustic depth of speech synthesis
                </span>
              </div>
              <div className={`p-0.5 rounded-lg border flex gap-1 ${isDark ? 'bg-stone-900 border-stone-800' : 'bg-stone-100 border-stone-200'}`}>
                {(['warm', 'balanced', 'crisp'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setTtsPitch(p)}
                    className={`min-h-[30px] px-2.5 rounded-md text-[11px] capitalize transition-colors ${
                      ttsPitch === p
                        ? isDark
                          ? 'bg-stone-800 text-amber-400 font-semibold shadow-xs'
                          : 'bg-white text-stone-900 font-semibold shadow-xs'
                        : isDark
                        ? 'text-stone-400'
                        : 'text-stone-500'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Ambient Sound Pairing */}
            <div className="p-3.5">
              <span className="text-xs font-medium block mb-2">Ambient Background Soundscape</span>
              <div className="grid grid-cols-4 gap-1.5 text-xs text-center">
                {[
                  { id: 'rain', label: 'Rain', icon: CloudRain },
                  { id: 'ocean', label: 'Tides', icon: Waves },
                  { id: 'fire', label: 'Hearth', icon: Flame },
                  { id: 'none', label: 'Mute', icon: Volume2 },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setAmbientSound(s.id as any)}
                      className={`min-h-[44px] p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        ambientSound === s.id
                          ? isDark
                            ? 'border-amber-400 bg-stone-800 text-amber-300 font-semibold shadow-xs'
                            : 'border-stone-900 bg-stone-100 text-stone-900 font-semibold shadow-xs'
                          : isDark
                          ? 'border-stone-800 text-stone-400 hover:text-stone-200'
                          : 'border-stone-200 text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="text-[10px]">{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Auto Advance Chapter */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium block">Continuous Narration</span>
                <span className={`text-[11px] block mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Automatically start next chapter when reading completes
                </span>
              </div>
              <button
                type="button"
                onClick={() => setAutoAdvanceChapter(!autoAdvanceChapter)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  autoAdvanceChapter ? (isDark ? 'bg-amber-400' : 'bg-stone-900') : (isDark ? 'bg-stone-800' : 'bg-stone-300')
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    autoAdvanceChapter ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* HUB SECTION 5: DATA & MARGINALIA */}
        {/* ============================================================ */}
        <section className="pt-2">
          <div className="flex items-center gap-2 mb-2.5">
            <FileText className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-800'}`} />
            <h2 className="text-sm font-serif font-semibold">Data, Marginalia & Goals</h2>
          </div>

          <div
            className={`rounded-2xl border divide-y overflow-hidden shadow-2xs ${
              isDark ? 'bg-[#18181C] border-stone-800 divide-stone-800/80' : 'bg-white border-stone-200/90 divide-stone-100'
            }`}
          >
            {/* Export Notes */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium block">Export Marginalia Ledger</span>
                <span className={`text-[11px] block mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Download highlights & annotations in Markdown format
                </span>
              </div>
              <button
                type="button"
                onClick={handleExportNotes}
                className={`min-h-[36px] px-3 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border ${
                  notesExported
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : isDark
                    ? 'bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700'
                    : 'bg-stone-100 border-stone-300 text-stone-800 hover:bg-stone-200'
                }`}
              >
                {notesExported ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                <span>{notesExported ? 'Saved' : 'Export .md'}</span>
              </button>
            </div>

            {/* 2026 Reading Milestone Target */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium block">2026 Reading Target</span>
                <span className={`text-[11px] block mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Annual curated monographs goal
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setReadingGoal((prev) => Math.max(5, prev - 5))}
                  className={`min-h-[32px] min-w-[32px] rounded-md border flex items-center justify-center font-mono ${
                    isDark ? 'border-stone-700 bg-stone-800 text-stone-200' : 'border-stone-300 bg-stone-100 text-stone-800'
                  }`}
                >
                  -
                </button>
                <span className="font-mono text-xs font-semibold tabular-nums px-1">
                  {readingGoal} Books
                </span>
                <button
                  type="button"
                  onClick={() => setReadingGoal((prev) => Math.min(100, prev + 5))}
                  className={`min-h-[32px] min-w-[32px] rounded-md border flex items-center justify-center font-mono ${
                    isDark ? 'border-stone-700 bg-stone-800 text-stone-200' : 'border-stone-300 bg-stone-100 text-stone-800'
                  }`}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* System & Engine Info */}
        <footer className="pt-4 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-serif font-semibold">
            <span className={isDark ? 'text-amber-400' : 'text-amber-800'}>FOLIO</span>
            <span className={isDark ? 'text-stone-300' : 'text-stone-700'}>· Minimalist Monograph Engine</span>
          </div>
          <p className="text-[11px] font-mono text-stone-400 mt-1">
            Build 2026.10 · Preferences Hub v2.5
          </p>
          <p className="text-[10px] text-stone-500 mt-0.5">
            Designed for tactile reading stillness and sensory typography.
          </p>
        </footer>
      </div>
    </div>
  );
};
