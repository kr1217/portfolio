'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Lightbox } from '@/components/ui/Lightbox';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="mt-16 sm:mt-24">
        <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-8">Project Gallery</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div 
                key={index} 
                className="group relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-border aspect-[16/9] bg-muted cursor-zoom-in"
                onClick={() => openLightbox(index)}
            >
              <Image
                src={image}
                alt={`${title} screenshot ${index + 1}`}
                width={800}
                height={600}
                className="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        isOpen={isOpen}
        onClose={closeLightbox}
        imageSrc={images[currentIndex]}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={images.length > 1}
        hasPrev={images.length > 1}
      />
    </>
  );
}
