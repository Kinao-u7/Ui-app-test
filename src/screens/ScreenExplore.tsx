import React, { useState } from 'react';
import { Search, Compass, BookOpen, Clock, Star, ArrowRight, Play, Sparkles } from 'lucide-react';
import { Book, NOVEL_BOOKS } from '../data/novelData';

interface ScreenExploreProps {
  onSelectBook: (book: Book) => void;
  onOpenReader: (book: Book) => void;
  onOpenAudio: (book: Book) => void;
  onOpenStudio: () => void;
}

export const ScreenExplore: React.FC<ScreenExploreProps> = ({
  onSelectBook,
  onOpenReader,
  onOpenAudio,
  onOpenStudio
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
    <div className="flex-1 flex flex-col bg-[#FAF8F5] text-stone-900 overflow-y-auto pb-6">
      {/* Editorial App Header */}
      <header className="px-5 pt-2 pb-4 border-b border-stone-200/70 flex items-center justify-between sticky top-0 bg-[#FAF8F5]/90 backdrop-blur-md z-10">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 block">
            Autumn Reading · Vol. VIII
          </span>
          <h1 className="text-xl font-serif font-semibold tracking-tight text-stone-900">
            The Atelier Library
          </h1>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search Catalog"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-600 hover:text-stone-900 rounded-full hover:bg-stone-200/60 transition-colors"
          >
            <Search className="w-4 h-4 stroke-[2]" />
          </button>
          <button
            type="button"
            onClick={onOpenStudio}
            aria-label="Create AI Illustration"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-amber-800 hover:text-amber-950 rounded-full hover:bg-amber-100/60 transition-colors"
          >
            <Sparkles className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </header>

      {/* Search Input Bar (Expandable) */}
      {isSearchOpen && (
        <div className="px-5 py-2.5 bg-stone-100 border-b border-stone-200 transition-all">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, author, or theme..."
            className="w-full text-xs bg-white border border-stone-300 rounded-lg px-3 py-2 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-800"
            autoFocus
          />
        </div>
      )}

      {/* Featured Monograph Spotlight (Hero Card) */}
      <section className="px-5 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] uppercase font-mono tracking-widest text-stone-500">
            Monograph of the Season
          </span>
          <span className="text-[11px] font-mono text-stone-400">
            Atelier Curated
          </span>
        </div>

        <div className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-sm relative overflow-hidden group">
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
                  // Fallback styled container
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-1 left-1.5 w-1.5 h-3 bg-amber-600 rounded-b-sm shadow-sm" />
            </div>

            {/* Book Metadata & Decks */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-medium text-amber-800 tracking-wide block mb-0.5">
                  {featuredBook.genre}
                </span>
                <h2
                  onClick={() => onSelectBook(featuredBook)}
                  className="font-serif text-base font-semibold leading-snug text-stone-900 cursor-pointer hover:underline"
                >
                  {featuredBook.title}
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  by {featuredBook.author}
                </p>

                {/* Unboxed Metadata with Typographic Separators */}
                <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mt-2 font-mono tabular-nums">
                  <span>{featuredBook.totalPages} pgs</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredBook.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-0.5 text-stone-700">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500 inline" />
                    {featuredBook.rating}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-3 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => onOpenReader(featuredBook)}
                  className="min-h-[44px] px-3.5 py-1.5 bg-stone-900 text-stone-50 text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors flex items-center gap-1.5 active:scale-95 shadow-xs"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Chapter 3</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAudio(featuredBook)}
                  aria-label="Listen to audiobook snippet"
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-stone-200 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-stone-800" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Currently Reading Floating Shelf Tracker */}
      <section className="px-5 py-3">
        <div className="bg-[#F3EFEA] border border-stone-200/80 rounded-xl p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Circular Progress Ring */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-stone-300"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-stone-900"
                  strokeDasharray={`${featuredBook.progressPercent}, 100`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-[10px] font-mono font-semibold text-stone-900 tabular-nums">
                {featuredBook.progressPercent}%
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                Reading Session
              </span>
              <p className="text-xs font-semibold text-stone-900 leading-tight">
                {featuredBook.title}
              </p>
              <span className="text-[11px] text-stone-500">
                Chapter 3: Salt and Shadow
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenReader(featuredBook)}
            className="min-h-[44px] px-3 text-xs font-medium text-stone-800 hover:text-stone-950 flex items-center gap-1 active:translate-x-0.5 transition-transform"
          >
            <span>Resume</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Genre Filter Tabs (Functional Segmented Control) */}
      <section className="px-5 pt-2 pb-1">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
          {genres.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setSelectedGenre(g.id)}
              className={`min-h-[44px] px-3.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap shrink-0 ${
                selectedGenre === g.id
                  ? 'bg-stone-900 text-stone-50 shadow-xs'
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
          <h3 className="font-serif text-sm font-semibold tracking-tight text-stone-900">
            Selected Editions
          </h3>
          <span className="text-[11px] font-mono text-stone-400">
            {filteredBooks.length} titles
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => onSelectBook(book)}
              className="flex flex-col bg-white border border-stone-200/80 rounded-xl p-2.5 cursor-pointer hover:border-stone-400 transition-colors group shadow-2xs"
            >
              <div className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-stone-100 relative mb-2.5">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors" />
                <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-stone-900/80 text-[9px] font-mono text-stone-100 rounded backdrop-blur-xs">
                  {book.readTime}
                </span>
              </div>

              <h4 className="font-serif text-xs font-semibold leading-tight text-stone-900 line-clamp-1 group-hover:underline">
                {book.title}
              </h4>
              <p className="text-[11px] text-stone-500 mt-0.5 truncate">
                {book.author}
              </p>

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100 text-[10px] text-stone-400 font-mono">
                <span>{book.genre}</span>
                <span className="flex items-center gap-0.5 text-stone-700">
                  <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                  {book.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Quotation Footer Excerpt */}
      <section className="px-5 pt-6 pb-2">
        <blockquote className="border-l-2 border-stone-400 pl-3.5 py-1 text-stone-600 italic font-serif text-xs leading-relaxed">
          “A novel is not an escape from reality, but an architecture designed to perceive reality with unhurried clarity.”
          <footer className="text-[10px] font-mono not-italic text-stone-400 mt-1">
            — Atelier Curatorial Guild, 2026
          </footer>
        </blockquote>
      </section>
    </div>
  );
};
