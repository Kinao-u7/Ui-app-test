import React from 'react';
import { Compass, BookOpen, Bookmark, Headphones, Sparkles, Settings, BookmarkCheck } from 'lucide-react';

export type NavTab = 'shelf' | 'reader' | 'explore' | 'contents' | 'audio' | 'studio' | 'settings';

interface MobileBottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isDark?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  isDark = false
}) => {
  const tabs = [
    { id: 'shelf' as NavTab, label: 'Library', icon: Bookmark },
    { id: 'reader' as NavTab, label: 'Reader', icon: BookOpen },
    { id: 'explore' as NavTab, label: 'Discover', icon: Compass },
    { id: 'contents' as NavTab, label: 'Index', icon: BookmarkCheck },
    { id: 'audio' as NavTab, label: 'Audio', icon: Headphones },
    { id: 'studio' as NavTab, label: 'Studio', icon: Sparkles },
    { id: 'settings' as NavTab, label: 'Settings', icon: Settings },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className={`shrink-0 h-16 w-full border-t transition-colors ${
        isDark
          ? 'bg-[#000000]/95 border-neutral-900 text-stone-400'
          : 'bg-[#FAF8F5]/95 border-stone-200/80 text-stone-500'
      } backdrop-blur-md grid grid-cols-7 items-center px-1 z-20`}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`min-h-[48px] w-full flex flex-col items-center justify-center relative transition-transform active:scale-95 ${
              isActive
                ? isDark
                  ? 'text-amber-400 font-semibold'
                  : 'text-stone-900 font-semibold'
                : isDark
                ? 'text-stone-500 hover:text-stone-300'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <div className="relative">
              <Icon
                className={`w-[17px] h-[17px] transition-transform ${
                  isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.8]'
                }`}
              />
              {isActive && (
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                    isDark ? 'bg-amber-400' : 'bg-stone-900'
                  }`}
                />
              )}
            </div>
            <span
              className={`text-[8.5px] tracking-tight mt-1 text-center truncate w-full px-0.5 leading-none ${
                isActive ? 'font-semibold' : 'font-normal'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
