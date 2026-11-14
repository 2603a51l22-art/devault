import React from 'react';
import { CATEGORIES } from '../data/initialProjects';
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  RotateCcw,
  Bookmark,
  Layers,
  Globe,
  Brain,
  Radio,
  Smartphone,
  ShieldAlert
} from 'lucide-react';

const CATEGORY_ICONS = {
  "All": Layers,
  "Web Dev": Globe,
  "AI/ML": Brain,
  "IoT/Hardware": Radio,
  "Mobile Apps": Smartphone,
  "Cybersecurity": ShieldAlert,
};

export default function FilterBar({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categoryCounts,
  totalMatching,
  searchQuery,
  selectedTag,
  showOnlySaved,
  setShowOnlySaved,
  onResetFilters
}) {
  const hasActiveFilters = selectedCategory !== 'All' || sortBy !== 'featured' || searchQuery || selectedTag || showOnlySaved;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-3 sm:p-4 rounded-2xl bg-white/70 dark:bg-obsidian-800/80 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm">
        
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat && !showOnlySaved;
            const count = categoryCounts[cat] || 0;
            const IconComponent = CATEGORY_ICONS[cat] || Layers;

            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setShowOnlySaved(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold shrink-0 transition-all duration-200 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-[1.02]'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900/60 dark:hover:bg-obsidian-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/5'
                }`}
              >
                <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{cat}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-obsidian-700 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}

          {/* Bookmarked Filter Pill */}
          <button
            onClick={() => setShowOnlySaved(!showOnlySaved)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold shrink-0 transition-all duration-200 ${
              showOnlySaved
                ? 'bg-amber-500 text-obsidian-950 font-black shadow-md shadow-amber-500/30 scale-[1.02]'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900/60 dark:hover:bg-obsidian-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/5'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${showOnlySaved ? 'fill-obsidian-950 text-obsidian-950' : 'text-amber-500'}`} />
            <span>Saved</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                showOnlySaved
                  ? 'bg-obsidian-950/20 text-obsidian-950'
                  : 'bg-slate-200 dark:bg-obsidian-700 text-slate-500 dark:text-slate-400'
              }`}
            >
              {categoryCounts['Bookmarked'] || 0}
            </span>
          </button>
        </div>

        {/* Right Controls: Sort & Filter Summary */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-200 dark:border-white/10">
          
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Showing <strong className="text-slate-900 dark:text-white font-bold">{totalMatching}</strong> projects
          </div>

          <div className="flex items-center gap-2">
            {/* Sort Selector */}
            <div className="relative inline-flex items-center">
              <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-8 pr-7 py-1.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-100 dark:bg-obsidian-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 cursor-pointer appearance-none"
              >
                <option value="featured">✨ Featured First</option>
                <option value="newest">🕒 Newest Added</option>
                <option value="upvotes">🔥 Most Liked</option>
                <option value="alpha">🔤 Alphabetical (A-Z)</option>
              </select>
            </div>

            {/* Reset Filters Button if any filters active */}
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                title="Reset all filters"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-rose-500 hover:text-rose-600 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition duration-150"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
