import React from 'react';
import { PROFILE_INFO } from '../data/profileData';
import { GitBranch, Mail, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-stone-200 py-12 text-stone-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-cursive font-bold text-red-600 text-2xl tracking-wide">
              {PROFILE_INFO.name}
            </h3>
            <p className="text-xs text-stone-500">
              Web Development Course Project &bull; Repository: <span className="text-stone-700">All-About-Me-wd-2nd-repo</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            <a
              href={`https://github.com/${PROFILE_INFO.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-stone-700 hover:text-red-700 transition-colors"
            >
              <GitBranch className="w-4 h-4" />
              <span>GitHub Profile</span>
            </a>

            <a
              href={`mailto:${PROFILE_INFO.email}`}
              className="inline-flex items-center gap-1.5 text-stone-700 hover:text-red-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>{PROFILE_INFO.email}</span>
            </a>

            <button
              onClick={scrollToTop}
              id="footer-back-to-top-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <p>
            Designed & crafted for Web Development Class &copy; {new Date().getFullYear()} <span className="font-cursive text-red-600 font-bold text-base">Lysette Hernandez</span>.
          </p>
          <p className="flex items-center gap-1">
            Built with HTML5, CSS3, React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
