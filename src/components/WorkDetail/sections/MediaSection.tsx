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
    // Immediate exit if the URL is clearly a placeholder or incomplete draft
    if (
      !soundCloudEmbedUrl ||
      soundCloudEmbedUrl.trim().length < 20 ||
      !soundCloudEmbedUrl.includes("soundcloud.com")
    ) {
      return null;
    }

    const url = soundCloudEmbedUrl.trim();

    try {
      const info = getEmbedInfo(url);

      // David's Fix: Only show if it's a valid track API link.
      // If it's a browser link that can't be embedded, we return null to HIDE it.
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
    return (
      audio?.filter((item) => item.url && item.url.startsWith("http")) || []
    );
  }, [audio]);

  const validVideos = useMemo(() => {
    return (
      videos?.filter((item) => item.url && item.url.startsWith("http")) || []
    );
  }, [videos]);

  const hasAudio = validAudio.length > 0;
  const hasVideos = validVideos.length > 0;

  // 3. Section visibility: If no valid content, the section returns null (David's cleanup)
  const hasContent = !!embedUrl || hasAudio || hasVideos;

  if (!hasContent) return null;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-black tracking-tight text-gray-900">
        Media
      </h2>

      <div className="space-y-6">
        {/* SoundCloud Player - Hidden if dead/bad link */}
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

        {/* These components are only rendered if they contain valid, playable links */}
        {hasAudio && <AudioSection audio={validAudio} />}
        {hasVideos && <VideosSection videos={validVideos} />}
      </div>
    </div>
  );
};
