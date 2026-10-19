/**
 * NASCORE STUDIO — Central Site Configuration
 * 
 * This is the single source of truth for all brand metadata, social channels,
 * YouTube API settings, and public URLs.
 * 
 * Secrets Note:
 * Client-side builds expose variables starting with VITE_ to the browser.
 * For YouTube Data API, restrict your API key in Google Cloud Console
 * to your domain (e.g., https://yourusername.github.io or custom domain)
 * under 'Website restrictions' to prevent unauthorized usage.
 */

export interface SiteConfig {
  brand: {
    name: string;
    tagline: string;
    subHeadline: string;
    description: string;
    foundedYear: number;
  };
  youtube: {
    // Channel ID: typically starts with 'UC...'
    // Replace with your real YouTube channel ID or provide via VITE_YOUTUBE_CHANNEL_ID env variable
    channelId: string;
    // Channel Handle or direct link (e.g. '@nascorestudio')
    channelHandle: string;
    channelUrl: string;
    // API Key: provide in .env file as VITE_YOUTUBE_API_KEY or configure here for static build
    apiKey: string;
    // Cache duration in minutes for API responses (saves daily quota limit)
    cacheDurationMinutes: number;
    // Fallback featured video ID (shown if API is not yet configured or offline)
    fallbackFeaturedVideoId: string;
  };
  github: {
    // Your GitHub username or organization
    owner: string;
    // Your repository name (e.g. 'nascore-studio-website')
    repo: string;
    // Branch where notices are published
    branch: string;
    // Path inside repository for notices manifest
    noticesPath: string;
  };
  social: {
    youtube: string;
    instagram: string;
    email: string;
    twitter?: string;
    discord?: string;
    github?: string;
  };
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    description: string;
  }>;
  deployment: {
    productionUrl: string;
    repoUrl: string;
  };
  theme: {
    accentColor: string; // Electric blue #0066FF
    accentViolet: string; // Violet highlight #8B5CF6
    backgroundDark: string; // #050508
  };
}

export const siteConfig: SiteConfig = {
  brand: {
    name: "NASCORE STUDIO",
    tagline: "Stories. Gaming. Creativity.",
    subHeadline: "Independent Digital Creator & Entertainment Media Brand",
    description:
      "Crafting high-intensity gaming content, investigative deep-dives, immersive documentaries, and original audiovisual entertainment for a global digital audience.",
    foundedYear: 2024,
  },
  youtube: {
    // Official NASCORE STUDIO YouTube Channel Details
    channelId: import.meta.env.VITE_YOUTUBE_CHANNEL_ID || "UCDXae4TDvxSCX7w5u2a5FsQ",
    channelHandle: "@nascorestudio",
    channelUrl: "https://www.youtube.com/channel/UCDXae4TDvxSCX7w5u2a5FsQ",
    apiKey: import.meta.env.VITE_YOUTUBE_API_KEY || "AIzaSyCVIafbMp1au_tFMVzcgoT6Kl5YmoomYCI",
    cacheDurationMinutes: 30, // 30-minute quota-safe caching
    fallbackFeaturedVideoId: "dQw4w9WgXcQ", // Safe fallback
  },
  github: {
    owner: import.meta.env.VITE_GITHUB_REPO_OWNER || "nasheedabdullah007-bot",
    repo: import.meta.env.VITE_GITHUB_REPO_NAME || "nascorestudio-website",
    branch: "main",
    noticesPath: "public/content/notices",
  },
  social: {
    youtube: "https://www.youtube.com/@nascorestudio",
    instagram: "https://www.instagram.com/nascorestudio",
    email: "contact@nascorestudio.com",
    discord: "https://discord.gg/nascore",
    github: "https://github.com/nasheedabdullah007-bot/nascorestudio-website",
  },
  categories: [
    {
      id: "all",
      name: "All Content",
      slug: "all",
      description: "Everything from NASCORE STUDIO across all genres.",
    },
    {
      id: "gaming",
      name: "Gaming & Esports",
      slug: "gaming",
      description: "Tactical walkthroughs, competitive moments, and game analyses.",
    },
    {
      id: "storytelling",
      name: "Documentaries & Stories",
      slug: "storytelling",
      description: "Deep-dives into digital phenomena, mystery narratives, and investigative videos.",
    },
    {
      id: "creator-culture",
      name: "Creator Culture & Exposures",
      slug: "creator-culture",
      description: "Unfiltered perspectives on internet media, trends, and platform dynamics.",
    },
    {
      id: "music-creative",
      name: "Music & Audio Projects",
      slug: "music-creative",
      description: "Original soundtracks, experimental sound design, and audio projects.",
    },
  ],
  deployment: {
    productionUrl: "https://nascorestudio.com",
    repoUrl: "https://github.com/nasheedabdullah007-bot/nascorestudio-website",
  },
  theme: {
    accentColor: "#0066FF",
    accentViolet: "#8B5CF6",
    backgroundDark: "#050508",
  },
};
