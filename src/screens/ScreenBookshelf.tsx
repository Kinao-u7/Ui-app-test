import React, { useState } from 'react';
import {
  LayoutGrid,
  List,
  CheckCircle2,
  Star,
  BookOpen,
  Bell,
  Search,
  X,
  Check,
  ArrowDownWideNarrow,
  Sparkles,
  RefreshCw,
  ArrowRight,
  Clock,
  ArrowDownAZ,
  Layers,
  Library
} from 'lucide-react';
import { Book, NOVEL_BOOKS } from '../data/novelData';

interface ScreenBookshelfProps {
  books?: Book[];
  onSelectBook: (book: Book) => void;
  onOpenReader: (book: Book) => void;
  onOpenSettings?: () => void;
  onOpenDiscover?: () => void;
  onRestoreBooks?: () => void;
  onClearLibrary?: () => void;
  isDark?: boolean;
  onToggleDarkMode?: () => void;
}

export const ScreenBookshelf: React.FC<ScreenBookshelfProps> = ({
  books,
  onSelectBook,
  onOpenReader,
  onOpenSettings,
  onOpenDiscover,
  onRestoreBooks,
  onClearLibrary,
  isDark = false,
  onToggleDarkMode
}) => {
  const libraryBooks = books !== undefined ? books : NOVEL_BOOKS;
  const isLibraryEmpty = libraryBooks.length === 0;

  const [activeTab, setActiveTab] = useState<'all' | 'reading' | 'finished'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Pull-up Sort Sheet State
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState<'progress' | 'title' | 'chapters' | 'rating'>('progress');

  const [isUpdatesOpen, setIsUpdatesOpen] = useState(false);
  const [isRefreshingUpdates, setIsRefreshingUpdates] = useState(false);
  const [recentUpdates, setRecentUpdates] = useState([
    { id: 1, bookId: 'solitude-by-the-sea', bookTitle: 'Solitude by the Sea', chapter: 4, releaseNote: 'New chapter: The Tides of Memory', time: 'Today' },
    { id: 2, bookId: 'whispers-in-the-rain', bookTitle: 'Whispers in the Rain', chapter: 6, releaseNote: 'Chapter 6 added with author commentary', time: 'Yesterday' },
    { id: 3, bookId: 'the-glass-archivist', bookTitle: 'The Glass Archivist', chapter: 10, releaseNote: 'Climactic Arc translation updated', time: '3d ago' },
  ]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Chapter 4 Released', desc: 'Solitude by the Sea has a new chapter', time: '2h ago', unread: true },
    { id: 2, title: 'Reading Streak', desc: '5 consecutive days completed!', time: '1d ago', unread: true },
    { id: 3, title: 'Bookmark Synced', desc: 'All recent highlights are cloud backed', time: '2d ago', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const toggleSort = () => {
    setIsSortOpen(prev => !prev);
    setIsUpdatesOpen(false);
    setIsSearchOpen(false);
    setIsNotificationsOpen(false);
  };

  const toggleUpdates = () => {
    setIsUpdatesOpen(prev => !prev);
    setIsSortOpen(false);
    setIsSearchOpen(false);
    setIsNotificationsOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(prev => !prev);
    setIsSortOpen(false);
    setIsUpdatesOpen(false);
    setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(prev => !prev);
    setIsSortOpen(false);
    setIsUpdatesOpen(false);
    setIsSearchOpen(false);
  };

  const handleCheckUpdates = () => {
    setIsRefreshingUpdates(true);
    setTimeout(() => {
      setIsRefreshingUpdates(false);
    }, 800);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const readingBooks = libraryBooks.filter(b => b.progressPercent > 0 && b.progressPercent < 100);
  const finishedBooks = libraryBooks.filter(b => b.progressPercent >= 80);
  const currentReadingBook = readingBooks[0] || libraryBooks[0];

  const baseBooks =
    activeTab === 'reading'
      ? readingBooks
      : activeTab === 'finished'
      ? finishedBooks
      : libraryBooks;

  const filteredBooks = searchQuery.trim()
    ? baseBooks.filter(b =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.genre.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : baseBooks;

  // Apply sorting
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortOption) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'chapters':
        return b.chapters.length - a.chapters.length;
      case 'rating':
        return b.rating - a.rating;
      case 'progress':
      default:
        return b.progressPercent - a.progressPercent;
    }
  });

  const sortOptions = [
    {
      id: 'progress' as const,
      label: 'Reading Progress',
      desc: 'Recently read chapters & completion percent',
      icon: Clock
    },
    {
      id: 'title' as const,
      label: 'Title (A–Z)',
      desc: 'Alphabetical order by novel title',
      icon: ArrowDownAZ
    },
    {
      id: 'chapters' as const,
      label: 'Most Chapters',
      desc: 'Sorted by greatest number of chapters',
      icon: Layers
    },
    {
      id: 'rating' as const,
      label: 'Highest Rating',
      desc: 'Curator acclaim and reader review score',
      icon: Star
    }
  ];

  return (
    <div
      className={`flex-1 flex flex-col transition-colors duration-200 h-full relative overflow-hidden ${
        isDark ? 'bg-[#000000] text-stone-100' : 'bg-[#FAF8F5] text-stone-900'
      }`}
    >
      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto pb-8">
        {/* Top Library Header */}
        <header
          className={`px-4 pt-3 pb-3 border-b sticky top-0 backdrop-blur-md z-20 flex items-center justify-between ${
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

          {/* Top Outlined Action Buttons */}
          <div className="flex items-center gap-1.5">
            {/* 1. Sort Library Button -> Pull up bottom sheet */}
            <button
              type="button"
              onClick={toggleSort}
              aria-label="Sort Library"
              title="Sort Library"
              className={`min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg border transition-all shadow-2xs cursor-pointer ${
                isSortOpen || sortOption !== 'progress'
                  ? isDark
                    ? 'border-amber-400 bg-amber-950/30 text-amber-400'
                    : 'border-amber-600 bg-amber-50 text-amber-900'
                  : isDark
                  ? 'border-stone-800 bg-stone-900/80 text-stone-300 hover:border-stone-700 hover:text-stone-100'
                  : 'border-stone-300/80 bg-white/80 text-stone-700 hover:border-stone-400 hover:text-stone-900'
              }`}
            >
              <ArrowDownWideNarrow className="w-3.5 h-3.5" />
            </button>

            {/* 2. Updates Button */}
            <button
              type="button"
              onClick={toggleUpdates}
              aria-label="Library Updates"
              title="Novel Updates"
              className={`min-h-[34px] min-w-[34px] relative flex items-center justify-center rounded-lg border transition-all shadow-2xs cursor-pointer ${
                isUpdatesOpen
                  ? isDark
                    ? 'border-amber-400 bg-amber-950/30 text-amber-400'
                    : 'border-amber-600 bg-amber-50 text-amber-900'
                  : isDark
                  ? 'border-stone-800 bg-stone-900/80 text-stone-300 hover:border-stone-700 hover:text-stone-100'
                  : 'border-stone-300/80 bg-white/80 text-stone-700 hover:border-stone-400 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full" />
            </button>

            {/* 3. Search Button */}
            <button
              type="button"
              onClick={toggleSearch}
              aria-label="Search Library"
              title="Search Library"
              className={`min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg border transition-all shadow-2xs cursor-pointer ${
                isSearchOpen
                  ? isDark
                    ? 'border-amber-400 bg-amber-950/30 text-amber-400'
                    : 'border-amber-600 bg-amber-50 text-amber-900'
                  : isDark
                  ? 'border-stone-800 bg-stone-900/80 text-stone-300 hover:border-stone-700 hover:text-stone-100'
                  : 'border-stone-300/80 bg-white/80 text-stone-700 hover:border-stone-400 hover:text-stone-900'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* 4. Notifications Button */}
            <button
              type="button"
              onClick={toggleNotifications}
              aria-label="Notifications"
              title="Notifications"
              className={`min-h-[34px] min-w-[34px] relative flex items-center justify-center rounded-lg border transition-all shadow-2xs cursor-pointer ${
                isNotificationsOpen
                  ? isDark
                    ? 'border-amber-400 bg-amber-950/30 text-amber-400'
                    : 'border-amber-600 bg-amber-50 text-amber-900'
                  : isDark
                  ? 'border-stone-800 bg-stone-900/80 text-stone-300 hover:border-stone-700 hover:text-stone-100'
                  : 'border-stone-300/80 bg-white/80 text-stone-700 hover:border-stone-400 hover:text-stone-900'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full" />
              )}
            </button>
          </div>
        </header>

        {/* Novel Updates Drawer */}
        {isUpdatesOpen && (
          <div
            className={`mx-4 mt-2 mb-2 p-3 rounded-xl border shadow-lg transition-all ${
              isDark ? 'bg-[#141416] border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
            }`}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-200/50 dark:border-stone-800">
              <span className="text-xs font-serif font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Latest Novel Updates
              </span>
              <button
                type="button"
                onClick={handleCheckUpdates}
                disabled={isRefreshingUpdates}
                className="text-[10px] font-mono text-amber-500 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${isRefreshingUpdates ? 'animate-spin' : ''}`} />
                {isRefreshingUpdates ? 'Checking...' : 'Check now'}
              </button>
            </div>
            <div className="space-y-1.5">
              {recentUpdates.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    const targetBook = NOVEL_BOOKS.find(b => b.id === item.bookId) || NOVEL_BOOKS[0];
                    onSelectBook(targetBook);
                    setIsUpdatesOpen(false);
                  }}
                  className={`p-2 rounded-lg text-xs flex items-center justify-between cursor-pointer border transition-colors ${
                    isDark
                      ? 'border-stone-800/80 bg-stone-900/60 hover:bg-stone-800 hover:border-stone-700'
                      : 'border-stone-200/80 bg-stone-50/80 hover:bg-stone-100 hover:border-stone-300'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-[11px] truncate flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0" />
                      <span className="truncate">{item.bookTitle}</span>
                    </div>
                    <p className={`text-[10px] truncate mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                      {item.releaseNote}
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <span className="text-[9px] font-mono opacity-60 block">{item.time}</span>
                    <span className="text-[10px] font-mono text-amber-500 font-medium">Ch. {item.chapter}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expandable Search Bar */}
        {isSearchOpen && (
          <div
            className={`px-4 py-2 border-b transition-all flex items-center gap-2 ${
              isDark ? 'bg-stone-900/95 border-stone-800' : 'bg-stone-100/95 border-stone-200'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search novels, authors, or genres..."
              className={`w-full bg-transparent text-xs focus:outline-none ${
                isDark ? 'text-stone-100 placeholder-stone-500' : 'text-stone-900 placeholder-stone-400'
              }`}
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-stone-400 hover:text-stone-200 p-0.5 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Notifications Drawer */}
        {isNotificationsOpen && (
          <div
            className={`mx-4 mt-2 mb-2 p-3 rounded-xl border shadow-lg transition-all ${
              isDark ? 'bg-[#141416] border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
            }`}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-200/50 dark:border-stone-800">
              <span className="text-xs font-serif font-semibold">Library Alerts</span>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllNotificationsRead}
                  className="text-[10px] font-mono text-amber-500 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Check className="w-3 h-3" /> Mark all read
                </button>
              )}
            </div>
            <div className="space-y-2">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-2 rounded-lg text-xs flex items-start justify-between ${
                    n.unread
                      ? isDark
                        ? 'bg-amber-950/20 border border-amber-900/40'
                        : 'bg-amber-50/70 border border-amber-200/60'
                      : isDark
                      ? 'bg-stone-900/50'
                      : 'bg-stone-50'
                  }`}
                >
                  <div>
                    <div className="font-medium text-[11px] flex items-center gap-1.5">
                      {n.unread && <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />}
                      <span>{n.title}</span>
                    </div>
                    <p className={`text-[10px] mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                      {n.desc}
                    </p>
                  </div>
                  <span className="text-[9px] font-mono opacity-60 shrink-0 ml-2">{n.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONDITIONAL RENDERING: Empty Library State vs. Populated Library */}
        {isLibraryEmpty ? (
          /* Empty Library State (NO sorting chips like reading and completed, as requested) */
          <section className="px-4 py-12 flex-1 flex flex-col items-center justify-center text-center">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border shadow-sm ${
                isDark ? 'bg-stone-900/80 border-stone-800 text-amber-400' : 'bg-stone-100 border-stone-200 text-stone-700'
              }`}
            >
              <Library className="w-7 h-7 stroke-[1.75]" />
            </div>

            <h2 className="font-serif text-lg font-semibold tracking-tight mb-1.5">
              Your Library is Empty
            </h2>
            <p className={`text-xs max-w-xs leading-relaxed mb-6 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
              You haven't added any novels yet. Discover curated titles from the catalog and build your personal collection.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 w-full max-w-xs">
              {onOpenDiscover && (
                <button
                  type="button"
                  onClick={onOpenDiscover}
                  className={`w-full py-2.5 px-4 text-xs font-semibold rounded-xl shadow-xs transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                    isDark
                      ? 'bg-amber-400 text-stone-950 hover:bg-amber-300'
                      : 'bg-stone-900 text-stone-50 hover:bg-stone-800'
                  }`}
                >
                  <span>Discover Novels</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {onRestoreBooks && (
                <button
                  type="button"
                  onClick={onRestoreBooks}
                  className={`w-full py-2.5 px-4 text-xs font-medium rounded-xl border transition-colors cursor-pointer ${
                    isDark
                      ? 'border-stone-800 hover:bg-stone-900 text-stone-300'
                      : 'border-stone-300 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  Load Sample Novels (9)
                </button>
              )}
            </div>
          </section>
        ) : (
          /* Populated Library Screen */
          <>
            {/* Categories Filter Tabs + Pull-up Sort Tab */}
            <section className="px-4 pt-2.5 pb-1">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {[
                  { id: 'all', label: `All Novels (${libraryBooks.length})` },
                  { id: 'reading', label: `Continue Reading (${readingBooks.length})` },
                  { id: 'finished', label: `Finished (${finishedBooks.length})` },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTab(t.id as any)}
                    className={`min-h-[32px] px-3 text-xs font-medium rounded-full whitespace-nowrap transition-colors cursor-pointer ${
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

                {/* Pull-Up Sort Tab Button in the Filter Bar */}
                <button
                  type="button"
                  onClick={() => setIsSortOpen(true)}
                  className={`min-h-[32px] px-3 text-xs font-medium rounded-full whitespace-nowrap transition-colors flex items-center gap-1.5 border cursor-pointer ${
                    sortOption !== 'progress'
                      ? isDark
                        ? 'border-amber-400/80 bg-amber-950/40 text-amber-400 font-semibold'
                        : 'border-amber-600/80 bg-amber-50 text-amber-900 font-semibold'
                      : isDark
                      ? 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-stone-700'
                      : 'border-stone-200/90 bg-stone-100/70 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <ArrowDownWideNarrow className="w-3.5 h-3.5 text-amber-500" />
                  <span>Sort: {sortOptions.find(o => o.id === sortOption)?.label}</span>
                </button>
              </div>
            </section>

            {/* Continue Reading Spotlight */}
            {!searchQuery && activeTab !== 'finished' && currentReadingBook && (
              <section className="px-4 pt-1.5 pb-2">
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] uppercase font-mono tracking-widest ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                    Continue Reading
                  </span>
                  <span className={`text-[10px] font-mono ${isDark ? 'text-amber-400' : 'text-stone-400'}`}>
                    {currentReadingBook.currentChapter}/{currentReadingBook.chapters.length} ({currentReadingBook.progressPercent}%)
                  </span>
                </div>

                <div
                  className={`border rounded-2xl p-3.5 shadow-sm relative overflow-hidden group ${
                    isDark ? 'bg-[#0D0D0D] border-neutral-900' : 'bg-white border-stone-200/90'
                  }`}
                >
                  <div className="flex gap-3.5">
                    {/* Book Cover Presentation */}
                    <div
                      onClick={() => onSelectBook(currentReadingBook)}
                      className="w-20 h-30 shrink-0 rounded-lg overflow-hidden shadow-md cursor-pointer relative bg-stone-100 group-hover:shadow-lg transition-shadow"
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
                      {currentReadingBook.progressPercent > 0 && (
                        <div className="absolute bottom-0 inset-x-0 h-0.5 bg-black/40">
                          <div
                            className={`h-full ${isDark ? 'bg-amber-400' : 'bg-white'}`}
                            style={{ width: `${currentReadingBook.progressPercent}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Book Metadata */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
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
                          className={`font-serif text-sm font-semibold leading-snug cursor-pointer transition-colors truncate ${
                            isDark ? 'text-stone-100 group-hover:text-amber-400' : 'text-stone-900 group-hover:underline'
                          }`}
                        >
                          {currentReadingBook.title}
                        </h2>
                        <p className={`text-[11px] mt-0.5 truncate ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                          by {currentReadingBook.author}
                        </p>

                        <div className={`flex items-center gap-1.5 text-[10px] mt-1.5 font-mono tabular-nums ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                          <span className="font-semibold text-amber-500 dark:text-amber-400">
                            {currentReadingBook.currentChapter}/{currentReadingBook.chapters.length} Ch.
                          </span>
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
                      <div className={`flex items-center gap-2 mt-2 pt-1.5 border-t ${isDark ? 'border-neutral-900' : 'border-stone-100'}`}>
                        <button
                          type="button"
                          onClick={() => onOpenReader(currentReadingBook)}
                          className={`min-h-[34px] px-3 py-1 text-xs font-medium rounded-lg transition-transform active:scale-95 shadow-xs flex items-center gap-1.5 cursor-pointer ${
                            isDark
                              ? 'bg-amber-400 text-stone-950 hover:bg-amber-300 font-semibold'
                              : 'bg-stone-900 text-stone-50 hover:bg-stone-800'
                          }`}
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>Resume Reading</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Novel Display (3x3 Minimal Grid OR Minimal List) */}
            <section className="px-4 pt-2 flex-1">
              {/* Header with novels count, active sort pull-up trigger, and compact Grid / List Switcher */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                    Library Novels ({sortedBooks.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSortOpen(true)}
                    className={`text-[9px] font-mono px-2 py-0.5 rounded border flex items-center gap-1 transition-colors cursor-pointer ${
                      sortOption !== 'progress'
                        ? isDark
                          ? 'bg-amber-950/30 border-amber-900/40 text-amber-400 font-medium'
                          : 'bg-amber-50 border-amber-200 text-amber-800 font-medium'
                        : isDark
                        ? 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
                        : 'bg-stone-100 border-stone-200 text-stone-600 hover:text-stone-900'
                    }`}
                    title="Pull up Sort Options"
                  >
                    <ArrowDownWideNarrow className="w-2.5 h-2.5 text-amber-500" />
                    <span>{sortOptions.find(o => o.id === sortOption)?.label}</span>
                  </button>
                </div>

                {/* Compact Grid / List Switcher */}
                <div
                  className={`flex items-center p-0.5 rounded-md border ${
                    isDark ? 'bg-stone-900 border-stone-800' : 'bg-stone-200/70 border-stone-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    aria-label="3x3 Grid View"
                    className={`h-6 w-6 min-h-[24px] min-w-[24px] flex items-center justify-center rounded-sm transition-all cursor-pointer ${
                      viewMode === 'grid'
                        ? isDark
                          ? 'bg-stone-800 text-amber-400 shadow-xs'
                          : 'bg-white text-stone-900 shadow-xs'
                        : isDark
                        ? 'text-stone-400 hover:text-stone-200'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    <LayoutGrid className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    aria-label="List View"
                    className={`h-6 w-6 min-h-[24px] min-w-[24px] flex items-center justify-center rounded-sm transition-all cursor-pointer ${
                      viewMode === 'list'
                        ? isDark
                          ? 'bg-stone-800 text-amber-400 shadow-xs'
                          : 'bg-white text-stone-900 shadow-xs'
                        : isDark
                        ? 'text-stone-400 hover:text-stone-200'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    <List className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {viewMode === 'grid' ? (
                /* 3x3 Minimal Grid */
                <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                  {sortedBooks.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => onSelectBook(book)}
                      className="group cursor-pointer flex flex-col transition-transform active:scale-[0.98]"
                    >
                      {/* Smaller Cover */}
                      <div
                        className={`aspect-[3/4] w-full rounded-md overflow-hidden relative shadow-2xs border mb-1 ${
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
                          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-black/40">
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

                      {/* Novel Name */}
                      <h4
                        className={`font-serif text-[11px] sm:text-xs font-semibold leading-tight line-clamp-1 transition-colors ${
                          isDark ? 'text-stone-200 group-hover:text-amber-400' : 'text-stone-900 group-hover:underline'
                        }`}
                        title={book.title}
                      >
                        {book.title}
                      </h4>

                      {/* Chapter numbers matching exact style, size, color of read progress */}
                      <div className={`flex items-center justify-between text-[10px] font-mono mt-0.5 px-0.5 ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
                        <span>
                          CH {book.currentChapter}/{book.chapters.length}
                        </span>
                        <span>
                          {book.progressPercent}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Minimal List View */
                <div
                  className={`divide-y border-t border-b ${
                    isDark ? 'divide-neutral-900 border-neutral-900' : 'divide-stone-200/70 border-stone-200/70'
                  }`}
                >
                  {sortedBooks.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => onSelectBook(book)}
                      className={`py-2 flex items-center cursor-pointer px-1 rounded-lg transition-colors ${
                        isDark ? 'hover:bg-stone-800/40' : 'hover:bg-stone-100/70'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        {/* Smaller Novel Cover (w-12 h-17) */}
                        <div
                          className={`w-12 h-17 rounded-md overflow-hidden shrink-0 shadow-xs border relative ${
                            isDark ? 'bg-stone-800 border-stone-700' : 'bg-stone-200 border-stone-300/60'
                          }`}
                        >
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                          {book.progressPercent > 0 && (
                            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-black/40">
                              <div
                                className={`h-full ${isDark ? 'bg-amber-400' : 'bg-white'}`}
                                style={{ width: `${book.progressPercent}%` }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Novel Information */}
                        <div className="min-w-0 flex-1">
                          <h4
                            className={`font-serif text-xs font-semibold truncate ${
                              isDark ? 'text-stone-100' : 'text-stone-900'
                            }`}
                          >
                            {book.title}
                          </h4>
                          <p className={`text-[11px] truncate mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                            by {book.author}
                          </p>

                          {/* Shows Number of Chapters and reading percent in matching font */}
                          <div className="flex items-center gap-2 mt-1.5">
                            <span
                              className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                                isDark ? 'bg-stone-800 text-stone-300' : 'bg-stone-200/70 text-stone-700'
                              }`}
                            >
                              {book.currentChapter}/{book.chapters.length} Chapters
                            </span>
                            <span className={`text-[10px] font-mono ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
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
          </>
        )}
      </div>

      {/* Pull Up Page / Tab for Sort Library */}
      {isSortOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          {/* Dimmed Backdrop */}
          <div
            onClick={() => setIsSortOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer"
            aria-label="Close sort sheet"
          />

          {/* Pull Up Sheet Panel */}
          <div
            className={`relative z-10 w-full rounded-t-3xl border-t p-5 pb-6 shadow-2xl transition-transform animate-in slide-in-from-bottom duration-300 ${
              isDark ? 'bg-[#121214] border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
            }`}
          >
            {/* Grab Handle */}
            <div className={`w-10 h-1 rounded-full mx-auto mb-4 ${isDark ? 'bg-stone-700' : 'bg-stone-300'}`} />

            {/* Header */}
            <div className="flex items-start justify-between mb-4 pb-3 border-b border-stone-200/50 dark:border-stone-800">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                    isDark
                      ? 'bg-amber-400/10 border-amber-400/30 text-amber-400'
                      : 'bg-amber-100 border-amber-200 text-amber-800'
                  }`}
                >
                  <ArrowDownWideNarrow className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <span className={`text-[10px] font-mono uppercase tracking-widest block mb-0.5 ${isDark ? 'text-amber-400' : 'text-stone-400'}`}>
                    Library Order
                  </span>
                  <h3 className="text-base font-serif font-semibold tracking-tight">
                    Sort Library
                  </h3>
                  <p className={`text-[11px] font-sans mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                    Ordering {sortedBooks.length} novels in your collection
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSortOpen(false)}
                aria-label="Close"
                className={`min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                  isDark ? 'text-stone-400 hover:text-stone-100 hover:bg-stone-800' : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Options List */}
            <div className="space-y-2 mb-4">
              {sortOptions.map((opt) => {
                const IconComponent = opt.icon;
                const isSelected = sortOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setSortOption(opt.id);
                      setIsSortOpen(false);
                    }}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? isDark
                          ? 'border-amber-400/90 bg-amber-950/20 text-stone-100 shadow-xs'
                          : 'border-amber-600/90 bg-amber-50/70 text-stone-900 shadow-xs'
                        : isDark
                        ? 'border-stone-800/80 bg-stone-900/40 hover:bg-stone-900 hover:border-stone-700 text-stone-300'
                        : 'border-stone-200/80 bg-stone-50/60 hover:bg-stone-100 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                          isSelected
                            ? isDark
                              ? 'bg-amber-400/10 border-amber-400/30 text-amber-400'
                              : 'bg-amber-100 border-amber-200 text-amber-800'
                            : isDark
                            ? 'bg-stone-800/70 border-stone-700/60 text-stone-400'
                            : 'bg-white border-stone-200 text-stone-500'
                        }`}
                      >
                        <IconComponent className="w-4 h-4 stroke-[1.8]" />
                      </div>

                      <div className="min-w-0">
                        <span className={`text-xs font-serif font-semibold block ${isSelected ? (isDark ? 'text-amber-400' : 'text-stone-950') : ''}`}>
                          {opt.label}
                        </span>
                        <span className={`text-[10.5px] font-sans block truncate mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                          {opt.desc}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 ml-2">
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-xs">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </div>
                      ) : (
                        <div className={`w-5 h-5 rounded-full border ${isDark ? 'border-stone-700' : 'border-stone-300'}`} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Empty / Sample Library Testing Switch */}
            <div className={`pt-3 border-t flex items-center justify-between text-[11px] font-mono ${isDark ? 'border-stone-800' : 'border-stone-200/70'}`}>
              <span className="opacity-60">Library State:</span>
              {!isLibraryEmpty ? (
                <button
                  type="button"
                  onClick={() => {
                    onClearLibrary?.();
                    setIsSortOpen(false);
                  }}
                  className="text-rose-500 hover:underline cursor-pointer"
                >
                  Clear (Test Empty State)
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onRestoreBooks?.();
                    setIsSortOpen(false);
                  }}
                  className="text-amber-500 hover:underline cursor-pointer"
                >
                  Restore Sample Novels (9)
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
