import React, { useState } from 'react';
import { X, Palette, Type, Sliders, Smartphone, Check, Sparkles, Layers } from 'lucide-react';

interface DesignSystemInspectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignSystemInspector: React.FC<DesignSystemInspectorProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'typography' | 'components' | 'ergonomics'>('tokens');

  if (!isOpen) return null;

  const colorTokens = [
    { name: 'Canvas Alabaster', hex: '#FAF8F5', role: '60% Dominant Neutral Canvas', text: 'text-stone-900', border: 'border-stone-300' },
    { name: 'Pure Surface', hex: '#FFFFFF', role: '30% Structural Elevation Surface', text: 'text-stone-900', border: 'border-stone-200' },
    { name: 'Charcoal Ink', hex: '#1C1917', role: 'Primary Typography & Dark Accent', text: 'text-white', border: 'border-stone-800' },
    { name: 'Archival Terracotta', hex: '#9A3412', role: '10% High-Intent Curatorial Accent', text: 'text-white', border: 'border-amber-800' },
    { name: 'Tokyo Night OLED', hex: '#08080A', role: 'True Dark Reading Surface', text: 'text-stone-100', border: 'border-stone-700' },
    { name: 'Sepia Parchment', hex: '#F4EEDD', role: 'Warm Archival Paper Mode', text: 'text-stone-900', border: 'border-stone-300' },
    { name: 'Forest Dusk', hex: '#0E1715', role: 'Botanical Reading Mode', text: 'text-stone-100', border: 'border-stone-700' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] text-stone-900 w-full max-w-3xl rounded-3xl shadow-2xl border border-stone-300 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-white">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-800 block">
              Folio UI Kit · Design Specifications
            </span>
            <h2 className="font-serif text-lg font-bold text-stone-900">
              Editorial Design Constitution & Tokens
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-600 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 pb-2 border-b border-stone-200 bg-stone-100/60 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'tokens', label: 'Color Tokens & 60-30-10', icon: Palette },
            { id: 'typography', label: 'Typographic Scale', icon: Type },
            { id: 'components', label: 'UI Atoms & Components', icon: Layers },
            { id: 'ergonomics', label: 'Mobile Thumb Zones', icon: Smartphone },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`min-h-[40px] px-3.5 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'tokens' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-sm font-semibold text-stone-900 mb-1">
                  60-30-10 Curatorial Color Allocation
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Strictly avoids generic purple gradients. 60% Alabaster paper field, 30% structural white surface and hairline dividers, 10% warm terracotta and amber intent accents.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {colorTokens.map((token, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl border border-stone-200 bg-white flex items-center gap-3.5 shadow-2xs"
                  >
                    <div
                      style={{ backgroundColor: token.hex }}
                      className={`w-12 h-12 rounded-xl shrink-0 border ${token.border} flex items-center justify-center font-mono text-[9px] font-bold ${token.text}`}
                    >
                      {token.hex}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-stone-900">
                        {token.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                        {token.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'typography' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-sm font-semibold text-stone-900 mb-1">
                  Editorial 2+1 Typographic Hierarchy
                </h3>
                <p className="text-xs text-stone-600">
                  Playfair Display / Newsreader for literary grandeur, Plus Jakarta Sans for crisp legible UI labels, JetBrains Mono for tabular metrics and accession codes.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-2xl border border-stone-200">
                  <span className="text-[10px] font-mono uppercase text-amber-800 block mb-1">
                    Display & Title Headings · Newsreader / Playfair
                  </span>
                  <p className="font-serif text-2xl font-bold text-stone-900">
                    The Architecture of Silence and Salt
                  </p>
                  <p className="font-serif italic text-sm text-stone-600 mt-1">
                    “The shoreline does not end; it merely yields to the swell.”
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200">
                  <span className="text-[10px] font-mono uppercase text-amber-800 block mb-1">
                    Prose Reading Body (65–75ch measure) · Newsreader 17px / 1.8 Leading
                  </span>
                  <p className="font-serif text-sm leading-relaxed text-stone-800">
                    The road ceased where the salt began. Behind me lay six hundred miles of tarmac and the murmur of Stockholm; before me, nothing but the gray swell of the Skagerrak, folding upon itself like heavy linen.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200">
                  <span className="text-[10px] font-mono uppercase text-amber-800 block mb-1">
                    Bibliographic Numerals · JetBrains Mono Tabular
                  </span>
                  <p className="font-mono text-xs tabular-nums text-stone-700">
                    Vol. VIII · Pg. 114 of 342 · 44 Hz Transom · 14m Remaining · 98.4% Match
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'components' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-sm font-semibold text-stone-900 mb-1">
                  Atoms, Controls & Surface Math
                </h3>
                <p className="text-xs text-stone-600">
                  Nested radii math (r_inner = r_outer - padding), single-level card elevation, and zero-pill unboxed metadata.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-2xl border border-stone-200">
                  <h4 className="text-xs font-semibold text-stone-800 mb-2">
                    Action Buttons & Segmented Controls
                  </h4>
                  <div className="space-y-2">
                    <button className="w-full py-2.5 px-4 bg-stone-900 text-stone-50 text-xs font-medium rounded-xl shadow-xs">
                      Primary Chamber CTA
                    </button>
                    <button className="w-full py-2 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-xl transition-colors">
                      Secondary Neutral Action
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-stone-200">
                  <h4 className="text-xs font-semibold text-stone-800 mb-2">
                    Zero-Pill Metadata Example
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                    <span>342 Pages</span>
                    <span aria-hidden="true">·</span>
                    <span>7h 15m Read</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-stone-800 font-semibold">4.9 ★</span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-2">
                    No pill enclosures around static metadata; clean typography with · separators.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ergonomics' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-sm font-semibold text-stone-900 mb-1">
                  Mobile Thumb Zones & Accessibility Standards
                </h3>
                <p className="text-xs text-stone-600">
                  All interactive controls guarantee minimum 44 × 44px touch targets. Fixed elements strictly capped at 15% or less of viewport height.
                </p>
              </div>

              <div className="bg-stone-100 p-4 rounded-2xl border border-stone-200 font-mono text-xs space-y-2 text-stone-700">
                <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                  <span>Top 30% Hard Reach Zone</span>
                  <span className="text-stone-400">Static Title, Search Trigger</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                  <span>Middle 30% Stretch Zone</span>
                  <span className="text-stone-400">Reading Prose, Card Feeds</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 font-semibold">
                  <span>Bottom 40% Natural Thumb Zone</span>
                  <span>Primary CTA, Nav Tabs, Scrubbers</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
