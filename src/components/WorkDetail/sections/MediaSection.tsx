"use client";

import { type FC, useMemo } from "react";
import { getEmbedInfo } from "@/utils/embed-providers";
import type { AudioItem, VideoItem } from "../types";
import { AudioSection } from "./AudioSection";
import { VideosSection } from "./VideosSection";

interface MediaSectionProps {
  soundCloudEmbedUrl?: string | null;
  audio?: AudioItem[] | null;
  videos?: VideoItem[] | null;
}

export const MediaSection: FC<MediaSectionProps> = ({
  soundCloudEmbedUrl,
  audio,
  videos,
}) => {
  // 1. STRICT VALIDATION: Check the "first wording" and API format
  const embedUrl = useMemo(() => {
    if (!soundCloudEmbedUrl || soundCloudEmbedUrl.trim().length < 15)
      return null;

    const url = soundCloudEmbedUrl.trim();

    // Logic to check the first wording/domain of the URL
    const isValidDomain =
      url.startsWith("https://soundcloud.com/") ||
      url.startsWith("https://www.soundcloud.com/");

    if (!isValidDomain) return null;

    try {
      const info = getEmbedInfo(url);

      // If the link is a browser link but doesn't resolve to a valid track API,
      // SoundCloud shows that gray error. We prevent that by returning null here.
      if (
        info?.provider === "soundcloud" &&
        info.embedUrl?.includes("api.soundcloud.com")
      ) {
        return info.embedUrl;
      }
      return null;
    } catch (e) {
      return null;
    }
  }, [soundCloudEmbedUrl]);

  // 2. Filter list items to ensure they aren't "ghost" records with no URL
  const validAudio = useMemo(() => {
    return (
      audio?.filter((item) => item.url && item.url.trim().length > 10) || []
    );
  }, [audio]);

  const validVideos = useMemo(() => {
    return (
      videos?.filter((item) => item.url && item.url.trim().length > 10) || []
    );
  }, [videos]);

  const hasAudio = validAudio.length > 0;
  const hasVideos = validVideos.length > 0;

  // 3. Final Logic: If no valid player, audio, or video is present, REMOVE the section
  const hasContent = !!embedUrl || hasAudio || hasVideos;

  if (!hasContent) return null;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-black tracking-tight text-gray-900">
        Media
      </h2>

      <div className="space-y-6">
        {/* SoundCloud Player - Only renders if URL is strictly valid */}
        {embedUrl && (
          <div className="rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
            <iframe
              width="100%"
              height="166"
              frameBorder="no"
              scrolling="no"
              allow="autoplay"
              src={embedUrl}
              className="filter grayscale hover:grayscale-0 transition-all duration-500"
              title="SoundCloud Audio Player"
            />
          </div>
        )}

        {/* List of valid Audio Recordings */}
        {hasAudio && <AudioSection audio={validAudio} />}

        {/* List of valid Videos */}
        {hasVideos && <VideosSection videos={validVideos} />}
      </div>
    </div>
  );
};
