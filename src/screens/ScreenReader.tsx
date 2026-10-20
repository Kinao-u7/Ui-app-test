import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Type,
  Bookmark,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  Copy,
  Check,
  Quote as QuoteIcon,
  BookOpen
} from 'lucide-react';
import { Book, READER_THEMES, ReaderTheme } from '../data/novelData';

interface ScreenReaderProps {
  book: Book;
  onBack: () => void;
  onOpenStudioWithPrompt?: (prompt: string) => void;
  onOpenTableOfContents: () => void;
  onSaveQuote?: (quote: {
    text: string;
    chapter: string;
    page: number;
    note: string;
    color: 'amber' | 'ink' | 'sage';
  }) => void;
  isDark?: boolean;
  onToggleDarkMode?: () => void;
}

export const ScreenReader: React.FC<ScreenReaderProps> = ({
  book,
  onBack,
  onOpenStudioWithPrompt,
  onOpenTableOfContents,
  onSaveQuote,
  isDark = false,
  onToggleDarkMode
}) => {
  const [currentThemeKey, setCurrentThemeKey] = useState<string>(isDark ? 'oled' : 'alabaster');

  useEffect(() => {
    if (isDark && currentThemeKey === 'alabaster') {
      setCurrentThemeKey('oled');
    } else if (!isDark && currentThemeKey === 'oled') {
      setCurrentThemeKey('alabaster');
    }
  }, [isDark]);

  const [fontSize, setFontSize] = useState<number>(17);
  const [fontFamily, setFontFamily] = useState<'serif' | 'display' | 'sans' | 'mono'>('serif');
  const [lineHeight, setLineHeight] = useState<'relaxed' | 'loose' | 'normal'>('relaxed');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeHighlightNote, setActiveHighlightNote] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [currentChapterIdx, setCurrentChapterIdx] = useState(2); // Chapter 3

  // Text selection & Quote Card state
  const [selectedText, setSelectedText] = useState<string>('');
  const [selectionBox, setSelectionBox] = useState<{ x: number; y: number } | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteNote, setQuoteNote] = useState('');
  const [quoteColor, setQuoteColor] = useState<'amber' | 'ink' | 'sage'>('amber');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const proseContainerRef = useRef<HTMLDivElement>(null);

  const theme: ReaderTheme = READER_THEMES[currentThemeKey] || READER_THEMES.alabaster;
  const chapter = book.chapters[currentChapterIdx] || book.chapters[0];

  const handleCopyQuote = (quote: string) => {
    navigator.clipboard.writeText(quote);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Detect user text selection
  const handleCheckSelection = () => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) {
      setSelectionBox(null);
      return;
    }

    const text = sel.toString().trim();
    if (text.length >= 3) {
      setSelectedText(text);
      try {
        const range = sel.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setSelectionBox({
          x: Math.max(16, Math.min(window.innerWidth - 180, rect.left + rect.width / 2 - 70)),
          y: Math.max(60, rect.top - 48)
        });
      } catch {
        setSelectionBox(null);
      }
    } else {
      setSelectionBox(null);
    }
  };

  const handleOpenSaveQuoteModal = (textToSave?: string) => {
    const text = textToSave || selectedText;
    if (!text) return;
    setSelectedText(text);
    setQuoteNote('');
    setIsQuoteModalOpen(true);
    setSelectionBox(null);
    setActiveHighlightNote(null);
  };

  const handleConfirmSaveQuote = () => {
    if (!selectedText.trim()) return;

    if (onSaveQuote) {
      onSaveQuote({
        text: selectedText.trim(),
        chapter: `Chapter 0${chapter.id}: ${chapter.title}`,
        page: 114,
        note: quoteNote.trim() || 'Saved passage from reader',
        color: quoteColor
      });
    }

    setIsQuoteModalOpen(false);
    setSelectedText('');
    setQuoteNote('');
    if (window.getSelection()) {
      window.getSelection()?.removeAllRanges();
    }

    setToastMessage('Quote card saved to Table of Contents!');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const getLineHeightClass = () => {
    if (lineHeight === 'loose') return 'leading-loose';
    if (lineHeight === 'normal') return 'leading-normal';
    return 'leading-relaxed';
  };

  const getFontFamilyClass = () => {
    if (fontFamily === 'display') return 'font-display';
    if (fontFamily === 'sans') return 'font-sans';
    if (fontFamily === 'mono') return 'font-mono';
    return 'font-serif';
  };

  return (
    <div
      style={{ backgroundColor: theme.hexBg, color: theme.hexText }}
      className="flex-1 flex flex-col h-full relative overflow-hidden transition-colors duration-300"
    >
      {/* Top Reading Header (Minimalist & Unobtrusive) */}
      <header
        className={`px-4 py-2 border-b ${theme.borderClass} shrink-0 flex items-center justify-between z-20 backdrop-blur-md`}
      >
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity rounded-full cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
        </button>

        <button
          type="button"
          onClick={onOpenTableOfContents}
          className="text-center truncate px-2 max-w-[200px] hover:opacity-80 transition-opacity cursor-pointer"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest block opacity-60">
            Chapter 0{chapter.id}
          </span>
          <span className="text-xs font-serif font-medium truncate block">
            {chapter.title}
          </span>
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsBookmarked(!isBookmarked)}
            aria-label="Bookmark page"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current opacity-100' : ''}`} />
          </button>
          <button
            type="button"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            aria-label="Reader settings"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <Type className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </header>

      {/* Main Prose Reading Column (Constrained to 65-75ch Measure) */}
      <div
        ref={proseContainerRef}
        onMouseUp={handleCheckSelection}
        onTouchEnd={handleCheckSelection}
        className="flex-1 overflow-y-auto px-6 py-8 selection:bg-amber-300/40 dark:selection:bg-amber-500/30"
      >
        <div className="max-w-prose mx-auto">
          {/* Chapter Opening Header */}
          <div className="text-center mb-8 pb-6 border-b border-dashed border-current opacity-30">
            <span className="text-[11px] font-mono tracking-widest uppercase block mb-1">
              Part II · {book.title}
            </span>
            <h1 className="font-serif text-2xl font-bold tracking-tight mb-1">
              {chapter.title}
            </h1>
            <p className="text-xs italic opacity-75 font-serif">
              {chapter.subtitle}
            </p>
          </div>

          {/* Body Prose dynamically rendered from chapter content */}
          <div
            style={{ fontSize: `${fontSize}px` }}
            className={`${getFontFamilyClass()} ${getLineHeightClass()} space-y-5 select-text`}
          >
            {chapter.content && chapter.content.length > 0 ? (
              chapter.content.map((para, pIdx) => (
                <p
                  key={pIdx}
                  className={pIdx === 0 ? 'drop-cap' : ''}
                >
                  {para}
                </p>
              ))
            ) : (
              <p className="drop-cap">
                Fang Yuan circulated his spirit Qi through the thirty-six major meridians, feeling the resonance of the sword intent deep within his dantian.
              </p>
            )}

            {/* Translator's Footnote for Web Novel / Light Novel terminology */}
            {chapter.translatorNote && (
              <div className="mt-8 p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs transition-colors">
                <span className="font-mono font-semibold uppercase text-amber-500 block mb-1">
                  Translator's Footnote
                </span>
                <p className="opacity-90 leading-relaxed font-sans">{chapter.translatorNote}</p>
              </div>
            )}

            {/* Chapter Navigation Controls */}
            <div className="mt-10 pt-6 border-t border-current/20 flex items-center justify-between">
              <button
                type="button"
                disabled={currentChapterIdx <= 0}
                onClick={() => {
                  if (currentChapterIdx > 0) {
                    setCurrentChapterIdx(prev => prev - 1);
                    proseContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
                  currentChapterIdx <= 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-amber-500/10'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev Chapter</span>
              </button>

              <span className="text-[11px] font-mono opacity-60">
                Ch. {chapter.id} / {book.chapters.length}
              </span>

              <button
                type="button"
                disabled={currentChapterIdx >= book.chapters.length - 1}
                onClick={() => {
                  if (currentChapterIdx < book.chapters.length - 1) {
                    setCurrentChapterIdx(prev => prev + 1);
                    proseContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
                  currentChapterIdx >= book.chapters.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-amber-500/10'
                }`}
              >
                <span>Next Chapter</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Floating Selection Tooltip */}
      {selectionBox && (
        <div
          style={{ top: `${selectionBox.y}px`, left: `${selectionBox.x}px` }}
          className="fixed z-40 bg-stone-900 text-stone-100 rounded-xl px-2 py-1.5 shadow-xl border border-stone-700 flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-150"
        >
          <button
            type="button"
            onClick={() => handleOpenSaveQuoteModal()}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors cursor-pointer"
          >
            <QuoteIcon className="w-3.5 h-3.5 fill-current" />
            <span>Save Quote Card</span>
          </button>
          <button
            type="button"
            onClick={() => handleCopyQuote(selectedText)}
            className="px-2 py-1 text-xs rounded-lg hover:bg-stone-800 text-stone-300 transition-colors cursor-pointer"
            title="Copy text"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectionBox(null);
              window.getSelection()?.removeAllRanges();
            }}
            className="px-1.5 py-1 text-xs rounded-lg hover:bg-stone-800 text-stone-400 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Active Highlight Drawer / Action Bar */}
      {activeHighlightNote && (
        <div className="absolute bottom-16 left-4 right-4 bg-stone-900 text-stone-100 rounded-2xl p-4 shadow-2xl z-30 border border-stone-700 flex flex-col gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
              Reader Annotation & Highlight
            </span>
            <button
              onClick={() => setActiveHighlightNote(null)}
              className="text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs font-serif italic text-stone-200 leading-relaxed">
            “{activeHighlightNote}”
          </p>
          <p className="text-[11px] text-stone-400">
            Personal Note: Stunning metaphor on impermanence and grief in northern latitudes.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-stone-800">
            <button
              type="button"
              onClick={() => handleOpenSaveQuoteModal(activeHighlightNote)}
              className="px-3 py-1.5 text-xs bg-amber-500 text-stone-950 font-medium hover:bg-amber-400 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <QuoteIcon className="w-3.5 h-3.5 fill-current" />
              <span>Save as Quote Card</span>
            </button>
            <button
              type="button"
              onClick={() => handleCopyQuote(activeHighlightNote)}
              className="px-2.5 py-1.5 text-xs bg-stone-800 hover:bg-stone-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{isCopied ? 'Copied' : 'Copy'}</span>
            </button>
            {onOpenStudioWithPrompt && (
              <button
                type="button"
                onClick={() => {
                  onOpenStudioWithPrompt(
                    `Solitary granite coastline at twilight with turbulent tidal swell, minimalist fine art book illustration, muted Nordic tones`
                  );
                }}
                className="px-2.5 py-1.5 text-xs bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                <span>Visualize Scene</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Save Quote Card Dialog Modal */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div
            className={`w-full max-w-sm rounded-2xl p-5 border shadow-2xl transition-all ${
              isDark
                ? 'bg-[#121214] border-stone-800 text-stone-100'
                : 'bg-white border-stone-200 text-stone-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/60 dark:border-stone-800 mb-3">
              <div className="flex items-center gap-2">
                <QuoteIcon className="w-4 h-4 text-amber-500" />
                <h3 className="font-serif font-semibold text-sm">Save as Quote Card</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsQuoteModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quote Card Excerpt Preview */}
            <div
              className={`p-3.5 rounded-xl border mb-3 ${
                isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-stone-50 border-stone-200/80'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 mb-1.5">
                <span>Chapter 0{chapter.id} · Pg 114</span>
                <span className="text-amber-500 font-medium">Excerpt</span>
              </div>
              <blockquote className="font-serif italic text-xs leading-relaxed text-stone-800 dark:text-stone-200 pl-2.5 border-l-2 border-amber-500">
                “{selectedText}”
              </blockquote>
            </div>

            {/* Optional Margin Note */}
            <div className="mb-4">
              <label className="text-[11px] font-mono text-stone-400 block mb-1.5">
                Personal Margin Note (Optional)
              </label>
              <input
                type="text"
                value={quoteNote}
                onChange={(e) => setQuoteNote(e.target.value)}
                placeholder="e.g., Striking metaphor on northern impermanence..."
                className={`w-full text-xs px-3 py-2 rounded-lg border outline-none transition-colors ${
                  isDark
                    ? 'bg-stone-900 border-stone-800 text-stone-100 focus:border-amber-400'
                    : 'bg-stone-50 border-stone-200 text-stone-900 focus:border-stone-800'
                }`}
                autoFocus
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsQuoteModalOpen(false)}
                className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  isDark
                    ? 'border-stone-800 hover:bg-stone-900 text-stone-300'
                    : 'border-stone-200 hover:bg-stone-100 text-stone-700'
                }`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSaveQuote}
                className="flex-1 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Quote Card</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification Toast with Direct Index Link */}
      {toastMessage && (
        <div className="fixed bottom-18 left-4 right-4 z-50 flex items-center justify-between p-3 rounded-xl bg-stone-900 text-stone-100 shadow-2xl border border-stone-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs truncate">{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={onOpenTableOfContents}
            className="text-xs font-mono font-medium text-amber-400 hover:underline shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <span>View in Index</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Reader Bottom Scrub Bar (Progress & Navigation) */}
      <footer
        className={`px-5 py-2.5 border-t ${theme.borderClass} shrink-0 flex items-center justify-between text-xs font-mono opacity-80 backdrop-blur-md`}
      >
        <button
          type="button"
          disabled={currentChapterIdx === 0}
          onClick={() => setCurrentChapterIdx(Math.max(0, currentChapterIdx - 1))}
          className="min-h-[44px] flex items-center gap-1 hover:opacity-100 disabled:opacity-30 cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Prev</span>
        </button>

        <div className="flex flex-col items-center">
          <div className="w-28 h-1 bg-current opacity-20 rounded-full overflow-hidden mb-1">
            <div
              style={{ width: `${book.progressPercent}%` }}
              className="h-full bg-current opacity-90 rounded-full"
            />
          </div>
          <span className="text-[10px] tabular-nums">
            Pg 114 · 14m left in ch. 3
          </span>
        </div>

        <button
          type="button"
          disabled={currentChapterIdx === book.chapters.length - 1}
          onClick={() => setCurrentChapterIdx(Math.min(book.chapters.length - 1, currentChapterIdx + 1))}
          className="min-h-[44px] flex items-center gap-1 hover:opacity-100 disabled:opacity-30 cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </footer>

      {/* Reader Settings Drawer / Bottom Sheet */}
      {isSettingsOpen && (
        <div className="absolute inset-x-0 bottom-0 bg-stone-900 text-stone-100 rounded-t-3xl p-5 shadow-2xl z-40 border-t border-stone-800 animate-in slide-in-from-bottom duration-200">
          <div className="w-10 h-1 bg-stone-700 rounded-full mx-auto mb-4" />

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400">
              Reading Typography & Atmosphere
            </h3>
            <button
              type="button"
              onClick={() => setIsSettingsOpen(false)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Theme Palette Swatches */}
          <div className="mb-4">
            <span className="text-[11px] font-mono text-stone-400 block mb-2">
              Color Atmosphere
            </span>
            <div className="grid grid-cols-4 gap-2">
              {Object.values(READER_THEMES).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setCurrentThemeKey(t.id)}
                  style={{ backgroundColor: t.hexBg, color: t.hexText }}
                  className={`min-h-[44px] py-2 px-1 rounded-xl text-[11px] font-serif border flex flex-col items-center justify-center transition-all cursor-pointer ${
                    currentThemeKey === t.id
                      ? 'ring-2 ring-amber-400 shadow-md scale-102 border-amber-400'
                      : 'border-stone-700 opacity-80'
                  }`}
                >
                  <span className="font-semibold text-xs">Aa</span>
                  <span className="text-[9px] mt-0.5 truncate max-w-full px-1">
                    {t.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Font Family Selector */}
          <div className="mb-4">
            <span className="text-[11px] font-mono text-stone-400 block mb-2">
              Typeface
            </span>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'serif', label: 'Newsreader', class: 'font-serif' },
                { id: 'display', label: 'Playfair', class: 'font-display' },
                { id: 'sans', label: 'Jakarta', class: 'font-sans' },
                { id: 'mono', label: 'Mono', class: 'font-mono' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFontFamily(f.id as any)}
                  className={`min-h-[44px] py-1.5 px-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    fontFamily === f.id
                      ? 'bg-stone-100 text-stone-900 font-semibold'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  } ${f.class}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size Slider */}
          <div className="mb-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mb-1.5">
              <span>Text Size</span>
              <span className="tabular-nums">{fontSize}px</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs">A</span>
              <input
                type="range"
                min="14"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                className="flex-1 accent-amber-500 h-1.5 bg-stone-700 rounded-lg cursor-pointer"
              />
              <span className="text-lg font-serif">A</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
