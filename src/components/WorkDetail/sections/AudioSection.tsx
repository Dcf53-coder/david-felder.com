"use client";

import { FC, useRef, useState } from "react";
import { AudioItem } from "../types";

interface AudioSectionProps {
  audio: AudioItem[];
}

export const AudioSection: FC<AudioSectionProps> = ({ audio }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-mono uppercase tracking-wider text-accent">
        Audio Recordings
      </h3>
      <div className="space-y-3">
        {audio.map((item) => (
          <AudioPlayer key={item._key} item={item} />
        ))}
      </div>
    </div>
  );
};

const AudioPlayer: FC<{ item: AudioItem }> = ({ item }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!item.url) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-5">
      <div className="flex items-start gap-4">
        <button
          onClick={togglePlay}
          className="flex-shrink-0 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent/90 transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <PauseIcon className="w-5 h-5" />
          ) : (
            <PlayIcon className="w-5 h-5 ml-0.5" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-1">
            <h4 className="font-semibold text-gray-900 truncate">
              {item.title || "Untitled Recording"}
            </h4>
            {item.date && (
              <span className="text-sm text-gray-500 flex-shrink-0">
                {item.date}
              </span>
            )}
          </div>

          {item.performers && (
            <p className="text-sm text-gray-600 mb-2">{item.performers}</p>
          )}

          {/* Progress bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-gray-500 w-10">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
            />
            <span className="text-xs font-mono text-gray-500 w-10 text-right">
              {formatTime(duration)}
            </span>
          </div>

          {(item.location || item.credits) && (
            <p className="text-xs text-gray-500 mt-2">
              {[item.location, item.credits].filter(Boolean).join(" • ")}
            </p>
          )}
        </div>
      </div>

      <audio
        ref={audioRef}
        src={item.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

const PlayIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
  </svg>
);

const PauseIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
  </svg>
);
