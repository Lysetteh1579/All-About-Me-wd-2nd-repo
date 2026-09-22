import React, { useState, useEffect, useRef } from 'react';
import { DEFAULT_PHOTOS } from '../data/profileData';
import { PhotoItem } from '../types';
import { 
  Camera, 
  Plus, 
  Heart, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  Link2, 
  MapPin, 
  Calendar, 
  Trash2, 
  Sparkles,
  Layers
} from 'lucide-react';

const STORAGE_PHOTOS_KEY = 'lysette_portfolio_photos_v1';
const STORAGE_LIKES_KEY = 'lysette_portfolio_photo_likes_v1';

export const PhotosSection: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PHOTOS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEFAULT_PHOTOS;
  });

  const [likedMap, setLikedMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LIKES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {};
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIdx, setActiveLightboxIdx] = useState<number | null>(null);

  // Add Photo Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('upload');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [caption, setCaption] = useState<string>('');
  const [category, setCategory] = useState<'coding' | 'creative' | 'campus' | 'moments'>('creative');
  const [location, setLocation] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const savePhotos = (newPhotos: PhotoItem[]) => {
    setPhotos(newPhotos);
    try {
      localStorage.setItem(STORAGE_PHOTOS_KEY, JSON.stringify(newPhotos));
    } catch {
      // quota
    }
  };

  const handleToggleLike = (e: React.MouseEvent, photoId: string) => {
    e.stopPropagation();
    const isCurrentlyLiked = !!likedMap[photoId];
    const newLikedMap = { ...likedMap, [photoId]: !isCurrentlyLiked };
    setLikedMap(newLikedMap);
    try {
      localStorage.setItem(STORAGE_LIKES_KEY, JSON.stringify(newLikedMap));
    } catch {
      // quota
    }

    const updated = photos.map(p => {
      if (p.id === photoId) {
        return {
          ...p,
          likes: isCurrentlyLiked ? Math.max(0, p.likes - 1) : p.likes + 1
        };
      }
      return p;
    });
    savePhotos(updated);
  };

  const handleDeletePhoto = (e: React.MouseEvent, photoId: string) => {
    e.stopPropagation();
    if (window.confirm('Delete this photo from your gallery?')) {
      const updated = photos.filter(p => p.id !== photoId);
      savePhotos(updated);
      if (activeLightboxIdx !== null) {
        setActiveLightboxIdx(null);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPEG, PNG, WEBP, etc.).');
      return;
    }

    setErrorMessage('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPreviewUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl) {
      setErrorMessage('Please provide an image file or a valid web link.');
      return;
    }

    const newPhoto: PhotoItem = {
      id: `photo-${Date.now()}`,
      url: previewUrl,
      caption: caption.trim() || 'A snapshot from my creative journey',
      category,
      location: location.trim() || undefined,
      date: dateStr.trim() || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      likes: 1,
      isCustom: true
    };

    const updated = [newPhoto, ...photos];
    savePhotos(updated);

    // Reset Form
    setPreviewUrl('');
    setCaption('');
    setLocation('');
    setDateStr('');
    setErrorMessage('');
    setShowAddModal(false);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset gallery to default portfolio snapshots?')) {
      setPhotos(DEFAULT_PHOTOS);
      try {
        localStorage.removeItem(STORAGE_PHOTOS_KEY);
      } catch {
        // ignore
      }
    }
  };

  // Filtered Photos
  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter(p => p.category === selectedCategory);

  const openLightbox = (index: number) => {
    setActiveLightboxIdx(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIdx(null);
  };

  const nextLightboxPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeLightboxIdx !== null) {
      setActiveLightboxIdx((activeLightboxIdx + 1) % filteredPhotos.length);
    }
  };

  const prevLightboxPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeLightboxIdx !== null) {
      setActiveLightboxIdx((activeLightboxIdx - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIdx === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightboxPhoto();
      if (e.key === 'ArrowLeft') prevLightboxPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIdx, filteredPhotos.length]);

  const categoryLabels: Record<string, string> = {
    all: 'All Photos',
    coding: 'Coding & Projects',
    creative: 'Creative & Art',
    campus: 'Campus Life',
    moments: 'Moments & Passions'
  };

  const activePhoto = activeLightboxIdx !== null ? filteredPhotos[activeLightboxIdx] : null;

  return (
    <section id="photos" className="py-12 md:py-20 border-b border-red-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold mb-2">
              <Camera className="w-3.5 h-3.5 text-red-600" />
              <span>Visual Gallery & Moments</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
              <span className="font-cursive text-red-600 font-bold text-4xl sm:text-6xl mr-2">Lysette's</span> 
              Photo Album
            </h2>
            <p className="text-base sm:text-lg text-stone-600 mt-2 max-w-2xl leading-relaxed">
              Snapshots of coding sessions, creative visual inspirations, college life, and behind-the-scenes moments.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              id="btn-add-photo"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Photo</span>
            </button>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-red-100 pb-3">
          <div className="flex flex-wrap gap-1.5 p-1 bg-red-100/60 rounded-2xl border border-red-200" id="photo-category-filters">
            {['all', 'coding', 'creative', 'campus', 'moments'].map((catKey) => (
              <button
                key={catKey}
                id={`filter-photo-${catKey}`}
                onClick={() => setSelectedCategory(catKey)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === catKey
                    ? 'bg-white text-red-700 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
                }`}
              >
                {categoryLabels[catKey]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs text-stone-500">
            <span>Showing {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}</span>
            {photos.length !== DEFAULT_PHOTOS.length && (
              <button
                onClick={handleResetDefaults}
                className="text-red-600 hover:text-red-800 underline underline-offset-2"
              >
                Reset Gallery
              </button>
            )}
          </div>
        </div>

        {/* Photo Grid */}
        {filteredPhotos.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-red-100 shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 mx-auto flex items-center justify-center">
              <Camera className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">No photos in this category yet</h3>
            <p className="text-stone-500 text-sm max-w-sm mx-auto">
              Be the first to add a snapshot to this collection!
            </p>
            <button
              onClick={() => {
                setCategory(selectedCategory as any);
                setShowAddModal(true);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700"
            >
              Add Photo Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="photos-grid">
            {filteredPhotos.map((photo, idx) => {
              const isLiked = !!likedMap[photo.id];
              return (
                <div
                  key={photo.id}
                  id={`photo-card-${photo.id}`}
                  onClick={() => openLightbox(idx)}
                  className="group bg-white rounded-3xl overflow-hidden border border-red-100 hover:border-red-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-xs font-medium flex items-center gap-1.5">
                        <Maximize2 className="w-4 h-4" /> Click to view full image
                      </span>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-red-700 shadow-xs border border-red-100">
                        {photo.category}
                      </span>
                    </div>

                    {/* Like Button */}
                    <button
                      type="button"
                      id={`btn-like-photo-${photo.id}`}
                      onClick={(e) => handleToggleLike(e, photo.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-xs transition-transform active:scale-90 ${
                        isLiked 
                          ? 'bg-red-600 text-white' 
                          : 'bg-white/90 text-stone-700 hover:text-red-600'
                      }`}
                      title={isLiked ? 'Unlike' : 'Like'}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Photo Info Content */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="font-bold text-stone-900 text-base sm:text-lg leading-snug line-clamp-2">
                        {photo.caption}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                      <div className="flex items-center gap-3">
                        {photo.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-red-500" />
                            {photo.location}
                          </span>
                        )}
                        {photo.date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-stone-400" />
                            {photo.date}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-700 flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                          {photo.likes}
                        </span>

                        {photo.isCustom && (
                          <button
                            onClick={(e) => handleDeletePhoto(e, photo.id)}
                            title="Delete photo"
                            className="p-1 rounded-md text-stone-400 hover:text-rose-600 hover:bg-rose-50"
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

      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 select-none animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
            aria-label="Close photo view"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left / Right Navigation */}
          {filteredPhotos.length > 1 && (
            <>
              <button
                onClick={prevLightboxPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 hidden sm:flex items-center justify-center"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextLightboxPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 hidden sm:flex items-center justify-center"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Modal Content Box */}
          <div 
            className="max-w-4xl w-full max-h-[90vh] flex flex-col bg-stone-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Enlarged Image */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden max-h-[68vh]">
              <img
                src={activePhoto.url}
                alt={activePhoto.caption}
                className="max-w-full max-h-[68vh] object-contain"
              />
            </div>

            {/* Bottom Details Bar */}
            <div className="p-5 sm:p-6 bg-stone-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-600/30 text-red-300 border border-red-500/40">
                    {activePhoto.category}
                  </span>
                  {activePhoto.location && (
                    <span className="text-xs text-stone-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      {activePhoto.location}
                    </span>
                  )}
                  {activePhoto.date && (
                    <span className="text-xs text-stone-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      {activePhoto.date}
                    </span>
                  )}
                </div>
                <h4 className="text-base sm:text-lg font-bold text-stone-100">
                  {activePhoto.caption}
                </h4>
              </div>

              {/* Action: Like inside lightbox */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={(e) => handleToggleLike(e, activePhoto.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
                    likedMap[activePhoto.id]
                      ? 'bg-red-600 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${likedMap[activePhoto.id] ? 'fill-current' : ''}`} />
                  <span>{activePhoto.likes} Likes</span>
                </button>

                {activePhoto.isCustom && (
                  <button
                    onClick={(e) => handleDeletePhoto(e, activePhoto.id)}
                    className="p-2 rounded-xl bg-white/10 text-rose-400 hover:bg-rose-950/40 transition-colors"
                    title="Delete photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Photo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-red-100 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">Add a New Photo</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Upload Method Tabs */}
            <div className="flex p-1 bg-stone-100 rounded-xl">
              <button
                type="button"
                onClick={() => setUploadMethod('upload')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  uploadMethod === 'upload'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload from Device</span>
              </button>
              <button
                type="button"
                onClick={() => setUploadMethod('url')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  uploadMethod === 'url'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>Paste Image Link</span>
              </button>
            </div>

            <form onSubmit={handleAddPhotoSubmit} className="space-y-4">
              {/* Image Input Area */}
              {uploadMethod === 'upload' ? (
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-red-200 hover:border-red-400 rounded-2xl p-6 text-center cursor-pointer bg-red-50/50 hover:bg-red-50 transition-colors"
                  >
                    {previewUrl ? (
                      <div className="space-y-2">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-36 object-cover rounded-xl mx-auto shadow-xs"
                        />
                        <p className="text-xs text-red-600 font-semibold">Click to choose a different photo</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
                          <Upload className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-bold text-stone-800">Click to select photo from device</p>
                        <p className="text-[11px] text-stone-500">Supports JPG, PNG, WEBP, GIF</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Image Web URL *
                  </label>
                  <input
                    type="url"
                    value={previewUrl}
                    onChange={(e) => setPreviewUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-red-400"
                  />
                  {previewUrl && (
                    <div className="mt-2">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-36 object-cover rounded-xl shadow-xs"
                        onError={() => setErrorMessage('Unable to load image from URL. Please check the address.')}
                      />
                    </div>
                  )}
                </div>
              )}

              {errorMessage && (
                <p className="text-xs text-rose-600 font-semibold">{errorMessage}</p>
              )}

              {/* Caption */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Caption / Title *
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. My study setup for finals week"
                  required
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-red-400"
                />
              </div>

              {/* Category & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-red-400 bg-white"
                  >
                    <option value="coding">Coding & Projects</option>
                    <option value="creative">Creative & Art</option>
                    <option value="campus">Campus Life</option>
                    <option value="moments">Moments & Passions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Location (Optional)
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Library Desk"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-red-400"
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Date / Timeframe (Optional)
                </label>
                <input
                  type="text"
                  value={dateStr}
                  onChange={(e) => setDateStr(e.target.value)}
                  placeholder="e.g. September 2026"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-red-400"
                />
              </div>

              {/* Modal Actions */}
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
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
