import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AboutHero } from './components/AboutHero';
import { SkillsSection } from './components/SkillsSection';
import { FavoritesSection } from './components/FavoritesSection';
import { QuizGame } from './components/QuizGame';
import { GoalsSection } from './components/GoalsSection';
import { Guestbook } from './components/Guestbook';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'favorites', 'quiz', 'goals', 'guestbook'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fef2f2] text-stone-800 flex flex-col selection:bg-red-100 selection:text-red-950">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      
      <main className="flex-1">
        <AboutHero />
        <SkillsSection />
        <FavoritesSection />
        <QuizGame />
        <GoalsSection />
        <Guestbook />
      </main>

      <Footer />
    </div>
  );
};

export default App;
