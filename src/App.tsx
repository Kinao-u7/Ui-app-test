import React, { useState } from 'react';
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
import { DesignSystemInspector } from './components/DesignSystemInspector';
import { Smartphone, LayoutGrid, Palette, BookOpen, Sparkles, Layers, ChevronRight, Check } from 'lucide-react';

export type ScreenId = 'explore' | 'detail' | 'reader' | 'contents' | 'shelf' | 'audio' | 'studio';

export default function App() {
  // Navigation & Screen State
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('explore');
  const [selectedBook, setSelectedBook] = useState<Book>(NOVEL_BOOKS[0]);
  const [studioPrompt, setStudioPrompt] = useState<string>('');
  
  // View mode: 'artboard' (all 7 screens side-by-side in canvas) vs 'simulator' (single interactive device)
  const [viewMode, setViewMode] = useState<'artboard' | 'simulator'>('artboard');
  
  // Design System Drawer
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  // Active book list state so that AI studio cover updates propagate
  const [books, setBooks] = useState<Book[]>(NOVEL_BOOKS);

  // Map ScreenId to Bottom Nav Tab
  const getNavTabFromScreen = (screen: ScreenId): NavTab => {
    switch (screen) {
      case 'explore':
      case 'detail':
        return 'explore';
      case 'reader':
        return 'reader';
      case 'contents':
        return 'contents';
      case 'shelf':
        return 'shelf';
      case 'audio':
        return 'audio';
      case 'studio':
        return 'studio';
      default:
        return 'explore';
    }
  };

  const handleBottomNavSelect = (tab: NavTab) => {
    switch (tab) {
      case 'explore':
        setCurrentScreen('explore');
        break;
      case 'reader':
        setCurrentScreen('reader');
        break;
      case 'contents':
        setCurrentScreen('contents');
        break;
      case 'shelf':
        setCurrentScreen('shelf');
        break;
      case 'audio':
        setCurrentScreen('audio');
        break;
      case 'studio':
        setCurrentScreen('studio');
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
            />
            <MobileBottomNav
              activeTab="explore"
              onSelectTab={handleBottomNavSelect}
            />
          </>
        );

      case 'detail':
        return (
          <>
            <ScreenBookDetail
              book={selectedBook}
              onBack={() => setCurrentScreen('explore')}
              onOpenReader={(book) => {
                setSelectedBook(book);
                setCurrentScreen('reader');
              }}
              onOpenAudio={(book) => {
                setSelectedBook(book);
                setCurrentScreen('audio');
              }}
              onOpenStudio={() => setCurrentScreen('studio')}
            />
            <MobileBottomNav
              activeTab="explore"
              onSelectTab={handleBottomNavSelect}
            />
          </>
        );

      case 'reader':
        return (
          <ScreenReader
            book={selectedBook}
            onBack={() => setCurrentScreen('explore')}
            onOpenTableOfContents={() => setCurrentScreen('contents')}
            onOpenStudioWithPrompt={(p) => {
              setStudioPrompt(p);
              setCurrentScreen('studio');
            }}
          />
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
            />
            <MobileBottomNav
              activeTab="contents"
              onSelectTab={handleBottomNavSelect}
            />
          </>
        );

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
            />
            <MobileBottomNav
              activeTab="shelf"
              onSelectTab={handleBottomNavSelect}
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
              isDark={true}
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
            />
            <MobileBottomNav
              activeTab="studio"
              onSelectTab={handleBottomNavSelect}
            />
          </>
        );

      default:
        return null;
    }
  };

  const screensMeta: Array<{ id: ScreenId; title: string; num: number; desc: string }> = [
    { id: 'explore', title: 'Library Atelier', num: 1, desc: 'Editorial discovery, curated shelf, author spotlight' },
    { id: 'detail', title: 'Folio Detail', num: 2, desc: 'Monograph presentation, preface, chapter sequence' },
    { id: 'reader', title: 'Reading Chamber', num: 3, desc: 'Distraction-free e-ink reader, 4 themes & margin notes' },
    { id: 'contents', title: 'Index & Marginalia', num: 4, desc: 'Chapter timeline, saved quotes, reader bookmarks' },
    { id: 'shelf', title: 'Personal Sanctuary', num: 5, desc: 'Reading velocity, 2026 goal, offline bookshelf' },
    { id: 'audio', title: 'Whisper Studio', num: 6, desc: 'Ambient audiobook, waveform & soundscape mixer' },
    { id: 'studio', title: 'Scene & Cover Studio', num: 7, desc: 'AI illustration generator & prompt image editor' },
  ];

  return (
    <div className="min-h-screen bg-[#F3EFE9] text-stone-900 flex flex-col font-sans selection:bg-stone-300">
      {/* Top Bar Contract (Strict 3-Zone Architecture) */}
      <header className="h-16 px-6 border-b border-stone-300/80 bg-[#FAF8F5]/90 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-baseline gap-2.5">
          <span className="font-serif text-lg font-bold tracking-tight text-stone-900">
            FOLIO
          </span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-800">
            Novel UI Kit · 7 Screens
          </span>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-stone-600">
          <button
            type="button"
            onClick={() => setViewMode('artboard')}
            className={`transition-colors flex items-center gap-1.5 ${
              viewMode === 'artboard' ? 'text-stone-950 font-semibold' : 'hover:text-stone-950'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Artboard Canvas (All 7)</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('simulator')}
            className={`transition-colors flex items-center gap-1.5 ${
              viewMode === 'simulator' ? 'text-stone-950 font-semibold' : 'hover:text-stone-950'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </button>

          <button
            type="button"
            onClick={() => setIsInspectorOpen(true)}
            className="hover:text-stone-950 transition-colors flex items-center gap-1.5"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Design Tokens</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Screen Selector Dropdown */}
          <div className="relative">
            <select
              value={currentScreen}
              onChange={(e) => {
                setCurrentScreen(e.target.value as ScreenId);
                setViewMode('simulator');
              }}
              aria-label="Select screen"
              className="text-xs bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-stone-800 cursor-pointer"
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
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shadow-xs"
          >
            Inspect Kit
          </button>
        </div>
      </header>

      {/* Subheader Utility & Status Bar */}
      <div className="bg-[#EDE7DE] border-b border-stone-300 px-6 py-2.5 flex flex-wrap items-center justify-between text-xs text-stone-600 gap-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-semibold text-stone-700 uppercase tracking-wider">
            Format:
          </span>
          <span className="font-mono text-[11px] text-stone-500">
            393 × 852 pt (iPhone 16 Pro Baseline) · 44px Touch Targets · Zero-Pill Architecture
          </span>
        </div>

        {/* View Mode Segmented Switcher */}
        <div className="flex items-center gap-1 bg-stone-300/60 p-0.5 rounded-lg">
          <button
            type="button"
            onClick={() => setViewMode('artboard')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              viewMode === 'artboard'
                ? 'bg-white text-stone-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-950'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>7 Screens Showcase</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('simulator')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              viewMode === 'simulator'
                ? 'bg-white text-stone-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-950'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Live Device Simulator</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 flex flex-col items-center">
        {/* VIEW MODE 1: ARTBOARD CANVAS (ALL 7 SCREENS SIDE-BY-SIDE) */}
        {viewMode === 'artboard' ? (
          <div className="w-full max-w-7xl">
            {/* Artboard Hero Intro */}
            <div className="mb-8 text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-semibold block mb-1">
                Complete UI Kit Specification
              </span>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-stone-900">
                The Seven Screens of Folio
              </h2>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Meticulously designed for modern, distraction-free long-form reading. Features e-ink optical compensation, tactile unboxed typography, ambient audio soundscapes, and generative literary scene visualization.
              </p>
            </div>

            {/* Screens Horizontal / Grid Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
              {screensMeta.map((screen) => (
                <div key={screen.id} className="flex flex-col items-center">
                  <DeviceFrame
                    screenNumber={screen.num}
                    screenTitle={screen.title}
                    screenSubtitle={screen.desc}
                    isActive={currentScreen === screen.id}
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
        ) : (
          /* VIEW MODE 2: INTERACTIVE SIMULATOR (DEEP DIVE TEST DRIVE) */
          <div className="flex flex-col items-center w-full">
            <div className="mb-6 text-center max-w-md">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-800 block mb-1">
                Interactive Smartphone Simulator
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                {screensMeta.find((s) => s.id === currentScreen)?.title}
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                Use the bottom navigation bar or in-screen controls to test the reading experience, switch themes, play ambient audio, or generate AI scene illustrations.
              </p>
            </div>

            <DeviceFrame
              isStandalone={true}
              isActive={true}
              scale={1}
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
                      ? 'bg-stone-900 text-stone-50 shadow-sm'
                      : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span className="font-mono text-[10px] mr-1.5 opacity-60">0{s.num}</span>
                  <span>{s.title}</span>
                </button>
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
      <footer className="border-t border-stone-300 px-6 py-6 text-center text-xs text-stone-500 font-mono">
        <p>
          Folio Novel Reading App UI Kit · Crafted with 60-30-10 Curatorial Discipline & Zero-Pill Typography
        </p>
        <p className="text-[11px] text-stone-400 mt-1">
          Designed for AI Studio · All 7 Screens Fully Functional & Interconnected
        </p>
      </footer>
    </div>
  );
}
