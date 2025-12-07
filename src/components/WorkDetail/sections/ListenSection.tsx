"use client";

import Image from "next/image";
import Link from "next/link";
import { type FC, useMemo } from "react";
import { getEmbedInfo } from "@/utils/embed-providers";

interface CdData {
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
}

interface ListenSectionProps {
  soundCloudEmbedUrl?: string | null;
  isOnCd?: boolean | null;
  cd?: CdData | null;
}

export const ListenSection: FC<ListenSectionProps> = ({
  soundCloudEmbedUrl,
  isOnCd,
  cd,
}) => {
  const hasRecording = isOnCd && cd;
  const hasSoundCloud = !!soundCloudEmbedUrl;

  if (!hasSoundCloud && !hasRecording) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-6 space-y-6">
      <h3 className="text-sm font-mono uppercase tracking-wider text-accent">
        Listen
      </h3>

      {/* SoundCloud embed */}
      {hasSoundCloud && <SoundCloudPlayer url={soundCloudEmbedUrl} />}

      {/* Recording link */}
      {hasRecording && <RecordingLink cd={cd} />}
    </div>
  );
};

const SoundCloudPlayer: FC<{ url: string }> = ({ url }) => {
  const embedUrl = useMemo(() => {
    const info = getEmbedInfo(url);
    return info.embedUrl || url;
  }, [url]);

  return (
    <iframe
      width="100%"
      height="166"
      allow="autoplay"
      src={embedUrl}
      className="rounded"
      title="SoundCloud Audio Player"
    />
  );
};

const RecordingLink: FC<{ cd: CdData }> = ({ cd }) => {
  const href = cd.slug?.current ? `/recordings/${cd.slug.current}` : "#";

  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-4 bg-white rounded-lg hover:bg-gray-100 transition-colors group"
      aria-hidden="true"
    >
      {cd.albumArt?.asset?.url && (
        <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden shadow">
          <Image
            src={cd.albumArt.asset.url}
            alt={cd.title || "Album art"}
            width={64}
            height={64}
            className="w-full h-full object-cover"
            placeholder={cd.albumArt.asset.metadata?.lqip ? "blur" : "empty"}
            blurDataURL={cd.albumArt.asset.metadata?.lqip || undefined}
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-gray-500">
            Available on
          </span>
        </div>
        <h4 className="font-semibold text-gray-900 group-hover:text-accent transition-colors truncate">
          {cd.title}
        </h4>
        {cd.recordLabel && (
          <p className="text-sm text-gray-600 truncate">{cd.recordLabel}</p>
        )}
      </div>
      <span className="text-accent text-sm font-mono">&rarr;</span>
    </Link>
  );
};
