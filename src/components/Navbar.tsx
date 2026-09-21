import React, { useState } from 'react';
import { Sparkles, GitBranch, Mail, Menu, X } from 'lucide-react';
import { PROFILE_INFO } from '../data/profileData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'favorites', label: 'Passions' },
    { id: 'quiz', label: 'Trivia' },
    { id: 'goals', label: 'Journey' },
    { id: 'guestbook', label: 'Guestbook' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fef2f2]/90 backdrop-blur-md border-b border-red-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a 
          href="#about"
          onClick={(e) => { e.preventDefault(); handleLinkClick('about'); }}
          className="flex items-center gap-2 group"
          id="brand-logo-link"
        >
          <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform font-cursive text-base">
            LH
          </div>
          <div className="flex flex-col">
            <span className="font-cursive font-bold text-red-600 leading-tight text-lg sm:text-xl tracking-wide">Lysette Hernandez</span>
            <span className="text-[11px] text-stone-500 hidden sm:inline-block">Web Dev Portfolio</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" id="desktop-navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-100/80 text-amber-900 font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href={`https://github.com/${PROFILE_INFO.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-github-link"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors border border-stone-200"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href={`mailto:${PROFILE_INFO.email}`}
            id="nav-email-button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 transition-colors shadow-xs"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Say Hello</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-red-100 bg-[#fef2f2] px-4 py-3 space-y-1 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-900"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-stone-200 flex items-center gap-2">
            <a
              href={`https://github.com/${PROFILE_INFO.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 text-xs font-semibold text-stone-700 bg-stone-100 rounded-md border border-stone-200"
            >
              GitHub Repo
            </a>
            <a
              href={`mailto:${PROFILE_INFO.email}`}
              className="flex-1 text-center py-2 text-xs font-semibold text-white bg-amber-700 rounded-md"
            >
              Email Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
