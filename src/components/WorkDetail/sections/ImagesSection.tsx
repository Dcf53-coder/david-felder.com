"use client";

import { type FC, useState } from "react";
import Img from "@/components/ui/Img";
import type { ImageItem } from "../types";

interface ImagesSectionProps {
  images: ImageItem[];
}

export const ImagesSection: FC<ImagesSectionProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  return (
    <>
      <div className="space-y-8">
        <h2 className="text-3xl font-black tracking-tight">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((image) => (
            <ImageThumbnail
              key={image._key}
              image={image}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};

const ImageThumbnail: FC<{ image: ImageItem; onClick: () => void }> = ({
  image,
  onClick,
}) => {
  if (!image.asset?.url) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="aspect-square overflow-hidden rounded-lg bg-gray-100 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
    >
      <Img
        image={image}
        alt={image.performers || "Performance image"}
        width={400}
        height={400}
        className="object-cover w-full h-full"
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
    </button>
  );
};

const Lightbox: FC<{ image: ImageItem; onClose: () => void }> = ({
  image,
  onClose,
}) => {
  if (!image.asset?.url) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-image"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        aria-label="Close"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
        >
          <title>Close</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div
        className="max-w-5xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="none"
      >
        <div className="flex items-center justify-center max-h-[80vh]">
          <Img
            image={image}
            alt={image.performers || "Performance image"}
            width={1200}
            className="object-contain rounded-lg max-h-[80vh]"
            sizes="90vw"
            id="lightbox-image"
          />
        </div>
        {(image.performers ||
          image.date ||
          image.location ||
          image.credits) && (
          <div className="mt-4 text-center text-white">
            {image.performers && <p className="text-lg">{image.performers}</p>}
            <p className="text-sm text-gray-400 mt-1">
              {[image.date, image.location, image.credits]
                .filter(Boolean)
                .join(" • ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
