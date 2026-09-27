"use client";

import { useState } from "react";
import Image from "next/image";
import type { RoomImage } from "@/types/room";

type PhotoGalleryProps = {
  images: RoomImage[];
};

const PhotoGallery = ({ images }: PhotoGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return null;

  const showPrevious = () => {
    setCurrentIndex((index) => (index - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setCurrentIndex((index) => (index + 1) % images.length);
  };

  return (
    <section aria-label="Galería de fotos del alojamiento" className="relative">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200 md:aspect-[16/8]">
        <Image
          key={images[currentIndex].src}
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <span className="absolute right-4 bottom-4 rounded-lg bg-neutral-900/75 px-3 py-1.5 text-sm font-semibold text-white">
          {currentIndex + 1} / {images.length}
        </span>
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Foto anterior"
              className="absolute top-1/2 left-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-neutral-900 shadow transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Foto siguiente"
              className="absolute top-1/2 right-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-neutral-900 shadow transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span aria-hidden="true">→</span>
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;