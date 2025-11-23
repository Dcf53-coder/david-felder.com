"use client";

import { FC, useMemo } from "react";
import { AudioItem, VideoItem } from "../types";
import { AudioSection } from "./AudioSection";
import { VideosSection } from "./VideosSection";
import { getEmbedInfo } from "@/utils/embed-providers";

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
  const hasAudio = audio && audio.length > 0;
  const hasVideos = videos && videos.length > 0;
  const hasContent = soundCloudEmbedUrl || hasAudio || hasVideos;

  const embedUrl = useMemo(() => {
    if (!soundCloudEmbedUrl) return null;
    const info = getEmbedInfo(soundCloudEmbedUrl);
    return info.embedUrl || soundCloudEmbedUrl;
  }, [soundCloudEmbedUrl]);

  if (!hasContent) return null;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-black tracking-tight">
        Media
      </h2>

      <div className="space-y-6">
        {/* SoundCloud embed */}
        {embedUrl && (
          <iframe
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={embedUrl}
            className="rounded"
          />
        )}

        {/* Audio files */}
        {hasAudio && <AudioSection audio={audio} />}

        {/* Videos */}
        {hasVideos && <VideosSection videos={videos} />}
      </div>
    </div>
  );
};
