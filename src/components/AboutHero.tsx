import React, { useState } from 'react';
import { Sparkles, MapPin, Heart, ArrowRight, Quote, Code } from 'lucide-react';
import { PROFILE_INFO } from '../data/profileData';
import { PhotoUploader } from './PhotoUploader';

const INSPIRATIONAL_QUOTES = [
  { text: "Every great developer you know started out by solving small problems one line of code at a time.", author: "Web Dev Wisdom" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Good design is as little design as possible.", author: "Dieter Rams" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" }
];

export const AboutHero: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [likes, setLikes] = useState(12);
  const [hasLiked, setHasLiked] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(() => {
    try {
      return localStorage.getItem('lysette_inserted_profile_picture');
    } catch {
      return null;
    }
  });

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % INSPIRATIONAL_QUOTES.length);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  return (
    <section id="about" className="py-12 md:py-20 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{PROFILE_INFO.status}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-5">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight inline-flex items-center flex-wrap gap-2 sm:gap-3">
                <span>Hi there! I'm</span>
                <span className="font-cursive text-red-600 text-4xl sm:text-6xl font-bold inline-block underline decoration-red-300 decoration-3 underline-offset-8">
                  Lysette
                </span>
              </h1>

              {/* Photo Box right next to Lysette's name where picture can be inserted */}
              <div className="inline-flex items-center">
                <PhotoUploader onPhotoChange={setUserPhoto} size="xl" />
              </div>
            </div>

            <p className="text-lg sm:text-xl font-medium text-stone-700 leading-relaxed max-w-2xl">
              {PROFILE_INFO.tagline}
            </p>

            <div className="p-5 sm:p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <p className="text-stone-700 leading-relaxed text-base">
                {PROFILE_INFO.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-medium text-stone-600 border-t border-stone-100">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  {PROFILE_INFO.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-amber-700" />
                  Web Dev Course — 2nd Repo Project
                </span>
              </div>
            </div>

            {/* Metric / Highlights Bento Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PROFILE_INFO.highlights.map((item, idx) => (
                <div 
                  key={idx} 
                  id={`hero-highlight-${idx}`}
                  className="bg-white p-4 rounded-xl border border-stone-200 hover:border-amber-300 transition-colors"
                >
                  <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm sm:text-base font-bold text-stone-900 mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Side Interactive Profile Card */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-3xl font-cursive font-bold shadow-inner overflow-hidden relative">
                  {userPhoto ? (
                    <img src={userPhoto} alt="Lysette Hernandez" className="w-full h-full object-cover" />
                  ) : (
                    "LH"
                  )}
                </div>
                <div>
                  <h3 className="font-cursive font-bold text-red-600 text-2xl tracking-wide">Lysette Hernandez</h3>
                  <p className="text-xs text-stone-500">@{PROFILE_INFO.githubUsername}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Active in Web Dev</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-600">
                  <span className="flex items-center gap-1.5">
                    <Quote className="w-3.5 h-3.5 text-amber-700" />
                    Daily Coding Thought
                  </span>
                  <button 
                    onClick={handleNextQuote}
                    className="text-amber-800 hover:text-amber-900 underline text-[11px]"
                    id="shuffle-quote-btn"
                  >
                    Shuffle
                  </button>
                </div>
                <p className="text-xs text-stone-700 italic leading-relaxed">
                  "{INSPIRATIONAL_QUOTES[quoteIndex].text}"
                </p>
                <p className="text-[11px] text-stone-500 text-right font-medium">
                  — {INSPIRATIONAL_QUOTES[quoteIndex].author}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                <button
                  id="give-kudos-btn"
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    hasLiked 
                      ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{hasLiked ? 'Kudos Sent!' : 'Send Kudos'} ({likes})</span>
                </button>

                <a
                  href="#skills"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 hover:text-amber-900"
                >
                  <span>Explore Skills</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Class Badge */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1.5">
              <p className="font-bold flex items-center gap-1.5 text-amber-900">
                <span>📚</span> Web Development 2nd Repository
              </p>
              <p className="text-amber-800/90 leading-normal">
                This project represents my ongoing progress in modern semantic web development, structured layouts, and interactive UI logic.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
