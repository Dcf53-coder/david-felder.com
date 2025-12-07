"use client";

import { type FC, useEffect, useState } from "react";
import type { DownloadItem } from "../types";

interface DownloadsSectionProps {
  workId: string;
  score: {
    url: string | null;
    filename: string | null;
  } | null;
  publicDownloads: DownloadItem[] | null;
  downloads: DownloadItem[] | null;
  isPasswordProtected: boolean | null;
}

export const DownloadsSection: FC<DownloadsSectionProps> = ({
  workId,
  score,
  publicDownloads,
  downloads,
  isPasswordProtected,
}) => {
  const [showProtected, setShowProtected] = useState(false);
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const hasProtectedDownloads =
    isPasswordProtected && ((downloads && downloads.length > 0) || score?.url);

  // Check if user is already authenticated on mount
  useEffect(() => {
    if (!hasProtectedDownloads) {
      setIsCheckingAuth(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const response = await fetch("/api/verify-password");
        const data = await response.json();
        if (data.authenticated) {
          setIsUnlocked(true);
        }
      } catch (err) {
        // Silently fail - user will need to enter password
        console.error("Auth check failed:", err);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [hasProtectedDownloads]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/verify-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          workId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsUnlocked(true);
        setPassword("");
      } else {
        setError(data.error || "Incorrect password");
      }
    } catch (err) {
      console.error("Password verification failed:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while checking auth
  if (isCheckingAuth && hasProtectedDownloads) {
    return (
      <section>
        <h2 className="text-3xl font-black tracking-tight mb-6">Downloads</h2>
        <div className="space-y-4">
          {/* Public downloads are always shown */}
          {publicDownloads?.map((download) =>
            download.url ? (
              <DownloadCard
                key={download._key}
                url={download.url}
                filename={download.filename || "Download"}
                icon={<FileIcon />}
              />
            ) : null,
          )}
          {/* Loading placeholder for protected content */}
          <div className="bg-gray-100 rounded-xl p-6 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300" />
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-48 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-32" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-3xl font-black tracking-tight mb-6">Downloads</h2>
      <div className="space-y-4">
        {/* Public downloads - always visible */}
        {publicDownloads?.map((download) =>
          download.url ? (
            <DownloadCard
              key={download._key}
              url={download.url}
              filename={download.filename || "Download"}
              icon={<FileIcon />}
            />
          ) : null,
        )}

        {/* Score - shown if not password protected OR if unlocked */}
        {score?.url && (!isPasswordProtected || isUnlocked) && (
          <DownloadCard
            url={score.url}
            filename={score.filename || "Score"}
            label="Score (PDF)"
            icon={<ScoreIcon />}
          />
        )}

        {/* Protected downloads - shown only when unlocked */}
        {isUnlocked &&
          downloads?.map((download) =>
            download.url ? (
              <DownloadCard
                key={download._key}
                url={download.url}
                filename={download.filename || "Download"}
                icon={<FileIcon />}
              />
            ) : null,
          )}

        {/* Password prompt for protected downloads */}
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
                  {(downloads?.length ?? 0) + (score?.url ? 1 : 0)} file
                  {(downloads?.length ?? 0) + (score?.url ? 1 : 0) !== 1
                    ? "s"
                    : ""}{" "}
                  available
                </p>
              </div>
            </div>

            {!showProtected ? (
              <button
                type="button"
                onClick={() => setShowProtected(true)}
                className="text-sm font-mono uppercase tracking-wider text-accent hover:text-accent/80 transition-colors"
              >
                Enter Password &rarr;
              </button>
            ) : (
              <form onSubmit={handleUnlock} className="space-y-3">
                <div className="flex gap-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                    placeholder="Enter password"
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !password}
                    className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Checking..." : "Unlock"}
                  </button>
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <p className="text-xs text-gray-500">
                  Please{" "}
                  <a
                    href="mailto:felder@buffalo.edu"
                    className="text-accent hover:underline"
                  >
                    contact the composer
                  </a>{" "}
                  for access to these files.
                </p>
              </form>
            )}
          </div>
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

const DownloadCard: FC<DownloadCardProps> = ({
  url,
  filename,
  label,
  icon,
}) => {
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
    aria-hidden="false"
    role="img"
  >
    <title>Score document</title>
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
    aria-hidden="false"
    role="img"
  >
    <title>Downloadable file</title>
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
    aria-hidden="false"
    role="img"
  >
    <title>Password protected</title>
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
    role="img"
    aria-hidden="true"
  >
    <title>Download</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
);
