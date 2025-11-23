import { FC, useMemo } from "react";
import { getEmbedInfo } from "@/utils/embed-providers";

interface SoundCloudEmbedProps {
  url: string;
}

export const SoundCloudEmbed: FC<SoundCloudEmbedProps> = ({ url }) => {
  // Auto-convert track URLs to widget format
  const embedUrl = useMemo(() => {
    const info = getEmbedInfo(url);
    return info.embedUrl || url;
  }, [url]);

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-sm font-mono uppercase tracking-wider text-accent mb-4">
        Listen
      </h3>
      <iframe
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={embedUrl}
        className="rounded"
      />
    </div>
  );
};
