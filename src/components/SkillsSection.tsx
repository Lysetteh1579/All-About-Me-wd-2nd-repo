import React, { useState } from 'react';
import { SKILLS_DATA } from '../data/profileData';
import { Code2, Palette, Cpu, GitBranch, Smartphone, Sparkles } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Palette,
  Cpu,
  GitBranch,
  Smartphone,
  Sparkles
};

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'frontend' | 'tools' | 'creative'>('all');

  const filteredSkills = selectedCategory === 'all' 
    ? SKILLS_DATA 
    : SKILLS_DATA.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-12 md:py-20 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Technical & Creative Toolkit
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-1">
              Web Development Skills
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-xl">
              Key technologies, concepts, and responsive design patterns practiced in my web development coursework.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200" id="skill-category-filters">
            {(['all', 'frontend', 'tools', 'creative'] as const).map((cat) => (
              <button
                key={cat}
                id={`filter-${cat}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  selectedCategory === cat
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => {
            const Icon = iconMap[skill.iconName] || Code2;
            return (
              <div
                key={skill.id}
                id={`skill-card-${skill.id}`}
                className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-amber-300 transition-all shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                      {skill.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-stone-900 text-base">{skill.name}</h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">{skill.description}</p>
                  </div>
                </div>

                {/* Level indicator */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-500">Proficiency</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <span
                        key={lvl}
                        className={`w-2.5 h-2.5 rounded-full ${
                          lvl <= skill.level ? 'bg-amber-600' : 'bg-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Web Dev Course Highlight Note */}
        <div className="p-4 sm:p-5 rounded-xl bg-stone-100 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-stone-800">Want to see my code?</p>
            <p className="text-xs text-stone-600 mt-0.5">
              Check out my repository commits and project branches directly on GitHub.
            </p>
          </div>
          <a
            href="https://github.com/Lysetteh1579/All-About-Me-wd-2nd-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold whitespace-nowrap transition-colors"
          >
            Visit GitHub Repo
          </a>
        </div>

      </div>
    </section>
  );
};
