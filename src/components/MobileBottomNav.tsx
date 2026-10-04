import React from 'react';
import { Compass, BookOpen, Bookmark, Headphones, Sparkles } from 'lucide-react';

export type NavTab = 'explore' | 'reader' | 'contents' | 'shelf' | 'audio' | 'studio';

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
    { id: 'explore' as NavTab, label: 'Atelier', icon: Compass },
    { id: 'reader' as NavTab, label: 'Reader', icon: BookOpen },
    { id: 'contents' as NavTab, label: 'Index', icon: Bookmark },
    { id: 'shelf' as NavTab, label: 'Sanctuary', icon: Bookmark },
    { id: 'audio' as NavTab, label: 'Audio', icon: Headphones },
    { id: 'studio' as NavTab, label: 'Studio', icon: Sparkles },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className={`shrink-0 h-16 w-full border-t transition-colors ${
        isDark
          ? 'bg-[#0E0E10]/95 border-stone-800/80 text-stone-400'
          : 'bg-[#FAF8F5]/95 border-stone-200/80 text-stone-500'
      } backdrop-blur-md flex items-center justify-around px-2 z-20`}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`min-h-[48px] min-w-[48px] flex flex-col items-center justify-center relative transition-transform active:scale-95 ${
              isActive
                ? isDark
                  ? 'text-white'
                  : 'text-stone-900'
                : isDark
                ? 'text-stone-500 hover:text-stone-300'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <div className="relative">
              <Icon
                className={`w-[19px] h-[19px] transition-transform ${
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
              className={`text-[10px] tracking-tight mt-1 font-medium ${
                isActive ? 'font-semibold' : ''
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
