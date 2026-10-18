import React, { useState, useEffect } from 'react';
import { Book, NOVEL_BOOKS } from './data/novelData';
import { DeviceFrame } from './components/DeviceFrame';
import { MobileBottomNav, NavTab } from './components/MobileBottomNav';
import { ScreenExplore } from './screens/ScreenExplore';
import { ScreenBookDetail } from './screens/ScreenBookDetail';
import { ScreenReader } from './screens/ScreenReader';
import { ScreenTableOfContents } from './screens/ScreenTableOfContents';
import { ScreenBookshelf } from './screens/ScreenBookshelf';
import { ScreenAudioPlayer } from './screens/ScreenAudioPlayer';
import { ScreenSceneStudio } from './screens/ScreenSceneStudio';
import { ScreenSettings } from './screens/ScreenSettings';
import { DesignSystemInspector } from './components/DesignSystemInspector';
import { Smartphone, LayoutGrid, Palette, Sun, Moon, Settings } from 'lucide-react';

export type ScreenId = 'explore' | 'detail' | 'reader' | 'contents' | 'shelf' | 'audio' | 'studio' | 'settings';

export default function App() {
  // Navigation & Screen State - default to 'shelf' (Library)
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('shelf');
  const [selectedBook, setSelectedBook] = useState<Book>(NOVEL_BOOKS[0]);
  const [studioPrompt, setStudioPrompt] = useState<string>('');
  
  // Dark Mode State with localStorage persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('folio_dark_mode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('folio_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  // View mode: 'simulator' vs 'artboard'
  const [viewMode, setViewMode] = useState<'artboard' | 'simulator'>('simulator');
  
  // Design System Drawer
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  // Active book list state
  const [books, setBooks] = useState<Book[]>(NOVEL_BOOKS);

  // Map ScreenId to Bottom Nav Tab
  const getNavTabFromScreen = (screen: ScreenId): NavTab => {
    switch (screen) {
      case 'shelf':
        return 'shelf';
      case 'reader':
        return 'reader';
      case 'explore':
      case 'detail':
        return 'explore';
      case 'contents':
        return 'contents';
      case 'audio':
        return 'audio';
      case 'studio':
        return 'studio';
      case 'settings':
        return 'settings';
      default:
        return 'shelf';
    }
  };

  const handleBottomNavSelect = (tab: NavTab) => {
    switch (tab) {
      case 'shelf':
        setCurrentScreen('shelf');
        break;
      case 'reader':
        setCurrentScreen('reader');
        break;
      case 'explore':
        setCurrentScreen('explore');
        break;
      case 'contents':
        setCurrentScreen('contents');
        break;
      case 'audio':
        setCurrentScreen('audio');
        break;
      case 'studio':
        setCurrentScreen('studio');
        break;
      case 'settings':
        setCurrentScreen('settings');
        break;
    }
  };

  const handleApplyCoverToBook = (imageUrl: string) => {
    setBooks(prev =>
      prev.map(b => (b.id === selectedBook.id ? { ...b, coverImage: imageUrl } : b))
    );
    setSelectedBook(prev => ({ ...prev, coverImage: imageUrl }));
  };

  // Render a specific screen by screen id
  const renderScreenContent = (screenId: ScreenId, isInteractive: boolean = true) => {
    switch (screenId) {
      case 'shelf':
        return (
          <>
            <ScreenBookshelf
              onSelectBook={(book) => {
                setSelectedBook(book);
                setCurrentScreen('detail');
              }}
              onOpenReader={(book) => {
                setSelectedBook(book);
                setCurrentScreen('reader');
              }}
              onOpenSettings={() => setCurrentScreen('settings')}
              isDark={isDarkMode}
              onToggleDarkMode={toggleDarkMode}
            />
            <MobileBottomNav
              activeTab="shelf"
              onSelectTab={handleBottomNavSelect}
              isDark={isDarkMode}
            />
          </>
        );

      case 'reader':
        return (
          <>
            <ScreenReader
              book={selectedBook}
              onBack={() => setCurrentScreen('shelf')}
              onOpenTableOfContents={() => setCurrentScreen('contents')}
              onOpenStudioWithPrompt={(p) => {
                setStudioPrompt(p);
                setCurrentScreen('studio');
              }}
              isDark={isDarkMode}
              onToggleDarkMode={toggleDarkMode}
            />
            <MobileBottomNav
              activeTab="reader"
              onSelectTab={handleBottomNavSelect}
              isDark={isDarkMode}
            />
          </>
        );

      case 'explore':
        return (
          <>
            <ScreenExplore
              onSelectBook={(book) => {
                setSelectedBook(book);
                setCurrentScreen('detail');
              }}
              onOpenReader={(book) => {
                setSelectedBook(book);
                setCurrentScreen('reader');
              }}
              onOpenAudio={(book) => {
                setSelectedBook(book);
                setCurrentScreen('audio');
              }}
              onOpenStudio={() => setCurrentScreen('studio')}
              isDark={isDarkMode}
              onToggleDarkMode={toggleDarkMode}
            />
            <MobileBottomNav
              activeTab="explore"
              onSelectTab={handleBottomNavSelect}
              isDark={isDarkMode}
            />
          </>
        );

      case 'contents':
        return (
          <>
            <ScreenTableOfContents
              book={selectedBook}
              onBack={() => setCurrentScreen('reader')}
              onSelectChapter={() => setCurrentScreen('reader')}
              onSelectQuote={(q) => {
                setStudioPrompt(q.text);
                setCurrentScreen('studio');
              }}
              isDark={isDarkMode}
            />
            <MobileBottomNav
              activeTab="contents"
              onSelectTab={handleBottomNavSelect}
              isDark={isDarkMode}
            />
          </>
        );

      case 'audio':
        return (
          <>
            <ScreenAudioPlayer
              book={selectedBook}
              onBack={() => setCurrentScreen('explore')}
              onOpenReader={(book) => {
                setSelectedBook(book);
                setCurrentScreen('reader');
              }}
            />
            <MobileBottomNav
              activeTab="audio"
              isDark={isDarkMode}
              onSelectTab={handleBottomNavSelect}
            />
          </>
        );

      case 'studio':
        return (
          <>
            <ScreenSceneStudio
              initialPrompt={studioPrompt}
              onBack={() => setCurrentScreen('explore')}
              onApplyCoverToBook={handleApplyCoverToBook}
              isDark={isDarkMode}
            />
            <MobileBottomNav
              activeTab="studio"
              onSelectTab={handleBottomNavSelect}
              isDark={isDarkMode}
            />
          </>
        );

      case 'settings':
        return (
          <>
            <ScreenSettings
              onBack={() => setCurrentScreen('shelf')}
              isDark={isDarkMode}
              onToggleDarkMode={toggleDarkMode}
            />
            <MobileBottomNav
              activeTab="settings"
              onSelectTab={handleBottomNavSelect}
              isDark={isDarkMode}
            />
          </>
        );

      case 'detail':
        return (
          <>
            <ScreenBookDetail
              book={selectedBook}
              onBack={() => setCurrentScreen('shelf')}
              onOpenReader={(book) => {
                setSelectedBook(book);
                setCurrentScreen('reader');
              }}
              isDark={isDarkMode}
              onToggleDarkMode={toggleDarkMode}
            />
            <MobileBottomNav
              activeTab="explore"
              onSelectTab={handleBottomNavSelect}
              isDark={isDarkMode}
            />
          </>
        );

      default:
        return null;
    }
  };

  const screensMeta: Array<{ id: ScreenId; title: string; num: number; desc: string }> = [
    { id: 'shelf', title: 'Library', num: 1, desc: '3x3 minimal grid, continue reading hero, list switcher' },
    { id: 'reader', title: 'Reader Chamber', num: 2, desc: 'Distraction-free e-ink reader with margins and typography controls' },
    { id: 'explore', title: 'Sanctuary to discover', num: 3, desc: 'Curated editions, author spotlight, and discovery catalog' },
    { id: 'contents', title: 'Index & Marginalia', num: 4, desc: 'Chapter timeline, saved quotes, and bookmarks' },
    { id: 'audio', title: 'Whisper Studio', num: 5, desc: 'Ambient soundscape and audiobook player' },
    { id: 'studio', title: 'Scene Studio', num: 6, desc: 'Literary illustration and book cover art laboratory' },
    { id: 'settings', title: 'Preferences Hub', num: 7, desc: 'Appearance, reader typography, offline downloads & TTS narration hub' },
    { id: 'detail', title: 'Novel Details', num: 8, desc: 'Clean monograph presentation and unadorned chapter sequence' },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDarkMode
          ? 'bg-[#000000] text-stone-100 selection:bg-amber-900 selection:text-amber-100'
          : 'bg-[#F3EFE9] text-stone-900 selection:bg-stone-300'
      }`}
    >
      {/* Top Bar Contract */}
      <header
        className={`h-16 px-6 border-b backdrop-blur-md sticky top-0 z-40 flex items-center justify-between transition-colors ${
          isDarkMode
            ? 'bg-[#000000]/95 border-neutral-900 text-stone-100'
            : 'bg-[#FAF8F5]/90 border-stone-300/80 text-stone-900'
        }`}
      >
        {/* Zone 1: Wordmark */}
        <div className="flex items-baseline gap-2.5">
          <span className="font-serif text-lg font-bold tracking-tight">
            FOLIO
          </span>
          <span className={`text-[11px] font-mono uppercase tracking-widest ${isDarkMode ? 'text-amber-400' : 'text-amber-800'}`}>
            Novel Reading App
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className={`hidden md:flex items-center gap-6 text-xs font-medium ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
          <button
            type="button"
            onClick={() => setViewMode('simulator')}
            className={`transition-colors flex items-center gap-1.5 ${
              viewMode === 'simulator'
                ? isDarkMode ? 'text-amber-400 font-semibold' : 'text-stone-950 font-semibold'
                : isDarkMode ? 'hover:text-stone-200' : 'hover:text-stone-950'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('artboard')}
            className={`transition-colors flex items-center gap-1.5 ${
              viewMode === 'artboard'
                ? isDarkMode ? 'text-amber-400 font-semibold' : 'text-stone-950 font-semibold'
                : isDarkMode ? 'hover:text-stone-200' : 'hover:text-stone-950'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>All Screens View</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setCurrentScreen('settings');
              setViewMode('simulator');
            }}
            className={`transition-colors flex items-center gap-1.5 ${
              currentScreen === 'settings'
                ? isDarkMode ? 'text-amber-400 font-semibold' : 'text-stone-950 font-semibold'
                : isDarkMode ? 'hover:text-stone-200' : 'hover:text-stone-950'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>

          <button
            type="button"
            onClick={() => setIsInspectorOpen(true)}
            className={`transition-colors flex items-center gap-1.5 ${isDarkMode ? 'hover:text-stone-200' : 'hover:text-stone-950'}`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Design Tokens</span>
          </button>
        </nav>

        {/* Zone 3: Actions + Dark Mode Switch */}
        <div className="flex items-center gap-2.5">
          {/* Global Dark Mode Switch */}
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`min-h-[36px] px-2.5 py-1 text-xs font-medium rounded-lg border flex items-center gap-1.5 transition-colors ${
              isDarkMode
                ? 'bg-stone-900 border-stone-700 text-amber-400 hover:bg-stone-800'
                : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
            }`}
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>

          {/* Quick Screen Selector Dropdown */}
          <div className="relative">
            <select
              value={currentScreen}
              onChange={(e) => {
                setCurrentScreen(e.target.value as ScreenId);
                setViewMode('simulator');
              }}
              aria-label="Select screen"
              className={`text-xs border rounded-lg px-2.5 py-1.5 font-medium focus:outline-none cursor-pointer ${
                isDarkMode
                  ? 'bg-stone-900 border-stone-700 text-stone-200 focus:ring-1 focus:ring-amber-400'
                  : 'bg-white border-stone-300 text-stone-800 focus:ring-1 focus:ring-stone-800'
              }`}
            >
              {screensMeta.map((s) => (
                <option key={s.id} value={s.id}>
                  0{s.num}. {s.title}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => setIsInspectorOpen(true)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shadow-xs ${
              isDarkMode
                ? 'bg-amber-400 text-stone-950 font-semibold hover:bg-amber-300'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            Tokens
          </button>
        </div>
      </header>

      {/* Subheader Utility & Status Bar */}
      <div
        className={`border-b px-6 py-2 flex flex-wrap items-center justify-between text-xs gap-3 ${
          isDarkMode
            ? 'bg-[#050505] border-neutral-900 text-stone-400'
            : 'bg-[#EDE7DE] border-stone-300 text-stone-600'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className={`font-mono text-[11px] font-semibold uppercase tracking-wider ${isDarkMode ? 'text-amber-400' : 'text-stone-700'}`}>
            Bottom Nav:
          </span>
          <span className="font-mono text-[11px]">
            Library · Reader · Sanctuary to discover · Index · Audio · Studio · Settings
          </span>
        </div>

        {/* View Mode Switcher */}
        <div
          className={`flex items-center p-0.5 rounded-lg border ${
            isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-stone-300/60 border-stone-300'
          }`}
        >
          <button
            type="button"
            onClick={() => setViewMode('simulator')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              viewMode === 'simulator'
                ? isDarkMode ? 'bg-stone-800 text-amber-400 shadow-xs' : 'bg-white text-stone-950 shadow-xs'
                : isDarkMode ? 'text-stone-400 hover:text-stone-200' : 'text-stone-600 hover:text-stone-950'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('artboard')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              viewMode === 'artboard'
                ? isDarkMode ? 'bg-stone-800 text-amber-400 shadow-xs' : 'bg-white text-stone-950 shadow-xs'
                : isDarkMode ? 'text-stone-400 hover:text-stone-200' : 'text-stone-600 hover:text-stone-950'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>All Screens View</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 flex flex-col items-center">
        {viewMode === 'simulator' ? (
          /* VIEW MODE 1: INTERACTIVE SIMULATOR */
          <div className="flex flex-col items-center w-full">
            <div className="mb-5 text-center max-w-md">
              <span className={`text-xs font-mono uppercase tracking-widest block mb-1 ${isDarkMode ? 'text-amber-400' : 'text-amber-800'}`}>
                Interactive Mobile Simulator
              </span>
              <h2 className={`font-serif text-2xl font-bold ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>
                {screensMeta.find((s) => s.id === currentScreen)?.title}
              </h2>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                {screensMeta.find((s) => s.id === currentScreen)?.desc}
              </p>
            </div>

            <DeviceFrame
              isStandalone={true}
              isActive={true}
              scale={1}
              isDark={isDarkMode}
            >
              {renderScreenContent(currentScreen, true)}
            </DeviceFrame>

            {/* Quick Screen Pill Switcher */}
            <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-2xl">
              {screensMeta.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentScreen(s.id)}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    currentScreen === s.id
                      ? isDarkMode
                        ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                        : 'bg-stone-900 text-stone-50 shadow-sm'
                      : isDarkMode
                      ? 'bg-stone-900 border border-stone-800 text-stone-300 hover:bg-stone-800'
                      : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span className="font-mono text-[10px] mr-1.5 opacity-60">0{s.num}</span>
                  <span>{s.title}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* VIEW MODE 2: ARTBOARD CANVAS */
          <div className="w-full max-w-7xl">
            <div className="mb-8 text-center max-w-2xl mx-auto">
              <span className={`text-xs font-mono uppercase tracking-widest font-semibold block mb-1 ${isDarkMode ? 'text-amber-400' : 'text-amber-800'}`}>
                Complete UI Kit Specification
              </span>
              <h2 className={`font-serif text-3xl font-bold tracking-tight ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>
                All Eight Screens of Folio
              </h2>
              <p className={`text-xs mt-2 leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                Complete minimalist novel reading ecosystem featuring 3x3 minimal library grid, continue reading hero, full navigation tabs, and dedicated settings screen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
              {screensMeta.map((screen) => (
                <div key={screen.id} className="flex flex-col items-center">
                  <DeviceFrame
                    screenNumber={screen.num}
                    screenTitle={screen.title}
                    screenSubtitle={screen.desc}
                    isActive={currentScreen === screen.id}
                    isDark={isDarkMode}
                    onSelectScreen={() => {
                      setCurrentScreen(screen.id);
                      setViewMode('simulator');
                    }}
                  >
                    {renderScreenContent(screen.id, false)}
                  </DeviceFrame>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Design System Token Drawer Modal */}
      <DesignSystemInspector
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
      />

      {/* Footer */}
      <footer
        className={`border-t px-6 py-6 text-center text-xs font-mono ${
          isDarkMode
            ? 'border-stone-800 text-stone-500'
            : 'border-stone-300 text-stone-500'
        }`}
      >
        <p>
          Folio Minimalist Novel Reading Experience · Library, Reader, Sanctuary to discover, Index, Audio, Studio & Settings
        </p>
      </footer>
    </div>
  );
}
