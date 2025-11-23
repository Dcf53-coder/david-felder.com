/**
 * Utility functions for detecting and handling embedded media providers
 * (YouTube, Vimeo, SoundCloud)
 */

export type EmbedProvider = "youtube" | "vimeo" | "soundcloud" | "unknown";

export interface EmbedInfo {
  provider: EmbedProvider;
  videoId?: string;
  embedUrl?: string;
  originalUrl: string;
}

/**
 * Detects the provider from a URL and extracts relevant IDs
 */
export function getEmbedInfo(url: string): EmbedInfo {
  if (!url) {
    return { provider: "unknown", originalUrl: url };
  }

  // YouTube patterns
  const youtubePatterns = [
    // Standard watch URL: youtube.com/watch?v=VIDEO_ID
    /(?:youtube\.com\/watch\?v=|youtube\.com\/watch\?.+&v=)([a-zA-Z0-9_-]{11})/,
    // Short URL: youtu.be/VIDEO_ID
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    // Embed URL: youtube.com/embed/VIDEO_ID
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    // YouTube Shorts: youtube.com/shorts/VIDEO_ID
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match) {
      const videoId = match[1];
      return {
        provider: "youtube",
        videoId,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        originalUrl: url,
      };
    }
  }

  // Vimeo patterns
  const vimeoPatterns = [
    // Standard URL: vimeo.com/VIDEO_ID
    /vimeo\.com\/(\d+)/,
    // Player URL: player.vimeo.com/video/VIDEO_ID
    /player\.vimeo\.com\/video\/(\d+)/,
  ];

  for (const pattern of vimeoPatterns) {
    const match = url.match(pattern);
    if (match) {
      const videoId = match[1];
      return {
        provider: "vimeo",
        videoId,
        embedUrl: `https://player.vimeo.com/video/${videoId}`,
        originalUrl: url,
      };
    }
  }

  // SoundCloud patterns
  if (url.includes("soundcloud.com")) {
    // Already a widget URL
    if (url.includes("w.soundcloud.com/player")) {
      return {
        provider: "soundcloud",
        embedUrl: url,
        originalUrl: url,
      };
    }
    // Track or playlist URL - convert to widget URL
    return {
      provider: "soundcloud",
      embedUrl: `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`,
      originalUrl: url,
    };
  }

  return { provider: "unknown", originalUrl: url };
}

/**
 * Checks if a URL is a YouTube video
 */
export function isYouTube(url: string): boolean {
  return getEmbedInfo(url).provider === "youtube";
}

/**
 * Checks if a URL is a Vimeo video
 */
export function isVimeo(url: string): boolean {
  return getEmbedInfo(url).provider === "vimeo";
}

/**
 * Checks if a URL is a SoundCloud track
 */
export function isSoundCloud(url: string): boolean {
  return getEmbedInfo(url).provider === "soundcloud";
}
