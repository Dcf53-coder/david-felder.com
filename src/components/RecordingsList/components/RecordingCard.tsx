import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Recording } from "../types";

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
        {/* Album Art */}
        <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 mb-4">
          {recording.albumArt?.asset ? (
            <Image
              src={urlFor(recording.albumArt).width(600).height(600).url()}
              alt={recording.title || "Album art"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
        </div>

        {/* Info */}
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight group-hover:text-accent transition-colors line-clamp-2">
            {recording.title}
          </h2>
          <p className="text-base text-gray-600">
            {[recording.recordLabel, releaseYear].filter(Boolean).join(" | ")}
          </p>
        </div>
      </Link>
    </article>
  );
};
