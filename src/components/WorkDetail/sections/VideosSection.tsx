"use client";

import { type FC, useMemo } from "react";
import { getEmbedInfo } from "@/utils/embed-providers";
import type { VideoItem } from "../types";

interface VideosSectionProps {
  videos: VideoItem[];
}

export const VideosSection: FC<VideosSectionProps> = ({ videos }) => {
  // Filter out any items that don't have a valid URL before rendering
  const validVideos = useMemo(() => {
    return (
      videos?.filter((item) => item.url && item.url.trim().length > 10) || []
    );
  }, [videos]);

  if (validVideos.length === 0) return null;

  return (
    <div className="space-y-4">
      {validVideos.map((item) => (
        <VideoCard key={item._key} item={item} />
      ))}
    </div>
  );
};

const VideoCard: FC<{ item: VideoItem }> = ({ item }) => {
  if (!item.url) return null;

  const embedInfo = getEmbedInfo(item.url);

  // TECHNICAL FIX: Convert standard youtube embeds to privacy-enhanced mode
  // This helps prevent some of the forced redirects David mentioned.
  const secureEmbedUrl = useMemo(() => {
    if (embedInfo.provider === "youtube" && embedInfo.embedUrl) {
      return embedInfo.embedUrl.replace(
        "youtube.com/embed/",
        "youtube-nocookie.com/embed/"
      );
    }
    return embedInfo.embedUrl;
  }, [embedInfo]);

  const hasMetadata =
    item.title || item.performers || item.date || item.location || item.credits;

  return (
    <div className="space-y-3">
      <div className="aspect-video rounded-3xl overflow-hidden bg-gray-900 shadow-lg">
        {embedInfo.provider === "youtube" && secureEmbedUrl && (
          <iframe
            src={secureEmbedUrl}
            title={item.title || "YouTube video"}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
        {embedInfo.provider === "vimeo" && secureEmbedUrl && (
          <iframe
            src={secureEmbedUrl}
            title={item.title || "Vimeo video"}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        )}
        {embedInfo.provider === "unknown" && (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent transition-colors font-medium"
            >
              View Video on External Site &rarr;
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
