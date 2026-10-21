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
  Library,
  SlidersHorizontal,
  Pencil,
  Trash2,
  Plus,
  GripVertical,
  ArrowLeft,
  CheckCheck,
  Play,
  ArrowUpDown
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

  const [activeTab, setActiveTab] = useState<'all' | 'web' | 'light' | 'reading' | 'finished'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Pull-up Sort Sheet State
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState<'progress' | 'title' | 'chapters' | 'rating'>('progress');

  // Category Management Bottom Sheet State
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [categoriesList, setCategoriesList] = useState([
    'Web Novels',
    'Light Novels',
    'Cultivation',
    'Isekai & Fantasy',
    'Completed'
  ]);
  const [newCategoryName, setNewCategoryName] = useState('');

  const [isUpdatesOpen, setIsUpdatesOpen] = useState(false);
  const [isRefreshingUpdates, setIsRefreshingUpdates] = useState(false);
  const [recentUpdates, setRecentUpdates] = useState([
    { id: 1, bookId: 'a-dream-through-a-thousand-years', bookTitle: 'A Dream Through a Thousand Years', chapter: 266, releaseNote: 'Ch. 266: Severing the Silver River translated', time: '12m ago' },
    { id: 2, bookId: 'soul-land-seven-evolutions', bookTitle: 'Soul Land: Seven Evolutions', chapter: 80, releaseNote: 'Ch. 80: Metamorphosis of the Heavenly Spear', time: '1h ago' },
    { id: 3, bookId: 'solo-rebirth-abyssal-monarch', bookTitle: 'Solo Rebirth: Abyssal Monarch', chapter: 412, releaseNote: 'Ch. 412: Temple of the Demon King unlocked', time: 'Today' },
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
  const webNovels = libraryBooks.filter(b => b.novelType === 'Web Novel');
  const lightNovels = libraryBooks.filter(b => b.novelType === 'Light Novel');
  const currentReadingBook = readingBooks[0] || libraryBooks[0];

  const baseBooks =
    activeTab === 'reading'
      ? readingBooks
      : activeTab === 'finished'
      ? finishedBooks
      : activeTab === 'web'
      ? webNovels
      : activeTab === 'light'
      ? lightNovels
      : libraryBooks;

  const filteredBooks = searchQuery.trim()
    ? baseBooks.filter(b =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.tags && b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
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
        isDark ? 'bg-[#0A0A0A] text-stone-100' : 'bg-[#FFFFFF] text-stone-900'
      }`}
    >
      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto pb-8">
        {/* Top Library Header */}
        <header
          className={`px-4 pt-3 pb-3 border-b sticky top-0 backdrop-blur-md z-20 flex items-center justify-between ${
            isDark
              ? 'bg-[#0A0A0A]/90 border-neutral-900 text-stone-100'
              : 'bg-[#FFFFFF]/90 border-stone-200/70 text-stone-900'
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
              <ArrowUpDown className="w-3.5 h-3.5" />
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
              <span
                className={`absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ${
                  isDark ? 'ring-black' : 'ring-white'
                }`}
              />
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
                <span
                  className={`absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ${
                    isDark ? 'ring-black' : 'ring-white'
                  }`}
                />
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



        {/* CONDITIONAL RENDERING: Empty Library State vs. Populated Library */}
        {isLibraryEmpty ? (
          /* Empty Library State (NO sorting chips like reading and completed, as requested) */
          <section className="px-4 py-12 flex-1 flex flex-col items-center justify-center text-center">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border shadow-sm ${
                isDark ? 'bg-stone-900/80 border-stone-800 text-amber-400' : 'bg-stone-100 border-stone-200 text-stone-700'
              }`}
            >
              <BookOpen className="w-7 h-7 stroke-[1.75]" />
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
            {/* Categories Filter Tabs: Only "All" with number + 3-slider pill to manage categories */}
            <section className="px-4 pt-2.5 pb-1">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {/* "All" Category Pill without brackets, number matching percentage number style */}
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className={`min-h-[32px] px-3.5 text-xs font-medium rounded-full whitespace-nowrap border transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'all'
                      ? isDark
                        ? 'border-amber-400 text-amber-400 bg-amber-400/10 font-semibold shadow-2xs'
                        : 'border-amber-600 text-amber-800 bg-amber-50 font-semibold shadow-2xs'
                      : isDark
                      ? 'border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200 bg-transparent'
                      : 'border-stone-300/80 text-stone-600 hover:border-stone-400 hover:text-stone-900 bg-transparent'
                  }`}
                >
                  <span>All</span>
                  <span className="text-[10px] font-mono tabular-nums">
                    {libraryBooks.length}
                  </span>
                </button>

                {/* 3-Slider Icon Pill: Opens Categories Management Bottom Sheet */}
                <button
                  type="button"
                  onClick={() => setIsCategorySheetOpen(true)}
                  aria-label="Manage Categories"
                  title="Manage Categories"
                  className={`min-h-[32px] px-3 text-xs font-medium rounded-full whitespace-nowrap border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isCategorySheetOpen
                      ? isDark
                        ? 'border-amber-400 text-amber-400 bg-amber-400/10 font-semibold'
                        : 'border-amber-600 text-amber-800 bg-amber-50 font-semibold'
                      : isDark
                      ? 'border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200 bg-transparent'
                      : 'border-stone-300/80 text-stone-600 hover:border-stone-400 hover:text-stone-900 bg-transparent'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 stroke-[1.8]" />
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
                </div>

                <div
                  className={`border rounded-2xl p-3.5 shadow-sm relative overflow-hidden group ${
                    isDark ? 'bg-[#0D0D0D] border-neutral-900' : 'bg-white border-stone-200/90'
                  }`}
                >
                  <div className="flex gap-3.5">
                    {/* Book Cover Presentation (progress line removed from cover as requested) */}
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
                    </div>

                    {/* Book Metadata */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        {/* Replaced Xianxia/Cultivation genre heading with CH x/x */}
                        <span
                          className={`text-[10px] font-mono font-semibold tracking-wider block mb-0.5 ${
                            isDark ? 'text-amber-400' : 'text-amber-800'
                          }`}
                        >
                          CH {currentReadingBook.currentChapter || 1}/{currentReadingBook.totalChapters || currentReadingBook.chapters.length}
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
                      </div>

                      {/* Moved progress line between title and resume reading button with small percentage next to it at the end */}
                      <div className="flex items-center gap-2 mt-2 mb-1.5">
                        <div className={`flex-1 h-1 rounded-full overflow-hidden ${isDark ? 'bg-stone-800' : 'bg-stone-200'}`}>
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${isDark ? 'bg-amber-400' : 'bg-stone-800'}`}
                            style={{ width: `${currentReadingBook.progressPercent}%` }}
                          />
                        </div>
                        <span className={`text-[10px] font-mono tabular-nums shrink-0 font-medium ${isDark ? 'text-amber-400' : 'text-stone-600'}`}>
                          {currentReadingBook.progressPercent}%
                        </span>
                      </div>

                      {/* Action Button */}
                      <div className={`flex items-center gap-2 pt-1.5 border-t ${isDark ? 'border-neutral-900' : 'border-stone-100'}`}>
                        <button
                          type="button"
                          onClick={() => onOpenReader(currentReadingBook)}
                          className={`min-h-[34px] px-3 py-1 text-xs font-medium rounded-lg transition-transform active:scale-95 shadow-xs flex items-center gap-1.5 cursor-pointer ${
                            isDark
                              ? 'bg-amber-400 text-stone-950 hover:bg-amber-300 font-semibold'
                              : 'bg-stone-900 text-stone-50 hover:bg-stone-800'
                          }`}
                        >
                          <Play className="w-3 h-3 fill-current" />
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
              {/* Header with novels count, removed sort button between count and grid/list */}
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Library Novels ({sortedBooks.length})
                </span>

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
                      {/* Smaller Cover (LN / WN badge removed as requested) */}
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
                        
                        {/* Progress bar on novel cover - Gold (thinner) */}
                        {book.progressPercent > 0 && (
                          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-black/50">
                            <div
                              className="h-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]"
                              style={{ width: `${book.progressPercent}%` }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Novel Name (2 lines) */}
                      <h4
                        className={`font-serif text-[11px] sm:text-xs font-semibold leading-snug line-clamp-2 min-h-[2rem] transition-colors ${
                          isDark ? 'text-stone-200 group-hover:text-amber-400' : 'text-stone-900 group-hover:underline'
                        }`}
                        title={book.title}
                      >
                        {book.title}
                      </h4>

                      {/* Chapter progress under the title */}
                      <span className={`text-[10px] font-mono mt-0.5 block ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                        CH 7/9
                      </span>
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
                            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-black/50">
                              <div
                                className="h-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]"
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
                          <span className={`text-[10px] font-mono mt-0.5 block ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                            CH 7/9
                          </span>
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

      {/* Pull Up Page / Tab for Manage Categories */}
      {isCategorySheetOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          {/* Dimmed Backdrop */}
          <div
            onClick={() => setIsCategorySheetOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer"
            aria-label="Close categories sheet"
          />

          {/* Pull Up Sheet Panel */}
          <div
            className={`relative z-10 w-full max-h-[82vh] rounded-t-3xl border-t p-5 pb-6 shadow-2xl transition-transform animate-in slide-in-from-bottom duration-300 flex flex-col ${
              isDark ? 'bg-[#121214] border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
            }`}
          >
            {/* Grab Handle */}
            <div className={`w-10 h-1 rounded-full mx-auto mb-4 ${isDark ? 'bg-stone-700' : 'bg-stone-300'}`} />

            {/* Header: Restored Category Icon with Categories title */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200/50 dark:border-stone-800">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    isDark
                      ? 'bg-amber-400/10 border-amber-400/30 text-amber-400'
                      : 'bg-amber-100 border-amber-200 text-amber-800'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4 stroke-[2]" />
                </div>
                <h3 className="text-base font-serif font-semibold tracking-tight">
                  Categories
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsCategorySheetOpen(false)}
                aria-label="Close"
                className={`min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                  isDark ? 'text-stone-400 hover:text-stone-100 hover:bg-stone-800' : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Create New Category Row - 80/20 ratio, longer/taller and slightly rounded square add button */}
            <div className="mb-4">
              <div className="flex items-stretch gap-2.5 w-full">
                <input
                  type="text"
                  placeholder="Add new category..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newCategoryName.trim()) {
                      setCategoriesList(prev => [...prev, newCategoryName.trim()]);
                      setNewCategoryName('');
                    }
                  }}
                  className={`flex-[8] basis-[80%] min-w-0 text-xs sm:text-sm px-4 py-3 min-h-[50px] rounded-xl border outline-none transition-all ${
                    isDark
                      ? 'bg-stone-900/80 border-stone-800 text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:bg-stone-900'
                      : 'bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400 focus:border-stone-400 focus:bg-white'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newCategoryName.trim()) {
                      setCategoriesList(prev => [...prev, newCategoryName.trim()]);
                      setNewCategoryName('');
                    }
                  }}
                  aria-label="Add category"
                  title="Add category"
                  className={`flex-[2] basis-[20%] min-h-[50px] rounded-xl border transition-all active:scale-95 flex items-center justify-center gap-1.5 font-semibold text-xs cursor-pointer shrink-0 ${
                    isDark
                      ? 'bg-amber-400 border-amber-400 text-stone-950 hover:bg-amber-300 shadow-sm'
                      : 'bg-stone-900 border-stone-900 text-stone-50 hover:bg-stone-800 shadow-sm'
                  }`}
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Categories List (Placeholders for Edit & Delete) */}
            <div className="space-y-2 overflow-y-auto max-h-[36vh] pr-0.5 no-scrollbar">
              {categoriesList.map((cat, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${
                    isDark
                      ? 'bg-stone-900/40 border-stone-800/80 hover:border-stone-700'
                      : 'bg-stone-50/60 border-stone-200/80 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <GripVertical className="w-3.5 h-3.5 text-stone-400 shrink-0 cursor-grab" />
                    <span className="text-xs font-medium truncate">{cat}</span>
                  </div>

                  {/* Edit and Delete Actions */}
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <button
                      type="button"
                      aria-label={`Edit ${cat}`}
                      title="Edit Category"
                      onClick={() => {
                        const renamed = prompt('Rename category:', cat);
                        if (renamed && renamed.trim()) {
                          setCategoriesList(prev => prev.map((c, i) => i === idx ? renamed.trim() : c));
                        }
                      }}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isDark
                          ? 'border-stone-800 text-stone-400 hover:text-stone-100 hover:bg-stone-800'
                          : 'border-stone-200 text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                      }`}
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${cat}`}
                      title="Delete Category"
                      onClick={() => {
                        setCategoriesList(prev => prev.filter((_, i) => i !== idx));
                      }}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isDark
                          ? 'border-stone-800 text-stone-400 hover:text-rose-400 hover:border-rose-900/60 hover:bg-stone-800'
                          : 'border-stone-200 text-stone-500 hover:text-rose-600 hover:border-rose-300 hover:bg-stone-100'
                      }`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Notifications View */}
      {isNotificationsOpen && (
        <div
          className={`fixed inset-0 z-50 flex flex-col animate-in fade-in duration-200 ${
            isDark ? 'bg-[#0A0A0A] text-stone-100' : 'bg-[#FFFFFF] text-stone-900'
          }`}
        >
          {/* Top Bar Header */}
          <header
            className={`px-4 pt-3 pb-3 border-b sticky top-0 backdrop-blur-md z-20 flex items-center justify-between ${
              isDark
                ? 'bg-[#0A0A0A]/95 border-neutral-900 text-stone-100'
                : 'bg-[#FFFFFF]/95 border-stone-200/80 text-stone-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsNotificationsOpen(false)}
                aria-label="Back to library"
                className={`min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl border transition-colors cursor-pointer ${
                  isDark
                    ? 'border-stone-800 bg-stone-900/80 text-stone-200 hover:text-stone-100 hover:border-stone-700'
                    : 'border-stone-300/80 bg-stone-50 text-stone-700 hover:text-stone-950 hover:border-stone-400'
                }`}
              >
                <ArrowLeft className="w-4 h-4 stroke-[2]" />
              </button>
              <div>
                <h1 className="text-lg font-serif font-semibold tracking-tight">
                  Notifications
                </h1>
                <span className={`text-[10px] font-mono block ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  {unreadCount > 0 ? `${unreadCount} unread alert${unreadCount > 1 ? 's' : ''}` : 'All caught up'}
                </span>
              </div>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllNotificationsRead}
                className={`min-h-[34px] px-3 text-xs font-medium rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                  isDark
                    ? 'border-amber-400/40 text-amber-400 bg-amber-400/10 hover:bg-amber-400/20'
                    : 'border-amber-600/40 text-amber-800 bg-amber-50 hover:bg-amber-100'
                }`}
              >
                <CheckCheck className="w-3.5 h-3.5 stroke-[2]" />
                <span>Mark all read</span>
              </button>
            )}
          </header>

          {/* Notifications Scrollable List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 border ${
                    isDark ? 'bg-stone-900 border-stone-800 text-stone-500' : 'bg-stone-100 border-stone-200 text-stone-400'
                  }`}
                >
                  <Bell className="w-6 h-6 stroke-[1.8]" />
                </div>
                <h3 className="font-serif text-sm font-semibold mb-1">No Notifications</h3>
                <p className={`text-xs max-w-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  You're up to date! Chapter releases and library alerts will appear here.
                </p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, unread: false } : item));
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    n.unread
                      ? isDark
                        ? 'bg-amber-950/20 border-amber-900/50 text-stone-100 shadow-2xs'
                        : 'bg-amber-50/80 border-amber-200 text-stone-900 shadow-2xs'
                      : isDark
                      ? 'bg-stone-900/40 border-stone-800/80 text-stone-300 hover:bg-stone-900/70'
                      : 'bg-stone-50/80 border-stone-200/80 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 ${
                      n.unread
                        ? isDark
                          ? 'bg-amber-400/20 border-amber-400/40 text-amber-400'
                          : 'bg-amber-100 border-amber-300 text-amber-800'
                        : isDark
                        ? 'bg-stone-800 border-stone-700 text-stone-400'
                        : 'bg-white border-stone-200 text-stone-500'
                    }`}
                  >
                    <Bell className="w-4 h-4 stroke-[1.8]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="font-semibold text-xs flex items-center gap-1.5 truncate">
                        {n.unread && <span className="w-2 h-2 bg-amber-500 rounded-full shrink-0" />}
                        <span className="truncate">{n.title}</span>
                      </div>
                      <span className="text-[10px] font-mono opacity-60 shrink-0">{n.time}</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                      {n.desc}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
