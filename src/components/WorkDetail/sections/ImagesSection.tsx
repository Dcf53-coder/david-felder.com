"use client";

import { FC, useState } from "react";
import { ImageItem } from "../types";

interface ImagesSectionProps {
  images: ImageItem[];
}

export const ImagesSection: FC<ImagesSectionProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-sm font-mono uppercase tracking-wider text-accent">
          Gallery
        </h3>
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
        <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
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
      onClick={onClick}
      className="aspect-square overflow-hidden rounded-lg bg-gray-100 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
    >
      <img
        src={image.asset.url}
        alt={image.performers || "Performance image"}
        className="w-full h-full object-cover"
        loading="lazy"
        style={{
          backgroundImage: image.asset.metadata?.lqip
            ? `url(${image.asset.metadata.lqip})`
            : undefined,
          backgroundSize: "cover",
        }}
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
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        aria-label="Close"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
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
      >
        <img
          src={image.asset.url}
          alt={image.performers || "Performance image"}
          className="max-h-[80vh] object-contain rounded-lg"
        />
        {(image.performers || image.date || image.location || image.credits) && (
          <div className="mt-4 text-center text-white">
            {image.performers && (
              <p className="text-lg">{image.performers}</p>
            )}
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
