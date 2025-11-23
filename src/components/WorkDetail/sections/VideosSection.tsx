"use client";

import { FC } from "react";
import { VideoItem } from "../types";
import { getEmbedInfo } from "@/utils/embed-providers";

interface VideosSectionProps {
  videos: VideoItem[];
}

export const VideosSection: FC<VideosSectionProps> = ({ videos }) => {
  return (
    <div className="space-y-4">
      {videos.map((item) => (
        <VideoCard key={item._key} item={item} />
      ))}
    </div>
  );
};

const VideoCard: FC<{ item: VideoItem }> = ({ item }) => {
  if (!item.url) return null;

  const embedInfo = getEmbedInfo(item.url);
  const hasMetadata = item.title || item.performers || item.date || item.location || item.credits;

  return (
    <div className="space-y-3">
      <div className="aspect-video rounded-3xl overflow-hidden bg-gray-900 shadow-lg">
        {embedInfo.provider === "youtube" && embedInfo.embedUrl && (
          <iframe
            src={embedInfo.embedUrl}
            title={item.title || "YouTube video"}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
        {embedInfo.provider === "vimeo" && embedInfo.embedUrl && (
          <iframe
            src={embedInfo.embedUrl}
            title={item.title || "Vimeo video"}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        )}
        {embedInfo.provider === "unknown" && (
          <div className="w-full h-full flex items-center justify-center">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent transition-colors"
            >
              View Video &rarr;
            </a>
          </div>
        )}
      </div>
      {hasMetadata && (
        <div className="px-1">
          {item.title && (
            <h4 className="font-semibold text-gray-900">{item.title}</h4>
          )}
          {(item.performers || item.date || item.location || item.credits) && (
            <p className="text-sm text-gray-600 mt-0.5">
              {[item.performers, item.date, item.location, item.credits]
                .filter(Boolean)
                .join(" • ")}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
