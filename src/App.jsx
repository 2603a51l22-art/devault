import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import ProjectCard from './components/ProjectCard';
import ProjectDetailModal from './components/ProjectDetailModal';
import SubmitProjectModal from './components/SubmitProjectModal';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { INITIAL_PROJECTS, CATEGORIES } from './data/initialProjects';
import { SearchX, Sparkles, FolderSearch2, RefreshCw } from 'lucide-react';

const STORAGE_KEYS = {
  PROJECTS: 'devvault_projects_v1',
  UPVOTED: 'devvault_upvoted_v1',
  BOOKMARKED: 'devvault_bookmarked_v1',
  THEME: 'devvault_theme_v1',
};

export default function App() {
  // --- Persistent State Initialization ---
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed reading projects from localStorage', e);
    }
    return INITIAL_PROJECTS;
  });

  const [upvotedIds, setUpvotedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.UPVOTED);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed reading upvotes from localStorage', e);
    }
    return [];
  });

  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKED);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed reading bookmarks from localStorage', e);
    }
    return [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved !== null) return JSON.parse(saved);
    } catch (e) {}
    return true; // Default dark mode
  });

  // --- UI & Filter State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showOnlySaved, setShowOnlySaved] = useState(false);

  // Modals
  const [selectedProject, setSelectedProject] = useState(null);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Toast Dispatcher
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --- Sync State to LocalStorage ---
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed writing projects to localStorage', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.UPVOTED, JSON.stringify(upvotedIds));
    } catch (e) {
      console.error('Failed writing upvoted to localStorage', e);
    }
  }, [upvotedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKED, JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error('Failed writing bookmarks to localStorage', e);
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(darkMode));
    } catch (e) {}

    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [darkMode]);

  // --- Handlers ---
  const handleToggleUpvote = (projectId) => {
    const hasUpvoted = upvotedIds.includes(projectId);
    let newUpvoted;
    let delta;

    if (hasUpvoted) {
      newUpvoted = upvotedIds.filter((id) => id !== projectId);
      delta = -1;
      showToast('Removed upvote', 'info');
    } else {
      newUpvoted = [...upvotedIds, projectId];
      delta = 1;
      showToast('Project upvoted! 🔥', 'success');
    }

    setUpvotedIds(newUpvoted);
    setProjects((prev) =>
      prev.map((proj) =>
        proj.id === projectId ? { ...proj, upvotes: Math.max(0, proj.upvotes + delta) } : proj
      )
    );

    // Also update selectedProject if currently viewing modal
    if (selectedProject && selectedProject.id === projectId) {
      setSelectedProject((prev) => ({
        ...prev,
        upvotes: Math.max(0, prev.upvotes + delta),
      }));
    }
  };

  const handleToggleBookmark = (projectId) => {
    const isBookmarked = bookmarkedIds.includes(projectId);
    let newBookmarks;
    if (isBookmarked) {
      newBookmarks = bookmarkedIds.filter((id) => id !== projectId);
      showToast('Removed from saved bookmarks', 'info');
    } else {
      newBookmarks = [...bookmarkedIds, projectId];
      showToast('Project saved to bookmarks! ⭐', 'success');
    }
    setBookmarkedIds(newBookmarks);
  };

  const handleSubmitProject = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
    showToast(`"${newProject.title}" has been published! 🎉`, 'success');
    // Select project to view immediately
    setSelectedProject(newProject);
  };

  const handleResetDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.UPVOTED);
    localStorage.removeItem(STORAGE_KEYS.BOOKMARKED);
    setProjects(INITIAL_PROJECTS);
    setUpvotedIds([]);
    setBookmarkedIds([]);
    setSelectedCategory('All');
    setSelectedTag('');
    setSearchQuery('');
    setShowOnlySaved(false);
    showToast('Demo data restored to defaults! 🔄', 'info');
  };

  const handleShare = (project) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${project.title} - ${project.tagline}\nExplore on DevVault: ${window.location.origin}`
      );
      showToast('Share link copied to clipboard! 📋', 'success');
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedTag('');
    setSearchQuery('');
    setSortBy('featured');
    setShowOnlySaved(false);
  };

  // --- Filtering & Sorting Logic ---
  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return projects
      .filter((project) => {
        // Saved/Bookmarked filter
        if (showOnlySaved && !bookmarkedIds.includes(project.id)) {
          return false;
        }

        // Category filter
        if (selectedCategory !== 'All' && project.category !== selectedCategory) {
          return false;
        }

        // Popular tag filter
        if (selectedTag && !project.techStack.some((t) => t.toLowerCase() === selectedTag.toLowerCase())) {
          return false;
        }

        // Search query filter (matches title, tagline, description, author, tech stack)
        if (query) {
          const matchTitle = project.title.toLowerCase().includes(query);
          const matchTagline = project.tagline.toLowerCase().includes(query);
          const matchDesc = project.description.toLowerCase().includes(query);
          const matchAuthor = project.author?.name?.toLowerCase().includes(query);
          const matchStack = project.techStack.some((tech) => tech.toLowerCase().includes(query));

          if (!matchTitle && !matchTagline && !matchDesc && !matchAuthor && !matchStack) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.upvotes || 0) - (a.upvotes || 0);
        }
        if (sortBy === 'newest') {
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        }
        if (sortBy === 'upvotes') {
          return (b.upvotes || 0) - (a.upvotes || 0);
        }
        if (sortBy === 'alpha') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [projects, searchQuery, selectedCategory, selectedTag, sortBy, showOnlySaved, bookmarkedIds]);

  // Live Category Counts Calculation
  const categoryCounts = useMemo(() => {
    const counts = { All: projects.length, Bookmarked: bookmarkedIds.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = projects.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, [projects, bookmarkedIds]);

  const totalUpvotes = useMemo(() => {
    return projects.reduce((acc, curr) => acc + (curr.upvotes || 0), 0);
  }, [projects]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-obsidian-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Glassmorphic Navigation */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        savedCount={bookmarkedIds.length}
        showOnlySaved={showOnlySaved}
        setShowOnlySaved={setShowOnlySaved}
      />

      {/* Hero Showcase Section */}
      <Hero
        totalProjects={projects.length}
        totalCategories={CATEGORIES.length - 1}
        totalUpvotes={totalUpvotes}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Pills & Sort Bar */}
        <FilterBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categoryCounts={categoryCounts}
          totalMatching={filteredProjects.length}
          searchQuery={searchQuery}
          selectedTag={selectedTag}
          showOnlySaved={showOnlySaved}
          setShowOnlySaved={setShowOnlySaved}
          onResetFilters={handleResetFilters}
        />

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelectProject={(proj) => setSelectedProject(proj)}
                onToggleUpvote={handleToggleUpvote}
                isUpvoted={upvotedIds.includes(project.id)}
                onToggleBookmark={handleToggleBookmark}
                isBookmarked={bookmarkedIds.includes(project.id)}
                onTagClick={(tag) => setSelectedTag(tag)}
              />
            ))}
          </div>
        ) : (
          /* Empty State Illustration */
          <div className="py-16 sm:py-24 text-center max-w-md mx-auto p-8 rounded-3xl bg-white/50 dark:bg-obsidian-800/40 border border-slate-200 dark:border-white/5 backdrop-blur-md animate-scale-in">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 mx-auto flex items-center justify-center mb-4">
              <FolderSearch2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              No matching projects found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              We couldn't find any projects matching your current filters or search query. Try clearing filters or submit a new project!
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-200 dark:bg-obsidian-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-obsidian-600 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
              <button
                onClick={() => setIsSubmitOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Submit One</span>
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Modals */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onToggleUpvote={handleToggleUpvote}
          isUpvoted={upvotedIds.includes(selectedProject.id)}
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={bookmarkedIds.includes(selectedProject.id)}
          onShare={handleShare}
        />
      )}

      <SubmitProjectModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onSubmitProject={handleSubmitProject}
      />

      {/* Floating Toast Feedback Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Footer */}
      <Footer onResetData={handleResetDemoData} />

    </div>
  );
}
