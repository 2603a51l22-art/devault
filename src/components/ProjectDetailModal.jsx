import React, { useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Heart, 
  Bookmark, 
  Share2, 
  Layers, 
  Cpu, 
  Calendar, 
  User, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function ProjectDetailModal({
  project,
  onClose,
  onToggleUpvote,
  isUpvoted,
  onToggleBookmark,
  isBookmarked,
  onShare
}) {
  // Close on Escape key press & lock body scroll
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  const formattedDate = project.createdAt ? new Date(project.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) : 'Recently added';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 sm:p-6 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"></div>

      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden z-10 my-auto text-left max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Banner */}
        <div className="relative h-48 sm:h-56 w-full shrink-0 overflow-hidden bg-slate-950">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-tr ${project.gradient || 'from-indigo-600 via-purple-600 to-cyan-500'} flex items-center justify-center`}>
              <span className="text-4xl font-black text-white/80 font-mono tracking-tight">
                {project.title}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/40 to-transparent"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 rounded-xl bg-obsidian-950/70 hover:bg-obsidian-950 text-white border border-white/10 backdrop-blur-md transition duration-150 z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on Banner */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600 text-white shadow-md">
                {project.category}
              </span>
              {project.featured && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
                  <Sparkles className="w-3 h-3" /> Featured Project
                </span>
              )}
            </div>

            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300 backdrop-blur-md bg-black/40 px-3 py-1 rounded-full">
              <Calendar className="w-3.5 h-3.5" /> {formattedDate}
            </span>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          
          {/* Header Title + Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 dark:border-white/10 pb-5">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 font-medium">
                {project.tagline}
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Upvote button */}
              <button
                onClick={() => onToggleUpvote(project.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 ${
                  isUpvoted
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                    : 'bg-slate-100 dark:bg-obsidian-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-obsidian-700 border border-slate-200 dark:border-white/10'
                }`}
              >
                <Heart className={`w-4 h-4 ${isUpvoted ? 'fill-white text-white' : 'text-rose-500'}`} />
                <span>{project.upvotes}</span>
              </button>

              {/* Bookmark button */}
              <button
                onClick={() => onToggleBookmark(project.id)}
                title={isBookmarked ? "Remove bookmark" : "Save project"}
                className={`p-2 rounded-xl border transition-all duration-200 ${
                  isBookmarked
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-500'
                    : 'bg-slate-100 dark:bg-obsidian-800 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-white'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
              </button>

              {/* Share button */}
              <button
                onClick={() => onShare && onShare(project)}
                title="Copy share link"
                className="p-2 rounded-xl bg-slate-100 dark:bg-obsidian-800 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition duration-200"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* External Links Bar */}
          <div className="flex flex-wrap gap-3">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all duration-200 active:scale-95"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Live Demo</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-obsidian-800 hover:bg-slate-200 dark:hover:bg-obsidian-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 transition-all duration-200 active:scale-95"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            )}
          </div>

          {/* Project Description */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
              About the Project
            </h4>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {/* Architecture & Engineering Highlights */}
          {project.architectureHighlights && project.architectureHighlights.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-500" />
                Technical & Architecture Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.architectureHighlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-obsidian-800/60 border border-slate-200/80 dark:border-white/5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-500" />
              Technologies & Frameworks
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-mono font-medium rounded-lg bg-slate-100 dark:bg-obsidian-800 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-white/10"
                >
                  #{tech}
                </span>
              ))}
            </div>
          </div>

          {/* Team / Author Section */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/10">
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
              Creator & Team
            </h4>
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-obsidian-800/60 border border-slate-200/80 dark:border-white/5">
              <div className="flex items-center gap-3">
                {project.author?.avatar ? (
                  <img
                    src={project.author.avatar}
                    alt={project.author.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
                    {project.author?.name ? project.author.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
                <div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                    {project.author?.name || 'Anonymous Developer'}
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {project.author?.role || 'Creator & Project Lead'}
                  </p>
                </div>
              </div>

              {project.author?.github && (
                <a
                  href={project.author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-obsidian-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:text-indigo-500 transition"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Profile</span>
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
