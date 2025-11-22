"use client";

import { FC } from "react";
import { VideoItem } from "../types";

interface VideosSectionProps {
  videos: VideoItem[];
}

export const VideosSection: FC<VideosSectionProps> = ({ videos }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-mono uppercase tracking-wider text-accent">
        Video Recordings
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((item) => (
          <VideoCard key={item._key} item={item} />
        ))}
      </div>
    </div>
  );
};

const VideoCard: FC<{ item: VideoItem }> = ({ item }) => {
  if (!item.url) return null;

  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden">
      <div className="aspect-video bg-gray-200">
        <video
          src={item.url}
          controls
          className="w-full h-full object-cover"
          preload="metadata"
        />
      </div>
      <div className="p-4">
        <div className="flex items-baseline gap-2 mb-1">
          <h4 className="font-semibold text-gray-900">
            {item.title || "Untitled Video"}
          </h4>
          {item.date && <span className="text-sm text-gray-500">{item.date}</span>}
        </div>
        {item.performers && (
          <p className="text-sm text-gray-600">{item.performers}</p>
        )}
        {(item.location || item.credits) && (
          <p className="text-xs text-gray-500 mt-1">
            {[item.location, item.credits].filter(Boolean).join(" • ")}
          </p>
        )}
      </div>
    </div>
  );
};
