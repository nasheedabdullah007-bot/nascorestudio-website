/**
 * GitHub-Powered Notices & Announcements Service
 * 
 * Free-tier & static-hosting friendly:
 * 1. Reads public notices manifest from `/content/notices/index.json`
 * 2. Can also fetch directly from GitHub Raw (`https://raw.githubusercontent.com/...`)
 *    so notices update immediately when committed to GitHub without rebuilding!
 * 3. Supports individual Markdown content files or bundled text
 * 4. Pinned notices appear first, followed by newest publication date
 */

import { siteConfig } from '../config/siteConfig';
import { NoticeItem, NoticeManifest } from '../types';

// Built-in initial notices to ensure zero empty flash and graceful offline resilience
export const DEFAULT_NOTICES: NoticeItem[] = [
  {
    id: "notice-2025-01",
    slug: "welcome-to-nascore-studio-official-hub",
    title: "Welcome to the Official NASCORE STUDIO Hub",
    date: "2025-01-20",
    category: "Announcement",
    summary: "Welcome to our new official home base for cinematic storytelling, tactical gameplay breakdowns, and creative media productions.",
    pinned: true,
    author: {
      name: "NASCORE Core Team",
      role: "Creative Direction",
    },
    content: `
# Welcome to the New NASCORE STUDIO Hub

We are thrilled to launch the official home of **NASCORE STUDIO**. Over the past year, our community across YouTube, gaming, and digital culture has grown beyond what we ever anticipated. This website serves as our central hub for direct communication, project archives, and exclusive production updates.

---

### What to Expect Here

* **Direct Broadcasts & Notices**: Get official project timelines, casting calls, and release dates before they hit social algorithms.
* **Streamlined Video & Shorts Discovery**: Watch our complete library in high definition without distracting algorithmic rabbit holes.
* **Documentary Archives**: Behind-the-scenes research, transcripts, and source materials for our investigative storytelling series.
* **Zero Censorship or Algorithmic Filtering**: True creator-to-community updates.

> *"Cinema isn't just about big budgets — it's about bold perspective, uncompromising pacing, and ruthless attention to detail."*

### Upcoming Slate for 2025
We are currently deep in post-production on two long-form video essays exploring internet media archaeology and tactical esports analysis. Stay tuned to the **Notices** tab for release dates and sneak peeks.

Thank you for being here from day one.
    `.trim(),
  },
  {
    id: "notice-2025-02",
    slug: "q1-documentary-production-schedule-update",
    title: "Q1 Production Schedule & Long-Form Video Slate",
    date: "2025-02-05",
    category: "Production",
    summary: "A breakdown of our upcoming documentary release timeline, sound design upgrades, and editing workflow enhancements.",
    pinned: false,
    author: {
      name: "Production Desk",
      role: "Post-Production Lead",
    },
    content: `
## Q1 Production Timeline & Studio Upgrades

We've received thousands of comments asking about the status of our next long-form video essay. Here is the official transparency update on our Q1 timeline:

### 1. The Internet Media Archive Project
* **Status**: 85% Edit Complete
* **Target Release**: Late February 2025
* **Runtime**: ~32 Minutes
* **Focus**: An exhaustive investigation into forgotten creator networks, deleted videos, and the digital curators saving internet history.

### 2. Audio & Visual Studio Upgrades
To elevate our production standards to true cinema-grade fidelity:
- Upgraded to dedicated outboard compression and analog synth layering for all custom score tracks.
- Implemented a unified color science workflow for 10-bit LOG footage.
- Reduced render pipeline times to allow more iteration passes per cut.

Check back on our **Videos** page or subscribe on YouTube to catch the premiere notification!
    `.trim(),
  },
  {
    id: "notice-2025-03",
    slug: "community-gaming-night-and-custom-lobbies",
    title: "Community Competitive Custom Lobbies Announcement",
    date: "2025-02-18",
    category: "Gaming",
    summary: "Join the NASCORE crew for our monthly competitive custom lobbies and tactical replay reviews.",
    pinned: false,
    author: {
      name: "Esports & Community",
      role: "Community Lead",
    },
    content: `
## Tactical Custom Lobbies & Community Night

Mark your calendars! This Friday evening, we are hosting our monthly community gaming session.

### Event Details:
* **When**: Friday at 8:00 PM EST
* **Where**: Hosted live via our community Discord
* **Format**: 5v5 Tactical Scrimmages & Replay Analysis
* **Eligibility**: Open to all active community members

Top clutch highlights will be edited and featured in an upcoming **NASCORE Shorts** compilation!
    `.trim(),
  },
];

export interface NoticeFetchResult {
  notices: NoticeItem[];
  source: 'github-raw' | 'local-static' | 'fallback';
  lastUpdated?: string;
  errorMessage?: string;
}

/**
 * Fetch notices with GitHub Raw priority, fallback to local static manifest
 */
export async function fetchNotices(): Promise<NoticeFetchResult> {
  const { owner, repo, branch, noticesPath } = siteConfig.github;

  // 1. If GitHub repository is configured, attempt fetching fresh notices directly from GitHub
  if (owner && repo && owner !== 'yourusername') {
    try {
      const githubRawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${noticesPath}/index.json?_t=${Date.now()}`;
      const res = await fetch(githubRawUrl);
      if (res.ok) {
        const manifest: NoticeManifest = await res.json();
        if (Array.isArray(manifest.notices) && manifest.notices.length > 0) {
          return {
            notices: sortNotices(manifest.notices),
            source: 'github-raw',
            lastUpdated: manifest.lastUpdated,
          };
        }
      }
    } catch {
      // Continue to local static check
    }
  }

  // 2. Fetch local static manifest from /content/notices/index.json
  try {
    const localRes = await fetch('./content/notices/index.json');
    if (localRes.ok) {
      const manifest: NoticeManifest = await localRes.json();
      if (Array.isArray(manifest.notices) && manifest.notices.length > 0) {
        return {
          notices: sortNotices(manifest.notices),
          source: 'local-static',
          lastUpdated: manifest.lastUpdated,
        };
      }
    }
  } catch {
    // Continue to fallback
  }

  // 3. Fallback to built-in notices
  return {
    notices: sortNotices(DEFAULT_NOTICES),
    source: 'fallback',
  };
}

/**
 * Fetch individual Markdown file if notice specifies an external file path
 */
export async function fetchNoticeMarkdown(urlOrPath: string): Promise<string | null> {
  try {
    const res = await fetch(urlOrPath);
    if (res.ok) {
      return await res.text();
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Helper: Sort pinned notices first, then newest date descending
 */
export function sortNotices(notices: NoticeItem[]): NoticeItem[] {
  return [...notices].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    const timeA = new Date(a.date).getTime() || 0;
    const timeB = new Date(b.date).getTime() || 0;
    return timeB - timeA;
  });
}
