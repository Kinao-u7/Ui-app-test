import React, { useState } from 'react';
import { ArrowLeft, Search, CheckCircle2, Bookmark, Sparkles, Copy, Check, ChevronRight } from 'lucide-react';
import { Book, Chapter, SavedQuote } from '../data/novelData';

interface ScreenTableOfContentsProps {
  book: Book;
  onBack: () => void;
  onSelectChapter: (chapter: Chapter) => void;
  onSelectQuote?: (quote: SavedQuote) => void;
}

export const ScreenTableOfContents: React.FC<ScreenTableOfContentsProps> = ({
  book,
  onBack,
  onSelectChapter,
  onSelectQuote
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

  const filteredQuotes = book.savedQuotes.filter(q =>
    q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.note.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F5] text-stone-900 overflow-y-auto pb-6">
      {/* Top App Bar Contract */}
      <header className="px-4 py-2 border-b border-stone-200/70 sticky top-0 bg-[#FAF8F5]/90 backdrop-blur-md z-10 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to Reader"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-700 hover:text-stone-900 rounded-full hover:bg-stone-200/50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
        </button>

        <div className="text-center">
          <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block">
            Folio Index
          </span>
          <h2 className="text-xs font-serif font-semibold tracking-tight text-stone-900 truncate max-w-[190px]">
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
            className="w-full text-xs bg-stone-100/80 border border-stone-200/80 rounded-xl pl-8 pr-3 py-2 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-700"
          />
        </div>
      </div>

      {/* Segmented Control Tabs */}
      <div className="px-5 py-2">
        <div className="p-1 bg-stone-200/60 rounded-xl grid grid-cols-3 gap-1 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('chapters')}
            className={`min-h-[38px] rounded-lg transition-colors flex items-center justify-center ${
              activeTab === 'chapters'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Chapters ({book.chapters.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('quotes')}
            className={`min-h-[38px] rounded-lg transition-colors flex items-center justify-center ${
              activeTab === 'quotes'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Marginalia ({book.savedQuotes.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bookmarks')}
            className={`min-h-[38px] rounded-lg transition-colors flex items-center justify-center ${
              activeTab === 'bookmarks'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Bookmarks (3)
          </button>
        </div>
      </div>

      {/* Tab 1: Chapters Sequence */}
      {activeTab === 'chapters' && (
        <div className="px-5 pt-2 divide-y divide-stone-200/60">
          {filteredChapters.map((ch) => (
            <div
              key={ch.id}
              onClick={() => onSelectChapter(ch)}
              className={`py-3.5 px-2 flex items-center justify-between cursor-pointer rounded-lg transition-colors ${
                ch.isCurrent ? 'bg-amber-500/10 border-l-2 border-amber-600' : 'hover:bg-stone-100/60'
              }`}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs font-semibold text-stone-400 tabular-nums">
                  0{ch.id}
                </span>
                <div>
                  <h3 className="text-xs font-semibold text-stone-900 font-serif">
                    {ch.title}
                  </h3>
                  <p className="text-[11px] text-stone-500 font-sans mt-0.5">
                    {ch.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-[10px] text-stone-400">
                <span>{ch.readTime}</span>
                {ch.isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                {ch.isCurrent && (
                  <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                )}
                {!ch.isCompleted && !ch.isCurrent && (
                  <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Marginalia & Saved Quotes */}
      {activeTab === 'quotes' && (
        <div className="px-5 pt-3 space-y-3">
          {filteredQuotes.map((q) => (
            <div
              key={q.id}
              className="bg-white border border-stone-200/80 rounded-xl p-3.5 shadow-2xs hover:border-stone-300 transition-colors"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 mb-1.5">
                <span>{q.chapter} · Pg {q.page}</span>
                <span>{q.timestamp}</span>
              </div>
              <blockquote className="font-serif italic text-xs text-stone-800 leading-relaxed pl-2.5 border-l-2 border-amber-500">
                “{q.text}”
              </blockquote>
              <p className="text-[11px] text-stone-600 mt-2 bg-stone-50 p-2 rounded-md font-sans">
                <span className="font-medium text-stone-900">Note: </span>
                {q.note}
              </p>
              <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleCopy(q.id, q.text)}
                  className="min-h-[44px] text-[11px] font-mono text-stone-600 hover:text-stone-900 flex items-center gap-1"
                >
                  {copiedId === q.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === q.id ? 'Copied' : 'Copy Excerpt'}</span>
                </button>
                {onSelectQuote && (
                  <button
                    type="button"
                    onClick={() => onSelectQuote(q)}
                    className="min-h-[44px] text-[11px] text-amber-800 font-medium hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Illustrate</span>
                  </button>
                )}
              </div>
            </div>
          ))}
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
              onClick={() => onSelectChapter(book.chapters[i])}
              className="bg-white border border-stone-200/80 rounded-xl p-3 cursor-pointer hover:border-stone-400 transition-colors flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400">
                  <Bookmark className="w-3 h-3 fill-stone-800 text-stone-800" />
                  <span>Page {b.page}</span>
                  <span aria-hidden="true">·</span>
                  <span>{b.date}</span>
                </div>
                <h4 className="text-xs font-semibold text-stone-900 font-serif mt-0.5">
                  {b.chapter}
                </h4>
                <p className="text-[11px] text-stone-500 font-serif italic truncate max-w-[260px] mt-0.5">
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
