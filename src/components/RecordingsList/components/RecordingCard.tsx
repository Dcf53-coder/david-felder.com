import Link from "next/link";
import type { FC } from "react";
import Img from "@/components/ui/Img";
import type { Recording } from "../types";

interface RecordingCardProps {
  recording: Recording;
}

export const RecordingCard: FC<RecordingCardProps> = ({ recording }) => {
  const href = recording.slug?.current
    ? `/recordings/${recording.slug.current}`
    : "#";
  const releaseYear = recording.releaseDate
    ? new Date(recording.releaseDate).getFullYear()
    : null;

  return (
    <article className="group">
      <Link href={href} className="block">
        {/* Album Art with Gold Border */}
        <div className="aspect-square relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 mb-6 border border-gold/10 group-hover:border-gold/30 transition-all duration-300">
          {recording.albumArt ? (
            <Img
              image={recording.albumArt}
              imageOptions={{ width: 600, height: 600 }}
              alt={recording.title || "Album art"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
              <svg
                className="w-20 h-20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>
          )}
          
          {/* Gold Accent Corner */}
          <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-gold/90 to-gold/70 transform translate-x-6 -translate-y-6 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Info */}
        <div className="space-y-3">
          <h2 className="text-2xl font-serif font-semibold text-navy group-hover:text-gold transition-colors duration-300 line-clamp-2">
            {recording.title}
          </h2>
          
          <div className="flex flex-wrap items-center gap-3">
            {recording.recordLabel && (
              <span className="px-3 py-1 bg-navy/5 text-navy text-sm font-medium rounded-full border border-navy/10">
                {recording.recordLabel}
              </span>
            )}
            
            {releaseYear && (
              <span className="px-3 py-1 bg-gold/10 text-gold text-sm font-medium rounded-full border border-gold/20">
                {releaseYear}
              </span>
            )}
          </div>
          
          {/* View Details Link */}
          <div className="pt-2">
            <span className="inline-flex items-center text-gold text-sm font-medium uppercase tracking-wider group-hover:text-navy transition-colors">
              View Details
              <svg 
                className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};