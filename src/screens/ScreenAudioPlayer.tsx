import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, RotateCw, Volume2, CloudRain, Flame, Waves, Clock, Gauge, Sliders, ChevronDown } from 'lucide-react';
import { Book } from '../data/novelData';

interface ScreenAudioPlayerProps {
  book: Book;
  onBack: () => void;
  onOpenReader: (book: Book) => void;
}

export const ScreenAudioPlayer: React.FC<ScreenAudioPlayerProps> = ({
  book,
  onBack,
  onOpenReader
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressSeconds, setProgressSeconds] = useState(245); // 4m 05s
  const totalSeconds = 1140; // 19m 00s (Chapter 3)
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [activeSentenceIdx, setActiveSentenceIdx] = useState(1);
  const [isMixerOpen, setIsMixerOpen] = useState(false);
  const [rainVolume, setRainVolume] = useState(40);
  const [fireVolume, setFireVolume] = useState(20);
  const [oceanVolume, setOceanVolume] = useState(60);
  const [sleepTimer, setSleepTimer] = useState<string | null>(null);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgressSeconds((prev) => {
          if (prev >= totalSeconds) return 0;
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const transcriptSentences = [
    'Dawn brought no illumination, only a lightening of the heavy northern gray.',
    'The barometer in the vestibule had dropped twelve millibars between midnight and five, shivering like a trapped moth.',
    'The sea was no longer blue or green; it was the color of lead fresh from the crucible.',
    '“The shoreline does not end,” I wrote in the margin. “It merely yields to the swell, surrendering its edges.”'
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#000000] text-stone-100 overflow-y-auto pb-6 select-none">
      {/* Top Header */}
      <header className="px-4 py-2 border-b border-neutral-900 sticky top-0 bg-[#000000]/90 backdrop-blur-md z-10 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-400 hover:text-white rounded-full hover:bg-stone-800/60 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
        </button>

        <div className="text-center">
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 block">
            Whisper Studio · Audiobook
          </span>
          <h2 className="text-xs font-serif font-semibold tracking-tight text-stone-200 truncate max-w-[190px]">
            {book.title}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setIsMixerOpen(!isMixerOpen)}
          aria-label="Soundscape mixer"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-400 hover:text-white"
        >
          <Sliders className="w-4 h-4 stroke-[2]" />
        </button>
      </header>

      {/* Album Artwork & Turntable Focal Center */}
      <div className="pt-6 pb-2 px-6 flex flex-col items-center text-center">
        <div className="relative w-44 h-44 rounded-2xl overflow-hidden shadow-2xl bg-stone-900 border border-stone-700/60 group">
          <img
            src={book.coverImage}
            alt={book.title}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isPlaying ? 'scale-105' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-radial from-transparent to-black/60 pointer-events-none" />
          {isPlaying && (
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          )}
        </div>

        <div className="mt-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block">
            Chapter 03 · Salt and Shadow
          </span>
          <h1 className="font-serif text-lg font-semibold tracking-tight text-white mt-0.5">
            {book.title}
          </h1>
          <p className="text-xs text-stone-400 mt-0.5">
            Narrated by {book.audioNarrator}
          </p>
        </div>
      </div>

      {/* Dynamic Sound Waveform Visualizer */}
      <div className="px-7 py-3 flex items-center justify-center gap-1 h-12">
        {[20, 45, 60, 85, 30, 95, 75, 40, 65, 80, 50, 90, 70, 45, 35, 60, 85, 40, 75, 55, 30].map((h, i) => (
          <div
            key={i}
            style={{
              height: isPlaying ? `${Math.max(12, (h * (i % 2 === 0 ? 1 : 0.8)))}%` : '15%',
              transition: 'height 0.25s ease'
            }}
            className={`w-1 rounded-full ${
              i <= 10 ? 'bg-amber-400' : 'bg-stone-700'
            }`}
          />
        ))}
      </div>

      {/* Scrub Bar & Timestamp */}
      <div className="px-6 py-1">
        <div className="relative w-full h-1.5 bg-stone-800 rounded-full cursor-pointer overflow-hidden">
          <div
            style={{ width: `${(progressSeconds / totalSeconds) * 100}%` }}
            className="h-full bg-amber-400 rounded-full"
          />
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mt-1.5 tabular-nums">
          <span>{formatTime(progressSeconds)}</span>
          <span>-{formatTime(totalSeconds - progressSeconds)}</span>
        </div>
      </div>

      {/* Primary Transport Controls */}
      <div className="px-6 pt-3 pb-2 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => setProgressSeconds(Math.max(0, progressSeconds - 15))}
          aria-label="Rewind 15 seconds"
          className="min-h-[48px] min-w-[48px] flex items-center justify-center text-stone-400 hover:text-white transition-colors"
        >
          <RotateCcw className="w-5 h-5 stroke-[2]" />
          <span className="sr-only">15s</span>
        </button>

        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="w-16 h-16 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-lg hover:bg-amber-400 transition-transform active:scale-95"
        >
          {isPlaying ? (
            <Pause className="w-7 h-7 fill-stone-950 stroke-[2.5]" />
          ) : (
            <Play className="w-7 h-7 fill-stone-950 translate-x-0.5 stroke-[2.5]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setProgressSeconds(Math.min(totalSeconds, progressSeconds + 30))}
          aria-label="Forward 30 seconds"
          className="min-h-[48px] min-w-[48px] flex items-center justify-center text-stone-400 hover:text-white transition-colors"
        >
          <RotateCw className="w-5 h-5 stroke-[2]" />
          <span className="sr-only">30s</span>
        </button>
      </div>

      {/* Speed & Sleep Timer Quick Row */}
      <div className="px-6 py-2 flex items-center justify-between border-t border-b border-stone-800/80 text-xs font-mono">
        <button
          type="button"
          onClick={() => {
            const speeds = [0.8, 1.0, 1.25, 1.5, 2.0];
            const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
            setPlaybackSpeed(speeds[nextIdx]);
          }}
          className="min-h-[44px] flex items-center gap-1.5 text-stone-400 hover:text-white"
        >
          <Gauge className="w-3.5 h-3.5" />
          <span>{playbackSpeed}x Speed</span>
        </button>

        <button
          type="button"
          onClick={() => {
            const timers = [null, '15m', '30m', 'End of Chapter'];
            const nextIdx = (timers.indexOf(sleepTimer) + 1) % timers.length;
            setSleepTimer(timers[nextIdx]);
          }}
          className="min-h-[44px] flex items-center gap-1.5 text-stone-400 hover:text-white"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Timer: {sleepTimer || 'Off'}</span>
        </button>
      </div>

      {/* Synchronized Live Transcript Spotlight */}
      <div className="px-6 pt-4">
        <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-2">
          Synchronized Text Follower
        </span>
        <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-3.5 space-y-2">
          {transcriptSentences.map((sentence, idx) => (
            <p
              key={idx}
              onClick={() => setActiveSentenceIdx(idx)}
              className={`text-xs font-serif leading-relaxed transition-all cursor-pointer ${
                activeSentenceIdx === idx
                  ? 'text-amber-300 font-medium pl-2 border-l-2 border-amber-400'
                  : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              {sentence}
            </p>
          ))}
        </div>
      </div>

      {/* Ambient Soundscape Layer Mixer Modal */}
      {isMixerOpen && (
        <div className="fixed inset-x-0 bottom-0 bg-stone-900 border-t border-stone-800 p-5 rounded-t-3xl z-40 shadow-2xl animate-in slide-in-from-bottom duration-200">
          <div className="w-10 h-1 bg-stone-700 rounded-full mx-auto mb-4" />
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400">
              Ambient Soundscape Layers
            </h3>
            <button
              onClick={() => setIsMixerOpen(false)}
              className="text-stone-400 hover:text-white text-xs"
            >
              Done
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-stone-300 mb-1">
                <span className="flex items-center gap-1.5">
                  <CloudRain className="w-3.5 h-3.5 text-blue-400" />
                  Nordic Rain on Slate Roof
                </span>
                <span>{rainVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={rainVolume}
                onChange={(e) => setRainVolume(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono text-stone-300 mb-1">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  Birch Fireplace Crackle
                </span>
                <span>{fireVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={fireVolume}
                onChange={(e) => setFireVolume(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono text-stone-300 mb-1">
                <span className="flex items-center gap-1.5">
                  <Waves className="w-3.5 h-3.5 text-cyan-400" />
                  Atlantic Swell & Tidal Foam
                </span>
                <span>{oceanVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={oceanVolume}
                onChange={(e) => setOceanVolume(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
