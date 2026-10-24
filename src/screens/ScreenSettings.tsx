import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
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
  Flame,
  CloudRain,
  Waves,
  FileText,
  Info
} from 'lucide-react';

interface ScreenSettingsProps {
  onBack?: () => void;
  isDark: boolean;
  onToggleDarkMode: () => void;
}

export type SettingsPageId = 'main' | 'appearance' | 'reader' | 'download' | 'tts' | 'data' | 'about';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  ariaLabel: string;
  isDark: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, ariaLabel, isDark }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={ariaLabel}
    onClick={onChange}
    className={`w-11 h-6 rounded-full inline-flex items-center shrink-0 cursor-pointer transition-colors duration-200 border relative ${
      checked
        ? isDark
          ? 'bg-amber-500 border-amber-500'
          : 'bg-stone-900 border-stone-900'
        : isDark
        ? 'bg-stone-800/80 border-stone-700/80'
        : 'bg-stone-200 border-stone-300'
    }`}
  >
    <span
      className={`w-4.5 h-4.5 rounded-full bg-white shadow-2xs transition-transform duration-200 ease-in-out transform ${
        checked ? 'translate-x-[22px]' : 'translate-x-[2px]'
      }`}
    />
  </button>
);

export const ScreenSettings: React.FC<ScreenSettingsProps> = ({
  onBack,
  isDark,
  onToggleDarkMode,
}) => {
  // Navigation stack state inside settings
  const [currentPage, setCurrentPage] = useState<SettingsPageId>('main');

  // Appearance State
  const [highContrast, setHighContrast] = useState(false);
  const [paperTexture, setPaperTexture] = useState(true);

  // Reader Typography State
  const [defaultFont, setDefaultFont] = useState<'serif' | 'display' | 'sans' | 'mono'>('serif');
  const [fontSize, setFontSize] = useState<number>(17);
  const [lineSpacing, setLineSpacing] = useState<'relaxed' | 'normal' | 'loose'>('relaxed');
  const [pageTurnStyle, setPageTurnStyle] = useState<'paginated' | 'scroll'>('paginated');
  const [keepAwake, setKeepAwake] = useState(true);

  // Download & Storage State
  const [autoDownloadWifi, setAutoDownloadWifi] = useState(true);
  const [cacheCleared, setCacheCleared] = useState(false);

  // TTS & Audio State
  const [ttsVoice, setTtsVoice] = useState<'clara' | 'erik' | 'kenji' | 'system'>('clara');
  const [ttsSpeed, setTtsSpeed] = useState<number>(1.0);
  const [ttsPitch, setTtsPitch] = useState<'warm' | 'balanced' | 'crisp'>('warm');
  const [ambientSound, setAmbientSound] = useState<'none' | 'rain' | 'fire' | 'ocean'>('rain');
  const [autoAdvanceChapter, setAutoAdvanceChapter] = useState(true);
  const [isPlayingTTSPreview, setIsPlayingTTSPreview] = useState(false);

  // Data & Goals
  const [readingGoal, setReadingGoal] = useState<number>(25);
  const [notesExported, setNotesExported] = useState(false);

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

  // Sub-page top header: Modern typographic header with clean sans typography
  const renderSubPageHeader = (title: string) => (
    <header
      className={`px-4 pt-3.5 pb-3 border-b sticky top-0 backdrop-blur-md z-20 flex items-center justify-between ${
        isDark
          ? 'bg-[#0A0A0A]/90 border-stone-800/60 text-stone-100'
          : 'bg-[#FFFFFF]/90 border-stone-200/70 text-stone-900'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => setCurrentPage('main')}
          aria-label="Back to Settings"
          className={`min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg border transition-all shadow-2xs cursor-pointer ${
            isDark
              ? 'border-stone-800 bg-stone-900/80 text-stone-300 hover:border-stone-700 hover:text-stone-100'
              : 'border-stone-300/80 bg-white/80 text-stone-700 hover:border-stone-400 hover:text-stone-900'
          }`}
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
        </button>
        <div>
          <span className="text-[10px] font-sans font-semibold uppercase tracking-wider block text-amber-600 dark:text-amber-400 leading-none mb-0.5">
            Settings
          </span>
          <h1 className={`text-base font-sans font-semibold tracking-tight ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>
            {title}
          </h1>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggleDarkMode}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className={`min-h-[34px] px-2.5 text-xs font-sans font-medium rounded-lg flex items-center gap-1.5 transition-all border shadow-2xs cursor-pointer ${
          isDark
            ? 'border-stone-800 bg-stone-900/80 text-amber-400 hover:border-stone-700'
            : 'border-stone-300/80 bg-white/80 text-stone-700 hover:border-stone-400'
        }`}
      >
        {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        <span className="text-[11.5px] font-sans font-medium">{isDark ? 'Dark' : 'Light'}</span>
      </button>
    </header>
  );

  return (
    <div
      className={`flex-1 flex flex-col transition-colors duration-200 overflow-y-auto pb-12 font-sans ${
        isDark ? 'bg-[#0A0A0A] text-stone-100' : 'bg-[#FFFFFF] text-stone-900'
      }`}
    >
      {/* ========================================================================= */}
      {/* 1. MAIN SETTINGS ROOT HUB (Navigation Menu to Individual Pages)          */}
      {/* ========================================================================= */}
      {currentPage === 'main' && (
        <>
          {/* Main Top Header matching modern editorial design */}
          <header
            className={`px-4 pt-3.5 pb-3 border-b sticky top-0 backdrop-blur-md z-20 flex items-center justify-between ${
              isDark
                ? 'bg-[#0A0A0A]/90 border-stone-800/60 text-stone-100'
                : 'bg-[#FFFFFF]/90 border-stone-200/70 text-stone-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  aria-label="Back to Library"
                  className={`min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg border transition-all shadow-2xs cursor-pointer ${
                    isDark
                      ? 'border-stone-800 bg-stone-900/80 text-stone-300 hover:border-stone-700 hover:text-stone-100'
                      : 'border-stone-300/80 bg-white/80 text-stone-700 hover:border-stone-400 hover:text-stone-900'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 stroke-[2]" />
                </button>
              )}
              <div>
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider block text-amber-600 dark:text-amber-400 leading-none mb-0.5">
                  Preferences
                </span>
                <h1 className={`text-xl font-sans font-semibold tracking-tight ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>
                  Settings
                </h1>
              </div>
            </div>

            <button
              type="button"
              onClick={onToggleDarkMode}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`min-h-[34px] px-2.5 text-xs font-sans font-medium rounded-lg flex items-center gap-1.5 transition-all border shadow-2xs cursor-pointer ${
                isDark
                  ? 'border-stone-800 bg-stone-900/80 text-amber-400 hover:border-stone-700'
                  : 'border-stone-300/80 bg-white/80 text-stone-700 hover:border-stone-400'
              }`}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span className="text-[11.5px] font-sans font-medium">{isDark ? 'Dark' : 'Light'}</span>
            </button>
          </header>

          {/* Full Screen Seamless List of Tabs with clean modern typography */}
          <div className="w-full divide-y divide-stone-200/40 dark:divide-stone-800/40">
            {/* Page 1: Appearance */}
            <div
              onClick={() => setCurrentPage('appearance')}
              className={`px-4 sm:px-5 py-3.5 flex items-center justify-between cursor-pointer transition-colors ${
                isDark ? 'hover:bg-stone-900/40' : 'hover:bg-stone-100/60'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  isDark ? 'bg-stone-900/80 border-stone-800 text-amber-400' : 'bg-stone-100 border-stone-200/80 text-stone-700'
                }`}>
                  <Palette className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className={`font-sans font-medium text-[13.5px] tracking-tight block truncate ${
                    isDark ? 'text-stone-100' : 'text-stone-950'
                  }`}>
                    Appearance & Themes
                  </span>
                  <span className={`text-[12px] font-sans font-normal block mt-0.5 truncate ${
                    isDark ? 'text-stone-400' : 'text-stone-500'
                  }`}>
                    {isDark ? 'Pure Black (#0A0A0A)' : 'Pure White (#FFFFFF)'} · Contrast & texture
                  </span>
                </div>
              </div>
              <div className="flex items-center text-stone-400/80 dark:text-stone-600 shrink-0 pl-2">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Page 2: Reader Typography */}
            <div
              onClick={() => setCurrentPage('reader')}
              className={`px-4 sm:px-5 py-3.5 flex items-center justify-between cursor-pointer transition-colors ${
                isDark ? 'hover:bg-stone-900/40' : 'hover:bg-stone-100/60'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  isDark ? 'bg-stone-900/80 border-stone-800 text-amber-400' : 'bg-stone-100 border-stone-200/80 text-stone-700'
                }`}>
                  <Type className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className={`font-sans font-medium text-[13.5px] tracking-tight block truncate ${
                    isDark ? 'text-stone-100' : 'text-stone-950'
                  }`}>
                    Reader Typography
                  </span>
                  <span className={`text-[12px] font-sans font-normal block mt-0.5 truncate ${
                    isDark ? 'text-stone-400' : 'text-stone-500'
                  }`}>
                    {defaultFont === 'serif' ? 'Newsreader' : defaultFont === 'display' ? 'Playfair' : defaultFont === 'sans' ? 'Jakarta Sans' : 'Mono'} · {fontSize}pt · {pageTurnStyle === 'paginated' ? 'Paginated' : 'Scroll'}
                  </span>
                </div>
              </div>
              <div className="flex items-center text-stone-400/80 dark:text-stone-600 shrink-0 pl-2">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Page 3: Downloads & Offline Storage */}
            <div
              onClick={() => setCurrentPage('download')}
              className={`px-4 sm:px-5 py-3.5 flex items-center justify-between cursor-pointer transition-colors ${
                isDark ? 'hover:bg-stone-900/40' : 'hover:bg-stone-100/60'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  isDark ? 'bg-stone-900/80 border-stone-800 text-amber-400' : 'bg-stone-100 border-stone-200/80 text-stone-700'
                }`}>
                  <Download className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className={`font-sans font-medium text-[13.5px] tracking-tight block truncate ${
                    isDark ? 'text-stone-100' : 'text-stone-950'
                  }`}>
                    Downloads & Storage
                  </span>
                  <span className={`text-[12px] font-sans font-normal block mt-0.5 truncate ${
                    isDark ? 'text-stone-400' : 'text-stone-500'
                  }`}>
                    {cacheCleared ? '0 MB cached' : '142 MB cached'} · Auto Wi-Fi sync
                  </span>
                </div>
              </div>
              <div className="flex items-center text-stone-400/80 dark:text-stone-600 shrink-0 pl-2">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Page 4: Audio & TTS Narration */}
            <div
              onClick={() => setCurrentPage('tts')}
              className={`px-4 sm:px-5 py-3.5 flex items-center justify-between cursor-pointer transition-colors ${
                isDark ? 'hover:bg-stone-900/40' : 'hover:bg-stone-100/60'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  isDark ? 'bg-stone-900/80 border-stone-800 text-amber-400' : 'bg-stone-100 border-stone-200/80 text-stone-700'
                }`}>
                  <Headphones className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className={`font-sans font-medium text-[13.5px] tracking-tight block truncate ${
                    isDark ? 'text-stone-100' : 'text-stone-950'
                  }`}>
                    Narration & Audio (TTS)
                  </span>
                  <span className={`text-[12px] font-sans font-normal block mt-0.5 truncate ${
                    isDark ? 'text-stone-400' : 'text-stone-500'
                  }`}>
                    Voice: {ttsVoice === 'clara' ? 'Clara Vance' : ttsVoice === 'erik' ? 'Erik Lindqvist' : ttsVoice === 'kenji' ? 'Kenji Mori' : 'System Voice'} · {ttsSpeed}x · Soundscapes
                  </span>
                </div>
              </div>
              <div className="flex items-center text-stone-400/80 dark:text-stone-600 shrink-0 pl-2">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Page 5: Data & Marginalia */}
            <div
              onClick={() => setCurrentPage('data')}
              className={`px-4 sm:px-5 py-3.5 flex items-center justify-between cursor-pointer transition-colors ${
                isDark ? 'hover:bg-stone-900/40' : 'hover:bg-stone-100/60'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  isDark ? 'bg-stone-900/80 border-stone-800 text-amber-400' : 'bg-stone-100 border-stone-200/80 text-stone-700'
                }`}>
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className={`font-sans font-medium text-[13.5px] tracking-tight block truncate ${
                    isDark ? 'text-stone-100' : 'text-stone-950'
                  }`}>
                    Data & Marginalia
                  </span>
                  <span className={`text-[12px] font-sans font-normal block mt-0.5 truncate ${
                    isDark ? 'text-stone-400' : 'text-stone-500'
                  }`}>
                    Export notes (.md) · {readingGoal} books annual target
                  </span>
                </div>
              </div>
              <div className="flex items-center text-stone-400/80 dark:text-stone-600 shrink-0 pl-2">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Page 6: About Folio Engine */}
            <div
              onClick={() => setCurrentPage('about')}
              className={`px-4 sm:px-5 py-3.5 flex items-center justify-between cursor-pointer transition-colors ${
                isDark ? 'hover:bg-stone-900/40' : 'hover:bg-stone-100/60'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  isDark ? 'bg-stone-900/80 border-stone-800 text-amber-400' : 'bg-stone-100 border-stone-200/80 text-stone-700'
                }`}>
                  <Info className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className={`font-sans font-medium text-[13.5px] tracking-tight block truncate ${
                    isDark ? 'text-stone-100' : 'text-stone-950'
                  }`}>
                    About Folio Engine
                  </span>
                  <span className={`text-[12px] font-sans font-normal block mt-0.5 truncate ${
                    isDark ? 'text-stone-400' : 'text-stone-500'
                  }`}>
                    Version 2.5 · Minimalist Editorial System
                  </span>
                </div>
              </div>
              <div className="flex items-center text-stone-400/80 dark:text-stone-600 shrink-0 pl-2">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          <footer className="py-8 text-center text-[11px] font-sans font-normal text-stone-400 dark:text-stone-500">
            Folio Minimalist Monograph System · <span className="font-mono text-[10.5px]">v2.5.0</span>
          </footer>
        </>
      )}

      {/* ========================================================================= */}
      {/* 2. DEDICATED PAGE: APPEARANCE & ATMOSPHERE                               */}
      {/* ========================================================================= */}
      {currentPage === 'appearance' && (
        <>
          {renderSubPageHeader('Appearance')}

          {/* Full Screen Layout Merging into Screen with delicate hairline dividers */}
          <div className="w-full divide-y divide-stone-200/40 dark:divide-stone-800/40">
            {/* Visual Scheme Selector */}
            <div className="px-4 sm:px-5 py-4">
              <span className={`text-[11px] font-sans font-semibold uppercase tracking-wider block mb-2.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                Display Theme
              </span>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    if (isDark) onToggleDarkMode();
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between h-24 cursor-pointer ${
                    !isDark
                      ? 'border-stone-900 bg-stone-100/80 text-stone-900 shadow-2xs ring-1 ring-stone-900/10'
                      : 'border-stone-800/80 bg-stone-900/40 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`font-sans text-[13px] font-semibold ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>Pure White</span>
                    {!isDark && <Check className="w-4 h-4 text-stone-900" />}
                  </div>
                  <span className="text-[11.5px] font-sans text-stone-500 dark:text-stone-400 leading-snug">Pure white (#FFFFFF) day reading</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!isDark) onToggleDarkMode();
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between h-24 cursor-pointer ${
                    isDark
                      ? 'border-amber-400/80 bg-stone-900 text-stone-100 shadow-2xs ring-1 ring-amber-400/20'
                      : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`font-sans text-[13px] font-semibold ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>Pure Black</span>
                    {isDark && <Check className="w-4 h-4 text-amber-400" />}
                  </div>
                  <span className="text-[11.5px] font-sans text-stone-400 leading-snug">Pure black (#0A0A0A) night contrast</span>
                </button>
              </div>
            </div>

            {/* High Contrast Paper Mode */}
            <div className="px-4 sm:px-5 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0 pr-2">
                <span className={`font-sans font-medium text-[13.5px] tracking-tight block ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>
                  High Contrast Monochrome
                </span>
                <span className={`text-[12px] font-sans font-normal block mt-0.5 leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Maximizes pure black and white contrast for outdoor daylight reading
                </span>
              </div>
              <ToggleSwitch
                checked={highContrast}
                onChange={() => setHighContrast(!highContrast)}
                ariaLabel="Toggle high contrast monochrome"
                isDark={isDark}
              />
            </div>

            {/* Tactile Paper Texture Sheen */}
            <div className="px-4 sm:px-5 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0 pr-2">
                <span className={`font-sans font-medium text-[13.5px] tracking-tight block ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>
                  Tactile Paper Texture Sheen
                </span>
                <span className={`text-[12px] font-sans font-normal block mt-0.5 leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Simulates natural fibers and subtle bookbinding grain
                </span>
              </div>
              <ToggleSwitch
                checked={paperTexture}
                onChange={() => setPaperTexture(!paperTexture)}
                ariaLabel="Toggle tactile paper texture"
                isDark={isDark}
              />
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 3. DEDICATED PAGE: READER & TYPOGRAPHY                                   */}
      {/* ========================================================================= */}
      {currentPage === 'reader' && (
        <>
          {renderSubPageHeader('Reader Typography')}

          {/* Full Screen Layout Merging into Screen with delicate hairline dividers */}
          <div className="w-full divide-y divide-stone-200/40 dark:divide-stone-800/40">
            {/* Font Family Selection */}
            <div className="px-4 sm:px-5 py-4">
              <span className={`text-[11px] font-sans font-semibold uppercase tracking-wider block mb-2.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                Default Typography Font
              </span>
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
                    className={`min-h-[42px] px-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${f.font} ${
                      defaultFont === f.id
                        ? isDark
                          ? 'border-amber-400/80 bg-stone-900 text-amber-300 ring-1 ring-amber-400/20'
                          : 'border-stone-900 bg-stone-100 text-stone-900 ring-1 ring-stone-900/10'
                        : isDark
                        ? 'border-stone-800/80 hover:border-stone-700 text-stone-300'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <span className="text-[13px] font-medium">{f.label}</span>
                    {defaultFont === f.id && <Check className="w-3.5 h-3.5 shrink-0 ml-1.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Base Font Size Slider & Live Specimen */}
            <div className="px-4 sm:px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[11px] font-sans font-semibold uppercase tracking-wider ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Base Reading Scale
                </span>
                <span className="text-xs font-mono font-medium tabular-nums px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  {fontSize} pt
                </span>
              </div>
              <input
                type="range"
                min="14"
                max="24"
                step="1"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5"
              />
              <div
                className={`mt-3.5 p-3.5 rounded-xl border transition-all ${
                  isDark ? 'bg-stone-900/50 border-stone-800/80 text-stone-200' : 'bg-stone-50/80 border-stone-200/80 text-stone-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-medium">
                    Typographic Specimen
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">
                    {defaultFont.toUpperCase()} · {fontSize}PT
                  </span>
                </div>
                <p
                  style={{ fontSize: `${fontSize}px` }}
                  className={`${defaultFont === 'serif' ? 'font-serif' : defaultFont === 'display' ? 'font-display' : defaultFont === 'sans' ? 'font-sans' : 'font-mono'} italic leading-relaxed`}
                >
                  “The shoreline does not end; it merely yields to the swell, surrendering its edges until the tide decides what may remain.”
                </p>
                <span className="text-[11px] font-sans text-stone-400 block mt-2 text-right">
                  — Elena Vance, The Saltwater Shore
                </span>
              </div>
            </div>

            {/* Line Spacing */}
            <div className="px-4 sm:px-5 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0 pr-2">
                <span className={`font-sans font-medium text-[13.5px] tracking-tight block ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>
                  Line Spacing Leading
                </span>
                <span className={`text-[12px] font-sans font-normal block mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Optically balanced vertical rhythm
                </span>
              </div>
              <div className={`p-0.5 rounded-lg border flex gap-1 shrink-0 ${isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-stone-100 border-stone-200'}`}>
                {(['normal', 'relaxed', 'loose'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setLineSpacing(s)}
                    className={`min-h-[28px] px-2.5 rounded-md text-[11.5px] font-sans font-medium capitalize transition-colors cursor-pointer ${
                      lineSpacing === s
                        ? isDark
                          ? 'bg-stone-800 text-amber-400 shadow-2xs'
                          : 'bg-white text-stone-900 shadow-2xs'
                        : isDark
                        ? 'text-stone-400 hover:text-stone-200'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Page Turning Style */}
            <div className="px-4 sm:px-5 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0 pr-2">
                <span className={`font-sans font-medium text-[13.5px] tracking-tight block ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>
                  Reading Flow Mode
                </span>
                <span className={`text-[12px] font-sans font-normal block mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  {pageTurnStyle === 'paginated' ? 'E-Ink Paginated Turn' : 'Continuous Scroll'}
                </span>
              </div>
              <div className={`p-0.5 rounded-lg border flex gap-1 shrink-0 ${isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-stone-100 border-stone-200'}`}>
                <button
                  type="button"
                  onClick={() => setPageTurnStyle('paginated')}
                  className={`min-h-[28px] px-2.5 rounded-md text-[11.5px] font-sans font-medium transition-colors cursor-pointer ${
                    pageTurnStyle === 'paginated'
                      ? isDark
                        ? 'bg-stone-800 text-amber-400 shadow-2xs'
                        : 'bg-white text-stone-900 shadow-2xs'
                      : isDark
                      ? 'text-stone-400 hover:text-stone-200'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Paginated
                </button>
                <button
                  type="button"
                  onClick={() => setPageTurnStyle('scroll')}
                  className={`min-h-[28px] px-2.5 rounded-md text-[11.5px] font-sans font-medium transition-colors cursor-pointer ${
                    pageTurnStyle === 'scroll'
                      ? isDark
                        ? 'bg-stone-800 text-amber-400 shadow-2xs'
                        : 'bg-white text-stone-900 shadow-2xs'
                      : isDark
                      ? 'text-stone-400 hover:text-stone-200'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Scroll
                </button>
              </div>
            </div>

            {/* Keep Awake Toggle */}
            <div className="px-4 sm:px-5 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0 pr-2">
                <span className={`font-sans font-medium text-[13.5px] tracking-tight block ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>
                  Keep Screen Awake
                </span>
                <span className={`text-[12px] font-sans font-normal block mt-0.5 leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Prevents screen auto-dimming during extended reading
                </span>
              </div>
              <ToggleSwitch
                checked={keepAwake}
                onChange={() => setKeepAwake(!keepAwake)}
                ariaLabel="Toggle keep screen awake"
                isDark={isDark}
              />
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 4. DEDICATED PAGE: DOWNLOADS & OFFLINE STORAGE                           */}
      {/* ========================================================================= */}
      {currentPage === 'download' && (
        <>
          {renderSubPageHeader('Downloads & Storage')}

          {/* Full Screen Layout Merging into Screen with delicate hairline dividers */}
          <div className="w-full divide-y divide-stone-200/40 dark:divide-stone-800/40">
            {/* Storage Footprint Bar */}
            <div className="px-4 sm:px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[11px] font-sans font-semibold uppercase tracking-wider ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Local Storage Footprint
                </span>
                <span className="text-xs font-mono font-medium tabular-nums px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  {cacheCleared ? '0 MB' : '142 MB Cached'}
                </span>
              </div>

              <div className={`w-full h-1.5 rounded-full overflow-hidden flex ${isDark ? 'bg-stone-800' : 'bg-stone-200'}`}>
                <div className={`h-full ${isDark ? 'bg-amber-400' : 'bg-stone-900'}`} style={{ width: cacheCleared ? '0%' : '75%' }} />
                <div className="h-full bg-amber-600" style={{ width: cacheCleared ? '0%' : '15%' }} />
              </div>

              <div className="flex items-center justify-between text-[11.5px] font-sans text-stone-500 dark:text-stone-400 mt-2">
                <span>Texts: <span className="font-mono">{cacheCleared ? '0 MB' : '118 MB'}</span></span>
                <span>Audio: <span className="font-mono">{cacheCleared ? '0 MB' : '24 MB'}</span></span>
                <span>Available: <span className="font-mono">38.2 GB</span></span>
              </div>
            </div>

            {/* Auto-download over Wi-Fi */}
            <div className="px-4 sm:px-5 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0 pr-2">
                <span className={`font-sans font-medium text-[13.5px] tracking-tight block ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>
                  Auto-Download Over Wi-Fi
                </span>
                <span className={`text-[12px] font-sans font-normal block mt-0.5 leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Automatically caches unread chapters when Wi-Fi is active
                </span>
              </div>
              <ToggleSwitch
                checked={autoDownloadWifi}
                onChange={() => setAutoDownloadWifi(!autoDownloadWifi)}
                ariaLabel="Toggle auto-download over Wi-Fi"
                isDark={isDark}
              />
            </div>

            {/* Purge Cache Button */}
            <div className="px-4 sm:px-5 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0 pr-2">
                <span className={`font-sans font-medium text-[13.5px] tracking-tight block ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>
                  Purge Offline Media Cache
                </span>
                <span className={`text-[12px] font-sans font-normal block mt-0.5 leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  {cacheCleared ? 'Cache purged cleanly.' : 'Frees up local storage without removing reading progress'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleClearCache}
                className={`min-h-[32px] px-3.5 rounded-lg text-xs font-sans font-medium flex items-center gap-1.5 transition-colors border cursor-pointer shrink-0 ${
                  cacheCleared
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : isDark
                    ? 'border-stone-800 bg-stone-900 text-stone-300 hover:text-red-400 hover:border-red-900/50'
                    : 'border-stone-300 bg-white text-stone-700 hover:text-red-600 hover:border-red-300'
                }`}
              >
                {cacheCleared ? <Check className="w-3.5 h-3.5" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>{cacheCleared ? 'Purged' : 'Clear Cache'}</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 5. DEDICATED PAGE: TTS & NARRATION                                      */}
      {/* ========================================================================= */}
      {currentPage === 'tts' && (
        <>
          {renderSubPageHeader('TTS & Narration')}

          {/* Full Screen Layout Merging into Screen with delicate hairline dividers */}
          <div className="w-full divide-y divide-stone-200/40 dark:divide-stone-800/40">
            {/* Voice Selection */}
            <div className="px-4 sm:px-5 py-4">
              <div className="flex items-center justify-between mb-2.5">
                <span className={`text-[11px] font-sans font-semibold uppercase tracking-wider ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Narration Voice Model
                </span>
                <button
                  type="button"
                  onClick={handleToggleTTSPreview}
                  className={`min-h-[28px] px-2.5 rounded-lg text-xs font-sans font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    isPlayingTTSPreview
                      ? 'bg-amber-500 text-stone-950 shadow-2xs'
                      : isDark
                      ? 'bg-stone-900 border border-stone-800 text-amber-400 hover:bg-stone-800'
                      : 'bg-stone-100 border border-stone-200 text-stone-800 hover:bg-stone-200'
                  }`}
                >
                  {isPlayingTTSPreview ? <Square className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                  <span>{isPlayingTTSPreview ? 'Stop Sample' : 'Play Sample'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'clara', name: 'Clara Vance', desc: 'Studio English · Serene' },
                  { id: 'erik', name: 'Erik Lindqvist', desc: 'Nordic Deep · Measured' },
                  { id: 'kenji', name: 'Kenji Mori', desc: 'Neo-Noir · Soft Pace' },
                  { id: 'system', name: 'System Neural', desc: 'Native Device Engine' },
                ].map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setTtsVoice(v.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      ttsVoice === v.id
                        ? isDark
                          ? 'border-amber-400/80 bg-stone-900 text-amber-300 ring-1 ring-amber-400/20'
                          : 'border-stone-900 bg-stone-100 text-stone-900 ring-1 ring-stone-900/10'
                        : isDark
                        ? 'border-stone-800/80 hover:border-stone-700 text-stone-300'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`font-sans text-[13px] font-semibold ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>{v.name}</span>
                      {ttsVoice === v.id && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-[11px] font-sans text-stone-500 dark:text-stone-400 mt-0.5">{v.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Narration Speed */}
            <div className="px-4 sm:px-5 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0 pr-2">
                <span className={`font-sans font-medium text-[13.5px] tracking-tight block ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>
                  Narration Speed
                </span>
                <span className={`text-[12px] font-sans font-normal block mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Speech pace multiplier
                </span>
              </div>
              <div className={`p-0.5 rounded-lg border flex gap-1 shrink-0 ${isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-stone-100 border-stone-200'}`}>
                {[0.8, 1.0, 1.25, 1.5].map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setTtsSpeed(spd)}
                    className={`min-h-[28px] px-2 rounded-md text-[11.5px] font-mono font-medium transition-colors cursor-pointer ${
                      ttsSpeed === spd
                        ? isDark
                          ? 'bg-stone-800 text-amber-400 shadow-2xs'
                          : 'bg-white text-stone-900 shadow-2xs'
                        : isDark
                        ? 'text-stone-400 hover:text-stone-200'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            {/* Vocal Pitch */}
            <div className="px-4 sm:px-5 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0 pr-2">
                <span className={`font-sans font-medium text-[13.5px] tracking-tight block ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>
                  Vocal Tone & Timbre
                </span>
                <span className={`text-[12px] font-sans font-normal block mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Acoustic resonance and pitch
                </span>
              </div>
              <div className={`p-0.5 rounded-lg border flex gap-1 shrink-0 ${isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-stone-100 border-stone-200'}`}>
                {(['warm', 'balanced', 'crisp'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setTtsPitch(p)}
                    className={`min-h-[28px] px-2.5 rounded-md text-[11.5px] font-sans font-medium capitalize transition-colors cursor-pointer ${
                      ttsPitch === p
                        ? isDark
                          ? 'bg-stone-800 text-amber-400 shadow-2xs'
                          : 'bg-white text-stone-900 shadow-2xs'
                        : isDark
                        ? 'text-stone-400 hover:text-stone-200'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Ambient Soundscapes */}
            <div className="px-4 sm:px-5 py-4">
              <span className={`text-[11px] font-sans font-semibold uppercase tracking-wider block mb-2.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                Ambient Background Soundscape
              </span>
              <div className="grid grid-cols-4 gap-2 text-xs text-center">
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
                      className={`min-h-[50px] p-2 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        ambientSound === s.id
                          ? isDark
                            ? 'border-amber-400/80 bg-stone-900 text-amber-300 ring-1 ring-amber-400/20'
                            : 'border-stone-900 bg-stone-100 text-stone-900 ring-1 ring-stone-900/10'
                          : isDark
                          ? 'border-stone-800/80 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                          : 'border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[11px] font-sans font-medium">{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Continuous Narration */}
            <div className="px-4 sm:px-5 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0 pr-2">
                <span className={`font-sans font-medium text-[13.5px] tracking-tight block ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>
                  Continuous Chapter Playback
                </span>
                <span className={`text-[12px] font-sans font-normal block mt-0.5 leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Automatically narrate the next chapter when one completes
                </span>
              </div>
              <ToggleSwitch
                checked={autoAdvanceChapter}
                onChange={() => setAutoAdvanceChapter(!autoAdvanceChapter)}
                ariaLabel="Toggle continuous chapter playback"
                isDark={isDark}
              />
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 6. DEDICATED PAGE: DATA & MARGINALIA                                     */}
      {/* ========================================================================= */}
      {currentPage === 'data' && (
        <>
          {renderSubPageHeader('Data & Marginalia')}

          {/* Full Screen Layout Merging into Screen with delicate hairline dividers */}
          <div className="w-full divide-y divide-stone-200/40 dark:divide-stone-800/40">
            {/* Export Notes */}
            <div className="px-4 sm:px-5 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0 pr-2">
                <span className={`font-sans font-medium text-[13.5px] tracking-tight block ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>
                  Export Marginalia Ledger
                </span>
                <span className={`text-[12px] font-sans font-normal block mt-0.5 leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Export saved quotes and reading highlights to Markdown (.md)
                </span>
              </div>
              <button
                type="button"
                onClick={handleExportNotes}
                className={`min-h-[32px] px-3.5 rounded-lg text-xs font-sans font-medium flex items-center gap-1.5 transition-colors border cursor-pointer shrink-0 ${
                  notesExported
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : isDark
                    ? 'border-stone-800 bg-stone-900 text-stone-200 hover:bg-stone-800 hover:border-stone-700'
                    : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-100 hover:border-stone-400'
                }`}
              >
                {notesExported ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                <span>{notesExported ? 'Saved' : 'Export .md'}</span>
              </button>
            </div>

            {/* Reading Milestone Target */}
            <div className="px-4 sm:px-5 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0 pr-2">
                <span className={`font-sans font-medium text-[13.5px] tracking-tight block ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>
                  Annual Reading Target
                </span>
                <span className={`text-[12px] font-sans font-normal block mt-0.5 leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Target number of completed novels this calendar year
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setReadingGoal((prev) => Math.max(5, prev - 5))}
                  className={`min-h-[32px] min-w-[32px] rounded-lg border flex items-center justify-center font-sans font-semibold text-sm cursor-pointer transition-colors ${
                    isDark ? 'border-stone-800 bg-stone-900 text-stone-300 hover:border-stone-700' : 'border-stone-300 bg-stone-100 text-stone-800 hover:border-stone-400'
                  }`}
                >
                  -
                </button>
                <span className="font-mono text-xs font-semibold tabular-nums px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  {readingGoal} Books
                </span>
                <button
                  type="button"
                  onClick={() => setReadingGoal((prev) => Math.min(100, prev + 5))}
                  className={`min-h-[32px] min-w-[32px] rounded-lg border flex items-center justify-center font-sans font-semibold text-sm cursor-pointer transition-colors ${
                    isDark ? 'border-stone-800 bg-stone-900 text-stone-300 hover:border-stone-700' : 'border-stone-300 bg-stone-100 text-stone-800 hover:border-stone-400'
                  }`}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 7. DEDICATED PAGE: ABOUT FOLIO ENGINE                                    */}
      {/* ========================================================================= */}
      {currentPage === 'about' && (
        <>
          {renderSubPageHeader('About Folio')}

          {/* Full Screen Layout Merging into Screen with delicate hairline dividers */}
          <div className="w-full divide-y divide-stone-200/40 dark:divide-stone-800/40">
            <div className="px-4 sm:px-5 py-4 flex items-center gap-3.5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                isDark ? 'bg-stone-900/80 border-stone-800 text-amber-400' : 'bg-stone-100 border-stone-200 text-stone-800'
              }`}>
                <BookOpen className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className={`font-sans text-[14px] font-semibold tracking-tight ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>
                  Folio Reading Architecture
                </h3>
                <span className="text-[11.5px] font-sans text-stone-400 dark:text-stone-500">
                  Release 2026.10 · Atelier Core Engine
                </span>
              </div>
            </div>

            <div className="px-4 sm:px-5 py-4 space-y-2.5 text-[13px] font-sans font-normal leading-relaxed text-stone-600 dark:text-stone-300">
              <p>
                Folio is engineered around architectural restraint, deliberate negative space, and sensory e-ink typography.
              </p>
              <p>
                Rendered with high optical fidelity typefaces: Newsreader Serif, Playfair Display, Plus Jakarta Sans, and JetBrains Mono.
              </p>
            </div>

            <div className="px-4 sm:px-5 py-4 space-y-2.5 text-[12px] font-sans text-stone-500 dark:text-stone-400">
              <div className="flex justify-between items-center py-0.5">
                <span className="font-medium text-stone-600 dark:text-stone-400">Engine Platform</span>
                <span className="font-mono text-stone-800 dark:text-stone-200 text-[11.5px]">React 19 + TypeScript</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="font-medium text-stone-600 dark:text-stone-400">Persistence Model</span>
                <span className="font-mono text-stone-800 dark:text-stone-200 text-[11.5px]">Offline Web Storage (IndexedDB/Cache)</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="font-medium text-stone-600 dark:text-stone-400">Variable Typography</span>
                <span className="font-mono text-stone-800 dark:text-stone-200 text-[11.5px]">Optical Sizing 6–72pt</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
