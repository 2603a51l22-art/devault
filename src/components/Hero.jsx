import React from 'react';
import { Sparkles, Terminal, Cpu, Award, Zap, Code2 } from 'lucide-react';
import { POPULAR_TAGS } from '../data/initialProjects';

export default function Hero({
  totalProjects,
  totalCategories,
  totalUpvotes,
  selectedTag,
  setSelectedTag,
  searchQuery,
  setSearchQuery
}) {
  return (
    <div className="relative pt-6 pb-8 md:pt-10 md:pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-cyan-500/15 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
            <span>Modern Developer Showcase & Innovation Hub</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Discover, Showcase & Upvote{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Brilliant Mini Projects
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A curated portfolio of engineering experiments, hackathon builds, and open-source mini tools crafted by ambitious developers worldwide.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto pt-2">
            <div className="p-3 rounded-2xl bg-white/60 dark:bg-obsidian-800/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-sm shadow-sm text-center">
              <div className="flex items-center justify-center gap-1.5 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-0.5">
                <Code2 className="w-3.5 h-3.5" />
                <span>Projects</span>
              </div>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {totalProjects}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/60 dark:bg-obsidian-800/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-sm shadow-sm text-center">
              <div className="flex items-center justify-center gap-1.5 text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-0.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>Domains</span>
              </div>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {totalCategories}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/60 dark:bg-obsidian-800/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-sm shadow-sm text-center">
              <div className="flex items-center justify-center gap-1.5 text-rose-500 text-xs font-semibold mb-0.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Upvotes</span>
              </div>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {totalUpvotes}
              </p>
            </div>
          </div>

          {/* Quick-filter Tag Cloud */}
          <div className="pt-2">
            <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5" /> Popular Stacks:
              </span>
              {POPULAR_TAGS.map((tag) => {
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedTag('');
                      } else {
                        setSelectedTag(tag);
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-105'
                        : 'bg-slate-200/70 hover:bg-slate-300 dark:bg-obsidian-800/80 dark:hover:bg-obsidian-700 text-slate-700 dark:text-slate-300 border border-slate-300/50 dark:border-white/10'
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag('')}
                  className="text-xs text-rose-500 hover:text-rose-600 underline font-medium ml-1"
                >
                  Clear tag
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
