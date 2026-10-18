import React, { useState, useEffect } from 'react';
import {
  Search,
  Plus,
  Globe,
  Rss,
  Layers,
  Database,
  Check,
  X,
  Trash2,
  ExternalLink,
  Sun,
  Moon,
  ChevronRight,
  CheckCircle2,
  Star,
  Compass,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Bookmark
} from 'lucide-react';
import { Book } from '../data/novelData';

export type SourceType = 'opds' | 'scraper' | 'rss' | 'api';

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
    id: 'src-standard-ebooks',
    name: 'Standard Ebooks OPDS',
    url: 'https://standardebooks.org/opds/all',
    type: 'opds',
    description: 'Carefully formatted public domain novels and literary masterworks',
    availableCount: '1,420+ Editions',
    isEnabled: true,
    isFavorite: true,
    isCustom: false,
    lastSynced: '10m ago',
    status: 'active',
    pingMs: 38
  },
  {
    id: 'src-project-gutenberg',
    name: 'Project Gutenberg Archive',
    url: 'https://www.gutenberg.org/ebooks.opds/',
    type: 'opds',
    description: 'Free classic literature, translated novels, and foundational texts',
    availableCount: '70,000+ Works',
    isEnabled: true,
    isFavorite: true,
    isCustom: false,
    lastSynced: '1h ago',
    status: 'active',
    pingMs: 52
  },
  {
    id: 'src-royal-road',
    name: 'Royal Road Web Serials',
    url: 'https://www.royalroad.com/syndication/novels.xml',
    type: 'rss',
    description: 'Ongoing serialized fantasy, sci-fi, and progression web novels',
    availableCount: '45,000+ Serials',
    isEnabled: true,
    isFavorite: true,
    isCustom: false,
    lastSynced: '25m ago',
    status: 'active',
    pingMs: 44
  },
  {
    id: 'src-nu-crawler',
    name: 'NovelUpdates Index Extension',
    url: 'https://extensions.novelreader.app/repos/nu-v2.json',
    type: 'scraper',
    description: 'Asian web novel translations, chapter releases, and metadata directory',
    availableCount: '18,500+ Novels',
    isEnabled: true,
    isFavorite: false,
    isCustom: false,
    lastSynced: '2h ago',
    status: 'active',
    pingMs: 61
  },
  {
    id: 'src-open-library',
    name: 'Internet Archive Open Library',
    url: 'https://openlibrary.org/catalog/opds',
    type: 'opds',
    description: 'Global open book project and historical literary records catalog',
    availableCount: '1.7M+ Titles',
    isEnabled: true,
    isFavorite: false,
    isCustom: false,
    lastSynced: '1d ago',
    status: 'active',
    pingMs: 78
  },
  {
    id: 'src-feedbooks',
    name: 'Feedbooks Public Domain',
    url: 'https://catalog.feedbooks.com/publicdomain/browse.atom',
    type: 'opds',
    description: 'High-quality public domain novels with custom typography',
    availableCount: '4,200+ Books',
    isEnabled: true,
    isFavorite: false,
    isCustom: false,
    lastSynced: '4h ago',
    status: 'active',
    pingMs: 42
  },
  {
    id: 'src-wuxiaworld',
    name: 'WuxiaWorld Web Feed',
    url: 'https://www.wuxiaworld.com/feed/chapters.xml',
    type: 'rss',
    description: 'Cultivation and martial arts translated web serials',
    availableCount: '3,800+ Serials',
    isEnabled: true,
    isFavorite: false,
    isCustom: false,
    lastSynced: '12m ago',
    status: 'active',
    pingMs: 36
  },
  {
    id: 'src-scribblehub',
    name: 'ScribbleHub Progression Index',
    url: 'https://www.scribblehub.com/rssfeed.php?type=all',
    type: 'rss',
    description: 'Indie serialized fiction and original web novels',
    availableCount: '12,000+ Novels',
    isEnabled: true,
    isFavorite: false,
    isCustom: false,
    lastSynced: '30m ago',
    status: 'active',
    pingMs: 48
  },
  {
    id: 'src-calibre',
    name: 'Calibre Content Server',
    url: 'http://192.168.1.100:8080/opds',
    type: 'opds',
    description: 'Personal self-hosted Calibre library catalog',
    availableCount: 'Local Server',
    isEnabled: true,
    isFavorite: false,
    isCustom: false,
    lastSynced: '3h ago',
    status: 'active',
    pingMs: 15
  }
];

