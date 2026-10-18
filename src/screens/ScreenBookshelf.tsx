import React, { useState } from 'react';
import { LayoutGrid, List, ArrowRight, Moon, Sun, CheckCircle2, Settings, Star, BookOpen } from 'lucide-react';
import { Book, NOVEL_BOOKS } from '../data/novelData';

interface ScreenBookshelfProps {
  onSelectBook: (book: Book) => void;
  onOpenReader: (book: Book) => void;
  onOpenSettings?: () => void;
  isDark?: boolean;
  onToggleDarkMode?: () => void;
}

export const ScreenBookshelf: React.FC<ScreenBookshelfProps> = ({
  onSelectBook,
  onOpenReader,
  onOpenSettings,
  isDark = false,
  onToggleDarkMode
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'reading' | 'finished'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const readingBooks = NOVEL_BOOKS.filter(b => b.progressPercent > 0 && b.progressPercent < 100);
  const finishedBooks = NOVEL_BOOKS.filter(b => b.progressPercent >= 80);
  const currentReadingBook = readingBooks[0] || NOVEL_BOOKS[0];

  const displayedBooks =
    activeTab === 'reading'
      ? readingBooks
      : activeTab === 'finished'
      ? finishedBooks
      : NOVEL_BOOKS; // Shows all 9 books in 3x3 layout

  return (
    <div
      className={`flex-1 flex flex-col transition-colors duration-200 overflow-y-auto pb-8 ${
        isDark ? 'bg-[#000000] text-stone-100' : 'bg-[#FAF8F5] text-stone-900'
      }`}
    >
      {/* Top Library Header */}
      <header
        className={`px-4 pt-3 pb-3 border-b sticky top-0 backdrop-blur-md z-10 flex items-center justify-between ${
          isDark
            ? 'bg-[#000000]/90 border-neutral-900 text-stone-100'
            : 'bg-[#FAF8F5]/90 border-stone-200/70 text-stone-900'
        }`}
      >
        <div>
          <span
            className={`text-[10px] font-mono uppercase tracking-widest block ${
              isDark ? 'text-amber-400' : 'text-stone-400'
            }`}
          >
            Personal Archive
          </span>
          <h1 className="text-xl font-serif font-semibold tracking-tight">
            Library
          </h1>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Dark Mode Quick Toggle */}
          {onToggleDarkMode && (
            <button
              type="button"
              onClick={onToggleDarkMode}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg transition-colors ${
                isDark
                  ? 'text-amber-400 bg-stone-800 hover:bg-stone-700'
                  : 'text-stone-600 bg-stone-200/70 hover:bg-stone-300'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          {/* Settings Button */}
          {onOpenSettings && (
            <button
              type="button"
              onClick={onOpenSettings}
              aria-label="Open Settings"
              className={`min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg transition-colors ${
                isDark
                  ? 'text-stone-300 bg-stone-800 hover:bg-stone-700 hover:text-white'
                  : 'text-stone-600 bg-stone-200/70 hover:bg-stone-300 hover:text-stone-900'
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>
          )}

          {/* Grid / List Switcher */}
          <div
            className={`flex items-center p-0.5 rounded-lg border ${
              isDark ? 'bg-stone-900 border-stone-800' : 'bg-stone-200/70 border-stone-200'
            }`}
          >
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              aria-label="3x3 Grid View"
              className={`min-h-[32px] min-w-[32px] flex items-center justify-center rounded-md transition-all ${
                viewMode === 'grid'
                  ? isDark
                    ? 'bg-stone-800 text-stone-100 shadow-xs'
                    : 'bg-white text-stone-900 shadow-xs'
                  : isDark
                  ? 'text-stone-400 hover:text-stone-200'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              aria-label="List View"
              className={`min-h-[32px] min-w-[32px] flex items-center justify-center rounded-md transition-all ${
                viewMode === 'list'
                  ? isDark
                    ? 'bg-stone-800 text-stone-100 shadow-xs'
                    : 'bg-white text-stone-900 shadow-xs'
                  : isDark
                  ? 'text-stone-400 hover:text-stone-200'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Continue Reading Spotlight (Exact Featured Novel Card Style) */}
      <section className="px-4 pt-3.5 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-[10px] uppercase font-mono tracking-widest ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
            Continue Reading
          </span>
          <span className={`text-[10px] font-mono ${isDark ? 'text-amber-400' : 'text-stone-400'}`}>
            {currentReadingBook.progressPercent}% Completed
          </span>
        </div>

        <div
          className={`border rounded-2xl p-4 shadow-sm relative overflow-hidden group ${
            isDark ? 'bg-[#0D0D0D] border-neutral-900' : 'bg-white border-stone-200/90'
          }`}
        >
          <div className="flex gap-4">
            {/* Book Cover Presentation */}
            <div
              onClick={() => onSelectBook(currentReadingBook)}
              className="w-24 h-36 shrink-0 rounded-lg overflow-hidden shadow-md cursor-pointer relative bg-stone-100 group-hover:shadow-lg transition-shadow"
            >
              <img
                src={currentReadingBook.coverImage}
                alt={currentReadingBook.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-1 left-1.5 w-1.5 h-3 bg-amber-600 rounded-b-sm shadow-sm" />
            </div>

            {/* Book Metadata */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span
                  className={`text-[10px] font-medium tracking-wide block mb-0.5 ${
                    isDark ? 'text-amber-400' : 'text-amber-800'
                  }`}
                >
                  {currentReadingBook.genre}
                </span>
                <h2
                  onClick={() => onSelectBook(currentReadingBook)}
                  className={`font-serif text-base font-semibold leading-snug cursor-pointer transition-colors ${
                    isDark ? 'text-stone-100 group-hover:text-amber-400' : 'text-stone-900 group-hover:underline'
                  }`}
                >
                  {currentReadingBook.title}
                </h2>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  by {currentReadingBook.author}
                </p>

                <div className={`flex items-center gap-1.5 text-[11px] mt-2 font-mono tabular-nums ${isDark ? 'text-stone-400' : 'text-stone-400'}`}>
                  <span>Ch. {currentReadingBook.currentChapter}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentReadingBook.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span className={`flex items-center gap-0.5 ${isDark ? 'text-stone-200' : 'text-stone-700'}`}>
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500 inline" />
                    {currentReadingBook.rating}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className={`flex items-center gap-2 mt-3 pt-2 border-t ${isDark ? 'border-neutral-900' : 'border-stone-100'}`}>
                <button
                  type="button"
                  onClick={() => onOpenReader(currentReadingBook)}
                  className={`min-h-[40px] px-3.5 py-1.5 text-xs font-medium rounded-lg transition-transform active:scale-95 shadow-xs flex items-center gap-1.5 ${
                    isDark
                      ? 'bg-amber-400 text-stone-950 hover:bg-amber-300 font-semibold'
                      : 'bg-stone-900 text-stone-50 hover:bg-stone-800'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Resume Reading</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-4 pt-2 pb-1">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: `All Novels (${NOVEL_BOOKS.length})` },
            { id: 'reading', label: `Continue Reading (${readingBooks.length})` },
            { id: 'finished', label: `Finished (${finishedBooks.length})` },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id as any)}
              className={`min-h-[36px] px-3 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                activeTab === t.id
                  ? isDark
                    ? 'bg-amber-400 text-stone-950 font-semibold shadow-xs'
                    : 'bg-stone-900 text-stone-50 shadow-xs'
                  : isDark
                  ? 'bg-stone-800/80 text-stone-400 hover:bg-stone-800 hover:text-stone-200'
                  : 'bg-stone-200/60 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* Novel Display (3x3 Minimal Grid OR Minimal List) */}
      <section className="px-4 pt-3 flex-1">
        {viewMode === 'grid' ? (
          /* 3x3 Minimal Grid */
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {displayedBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => onSelectBook(book)}
                className="group cursor-pointer flex flex-col transition-transform active:scale-[0.98]"
              >
                {/* Minimal Cover */}
                <div
                  className={`aspect-[3/4] w-full rounded-lg overflow-hidden relative shadow-sm border mb-1.5 ${
                    isDark ? 'bg-stone-800 border-stone-800/80' : 'bg-stone-100 border-stone-200/80'
                  }`}
                >
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  
                  {/* Subtle minimal progress bar along bottom of cover */}
                  {book.progressPercent > 0 && (
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-black/40">
                      <div
                        className={`h-full ${isDark ? 'bg-amber-400' : 'bg-white'}`}
                        style={{ width: `${book.progressPercent}%` }}
                      />
                    </div>
                  )}

                  {book.progressPercent >= 80 && (
                    <div className="absolute top-1 right-1 p-0.5 bg-emerald-600/90 text-white rounded-full">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>

                {/* Minimal Title & Author */}
                <h4
                  className={`font-serif text-[11px] sm:text-xs font-semibold leading-tight line-clamp-1 transition-colors ${
                    isDark ? 'text-stone-200 group-hover:text-amber-400' : 'text-stone-900 group-hover:underline'
                  }`}
                >
                  {book.title}
                </h4>
                <p className={`text-[10px] truncate mt-0.5 ${isDark ? 'text-stone-500' : 'text-stone-500'}`}>
                  {book.author}
                </p>
              </div>
            ))}
          </div>
        ) : (
          /* Minimal List View - Bigger Cover, No Read button, Shows Chapters Count */
          <div
            className={`divide-y border-t border-b ${
              isDark ? 'divide-neutral-900 border-neutral-900' : 'divide-stone-200/70 border-stone-200/70'
            }`}
          >
            {displayedBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => onSelectBook(book)}
                className={`py-3 flex items-center cursor-pointer px-1.5 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-stone-800/40' : 'hover:bg-stone-100/70'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  {/* Bigger Novel Cover (w-16 h-22) */}
                  <div
                    className={`w-16 h-22 rounded-lg overflow-hidden shrink-0 shadow-md border ${
                      isDark ? 'bg-stone-800 border-stone-700' : 'bg-stone-200 border-stone-300/60'
                    }`}
                  >
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Novel Information with Number of Chapters */}
                  <div className="min-w-0 flex-1">
                    <h4
                      className={`font-serif text-sm font-semibold truncate ${
                        isDark ? 'text-stone-100' : 'text-stone-900'
                      }`}
                    >
                      {book.title}
                    </h4>
                    <p className={`text-xs truncate mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                      by {book.author}
                    </p>

                    {/* Shows Number of Chapters instead of language/genre */}
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`text-[11px] font-mono px-2 py-0.5 rounded-md ${
                          isDark ? 'bg-stone-800 text-stone-300' : 'bg-stone-200/70 text-stone-700'
                        }`}
                      >
                        {book.chapters.length} Chapters
                      </span>
                      <span className={`text-[11px] font-mono ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                        {book.progressPercent}% read
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
