import React, { useState, useEffect } from 'react';
import { INITIAL_GUESTBOOK } from '../data/profileData';
import { MessageSquare, Send, User, Sparkles, Heart } from 'lucide-react';

interface GuestNote {
  id: string;
  name: string;
  message: string;
  badge: string;
  timestamp: string;
}

const STORAGE_KEY = 'lysette_all_about_me_guestbook';

export const Guestbook: React.FC = () => {
  const [entries, setEntries] = useState<GuestNote[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // Ignore error
    }
    return INITIAL_GUESTBOOK;
  });

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [badge, setBadge] = useState('Friend');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (e) {
      // Storage full or unavailable
    }
  }, [entries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newNote: GuestNote = {
      id: `note-${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      badge,
      timestamp: 'Just now'
    };

    setEntries([newNote, ...entries]);
    setName('');
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="guestbook" className="py-12 md:py-20 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Visitor Board
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-1">
            Leave a Note for <span className="font-cursive text-red-600 font-bold text-3xl sm:text-5xl">Lysette</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-xl">
            Visiting from class or checking out my repository? Drop a quick greeting or feedback below!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Note Input Form */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-700" />
              <span>Write in the Guestbook</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Name or Handle
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jessica or CodingBuddy"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-stone-50/50"
                  id="guestbook-name-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Who are you?
                </label>
                <select
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-stone-50/50 text-stone-800"
                  id="guestbook-role-select"
                >
                  <option value="Classmate">Classmate / Peer</option>
                  <option value="Teacher">Teacher / Instructor</option>
                  <option value="Friend">Friend / Family</option>
                  <option value="Developer">Fellow Web Dev</option>
                  <option value="Visitor">Curious Visitor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Message
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave some encouragement, feedback, or a friendly hello!"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-stone-50/50 resize-none"
                  id="guestbook-msg-input"
                />
              </div>

              <button
                type="submit"
                id="guestbook-submit-btn"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-amber-800 hover:bg-amber-900 transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Note</span>
              </button>

              {submitted && (
                <p className="text-xs text-emerald-700 font-semibold text-center animate-fadeIn">
                  ✨ Thank you! Your note has been added to the board.
                </p>
              )}
            </form>
          </div>

          {/* Notes Feed */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-stone-500 pb-1">
              <span>Recent Notes ({entries.length})</span>
              <span>Saved in Browser</span>
            </div>

            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1" id="guestbook-notes-feed">
              {entries.map((item) => (
                <div
                  key={item.id}
                  id={`note-card-${item.id}`}
                  className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-xs space-y-2 hover:border-amber-200 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-bold text-stone-900 text-sm">{item.name}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                        {item.badge}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-400">{item.timestamp}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pl-9">
                    "{item.message}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
