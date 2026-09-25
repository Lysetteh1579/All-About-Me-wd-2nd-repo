import React, { useState } from 'react';
import { FAVORITES_DATA } from '../data/profileData';
import { Users, Waves, MapPin, ShoppingBag } from 'lucide-react';

export const FavoritesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Passions' },
    { id: 'hobbies', label: 'Hobbies' },
    { id: 'places', label: 'Places' }
  ];

  const displayedItems = activeTab === 'all'
    ? FAVORITES_DATA
    : FAVORITES_DATA.filter((item) => item.category === activeTab);

  return (
    <section id="favorites" className="py-12 md:py-20 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Beyond The Code
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-1">
            Passions, Hobbies & Inspirations
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-xl">
            A look into the things that spark Lysette's curiosity outside the classroom and text editor.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2" id="favorites-filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === cat.id
                  ? 'bg-amber-800 text-white'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              id={`fav-card-${item.id}`}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-100">
                    {item.tag}
                  </span>
                  {item.id === 'fav-shopping' && <ShoppingBag className="w-4 h-4 text-amber-700" />}
                  {item.id === 'fav-going-out' && <MapPin className="w-4 h-4 text-amber-700" />}
                  {item.id === 'fav-friends' && <Users className="w-4 h-4 text-amber-700" />}
                  {item.id === 'fav-beach' && <Waves className="w-4 h-4 text-amber-700" />}
                </div>

                <h3 className="font-bold text-stone-900 text-lg sm:text-xl">{item.title}</h3>
                <p className="text-xs font-semibold text-amber-800">{item.subtitle}</p>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 text-[11px] text-stone-400 font-medium">
                Lysette's Favorites Collection
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
