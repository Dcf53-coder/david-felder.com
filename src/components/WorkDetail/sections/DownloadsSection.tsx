"use client";

import { FC, useState } from "react";
import { DownloadItem } from "../types";

interface DownloadsSectionProps {
  score: {
    url: string | null;
    filename: string | null;
  } | null;
  publicDownloads: DownloadItem[] | null;
  downloads: DownloadItem[] | null;
  isPasswordProtected: boolean | null;
}

export const DownloadsSection: FC<DownloadsSectionProps> = ({
  score,
  publicDownloads,
  downloads,
  isPasswordProtected,
}) => {
  const [showProtected, setShowProtected] = useState(false);
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  const hasProtectedDownloads =
    isPasswordProtected && downloads && downloads.length > 0;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would verify against the server
    // For now, we just show the downloads
    if (password) {
      setIsUnlocked(true);
    }
  };

  return (
    <section>
      <h2 className="text-3xl font-black tracking-tight mb-6">Downloads</h2>
      <div className="space-y-4">
        {/* Score */}
        {score?.url && (
          <DownloadCard
            url={score.url}
            filename={score.filename || "Score"}
            label="Score (PDF)"
            icon={<ScoreIcon />}
          />
        )}

        {/* Public downloads */}
        {publicDownloads &&
          publicDownloads.map((download) =>
            download.url ? (
              <DownloadCard
                key={download._key}
                url={download.url}
                filename={download.filename || "Download"}
                icon={<FileIcon />}
              />
            ) : null
          )}

        {/* Protected downloads */}
        {hasProtectedDownloads && !isUnlocked && (
          <div className="bg-gray-100 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <LockIcon />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Password Protected Downloads
                </h3>
                <p className="text-sm text-gray-600">
                  {downloads?.length} additional file
                  {downloads?.length !== 1 ? "s" : ""} available
                </p>
              </div>
            </div>

            {!showProtected ? (
              <button
                onClick={() => setShowProtected(true)}
                className="text-sm font-mono uppercase tracking-wider text-accent hover:text-accent/80 transition-colors"
              >
                Enter Password &rarr;
              </button>
            ) : (
              <form onSubmit={handleUnlock} className="flex gap-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
                >
                  Unlock
                </button>
              </form>
            )}
          </div>
        )}

        {/* Unlocked protected downloads */}
        {hasProtectedDownloads &&
          isUnlocked &&
          downloads?.map((download) =>
            download.url ? (
              <DownloadCard
                key={download._key}
                url={download.url}
                filename={download.filename || "Download"}
                icon={<FileIcon />}
              />
            ) : null
          )}
      </div>
    </section>
  );
};

interface DownloadCardProps {
  url: string;
  filename: string;
  label?: string;
  icon: React.ReactNode;
}

const DownloadCard: FC<DownloadCardProps> = ({ url, filename, label, icon }) => {
  const displayName = label || filename;

  return (
    <a
      href={url}
      download
      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
    >
      <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 truncate">{displayName}</p>
        <p className="text-sm text-gray-500 truncate">{filename}</p>
      </div>
      <div className="text-accent group-hover:translate-x-1 transition-transform">
        <DownloadIcon />
      </div>
    </a>
  );
};

const ScoreIcon: FC = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const FileIcon: FC = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
);

const LockIcon: FC = () => (
  <svg
    className="w-5 h-5 text-gray-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const DownloadIcon: FC = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
);
