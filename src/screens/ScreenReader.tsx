import React, { useState } from 'react';
import { ArrowLeft, Type, Bookmark, Settings2, Sparkles, ChevronLeft, ChevronRight, X, Copy, Check } from 'lucide-react';
import { Book, READER_THEMES, ReaderTheme } from '../data/novelData';

interface ScreenReaderProps {
  book: Book;
  onBack: () => void;
  onOpenStudioWithPrompt?: (prompt: string) => void;
  onOpenTableOfContents: () => void;
  isDark?: boolean;
  onToggleDarkMode?: () => void;
}

export const ScreenReader: React.FC<ScreenReaderProps> = ({
  book,
  onBack,
  onOpenStudioWithPrompt,
  onOpenTableOfContents,
  isDark = false,
  onToggleDarkMode
}) => {
  const [currentThemeKey, setCurrentThemeKey] = useState<string>(isDark ? 'oled' : 'alabaster');

  React.useEffect(() => {
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

  const theme: ReaderTheme = READER_THEMES[currentThemeKey] || READER_THEMES.alabaster;
  const chapter = book.chapters[currentChapterIdx] || book.chapters[0];

  const handleCopyQuote = (quote: string) => {
    navigator.clipboard.writeText(quote);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
          className="min-h-[44px] min-w-[44px] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity rounded-full"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
        </button>

        <button
          type="button"
          onClick={onOpenTableOfContents}
          className="text-center truncate px-2 max-w-[200px] hover:opacity-80 transition-opacity"
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
            className="min-h-[44px] min-w-[44px] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current opacity-100' : ''}`} />
          </button>
          <button
            type="button"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            aria-label="Reader settings"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
          >
            <Type className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </header>

      {/* Main Prose Reading Column (Constrained to 65-75ch Measure) */}
      <div className="flex-1 overflow-y-auto px-6 py-8 selection:bg-amber-200/40">
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

          {/* Body Prose with Drop Cap and Highlight Interaction */}
          <div
            style={{ fontSize: `${fontSize}px` }}
            className={`${getFontFamilyClass()} ${getLineHeightClass()} space-y-5`}
          >
            <p className="drop-cap">
              Dawn brought no illumination, only a lightening of the heavy northern gray. The barometer in the vestibule had dropped twelve millibars between midnight and five, its brass needle shivering against the glass like a trapped moth.
            </p>

            <p>
              The sea was no longer blue or green; it was the color of lead fresh from the crucible. Each wave rose not with sudden violence, but with the measured, terrifying weight of displaced continents sliding across cold bedrock.
            </p>

            {/* Clickable Interactive Margin Highlight */}
            <div className="relative my-6 pl-4 border-l-2 border-amber-600/80 group">
              <p
                onClick={() =>
                  setActiveHighlightNote(
                    activeHighlightNote ? null : 'The shoreline does not end; it merely yields to the swell, surrendering its edges until the tide decides what may remain.'
                  )
                }
                className="italic cursor-pointer hover:opacity-90 bg-amber-500/10 px-2 py-1 rounded transition-colors"
              >
                “The shoreline does not end; it merely yields to the swell, surrendering its edges until the tide decides what may remain.”
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono opacity-60 mt-1">
                <span>Margin Note #14 · Tap to inspect</span>
                <span className="text-amber-700 font-semibold">Atelier Highlight</span>
              </div>
            </div>

            <p>
              I sat by the iron stove with a mug of chicory tea. Through the eight-millimeter pane, I watched the spray leap forty meters up the granite face, freezing into beads of crystalline brine against the glass before sliding downward like mercury.
            </p>

            <p>
              Granite, I had learned in thirty years of drafting, does not negotiate. It withstands or it fractures. The human mind, however, does neither; it erodes into smooth pebbles, rounded by the persistence of salt and silence.
            </p>

            <p>
              By noon, the radio operator at Kristiansand reported three drifting buoys off Lindesnes. I did not log them. In this outpost, recording the lost has always been secondary to keeping the hearth alive.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Active Highlight Drawer / Action Bar */}
      {activeHighlightNote && (
        <div className="absolute bottom-16 left-4 right-4 bg-stone-900 text-stone-100 rounded-2xl p-4 shadow-2xl z-30 border border-stone-700 flex flex-col gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
              Reader Annotation & Scene Prompt
            </span>
            <button
              onClick={() => setActiveHighlightNote(null)}
              className="text-stone-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs font-serif italic text-stone-200">
            “{activeHighlightNote}”
          </p>
          <p className="text-[11px] text-stone-400">
            Personal Note: Stunning metaphor on impermanence and grief in northern latitudes.
          </p>
          <div className="flex items-center gap-2 pt-1 border-t border-stone-800">
            <button
              type="button"
              onClick={() => handleCopyQuote(activeHighlightNote)}
              className="px-2.5 py-1 text-xs bg-stone-800 hover:bg-stone-700 rounded-md flex items-center gap-1.5 transition-colors"
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
                className="px-2.5 py-1 text-xs bg-amber-500 text-stone-950 font-medium hover:bg-amber-400 rounded-md flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                <span>Visualize Scene with AI</span>
              </button>
            )}
          </div>
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
          className="min-h-[44px] flex items-center gap-1 hover:opacity-100 disabled:opacity-30"
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
          className="min-h-[44px] flex items-center gap-1 hover:opacity-100 disabled:opacity-30"
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
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-400 hover:text-white"
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
                  className={`min-h-[44px] py-2 px-1 rounded-xl text-[11px] font-serif border flex flex-col items-center justify-center transition-all ${
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
                  className={`min-h-[44px] py-1.5 px-2 rounded-lg text-xs transition-colors ${
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
