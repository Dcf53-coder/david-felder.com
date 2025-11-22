import { FC } from "react";

interface SoundCloudEmbedProps {
  url: string;
}

export const SoundCloudEmbed: FC<SoundCloudEmbedProps> = ({ url }) => {
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
        src={url}
        className="rounded"
      />
    </div>
  );
};
