import Link from "next/link";
import { FC } from "react";

interface RecordingSectionProps {
  cd: {
    _id: string;
    title: string | null;
    slug: { current?: string } | null;
    recordLabel: string | null;
    albumArt: {
      asset: {
        _id: string;
        url: string | null;
        metadata: {
          lqip: string | null;
        } | null;
      } | null;
    } | null;
  };
}

export const RecordingSection: FC<RecordingSectionProps> = ({ cd }) => {
  const href = cd.slug?.current ? `/recordings/${cd.slug.current}` : "#";

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-mono uppercase tracking-wider text-accent">
        Available on Recording
      </h3>
      <Link
        href={href}
        className="flex items-center gap-6 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
      >
        {cd.albumArt?.asset?.url && (
          <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
            <img
              src={cd.albumArt.asset.url}
              alt={cd.title || "Album art"}
              className="w-full h-full object-cover"
              style={{
                backgroundImage: cd.albumArt.asset.metadata?.lqip
                  ? `url(${cd.albumArt.asset.metadata.lqip})`
                  : undefined,
                backgroundSize: "cover",
              }}
            />
          </div>
        )}
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-accent transition-colors">
            {cd.title}
          </h3>
          {cd.recordLabel && (
            <p className="text-gray-600 mt-1">{cd.recordLabel}</p>
          )}
          <span className="inline-block mt-3 text-sm font-mono uppercase tracking-wider text-accent">
            View Recording &rarr;
          </span>
        </div>
      </Link>
    </div>
  );
};
