import React, { useState } from 'react';
import { Search, BookOpen, Star, ArrowRight, Sparkles, Moon, Sun } from 'lucide-react';
import { Book, NOVEL_BOOKS } from '../data/novelData';

interface ScreenExploreProps {
  onSelectBook: (book: Book) => void;
  onOpenReader: (book: Book) => void;
  onOpenAudio?: (book: Book) => void;
  onOpenStudio?: () => void;
  isDark?: boolean;
  onToggleDarkMode?: () => void;
}

export const ScreenExplore: React.FC<ScreenExploreProps> = ({
  onSelectBook,
  onOpenReader,
  isDark = false,
  onToggleDarkMode
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const featuredBook = NOVEL_BOOKS[0]; // Solitude by the Sea

  const genres = [
    { id: 'all', label: 'All Curated' },
    { id: 'Nordic Fiction', label: 'Nordic Fiction' },
    { id: 'Neo-Noir', label: 'Neo-Noir' },
    { id: 'Japanese Modern', label: 'Japanese Modern' },
  ];

  const filteredBooks = NOVEL_BOOKS.filter(book => {
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    const matchesSearch = searchQuery === '' ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <div
      className={`flex-1 flex flex-col transition-colors duration-200 overflow-y-auto pb-6 ${
        isDark ? 'bg-[#000000] text-stone-100' : 'bg-[#FAF8F5] text-stone-900'
      }`}
    >
      {/* Editorial App Header */}
      <header
        className={`px-5 pt-3 pb-3 border-b flex items-center justify-between sticky top-0 backdrop-blur-md z-10 ${
          isDark
            ? 'bg-[#000000]/90 border-neutral-900 text-stone-100'
            : 'bg-[#FAF8F5]/90 border-stone-200/70 text-stone-900'
        }`}
      >
        <div>
          <span
            className={`text-[10px] uppercase font-mono tracking-widest block ${
              isDark ? 'text-amber-400' : 'text-stone-400'
            }`}
          >
            Curated Literary Space
          </span>
          <h1 className="text-xl font-serif font-semibold tracking-tight">
            Sanctuary to Discover
          </h1>
        </div>

        <div className="flex items-center gap-1.5">
          {onToggleDarkMode && (
            <button
              type="button"
              onClick={onToggleDarkMode}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg transition-colors ${
                isDark ? 'text-amber-400 hover:bg-stone-800' : 'text-stone-600 hover:bg-stone-200/60'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search Catalog"
            className={`min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg transition-colors ${
              isDark ? 'text-stone-300 hover:bg-stone-800' : 'text-stone-600 hover:bg-stone-200/60'
            }`}
          >
            <Search className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </header>

      {/* Search Input Bar (Expandable) */}
      {isSearchOpen && (
        <div
          className={`px-5 py-2.5 border-b transition-all ${
            isDark ? 'bg-stone-900 border-stone-800' : 'bg-stone-100 border-stone-200'
          }`}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, author, or theme..."
            className={`w-full text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-1 ${
              isDark
                ? 'bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-500 focus:ring-amber-400'
                : 'bg-white border-stone-300 text-stone-900 placeholder:text-stone-400 focus:ring-stone-800'
            }`}
            autoFocus
          />
        </div>
      )}

      {/* Featured Monograph Spotlight (Hero Card) */}
      <section className="px-5 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-[10px] uppercase font-mono tracking-widest ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
            Featured Novel
          </span>
          <span className={`text-[10px] font-mono ${isDark ? 'text-amber-400' : 'text-stone-400'}`}>
            Curated Edition
          </span>
        </div>

        <div
          className={`border rounded-2xl p-4 shadow-sm relative overflow-hidden group ${
            isDark ? 'bg-[#18181C] border-stone-800' : 'bg-white border-stone-200/90'
          }`}
        >
          <div className="flex gap-4">
            {/* Book Cover Presentation */}
            <div
              onClick={() => onSelectBook(featuredBook)}
              className="w-24 h-36 shrink-0 rounded-lg overflow-hidden shadow-md cursor-pointer relative bg-stone-100 group-hover:shadow-lg transition-shadow"
            >
              <img
                src={featuredBook.coverImage}
                alt={featuredBook.title}
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
                  {featuredBook.genre}
                </span>
                <h2
                  onClick={() => onSelectBook(featuredBook)}
                  className={`font-serif text-base font-semibold leading-snug cursor-pointer transition-colors ${
                    isDark ? 'text-stone-100 group-hover:text-amber-400' : 'text-stone-900 group-hover:underline'
                  }`}
                >
                  {featuredBook.title}
                </h2>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  by {featuredBook.author}
                </p>

                <div className={`flex items-center gap-1.5 text-[11px] mt-2 font-mono tabular-nums ${isDark ? 'text-stone-400' : 'text-stone-400'}`}>
                  <span>{featuredBook.totalPages} pgs</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredBook.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span className={`flex items-center gap-0.5 ${isDark ? 'text-stone-200' : 'text-stone-700'}`}>
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500 inline" />
                    {featuredBook.rating}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className={`flex items-center gap-2 mt-3 pt-2 border-t ${isDark ? 'border-stone-800' : 'border-stone-100'}`}>
                <button
                  type="button"
                  onClick={() => onOpenReader(featuredBook)}
                  className={`min-h-[40px] px-3.5 py-1.5 text-xs font-medium rounded-lg transition-transform active:scale-95 shadow-xs flex items-center gap-1.5 ${
                    isDark
                      ? 'bg-amber-400 text-stone-950 hover:bg-amber-300 font-semibold'
                      : 'bg-stone-900 text-stone-50 hover:bg-stone-800'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Start Reading</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Genre Filter Tabs */}
      <section className="px-5 pt-2 pb-1">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
          {genres.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setSelectedGenre(g.id)}
              className={`min-h-[38px] px-3.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap shrink-0 ${
                selectedGenre === g.id
                  ? isDark
                    ? 'bg-amber-400 text-stone-950 font-semibold shadow-xs'
                    : 'bg-stone-900 text-stone-50 shadow-xs'
                  : isDark
                  ? 'bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-stone-200'
                  : 'bg-stone-200/60 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </section>

      {/* Curated Catalog Grid */}
      <section className="px-5 pt-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className={`font-serif text-sm font-semibold tracking-tight ${isDark ? 'text-stone-200' : 'text-stone-900'}`}>
            Discover Titles
          </h3>
          <span className={`text-[11px] font-mono ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
            {filteredBooks.length} titles
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => onSelectBook(book)}
              className={`flex flex-col border rounded-xl p-2.5 cursor-pointer transition-colors group shadow-2xs ${
                isDark
                  ? 'bg-[#18181C] border-stone-800 hover:border-stone-700'
                  : 'bg-white border-stone-200/80 hover:border-stone-400'
              }`}
            >
              <div
                className={`aspect-[3/4] w-full rounded-lg overflow-hidden relative mb-2.5 ${
                  isDark ? 'bg-stone-800' : 'bg-stone-100'
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
                <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-stone-950/80 text-[9px] font-mono text-stone-100 rounded backdrop-blur-xs">
                  {book.readTime}
                </span>
              </div>

              <h4
                className={`font-serif text-xs font-semibold leading-tight line-clamp-1 transition-colors ${
                  isDark ? 'text-stone-200 group-hover:text-amber-400' : 'text-stone-900 group-hover:underline'
                }`}
              >
                {book.title}
              </h4>
              <p className={`text-[11px] mt-0.5 truncate ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                {book.author}
              </p>

              <div
                className={`flex items-center justify-between mt-2 pt-2 border-t text-[10px] font-mono ${
                  isDark ? 'border-stone-800 text-stone-400' : 'border-stone-100 text-stone-400'
                }`}
              >
                <span>{book.genre}</span>
                <span className={`flex items-center gap-0.5 ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                  <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                  {book.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
