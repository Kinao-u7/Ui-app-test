import React, { useState, useEffect } from 'react';
import {
  Search,
  Plus,
  Globe,
  Layers,
  Check,
  X,
  Trash2,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Star,
  Bookmark
} from 'lucide-react';
import { Book } from '../data/novelData';

export type SourceType = 'scraper' | 'api' | 'web';

export interface NovelSource {
  id: string;
  name: string;
  url: string;
  type: SourceType;
  description: string;
  availableCount: string;
  isEnabled: boolean;
  isFavorite?: boolean;
  isCustom: boolean;
  lastSynced: string;
  status: 'active' | 'syncing' | 'error';
  pingMs?: number;
}

const DEFAULT_SOURCES: NovelSource[] = [
  {
    id: 'src-wtr-lab',
    name: 'WTR-LAB',
    url: 'https://wtr-lab.com',
    type: 'scraper',
    description: 'Machine & community translated web novel archive',
    availableCount: '15,000+ Novels',
    isEnabled: true,
    isFavorite: true,
    isCustom: false,
    lastSynced: '5m ago',
    status: 'active',
    pingMs: 24
  },
  {
    id: 'src-novelfire',
    name: 'NovelFire',
    url: 'https://novelfire.com',
    type: 'scraper',
    description: 'Popular translated progression and fantasy novels',
    availableCount: '8,500+ Novels',
    isEnabled: true,
    isFavorite: true,
    isCustom: false,
    lastSynced: '12m ago',
    status: 'active',
    pingMs: 32
  },
  {
    id: 'src-wuxiaworld',
    name: 'WuxiaWorld',
    url: 'https://wuxiaworld.com',
    type: 'scraper',
    description: 'Premier portal for translated Chinese Xianxia, Wuxia, and cultivation web novels',
    availableCount: '3,800+ Serials',
    isEnabled: true,
    isFavorite: true,
    isCustom: false,
    lastSynced: '8m ago',
    status: 'active',
    pingMs: 32
  },
  {
    id: 'src-royal-road',
    name: 'Royal Road',
    url: 'https://royalroad.com',
    type: 'scraper',
    description: 'Ongoing serialized progression fantasy, LitRPG, and hard-magic web serials',
    availableCount: '45,000+ Serials',
    isEnabled: true,
    isFavorite: true,
    isCustom: false,
    lastSynced: '15m ago',
    status: 'active',
    pingMs: 44
  },
  {
    id: 'src-nu-crawler',
    name: 'NovelUpdates',
    url: 'https://novelupdates.com',
    type: 'scraper',
    description: 'Comprehensive directory of translated Asian web novels and release trackers',
    availableCount: '25,000+ Novels',
    isEnabled: true,
    isFavorite: true,
    isCustom: false,
    lastSynced: '25m ago',
    status: 'active',
    pingMs: 58
  },
  {
    id: 'src-syosetu',
    name: 'Syosetu',
    url: 'https://syosetu.com',
    type: 'scraper',
    description: 'The world largest Japanese web novel and light novel serialized ecosystem',
    availableCount: '100,000+ Works',
    isEnabled: true,
    isFavorite: false,
    isCustom: false,
    lastSynced: '1h ago',
    status: 'active',
    pingMs: 64
  },
  {
    id: 'src-scribblehub',
    name: 'ScribbleHub',
    url: 'https://scribblehub.com',
    type: 'scraper',
    description: 'Indie serialized fiction, LitRPG, dungeon crawls, and original web novels',
    availableCount: '14,000+ Novels',
    isEnabled: true,
    isFavorite: false,
    isCustom: false,
    lastSynced: '30m ago',
    status: 'active',
    pingMs: 48
  },
  {
    id: 'src-lightnovelpub',
    name: 'LightNovelPub',
    url: 'https://lightnovelpub.com',
    type: 'scraper',
    description: 'Archive of serialized light novels and eastern fantasy',
    availableCount: '6,200+ Books',
    isEnabled: true,
    isFavorite: false,
    isCustom: false,
    lastSynced: '2h ago',
    status: 'active',
    pingMs: 42
  }
];

const BROWSER_BOOKMARKS = [
  { name: 'WTR-LAB', url: 'https://wtr-lab.com' },
  { name: 'NovelFire', url: 'https://novelfire.com' },
  { name: 'Royal Road', url: 'https://royalroad.com' },
  { name: 'WuxiaWorld', url: 'https://wuxiaworld.com' },
  { name: 'NovelUpdates', url: 'https://novelupdates.com' },
  { name: 'ScribbleHub', url: 'https://scribblehub.com' },
];

