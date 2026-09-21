import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Trash2, Link2, X, Plus } from 'lucide-react';

interface PhotoUploaderProps {
  onPhotoChange?: (photoUrl: string | null) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const STORAGE_KEY = 'lysette_inserted_profile_picture';

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  onPhotoChange,
  className = '',
  size = 'xl'
}) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setPhotoUrl(saved);
        if (onPhotoChange) onPhotoChange(saved);
      }
    } catch {
      // ignore
    }
  }, [onPhotoChange]);

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

  const savePhoto = (url: string | null) => {
    setPhotoUrl(url);
    if (onPhotoChange) onPhotoChange(url);
    try {
      if (url) {
        localStorage.setItem(STORAGE_KEY, url);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // quota or private mode
    }
    setShowMenu(false);
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please choose an image file (PNG, JPG, WEBP, GIF, etc.).');
      return;
    }
    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        savePhoto(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    if (e.target) e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      savePhoto(inputUrl.trim());
      setInputUrl('');
      setShowUrlModal(false);
    }
  };

  // Dimensions based on size
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40',
    xl: 'w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52'
  }[size];

  return (
    <div className={`relative inline-block ${className}`} ref={menuRef} id="hero-photo-uploader-container">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        className="hidden"
        id="hero-photo-file-input"
      />

      {/* Main Interactive Picture Box */}
      <div
        id="hero-photo-frame"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => setShowMenu(!showMenu)}
        className={`group relative ${sizeClasses} rounded-3xl cursor-pointer select-none transition-all duration-300 shadow-md ${
          isDragging
            ? 'ring-4 ring-red-500 scale-105 bg-red-100'
            : photoUrl
            ? 'ring-4 ring-white border-2 border-red-200 hover:ring-red-400 hover:shadow-xl'
            : 'border-3 border-dashed border-red-300 hover:border-red-500 bg-red-50 hover:bg-red-100/70 hover:shadow-lg'
        } overflow-hidden flex items-center justify-center`}
        title={photoUrl ? 'Click to change or remove picture' : 'Click or drop picture here'}
      >
        {photoUrl ? (
          <>
            <img
              src={photoUrl}
              alt="Lysette"
              className="w-full h-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-300"
            />
            {/* Hover overlay with camera icon */}
            <div className="absolute inset-0 bg-red-950/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-3">
              <Camera className="w-8 h-8 mb-1.5" />
              <span className="text-sm font-bold text-center leading-tight">Change Picture</span>
              <span className="text-[11px] opacity-90 mt-0.5">Click to update</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-3 text-center text-red-600 transition-transform group-hover:scale-105">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-red-100/80 flex items-center justify-center mb-2 text-red-600 shadow-xs group-hover:bg-red-200 transition-colors">
              <Camera className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <span className="text-sm sm:text-base font-bold leading-tight">
              Insert Picture
            </span>
            <span className="text-[11px] sm:text-xs text-red-500/80 mt-1 font-medium">
              Click or drag file
            </span>
          </div>
        )}

        {/* Action badge */}
        <div className="absolute bottom-2 right-2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg border-2 border-white pointer-events-none group-hover:scale-110 transition-transform">
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>

      {/* Error message indicator if any */}
      {errorMsg && (
        <div className="absolute top-full left-0 mt-1 z-30 p-2 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg shadow-sm whitespace-nowrap">
          {errorMsg}
        </div>
      )}

      {/* Popover Action Menu */}
      {showMenu && (
        <div
          id="photo-options-menu"
          className="absolute left-0 sm:left-auto sm:right-0 mt-2 z-40 w-52 bg-white rounded-xl shadow-xl border border-red-100 py-1.5 text-stone-800 text-sm animate-fadeIn"
        >
          <div className="px-3 py-1.5 border-b border-stone-100">
            <p className="font-bold text-xs text-red-600">Picture Settings</p>
            <p className="text-[11px] text-stone-400">Insert or update your photo</p>
          </div>

          <button
            type="button"
            id="btn-upload-local-file"
            onClick={() => {
              setShowMenu(false);
              fileInputRef.current?.click();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-red-50 hover:text-red-700 transition-colors text-left"
          >
            <Upload className="w-4 h-4 text-red-600" />
            <span>Upload from device</span>
          </button>

          <button
            type="button"
            id="btn-paste-image-url"
            onClick={() => {
              setShowMenu(false);
              setShowUrlModal(true);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-red-50 hover:text-red-700 transition-colors text-left"
          >
            <Link2 className="w-4 h-4 text-red-600" />
            <span>Paste picture URL</span>
          </button>

          {photoUrl && (
            <button
              type="button"
              id="btn-remove-photo"
              onClick={() => savePhoto(null)}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left border-t border-stone-100"
            >
              <Trash2 className="w-4 h-4 text-rose-600" />
              <span>Remove picture</span>
            </button>
          )}
        </div>
      )}

      {/* URL Input Modal */}
      {showUrlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-red-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Link2 className="w-4 h-4 text-red-600" />
                <span>Insert Picture by Web Link</span>
              </h3>
              <button
                onClick={() => setShowUrlModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUrlSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Picture Image URL
                </label>
                <input
                  type="url"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://example.com/my-photo.jpg"
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUrlModal(false)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-xs"
                >
                  Insert Picture
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
