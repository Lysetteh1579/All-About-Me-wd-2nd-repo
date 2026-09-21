import React from 'react';
import { GOALS_DATA } from '../data/profileData';
import { CheckCircle2, Clock, CircleDot, ArrowUpRight } from 'lucide-react';

export const GoalsSection: React.FC = () => {
  return (
    <section id="goals" className="py-12 md:py-20 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Roadmap & Progress
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-1">
            Web Development Journey
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-xl">
            Key milestones achieved and future goals in Lysette's coding adventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {GOALS_DATA.map((goal, idx) => {
            const isCompleted = goal.status === 'completed';
            const isInProgress = goal.status === 'in-progress';

            return (
              <div
                key={goal.id}
                id={`goal-card-${goal.id}`}
                className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-amber-300 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                      Phase 0{idx + 1}
                    </span>
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Done
                      </span>
                    )}
                    {isInProgress && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                        <Clock className="w-3 h-3 animate-spin" /> In Progress
                      </span>
                    )}
                    {!isCompleted && !isInProgress && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                        <CircleDot className="w-3 h-3" /> Upcoming
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-stone-900 text-lg leading-snug">
                    {goal.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {goal.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 text-[11px] font-semibold text-amber-800">
                  {goal.timeframe}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
