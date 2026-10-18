import React, { useState } from 'react';
import {
  ArrowDownToLine,
  CheckCircle2,
  Trash2,
  BookOpen,
  HardDrive,
  Wifi,
  Sparkles,
  ArrowRight,
  RefreshCw,
  FolderDown,
  Layers
} from 'lucide-react';
import { Book, NOVEL_BOOKS } from '../data/novelData';

interface ScreenDownloadsProps {
  onOpenReader: (book: Book) => void;
  onSelectBook: (book: Book) => void;
  onOpenDiscover?: () => void;
  isDark?: boolean;
}

export const ScreenDownloads: React.FC<ScreenDownloadsProps> = ({
  onOpenReader,
  onSelectBook,
  onOpenDiscover,
  isDark = false
}) => {
  // Downloaded items state
  const [downloadedBooks, setDownloadedBooks] = useState<Array<{ book: Book; downloadedChapters: number; sizeMb: number }>>([
    { book: NOVEL_BOOKS[0], downloadedChapters: NOVEL_BOOKS[0].chapters.length, sizeMb: 4.8 },
    { book: NOVEL_BOOKS[1], downloadedChapters: NOVEL_BOOKS[1].chapters.length, sizeMb: 6.2 },
    { book: NOVEL_BOOKS[2], downloadedChapters: 3, sizeMb: 2.1 },
  ]);

  const [autoDownloadNext, setAutoDownloadNext] = useState(true);
  const [downloadWifiOnly, setDownloadWifiOnly] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const totalStorageMb = downloadedBooks.reduce((sum, item) => sum + item.sizeMb, 0);

  const handleRemoveDownload = (bookId: string) => {
    setDownloadedBooks(prev => prev.filter(item => item.book.id !== bookId));
  };

  const handleDownloadAll = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setDownloadedBooks([
        { book: NOVEL_BOOKS[0], downloadedChapters: NOVEL_BOOKS[0].chapters.length, sizeMb: 4.8 },
        { book: NOVEL_BOOKS[1], downloadedChapters: NOVEL_BOOKS[1].chapters.length, sizeMb: 6.2 },
        { book: NOVEL_BOOKS[2], downloadedChapters: 3, sizeMb: 2.1 },
      ]);
      setIsRefreshing(false);
    }, 500);
  };

  const handleClearAllDownloads = () => {
    setDownloadedBooks([]);
  };

  const isDownloadsEmpty = downloadedBooks.length === 0;

  return (
    <div
      className={`flex-1 flex flex-col transition-colors duration-200 overflow-y-auto pb-8 ${
        isDark ? 'bg-[#000000] text-stone-100' : 'bg-[#FAF8F5] text-stone-900'
      }`}
    >
      {/* Top Downloads Header */}
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
            Offline Vault
          </span>
          <h1 className="text-xl font-serif font-semibold tracking-tight">
            Downloads
          </h1>
        </div>

        <div>
          {!isDownloadsEmpty ? (
            <button
              type="button"
              onClick={handleClearAllDownloads}
              className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                isDark
                  ? 'border-stone-800 text-stone-400 hover:text-rose-400 hover:border-rose-900/60 bg-stone-900/50'
                  : 'border-stone-300 text-stone-600 hover:text-rose-600 hover:border-rose-300 bg-white'
              }`}
            >
              Clear All
            </button>
          ) : (
            <button
              type="button"
              onClick={handleDownloadAll}
              className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                isDark
                  ? 'border-stone-800 text-amber-400 hover:border-amber-400/60 bg-stone-900/50'
                  : 'border-stone-300 text-stone-800 hover:border-stone-400 bg-white'
              }`}
            >
              Restore Samples
            </button>
          )}
        </div>
      </header>

      {/* Conditional Rendering: Full-Screen Empty State VS Downloaded Content */}
      {isDownloadsEmpty ? (
        /* Dedicated Full-Screen Empty Downloads State */
        <section className="flex-1 flex flex-col items-center justify-center px-6 py-14 text-center">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border ${
              isDark ? 'bg-stone-900 border-stone-800 text-amber-400' : 'bg-stone-100 border-stone-200 text-stone-700'
            }`}
          >
            <FolderDown className="w-7 h-7 stroke-[1.6]" />
          </div>

          <span
            className={`text-[10px] font-mono uppercase tracking-widest block mb-1 ${
              isDark ? 'text-amber-400/80' : 'text-stone-400'
            }`}
          >
            Offline Vault Empty
          </span>

          <h2 className="font-serif text-xl font-semibold tracking-tight mb-1.5">
            No Downloaded Novels
          </h2>
          <p className={`text-xs max-w-xs leading-relaxed mb-6 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
            Save novels and chapters for offline reading during commutes, flights, or when you are disconnected.
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

            <button
              type="button"
              onClick={handleDownloadAll}
              className={`w-full py-2.5 px-4 text-xs font-medium rounded-xl border transition-colors cursor-pointer ${
                isDark
                  ? 'border-stone-800 hover:bg-stone-900 text-stone-300'
                  : 'border-stone-300 hover:bg-stone-100 text-stone-700'
              }`}
            >
              Load Sample Downloads (3)
            </button>
          </div>
        </section>
      ) : (
        /* Active Downloads Screen Content */
        <>
          {/* Storage Indicator Hero */}
          <section className="px-4 pt-3 pb-2">
            <div
              className={`p-3.5 rounded-2xl border transition-colors ${
                isDark
                  ? 'bg-[#0D0D0D] border-neutral-900 text-stone-200'
                  : 'bg-white border-stone-200/90 text-stone-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <HardDrive className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                  <span className="text-xs font-semibold">Offline Device Cache</span>
                </div>
                <span className="text-[11px] font-mono text-stone-400">
                  {totalStorageMb.toFixed(1)} MB used
                </span>
              </div>

              {/* Progress gauge */}
              <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-stone-800' : 'bg-stone-200'}`}>
                <div
                  className={`h-full rounded-full ${isDark ? 'bg-amber-400' : 'bg-stone-900'}`}
                  style={{ width: `${Math.min(100, Math.max(5, (totalStorageMb / 128) * 100))}%` }}
                />
              </div>

              <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-stone-200/50 dark:border-stone-800/80 text-[10px] font-mono opacity-70">
                <span>{downloadedBooks.length} novels cached</span>
                <span>Allocated: 128 MB</span>
              </div>
            </div>
          </section>

          {/* Settings Row: Wifi & Auto-download */}
          <section className="px-4 pt-1 pb-2">
            <div
              className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                isDark ? 'bg-stone-900/40 border-stone-800' : 'bg-stone-100/60 border-stone-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Wifi className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-[11px] font-medium">Auto-download next on Wi-Fi</span>
              </div>
              <button
                type="button"
                onClick={() => setAutoDownloadNext(!autoDownloadNext)}
                aria-label="Toggle auto-download"
                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                  autoDownloadNext
                    ? isDark ? 'bg-amber-400' : 'bg-stone-900'
                    : isDark ? 'bg-stone-800' : 'bg-stone-300'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                    autoDownloadNext ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          </section>

          {/* Downloaded Novels List */}
          <section className="px-4 pt-2 flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                Downloaded Novels ({downloadedBooks.length})
              </span>
              {downloadedBooks.length < NOVEL_BOOKS.length && (
                <button
                  type="button"
                  onClick={handleDownloadAll}
                  disabled={isRefreshing}
                  className={`text-[10px] font-mono flex items-center gap-1 cursor-pointer ${
                    isDark ? 'text-amber-400 hover:underline' : 'text-stone-800 hover:underline'
                  }`}
                >
                  <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>{isRefreshing ? 'Syncing...' : 'Sync Catalog'}</span>
                </button>
              )}
            </div>

            <div
              className={`divide-y border rounded-xl overflow-hidden ${
                isDark ? 'divide-neutral-900 border-neutral-900 bg-[#0D0D0D]' : 'divide-stone-200/70 border-stone-200/80 bg-white'
              }`}
            >
              {downloadedBooks.map(({ book, downloadedChapters, sizeMb }) => (
                <div
                  key={book.id}
                  className={`p-3 flex items-center gap-3 transition-colors ${
                    isDark ? 'hover:bg-stone-900/50' : 'hover:bg-stone-50'
                  }`}
                >
                  {/* Book Cover */}
                  <div
                    onClick={() => onSelectBook(book)}
                    className={`w-12 h-17 rounded-md overflow-hidden shrink-0 shadow-xs border relative cursor-pointer ${
                      isDark ? 'bg-stone-800 border-stone-700' : 'bg-stone-200 border-stone-300/60'
                    }`}
                  >
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-amber-500" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0" onClick={() => onSelectBook(book)}>
                    <h3 className="font-serif text-xs font-semibold truncate leading-tight cursor-pointer">
                      {book.title}
                    </h3>
                    <p className={`text-[11px] truncate mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                      {book.author}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] font-mono text-stone-400">
                      <span className="flex items-center gap-1 text-emerald-500">
                        <CheckCircle2 className="w-3 h-3" />
                        {downloadedChapters}/{book.chapters.length} Ch.
                      </span>
                      <span>·</span>
                      <span>{sizeMb} MB</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => onOpenReader(book)}
                      className={`min-h-[32px] px-2.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                        isDark
                          ? 'bg-amber-400 text-stone-950 hover:bg-amber-300'
                          : 'bg-stone-900 text-stone-50 hover:bg-stone-800'
                      }`}
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Read</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveDownload(book.id)}
                      aria-label="Remove download"
                      className={`min-h-[32px] min-w-[32px] rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                        isDark
                          ? 'border-stone-800 text-stone-400 hover:text-red-400 hover:border-red-900/40'
                          : 'border-stone-200 text-stone-400 hover:text-red-600 hover:border-red-200'
                      }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
