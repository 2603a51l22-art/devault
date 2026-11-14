import React from 'react';
import { 
  Heart, 
  Bookmark, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Layers, 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const CATEGORY_STYLES = {
  "Web Dev": {
    badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    dot: "bg-indigo-400"
  },
  "AI/ML": {
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    dot: "bg-cyan-400"
  },
  "IoT/Hardware": {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    dot: "bg-emerald-400"
  },
  "Mobile Apps": {
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    dot: "bg-violet-400"
  },
  "Cybersecurity": {
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    dot: "bg-rose-400"
  },
};

export default function ProjectCard({
  project,
  onSelectProject,
  onToggleUpvote,
  isUpvoted,
  onToggleBookmark,
  isBookmarked,
  onTagClick
}) {
  const catStyle = CATEGORY_STYLES[project.category] || {
    badge: "bg-slate-500/10 text-slate-400 border-slate-500/30",
    dot: "bg-slate-400"
  };

  return (
    <div 
      onClick={() => onSelectProject(project)}
      className="group relative flex flex-col rounded-2xl bg-white dark:bg-obsidian-800/90 border border-slate-200/90 dark:border-white/10 hover:border-indigo-500/50 dark:hover:border-indigo-500/40 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Thumbnail Banner */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-900">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            onError={(e) => {
              // Graceful fallback if image URL fails
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : null}

        {/* Fallback stylish gradient background */}
        <div 
          className={`w-full h-full bg-gradient-to-tr ${project.gradient || 'from-indigo-600 via-purple-600 to-cyan-500'} items-center justify-center p-6 ${project.imageUrl ? 'hidden' : 'flex'}`}
        >
          <div className="text-center">
            <span className="text-2xl font-black text-white/90 tracking-tight font-mono">
              {project.title.slice(0, 3).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-black/30 pointer-events-none"></div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${catStyle.badge} bg-obsidian-950/70`}>
            <span className={`w-1.5 h-1.5 rounded-full ${catStyle.dot} animate-pulse`}></span>
            {project.category}
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
              <Sparkles className="w-2.5 h-2.5" /> Featured
            </span>
          )}
        </div>

        {/* Bookmark Quick Toggle Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(project.id);
          }}
          title={isBookmarked ? "Remove from bookmarks" : "Save project"}
          className="absolute top-3 right-3 z-10 p-2 rounded-xl backdrop-blur-md bg-obsidian-950/60 hover:bg-obsidian-900 border border-white/10 text-white/80 hover:text-white transition duration-200"
        >
          <Bookmark className={`w-4 h-4 transition-transform active:scale-125 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
        </button>

        {/* Quick View Pill on Hover */}
        <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/90 dark:bg-obsidian-900/90 text-slate-900 dark:text-white backdrop-blur-md shadow-md">
            Details <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5">
        
        {/* Title & Tagline */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 3).map((tech, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onTagClick && onTagClick(tech);
              }}
              className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-obsidian-900/90 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5 hover:border-indigo-500/40 hover:text-indigo-500 transition-colors"
            >
              {tech}
            </button>
          ))}
          {project.techStack.length > 3 && (
            <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-obsidian-900 text-slate-400 border border-slate-200 dark:border-white/5 self-center">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        {/* Card Footer: Author + Upvote */}
        <div className="mt-auto pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
          
          {/* Author snippet */}
          <div className="flex items-center gap-2 min-w-0">
            {project.author?.avatar ? (
              <img
                src={project.author.avatar}
                alt={project.author.name}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-white/10 shrink-0"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                {project.author?.name ? project.author.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">
              {project.author?.name || 'Anonymous'}
            </span>
          </div>

          {/* Upvote Interactive Counter */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleUpvote(project.id);
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-90 ${
              isUpvoted
                ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30 shadow-sm shadow-rose-500/10'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900/80 dark:hover:bg-obsidian-700 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 transition-transform duration-200 ${isUpvoted ? 'fill-rose-500 text-rose-500 scale-110' : 'group-hover:scale-110'}`} />
            <span>{project.upvotes}</span>
          </button>

        </div>

      </div>
    </div>
  );
}
