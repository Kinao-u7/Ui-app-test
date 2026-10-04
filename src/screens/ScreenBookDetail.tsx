import React, { useState } from 'react';
import { ArrowLeft, Bookmark, Share2, Star, BookOpen, Headphones, Clock, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { Book } from '../data/novelData';

interface ScreenBookDetailProps {
  book: Book;
  onBack: () => void;
  onOpenReader: (book: Book) => void;
  onOpenAudio: (book: Book) => void;
  onOpenStudio: () => void;
}

export const ScreenBookDetail: React.FC<ScreenBookDetailProps> = ({
  book,
  onBack,
  onOpenReader,
  onOpenAudio,
  onOpenStudio
}) => {
  const [isSaved, setIsSaved] = useState(true);
  const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F5] text-stone-900 overflow-y-auto pb-8">
      {/* Top App Bar Contract */}
      <header className="px-4 py-2 border-b border-stone-200/60 sticky top-0 bg-[#FAF8F5]/90 backdrop-blur-md z-10 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to Atelier"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-700 hover:text-stone-900 rounded-full hover:bg-stone-200/50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
        </button>

        <span className="text-xs font-serif font-semibold tracking-tight text-stone-900 truncate max-w-[180px]">
          {book.title}
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsSaved(!isSaved)}
            aria-label="Save to Sanctuary"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-700 hover:text-stone-900 rounded-full hover:bg-stone-200/50 transition-colors"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-stone-900 text-stone-900' : ''}`} />
          </button>
        </div>
      </header>

      {/* Book Cover Presentation Anchor */}
      <div className="pt-6 pb-4 px-6 flex flex-col items-center text-center">
        <div className="relative w-36 h-52 rounded-xl overflow-hidden shadow-2xl bg-stone-200 border border-stone-300/60 mb-5 group">
          <img
            src={book.coverImage}
            alt={book.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          {/* Tactile paper texture sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-stone-950/20 via-transparent to-white/10 pointer-events-none" />
          <div className="absolute top-0 right-3 w-3 h-6 bg-amber-700 shadow-md rounded-b-xs" />
        </div>

        <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800 mb-1">
          {book.genre} · {book.publishedYear}
        </span>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-stone-900 text-balance leading-tight">
          {book.title}
        </h1>
        <p className="text-xs font-medium text-stone-500 mt-1">
          by {book.author}
        </p>

        {/* Unboxed Bibliographic Stats */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mt-3 font-mono tabular-nums">
          <span>{book.totalPages} Pages</span>
          <span aria-hidden="true">·</span>
          <span>{book.readTime}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 text-stone-800 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            {book.rating} ({book.ratingCount.toLocaleString()})
          </span>
        </div>
      </div>

      {/* Primary Action Buttons (Thumb Zone) */}
      <div className="px-5 py-2 flex flex-col gap-2.5">
        <button
          type="button"
          onClick={() => onOpenReader(book)}
          className="w-full min-h-[48px] bg-stone-900 text-stone-50 text-xs font-medium rounded-xl hover:bg-stone-800 transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          <span>Enter Reading Chamber</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onOpenAudio(book)}
            className="min-h-[44px] bg-stone-200/80 text-stone-800 text-xs font-medium rounded-xl hover:bg-stone-300 transition-colors flex items-center justify-center gap-1.5"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Audiobook</span>
          </button>
          <button
            type="button"
            onClick={onOpenStudio}
            className="min-h-[44px] bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium rounded-xl hover:bg-amber-100 transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Scene Art</span>
          </button>
        </div>
      </div>

      {/* Curator's Note */}
      <section className="px-5 pt-5">
        <div className="bg-[#F4EFEA] border-l-2 border-stone-800 p-3.5 rounded-r-xl">
          <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block mb-1">
            Curator’s Monograph Preface
          </span>
          <p className="text-xs font-serif italic text-stone-700 leading-relaxed">
            “{book.curatorNote}”
          </p>
        </div>
      </section>

      {/* Synopsis with read-more toggle */}
      <section className="px-5 pt-5">
        <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
          Synopsis & Argument
        </h3>
        <p className={`text-xs text-stone-700 leading-relaxed font-serif ${isSynopsisExpanded ? '' : 'line-clamp-3'}`}>
          {book.synopsis}
        </p>
        <button
          type="button"
          onClick={() => setIsSynopsisExpanded(!isSynopsisExpanded)}
          className="text-[11px] font-medium text-stone-900 hover:underline mt-1 block"
        >
          {isSynopsisExpanded ? 'Show Less' : 'Read Full Synopsis'}
        </button>
      </section>

      {/* Chapter Index Preview */}
      <section className="px-5 pt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400">
            Chapter Sequence ({book.chapters.length})
          </h3>
          <span className="text-[11px] font-mono text-stone-400">
            Unabridged
          </span>
        </div>

        <div className="divide-y divide-stone-200/70 border-t border-b border-stone-200/70">
          {book.chapters.slice(0, 4).map((ch) => (
            <div
              key={ch.id}
              onClick={() => onOpenReader(book)}
              className="py-3 flex items-center justify-between cursor-pointer hover:bg-stone-100/60 px-1 transition-colors"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-stone-400 tabular-nums">
                  0{ch.id}
                </span>
                <div>
                  <h4 className="text-xs font-medium text-stone-900">
                    {ch.title}
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    {ch.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-stone-400">
                  {ch.readTime}
                </span>
                {ch.isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Author Monograph Card */}
      <section className="px-5 pt-6">
        <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-2.5">
          About the Author
        </h3>
        <div className="bg-white border border-stone-200/80 rounded-xl p-3.5">
          <h4 className="font-serif text-sm font-semibold text-stone-900">
            {book.author}
          </h4>
          <p className="text-xs text-stone-600 mt-1 leading-relaxed">
            {book.authorBio}
          </p>
          <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-400">
            <span>Publisher: {book.publisher}</span>
            <span>Ed. 2026</span>
          </div>
        </div>
      </section>
    </div>
  );
};
