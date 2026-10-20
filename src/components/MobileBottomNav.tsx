import React from 'react';
import { Library, Globe, ArrowDownToLine, Settings } from 'lucide-react';

export type NavTab = 'shelf' | 'explore' | 'downloads' | 'settings';

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
    { id: 'shelf' as NavTab, label: 'Library', icon: Library },
    { id: 'explore' as NavTab, label: 'Sources', icon: Globe },
    { id: 'downloads' as NavTab, label: 'Downloads', icon: ArrowDownToLine },
    { id: 'settings' as NavTab, label: 'Settings', icon: Settings },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className={`shrink-0 h-16 w-full border-t transition-colors ${
        isDark
          ? 'bg-[#0A0A0A]/95 border-neutral-900 text-stone-400'
          : 'bg-[#FFFFFF]/95 border-stone-200/80 text-stone-500'
      } backdrop-blur-md grid grid-cols-4 items-center px-4 z-20`}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`min-h-[48px] w-full flex flex-col items-center justify-center relative transition-transform active:scale-95 cursor-pointer ${
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
              className={`text-[9.5px] tracking-tight mt-1 text-center truncate w-full px-0.5 leading-none ${
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
