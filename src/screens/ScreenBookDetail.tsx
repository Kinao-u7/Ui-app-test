import React, { useState } from 'react';
import {
  ArrowLeft,
  MoreVertical,
  Bookmark,
  Star,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CloudDownload,
  MessageSquare,
  Globe,
  Check,
  X,
  Send,
  Languages,
  Share2,
  Headphones,
  Sparkles,
  Library
} from 'lucide-react';
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
  onOpenAudio,
  onOpenStudio,
  isDark = false,
}) => {
  const [isSaved, setIsSaved] = useState(true);
  const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isDiscussionsOpen, setIsDiscussionsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'SwordDaoMaster',
      time: '3h ago',
      text: 'The cultivation breakthrough in Chapter 3 gives goosebumps! Best translation release of the month.',
      likes: 38
    },
    {
      id: 2,
      user: 'IsekaiScholar',
      time: '8h ago',
      text: 'The power system is consistent and the character interactions feel genuine. Highly recommended binge.',
      likes: 21
    }
  ]);
  const [newComment, setNewComment] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2200);
  };

  const handleToggleSave = () => {
    const next = !isSaved;
    setIsSaved(next);
    showToast(next ? 'Added to your Library' : 'Removed from Library');
  };

  const handleDownload = () => {
    setIsDownloaded(true);
    showToast(`Cached ${book.chapters.length} chapters for offline reading`);
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`"${book.title}" by ${book.author} — Folio Reader`);
      showToast('Novel citation copied to clipboard');
    } else {
      showToast('Sharing link generated');
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      {
        id: Date.now(),
        user: 'You',
        time: 'Just now',
        text: newComment.trim(),
        likes: 1
      },
      ...comments
    ]);
    setNewComment('');
    showToast('Comment posted to novel discussion');
  };

  // Filter out any webnovel, lightnovel, or ongoing tags as requested
  const displayTags = (book.tags || [book.genre]).filter(
    (tag) => !/web\s*novel|light\s*novel|ongoing/i.test(tag)
  );

  return (
    <div
      className={`flex-1 flex flex-col transition-colors duration-300 overflow-y-auto pb-12 relative select-none ${
        isDark ? 'bg-[#000000] text-stone-100' : 'bg-[#FAF8F5] text-stone-900'
      }`}
    >
      {/* Ambient Atmospheric Backdrop Glow */}
      <div
        className="absolute top-0 inset-x-0 h-96 pointer-events-none opacity-25 blur-3xl transition-opacity"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 40% 20%, rgba(217, 119, 6, 0.25), rgba(0,0,0,0.85) 75%)'
            : 'radial-gradient(circle at 40% 20%, rgba(217, 119, 6, 0.15), rgba(250, 248, 245, 0.9) 75%)',
        }}
      />

      {/* Floating App Bar: Back button on Left, Title center, Three dots pull-up tab on Right (Favorite and Theme button removed) */}
      <header className="px-4 pt-3 pb-2 sticky top-0 z-20 flex items-center justify-between backdrop-blur-md bg-opacity-80">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className={`min-h-[42px] min-w-[42px] flex items-center justify-center rounded-full transition-all cursor-pointer ${
            isDark
              ? 'text-stone-300 hover:text-white bg-white/5 hover:bg-white/10'
              : 'text-stone-700 hover:text-stone-900 bg-stone-900/5 hover:bg-stone-900/10'
          }`}
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
        </button>

        <span
          className={`text-xs font-serif font-medium tracking-tight truncate max-w-[190px] opacity-80 ${
            isDark ? 'text-stone-200' : 'text-stone-800'
          }`}
        >
          {book.title}
        </span>

        {/* Three dots icon button in place of removed favorite and theme buttons */}
        <button
          type="button"
          onClick={() => setIsBottomSheetOpen(true)}
          aria-label="More options"
          className={`min-h-[42px] min-w-[42px] flex items-center justify-center rounded-full transition-all cursor-pointer ${
            isDark
              ? 'text-stone-300 hover:text-white bg-white/5 hover:bg-white/10'
              : 'text-stone-700 hover:text-stone-900 bg-stone-900/5 hover:bg-stone-900/10'
          }`}
        >
          <MoreVertical className="w-4 h-4 stroke-[2]" />
        </button>
      </header>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-14 inset-x-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-200">
          <div
            className={`px-4 py-2 rounded-full text-xs font-medium shadow-lg flex items-center gap-2 border ${
              isDark
                ? 'bg-stone-900 border-stone-700 text-stone-100 shadow-black/80'
                : 'bg-stone-900 border-stone-800 text-stone-50 shadow-stone-900/30'
            }`}
          >
            <Check className="w-3.5 h-3.5 text-amber-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Novel Hero Layout: Cover to LEFT with Title NEXT TO IT and Author UNDER IT */}
      <div className="px-5 pt-3 pb-4 relative z-10 flex gap-4 items-start">
        {/* Novel Cover on the LEFT (Clean with no webnovel or ongoing badges) */}
        <div
          className={`relative shrink-0 w-28 h-40 sm:w-32 sm:h-44 rounded-xl overflow-hidden shadow-xl transition-all duration-300 group ${
            isDark
              ? 'shadow-[0_12px_32px_rgba(0,0,0,0.85)] ring-1 ring-white/10'
              : 'shadow-[0_12px_28px_rgba(40,30,20,0.18)] ring-1 ring-stone-900/10'
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none" />
          <div className="absolute top-0 right-2 w-2.5 h-4.5 bg-amber-600/90 shadow-sm rounded-b-xs" />
        </div>

        {/* Right Side: Title NEXT to Cover, Author UNDER Title, Genre Tags & Stats */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          {/* Genre / Subgenre Tags (webnovel and ongoing tags excluded) */}
          <div className="flex flex-wrap gap-1.5 mb-1.5">
            {displayTags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-md border font-medium ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-stone-300'
                    : 'bg-stone-200/70 border-stone-300 text-stone-700'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title Next to Cover */}
          <h1
            className={`font-serif text-lg sm:text-xl font-bold tracking-tight text-balance leading-snug ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}
          >
            {book.title}
          </h1>

          {/* Author Name Under Title (trans by removed as requested) */}
          <p className={`text-xs font-medium mt-1 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
            by <span className="font-semibold">{book.author}</span>
          </p>

          {/* Source Attribution */}
          {book.source && (
            <div className="flex items-center gap-1 text-[11px] font-mono text-stone-500 mt-1">
              <Globe className="w-3 h-3 opacity-70" />
              <span className="truncate">{book.source}</span>
            </div>
          )}

          {/* Compact Stats Pill */}
          <div
            className={`flex items-center gap-2 text-[11px] mt-2.5 px-2.5 py-1 rounded-full font-mono tabular-nums w-fit transition-colors ${
              isDark ? 'bg-white/5 text-stone-300' : 'bg-stone-200/60 text-stone-600'
            }`}
          >
            <span className={`flex items-center gap-1 font-semibold ${isDark ? 'text-amber-400' : 'text-stone-800'}`}>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {book.rating}
            </span>
            <span className="opacity-40" aria-hidden="true">·</span>
            <span>{book.totalChapters || book.chapters.length} Ch.</span>
            <span className="opacity-40" aria-hidden="true">·</span>
            <span className="text-amber-400 font-semibold">Ch. {book.currentChapter || 1}</span>
          </div>
        </div>
      </div>

      {/* Primary Action Button & Quick Actions */}
      <div className="px-5 py-2 relative z-10 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => onOpenReader(book)}
          className={`w-full min-h-[48px] text-xs font-semibold rounded-2xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
            isDark
              ? 'bg-amber-400 text-black hover:bg-amber-300 shadow-amber-950/20'
              : 'bg-stone-900 text-white hover:bg-stone-800 shadow-stone-400/30'
          }`}
        >
          <BookOpen className="w-4 h-4 stroke-[2.2]" />
          <span>Continue Ch. {book.currentChapter || 1}</span>
        </button>

        {/* Utility Web Novel Buttons: Download Offline & Discussions */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleDownload}
            className={`min-h-[40px] px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
              isDownloaded
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-400'
                : isDark
                ? 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'
                : 'bg-stone-200/70 border-stone-300 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <CloudDownload className="w-3.5 h-3.5" />
            <span>{isDownloaded ? 'Cached Offline' : 'Cache Chapters'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsDiscussionsOpen(true)}
            className={`min-h-[40px] px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
              isDark
                ? 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'
                : 'bg-stone-200/70 border-stone-300 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Discussions ({comments.length})</span>
          </button>
        </div>
      </div>

      {/* Synopsis Section: Changed "read full synopsis" to "show more" */}
      <section className="px-5 pt-4 relative z-10">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className={`text-[11px] font-mono uppercase tracking-widest font-medium ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
            Synopsis
          </h3>
          <button
            type="button"
            onClick={() => setIsSynopsisExpanded(!isSynopsisExpanded)}
            className="text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
            aria-label="Toggle synopsis"
          >
            {isSynopsisExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        <p
          className={`text-xs leading-relaxed font-serif transition-colors ${
            isDark ? 'text-stone-300' : 'text-stone-700'
          } ${isSynopsisExpanded ? '' : 'line-clamp-4'}`}
        >
          {book.synopsis}
        </p>

        {/* Expansion link: "Show more" / "Show less" as requested */}
        <button
          type="button"
          onClick={() => setIsSynopsisExpanded(!isSynopsisExpanded)}
          className={`text-[11px] font-medium hover:underline mt-1.5 inline-block cursor-pointer ${
            isDark ? 'text-amber-400' : 'text-stone-900'
          }`}
        >
          {isSynopsisExpanded ? 'Show less' : 'Show more'}
        </button>

        {/* Release & Translation info */}
        <div className="flex items-center gap-2 mt-3 pt-2 text-[11px] font-mono text-stone-500 border-t border-stone-800/40">
          <Languages className="w-3 h-3" />
          <span>{book.source} · {book.originalLanguage || 'Original'}</span>
        </div>
      </section>

      {/* Chapter Index Sequence */}
      <section className="px-5 pt-6 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-[11px] font-mono uppercase tracking-widest font-medium ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
            Chapter Index
          </h3>
          <span className={`text-[11px] font-mono tabular-nums ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
            {book.totalChapters || book.chapters.length} Chapters
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
              <div className="flex items-center gap-3.5 min-w-0 pr-2">
                <span className={`font-mono text-xs tabular-nums w-6 shrink-0 ${isDark ? 'text-stone-600' : 'text-stone-400'}`}>
                  {ch.id < 10 ? `0${ch.id}` : ch.id}
                </span>
                <div className="min-w-0">
                  <h4 className={`text-xs font-serif font-medium truncate ${isDark ? 'text-stone-200' : 'text-stone-900'}`}>
                    {ch.title}
                  </h4>
                  {ch.translatorNote && (
                    <span className="text-[10px] text-amber-500/80 font-mono block truncate">
                      Includes translator footnote
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
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

      {/* Pull-Up Tab Drawer brought up by the Three Dots icon */}
      {isBottomSheetOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity"
            onClick={() => setIsBottomSheetOpen(false)}
            aria-hidden="true"
          />

          {/* Bottom Pull-Up Tab Sheet */}
          <div
            className={`fixed inset-x-0 bottom-0 z-50 rounded-t-3xl p-5 shadow-2xl max-w-lg mx-auto transition-transform duration-300 ease-out flex flex-col ${
              isDark ? 'bg-[#141416] text-stone-100 border-t border-white/10' : 'bg-white text-stone-900 border-t border-stone-200'
            }`}
          >
            {/* Grab Handle */}
            <div className="w-10 h-1 rounded-full bg-stone-300 dark:bg-stone-700 mx-auto mb-3.5" />

            {/* Header info row */}
            <div className="flex items-center justify-between pb-3.5 border-b border-stone-200/60 dark:border-white/10">
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-10 h-14 object-cover rounded-md shadow-sm shrink-0 ring-1 ring-black/10"
                />
                <div className="min-w-0">
                  <h4 className="font-serif font-bold text-sm truncate">{book.title}</h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 truncate">{book.author}</p>
                  <span className={`text-[10px] font-mono mt-0.5 inline-block ${isDark ? 'text-amber-400' : 'text-amber-800'}`}>
                    {book.genre}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsBottomSheetOpen(false)}
                className={`min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                  isDark ? 'hover:bg-white/10 text-stone-300' : 'hover:bg-stone-100 text-stone-600'
                }`}
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Action options inside the pull-up tab */}
            <div className="py-2.5 space-y-1">
              {/* 1. Favorite / Save to Library */}
              <button
                type="button"
                onClick={handleToggleSave}
                className={`w-full p-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                  isDark ? 'hover:bg-white/5 active:bg-white/10' : 'hover:bg-stone-100 active:bg-stone-200/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isSaved
                        ? isDark
                          ? 'bg-amber-400/20 text-amber-400'
                          : 'bg-amber-100 text-amber-800'
                        : isDark
                        ? 'bg-white/5 text-stone-400'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold">{isSaved ? 'In Library (Favorited)' : 'Add to Library'}</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      {isSaved ? 'Saved to personal bookshelf' : 'Bookmark for future reading'}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full ${
                    isSaved
                      ? isDark
                        ? 'bg-amber-400/20 text-amber-300'
                        : 'bg-amber-100 text-amber-800'
                      : isDark
                      ? 'bg-white/10 text-stone-400'
                      : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {isSaved ? 'Saved' : 'Add'}
                </span>
              </button>

              {/* 2. Download for Offline */}
              <button
                type="button"
                onClick={handleDownload}
                className={`w-full p-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                  isDark ? 'hover:bg-white/5 active:bg-white/10' : 'hover:bg-stone-100 active:bg-stone-200/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isDownloaded
                        ? 'bg-emerald-500/20 text-emerald-500'
                        : isDark
                        ? 'bg-white/5 text-stone-400'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    <CloudDownload className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold">{isDownloaded ? 'Downloaded Offline' : 'Download All Chapters'}</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      {isDownloaded ? 'Ready in offline cache' : `${book.chapters.length} chapters cached`}
                    </p>
                  </div>
                </div>
                {isDownloaded && <Check className="w-4 h-4 text-emerald-500" />}
              </button>

              {/* 3. Audio Narration (if available) */}
              {onOpenAudio && (
                <button
                  type="button"
                  onClick={() => {
                    setIsBottomSheetOpen(false);
                    onOpenAudio(book);
                  }}
                  className={`w-full p-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                    isDark ? 'hover:bg-white/5 active:bg-white/10' : 'hover:bg-stone-100 active:bg-stone-200/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-white/5 text-stone-400' : 'bg-stone-100 text-stone-600'}`}>
                      <Headphones className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-semibold">Audiobook Player</p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400">
                        Atmospheric whisper narration
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              )}

              {/* 4. Scene Studio */}
              {onOpenStudio && (
                <button
                  type="button"
                  onClick={() => {
                    setIsBottomSheetOpen(false);
                    onOpenStudio();
                  }}
                  className={`w-full p-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                    isDark ? 'hover:bg-white/5 active:bg-white/10' : 'hover:bg-stone-100 active:bg-stone-200/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-white/5 text-stone-400' : 'bg-stone-100 text-stone-600'}`}>
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-semibold">Scene Studio Art</p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400">
                        Generate or refine cover illustration
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              )}

              {/* 5. Share Novel */}
              <button
                type="button"
                onClick={handleShare}
                className={`w-full p-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                  isDark ? 'hover:bg-white/5 active:bg-white/10' : 'hover:bg-stone-100 active:bg-stone-200/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-white/5 text-stone-400' : 'bg-stone-100 text-stone-600'}`}>
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold">Share Novel</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      Copy citation and edition details
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>

              {/* 6. Return to Bookshelf */}
              <button
                type="button"
                onClick={() => {
                  setIsBottomSheetOpen(false);
                  onBack();
                }}
                className={`w-full p-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                  isDark ? 'hover:bg-white/5 active:bg-white/10' : 'hover:bg-stone-100 active:bg-stone-200/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-white/5 text-stone-400' : 'bg-stone-100 text-stone-600'}`}>
                    <Library className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold">Return to Bookshelf</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      Back to main library overview
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
            </div>

            {/* Bottom Dismiss */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsBottomSheetOpen(false)}
                className={`w-full py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  isDark ? 'bg-white/10 hover:bg-white/15 text-stone-200' : 'bg-stone-200/80 hover:bg-stone-300 text-stone-800'
                }`}
              >
                Close Menu
              </button>
            </div>
          </div>
        </>
      )}

      {/* Discussions Modal */}
      {isDiscussionsOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 transition-opacity"
            onClick={() => setIsDiscussionsOpen(false)}
            aria-hidden="true"
          />
          <div
            className={`fixed inset-x-0 bottom-0 z-50 rounded-t-3xl p-5 shadow-2xl max-w-lg mx-auto flex flex-col max-h-[80vh] ${
              isDark ? 'bg-[#141416] text-stone-100 border-t border-white/10' : 'bg-white text-stone-900 border-t border-stone-200'
            }`}
          >
            <div className="w-10 h-1 rounded-full bg-stone-700 mx-auto mb-3" />
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <h3 className="font-serif font-bold text-sm">Discussions ({comments.length})</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsDiscussionsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-stone-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-3">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className={`p-3 rounded-xl border ${
                    isDark ? 'bg-white/5 border-white/5' : 'bg-stone-100 border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <span className="font-semibold text-amber-400">{c.user}</span>
                    <span className="text-[10px] font-mono text-stone-500">{c.time}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-stone-300">{c.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddComment} className="pt-2 flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts on this novel..."
                className={`flex-1 text-xs px-3 py-2.5 rounded-xl border focus:outline-none ${
                  isDark
                    ? 'bg-black/50 border-stone-700 text-stone-100 placeholder-stone-500 focus:border-amber-400'
                    : 'bg-stone-100 border-stone-300 text-stone-900 focus:border-stone-800'
                }`}
              />
              <button
                type="submit"
                className="px-3.5 py-2.5 rounded-xl bg-amber-400 text-stone-950 text-xs font-semibold flex items-center gap-1 hover:bg-amber-300 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
