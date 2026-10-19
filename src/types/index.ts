/**
 * Core domain types for NASCORE STUDIO
 */

export interface YouTubeThumbnail {
  url: string;
  width?: number;
  height?: number;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    default?: YouTubeThumbnail;
    medium?: YouTubeThumbnail;
    high?: YouTubeThumbnail;
    standard?: YouTubeThumbnail;
    maxres?: YouTubeThumbnail;
  };
  channelTitle: string;
  channelId: string;
  isShort: boolean;
  duration?: string; // ISO 8601 or formatted e.g. "14:20"
  durationSeconds?: number;
  viewCount?: string;
  category?: string;
  isDeveloperSample?: boolean;
}

export interface YouTubeChannelInfo {
  id: string;
  title: string;
  description: string;
  customUrl?: string;
  publishedAt: string;
  thumbnails: {
    default?: YouTubeThumbnail;
    medium?: YouTubeThumbnail;
    high?: YouTubeThumbnail;
  };
  statistics?: {
    viewCount?: string;
    subscriberCount?: string;
    hiddenSubscriberCount?: boolean;
    videoCount?: string;
  };
  bannerUrl?: string;
  uploadsPlaylistId?: string;
  isDeveloperSample?: boolean;
}

export interface NoticeItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string; // Markdown formatted content
  category: "Announcement" | "Production" | "Gaming" | "Release" | "Community" | "Maintenance";
  coverImage?: string;
  externalLink?: {
    url: string;
    label: string;
  };
  pinned?: boolean;
  author?: {
    name: string;
    role: string;
  };
}

export interface NoticeManifest {
  version: string;
  lastUpdated: string;
  notices: NoticeItem[];
}

export type ActiveTab = "home" | "videos" | "shorts" | "notices" | "about";
