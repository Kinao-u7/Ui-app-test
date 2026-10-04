import React, { useState } from 'react';
import { Bookmark, LayoutGrid, List, CheckCircle2, ArrowRight, Flame, Trophy, Clock, Download, Share2 } from 'lucide-react';
import { Book, NOVEL_BOOKS } from '../data/novelData';

interface ScreenBookshelfProps {
  onSelectBook: (book: Book) => void;
  onOpenReader: (book: Book) => void;
}

export const ScreenBookshelf: React.FC<ScreenBookshelfProps> = ({
  onSelectBook,
  onOpenReader
}) => {
  const [activeTab, setActiveTab] = useState<'reading' | 'wishlist' | 'finished' | 'offline'>('reading');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const readingBooks = NOVEL_BOOKS.filter(b => b.progressPercent > 0 && b.progressPercent < 100);
  const finishedBooks = NOVEL_BOOKS.filter(b => b.progressPercent >= 90);
  const wishlistBooks = NOVEL_BOOKS.slice(2, 4);

  const displayedBooks =
    activeTab === 'reading'
      ? readingBooks
      : activeTab === 'finished'
      ? finishedBooks
      : activeTab === 'wishlist'
      ? wishlistBooks
      : NOVEL_BOOKS.slice(0, 2);

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F5] text-stone-900 overflow-y-auto pb-6">
      {/* Top Sanctuary Header */}
      <header className="px-5 pt-3 pb-3 border-b border-stone-200/70 sticky top-0 bg-[#FAF8F5]/90 backdrop-blur-md z-10 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block">
            Personal Archive
          </span>
          <h1 className="text-xl font-serif font-semibold tracking-tight text-stone-900">
            My Sanctuary
          </h1>
        </div>

        <div className="flex items-center gap-1 bg-stone-200/70 p-0.5 rounded-lg">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            aria-label="Grid View"
            className={`min-h-[36px] min-w-[36px] flex items-center justify-center rounded-md transition-colors ${
              viewMode === 'grid' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-500'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            aria-label="List View"
            className={`min-h-[36px] min-w-[36px] flex items-center justify-center rounded-md transition-colors ${
              viewMode === 'list' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-500'
            }`}
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Reader Velocity & Milestone Tracker */}
      <section className="px-5 pt-4 pb-2">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
              2026 Reading Milestone
            </span>
            <span className="text-[11px] font-mono font-semibold text-stone-800 tabular-nums">
              14 / 25 Books Completed
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden mb-3">
            <div className="h-full bg-stone-900 rounded-full" style={{ width: '56%' }} />
          </div>

          {/* Unboxed 3-Metric Distribution */}
          <div className="grid grid-cols-3 pt-2 border-t border-stone-100 text-center font-mono tabular-nums">
            <div>
              <span className="text-[10px] text-stone-400 block uppercase">Streak</span>
              <span className="text-sm font-semibold text-stone-900 flex items-center justify-center gap-1 mt-0.5">
                <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                24 Days
              </span>
            </div>
            <div className="border-x border-stone-100">
              <span className="text-[10px] text-stone-400 block uppercase">This Week</span>
              <span className="text-sm font-semibold text-stone-900 flex items-center justify-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-stone-600" />
                6.8 hrs
              </span>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 block uppercase">Velocity</span>
              <span className="text-sm font-semibold text-stone-900 flex items-center justify-center gap-1 mt-0.5">
                <Trophy className="w-3.5 h-3.5 text-stone-600" />
                52 wpm
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bookshelf Tabs */}
      <section className="px-5 pt-3 pb-1">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'reading', label: 'Currently Reading' },
            { id: 'wishlist', label: 'Sanctuary Wishlist' },
            { id: 'finished', label: 'Archived Classics' },
            { id: 'offline', label: 'Downloaded' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id as any)}
              className={`min-h-[44px] px-3.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                activeTab === t.id
                  ? 'bg-stone-900 text-stone-50 shadow-xs'
                  : 'bg-stone-200/60 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* Book List / Grid Display */}
      <section className="px-5 pt-3">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-3.5">
            {displayedBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => onSelectBook(book)}
                className="bg-white border border-stone-200/80 rounded-xl p-2.5 cursor-pointer hover:border-stone-400 transition-colors group shadow-2xs"
              >
                <div className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-stone-100 relative mb-2">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-stone-900/80 text-white text-[9px] font-mono rounded backdrop-blur-xs">
                    {book.progressPercent}%
                  </div>
                </div>

                <h4 className="font-serif text-xs font-semibold leading-tight text-stone-900 line-clamp-1 group-hover:underline">
                  {book.title}
                </h4>
                <p className="text-[11px] text-stone-500 mt-0.5 truncate">
                  {book.author}
                </p>

                <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] font-mono text-stone-400">
                  <span>Ch. {book.currentChapter}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenReader(book);
                    }}
                    className="text-stone-900 font-semibold hover:underline"
                  >
                    Resume
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-stone-200/70 border-t border-b border-stone-200/70">
            {displayedBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => onSelectBook(book)}
                className="py-3 flex items-center justify-between cursor-pointer hover:bg-stone-100/60 px-1"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-14 rounded overflow-hidden shrink-0 bg-stone-200">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-xs font-semibold text-stone-900">
                      {book.title}
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      {book.author}
                    </p>
                    <span className="text-[10px] font-mono text-stone-400">
                      Progress: {book.progressPercent}% · Ch. {book.currentChapter}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenReader(book);
                  }}
                  className="min-h-[44px] px-3 text-xs font-medium text-stone-900 hover:underline flex items-center gap-1"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Export Marginalia & Reading Insights */}
      <section className="px-5 pt-6">
        <div className="bg-[#F3EFEA] border border-stone-200/80 rounded-xl p-3.5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-stone-900 block font-serif">
              Export Atelier Marginalia
            </span>
            <span className="text-[11px] text-stone-500 block">
              Download notes, quotes & ciphers in Markdown / PDF
            </span>
          </div>
          <button
            type="button"
            onClick={() => alert('Annotations exported to Atelier Markdown ledger.')}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-800 hover:text-stone-950 rounded-lg border border-stone-300 bg-white"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
