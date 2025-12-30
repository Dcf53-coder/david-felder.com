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
  // 1. STRICT VALIDATION: Targeting "Nexus" dead links specifically
  const embedUrl = useMemo(() => {
    if (
      !soundCloudEmbedUrl ||
      soundCloudEmbedUrl.trim().length < 20 ||
      !soundCloudEmbedUrl.includes("soundcloud.com")
    ) {
      return null;
    }

    const url = soundCloudEmbedUrl.trim();

    // Secondary Check: Ensure it's likely a track link, not a user profile or empty set
    // This helps clean up the "dead links" David mentioned on specific pieces.
    const pathParts = url.split("/").filter(Boolean);
    if (pathParts.length < 4) return null;

    try {
      const info = getEmbedInfo(url);

      // Final check: If it's a browser link that SoundCloud's API won't accept,
      // we return null so the grey "Invalid URL" box NEVER renders.
      if (
        info?.provider === "soundcloud" &&
        info.embedUrl?.includes("api.soundcloud.com")
      ) {
        return info.embedUrl;
      }
      return null;
    } catch (e) {
      console.warn("SoundCloud embed processing failed", e);
      return null;
    }
  }, [soundCloudEmbedUrl]);

  // 2. Filter list items to ensure they aren't "ghost" records or unpublished drafts
  const validAudio = useMemo(() => {
    // Only pass audio items that have a real URL and pass the SoundCloud API check
    return (
      audio?.filter((item) => {
        if (!item.url || !item.url.startsWith("http")) return false;

        // Apply the same strict API check to the list items
        const info = getEmbedInfo(item.url);
        if (info?.provider === "soundcloud") {
          return info.embedUrl?.includes("api.soundcloud.com");
        }
        return true;
      }) || []
    );
  }, [audio]);

  const validVideos = useMemo(() => {
    return (
      videos?.filter((item) => item.url && item.url.startsWith("http")) || []
    );
  }, [videos]);

  const hasAudio = validAudio.length > 0;
  const hasVideos = validVideos.length > 0;

  // 3. Section visibility: Hide everything if no valid content exists
  const hasContent = !!embedUrl || hasAudio || hasVideos;

  if (!hasContent) return null;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-black tracking-tight text-gray-900">
        Media
      </h2>

      <div className="space-y-6">
        {/* Main SoundCloud Player */}
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

        {/* List of valid Recordings/Videos */}
        {hasAudio && <AudioSection audio={validAudio} />}
        {hasVideos && <VideosSection videos={validVideos} />}
      </div>
    </div>
  );
};
