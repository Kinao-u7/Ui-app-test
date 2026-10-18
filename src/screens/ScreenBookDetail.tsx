import React, { useState } from 'react';
import { ArrowLeft, Bookmark, Star, BookOpen, CheckCircle2, ChevronRight, Moon, Sun } from 'lucide-react';
import { Book } from '../data/novelData';

interface ScreenBookDetailProps {
  book: Book;
  onBack: () => void;
  onOpenReader: (book: Book) => void;
  onOpenAudio?: (book: Book) => void;
  onOpenStudio?: () => void;
  isDark?: boolean;
  onToggleDarkMode?: () => void;
}

export const ScreenBookDetail: React.FC<ScreenBookDetailProps> = ({
  book,
  onBack,
  onOpenReader,
  isDark = false,
  onToggleDarkMode
}) => {
  const [isSaved, setIsSaved] = useState(true);
  const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);

  return (
    <div
      className={`flex-1 flex flex-col transition-colors duration-300 overflow-y-auto pb-10 relative select-none ${
        isDark ? 'bg-[#000000] text-stone-100' : 'bg-[#FAF8F5] text-stone-900'
      }`}
    >
      {/* Ambient Atmospheric Backdrop Glow (Merges cover colors softly into background) */}
      <div
        className="absolute top-0 inset-x-0 h-96 pointer-events-none opacity-25 blur-3xl transition-opacity"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 20%, rgba(217, 119, 6, 0.25), rgba(0,0,0,0.85) 75%)'
            : 'radial-gradient(circle at 50% 20%, rgba(217, 119, 6, 0.15), rgba(250, 248, 245, 0.9) 75%)',
        }}
      />

      {/* Seamless Floating App Bar (No hard line border - floats naturally) */}
      <header className="px-4 pt-3 pb-2 sticky top-0 z-20 flex items-center justify-between backdrop-blur-md bg-opacity-80">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className={`min-h-[42px] min-w-[42px] flex items-center justify-center rounded-full transition-all ${
            isDark
              ? 'text-stone-300 hover:text-white bg-white/5 hover:bg-white/10'
              : 'text-stone-700 hover:text-stone-900 bg-stone-900/5 hover:bg-stone-900/10'
          }`}
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
        </button>

        <span
          className={`text-xs font-serif font-medium tracking-tight truncate max-w-[180px] opacity-80 ${
            isDark ? 'text-stone-200' : 'text-stone-800'
          }`}
        >
          {book.title}
        </span>

        <div className="flex items-center gap-1.5">
          {onToggleDarkMode && (
            <button
              type="button"
              onClick={onToggleDarkMode}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`min-h-[42px] min-w-[42px] flex items-center justify-center rounded-full transition-all ${
                isDark
                  ? 'text-amber-400 bg-white/5 hover:bg-white/10'
                  : 'text-stone-600 bg-stone-900/5 hover:bg-stone-900/10'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsSaved(!isSaved)}
            aria-label="Save book"
            className={`min-h-[42px] min-w-[42px] flex items-center justify-center rounded-full transition-all ${
              isDark
                ? 'text-stone-300 hover:text-white bg-white/5 hover:bg-white/10'
                : 'text-stone-700 hover:text-stone-900 bg-stone-900/5 hover:bg-stone-900/10'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? (isDark ? 'fill-amber-400 text-amber-400' : 'fill-stone-900 text-stone-900') : ''}`} />
          </button>
        </div>
      </header>

      {/* Book Cover Presentation Anchor (Seamless Hero Flow) */}
      <div className="pt-2 pb-5 px-6 flex flex-col items-center text-center relative z-10">
        <div
          className={`relative w-40 h-56 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group ${
            isDark
              ? 'shadow-[0_20px_50px_rgba(0,0,0,0.9)] ring-1 ring-white/10'
              : 'shadow-[0_20px_45px_rgba(40,30,20,0.18)] ring-1 ring-stone-900/5'
          }`}
        >
          <img
            src={book.coverImage}
            alt={book.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          {/* Subtle tactile gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10 pointer-events-none" />
          <div className="absolute top-0 right-3.5 w-3 h-6 bg-amber-600/90 shadow-md rounded-b-xs" />
        </div>

        {/* Seamless Typographic Deck */}
        <span
          className={`text-[11px] font-mono tracking-widest uppercase mt-5 mb-1.5 font-medium ${
            isDark ? 'text-amber-400' : 'text-amber-800'
          }`}
        >
          {book.genre} · {book.publishedYear}
        </span>

        <h1
          className={`font-serif text-2xl font-bold tracking-tight text-balance leading-snug px-2 ${
            isDark ? 'text-white' : 'text-stone-900'
          }`}
        >
          {book.title}
        </h1>

        <p className={`text-xs font-medium mt-1.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
          by {book.author}
        </p>

        {/* Minimal Unboxed Stats Pill */}
        <div
          className={`flex items-center gap-2.5 text-xs mt-3.5 px-3 py-1.5 rounded-full font-mono tabular-nums transition-colors ${
            isDark ? 'bg-white/5 text-stone-300' : 'bg-stone-200/60 text-stone-600'
          }`}
        >
          <span>{book.totalPages} Pages</span>
          <span className="opacity-40" aria-hidden="true">·</span>
          <span>{book.readTime}</span>
          <span className="opacity-40" aria-hidden="true">·</span>
          <span className={`flex items-center gap-1 font-semibold ${isDark ? 'text-amber-400' : 'text-stone-800'}`}>
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {book.rating}
          </span>
        </div>
      </div>

      {/* Primary Action Button - Seamlessly integrated */}
      <div className="px-6 py-2 relative z-10">
        <button
          type="button"
          onClick={() => onOpenReader(book)}
          className={`w-full min-h-[50px] text-xs font-semibold rounded-2xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg ${
            isDark
              ? 'bg-amber-400 text-black hover:bg-amber-300 shadow-amber-950/20'
              : 'bg-stone-900 text-white hover:bg-stone-800 shadow-stone-400/30'
          }`}
        >
          <BookOpen className="w-4 h-4 stroke-[2.2]" />
          <span>Enter Reading Chamber</span>
        </button>
      </div>

      {/* Synopsis Section - Seamlessly Blended */}
      <section className="px-6 pt-6 relative z-10">
        <h3 className={`text-[11px] font-mono uppercase tracking-widest mb-2 font-medium ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
          Synopsis
        </h3>
        <p
          className={`text-xs leading-relaxed font-serif transition-colors ${
            isDark ? 'text-stone-300' : 'text-stone-700'
          } ${isSynopsisExpanded ? '' : 'line-clamp-3'}`}
        >
          {book.synopsis}
        </p>
        <button
          type="button"
          onClick={() => setIsSynopsisExpanded(!isSynopsisExpanded)}
          className={`text-[11px] font-medium hover:underline mt-1.5 inline-block ${
            isDark ? 'text-amber-400' : 'text-stone-900'
          }`}
        >
          {isSynopsisExpanded ? 'Show Less' : 'Read Full Synopsis'}
        </button>
      </section>

      {/* Chapter Sequence - Smoothly Merged, No Boxy Borders */}
      <section className="px-6 pt-7 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-[11px] font-mono uppercase tracking-widest font-medium ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
            Chapter Sequence
          </h3>
          <span className={`text-[11px] font-mono tabular-nums ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
            {book.chapters.length} Chapters
          </span>
        </div>

        <div className="space-y-1">
          {book.chapters.map((ch) => (
            <div
              key={ch.id}
              onClick={() => onOpenReader(book)}
              className={`py-3 px-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                isDark
                  ? 'hover:bg-white/[0.06] active:bg-white/[0.08]'
                  : 'hover:bg-stone-200/50 active:bg-stone-200/70'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span className={`font-mono text-xs tabular-nums w-5 ${isDark ? 'text-stone-600' : 'text-stone-400'}`}>
                  0{ch.id}
                </span>
                <h4 className={`text-xs font-serif font-medium ${isDark ? 'text-stone-200' : 'text-stone-900'}`}>
                  {ch.title}
                </h4>
              </div>

              <div className="flex items-center gap-2.5">
                <span className={`text-[10px] font-mono tabular-nums ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
                  {ch.readTime}
                </span>
                {ch.isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <ChevronRight className={`w-3.5 h-3.5 ${isDark ? 'text-stone-700' : 'text-stone-300'}`} />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