// Helper to format clean domain with capitalized prefix: e.g. Wtr-lab.com, Novelfire.com
export const formatDisplayDomain = (url: string): string => {
  try {
    const withoutProtocol = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');
    const host = withoutProtocol.split('/')[0].split('?')[0].split('#')[0];
    if (!host) return url;
    const dotIndex = host.lastIndexOf('.');
    if (dotIndex > 0) {
      const name = host.slice(0, dotIndex);
      const tld = host.slice(dotIndex + 1);
      return `${name.charAt(0).toUpperCase() + name.slice(1)}.${tld}`;
    }
    return host;
  } catch {
    return url;
  }
};

interface ScreenExploreProps {
  onSelectBook?: (book: Book) => void;
  onOpenReader?: (book: Book) => void;
  onOpenAudio?: (book: Book) => void;
  onOpenStudio?: () => void;
  isDark?: boolean;
  onToggleDarkMode?: () => void;
}

export const ScreenExplore: React.FC<ScreenExploreProps> = ({
  isDark = false,
}) => {
  // Load sources from localStorage with fallback to default sources
  const [sources, setSources] = useState<NovelSource[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('folio_novel_sources_v5');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch {
        // Fallback to default
      }
    }
    return DEFAULT_SOURCES;
  });

  useEffect(() => {
    localStorage.setItem('folio_novel_sources_v5', JSON.stringify(sources));
  }, [sources]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBrowserOpen, setIsBrowserOpen] = useState(false);

  // In-app browser state
  const [browserUrl, setBrowserUrl] = useState('https://wtr-lab.com');
  const [browserInput, setBrowserInput] = useState('https://wtr-lab.com');

  // Simple new source link form state
  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');
  const [formError, setFormError] = useState('');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleToggleFavorite = (id: string) => {
    setSources(prev =>
      prev.map(src => {
        if (src.id === id) {
          const nextFav = !src.isFavorite;
          showToast(nextFav ? `Favorited "${src.name}"` : `Unfavorited "${src.name}"`);
          return { ...src, isFavorite: nextFav };
        }
        return src;
      })
    );
  };

  const handleDeleteSource = (id: string, name: string) => {
    setSources(prev => prev.filter(src => src.id !== id));
    showToast(`Removed source "${name}"`);
  };

  const handleAddCustomSource = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUrl = newUrl.trim();
    if (!cleanUrl || !cleanUrl.includes('.')) {
      setFormError('Please enter a valid website link (e.g. wtr-lab.com)');
      return;
    }

    const domain = formatDisplayDomain(cleanUrl);
    const domainNameOnly = domain.split('.')[0] || 'Novel Source';
    const finalName = newName.trim() || domainNameOnly;

    const newSource: NovelSource = {
      id: `custom-src-${Date.now()}`,
      name: finalName,
      url: cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`,
      type: 'scraper',
      description: 'Web novel archive source',
      availableCount: 'Online Index',
      isEnabled: true,
      isFavorite: true,
      isCustom: true,
      lastSynced: 'Just now',
      status: 'active',
      pingMs: Math.floor(25 + Math.random() * 30)
    };

    setSources(prev => [...prev, newSource]);
    setIsAddModalOpen(false);
    setNewUrl('');
    setNewName('');
    setFormError('');
    showToast(`Source "${newSource.name}" added successfully!`);
  };

  const handleRestoreDefaults = () => {
    setSources(DEFAULT_SOURCES);
    showToast('Default novel sources restored');
  };

  const handleAddCurrentBrowserAsSource = () => {
    const domain = formatDisplayDomain(browserUrl);
    const domainNameOnly = domain.split('.')[0] || 'Novel Source';

    const newSource: NovelSource = {
      id: `custom-src-${Date.now()}`,
      name: domainNameOnly,
      url: browserUrl,
      type: 'scraper',
      description: 'Web novel source from browser',
      availableCount: 'Online Index',
      isEnabled: true,
      isFavorite: true,
      isCustom: true,
      lastSynced: 'Just now',
      status: 'active',
      pingMs: Math.floor(20 + Math.random() * 25)
    };

    setSources(prev => [...prev, newSource]);
    setIsBrowserOpen(false);
    showToast(`Connected "${newSource.name}" to Sources!`);
  };

  // Filter sources by search query
  const filteredSources = sources.filter(src => {
    return (
      searchQuery.trim() === '' ||
      src.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.url.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div
      className={`flex-1 flex flex-col transition-colors duration-200 h-full relative overflow-hidden ${
        isDark ? 'bg-[#0A0A0A] text-stone-100' : 'bg-[#FFFFFF] text-stone-900'
      }`}
    >
      {/* Toast Alert */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl text-xs font-mono shadow-xl bg-stone-900 text-stone-100 dark:bg-amber-400 dark:text-stone-950 border border-stone-700/50 flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto pb-8">
        {/* Header Bar: Sources as main heading */}
        <header
          className={`px-4 pt-3.5 pb-3 border-b sticky top-0 backdrop-blur-md z-20 flex items-center justify-between ${
            isDark
              ? 'bg-[#0A0A0A]/90 border-stone-800/60 text-stone-100'
              : 'bg-[#FFFFFF]/90 border-stone-200/70 text-stone-900'
          }`}
        >
          <div>
            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider block text-amber-600 dark:text-amber-400 leading-none mb-0.5">
              Catalogs & Crawlers
            </span>
            <h1 className={`text-xl font-sans font-semibold tracking-tight ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>
              Sources
            </h1>
          </div>

          {/* Top Right: Browser icon with Search button next to it, merging with background without square outlines */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search Sources"
              title="Search Sources"
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isSearchOpen
                  ? isDark
                    ? 'text-amber-400 bg-white/10'
                    : 'text-stone-900 bg-stone-900/10'
                  : isDark
                  ? 'text-stone-300 hover:text-white hover:bg-white/5 active:bg-white/10'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-900/5 active:bg-stone-900/10'
              }`}
            >
              <Search className="w-5 h-5 stroke-[1.9]" />
            </button>

            <button
              type="button"
              onClick={() => setIsBrowserOpen(true)}
              aria-label="Open Browser"
              title="Open Browser"
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isDark
                  ? 'text-stone-300 hover:text-white hover:bg-white/5 active:bg-white/10'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-900/5 active:bg-stone-900/10'
              }`}
            >
              <Globe className="w-5 h-5 stroke-[1.9]" />
            </button>
          </div>
        </header>

        {/* Search Input Bar (Expandable) */}
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
              placeholder="Search sources by name or URL..."
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

        {/* Sources List Section */}
        <section className="px-4 pt-3 space-y-2">
          {/* Configured Sources Items */}
          {filteredSources.map((source) => {
            const displayDomain = formatDisplayDomain(source.url);
            return (
              <div
                key={source.id}
                className={`border rounded-2xl p-3 flex items-center justify-between transition-all shadow-2xs group ${
                  isDark
                    ? 'bg-[#121214] border-stone-800/80 hover:border-stone-700'
                    : 'bg-white border-stone-200/90 hover:border-stone-300'
                }`}
              >
                {/* Icon, Name, and Domain under site name with small browser icon */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                      source.isFavorite
                        ? isDark
                          ? 'bg-amber-400/10 border-amber-400/40 text-amber-400'
                          : 'bg-amber-100/80 border-amber-300 text-amber-800'
                        : isDark
                        ? 'bg-stone-900 border-stone-800 text-stone-400'
                        : 'bg-stone-100 border-stone-200 text-stone-500'
                    }`}
                  >
                    <Globe className="w-4 h-4 stroke-[1.8]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3
                        className={`font-sans text-[13.5px] font-semibold tracking-tight truncate ${
                          isDark ? 'text-stone-100' : 'text-stone-950'
                        }`}
                      >
                        {source.name}
                      </h3>
                      {source.isCustom && (
                        <span className="text-[8.5px] font-mono px-1 py-0.2 rounded border bg-purple-500/10 text-purple-400 border-purple-500/30">
                          Custom
                        </span>
                      )}
                    </div>

                    {/* URL under site name formatted as Wtr-lab.com with small browser icon */}
                    <div className="flex items-center gap-1.5 text-[10px] font-mono opacity-65 truncate mt-0.5">
                      <Globe className="w-2.5 h-2.5 shrink-0 opacity-80" />
                      <span className="truncate">{displayDomain}</span>
                    </div>
                  </div>
                </div>

                {/* Right controls: Delete (if custom) and Smaller Favorite Star Button */}
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  {source.isCustom && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSource(source.id, source.name);
                      }}
                      className="p-1.5 text-stone-400 hover:text-rose-500 transition-colors cursor-pointer rounded-lg hover:bg-rose-500/10"
                      title="Delete Custom Source"
                      aria-label={`Delete ${source.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Favorite Star Button - smaller bit */}
                  <button
                    type="button"
                    aria-label={source.isFavorite ? `Unfavorite ${source.name}` : `Favorite ${source.name}`}
                    title={source.isFavorite ? 'Favorited Source' : 'Favorite Source'}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFavorite(source.id);
                    }}
                    className={`min-h-[30px] min-w-[30px] flex items-center justify-center rounded-lg transition-transform active:scale-90 cursor-pointer ${
                      source.isFavorite
                        ? 'text-amber-400 hover:text-amber-300'
                        : isDark
                        ? 'text-stone-600 hover:text-stone-300'
                        : 'text-stone-300 hover:text-stone-600'
                    }`}
                  >
                    <Star
                      className={`w-3.5 h-3.5 transition-all ${
                        source.isFavorite
                          ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                          : 'stroke-[1.75]'
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Add a source moved to the BOTTOM with secondary text "paste any link to access novels" */}
          <div
            onClick={() => {
              setFormError('');
              setIsAddModalOpen(true);
            }}
            className={`border rounded-2xl p-3 flex items-center justify-between cursor-pointer transition-all shadow-2xs group mt-3 ${
              isDark
                ? 'bg-[#121214] border-stone-800/80 hover:border-amber-400/60 hover:bg-stone-900/60'
                : 'bg-white border-stone-200/90 hover:border-stone-400 hover:bg-stone-50/60'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-dashed transition-colors ${
                  isDark
                    ? 'border-amber-400/50 bg-amber-400/10 text-amber-400 group-hover:bg-amber-400/20'
                    : 'border-amber-600/50 bg-amber-50 text-amber-800 group-hover:bg-amber-100'
                }`}
              >
                <Plus className="w-4 h-4 stroke-[2.2]" />
              </div>

              <div className="min-w-0 flex-1">
                <h3
                  className={`font-serif text-xs font-semibold truncate ${
                    isDark ? 'text-amber-400 group-hover:text-amber-300' : 'text-stone-950 group-hover:text-amber-900'
                  }`}
                >
                  Add a Source
                </h3>
                <p className="text-[10.5px] opacity-60 truncate mt-0.5">
                  Paste any link to access novels
                </p>
              </div>
            </div>

            <div className="shrink-0 ml-2">
              <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </section>

        {/* Global Reset Footer */}
        <section className="px-4 pt-5 pb-2 text-center">
          <button
            type="button"
            onClick={handleRestoreDefaults}
            className="text-[11px] font-mono text-stone-500 hover:text-amber-500 hover:underline cursor-pointer"
          >
            Restore Default Sources
          </button>
        </section>
      </div>

      {/* In-App Novel Browser */}
      {isBrowserOpen && (
        <div className="absolute inset-0 z-50 flex flex-col bg-[#FFFFFF] dark:bg-[#0A0A0A] animate-in slide-in-from-bottom duration-300">
          {/* Browser Navigation Bar */}
          <div
            className={`px-3 py-2.5 border-b flex items-center gap-2 ${
              isDark ? 'bg-stone-950 border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
            }`}
          >
            <button
              type="button"
              onClick={() => setIsBrowserOpen(false)}
              aria-label="Close Browser"
              className="min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* URL Omnibox */}
            <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono bg-stone-100/80 dark:bg-stone-900/80 border-stone-200 dark:border-stone-800">
              <Globe className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <input
                type="text"
                value={browserInput}
                onChange={(e) => setBrowserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setBrowserUrl(browserInput.startsWith('http') ? browserInput : `https://${browserInput}`);
                  }
                }}
                placeholder="Enter novel feed or website URL..."
                className="w-full bg-transparent focus:outline-none truncate text-[11px]"
              />
            </div>

            {/* Quick Action: Add Current URL as Novel Source */}
            <button
              type="button"
              onClick={handleAddCurrentBrowserAsSource}
              aria-label="Add as Source"
              title="Add this site as Novel Source"
              className={`min-h-[34px] px-2.5 text-xs font-medium rounded-lg flex items-center gap-1 shadow-xs cursor-pointer ${
                isDark ? 'bg-amber-400 text-stone-950 font-semibold' : 'bg-stone-900 text-stone-50'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Source</span>
            </button>
          </div>

          {/* Browser Bookmarks Bar */}
          <div
            className={`px-3 py-2 border-b overflow-x-auto flex items-center gap-1.5 no-scrollbar text-xs font-mono ${
              isDark ? 'bg-stone-900/40 border-stone-800' : 'bg-stone-50 border-stone-200'
            }`}
          >
            <span className="text-[10px] uppercase opacity-50 shrink-0 mr-1">Bookmarks:</span>
            {BROWSER_BOOKMARKS.map((bm) => (
              <button
                key={bm.name}
                type="button"
                onClick={() => {
                  setBrowserUrl(bm.url);
                  setBrowserInput(bm.url);
                }}
                className={`px-2.5 py-1 rounded-md text-[10.5px] border shrink-0 transition-colors cursor-pointer ${
                  browserUrl === bm.url
                    ? isDark
                      ? 'border-amber-400 bg-amber-950/40 text-amber-400 font-semibold'
                      : 'border-amber-600 bg-amber-50 text-amber-900 font-semibold'
                    : isDark
                    ? 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-stone-700'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                }`}
              >
                {bm.name}
              </button>
            ))}
          </div>

          {/* Embedded Web Preview Simulator Container */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col items-center justify-center text-center">
            <div
              className={`w-full max-w-md p-6 rounded-3xl border shadow-lg ${
                isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center border ${
                  isDark ? 'bg-stone-800 border-stone-700 text-amber-400' : 'bg-stone-100 border-stone-200 text-stone-700'
                }`}
              >
                <Globe className="w-6 h-6 stroke-[1.8]" />
              </div>

              <h3 className="font-serif text-sm font-semibold mb-1 truncate">
                {browserUrl}
              </h3>
              <p className={`text-xs max-w-sm mx-auto leading-relaxed mb-4 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                Connected web novel endpoint ready. You can test feeds or connect this repository directly to your personal archive.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  type="button"
                  onClick={handleAddCurrentBrowserAsSource}
                  className={`py-2 px-4 text-xs font-semibold rounded-xl shadow-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                    isDark ? 'bg-amber-400 text-stone-950 hover:bg-amber-300' : 'bg-stone-900 text-stone-50 hover:bg-stone-800'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>Connect as Novel Source</span>
                </button>

                <a
                  href={browserUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`py-2 px-4 text-xs font-medium rounded-xl border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    isDark ? 'border-stone-700 hover:bg-stone-800 text-stone-200' : 'border-stone-300 hover:bg-stone-100 text-stone-800'
                  }`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in External Tab</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clean Link Add Modal (OPDS & RSS sheet removed) */}
      {isAddModalOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setIsAddModalOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer"
            aria-label="Close modal"
          />

          {/* Modal Panel */}
          <div
            className={`relative z-10 w-full rounded-t-3xl border-t p-5 pb-6 shadow-2xl transition-transform animate-in slide-in-from-bottom duration-300 ${
              isDark ? 'bg-[#121214] border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
            }`}
          >
            {/* Grab Handle */}
            <div className={`w-10 h-1 rounded-full mx-auto mb-4 ${isDark ? 'bg-stone-700' : 'bg-stone-300'}`} />

            {/* Header */}
            <div className="flex items-start justify-between mb-4 pb-3 border-b border-stone-200/50 dark:border-stone-800">
              <div>
                <h3 className="text-base font-serif font-semibold tracking-tight">
                  Add a Source
                </h3>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Paste any link to access novels
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                aria-label="Close"
                className={`min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                  isDark ? 'text-stone-400 hover:text-stone-100 hover:bg-stone-800' : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form to paste link */}
            <form onSubmit={handleAddCustomSource} className="space-y-3.5">
              {formError && (
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-mono">
                  {formError}
                </div>
              )}

              {/* Source URL */}
              <div>
                <label className="block text-xs font-serif font-medium mb-1">
                  Novel Source Link <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://wtr-lab.com or https://novelfire.com"
                  className={`w-full text-xs font-mono rounded-xl px-3 py-2.5 outline-none border transition-colors ${
                    isDark
                      ? 'bg-stone-900 border-stone-800 text-stone-100 focus:border-amber-400'
                      : 'bg-stone-100/70 border-stone-300 text-stone-900 focus:border-stone-800'
                  }`}
                  autoFocus
                  required
                />
              </div>

              {/* Source Name (Optional) */}
              <div>
                <label className="block text-xs font-serif font-medium mb-1">
                  Source Name <span className="opacity-50 text-[10px] font-sans font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. WTR-LAB, NovelFire"
                  className={`w-full text-xs rounded-xl px-3 py-2 outline-none border transition-colors ${
                    isDark
                      ? 'bg-stone-900 border-stone-800 text-stone-100 focus:border-amber-400'
                      : 'bg-stone-100/70 border-stone-300 text-stone-900 focus:border-stone-800'
                  }`}
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className={`flex-1 py-2.5 px-4 text-xs font-medium rounded-xl border transition-colors cursor-pointer ${
                    isDark
                      ? 'border-stone-800 hover:bg-stone-900 text-stone-300'
                      : 'border-stone-300 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 py-2.5 px-4 text-xs font-semibold rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer ${
                    isDark
                      ? 'bg-amber-400 text-stone-950 hover:bg-amber-300'
                      : 'bg-stone-900 text-stone-50 hover:bg-stone-800'
                  }`}
                >
                  Add Source
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