const PRESET_SOURCES = [
  {
    name: 'Feedbooks Public Domain',
    url: 'https://catalog.feedbooks.com/publicdomain/browse.atom',
    type: 'opds' as SourceType,
    description: 'High-quality public domain novels with custom typography',
    availableCount: '4,200+ Books'
  },
  {
    name: 'WuxiaWorld Web Feed',
    url: 'https://www.wuxiaworld.com/feed/chapters.xml',
    type: 'rss' as SourceType,
    description: 'Cultivation and martial arts translated web serials',
    availableCount: '3,800+ Serials'
  },
  {
    name: 'Calibre Content Server',
    url: 'http://192.168.1.100:8080/opds',
    type: 'opds' as SourceType,
    description: 'Personal self-hosted Calibre library catalog',
    availableCount: 'Local Server'
  },
  {
    name: 'ScribbleHub Progression Index',
    url: 'https://www.scribblehub.com/rssfeed.php?type=all',
    type: 'rss' as SourceType,
    description: 'Indie serialized fiction and original web novels',
    availableCount: '12,000+ Novels'
  }
];

const BROWSER_BOOKMARKS = [
  { name: 'Royal Road Serials', url: 'https://www.royalroad.com', type: 'rss' as SourceType },
  { name: 'Standard Ebooks', url: 'https://standardebooks.org/opds/all', type: 'opds' as SourceType },
  { name: 'Project Gutenberg', url: 'https://www.gutenberg.org/ebooks.opds/', type: 'opds' as SourceType },
  { name: 'NovelUpdates Index', url: 'https://www.novelupdates.com', type: 'scraper' as SourceType },
  { name: 'WuxiaWorld Community', url: 'https://www.wuxiaworld.com', type: 'rss' as SourceType },
  { name: 'Open Library Catalog', url: 'https://openlibrary.org/catalog/opds', type: 'opds' as SourceType },
];

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
  onToggleDarkMode
}) => {
  // Load sources from localStorage with fallback to 9 default sources
  const [sources, setSources] = useState<NovelSource[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('folio_novel_sources_v4');
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
    localStorage.setItem('folio_novel_sources_v4', JSON.stringify(sources));
  }, [sources]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBrowserOpen, setIsBrowserOpen] = useState(false);

  // In-app browser state
  const [browserUrl, setBrowserUrl] = useState('https://www.royalroad.com');
  const [browserInput, setBrowserInput] = useState('https://www.royalroad.com');

  // New source form state
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newType, setNewType] = useState<SourceType>('opds');
  const [newDescription, setNewDescription] = useState('');
  const [formError, setFormError] = useState('');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
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
    if (!newName.trim()) {
      setFormError('Please enter a source name');
      return;
    }
    if (!newUrl.trim() || !newUrl.includes('.')) {
      setFormError('Please enter a valid URL or host endpoint');
      return;
    }

    const newSource: NovelSource = {
      id: `custom-src-${Date.now()}`,
      name: newName.trim(),
      url: newUrl.trim().startsWith('http') ? newUrl.trim() : `https://${newUrl.trim()}`,
      type: newType,
      description: newDescription.trim() || 'Custom added novel repository source',
      availableCount: 'Custom Index',
      isEnabled: true,
      isFavorite: true,
      isCustom: true,
      lastSynced: 'Just now',
      status: 'active',
      pingMs: Math.floor(30 + Math.random() * 35)
    };

    setSources(prev => [newSource, ...prev]);
    setIsAddModalOpen(false);
    setNewName('');
    setNewUrl('');
    setNewDescription('');
    setFormError('');
    showToast(`Source "${newSource.name}" added successfully!`);
  };

  const handleApplyPreset = (preset: typeof PRESET_SOURCES[0]) => {
    setNewName(preset.name);
    setNewUrl(preset.url);
    setNewType(preset.type);
    setNewDescription(preset.description);
    setFormError('');
  };

  const handleRestoreDefaults = () => {
    setSources(DEFAULT_SOURCES);
    showToast('Default 9 sources restored');
  };

  const handleAddCurrentBrowserAsSource = () => {
    try {
      const parsed = new URL(browserUrl);
      const hostname = parsed.hostname.replace('www.', '');
      setNewName(hostname.charAt(0).toUpperCase() + hostname.slice(1).split('.')[0] + ' Feed');
      setNewUrl(browserUrl);
      setNewType(browserUrl.includes('opds') ? 'opds' : browserUrl.includes('rss') ? 'rss' : 'scraper');
      setFormError('');
      setIsBrowserOpen(false);
      setIsAddModalOpen(true);
    } catch {
      setNewName('Web Source');
      setNewUrl(browserUrl);
      setIsBrowserOpen(false);
      setIsAddModalOpen(true);
    }
  };

  // Filter sources by search query
  const filteredSources = sources.filter(src => {
    return (
      searchQuery.trim() === '' ||
      src.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.url.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getTypeIcon = (type: SourceType) => {
    switch (type) {
      case 'opds':
        return Database;
      case 'scraper':
        return Globe;
      case 'rss':
        return Rss;
      case 'api':
        return Layers;
    }
  };

  return (
    <div
      className={`flex-1 flex flex-col transition-colors duration-200 h-full relative overflow-hidden ${
        isDark ? 'bg-[#000000] text-stone-100' : 'bg-[#FAF8F5] text-stone-900'
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
        {/* Header Bar: Discover as main heading, Sources · {count} Sources */}
        <header
          className={`px-4 pt-3 pb-3 border-b sticky top-0 backdrop-blur-md z-20 flex items-center justify-between ${
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
              Sources · {sources.length} Sources
            </span>
            <h1 className="text-xl font-serif font-semibold tracking-tight">
              Discover
            </h1>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Top Browser Button */}
            <button
              type="button"
              onClick={() => setIsBrowserOpen(true)}
              aria-label="Novel Web Browser"
              title="Open Novel Browser"
              className={`min-h-[34px] px-2.5 flex items-center gap-1.5 rounded-lg border transition-all shadow-2xs cursor-pointer ${
                isBrowserOpen
                  ? isDark
                    ? 'border-amber-400 bg-amber-950/30 text-amber-400'
                    : 'border-amber-600 bg-amber-50 text-amber-900'
                  : isDark
                  ? 'border-stone-800 bg-stone-900/80 text-stone-300 hover:border-stone-700 hover:text-stone-100'
                  : 'border-stone-300/80 bg-white/80 text-stone-700 hover:border-stone-400 hover:text-stone-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs font-medium">Browser</span>
            </button>

            {/* Search Sources Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search Sources"
              title="Search Sources"
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

            {/* Dark Mode Switcher */}
            {onToggleDarkMode && (
              <button
                type="button"
                onClick={onToggleDarkMode}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className={`min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg border transition-all shadow-2xs cursor-pointer ${
                  isDark
                    ? 'border-stone-800 bg-stone-900/80 text-amber-400 hover:border-stone-700'
                    : 'border-stone-300/80 bg-white/80 text-stone-700 hover:border-stone-400'
                }`}
              >
                {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
            )}

            {/* Quick Add Button */}
            <button
              type="button"
              onClick={() => {
                setFormError('');
                setIsAddModalOpen(true);
              }}
              className={`min-h-[34px] px-3 text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer ${
                isDark
                  ? 'bg-amber-400 text-stone-950 hover:bg-amber-300'
                  : 'bg-stone-900 text-stone-50 hover:bg-stone-800'
              }`}
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Add</span>
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

        {/* Sources List Section: Smaller items with only name, picture, and link under the name */}
        <section className="px-4 pt-3 space-y-2">
          {/* Option in the same style as added sources: "Add Custom Source" */}
          <div
            onClick={() => {
              setFormError('');
              setIsAddModalOpen(true);
            }}
            className={`border rounded-2xl p-3 flex items-center justify-between cursor-pointer transition-all shadow-2xs group ${
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
                  Add Custom Source
                </h3>
                <p className="text-[10px] font-mono opacity-60 truncate mt-0.5">
                  Connect custom OPDS, RSS, or web repository
                </p>
              </div>
            </div>

            <div className="shrink-0 ml-2">
              <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Configured Sources Items: Smaller, only name, picture, and link under name, with Favorite Star Button */}
          {filteredSources.map((source) => {
            const IconComponent = getTypeIcon(source.type);
            return (
              <div
                key={source.id}
                className={`border rounded-2xl p-3 flex items-center justify-between transition-all shadow-2xs group ${
                  isDark
                    ? 'bg-[#121214] border-stone-800/80 hover:border-stone-700'
                    : 'bg-white border-stone-200/90 hover:border-stone-300'
                }`}
              >
                {/* Picture, Name, Link */}
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
                    <IconComponent className="w-4 h-4 stroke-[1.8]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3
                        className={`font-serif text-xs font-semibold truncate ${
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
                    <p className="text-[10px] font-mono opacity-60 truncate mt-0.5">
                      {source.url}
                    </p>
                  </div>
                </div>

                {/* Right controls: Delete (if custom) and Favorite Star Button */}
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

                  {/* Favorite Star Button (Replaces on/off switch) */}
                  <button
                    type="button"
                    aria-label={source.isFavorite ? `Unfavorite ${source.name}` : `Favorite ${source.name}`}
                    title={source.isFavorite ? 'Favorited Source' : 'Favorite Source'}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFavorite(source.id);
                    }}
                    className={`min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg transition-transform active:scale-90 cursor-pointer ${
                      source.isFavorite
                        ? 'text-amber-400 hover:text-amber-300'
                        : isDark
                        ? 'text-stone-600 hover:text-stone-300'
                        : 'text-stone-300 hover:text-stone-600'
                    }`}
                  >
                    <Star
                      className={`w-4 h-4 transition-all ${
                        source.isFavorite
                          ? 'fill-amber-400 text-amber-400 scale-110 drop-shadow-xs'
                          : 'stroke-[1.75]'
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        {/* Global Reset Footer */}
        <section className="px-4 pt-5 pb-2 text-center">
          <button
            type="button"
            onClick={handleRestoreDefaults}
            className="text-[11px] font-mono text-stone-500 hover:text-amber-500 hover:underline cursor-pointer"
          >
            Restore 9 Sample Sources
          </button>
        </section>
      </div>

      {/* Top Browser Sheet / In-App Novel Browser */}
      {isBrowserOpen && (
        <div className="absolute inset-0 z-50 flex flex-col bg-[#FAF8F5] dark:bg-[#000000] animate-in slide-in-from-bottom duration-300">
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
                placeholder="Enter novel feed or catalog URL..."
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

      {/* Pull Up Sheet / Modal to Add Custom Source */}
      {isAddModalOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setIsAddModalOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer"
            aria-label="Close modal"
          />

          {/* Sheet Panel */}
          <div
            className={`relative z-10 w-full rounded-t-3xl border-t p-5 pb-6 shadow-2xl max-h-[90%] overflow-y-auto transition-transform animate-in slide-in-from-bottom duration-300 ${
              isDark ? 'bg-[#121214] border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
            }`}
          >
            {/* Grab Handle */}
            <div className={`w-10 h-1 rounded-full mx-auto mb-4 ${isDark ? 'bg-stone-700' : 'bg-stone-300'}`} />

            {/* Header */}
            <div className="flex items-start justify-between mb-4 pb-3 border-b border-stone-200/50 dark:border-stone-800">
              <div>
                <span className={`text-[10px] font-mono uppercase tracking-widest block mb-0.5 ${isDark ? 'text-amber-400' : 'text-stone-400'}`}>
                  Repository Endpoint
                </span>
                <h3 className="text-base font-serif font-semibold tracking-tight">
                  Add Custom Source
                </h3>
                <p className={`text-[11px] font-sans mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Connect any OPDS catalog, web novel scraper, or serial chapter feed
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

            {/* Quick 1-Click Presets */}
            <div className="mb-4">
              <span className={`text-[10px] font-mono uppercase tracking-wider block mb-2 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                Quick Presets (Click to autofill)
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {PRESET_SOURCES.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className={`p-2 rounded-xl border text-left transition-colors cursor-pointer ${
                      isDark
                        ? 'border-stone-800/80 bg-stone-900/40 hover:bg-stone-800 hover:border-amber-400/60 text-stone-200'
                        : 'border-stone-200/80 bg-stone-50 hover:bg-stone-100 hover:border-stone-400 text-stone-800'
                    }`}
                  >
                    <div className="font-serif text-[11px] font-medium truncate">{preset.name}</div>
                    <div className="text-[9.5px] font-mono opacity-60 truncate mt-0.5">{preset.type.toUpperCase()} · {preset.availableCount}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleAddCustomSource} className="space-y-3.5">
              {formError && (
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-mono">
                  {formError}
                </div>
              )}

              {/* Source Name */}
              <div>
                <label className="block text-xs font-serif font-medium mb-1">
                  Source Name <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. My Calibre OPDS, Standard Ebooks, WuxiaHub"
                  className={`w-full text-xs rounded-xl px-3 py-2 outline-none border transition-colors ${
                    isDark
                      ? 'bg-stone-900 border-stone-800 text-stone-100 focus:border-amber-400'
                      : 'bg-stone-100/70 border-stone-300 text-stone-900 focus:border-stone-800'
                  }`}
                  required
                />
              </div>

              {/* Source URL */}
              <div>
                <label className="block text-xs font-serif font-medium mb-1">
                  Source Feed URL / Endpoint <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://catalog.example.com/opds or https://repo.json"
                  className={`w-full text-xs font-mono rounded-xl px-3 py-2 outline-none border transition-colors ${
                    isDark
                      ? 'bg-stone-900 border-stone-800 text-stone-100 focus:border-amber-400'
                      : 'bg-stone-100/70 border-stone-300 text-stone-900 focus:border-stone-800'
                  }`}
                  required
                />
              </div>

              {/* Protocol / Type Selection */}
              <div>
                <label className="block text-xs font-serif font-medium mb-1.5">
                  Source Protocol Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'opds', label: 'OPDS 2.0 Catalog', icon: Database, desc: 'E-book feeds & libraries' },
                    { id: 'scraper', label: 'Web Scraper Ext', icon: Globe, desc: 'HTML web novel crawler' },
                    { id: 'rss', label: 'Serial RSS Feed', icon: Rss, desc: 'Chapter notification feed' },
                    { id: 'api', label: 'Custom REST API', icon: Layers, desc: 'JSON API specification' },
                  ].map((t) => {
                    const isSelected = newType === t.id;
                    const TypeIcon = t.icon;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setNewType(t.id as SourceType)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? isDark
                              ? 'border-amber-400 bg-amber-950/20 text-stone-100 shadow-xs'
                              : 'border-stone-900 bg-stone-100 text-stone-900 shadow-xs'
                            : isDark
                            ? 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700'
                            : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <TypeIcon className="w-3.5 h-3.5 text-amber-500" />
                          <span className="text-xs font-medium font-serif">{t.label}</span>
                        </div>
                        <span className="text-[10px] block opacity-70 mt-0.5">{t.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-serif font-medium mb-1">
                  Description <span className="opacity-50 text-[10px] font-sans font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Notes about content, genre, or archive"
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
                  Save & Add Source
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
