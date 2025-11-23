"use client";

import { FC } from "react";
import { AudioItem } from "../types";
import { getEmbedInfo } from "@/utils/embed-providers";

interface AudioSectionProps {
  audio: AudioItem[];
}

export const AudioSection: FC<AudioSectionProps> = ({ audio }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-mono uppercase tracking-wider text-accent">
        Audio Recordings
      </h3>
      <div className="space-y-3">
        {audio.map((item) => (
          <AudioPlayer key={item._key} item={item} />
        ))}
      </div>
    </div>
  );
};

const AudioPlayer: FC<{ item: AudioItem }> = ({ item }) => {
  if (!item.url) return null;

  const embedInfo = getEmbedInfo(item.url);

  // SoundCloud embed
  if (embedInfo.provider === "soundcloud" && embedInfo.embedUrl) {
    return (
      <div className="bg-gray-50 rounded-lg p-5">
        <div className="mb-3">
          <div className="flex items-baseline gap-2 mb-1">
            <h4 className="font-semibold text-gray-900">
              {item.title || "Audio Recording"}
            </h4>
            {item.date && (
              <span className="text-sm text-gray-500">{item.date}</span>
            )}
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
        <iframe
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={embedInfo.embedUrl}
          className="rounded"
        />
      </div>
    );
  }

  // Unknown provider - show link
  return (
    <div className="bg-gray-50 rounded-lg p-5">
      <div className="flex items-baseline gap-2 mb-1">
        <h4 className="font-semibold text-gray-900">
          {item.title || "Audio Recording"}
        </h4>
        {item.date && (
          <span className="text-sm text-gray-500">{item.date}</span>
        )}
      </div>
      {item.performers && (
        <p className="text-sm text-gray-600 mb-2">{item.performers}</p>
      )}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline text-sm"
      >
        Listen to Audio
      </a>
      {(item.location || item.credits) && (
        <p className="text-xs text-gray-500 mt-2">
          {[item.location, item.credits].filter(Boolean).join(" • ")}
        </p>
      )}
    </div>
  );
};
