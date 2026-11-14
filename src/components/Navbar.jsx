import React, { useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  Plus, 
  Moon, 
  Sun, 
  Bookmark, 
  X, 
  Layers
} from 'lucide-react';

export default function Navbar({
  searchQuery,
  setSearchQuery,
  onOpenSubmit,
  darkMode,
  setDarkMode,
  savedCount,
  showOnlySaved,
  setShowOnlySaved
}) {
  const searchInputRef = useRef(null);

  // Keyboard shortcut listener: '/' or 'Ctrl+K' focuses search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) && 
          document.activeElement !== searchInputRef.current &&
          !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-obsidian-900/80 dark:bg-obsidian-900/80 bg-white/80 border-b border-slate-200 dark:border-white/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative group cursor-pointer" onClick={() => { setSearchQuery(''); setShowOnlySaved(false); }}>
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative w-10 h-10 rounded-xl bg-obsidian-950 dark:bg-obsidian-950 bg-white flex items-center justify-center border border-indigo-500/30 text-indigo-400">
                <Layers className="w-5 h-5 text-indigo-500 dark:text-indigo-400 group-hover:rotate-6 transition-transform duration-300" />
              </div>
            </div>
            <div className="cursor-pointer" onClick={() => { setSearchQuery(''); setShowOnlySaved(false); }}>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-600 to-slate-700 dark:from-white dark:via-slate-100 dark:to-indigo-300 bg-clip-text text-transparent">
                  DevVault
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block -mt-0.5">
                Mini Project Showcase
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-2 sm:mx-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, tags (e.g. React), author, stack..."
                className="w-full pl-10 pr-20 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl bg-slate-100/90 dark:bg-obsidian-950/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 border border-slate-300/80 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/10 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-slate-200 dark:bg-obsidian-800 rounded border border-slate-300 dark:border-slate-700">
                    /
                  </kbd>
                )}
              </div>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Bookmarks Toggle Button */}
            <button
              onClick={() => setShowOnlySaved(!showOnlySaved)}
              title={showOnlySaved ? "Show All Projects" : "Show Saved Projects"}
              className={`relative flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all duration-200 ${
                showOnlySaved 
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/40 ring-2 ring-amber-500/20' 
                  : 'bg-slate-100 dark:bg-obsidian-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${showOnlySaved ? 'fill-amber-500 text-amber-500' : 'text-slate-500 dark:text-slate-400'}`} />
              <span className="hidden md:inline">Saved</span>
              {savedCount > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                  showOnlySaved 
                    ? 'bg-amber-500 text-obsidian-950 font-black' 
                    : 'bg-slate-200 dark:bg-obsidian-700 text-slate-700 dark:text-slate-300'
                }`}>
                  {savedCount}
                </span>
              )}
            </button>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-obsidian-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition duration-200"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Submit Project Button */}
            <button
              onClick={onOpenSubmit}
              className="relative group inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white overflow-hidden shadow-lg shadow-indigo-500/25 active:scale-95 transition-all duration-200"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 group-hover:opacity-95 transition-opacity"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
              <Plus className="relative z-10 w-4 h-4 stroke-[2.5]" />
              <span className="relative z-10 hidden sm:inline">Submit Project</span>
              <span className="relative z-10 sm:hidden">Submit</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
