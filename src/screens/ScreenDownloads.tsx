import React, { useState, useEffect } from 'react';
import {
  ArrowDownToLine,
  Pause,
  Play,
  X,
  RotateCw,
  CheckCircle2,
  Trash2,
  HardDrive,
  Wifi,
  CloudDownload,
  Clock,
  Layers,
  ArrowUp,
  Plus,
  Check,
  AlertCircle
} from 'lucide-react';
import { Book, NOVEL_BOOKS } from '../data/novelData';

export interface DownloadTask {
  id: string;
  book: Book;
  totalChapters: number;
  downloadedChapters: number;
  currentChapterName: string;
  totalSizeMb: number;
  downloadedSizeMb: number;
  progressPercent: number; // 0 to 100
  speedKbps: number;
  status: 'downloading' | 'paused' | 'queued' | 'completed';
  createdAt: number;
}

interface ScreenDownloadsProps {
  onOpenReader: (book: Book) => void;
  onSelectBook: (book: Book) => void;
  onOpenDiscover?: () => void;
  isDark?: boolean;
}

export const ScreenDownloads: React.FC<ScreenDownloadsProps> = ({
  onOpenReader,
  onSelectBook,
  onOpenDiscover,
  isDark = false
}) => {
  // Initial demo download queue items
  const [tasks, setTasks] = useState<DownloadTask[]>([
    {
      id: 'task-1',
      book: NOVEL_BOOKS[0], // Solitude by the Sea
      totalChapters: NOVEL_BOOKS[0].chapters.length,
      downloadedChapters: 2,
      currentChapterName: 'Chapter 03: Salt and Shadow',
      totalSizeMb: 6.8,
      downloadedSizeMb: 3.2,
      progressPercent: 47,
      speedKbps: 1850,
      status: 'downloading',
      createdAt: Date.now() - 120000
    },
    {
      id: 'task-2',
      book: NOVEL_BOOKS[1], // Neon Dynasty
      totalChapters: NOVEL_BOOKS[1].chapters.length,
      downloadedChapters: 0,
      currentChapterName: 'Waiting in queue...',
      totalSizeMb: 8.4,
      downloadedSizeMb: 0.0,
      progressPercent: 0,
      speedKbps: 0,
      status: 'queued',
      createdAt: Date.now() - 60000
    },
    {
      id: 'task-3',
      book: NOVEL_BOOKS[2], // The Northern Light
      totalChapters: 4,
      downloadedChapters: 2,
      currentChapterName: 'Chapter 02: Frozen Fjord',
      totalSizeMb: 4.2,
      downloadedSizeMb: 2.1,
      progressPercent: 50,
      speedKbps: 0,
      status: 'paused',
      createdAt: Date.now() - 300000
    },
    {
      id: 'task-4',
      book: NOVEL_BOOKS[3], // Botanical Monograph
      totalChapters: NOVEL_BOOKS[3].chapters.length,
      downloadedChapters: NOVEL_BOOKS[3].chapters.length,
      currentChapterName: 'All chapters verified',
      totalSizeMb: 5.1,
      downloadedSizeMb: 5.1,
      progressPercent: 100,
      speedKbps: 0,
      status: 'completed',
      createdAt: Date.now() - 600000
    }
  ]);

  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'paused' | 'completed'>('all');
  const [wifiOnly, setWifiOnly] = useState(true);
  const [autoNext, setAutoNext] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Live Simulated Download Progression Engine
  useEffect(() => {
    const timer = setInterval(() => {
      setTasks(prevTasks => {
        // Find if there is any actively downloading task
        const downloadingIdx = prevTasks.findIndex(t => t.status === 'downloading');

        if (downloadingIdx === -1) {
          // If no active task and autoNext is enabled, promote the first queued task
          if (autoNext) {
            const nextQueuedIdx = prevTasks.findIndex(t => t.status === 'queued');
            if (nextQueuedIdx !== -1) {
              const updated = [...prevTasks];
              updated[nextQueuedIdx] = {
                ...updated[nextQueuedIdx],
                status: 'downloading',
                speedKbps: Math.floor(1400 + Math.random() * 800)
              };
              return updated;
            }
          }
          return prevTasks;
        }

        const activeTask = prevTasks[downloadingIdx];
        const increment = 2.5; // percent step
        const nextProgress = activeTask.progressPercent + increment;

        const updated = [...prevTasks];

        if (nextProgress >= 100) {
          // Task completes!
          updated[downloadingIdx] = {
            ...activeTask,
            progressPercent: 100,
            downloadedChapters: activeTask.totalChapters,
            downloadedSizeMb: activeTask.totalSizeMb,
            currentChapterName: 'Download complete',
            speedKbps: 0,
            status: 'completed'
          };

          // Auto promote next in queue if autoNext is true
          if (autoNext) {
            const nextQueuedIdx = updated.findIndex(t => t.status === 'queued');
            if (nextQueuedIdx !== -1) {
              updated[nextQueuedIdx] = {
                ...updated[nextQueuedIdx],
                status: 'downloading',
                speedKbps: Math.floor(1400 + Math.random() * 800)
              };
            }
          }
        } else {
          // Ongoing progress update
          const newDownloadedChapters = Math.min(
            activeTask.totalChapters,
            Math.max(1, Math.floor((nextProgress / 100) * activeTask.totalChapters))
          );
          const newDownloadedMb = parseFloat(((nextProgress / 100) * activeTask.totalSizeMb).toFixed(1));

          updated[downloadingIdx] = {
            ...activeTask,
            progressPercent: Math.min(99.5, nextProgress),
            downloadedChapters: newDownloadedChapters,
            downloadedSizeMb: newDownloadedMb,
            currentChapterName: `Downloading Ch. ${newDownloadedChapters}/${activeTask.totalChapters}`,
            speedKbps: Math.floor(1600 + Math.random() * 500)
          };
        }

        return updated;
      });
    }, 1200);

    return () => clearInterval(timer);
  }, [autoNext]);

  // Pause a single task
  const handlePauseTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            status: 'paused',
            speedKbps: 0
          };
        }
        return task;
      })
    );
    showToast('Download paused');
  };

  // Resume or start a task
  const handleResumeTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            status: 'downloading',
            speedKbps: 1750
          };
        }
        return task;
      })
    );
    showToast('Download resumed');
  };

  // Cancel download (remove from queue)
  const handleCancelTask = (taskId: string, title: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    showToast(`Cancelled "${title}"`);
  };

  // Retry or Re-download task
  const handleRetryTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            progressPercent: 0,
            downloadedChapters: 0,
            downloadedSizeMb: 0,
            status: 'downloading',
            speedKbps: 1800
          };
        }
        return task;
      })
    );
    showToast('Restarting download');
  };

  // Move task to top of queue
  const handlePrioritizeTask = (taskId: string) => {
    setTasks(prev => {
      const idx = prev.findIndex(t => t.id === taskId);
      if (idx <= 0) return prev;
      const target = prev[idx];
      const rest = prev.filter(t => t.id !== taskId);
      return [{ ...target, status: 'downloading', speedKbps: 1800 }, ...rest];
    });
    showToast('Moved to top of queue');
  };

  // Global Batch Actions
  const handlePauseAll = () => {
    setTasks(prev =>
      prev.map(t => (t.status === 'downloading' || t.status === 'queued' ? { ...t, status: 'paused', speedKbps: 0 } : t))
    );
    showToast('All active downloads paused');
  };

  const handleResumeAll = () => {
    setTasks(prev => {
      let firstPromoted = false;
      return prev.map(t => {
        if (t.status === 'paused') {
          if (!firstPromoted) {
            firstPromoted = true;
            return { ...t, status: 'downloading', speedKbps: 1800 };
          }
          return { ...t, status: 'queued', speedKbps: 0 };
        }
        return t;
      });
    });
    showToast('Queue resumed');
  };

  const handleClearCompleted = () => {
    setTasks(prev => prev.filter(t => t.status !== 'completed'));
    showToast('Completed tasks cleared');
  };

  const handleRestoreSampleQueue = () => {
    setTasks([
      {
        id: `task-${Date.now()}-1`,
        book: NOVEL_BOOKS[0],
        totalChapters: NOVEL_BOOKS[0].chapters.length,
        downloadedChapters: 1,
        currentChapterName: 'Chapter 02: Driftwood',
        totalSizeMb: 6.8,
        downloadedSizeMb: 1.5,
        progressPercent: 22,
        speedKbps: 1850,
        status: 'downloading',
        createdAt: Date.now()
      },
      {
        id: `task-${Date.now()}-2`,
        book: NOVEL_BOOKS[1],
        totalChapters: NOVEL_BOOKS[1].chapters.length,
        downloadedChapters: 0,
        currentChapterName: 'Waiting in queue...',
        totalSizeMb: 8.4,
        downloadedSizeMb: 0.0,
        progressPercent: 0,
        speedKbps: 0,
        status: 'queued',
        createdAt: Date.now() + 1
      },
      {
        id: `task-${Date.now()}-3`,
        book: NOVEL_BOOKS[2],
        totalChapters: 4,
        downloadedChapters: 1,
        currentChapterName: 'Chapter 02: Frozen Fjord',
        totalSizeMb: 4.2,
        downloadedSizeMb: 1.0,
        progressPercent: 25,
        speedKbps: 0,
        status: 'paused',
        createdAt: Date.now() + 2
      }
    ]);
    showToast('Sample download queue loaded');
  };

  const handleAddBookToQueue = (book: Book) => {
    if (tasks.some(t => t.book.id === book.id && t.status !== 'completed')) {
      showToast('Novel is already in download queue');
      setIsAddModalOpen(false);
      return;
    }

    const newTask: DownloadTask = {
      id: `task-${Date.now()}`,
      book,
      totalChapters: book.chapters.length || 5,
      downloadedChapters: 0,
      currentChapterName: 'Starting download...',
      totalSizeMb: parseFloat((4 + Math.random() * 4).toFixed(1)),
      downloadedSizeMb: 0.0,
      progressPercent: 0,
      speedKbps: tasks.some(t => t.status === 'downloading') ? 0 : 1800,
      status: tasks.some(t => t.status === 'downloading') ? 'queued' : 'downloading',
      createdAt: Date.now()
    };

    setTasks(prev => [newTask, ...prev]);
    setIsAddModalOpen(false);
    showToast(`Added "${book.title}" to queue`);
  };

  // Metrics
  const activeCount = tasks.filter(t => t.status === 'downloading' || t.status === 'queued').length;
  const pausedCount = tasks.filter(t => t.status === 'paused').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const currentSpeedKbps = tasks.reduce((sum, t) => sum + (t.status === 'downloading' ? t.speedKbps : 0), 0);
  const totalCachedMb = tasks.reduce((sum, t) => sum + t.downloadedSizeMb, 0);

  // Filtered tasks
  const filteredTasks = tasks.filter(t => {
    if (activeTab === 'active') return t.status === 'downloading' || t.status === 'queued';
    if (activeTab === 'paused') return t.status === 'paused';
    if (activeTab === 'completed') return t.status === 'completed';
    return true;
  });

  return (
    <div
      className={`flex-1 flex flex-col transition-colors duration-200 overflow-y-auto pb-12 font-sans ${
        isDark ? 'bg-[#0A0A0A] text-stone-100' : 'bg-[#FFFFFF] text-stone-900'
      }`}
    >
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-14 inset-x-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-200">
          <div
            className={`px-4 py-2 rounded-full text-xs font-sans font-medium shadow-lg flex items-center gap-2 border ${
              isDark
                ? 'bg-stone-900 border-stone-700 text-stone-100 shadow-black/80'
                : 'bg-stone-900 border-stone-800 text-stone-50 shadow-stone-900/30'
            }`}
          >
            <Check className="w-3.5 h-3.5 text-amber-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Header: Queue Title + Batch Controls */}
      <header
        className={`px-4 pt-3.5 pb-3 border-b sticky top-0 backdrop-blur-md z-20 flex items-center justify-between ${
          isDark
            ? 'bg-[#0A0A0A]/90 border-stone-800/60 text-stone-100'
            : 'bg-[#FFFFFF]/90 border-stone-200/70 text-stone-900'
        }`}
      >
        <div>
          <span className="text-[10px] font-sans font-semibold uppercase tracking-wider block text-amber-600 dark:text-amber-400 leading-none mb-0.5">
            Download Manager
          </span>
          <h1 className={`text-xl font-sans font-semibold tracking-tight ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>
            Queue
          </h1>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            aria-label="Add novel to queue"
            title="Queue a Novel"
            className={`min-h-[34px] px-2.5 rounded-lg border text-xs font-sans font-medium flex items-center gap-1 transition-all cursor-pointer ${
              isDark
                ? 'border-stone-800 bg-stone-900/80 text-stone-200 hover:border-stone-700 hover:text-white'
                : 'border-stone-300/80 bg-white/80 text-stone-700 hover:border-stone-400 hover:text-stone-900'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>

          {tasks.some(t => t.status === 'downloading') ? (
            <button
              type="button"
              onClick={handlePauseAll}
              aria-label="Pause all downloads"
              title="Pause all active downloads"
              className={`min-h-[34px] px-2.5 rounded-lg border text-xs font-sans font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                isDark
                  ? 'border-amber-400/80 bg-amber-950/20 text-amber-300 hover:bg-amber-950/40'
                  : 'border-amber-600/80 bg-amber-50 text-amber-900 hover:bg-amber-100'
              }`}
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause All</span>
            </button>
          ) : pausedCount > 0 ? (
            <button
              type="button"
              onClick={handleResumeAll}
              aria-label="Resume all downloads"
              title="Resume all paused downloads"
              className={`min-h-[34px] px-2.5 rounded-lg border text-xs font-sans font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                isDark
                  ? 'border-emerald-500/80 bg-emerald-950/20 text-emerald-300 hover:bg-emerald-950/40'
                  : 'border-emerald-600/80 bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Resume All</span>
            </button>
          ) : null}
        </div>
      </header>

      {/* Network & Queue Telemetry Strip */}
      <section className="px-4 pt-3 pb-2">
        <div
          className={`p-3.5 rounded-2xl border transition-colors ${
            isDark
              ? 'bg-[#0D0D0D] border-stone-800/80 text-stone-200'
              : 'bg-white border-stone-200/90 text-stone-800'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center border ${
                  currentSpeedKbps > 0
                    ? isDark
                      ? 'bg-amber-400/10 border-amber-400/40 text-amber-400'
                      : 'bg-amber-100/80 border-amber-300 text-amber-800'
                    : isDark
                    ? 'bg-stone-800 border-stone-700 text-stone-400'
                    : 'bg-stone-100 border-stone-200 text-stone-500'
                }`}
              >
                <ArrowDownToLine className={`w-3.5 h-3.5 ${currentSpeedKbps > 0 ? 'animate-bounce' : ''}`} />
              </div>
              <div>
                <span className="text-[12.5px] font-sans font-semibold tracking-tight block">
                  {currentSpeedKbps > 0 ? `${(currentSpeedKbps / 1024).toFixed(1)} MB/s Active` : 'Queue Idle / Paused'}
                </span>
                <span className="text-[11px] font-sans text-stone-400 block">
                  {activeCount} in queue · {pausedCount} paused
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-mono tabular-nums text-amber-600 dark:text-amber-400 font-medium px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              <HardDrive className="w-3 h-3" />
              <span>{totalCachedMb.toFixed(1)} MB Cached</span>
            </div>
          </div>

          {/* Wi-Fi & Auto-Advance Toggles in compact pill form */}
          <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-stone-200/50 dark:border-stone-800/80 text-xs">
            <button
              type="button"
              onClick={() => setWifiOnly(!wifiOnly)}
              className="flex items-center gap-1.5 cursor-pointer text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
            >
              <Wifi className={`w-3.5 h-3.5 ${wifiOnly ? 'text-emerald-500' : 'text-stone-400'}`} />
              <span className="text-[11px] font-sans font-medium">Wi-Fi Only: <span className="font-semibold">{wifiOnly ? 'On' : 'Off'}</span></span>
            </button>

            <button
              type="button"
              onClick={() => setAutoNext(!autoNext)}
              className="flex items-center gap-1.5 cursor-pointer text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
            >
              <Clock className={`w-3.5 h-3.5 ${autoNext ? 'text-amber-500' : 'text-stone-400'}`} />
              <span className="text-[11px] font-sans font-medium">Auto Next: <span className="font-semibold">{autoNext ? 'Enabled' : 'Disabled'}</span></span>
            </button>
          </div>
        </div>
      </section>

      {/* Queue Filter Segmented Tabs */}
      <section className="px-4 py-1.5">
        <div
          className={`p-1 rounded-xl grid grid-cols-4 gap-1 text-xs font-sans font-medium ${
            isDark ? 'bg-stone-900 border border-stone-800' : 'bg-stone-200/60'
          }`}
        >
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`min-h-[32px] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'all'
                ? isDark
                  ? 'bg-stone-800 text-amber-400 shadow-2xs font-semibold'
                  : 'bg-white text-stone-900 shadow-2xs font-semibold'
                : isDark
                ? 'text-stone-400 hover:text-stone-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>All</span>
            <span className="font-mono text-[10px] tabular-nums opacity-80">({tasks.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('active')}
            className={`min-h-[32px] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'active'
                ? isDark
                  ? 'bg-stone-800 text-amber-400 shadow-2xs font-semibold'
                  : 'bg-white text-stone-900 shadow-2xs font-semibold'
                : isDark
                ? 'text-stone-400 hover:text-stone-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>Active</span>
            <span className="font-mono text-[10px] tabular-nums opacity-80">({activeCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('paused')}
            className={`min-h-[32px] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'paused'
                ? isDark
                  ? 'bg-stone-800 text-amber-400 shadow-2xs font-semibold'
                  : 'bg-white text-stone-900 shadow-2xs font-semibold'
                : isDark
                ? 'text-stone-400 hover:text-stone-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>Paused</span>
            <span className="font-mono text-[10px] tabular-nums opacity-80">({pausedCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`min-h-[32px] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'completed'
                ? isDark
                  ? 'bg-stone-800 text-amber-400 shadow-2xs font-semibold'
                  : 'bg-white text-stone-900 shadow-2xs font-semibold'
                : isDark
                ? 'text-stone-400 hover:text-stone-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>Done</span>
            <span className="font-mono text-[10px] tabular-nums opacity-80">({completedCount})</span>
          </button>
        </div>
      </section>

      {/* Queue Tasks List Section */}
      <section className="px-4 pt-2 flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-[11px] font-sans font-semibold uppercase tracking-wider ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
            Download Queue Tasks <span className="font-mono text-xs tabular-nums font-medium">({filteredTasks.length})</span>
          </span>

          {completedCount > 0 && activeTab === 'completed' && (
            <button
              type="button"
              onClick={handleClearCompleted}
              className={`text-[11px] font-sans font-medium text-stone-400 hover:text-rose-500 flex items-center gap-1 cursor-pointer`}
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear Done</span>
            </button>
          )}
        </div>

        {filteredTasks.length === 0 ? (
          /* Empty Queue State */
          <div
            className={`p-8 rounded-2xl border text-center flex flex-col items-center justify-center my-4 ${
              isDark ? 'bg-[#0D0D0D] border-stone-800/80' : 'bg-stone-50 border-stone-200/80'
            }`}
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 border ${
                isDark ? 'bg-stone-900 border-stone-800 text-amber-400' : 'bg-white border-stone-200 text-stone-700'
              }`}
            >
              <ArrowDownToLine className="w-6 h-6 stroke-[1.8]" />
            </div>

            <h3 className="font-sans text-sm font-semibold mb-1">
              {activeTab === 'all'
                ? 'Download Queue Empty'
                : activeTab === 'active'
                ? 'No Active Downloads'
                : activeTab === 'paused'
                ? 'No Paused Downloads'
                : 'No Completed Downloads'}
            </h3>
            <p className={`text-xs max-w-xs leading-relaxed mb-4 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
              {activeTab === 'all'
                ? 'You can add novels or sample chapters to the queue to test pausing, resuming, and prioritizing tasks.'
                : 'Switch tabs or add new chapters to download them offline.'}
            </p>

            <button
              type="button"
              onClick={handleRestoreSampleQueue}
              className={`px-3.5 py-2 rounded-xl text-xs font-sans font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
                isDark
                  ? 'border-amber-400/80 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20'
                  : 'border-stone-900 bg-stone-900 text-stone-50 hover:bg-stone-800'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Populate Sample Queue</span>
            </button>
          </div>
        ) : (
          /* Queue Tasks Stack */
          <div className="space-y-2.5">
            {filteredTasks.map(task => {
              const isDownloading = task.status === 'downloading';
              const isPaused = task.status === 'paused';
              const isQueued = task.status === 'queued';
              const isCompleted = task.status === 'completed';

              return (
                <div
                  key={task.id}
                  className={`border rounded-2xl p-3.5 transition-all shadow-2xs relative overflow-hidden ${
                    isDark
                      ? isDownloading
                        ? 'bg-[#121215] border-amber-500/30 ring-1 ring-amber-500/10'
                        : 'bg-[#0D0D0D] border-stone-800/80'
                      : isDownloading
                      ? 'bg-amber-50/30 border-amber-300/60 ring-1 ring-amber-500/10'
                      : 'bg-white border-stone-200/90'
                  }`}
                >
                  <div className="flex gap-3 items-start">
                    {/* Book Thumbnail */}
                    <div
                      onClick={() => onSelectBook(task.book)}
                      className={`w-14 h-20 rounded-lg overflow-hidden shrink-0 shadow-xs border relative cursor-pointer ${
                        isDark ? 'bg-stone-800 border-stone-700' : 'bg-stone-100 border-stone-300/60'
                      }`}
                    >
                      <img
                        src={task.book.coverImage}
                        alt={task.book.title}
                        className="w-full h-full object-cover"
                      />
                      {isCompleted && (
                        <div className="absolute inset-0 bg-emerald-950/40 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        </div>
                      )}
                    </div>

                    {/* Task Metadata & Live Progress */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1 mb-0.5">
                        <div className="min-w-0 pr-1">
                          <h4
                            onClick={() => onSelectBook(task.book)}
                            className="font-sans text-xs font-semibold leading-snug truncate cursor-pointer hover:underline"
                          >
                            {task.book.title}
                          </h4>
                          <p className={`text-[11px] font-sans truncate ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                            {task.book.author}
                          </p>
                        </div>

                        {/* Status Badge */}
                        <span
                          className={`text-[9.5px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                            isDownloading
                              ? isDark
                                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                                : 'bg-amber-100 text-amber-800 border border-amber-300'
                              : isPaused
                              ? isDark
                                ? 'bg-stone-800 text-stone-300 border border-stone-700'
                                : 'bg-stone-200 text-stone-700 border border-stone-300'
                              : isQueued
                              ? isDark
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                : 'bg-blue-50 text-blue-800 border border-blue-200'
                              : isDark
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>

                      {/* Current chapter or status text */}
                      <p className={`text-[11px] font-sans truncate mt-1 ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                        {task.currentChapterName}
                      </p>

                      {/* Progress Bar */}
                      <div className="mt-2 mb-1.5">
                        <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-stone-800' : 'bg-stone-200'}`}>
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              isCompleted
                                ? 'bg-emerald-500'
                                : isPaused
                                ? 'bg-stone-400 dark:bg-stone-600'
                                : isQueued
                                ? 'bg-blue-400'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${task.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Progress Metrics & Action Buttons Row */}
                      <div className="flex items-center justify-between text-[10.5px] font-mono tabular-nums text-stone-400 pt-0.5">
                        <div>
                          <span>{task.progressPercent.toFixed(0)}%</span>
                          <span className="mx-1">·</span>
                          <span>{task.downloadedSizeMb} / {task.totalSizeMb} MB</span>
                          {isDownloading && task.speedKbps > 0 && (
                            <>
                              <span className="mx-1">·</span>
                              <span className="text-amber-500 font-medium">{(task.speedKbps / 1024).toFixed(1)} MB/s</span>
                            </>
                          )}
                        </div>

                        {/* Interactive Cancel / Pause / Resume / Prioritize Buttons */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* 1. Prioritize / Move Up (for queued tasks) */}
                          {isQueued && (
                            <button
                              type="button"
                              onClick={() => handlePrioritizeTask(task.id)}
                              aria-label="Prioritize download"
                              title="Download first"
                              className="p-1 rounded-md text-stone-400 hover:text-amber-400 transition-colors cursor-pointer hover:bg-amber-400/10"
                            >
                              <ArrowUp className="w-3.5 h-3.5 stroke-[2.2]" />
                            </button>
                          )}

                          {/* 2. Pause Button (for active downloading) */}
                          {isDownloading && (
                            <button
                              type="button"
                              onClick={() => handlePauseTask(task.id)}
                              aria-label="Pause download"
                              title="Pause"
                              className={`px-2 py-1 rounded-md text-[11px] font-sans font-medium flex items-center gap-1 border transition-colors cursor-pointer ${
                                isDark
                                  ? 'border-stone-700 bg-stone-800/80 text-amber-300 hover:bg-stone-700'
                                  : 'border-stone-300 bg-stone-100 text-stone-800 hover:bg-stone-200'
                              }`}
                            >
                              <Pause className="w-3 h-3 fill-current" />
                              <span>Pause</span>
                            </button>
                          )}

                          {/* 3. Resume Button (for paused or queued) */}
                          {(isPaused || isQueued) && (
                            <button
                              type="button"
                              onClick={() => handleResumeTask(task.id)}
                              aria-label="Resume download"
                              title="Resume"
                              className={`px-2 py-1 rounded-md text-[11px] font-sans font-medium flex items-center gap-1 border transition-colors cursor-pointer ${
                                isDark
                                  ? 'border-emerald-500/50 bg-emerald-950/20 text-emerald-400 hover:bg-emerald-950/40'
                                  : 'border-emerald-600/40 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                              }`}
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Resume</span>
                            </button>
                          )}

                          {/* 4. Open Reader (for completed) */}
                          {isCompleted && (
                            <button
                              type="button"
                              onClick={() => onOpenReader(task.book)}
                              aria-label="Read completed novel"
                              className={`px-2 py-1 rounded-md text-[11px] font-sans font-medium flex items-center gap-1 border transition-colors cursor-pointer ${
                                isDark
                                  ? 'border-amber-400/80 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20'
                                  : 'border-stone-900 bg-stone-900 text-stone-50 hover:bg-stone-800'
                              }`}
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Read</span>
                            </button>
                          )}

                          {/* 5. Cancel / Remove Button */}
                          <button
                            type="button"
                            onClick={() => handleCancelTask(task.id, task.book.title)}
                            aria-label={`Cancel download for ${task.book.title}`}
                            title="Cancel and remove from queue"
                            className="p-1 rounded-md text-stone-400 hover:text-rose-500 transition-colors cursor-pointer hover:bg-rose-500/10"
                          >
                            <X className="w-3.5 h-3.5 stroke-[2]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Modal: Add Novel to Queue */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className={`w-full max-w-sm rounded-2xl border p-4 shadow-2xl ${
              isDark ? 'bg-[#121215] border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/50 dark:border-stone-800 mb-3">
              <div>
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider block text-amber-600 dark:text-amber-400 leading-none mb-0.5">
                  Catalog Novels
                </span>
                <h3 className="font-sans text-sm font-semibold tracking-tight">Add to Download Queue</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {NOVEL_BOOKS.map(book => {
                const existingTask = tasks.find(t => t.book.id === book.id);
                const isInQueue = !!existingTask && existingTask.status !== 'completed';

                return (
                  <div
                    key={book.id}
                    className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${
                      isDark ? 'bg-stone-900/40 border-stone-800/80' : 'bg-stone-50 border-stone-200/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-9 h-13 object-cover rounded shadow-2xs shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-sans text-xs font-semibold truncate">{book.title}</h4>
                        <p className={`text-[10.5px] font-sans truncate ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                          {book.author} · {book.chapters.length} chapters
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={isInQueue}
                      onClick={() => handleAddBookToQueue(book)}
                      className={`min-h-[30px] px-2.5 rounded-lg text-xs font-sans font-medium shrink-0 transition-colors cursor-pointer ${
                        isInQueue
                          ? 'opacity-40 cursor-not-allowed text-stone-400'
                          : isDark
                          ? 'bg-amber-400 text-stone-950 hover:bg-amber-300 font-semibold'
                          : 'bg-stone-900 text-stone-50 hover:bg-stone-800'
                      }`}
                    >
                      {isInQueue ? 'Queued' : 'Download'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
