import React from 'react';
import { Wifi, BatteryMedium, Sparkles } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  screenTitle?: string;
  screenNumber?: number;
  screenSubtitle?: string;
  isActive?: boolean;
  onSelectScreen?: () => void;
  scale?: number;
  isStandalone?: boolean;
  isDark?: boolean;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  screenTitle,
  screenNumber,
  screenSubtitle,
  isActive = false,
  onSelectScreen,
  scale = 1,
  isStandalone = false,
  isDark = false
}) => {
  return (
    <div className="flex flex-col items-center select-none group">
      {/* Editorial Screen Header Label (When in UI Kit Canvas Mode) */}
      {!isStandalone && screenTitle && (
        <div className="w-[380px] mb-3 flex items-baseline justify-between px-1">
          <div className="flex items-baseline gap-2">
            <span className={`font-mono text-xs font-semibold tabular-nums ${isDark ? 'text-amber-400' : 'text-stone-400'}`}>
              0{screenNumber}
            </span>
            <span className={`text-sm font-semibold tracking-tight ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>
              {screenTitle}
            </span>
          </div>
          <span className="text-[11px] font-mono text-stone-400">
            {screenSubtitle || '393 × 852 pt'}
          </span>
        </div>
      )}

      {/* Hardware Frame Mockup (Titanium Finish) */}
      <div
        onClick={onSelectScreen}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
        className={`relative w-[384px] h-[780px] rounded-[48px] p-3 transition-all duration-300 ${
          isActive && !isStandalone
            ? isDark ? 'ring-2 ring-amber-400/80 shadow-2xl scale-[1.01]' : 'ring-2 ring-stone-900 shadow-2xl scale-[1.01]'
            : 'shadow-xl hover:shadow-2xl'
        } bg-[#1C1A18] border-[3px] border-[#38332E]`}
      >
        {/* Hardware side buttons */}
        <div className="absolute -left-[5px] top-[115px] w-[3px] h-8 bg-stone-700 rounded-l-sm" />
        <div className="absolute -left-[5px] top-[165px] w-[3px] h-12 bg-stone-700 rounded-l-sm" />
        <div className="absolute -left-[5px] top-[225px] w-[3px] h-12 bg-stone-700 rounded-l-sm" />
        <div className="absolute -right-[5px] top-[175px] w-[3px] h-16 bg-stone-700 rounded-r-sm" />

        {/* Screen Bezel & Dynamic Island Container */}
        <div className={`relative w-full h-full rounded-[38px] overflow-hidden flex flex-col shadow-inner transition-colors duration-200 ${
          isDark ? 'bg-[#000000]' : 'bg-[#FAF8F5]'
        }`}>
          {/* Top Status Bar & Dynamic Island */}
          <div className="shrink-0 h-10 px-6 pt-3 flex items-center justify-between z-30 select-none pointer-events-none">
            <span className={`text-[12px] font-semibold font-sans tracking-tight ${
              isDark ? 'text-stone-200' : 'text-stone-900'
            }`}>
              9:41
            </span>
            
            {/* Dynamic Pill Island */}
            <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center gap-1.5 px-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-mono text-stone-300 truncate tracking-wide">
                FOLIO
              </span>
            </div>

            <div className={`flex items-center gap-1.5 ${isDark ? 'text-stone-200' : 'text-stone-900'}`}>
              <Wifi className="w-3.5 h-3.5 stroke-[2]" />
              <BatteryMedium className="w-4 h-4 stroke-[2]" />
            </div>
          </div>

          {/* Screen Inner Viewport (Scrollable Content) */}
          <div className="flex-1 w-full overflow-y-auto overflow-x-hidden relative flex flex-col">
            {children}
          </div>

          {/* iOS Bottom Home Indicator Bar */}
          <div className="shrink-0 h-5 w-full flex items-center justify-center bg-transparent pointer-events-none z-30 pb-1">
            <div className="w-32 h-1 bg-stone-400/60 rounded-full" />
          </div>
        </div>
      </div>

      {/* Screen Selection Badge */}
      {!isStandalone && onSelectScreen && (
        <button
          onClick={onSelectScreen}
          className={`mt-4 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
            isActive
              ? 'bg-stone-900 text-stone-50 shadow-sm'
              : 'bg-stone-200/80 text-stone-600 hover:bg-stone-300 hover:text-stone-900'
          }`}
        >
          {isActive ? 'Active Screen' : 'Interact with Screen'}
        </button>
      )}
    </div>
  );
};
