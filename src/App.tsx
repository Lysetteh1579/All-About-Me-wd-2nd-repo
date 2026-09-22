import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AboutHero } from './components/AboutHero';
import { GoalsSection } from './components/GoalsSection';
import { FavoritesSection } from './components/FavoritesSection';
import { PhotosSection } from './components/PhotosSection';
import { MediaSection } from './components/MediaSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'goals', 'favorites', 'photos', 'media'];
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
        <GoalsSection />
        <FavoritesSection />
        <PhotosSection />
        <MediaSection />
      </main>

      <Footer />
    </div>
  );
};

export default App;
