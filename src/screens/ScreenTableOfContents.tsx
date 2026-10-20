import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Copy,
  Check,
  ChevronRight,
  Quote as QuoteIcon,
  Trash2,
  BookOpen
} from 'lucide-react';
import { Book, Chapter, SavedQuote } from '../data/novelData';

interface ScreenTableOfContentsProps {
  book: Book;
  onBack: () => void;
  onSelectChapter: (chapter: Chapter) => void;
  onSelectQuote?: (quote: SavedQuote) => void;
  onDeleteQuote?: (quoteId: string) => void;
  isDark?: boolean;
}

export const ScreenTableOfContents: React.FC<ScreenTableOfContentsProps> = ({
  book,
  onBack,
  onSelectChapter,
  onSelectQuote,
  onDeleteQuote,
  isDark = false
}) => {
  const [activeTab, setActiveTab] = useState<'chapters' | 'quotes' | 'bookmarks'>('chapters');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const filteredChapters = book.chapters.filter(ch =>
    ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ch.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredQuotes = (book.savedQuotes || []).filter(q =>
    q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.note.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.chapter.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`flex-1 flex flex-col transition-colors duration-200 overflow-y-auto pb-6 ${
        isDark ? 'bg-[#000000] text-stone-100' : 'bg-[#FAF8F5] text-stone-900'
      }`}
    >
      {/* Top App Bar Header */}
      <header
        className={`px-4 py-2 border-b sticky top-0 backdrop-blur-md z-10 flex items-center justify-between ${
          isDark
            ? 'bg-[#000000]/90 border-neutral-900 text-stone-100'
            : 'bg-[#FAF8F5]/90 border-stone-200/70 text-stone-900'
        }`}
      >
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to Reader"
          className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full transition-colors cursor-pointer ${
            isDark ? 'text-stone-300 hover:bg-stone-900' : 'text-stone-700 hover:bg-stone-200/50'
          }`}
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
        </button>

        <div className="text-center">
          <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block">
            Folio Index
          </span>
          <h2 className="text-xs font-serif font-semibold tracking-tight truncate max-w-[190px]">
            {book.title}
          </h2>
        </div>

        <div className="min-w-[44px]" />
      </header>

      {/* Search Bar */}
      <div className="px-5 pt-3 pb-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chapters, quotes, or notes..."
            className={`w-full text-xs rounded-xl pl-8 pr-3 py-2 outline-none transition-colors border ${
              isDark
                ? 'bg-stone-900/80 border-stone-800 text-stone-100 placeholder:text-stone-500 focus:border-amber-400'
                : 'bg-stone-100/80 border-stone-200/80 text-stone-900 placeholder:text-stone-400 focus:border-stone-800'
            }`}
          />
        </div>
      </div>

      {/* Segmented Control Tabs */}
      <div className="px-5 py-2">
        <div
          className={`p-1 rounded-xl grid grid-cols-3 gap-1 text-xs font-medium ${
            isDark ? 'bg-stone-900 border border-stone-800' : 'bg-stone-200/60'
          }`}
        >
          <button
            type="button"
            onClick={() => setActiveTab('chapters')}
            className={`min-h-[36px] rounded-lg transition-colors flex items-center justify-center cursor-pointer ${
              activeTab === 'chapters'
                ? isDark
                  ? 'bg-stone-800 text-amber-400 shadow-xs'
                  : 'bg-white text-stone-900 shadow-xs'
                : isDark
                ? 'text-stone-400 hover:text-stone-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Chapters ({book.chapters.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('quotes')}
            className={`min-h-[36px] rounded-lg transition-colors flex items-center justify-center cursor-pointer ${
              activeTab === 'quotes'
                ? isDark
                  ? 'bg-stone-800 text-amber-400 shadow-xs'
                  : 'bg-white text-stone-900 shadow-xs'
                : isDark
                ? 'text-stone-400 hover:text-stone-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Quotes ({book.savedQuotes?.length || 0})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bookmarks')}
            className={`min-h-[36px] rounded-lg transition-colors flex items-center justify-center cursor-pointer ${
              activeTab === 'bookmarks'
                ? isDark
                  ? 'bg-stone-800 text-amber-400 shadow-xs'
                  : 'bg-white text-stone-900 shadow-xs'
                : isDark
                ? 'text-stone-400 hover:text-stone-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Bookmarks (3)
          </button>
        </div>
      </div>

      {/* Tab 1: Chapters Sequence */}
      {activeTab === 'chapters' && (
        <div className="px-5 pt-2 divide-y divide-stone-200/40 dark:divide-stone-800/60">
          {filteredChapters.map((ch) => (
            <div
              key={ch.id}
              onClick={() => onSelectChapter(ch)}
              className={`py-3.5 px-2 flex items-center justify-between cursor-pointer rounded-lg transition-colors ${
                ch.isCurrent
                  ? 'bg-amber-500/10 border-l-2 border-amber-600'
                  : isDark
                  ? 'hover:bg-stone-900/50'
                  : 'hover:bg-stone-100/60'
              }`}
            >
              <div className="flex items-baseline gap-3 min-w-0">
                <span className="font-mono text-xs font-semibold text-stone-400 tabular-nums">
                  0{ch.id}
                </span>
                <div className="min-w-0">
                  <h3 className="text-xs font-semibold font-serif truncate">
                    {ch.title}
                  </h3>
                  <p className={`text-[11px] font-sans mt-0.5 truncate ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                    {ch.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-[10px] text-stone-400 shrink-0 ml-2">
                {ch.isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                {ch.isCurrent && (
                  <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                )}
                {!ch.isCompleted && !ch.isCurrent && (
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Dedicated 'Quote' Cards Section */}
      {activeTab === 'quotes' && (
        <div className="px-5 pt-3 space-y-3.5">
          {filteredQuotes.length === 0 ? (
            /* Empty Quotes State */
            <div
              className={`p-8 rounded-2xl border text-center flex flex-col items-center justify-center my-4 ${
                isDark ? 'bg-stone-950/50 border-stone-800' : 'bg-white border-stone-200/80'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 border ${
                  isDark ? 'bg-stone-900 border-stone-800 text-amber-400' : 'bg-stone-100 border-stone-200 text-stone-700'
                }`}
              >
                <QuoteIcon className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-sm font-semibold mb-1">
                No Quote Cards Saved Yet
              </h3>
              <p className={`text-xs max-w-xs leading-relaxed mb-4 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                Highlight and select any prose while reading to save it as an excerpt quote card in this section.
              </p>
              <button
                type="button"
                onClick={onBack}
                className={`py-2 px-4 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  isDark
                    ? 'border-stone-800 bg-stone-900 text-amber-400 hover:bg-stone-800'
                    : 'border-stone-300 bg-stone-50 text-stone-800 hover:bg-stone-100'
                }`}
              >
                Return to Reader
              </button>
            </div>
          ) : (
            /* List of 'Quote' Cards */
            filteredQuotes.map((q) => (
              <div
                key={q.id}
                className={`border rounded-2xl p-4 transition-all shadow-2xs group ${
                  isDark
                    ? 'bg-[#101012] border-stone-800/90 hover:border-stone-700'
                    : 'bg-white border-stone-200/90 hover:border-stone-300'
                }`}
              >
                {/* Quote Card Header */}
                <div className="flex items-center justify-between text-[10.5px] font-mono text-stone-400 mb-2">
                  <div className="flex items-center gap-1.5">
                    <QuoteIcon className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                    <span className="font-medium text-stone-700 dark:text-stone-300">
                      {q.chapter}
                    </span>
                    <span>·</span>
                    <span>Pg {q.page}</span>
                  </div>
                  <span>{q.timestamp}</span>
                </div>

                {/* Excerpt Body in Newsreader Serif */}
                <blockquote
                  className={`font-serif italic text-xs leading-relaxed pl-3 border-l-2 py-0.5 mb-2.5 ${
                    q.color === 'sage'
                      ? 'border-emerald-500 text-emerald-950 dark:text-emerald-100'
                      : q.color === 'ink'
                      ? 'border-stone-700 text-stone-900 dark:text-stone-100'
                      : 'border-amber-500 text-stone-900 dark:text-stone-100'
                  }`}
                >
                  “{q.text}”
                </blockquote>

                {/* Note / Annotation */}
                {q.note && (
                  <div
                    className={`text-[11px] p-2 rounded-lg font-sans mb-3 ${
                      isDark ? 'bg-stone-900/80 text-stone-300' : 'bg-stone-50 text-stone-600'
                    }`}
                  >
                    <span className="font-semibold text-stone-800 dark:text-stone-200">Note: </span>
                    {q.note}
                  </div>
                )}

                {/* Quote Card Actions Footer */}
                <div className="pt-2 border-t border-stone-200/50 dark:border-stone-800/70 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(q.id, q.text)}
                      className="min-h-[32px] px-2.5 rounded-lg border border-stone-200 dark:border-stone-800 font-mono text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedId === q.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === q.id ? 'Copied' : 'Copy'}</span>
                    </button>

                    {onSelectQuote && (
                      <button
                        type="button"
                        onClick={() => onSelectQuote(q)}
                        className="min-h-[32px] px-2.5 rounded-lg border border-amber-300 dark:border-amber-900/50 bg-amber-500/10 text-amber-800 dark:text-amber-400 font-medium hover:bg-amber-500/20 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Illustrate</span>
                      </button>
                    )}
                  </div>

                  {onDeleteQuote && (
                    <button
                      type="button"
                      onClick={() => onDeleteQuote(q.id)}
                      aria-label="Delete Quote Card"
                      className="min-h-[32px] min-w-[32px] rounded-lg flex items-center justify-center text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
                      title="Delete Quote Card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Bookmarks */}
      {activeTab === 'bookmarks' && (
        <div className="px-5 pt-3 space-y-2.5">
          {[
            { page: 24, chapter: 'Chapter 1: The Horizon Line', snippet: 'When the wind turned from the northwest, the glass hummed at 44Hz...', date: 'Yesterday' },
            { page: 68, chapter: 'Chapter 2: Whispers in Granite', snippet: 'Between the third and fourth vertical joints of the southern pier...', date: '2 days ago' },
            { page: 114, chapter: 'Chapter 3: Salt and Shadow', snippet: 'The sea was no longer blue or green; it was the color of lead...', date: 'Today at 07:42' },
          ].map((b, i) => (
            <div
              key={i}
              onClick={() => onSelectChapter(book.chapters[i] || book.chapters[0])}
              className={`border rounded-xl p-3 cursor-pointer transition-colors flex items-center justify-between ${
                isDark
                  ? 'bg-[#101012] border-stone-800 hover:border-stone-700'
                  : 'bg-white border-stone-200/80 hover:border-stone-400'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400">
                  <Bookmark className="w-3 h-3 fill-current text-amber-500" />
                  <span>Page {b.page}</span>
                  <span aria-hidden="true">·</span>
                  <span>{b.date}</span>
                </div>
                <h4 className="text-xs font-semibold font-serif mt-0.5">
                  {b.chapter}
                </h4>
                <p className={`text-[11px] font-serif italic truncate max-w-[260px] mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  “{b.snippet}”
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
