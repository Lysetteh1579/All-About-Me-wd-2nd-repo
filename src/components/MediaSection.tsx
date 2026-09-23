import React, { useState, useEffect, useRef } from 'react';
import { DEFAULT_MEDIA, BRYSON_TILLER_ALBUM_COVER } from '../data/profileData';
import { MediaItem } from '../types';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Music, 
  Video, 
  Radio, 
  BookOpen, 
  Plus, 
  Heart, 
  ExternalLink, 
  Sparkles, 
  X, 
  Trash2, 
  Disc3,
  Layers,
  Headphones,
  Check
} from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const STORAGE_MEDIA_KEY = 'lysette_portfolio_media_items_v7';
const STORAGE_MEDIA_LIKES_KEY = 'lysette_portfolio_media_likes_v7';

export const MediaSection: React.FC = () => {
  const [mediaList, setMediaList] = useState<MediaItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_MEDIA_KEY);
      if (saved) {
        const parsed: MediaItem[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_MEDIA;
  });

  const [likedMap, setLikedMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_MEDIA_LIKES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {};
  });

  const [selectedType, setSelectedType] = useState<string>('all');

  // Interactive Audio Player State
  const musicTracks = mediaList.filter(m => m.type === 'music');
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(225); // default fallback ~3:45
  const [volume, setVolume] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Add Media Modal state
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCreator, setNewCreator] = useState<string>('');
  const [newType, setNewType] = useState<'music' | 'video' | 'podcast' | 'article'>('music');
  const [newCoverUrl, setNewCoverUrl] = useState<string>('');
  const [newMediaUrl, setNewMediaUrl] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newDuration, setNewDuration] = useState<string>('');
  const [newTag, setNewTag] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  const activeTrack = musicTracks[currentTrackIndex] || musicTracks[0] || null;

  // Persist media
  const saveMediaList = (items: MediaItem[]) => {
    setMediaList(items);
    try {
      localStorage.setItem(STORAGE_MEDIA_KEY, JSON.stringify(items));
    } catch {
      // quota
    }
  };

  // Audio Playback Handlers
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && audio.duration !== Infinity) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      // Next track loop
      if (musicTracks.length > 0) {
        setCurrentTrackIndex((prev) => (prev + 1) % musicTracks.length);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [musicTracks]);

  // Load and play track when currentTrackIndex changes
  useEffect(() => {
    if (!audioRef.current || !activeTrack) return;
    const audio = audioRef.current;

    if (activeTrack.mediaUrl) {
      audio.src = activeTrack.mediaUrl;
      audio.volume = isMuted ? 0 : volume;
      if (isPlaying) {
        audio.play().catch(() => {
          // auto-play prevented by browser policy until user interacts
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrackIndex, activeTrack?.id]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (!audio.src && activeTrack?.mediaUrl) {
        audio.src = activeTrack.mediaUrl;
      }
      audio.volume = isMuted ? 0 : volume;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio play notice:', err);
        setIsPlaying(true); // show playing visualizer
      });
    }
  };

  const handleNextTrack = () => {
    if (musicTracks.length === 0) return;
    setCurrentTrackIndex((prev) => (prev + 1) % musicTracks.length);
  };

  const handlePrevTrack = () => {
    if (musicTracks.length === 0) return;
    setCurrentTrackIndex((prev) => (prev - 1 + musicTracks.length) % musicTracks.length);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    if (val === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume > 0 ? volume : 0.5;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const playSpecificTrack = (trackId: string) => {
    const idx = musicTracks.findIndex(t => t.id === trackId);
    if (idx !== -1) {
      setCurrentTrackIndex(idx);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = musicTracks[idx].mediaUrl || '';
        audioRef.current.play().catch(() => {});
      }
    }
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Like Toggle
  const handleToggleLike = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    const isCurrentlyLiked = !!likedMap[itemId];
    const newLikedMap = { ...likedMap, [itemId]: !isCurrentlyLiked };
    setLikedMap(newLikedMap);
    try {
      localStorage.setItem(STORAGE_MEDIA_LIKES_KEY, JSON.stringify(newLikedMap));
    } catch {
      // quota
    }

    const updated = mediaList.map(m => {
      if (m.id === itemId) {
        return {
          ...m,
          likes: isCurrentlyLiked ? Math.max(0, m.likes - 1) : m.likes + 1
        };
      }
      return m;
    });
    saveMediaList(updated);
  };

  // Delete item
  const handleDeleteItem = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    if (window.confirm('Remove this media item from your collection?')) {
      const updated = mediaList.filter(m => m.id !== itemId);
      saveMediaList(updated);
    }
  };

  // Reset to defaults
  const handleResetDefaults = () => {
    if (window.confirm('Reset media collection to default recommendations?')) {
      setMediaList(DEFAULT_MEDIA);
      try {
        localStorage.removeItem(STORAGE_MEDIA_KEY);
      } catch {
        // ignore
      }
    }
  };

  // Add Item Submit
  const handleAddMediaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setFormError('Please provide a title.');
      return;
    }

    const defaultCovers: Record<string, string> = {
      music: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      video: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80',
      podcast: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
      article: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80'
    };

    const newItem: MediaItem = {
      id: `custom-media-${Date.now()}`,
      title: newTitle.trim(),
      creator: newCreator.trim() || 'Lysette Recommendation',
      type: newType,
      coverUrl: newCoverUrl.trim() || defaultCovers[newType],
      mediaUrl: newMediaUrl.trim() || undefined,
      description: newDescription.trim() || 'A personal recommendation added to the media library.',
      duration: newDuration.trim() || (newType === 'music' ? '3:30' : newType === 'article' ? '5 min read' : '20 min'),
      tag: newTag.trim() || (newType === 'music' ? 'Playlist' : newType === 'video' ? 'Video' : newType === 'podcast' ? 'Podcast' : 'Reading'),
      likes: 1,
      isCustom: true
    };

    const updated = [newItem, ...mediaList];
    saveMediaList(updated);

    // Reset
    setNewTitle('');
    setNewCreator('');
    setNewCoverUrl('');
    setNewMediaUrl('');
    setNewDescription('');
    setNewDuration('');
    setNewTag('');
    setFormError('');
    setShowAddModal(false);
  };

  const filteredMedia = selectedType === 'all'
    ? mediaList
    : mediaList.filter(m => m.type === selectedType);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'music':
        return Music;
      case 'video':
        return Video;
      case 'podcast':
        return Radio;
      case 'article':
        return BookOpen;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="media" className="py-12 md:py-20 border-b border-red-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold mb-2">
              <Headphones className="w-3.5 h-3.5 text-red-600" />
              <span>Soundtracks, Talks & Inspiration</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
              <span className="font-cursive text-red-600 font-bold text-4xl sm:text-6xl mr-2">Lysette's</span> 
              Media Hub
            </h2>
            <p className="text-base sm:text-lg text-stone-600 mt-2 max-w-2xl leading-relaxed">
              Featuring favorite R&B records by Bryson Tiller, Drake, Jeremih, and PARTYNEXTDOOR with full streaming audio player controls and track discovery.
            </p>
          </div>

          {/* Action to Add New Media */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              id="btn-add-media"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Media</span>
            </button>
          </div>
        </div>

        {/* Interactive Music Player Card */}
        {activeTrack && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-red-200 shadow-md relative overflow-hidden">
            {/* Background ambient gradient accent */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-100/50 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 sm:gap-8 justify-between">
              
              {/* Left: Album Art & Track Info */}
              <div className="flex items-center gap-5 w-full lg:w-auto">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 shadow-md border-2 border-white">
                  <img
                    src={activeTrack.coverUrl}
                    alt={activeTrack.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isPlaying ? 'scale-105 rotate-1' : ''
                    }`}
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Disc3 className={`w-8 h-8 text-white/90 ${isPlaying ? 'animate-spin' : ''}`} />
                  </div>
                </div>

                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                      Now Streaming
                    </span>
                    {isPlaying && (
                      <div className="flex items-end gap-0.5 h-3">
                        <span className="w-1 h-3 bg-red-500 animate-pulse rounded-full" />
                        <span className="w-1 h-2 bg-red-600 animate-pulse rounded-full delay-75" />
                        <span className="w-1 h-3.5 bg-red-700 animate-pulse rounded-full delay-150" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900 truncate">
                    {activeTrack.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 truncate">
                    {activeTrack.creator} &bull; {activeTrack.tag || 'Coding Track'}
                  </p>
                  <a
                    href="https://www.instagram.com/lysette.hernandez"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors pt-0.5"
                  >
                    <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />
                    <span>@lysette.hernandez</span>
                  </a>
                </div>
              </div>

              {/* Center: Controls & Seekbar */}
              <div className="w-full lg:max-w-md space-y-2 flex flex-col items-center">
                {/* Buttons */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePrevTrack}
                    className="p-2 text-stone-600 hover:text-red-600 transition-colors"
                    title="Previous track"
                    aria-label="Previous track"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>

                  <button
                    onClick={togglePlayPause}
                    id="btn-play-pause-track"
                    className="w-12 h-12 rounded-2xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-md hover:scale-105 transition-all"
                    title={isPlaying ? 'Pause' : 'Play'}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 fill-current" />
                    ) : (
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={handleNextTrack}
                    className="p-2 text-stone-600 hover:text-red-600 transition-colors"
                    title="Next track"
                    aria-label="Next track"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress bar */}
                <div className="w-full flex items-center gap-3 text-xs text-stone-500">
                  <span className="w-8 text-right font-mono">{formatSeconds(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 accent-red-600 cursor-pointer h-1.5 bg-stone-200 rounded-full"
                  />
                  <span className="w-8 font-mono">{formatSeconds(duration)}</span>
                </div>
              </div>

              {/* Right: Volume & Track Selector Dropdown */}
              <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="p-1.5 text-stone-500 hover:text-stone-800"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-rose-500" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 sm:w-20 accent-red-600 cursor-pointer h-1.5 bg-stone-200 rounded-full"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-stone-500 hidden sm:inline">Track</span>
                  <select
                    value={activeTrack.id}
                    onChange={(e) => playSpecificTrack(e.target.value)}
                    className="text-xs font-semibold bg-red-50 text-red-800 border border-red-200 rounded-xl px-2.5 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-red-400"
                  >
                    {musicTracks.map((track, i) => (
                      <option key={track.id} value={track.id}>
                        {i + 1}. {track.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* Instagram Bar Under the Music Playing */}
            <div className="relative z-10 mt-5 pt-4 border-t border-red-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="text-stone-500 font-medium">Follow Lysette on Instagram:</span>
                <a
                  href="https://www.instagram.com/lysette.hernandez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 text-white font-bold text-xs shadow-xs hover:shadow-md hover:scale-105 transition-all"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>@lysette.hernandez</span>
                  <ExternalLink className="w-3 h-3 opacity-90" />
                </a>
              </div>
              <span className="text-stone-400 text-[11px] font-medium hidden sm:inline">
                Connect for playlists, web dev & creative updates
              </span>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-red-100 pb-3">
          <div className="flex flex-wrap gap-1.5 p-1 bg-red-100/60 rounded-2xl border border-red-200" id="media-category-filters">
            {[
              { key: 'all', label: 'All Media', icon: Layers },
              { key: 'music', label: 'Music & Playlists', icon: Music },
              { key: 'video', label: 'Videos & Talks', icon: Video },
              { key: 'podcast', label: 'Podcasts', icon: Radio },
              { key: 'article', label: 'Articles & Reads', icon: BookOpen }
            ].map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.key}
                  id={`filter-media-${cat.key}`}
                  onClick={() => setSelectedType(cat.key)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    selectedType === cat.key
                      ? 'bg-white text-red-700 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-xs text-stone-500">
            <span>Showing {filteredMedia.length} {filteredMedia.length === 1 ? 'item' : 'items'}</span>
            {mediaList.length !== DEFAULT_MEDIA.length && (
              <button
                onClick={handleResetDefaults}
                className="text-red-600 hover:text-red-800 underline underline-offset-2"
              >
                Reset Default Media
              </button>
            )}
          </div>
        </div>

        {/* Media Items Grid */}
        {filteredMedia.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-red-100 shadow-xs max-w-lg mx-auto">
            <Music className="w-12 h-12 text-red-400 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-stone-900 mb-1">No items in this category</h4>
            <p className="text-sm text-stone-600 mb-4">
              Explore Lysette's favorite R&B records or add a new recommendation above!
            </p>
            <button
              onClick={() => setSelectedType('all')}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
            >
              View All Tracks
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="media-grid">
          {filteredMedia.map((item) => {
            const TypeIcon = getTypeIcon(item.type);
            const isLiked = !!likedMap[item.id];
            const isCurrentPlayingMusic = item.type === 'music' && activeTrack?.id === item.id && isPlaying;

            return (
              <div
                key={item.id}
                id={`media-card-${item.id}`}
                className="group bg-white rounded-3xl overflow-hidden border border-red-100 hover:border-red-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Image & Type Badge */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.coverUrl}
                    alt={item.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Type Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-red-700 shadow-xs text-[11px] font-bold uppercase tracking-wider border border-red-100">
                    <TypeIcon className="w-3 h-3 text-red-600" />
                    <span>{item.type}</span>
                  </div>

                  {/* Duration Pill */}
                  {item.duration && (
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white/90">
                        {item.duration}
                      </span>
                    </div>
                  )}

                  {/* Like Button */}
                  <button
                    onClick={(e) => handleToggleLike(e, item.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-xs transition-transform active:scale-90 ${
                      isLiked 
                        ? 'bg-red-600 text-white' 
                        : 'bg-white/90 text-stone-700 hover:text-red-600'
                    }`}
                    title={isLiked ? 'Unlike' : 'Like'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>

                  {/* Play Overlay if Music */}
                  {item.type === 'music' && (
                    <button
                      onClick={() => playSpecificTrack(item.id)}
                      className={`absolute bottom-3 right-3 p-2.5 rounded-full text-white shadow-md transition-transform hover:scale-110 ${
                        isCurrentPlayingMusic ? 'bg-red-600 animate-bounce' : 'bg-red-600/90 hover:bg-red-600'
                      }`}
                      title="Play in music player"
                    >
                      {isCurrentPlayingMusic ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {item.tag && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 block mb-1">
                        {item.tag}
                      </span>
                    )}
                    <h4 className="font-bold text-stone-900 text-base leading-snug line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-xs font-semibold text-stone-500 mt-1">
                      {item.creator}
                    </p>
                    <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer Card Row */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-stone-700">
                      <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                      <span>{item.likes}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.mediaUrl && (
                        <a
                          href={item.mediaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-bold transition-colors text-[11px]"
                          title="Open Link"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      {item.isCustom && (
                        <button
                          onClick={(e) => handleDeleteItem(e, item.id)}
                          className="p-1 rounded-md text-stone-400 hover:text-rose-600 hover:bg-rose-50"
                          title="Delete recommendation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

        {/* Media Inspiration Quote Banner */}
        <div className="p-6 rounded-3xl bg-white border border-red-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-base sm:text-lg">
                Soundtracks Shape Great Code & Thoughtful Design
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5 max-w-xl">
                Music and thoughtful podcasts keep creative momentum high. Got a song or video recommendation? Add it to the collection above!
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-stone-900 hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors shadow-xs"
          >
            Recommend a Track
          </button>
        </div>

      </div>

      {/* Add Media Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-red-100 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">Add Media Recommendation</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMediaSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Coffee & Lo-Fi Coding Beats"
                  required
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Creator / Artist / Host
                  </label>
                  <input
                    type="text"
                    value={newCreator}
                    onChange={(e) => setNewCreator(e.target.value)}
                    placeholder="e.g. Chillhop Music"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-red-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Media Category
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-red-400 bg-white"
                  >
                    <option value="music">Music & Playlist</option>
                    <option value="video">Video & Tech Talk</option>
                    <option value="podcast">Podcast</option>
                    <option value="article">Article & Reading</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Duration / Length
                  </label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    placeholder="e.g. 3:45 or 15 min"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-red-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Tag / Label
                  </label>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="e.g. Coding Vibes"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-red-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Media Web Link / Audio Stream URL (Optional)
                </label>
                <input
                  type="url"
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                  placeholder="https://spotify.com / https://youtube.com / audio.mp3"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Cover Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={newCoverUrl}
                  onChange={(e) => setNewCoverUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Description / Why I love this
                </label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={2}
                  placeholder="Share a quick note on why this track or talk is inspiring..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-red-400"
                />
              </div>

              {formError && (
                <p className="text-xs text-rose-600 font-semibold">{formError}</p>
              )}

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
                  Save Media
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
