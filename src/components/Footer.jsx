import React, { useState } from 'react';
import { Layers, RotateCcw, Github, Heart, AlertTriangle } from 'lucide-react';

export default function Footer({ onResetData }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <footer className="w-full mt-20 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-obsidian-950/80 transition-colors duration-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand info */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                DevVault Showcase
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Built with React, Vite, Tailwind CSS & Lucide Icons.
              </p>
            </div>
          </div>

          {/* Center: Persistence info */}
          <div className="text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
              <span>All submissions, upvotes & bookmarks persist in</span>
              <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-obsidian-800 text-indigo-600 dark:text-indigo-400 font-mono text-[11px]">
                localStorage
              </code>
            </p>
          </div>

          {/* Right: Reset Data Control */}
          <div className="flex items-center gap-3">
            {showConfirm ? (
              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <span className="text-xs text-rose-500 font-medium px-2">
                  Reset all demo data?
                </span>
                <button
                  onClick={() => {
                    onResetData();
                    setShowConfirm(false);
                  }}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition"
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-2 py-1 text-xs font-medium rounded-lg text-slate-400 hover:text-white transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowConfirm(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 bg-slate-200/60 dark:bg-obsidian-800/80 border border-slate-300/60 dark:border-white/5 transition-all duration-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo Data</span>
              </button>
            )}
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} DevVault Portal. Open-source engineering showcases.</p>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <span>•</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for Developers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
