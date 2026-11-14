import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Sparkles, 
  Layers, 
  Github, 
  Globe, 
  User, 
  AlertCircle,
  Check,
  Palette
} from 'lucide-react';
import { CATEGORIES } from '../data/initialProjects';
import confetti from 'canvas-confetti';

const GRADIENT_PRESETS = [
  { name: 'Indigo Cyan', class: 'from-blue-600 via-indigo-600 to-cyan-500' },
  { name: 'Emerald Teal', class: 'from-emerald-600 via-teal-600 to-cyan-700' },
  { name: 'Violet Rose', class: 'from-violet-600 via-purple-600 to-pink-500' },
  { name: 'Cyber Amber', class: 'from-rose-600 via-red-600 to-amber-600' },
  { name: 'Neon Slate', class: 'from-slate-700 via-indigo-900 to-slate-900' },
];

export default function SubmitProjectModal({
  isOpen,
  onClose,
  onSubmitProject
}) {
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    category: 'Web Dev',
    description: '',
    techStack: '',
    architectureHighlights: '',
    authorName: '',
    authorRole: '',
    githubUrl: '',
    liveDemoUrl: '',
    imageUrl: '',
    gradient: GRADIENT_PRESETS[0].class,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on Escape & lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validateUrl = (url) => {
    if (!url) return true; // optional
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = 'Project title is required';
    } else if (formData.title.trim().length < 3) {
      errs.title = 'Title must be at least 3 characters';
    }

    if (!formData.tagline.trim()) {
      errs.tagline = 'A short tagline is required';
    } else if (formData.tagline.trim().length < 8) {
      errs.tagline = 'Tagline must be at least 8 characters';
    }

    if (!formData.description.trim()) {
      errs.description = 'Project description is required';
    } else if (formData.description.trim().length < 20) {
      errs.description = 'Description must be at least 20 characters';
    }

    if (!formData.techStack.trim()) {
      errs.techStack = 'Enter at least one tech stack tag';
    }

    if (!formData.authorName.trim()) {
      errs.authorName = 'Author or team name is required';
    }

    if (formData.githubUrl && !validateUrl(formData.githubUrl)) {
      errs.githubUrl = 'Please enter a valid URL (e.g. https://github.com/...)';
    }

    if (formData.liveDemoUrl && !validateUrl(formData.liveDemoUrl)) {
      errs.liveDemoUrl = 'Please enter a valid URL (e.g. https://...)';
    }

    if (formData.imageUrl && !validateUrl(formData.imageUrl)) {
      errs.imageUrl = 'Please enter a valid image URL';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Process tech stack tags
    const tags = formData.techStack
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    // Process architecture highlights
    const highlights = formData.architectureHighlights
      .split('\n')
      .map((h) => h.replace(/^[-*•]\s*/, '').trim())
      .filter((h) => h.length > 0);

    const newProject = {
      id: `proj-${Date.now()}`,
      title: formData.title.trim(),
      tagline: formData.tagline.trim(),
      description: formData.description.trim(),
      category: formData.category,
      techStack: tags.length > 0 ? tags : ['Web'],
      architectureHighlights: highlights.length > 0 ? highlights : [
        "Modern component-driven architecture",
        "Responsive, performance-optimized layout",
        "Open-source implementation"
      ],
      author: {
        name: formData.authorName.trim(),
        role: formData.authorRole.trim() || 'Creator',
        avatar: '',
        github: formData.githubUrl.trim() || ''
      },
      githubUrl: formData.githubUrl.trim() || '',
      liveDemoUrl: formData.liveDemoUrl.trim() || '',
      imageUrl: formData.imageUrl.trim() || '',
      gradient: formData.gradient,
      upvotes: 1,
      featured: false,
      createdAt: new Date().toISOString()
    };

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // safe fallback if confetti is blocked
    }

    setTimeout(() => {
      onSubmitProject(newProject);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 sm:p-6 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"></div>

      {/* Modal Card */}
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden z-10 my-auto text-left max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Submit Your Project
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Showcase your build to fellow developers and the open-source community.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-xl bg-slate-100 dark:bg-obsidian-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Row 1: Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Project Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Algorithmic Vault"
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-950 text-slate-900 dark:text-white border ${
                  errors.title ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-white/10'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500/40`}
              />
              {errors.title && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.title}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-950 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer"
              >
                {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Tagline */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Short Tagline <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="A punchy one-sentence summary of what this project does"
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-950 text-slate-900 dark:text-white border ${
                errors.tagline ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-white/10'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500/40`}
            />
            {errors.tagline && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.tagline}
              </p>
            )}
          </div>

          {/* Row 3: Tech Stack tags */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Tech Stack <span className="text-rose-500">*</span>{' '}
              <span className="text-slate-400 font-normal lowercase">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              placeholder="e.g. React, Tailwind CSS, TypeScript, FastAPI"
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-950 text-slate-900 dark:text-white border ${
                errors.techStack ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-white/10'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500/40 font-mono`}
            />
            {errors.techStack && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.techStack}
              </p>
            )}
          </div>

          {/* Row 4: Full Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Full Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Explain the background problem, implementation details, key features, and user benefits..."
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-950 text-slate-900 dark:text-white border ${
                errors.description ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-white/10'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500/40`}
            ></textarea>
            {errors.description && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.description}
              </p>
            )}
          </div>

          {/* Row 5: Architecture Highlights */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Architecture & Technical Highlights{' '}
              <span className="text-slate-400 font-normal lowercase">(one highlight per line)</span>
            </label>
            <textarea
              rows={2}
              value={formData.architectureHighlights}
              onChange={(e) => setFormData({ ...formData, architectureHighlights: e.target.value })}
              placeholder="e.g.&#10;• End-to-end client-side encryption via WebCrypto&#10;• Offline-first SQLite persistence"
              className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-950 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            ></textarea>
          </div>

          {/* Row 6: Author Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Author / Team Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                placeholder="e.g. Alex Rivera"
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-950 text-slate-900 dark:text-white border ${
                  errors.authorName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-white/10'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500/40`}
              />
              {errors.authorName && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.authorName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Role / Title
              </label>
              <input
                type="text"
                value={formData.authorRole}
                onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                placeholder="e.g. Frontend Engineer, Student"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-950 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>
          </div>

          {/* Row 7: GitHub and Live Demo URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/username/project"
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-950 text-slate-900 dark:text-white border ${
                  errors.githubUrl ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-white/10'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500/40`}
              />
              {errors.githubUrl && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.githubUrl}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Live Demo URL
              </label>
              <input
                type="url"
                value={formData.liveDemoUrl}
                onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                placeholder="https://my-demo-app.vercel.app"
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-obsidian-950 text-slate-900 dark:text-white border ${
                  errors.liveDemoUrl ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-white/10'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500/40`}
              />
              {errors.liveDemoUrl && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.liveDemoUrl}
                </p>
              )}
            </div>
          </div>

          {/* Row 8: Cover Image & Fallback Gradient Customizer */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-obsidian-950 border border-slate-200 dark:border-white/10 space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Cover Image URL{' '}
                <span className="text-slate-400 font-normal lowercase">(optional — uses fallback gradient if empty)</span>
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className={`w-full px-3.5 py-2 rounded-xl text-sm bg-white dark:bg-obsidian-900 text-slate-900 dark:text-white border ${
                  errors.imageUrl ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-white/10'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500/40`}
              />
              {errors.imageUrl && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.imageUrl}
                </p>
              )}
            </div>

            {/* Gradient Selector Fallback */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-indigo-500" />
                Select Fallback Cover Gradient:
              </label>
              <div className="flex flex-wrap gap-2">
                {GRADIENT_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setFormData({ ...formData, gradient: preset.class })}
                    className={`h-7 px-3 rounded-lg text-[11px] font-semibold text-white bg-gradient-to-r ${preset.class} transition-all duration-150 flex items-center gap-1 ${
                      formData.gradient === preset.class ? 'ring-2 ring-white scale-105 shadow-md' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {formData.gradient === preset.class && <Check className="w-3 h-3" />}
                    <span>{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Card Header Preview */}
            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-white/10">
              <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block mb-1.5">
                Card Header Live Preview:
              </span>
              <div className="h-20 w-full rounded-xl overflow-hidden relative border border-slate-200 dark:border-white/10">
                {formData.imageUrl ? (
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-r ${formData.gradient} flex items-center justify-center p-2`}>
                    <span className="text-xs font-black tracking-widest text-white/90 uppercase font-mono">
                      {formData.title || 'PROJECT PREVIEW'}
                    </span>
                  </div>
                )}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-md">
                  {formData.category}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-obsidian-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:opacity-95 text-white shadow-lg shadow-indigo-600/30 active:scale-95 transition-all duration-200 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? 'Publishing...' : 'Publish Showcase'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
