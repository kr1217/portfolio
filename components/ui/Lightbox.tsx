'use client';

import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export function Lightbox({
  isOpen,
  onClose,
  imageSrc,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: LightboxProps) {
  // Handle Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight' && onNext) onNext();
    if (e.key === 'ArrowLeft' && onPrev) onPrev();
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-50"
        aria-label="Close lightbox"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Navigation Buttons */}
      {hasPrev && onPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-50 hidden sm:flex"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {hasNext && onNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-50 hidden sm:flex"
          aria-label="Next image"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* Image Container */}
      <div 
        className="relative w-full h-full max-w-7xl max-h-[90vh] mx-auto p-4 flex items-center justify-center"
        onClick={onClose} // Close when clicking backdrop
      >
        <div 
            className="relative w-full h-full"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
        >
             <Image
              src={imageSrc}
              alt="Project Image"
              fill
              className="object-contain"
              quality={90}
              priority
            />
        </div>
      </div>
    </div>
  );
}
