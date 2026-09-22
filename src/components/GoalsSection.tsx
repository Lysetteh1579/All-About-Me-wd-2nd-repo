import React, { useState, useEffect } from 'react';
import { GOALS_DATA, PROFILE_INFO } from '../data/profileData';
import { GoalItem } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  Target, 
  Plus, 
  Sparkles,
  X,
  TrendingUp,
  Award,
  Briefcase,
  Users,
  ShieldCheck,
  Heart,
  Crown
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Award,
  Sparkles,
  Briefcase,
  Users,
  ShieldCheck,
  TrendingUp,
  Target,
  Heart,
  Crown
};

const LOCAL_STORAGE_GOALS_KEY = 'lysette_portfolio_goals_lash_v1';
const LOCAL_STORAGE_CHECKED_KEY = 'lysette_portfolio_milestones_lash_v1';

export const GoalsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'certification' | 'artistry' | 'business'>('all');
  const [goals, setGoals] = useState<GoalItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_GOALS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return GOALS_DATA;
  });

  const [checkedMilestones, setCheckedMilestones] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CHECKED_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    // initialize all milestones of completed goals as checked
    const initial: Record<string, boolean> = {};
    GOALS_DATA.forEach(goal => {
      if (goal.status === 'completed' && goal.milestones) {
        goal.milestones.forEach((_, idx) => {
          initial[`${goal.id}-${idx}`] = true;
        });
      }
    });
    return initial;
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'certification' | 'artistry' | 'business'>('artistry');
  const [newTimeframe, setNewTimeframe] = useState('');
  const [newStatus, setNewStatus] = useState<'in-progress' | 'upcoming' | 'completed'>('in-progress');
  const [newProgress, setNewProgress] = useState(50);
  const [newDescription, setNewDescription] = useState('');
  const [newMilestonesText, setNewMilestonesText] = useState('');

  // Persist custom goals
  const saveGoalsToStorage = (updated: GoalItem[]) => {
    setGoals(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_GOALS_KEY, JSON.stringify(updated));
    } catch {
      // quota
    }
  };

  const handleToggleMilestone = (goalId: string, milestoneIdx: number) => {
    const key = `${goalId}-${milestoneIdx}`;
    const updated = { ...checkedMilestones, [key]: !checkedMilestones[key] };
    setCheckedMilestones(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_CHECKED_KEY, JSON.stringify(updated));
    } catch {
      // quota
    }
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const milestones = newMilestonesText
      .split('\n')
      .map(m => m.trim())
      .filter(m => m.length > 0);

    const newGoal: GoalItem = {
      id: `custom-goal-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      timeframe: newTimeframe.trim() || 'Upcoming Goal',
      status: newStatus,
      progress: Number(newProgress),
      description: newDescription.trim() || 'Custom goal added to lash technician roadmap.',
      milestones: milestones.length > 0 ? milestones : ['Step 1: Practice and skill perfection', 'Step 2: Client consultation and execution'],
      iconName: newCategory === 'certification' ? 'Award' : newCategory === 'artistry' ? 'Sparkles' : 'Briefcase'
    };

    const updated = [newGoal, ...goals];
    saveGoalsToStorage(updated);

    // Reset modal form
    setNewTitle('');
    setNewTimeframe('');
    setNewDescription('');
    setNewMilestonesText('');
    setNewProgress(50);
    setShowAddModal(false);
  };

  const handleResetDefaultGoals = () => {
    if (window.confirm('Reset goals to default lash technician roadmap?')) {
      setGoals(GOALS_DATA);
      try {
        localStorage.removeItem(LOCAL_STORAGE_GOALS_KEY);
      } catch {
        // ignore
      }
    }
  };

  const filteredGoals = selectedCategory === 'all'
    ? goals
    : goals.filter(g => g.category === selectedCategory);

  const completedCount = 30;
  const inProgressCount = goals.filter(g => g.status === 'in-progress').length;
  const upcomingCount = goals.filter(g => g.status === 'upcoming').length;

  return (
    <section id="goals" className="py-12 md:py-20 border-b border-red-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>Certified Lash Tech & Entrepreneur Roadmap</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
              Lysette's Lash Career & Studio Roadmap
            </h2>
            <p className="text-base sm:text-lg text-stone-600 mt-2 max-w-2xl leading-relaxed">
              Future Certified Lash Tech & Entrepreneur in San Diego, CA — Tracking my professional certifications, lash artistry masteries, client experiences, and salon suite launch.
            </p>
          </div>

          {/* Action to Add New Goal */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowAddModal(true)}
              id="btn-add-new-goal"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Goal</span>
            </button>
          </div>
        </div>

        {/* Goals Metrics / Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="bg-white p-4 rounded-2xl border border-red-100 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-stone-900 leading-none">{goals.length}</p>
              <p className="text-xs text-stone-500 mt-1">Total Goals</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-red-100 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-700 leading-none">{completedCount}</p>
              <p className="text-xs text-stone-500 mt-1">Completed</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-red-100 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-amber-800 leading-none">{inProgressCount}</p>
              <p className="text-xs text-stone-500 mt-1">In Progress</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-red-100 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-rose-700 leading-none">{upcomingCount}</p>
              <p className="text-xs text-stone-500 mt-1">Next Horizons</p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-red-100 pb-3">
          <div className="flex flex-wrap gap-1.5 p-1 bg-red-100/60 rounded-xl border border-red-200" id="goal-category-filters">
            {[
              { key: 'all', label: 'All Lash Goals' },
              { key: 'certification', label: 'Certifications & Safety' },
              { key: 'artistry', label: 'Lash Artistry & Sets' },
              { key: 'business', label: 'Studio & Entrepreneurship' }
            ].map((cat) => (
              <button
                key={cat.key}
                id={`filter-goal-${cat.key}`}
                onClick={() => setSelectedCategory(cat.key as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-white text-red-700 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {goals.length !== GOALS_DATA.length && (
            <button
              onClick={handleResetDefaultGoals}
              className="text-xs text-stone-500 hover:text-red-700 underline underline-offset-2"
            >
              Reset Lash Roadmap
            </button>
          )}
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGoals.map((goal, idx) => {
            const Icon = iconMap[goal.iconName || 'Target'] || Target;
            const isCompleted = goal.status === 'completed';
            const isInProgress = goal.status === 'in-progress';

            const categoryLabel = goal.category === 'certification'
              ? 'Certifications & Safety'
              : goal.category === 'artistry'
              ? 'Lash Artistry'
              : 'Studio & Business';

            return (
              <div
                key={goal.id}
                id={`goal-card-${goal.id}`}
                className="bg-white p-6 rounded-3xl border border-red-100 shadow-xs hover:border-red-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  {/* Card Top: Category Icon + Status Pill */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>

                    {isCompleted && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Achieved
                      </span>
                    )}
                    {isInProgress && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                        <Clock className="w-3.5 h-3.5 animate-spin" /> In Progress
                      </span>
                    )}
                    {!isCompleted && !isInProgress && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                        <Target className="w-3.5 h-3.5" /> Next Up
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-red-500 block mb-1">
                      {categoryLabel} &bull; Goal 0{idx + 1}
                    </span>
                    <h3 className="font-bold text-stone-900 text-xl leading-snug">
                      {goal.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                      {goal.description}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
                      <span>Milestone Progress</span>
                      <span className="text-stone-800 font-bold">{goal.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCompleted
                            ? 'bg-emerald-500'
                            : isInProgress
                            ? 'bg-amber-500'
                            : 'bg-red-400'
                        }`}
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Milestones Checklist */}
                  {goal.milestones && goal.milestones.length > 0 && (
                    <div className="pt-2 border-t border-stone-100 space-y-2">
                      <p className="text-xs font-bold text-stone-700">Action Milestones:</p>
                      <div className="space-y-1.5">
                        {goal.milestones.map((m, mIdx) => {
                          const isDone = isCompleted || checkedMilestones[`${goal.id}-${mIdx}`];
                          return (
                            <label
                              key={mIdx}
                              className="flex items-start gap-2 text-xs text-stone-600 hover:text-stone-900 cursor-pointer select-none"
                            >
                              <input
                                type="checkbox"
                                checked={!!isDone}
                                onChange={() => handleToggleMilestone(goal.id, mIdx)}
                                className="mt-0.5 rounded text-red-600 focus:ring-red-400 cursor-pointer"
                              />
                              <span className={isDone ? 'line-through text-stone-400' : ''}>
                                {m}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer: Timeframe */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-400">Target Timeframe:</span>
                  <span className="font-bold text-red-700">{goal.timeframe}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Motivational Callout Banner */}
        <div className="p-6 rounded-3xl bg-white border border-red-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-lg sm:text-xl">
                Lash Artistry & Entrepreneurial Vision
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl leading-relaxed">
                Dedicated to continuous education, clinical sanitation standards, and empowering clients to feel confident and radiant. From state certifications to launching my own salon suite, every milestone brings me closer to running a premier beauty brand in San Diego.
              </p>
            </div>
          </div>

          <a
            href={`mailto:${PROFILE_INFO.email}?subject=Lash%20Artistry%20Inquiry`}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors shadow-xs"
          >
            Connect & Inquiries
          </a>
        </div>

      </div>

      {/* Add Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-red-100 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">Add a New Lash Goal</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Goal Title *
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Master Mega Volume Hand-Crafted Fans"
                  required
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-red-400 bg-white"
                  >
                    <option value="certification">Certifications & Licensing</option>
                    <option value="artistry">Lash Artistry & Sets</option>
                    <option value="business">Studio & Entrepreneurship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Timeframe
                  </label>
                  <input
                    type="text"
                    value={newTimeframe}
                    onChange={(e) => setNewTimeframe(e.target.value)}
                    placeholder="e.g. Next Month / Fall 2026"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-red-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-red-400 bg-white"
                  >
                    <option value="in-progress">In Progress</option>
                    <option value="upcoming">Upcoming / Next Up</option>
                    <option value="completed">Completed / Achieved</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Progress ({newProgress}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={newProgress}
                    onChange={(e) => setNewProgress(Number(e.target.value))}
                    className="w-full mt-2 accent-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={2}
                  placeholder="Describe your lash technique or business objective..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Milestones (1 per line)
                </label>
                <textarea
                  value={newMilestonesText}
                  onChange={(e) => setNewMilestonesText(e.target.value)}
                  rows={3}
                  placeholder={"Phase 1: Practice on mannequin & sponges\nPhase 2: Live model set with timer\nPhase 3: Retention check & photo documentation"}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-sm"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
